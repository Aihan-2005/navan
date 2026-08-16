"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

export type RoomMicrophoneStatus =
  | "idle"
  | "requesting"
  | "enabled"
  | "error";

function stopStream(
  stream:
    MediaStream | null,
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

function getMicrophoneError(
  error:
    unknown,
): string {
  if (
    !(error instanceof
      DOMException)
  ) {
    return "امکان فعال‌سازی میکروفون وجود ندارد.";
  }

  switch(
    error.name
  ) {
    case "NotAllowedError":
      return "دسترسی میکروفون توسط مرورگر رد شد.";

    case "NotFoundError":
      return "میکروفونی روی دستگاه پیدا نشد.";

    case "NotReadableError":
      return "میکروفون در حال حاضر توسط برنامه دیگری استفاده می‌شود.";

    default:
      return "خطایی هنگام فعال‌سازی میکروفون رخ داد.";
  }
}

export function useRoomMicrophone() {
  const streamRef =
    useRef<MediaStream | null>(
      null,
    );

  const audioContextRef =
    useRef<AudioContext | null>(
      null,
    );

  const sourceRef =
    useRef<MediaStreamAudioSourceNode | null>(
      null,
    );

  const analyserRef =
    useRef<AnalyserNode | null>(
      null,
    );

  const animationFrameRef =
    useRef<number | null>(
      null,
    );

  const [
    status,
    setStatus,
  ] =
    useState<RoomMicrophoneStatus>(
      "idle",
    );

  const [
    inputLevel,
    setInputLevel,
  ] =
    useState(0);

  const [
    errorMessage,
    setErrorMessage,
  ] =
    useState<string | null>(
      null,
    );

  const stopLevelMeter =
    useCallback(
      (): void => {
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
          sourceRef.current
            ?.disconnect();
        } catch {
          // Node may already be disconnected.
        }

        sourceRef.current =
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

        setInputLevel(
          0,
        );
      },
      [],
    );

  const disableMicrophone =
    useCallback(
      (): void => {
        stopStream(
          streamRef.current,
        );

        streamRef.current =
          null;

        stopLevelMeter();

        setStatus(
        "idle",
        );

        setErrorMessage(
          null,
        );
      },
      [
        stopLevelMeter,
      ],
    );

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
          return;
        }

        try {
          const context =
            new AudioContext();

          const source =
            context.createMediaStreamSource(
              stream,
            );

          const analyser =
            context.createAnalyser();

          analyser.fftSize =
            256;

          analyser.smoothingTimeConstant =
            0.8;

          source.connect(
            analyser,
          );

          audioContextRef.current =
            context;

          sourceRef.current =
            source;

          analyserRef.current =
            analyser;

          const samples =
            new Uint8Array(
              analyser.fftSize,
            );

          const updateLevel =
            (): void => {  analyser.getByteTimeDomainData(
                samples,
              );

              let sum =
                0;

              for (
                let index =
                  0;
                index <
                samples.length;
                index +=
                  1
              ) {
                const normalized =
                  (
                    samples[
                      index
                    ] -
                    128
                  ) /
                  128;

                sum +=
                  normalized *
                  normalized;
              }

              const rms =
                Math.sqrt(
                  sum /
                    samples.length,
                );

              setInputLevel(
                Math.min(
                  1,
                  rms *
                    4.5,
                ),
              );

              animationFrameRef.current =
                window.requestAnimationFrame(
                  updateLevel,
                );
            }; animationFrameRef.current =
            window.requestAnimationFrame(
              updateLevel,
            );
        } catch (
          error
        ) {
          console.warn(
            "Room microphone level meter failed:",
            error,
          );
        }
      },
      [],
    );

  const enableMicrophone =
    useCallback(
      async (): Promise<void> => {
        if (
          status ===
          "enabled" ||
          status ===
          "requesting"
        ) {
          return;
        }

        if (
          !navigator
            .mediaDevices
            ?.getUserMedia
        ) {
          setStatus(
            "error",
          );

          setErrorMessage(
            "مرورگر فعلی از دسترسی به میکروفون پشتیبانی نمی‌کند.",
          );

          return;
        }

        setStatus(
          "requesting",
        );

        setErrorMessage(
          null,
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
                },
              });

          streamRef.current =
            stream;

          startLevelMeter(
            stream,
          );

          setStatus(
            "enabled",
          );
        } catch (
          error
        ) {
          stopStream(
            streamRef.current,
          );

          streamRef.current =
            null;

          stopLevelMeter();

          setStatus(
            "error",
          );

          setErrorMessage(
            getMicrophoneError(
              error,
            ),
          );
        }
      },
      [
        startLevelMeter,
        status,
        stopLevelMeter,
      ],
    );

  const toggleMicrophone =
    useCallback(
      async (): Promise<void> => {
        if (
          status ===
          "enabled"
        ) {
          disableMicrophone();

          return;
        }

        await enableMicrophone();
      },
      [
        disableMicrophone,enableMicrophone,
        status,
      ],
    );

  useEffect(() => {
    return () => {
      stopStream(
        streamRef.current,
      );

      if (
        animationFrameRef.current !==
        null
      ) {
        window.cancelAnimationFrame(
          animationFrameRef.current,
        );
      }

      try {
        sourceRef.current
          ?.disconnect();
      } catch {
        // Ignore cleanup race.
      }

      const context =
        audioContextRef.current;

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
    };
  }, []);

  return {
    status,

    inputLevel,

    errorMessage,

    enableMicrophone,
    disableMicrophone,

    toggleMicrophone,
  };
}