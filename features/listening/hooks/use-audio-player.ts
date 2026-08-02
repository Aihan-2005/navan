"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

type UseAudioPlayerOptions = Readonly<{
  src: string;
  initialPlaybackRate?: number;
}>;

function clamp(
  value: number,
  minimum: number,
  maximum: number,
): number {
  return Math.min(
    Math.max(value, minimum),
    maximum,
  );
}

export function useAudioPlayer({
  src,
  initialPlaybackRate = 1,
}: UseAudioPlayerOptions) {
  const audioRef =
    useRef<HTMLAudioElement | null>(null);

  const [isPlaying, setIsPlaying] =
    useState(false);

  const [isReady, setIsReady] =
    useState(false);

  const [currentTime, setCurrentTime] =
    useState(0);

  const [duration, setDuration] =
    useState(0);

  const [playbackRate, setPlaybackRateState] =
    useState(initialPlaybackRate);

  const [volume, setVolumeState] =
    useState(1);

  const [isMuted, setIsMuted] =
    useState(false);

  const [errorMessage, setErrorMessage] =
    useState<string | null>(null);

  useEffect(() => {
    setIsPlaying(false);
    setIsReady(false);
    setCurrentTime(0);
    setDuration(0);
    setErrorMessage(null);

    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    audio.pause();
    audio.currentTime = 0;
    audio.load();
  }, [src]);

  const play = useCallback(
    async (): Promise<void> => {
      const audio = audioRef.current;

      if (!audio) {
        return;
      }

      try {
        setErrorMessage(null);

        await audio.play();
      } catch (error) {
        console.error(
          "Audio playback failed:",
          error,
        );

        setIsPlaying(false);

        setErrorMessage(
          "مرورگر نتوانست پخش صوت را شروع کند. دوباره تلاش کن.",
        );
      }
    },
    [],
  );

  const pause = useCallback((): void => {
    audioRef.current?.pause();
  }, []);

  const togglePlayback =
    useCallback(async (): Promise<void> => {
      const audio = audioRef.current;

      if (!audio) {
        return;
      }

      if (audio.paused) {
        await play();
        return;
      }

      pause();
    }, [pause, play]);

  const seekTo = useCallback(
    (nextTime: number): void => {
      const audio = audioRef.current;

      if (!audio) {
        return;
      }

      const maximumDuration =
        Number.isFinite(audio.duration)
          ? audio.duration
          : duration;

      const normalizedTime = clamp(
        nextTime,
        0,
        Math.max(maximumDuration, 0),
      );

      audio.currentTime = normalizedTime;
      setCurrentTime(normalizedTime);
    },
    [duration],
  );

  const seekBy = useCallback(
    (seconds: number): void => {
      const audio = audioRef.current;

      if (!audio) {
        return;
      }

      seekTo(
        audio.currentTime + seconds,
      );
    },
    [seekTo],
  );

  const updatePlaybackRate =
    useCallback((rate: number): void => {
      const audio = audioRef.current;

      if (audio) {
        audio.playbackRate = rate;
      }

      setPlaybackRateState(rate);
    }, []);

  const updateVolume =
    useCallback((nextVolume: number): void => {
      const normalizedVolume = clamp(
        nextVolume,
        0,
        1,
      );

      const audio = audioRef.current;

      if (audio) {
        audio.volume = normalizedVolume;

        if (normalizedVolume > 0) {
          audio.muted = false;
        }
      }

      setVolumeState(normalizedVolume);

      if (normalizedVolume > 0) {
        setIsMuted(false);
      }
    }, []);

  const toggleMute = useCallback((): void => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    const nextMutedState = !audio.muted;

    audio.muted = nextMutedState;
    setIsMuted(nextMutedState);
  }, []);

  const handleLoadedMetadata =
    useCallback((): void => {
      const audio = audioRef.current;

      if (!audio) {
        return;
      }

      const nextDuration =
        Number.isFinite(audio.duration)
          ? audio.duration
          : 0;

      audio.playbackRate =
        playbackRate;

      audio.volume = volume;
      audio.muted = isMuted;

      setDuration(nextDuration);
      setCurrentTime(audio.currentTime);
      setIsReady(true);
      setErrorMessage(null);
    }, [
      isMuted,
      playbackRate,
      volume,
    ]);

  const handleTimeUpdate =
    useCallback((): void => {
      const audio = audioRef.current;

      if (!audio) {
        return;
      }

      setCurrentTime(audio.currentTime);
    }, []);

  const handlePlay =
    useCallback((): void => {
      setIsPlaying(true);
      setErrorMessage(null);
    }, []);

  const handlePause =
    useCallback((): void => {
      setIsPlaying(false);
    }, []);

  const handleEnded =
    useCallback((): void => {
      setIsPlaying(false);
      setCurrentTime(duration);
    }, [duration]);

  const handleError =
    useCallback((): void => {
      setIsPlaying(false);
      setIsReady(false);

      setErrorMessage(
        "فایل صوتی پیدا نشد یا قابل پخش نیست.",
      );
    }, []);

  return {
    audioRef,

    isPlaying,
    isReady,

    currentTime,
    duration,

    playbackRate,

    volume,
    isMuted,

    errorMessage,

    play,
    pause,
    togglePlayback,

    seekTo,
    seekBy,

    updatePlaybackRate,
    updateVolume,
    toggleMute,

    handleLoadedMetadata,
    handleTimeUpdate,
    handlePlay,
    handlePause,
    handleEnded,
    handleError,
  };
}