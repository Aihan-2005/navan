"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import type {
  RecordedAudio,
} from "../types/speaking.types";

export type AudioRecorderStatus =
  | "idle"
  | "requesting_permission"
  | "recording"
  | "paused"
  | "stopped"
  | "error";

const SUPPORTED_MIME_TYPES = [
  "audio/webm;codecs=opus",
  "audio/webm",
  "audio/mp4",
  "audio/ogg;codecs=opus",
] as const;

const RECORDER_TIMESLICE_MS =
  250;

const TIMER_INTERVAL_MS =
  200;

const LEVEL_UPDATE_INTERVAL_MS =
  70;

const AUDIO_ANALYSER_FFT_SIZE =
  256;

const AUDIO_LEVEL_MULTIPLIER =
  4.5;

function findSupportedMimeType():
  string | undefined {
  if (
    typeof MediaRecorder ===
      "undefined" ||
    typeof MediaRecorder
      .isTypeSupported !==
      "function"
  ) {return undefined;
  }

  return SUPPORTED_MIME_TYPES.find(
    (
      mimeType,
    ) =>
      MediaRecorder.isTypeSupported(
        mimeType,
      ),
  );
}

function getRecorderErrorMessage(
  error:
    unknown,
): string {
  if (
    !(error instanceof
      DOMException)
  ) {
    return "خطای ناشناخته‌ای هنگام دسترسی به میکروفون رخ داد.";
  }

  switch (
    error.name
  ) {
    case "NotAllowedError":
      return "اجازه دسترسی به میکروفون داده نشد. دسترسی میکروفون را از تنظیمات مرورگر فعال کن.";

    case "NotFoundError":
      return "هیچ میکروفونی روی دستگاه پیدا نشد.";

    case "NotReadableError":
      return "میکروفون توسط برنامه دیگری استفاده می‌شود یا در دسترس نیست.";

    case "SecurityError":
      return "مرورگر به دلایل امنیتی اجازه استفاده از میکروفون را نمی‌دهد.";

    case "AbortError":
      return "فعال‌سازی میکروفون متوقف شد. دوباره تلاش کن.";

    case "OverconstrainedError":
      return "تنظیمات درخواستی برای میکروفون فعلی قابل استفاده نیست.";

    default:
      return "امکان شروع ضبط صدا وجود ندارد.";
  }
}

function stopMediaStream(
  stream:MediaStream | null,
): void {
  stream
    ?.getTracks()
    .forEach(
      (
        track,
      ) => {
        track.stop();
      },
    );
}

function roundDurationSeconds(
  milliseconds:
    number,
): number {
  return Math.max(
    0.1,
    Math.round(
      (
        milliseconds /
        1000
      ) *
        10,
    ) /
      10,
  );
}

