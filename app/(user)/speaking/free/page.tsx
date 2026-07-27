"use client";

import { useCallback, useState } from "react";

import { Card } from "../../../../components/ui/card";
import { VoiceRecorder } from "../../../../features/speaking/components/voice-recorder";
import type { RecordedAudio } from "../../../../features/speaking/types/speaking.types";

export default function FreeSpeakingPage() {
  const [recordingState, setRecordingState] = useState<RecordedAudio | null>(
    null,
  );

  const handleRecordingReady = useCallback((recordedAudio: RecordedAudio) => {
    setRecordingState(recordedAudio);
    // TODO: send `recordedAudio` to backend AI analysis service
    // when the API contract is available.
  }, []);

  return (
    <main className="mx-auto w-full max-w-7xl space-y-6 px-6 py-8 sm:px-8">
      <section className="rounded-3xl border border-cyan-400/15 bg-slate-950/80 p-8 shadow-2xl">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
            گفت‌وگوی آزاد
          </p>

          <h1 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
            درباره هر موضوعی که دوست داری صحبت کن
          </h1>

          <p className="mt-4 text-sm leading-7 text-slate-400">
            این صفحه برای ضبط آزاد Speaking طراحی شده است. هر وقت آماده بودی،
            دکمه شروع ضبط را بزن و بعد از پایان ضبط می‌توانی صدا را برای تحلیل
            آینده ذخیره کنی.
          </p>
        </div>
      </section>

      <section className="rounded-3xl border border-white/6 bg-slate-950/80 p-6 shadow-lg">
        <div className="grid gap-6 xl:grid-cols-[1.8fr_1fr]">
          <div className="space-y-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-cyan-300">ضبط آزاد</p>
                <p className="mt-2 text-sm text-slate-400">
                  بدون موضوع پیش‌فرض. هر طور دوست داری صحبت کن.
                </p>
              </div>

              <div className="rounded-2xl border border-white/6 bg-white/5 px-4 py-2 text-xs text-slate-300">
                وضعیت ضبط
              </div>
            </div>

            <VoiceRecorder maxDurationSeconds={Infinity} />
          </div>

          <Card className="rounded-3xl border border-white/6 bg-slate-950/90 p-6 shadow-lg">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-cyan-300">
                  موضوع روزانه
                </p>
                <p className="mt-2 text-sm text-slate-400">
                  جمله‌های شروع‌کننده برای باز کردن مکالمه.
                </p>
              </div>
              <div className="rounded-2xl bg-cyan-400/10 px-3 py-1 text-xs font-medium text-cyan-200">
                تمرین سریع
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <div className="rounded-3xl border border-white/6 bg-white/5 p-4 text-sm text-slate-200">
                <p className="font-semibold text-white"> پیشنهاد برای شروع:</p>
                <p className="mt-2 text-sm text-slate-300">
                  برای مثال، صحبت دربارهٔ هدف‌های شخصی و برنامه‌های روزانه.
                </p>
              </div>

              <div className="space-y-3 rounded-3xl border border-white/6 bg-white/5 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                 Start with:
                </p>

                <div className="space-y-3 text-sm text-slate-200" dir="ltr">
                  <p className="rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3">
                    • What mattered most to you today?
                  </p>
                  <p className="rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3">
                    • What did you enjoy doing today?
                  </p>
                  <p className="rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3">
                    • If you could make one small change tomorrow, what would it be?
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </main>
  );
}
