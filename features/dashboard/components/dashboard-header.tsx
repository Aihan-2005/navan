import { Languages, Sparkles } from "lucide-react";

import { Card } from "../../../components/ui/card";

import type { DashboardUser } from "../types/dashboard.types";

type DashboardHeaderProps = {
  user: DashboardUser;
};

function getFullName(user: DashboardUser): string {
  return [user.firstName, user.lastName]
    .filter((part): part is string => Boolean(part))
    .join(" ");
}

function getInitials(user: DashboardUser): string {
  const firstInitial = user.firstName.trim().charAt(0);
  const lastInitial = user.lastName?.trim().charAt(0) ?? "";

  return `${firstInitial}${lastInitial}`.toUpperCase();
}

export function DashboardHeader({
  user,
}: DashboardHeaderProps) {
  const fullName = getFullName(user);
  const initials = getInitials(user);

  return (
    <Card
      className="
        relative overflow-hidden p-5
        sm:p-6 lg:p-8
      "
    >
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute -left-20 -top-24
          h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute -bottom-24 right-20
          h-64 w-64 rounded-full bg-blue-500/10 blur-3xl
        "
      />

      <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-4">
          <div
            className="
              flex h-14 w-14 shrink-0 items-center justify-center
              rounded-2xl border border-cyan-400/20
              bg-gradient-to-br from-cyan-400/20 to-blue-500/20
              text-lg font-bold text-cyan-100
              shadow-lg shadow-cyan-950/20
              sm:h-16 sm:w-16
            "
            aria-label={`تصویر پروفایل ${fullName}`}
          >
            {initials}
          </div>

          <div>
            <div className="mb-2 flex items-center gap-2 text-sm text-cyan-300">
              <Sparkles
                aria-hidden="true"
                className="h-4 w-4"
              />

              <span>برنامه یادگیری شخصی شما</span>
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              سلام {user.firstName}، خوش آمدی
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
              {user.learningGoal ??
                "امروز یک قدم دیگر به هدف یادگیری زبان نزدیک شو."}
            </p>
          </div>
        </div>

        <div
          className="
            flex shrink-0 items-center gap-3 rounded-2xl
            border border-white/10 bg-black/10 px-4 py-3
          "
        >
          <div
            className="
              flex h-10 w-10 items-center justify-center
              rounded-xl bg-cyan-400/10 text-cyan-300
            "
          >
            <Languages
              aria-hidden="true"
              className="h-5 w-5"
            />
          </div>

          <div>
            <p className="text-xs text-slate-500">
              زبان در حال یادگیری
            </p>

            <p className="mt-1 text-sm font-semibold text-slate-100">
              {user.targetLanguage.name}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}