export function useAudioRecorder(
  maxDurationSeconds =
    120,
) {
  /*
   * MediaRecorder اصلی.
   */
  const recorderRef =
    useRef<MediaRecorder | null>(
      null,
    );

  /*
   * Stream واقعی میکروفون.
   */
  const streamRef =
    useRef<MediaStream | null>(
      null,
    );
/*
   * chunkهای فایل تا قبل از ساخت Blob نهایی.
   */
  const chunksRef =
    useRef<Blob[]>(
      [],
    );

  /*
   * URL مربوط به Recording فعلی.
   * برای جلوگیری از Memory Leak باید revoke شود.
   */
  const recordingUrlRef =
    useRef<string | null>(
      null,
    );

  /*
   * وقتی Reset در حین Recording زده می‌شود،
   * MediaRecorder مجبور است stop شود.
   *
   * ولی در آن حالت نمی‌خواهیم onstop
   * یک Recording جدید بسازد.
   */
  const discardOnStopRef =
    useRef(false);

  /*
   * شروع Segment فعلی Recording.
   *
   * در Pause مقدار آن null می‌شود.
   */
  const activeSegmentStartedAtRef =
    useRef<number | null>(
      null,
    );

  /*
   * زمان تمام Segmentهای کامل‌شده.
   * * زمان Pause داخل این مقدار محاسبه نمی‌شود.
   */
  const accumulatedDurationMsRef =
    useRef(0);

  /*
   * Audio API برای اندازه‌گیری شدت واقعی صدا.
   */
  const audioContextRef =
    useRef<AudioContext | null>(
      null,
    );

  const analyserRef =
    useRef<AnalyserNode | null>(
      null,
    );

  const sourceNodeRef =
    useRef<MediaStreamAudioSourceNode | null>(
      null,
    );

  const animationFrameRef =
    useRef<number | null>(
      null,
    );

  const lastLevelUpdateRef =
    useRef(0);

  /*
   * هنگام Pause همچنان Stream باز است،
   * ولی Level Meter نباید Wave نمایش دهد.
   */
  const levelMeterEnabledRef =
    useRef(false);

  const [
    status,
    setStatus,
  ] =
    useState<AudioRecorderStatus>(
      "idle",
    );

  const [ elapsedSeconds,
    setElapsedSeconds,
  ] =
    useState(0);

  /*
   * مقدار بین 0 و 1.
   *
   * VoiceRecorder از همین مقدار
   * برای Waveform واقعی استفاده می‌کند.
   */
  const [
    inputLevel,
    setInputLevel,
  ] =
    useState(0);

  const [
    recording,
    setRecording,
  ] =
    useState<RecordedAudio | null>(
      null,
    );

  const [
    errorMessage,
    setErrorMessage,
  ] =
    useState<string | null>(
      null,
    );

  /*
   * null یعنی هنوز Browser Capability
   * روی Client بررسی نشده.
   */
  const [
    isSupported,
    setIsSupported,
  ] =
    useState<boolean | null>(
      null,
    );

  const [
    isSecureContext, setIsSecureContext,
  ] =
    useState<boolean | null>(
      null,
    );

  /*
   * Capability Detection فقط روی Client.
   */
  useEffect(() => {
    setIsSupported(
      typeof MediaRecorder !==
        "undefined" &&
        Boolean(
          navigator
            .mediaDevices
            ?.getUserMedia,
        ),
    );

    setIsSecureContext(
      window.isSecureContext,
    );
  }, []);

  const revokeCurrentRecordingUrl =
    useCallback(
      (): void => {
        const currentUrl =
          recordingUrlRef.current;

        if (!currentUrl) {
          return;
        }

        URL.revokeObjectURL(
          currentUrl,
        );  recordingUrlRef.current =
          null;
      },
      [],
    );

  /*
   * مدت واقعی Recording تا همین لحظه.
   *
   * مهم:
   * Pause داخل Duration محاسبه نمی‌شود.
   */
  const readDurationMs =
    useCallback(
      (): number => {
        let duration =
          accumulatedDurationMsRef.current;

        const activeStartedAt =
          activeSegmentStartedAtRef.current;

        if (
          activeStartedAt !==
          null
        ) {
          duration +=
            performance.now() -
            activeStartedAt;
        }

        return Math.max(
          0,
          duration,
        );
      },
      [],
    );

  /*
   * Segment فعال Recording را به
   * accumulated duration اضافه می‌کند.
   */
  const finalizeActiveSegment =
    useCallback(
      (): void => {
        const startedAt =
          activeSegmentStartedAtRef.current;

        if (
          startedAt ===
          null
        ) {
          return;
        }

        accumulatedDurationMsRef.current +=
          performance.now() -
          startedAt;

        activeSegmentStartedAtRef.current =
          null;
      },
      [],
    );

  /*
   * Audio Analyser را کامل Dispose می‌کند.
   */
  const stopLevelMeter =
    useCallback(
      (): void => {
        levelMeterEnabledRef.current =
          false;

        if (
          animationFrameRef.current !==
          null
        ) {
          window.cancelAnimationFrame(
            animationFrameRef.current,
          );

          animationFrameRef.current =
            null;
        }

        try {
          sourceNodeRef.current
            ?.disconnect();
        } catch {
          /*
           * ممکن است Node قبلاً Disconnect شده باشد.
           */
        }

        sourceNodeRef.current =
          null;

        analyserRef.current =
          null;
 const audioContext =
          audioContextRef.current;

        audioContextRef.current =
          null;

        if (
          audioContext &&
          audioContext.state !==
            "closed"
        ) {
          void audioContext
            .close()
            .catch(
              () =>
                undefined,
            );
        }

        setInputLevel(
          0,
        );
      },
      [],
    );

  /*
   * شدت واقعی صدای میکروفون را
   * با RMS محاسبه می‌کند.
   */
  const startLevelMeter =
    useCallback(
      (
        stream:
          MediaStream,
      ): void => {
        if (
          typeof AudioContext ===
          "undefined"
        ) {
          setInputLevel(
            0,
          );

          return;
        }try {
          const context =
            new AudioContext();

          const analyser =
            context.createAnalyser();

          analyser.fftSize =
            AUDIO_ANALYSER_FFT_SIZE;

          analyser.smoothingTimeConstant =
            0.78;

          const source =
            context.createMediaStreamSource(
              stream,
            );

          source.connect(
            analyser,
          );

          audioContextRef.current =
            context;

          analyserRef.current =
            analyser;

          sourceNodeRef.current =
            source;

          levelMeterEnabledRef.current =
            true;

          /*
           * بعضی Browserها AudioContext را
           * suspended ایجاد می‌کنند.
           */
          if (
            context.state ===
            "suspended"
          ) {
            void context
              .resume()
              .catch(
                () =>
                  undefined,
              );
          }

          const values =
            new Uint8Array(
              analyser.fftSize,
            );

          const updateLevel = (
            now:
              number,
          ): void => {
            if (
              !levelMeterEnabledRef.current
            ) {
              animationFrameRef.current =
                window.requestAnimationFrame(
                  updateLevel,
                );

              return;
            } analyser.getByteTimeDomainData(
              values,
            );

            let sumSquares =
              0;

            for (
              let index =
                0;
              index <
              values.length;
              index +=
                1
            ) {
              const sample =
                values[
                  index
                ];

              const normalized =
                (
                  sample -
                  128
                ) /
                128;

              sumSquares +=
                normalized *
                normalized;
            }

            const rms =
              Math.sqrt(
                sumSquares /
                  values.length,
              );

            if (
              now -
                lastLevelUpdateRef.current >=
              LEVEL_UPDATE_INTERVAL_MS
            ) {
              /*
               * RMS خام معمولاً کوچک است،
               * بنابراین برای UI Normalize می‌کنیم.
               */
              const normalizedLevel =
                Math.min(
                  1,   Math.max(
                    0,
                    rms *
                      AUDIO_LEVEL_MULTIPLIER,
                  ),
                );

              setInputLevel(
                normalizedLevel,
              );

              lastLevelUpdateRef.current =
                now;
            }

            animationFrameRef.current =
              window.requestAnimationFrame(
                updateLevel,
              );
          };

          animationFrameRef.current =
            window.requestAnimationFrame(
              updateLevel,
            );
        } catch (
          error
        ) {
          console.warn(
            "Audio level meter could not be initialized:",
            error,
          );

          setInputLevel(
            0,);
        }
      },
      [],
    );

  /*
   * Recording جاری را کامل پاک می‌کند.
   */
  const resetRecording =
    useCallback(
      (): void => {
        const recorder =
          recorderRef.current;

        discardOnStopRef.current =
          true;

        /*
         * اگر Recording فعال باشد،
         * onstop بعداً اجرا خواهد شد،
         * ولی discardOnStopRef مانع ساخت فایل می‌شود.
         */
        if (
          recorder &&
          recorder.state !==
            "inactive"
        ) {
          try {
            recorder.stop();
          } catch {
            /*
             * MediaRecorder ممکن است همزمان
             * وارد inactive شده باشد.
             */
          }
        }

        stopMediaStream( streamRef.current,
        );

        stopLevelMeter();

        recorderRef.current =
          null;

        streamRef.current =
          null;

        chunksRef.current =
          [];

        activeSegmentStartedAtRef.current =
          null;

        accumulatedDurationMsRef.current =
          0;

        revokeCurrentRecordingUrl();

        setRecording(
          null,
        );

        setElapsedSeconds(
          0,
        );

        setInputLevel(
          0,
        ); setErrorMessage(
          null,
        );

        setStatus(
          "idle",
        );
      },
      [
        revokeCurrentRecordingUrl,
        stopLevelMeter,
      ],
    );

  /*
   * Recording را متوقف می‌کند و Blob نهایی
   * توسط recorder.onstop ساخته می‌شود.
   */
  const stopRecording =
    useCallback(
      (): void => {
        const recorder =
          recorderRef.current;

        if (
          !recorder ||
          recorder.state ===
            "inactive"
        ) {
          return;
        }

        if (
          recorder.state ===
          "recording"
        ) {
          finalizeActiveSegment();
        }

        levelMeterEnabledRef.current =
          false;

        setInputLevel(
          0,
        );

        try {
          recorder.stop();
        } catch (error
        ) {
          console.error(
            "MediaRecorder stop failed:",
            error,
          );

          setErrorMessage(
            "امکان پایان صحیح ضبط وجود نداشت.",
          );

          setStatus(
            "error",
          );
        }
      },
      [
        finalizeActiveSegment,
      ],
    );

  const pauseRecording =
    useCallback(
      (): void => {
        const recorder =
          recorderRef.current;

        if (
          !recorder ||
          recorder.state !==
            "recording"
        ) {
          return;
        }

        finalizeActiveSegment();

        try {
          recorder.pause();

          levelMeterEnabledRef.current =
            false;

          setInputLevel(
            0,
          );

          setElapsedSeconds(
            Math.floor(
              readDurationMs() /
                1000,
            ),
          );setStatus(
            "paused",
          );
        } catch (
          error
        ) {
          console.error(
            "MediaRecorder pause failed:",
            error,
          );

          setErrorMessage(
            "امکان متوقف کردن موقت ضبط وجود ندارد.",
          );
        }
      },
      [
        finalizeActiveSegment,
        readDurationMs,
      ],
    );

  const resumeRecording =
    useCallback(
      (): void => {
        const recorder =
          recorderRef.current;

        if (
          !recorder ||
          recorder.state !==
            "paused"
        ) {
          return;
        }

        try {
          activeSegmentStartedAtRef.current =
            performance.now();

          recorder.resume();

          levelMeterEnabledRef.current =
            true;

          setStatus( "recording",
          );
        } catch (
          error
        ) {
          activeSegmentStartedAtRef.current =
            null;

          console.error(
            "MediaRecorder resume failed:",
            error,
          );

          setErrorMessage(
            "امکان ادامه ضبط وجود ندارد.",
          );
        }
      },
      [],
    );

  const startRecording =
    useCallback(
      async (): Promise<void> => {
        const browserSupportsRecording =
          typeof MediaRecorder !==
            "undefined" &&
          Boolean(
            navigator
              .mediaDevices
              ?.getUserMedia,
          );

        if (
          !browserSupportsRecording
        ) {
          setStatus(
            "error",
          );

          setErrorMessage(
            "مرورگر فعلی از ضبط صدا پشتیبانی نمی‌کند.",
          );

          return;
        }

        if (!window.isSecureContext
        ) {
          setStatus(
            "error",
          );

          setErrorMessage(
            "برای استفاده از میکروفون، صفحه باید روی HTTPS یا localhost اجرا شود.",
          );

          return;
        }

        /*
         * Cleanup هر Recording قبلی
         * قبل از Session جدید.
         */
        stopMediaStream(
          streamRef.current,
        );

        stopLevelMeter();

        revokeCurrentRecordingUrl();

        streamRef.current =
          null;

        recorderRef.current =
          null;

        chunksRef.current =
          [];

        activeSegmentStartedAtRef.current =
          null;

        accumulatedDurationMsRef.current =
          0; discardOnStopRef.current =
          false;

        setRecording(
          null,
        );

        setElapsedSeconds(
          0,
        );

        setInputLevel(
          0,
        );

        setErrorMessage(
          null,
        );

        setStatus(
          "requesting_permission",
        );

        try {
          const stream =
            await navigator
              .mediaDevices
              .getUserMedia({
                video:
                  false,

                audio: {
                  echoCancellation:
                    true,

                  noiseSuppression:
                    true,

                  autoGainControl:
                    true,

                  channelCount:
                    1,
                },
              });

          streamRef.current =
            stream;startLevelMeter(
            stream,
          );

          const supportedMimeType =
            findSupportedMimeType();

          const recorder =
            supportedMimeType
              ? new MediaRecorder(
                  stream,
                  {
                    mimeType:
                      supportedMimeType,
                  },
                )
              : new MediaRecorder(
                  stream,
                );

          recorderRef.current =
            recorder;

          recorder.ondataavailable =
            (
              event:
                BlobEvent,
            ): void => {
              if (
                event.data.size >
                0
              ) {
                chunksRef.current.push(
                  event.data,
                );
              }
            };

          recorder.onerror =
            (): void => {
              stopMediaStream(
                streamRef.current,
              );

              stopLevelMeter();

              streamRef.current =
                null;

              recorderRef.current =
                null; activeSegmentStartedAtRef.current =
                null;

              accumulatedDurationMsRef.current =
                0;

              chunksRef.current =
                [];

              setInputLevel(
                0,
              );

              setErrorMessage(
                "هنگام ضبط صدا خطایی رخ داد.",
              );

              setStatus(
                "error",
              );
            };

          recorder.onstop =
            (): void => {
              stopMediaStream(
                streamRef.current,
              );

              stopLevelMeter();

              streamRef.current =
                null;

              recorderRef.current =
                null;

              activeSegmentStartedAtRef.current =
                null;

              if (
                discardOnStopRef.current
              ) {
                discardOnStopRef.current =
                  false;

                chunksRef.current =
                  [];

                accumulatedDurationMsRef.current =
                  0;

                return;
              }

              const mimeType =
                recorder.mimeType ||
                supportedMimeType ||
                "audio/webm";

              const blob =
                new Blob(
                  chunksRef.current,
                  {
                    type:
                      mimeType,
                  },
                );

              chunksRef.current =
                [];

              if (
                blob.size ===
                0
              ) {
                accumulatedDurationMsRef.current =
                  0;

                setRecording(
                  null,
                );setElapsedSeconds(
                  0,
                );

                setErrorMessage(
                  "فایل صوتی خالی است. دوباره ضبط کن.",
                );

                setStatus(
                  "error",
                );

                return;
              }

              /*
               * برخلاف نسخه قبلی Hook،
               * Duration از state قدیمی elapsedSeconds
               * گرفته نمی‌شود.
               *
               * مقدار واقعی Ref استفاده می‌شود.
               */
              const durationSeconds =
                roundDurationSeconds(
                  accumulatedDurationMsRef.current,
                );

              revokeCurrentRecordingUrl();

              const url =
                URL.createObjectURL(
                  blob,
                );

              recordingUrlRef.current =
                url;

              setElapsedSeconds(
                Math.floor(
                  durationSeconds,
                ),
              );

              setRecording({
                blob,

                url,
 mimeType,

                durationSeconds,

                sizeBytes:
                  blob.size,

                createdAt:
                  new Date()
                    .toISOString(),
              });

              setInputLevel(
                0,
              );

              setStatus(
                "stopped",
              );
            };

          activeSegmentStartedAtRef.current =
            performance.now();

          recorder.start(
            RECORDER_TIMESLICE_MS,
          );

          levelMeterEnabledRef.current =
            true;

          setStatus(
            "recording",
          );
        } catch (
          error
        ) {
          stopMediaStream(
            streamRef.current,
          );

          stopLevelMeter();

          streamRef.current =
            null;

          recorderRef.current =
            null;

          chunksRef.current =
            [];
 activeSegmentStartedAtRef.current =
            null;

          accumulatedDurationMsRef.current =
            0;

          setInputLevel(
            0,
          );

          setStatus(
            "error",
          );

          setErrorMessage(
            getRecorderErrorMessage(
              error,
            ),
          );
        }
      },
      [
        revokeCurrentRecordingUrl,
        startLevelMeter,
        stopLevelMeter,
      ],
    );

  /*
   * Timer UI.
   *
   * به‌جای +1 ثانیه، زمان واقعی performance.now
   * را می‌خوانیم.
   */
  useEffect(() => {
    if (
      status !==
      "recording"
    ) {
      return;
    }

    const timerId =
      window.setInterval(
        () => {
          const durationMs =
            readDurationMs();

          const seconds =
            Math.floor(
              durationMs /
                1000,
            ); setElapsedSeconds(
            seconds,
          );

          if (
            Number.isFinite(
              maxDurationSeconds,
            ) &&
            durationMs >=
              maxDurationSeconds *
                1000
          ) {
            stopRecording();
          }
        },
        TIMER_INTERVAL_MS,
      );

    return () => {
      window.clearInterval(
        timerId,
      );
    };
  }, [
    maxDurationSeconds,
    readDurationMs,
    status,
    stopRecording,
  ]);

  /*
   * Cleanup هنگام خروج Component.
   */
  useEffect(() => {
    return () => {
      discardOnStopRef.current =
        true;

      levelMeterEnabledRef.current =
        false;

      const recorder =
        recorderRef.current;

      if (
        recorder &&
        recorder.state !==
          "inactive"
      ) {
        /*
         * Handlerها را قبل از Stop حذف می‌کنیم
         * تا بعد از Unmont State Update نداشته باشیم.
         */
        recorder.ondataavailable =
          null;

        recorder.onstop =
          null;

        recorder.onerror =
          null;

        try {
          recorder.stop();
        } catch {
          /*
           * Ignore cleanup race conditions.
           */
        }
      }

      stopMediaStream(
        streamRef.current,
      );

      if ( animationFrameRef.current !==
        null
      ) {
        window.cancelAnimationFrame(
          animationFrameRef.current,
        );

        animationFrameRef.current =
          null;
      }

      try {
        sourceNodeRef.current
          ?.disconnect();
      } catch {
        /*
         * Node may already be disconnected.
         */
      }

      sourceNodeRef.current =
        null;

      analyserRef.current =
        null;

      const context =
        audioContextRef.current;

      audioContextRef.current =
        null;

      if (
        context &&
        context.state !==
          "closed"
      ) {
        void context
          .close()
          .catch(
            () =>
              undefined,
          );
      }

      if (
        recordingUrlRef.current
      ) {
        URL.revokeObjectURL(
          recordingUrlRef.current,
        );
recordingUrlRef.current =
          null;
      }

      recorderRef.current =
        null;

      streamRef.current =
        null;

      chunksRef.current =
        [];
    };
  }, []);

  return {
    status,

    elapsedSeconds,

    /**
     * مقدار موردنیاز VoiceRecorder.
     *
     * 0 = سکوت
     * 1 = سطح ورودی زیاد
     */
    inputLevel,

    recording,

    errorMessage,

    isSupported,

    isSecureContext,

    startRecording,

    pauseRecording,

    resumeRecording,

    stopRecording,

    resetRecording,
  };
}