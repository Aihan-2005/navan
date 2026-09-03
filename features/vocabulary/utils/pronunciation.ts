export function speakEnglish(
  text: string,
): void {
  if (
    typeof window ===
      "undefined" ||
    !(
      "speechSynthesis" in
      window
    )
  ) {
    return;
  }

  window.speechSynthesis.cancel();

  const utterance =
    new SpeechSynthesisUtterance(
      text,
    );

  utterance.lang =
    "en-US";

  utterance.rate =
    0.9;

  utterance.pitch =
    1;

  const voices =
    window.speechSynthesis.getVoices();

  const englishVoice =
    voices.find(
      (voice) =>
        voice.lang ===
        "en-US",
    ) ??
    voices.find(
      (voice) =>
        voice.lang.startsWith(
          "en",
        ),
    );

  if (englishVoice) {
    utterance.voice =
      englishVoice;
  }

  window.speechSynthesis.speak(
    utterance,
  );
}