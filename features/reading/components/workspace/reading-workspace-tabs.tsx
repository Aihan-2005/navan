import {
  BookOpenText,
  BrainCircuit,
  Languages,
  ListChecks,
  Sparkles,
} from "lucide-react";

import {
  cn,
} from "../../../../lib/utils/cn";

import type {
  ReadingWorkspaceTab,
} from "./reading-workspace.types";

type ReadingWorkspaceTabsProps =
  Readonly<{
    activeTab:
      ReadingWorkspaceTab;

    vocabularyCount:
      number;

    grammarCount:
      number;

    expressionCount:
      number;

    quizCount:
      number;

    onTabChange:
      (
        tab:
          ReadingWorkspaceTab,
      ) => void;
  }>;

type WorkspaceTabItem =
  Readonly<{
    id:
      ReadingWorkspaceTab;

    label:
      string;

    count?:
      number;

    icon:
      typeof BookOpenText;
  }>;

export function ReadingWorkspaceTabs({
  activeTab,
  vocabularyCount,
  grammarCount,
  expressionCount,
  quizCount,
  onTabChange,
}: ReadingWorkspaceTabsProps) {
  const tabs:
    readonly WorkspaceTabItem[] =
    [
      {
        id:
          "content",

        label:
          "متن و مفهوم",

        icon:
          BookOpenText,
      },

      {
        id:
          "vocabulary",

        label:
          "واژگان",

        count:
          vocabularyCount,

        icon:
          Languages,
      },

      {
        id:
          "grammar",

        label:
          "گرامر",

        count:
          grammarCount,

        icon:
          BrainCircuit,
      },

      {
        id:
          "expressions",

        label:
          "عبارت‌ها",

        count:
          expressionCount,

        icon:
          Sparkles,
      },

      {
        id:
          "quiz",

        label:
          "کوییز اختیاری",

        count:
          quizCount,

        icon:
          ListChecks,
      },
    ];

  return (
    <div
      role="tablist"
      aria-label="بخش‌های فضای مطالعه"
      className="
        grid
        grid-cols-2
        gap-2
        rounded-2xl
        border
        border-white/[0.07]
        bg-white/[0.025]
        p-2
        md:grid-cols-3
        xl:grid-cols-5
      "
    >
      {tabs.map(
        (
          tab,
        ) => {
          const Icon =
            tab.icon;

          const isActive =
            activeTab ===
            tab.id;

          return (
            <button
              key={
                tab.id
              }
              type="button"
              role="tab"
              aria-selected={
                isActive
              }
              onClick={() => {
                onTabChange(
                  tab.id,
                );
              }}
              className={cn(
                "relative",
                "flex",
                "min-h-12",
                "items-center",
                "justify-center",
                "gap-2",
                "rounded-xl",
                "px-3",
                "py-2.5",
                "text-sm",
                "font-medium",
                "transition",
                "focus-visible:outline-none",
                "focus-visible:ring-2",
                "focus-visible:ring-cyan-300",

                isActive
                  ? [
                      "bg-cyan-400/10",
                      "text-cyan-200",
                      "shadow-sm",
                    ]
                  : [
                      "text-slate-500",
                      "hover:bg-white/[0.045]",
                      "hover:text-slate-200",
                    ],
              )}
            >
              <Icon
                aria-hidden="true"
                className="
                  h-4
                  w-4
                  shrink-0
                "
              />

              <span>
                {tab.label}
              </span>

              {typeof tab.count ===
              "number" ? (
                <span
                  className={cn(
                    "inline-flex",
                    "min-w-5",
                    "items-center",
                    "justify-center",
                    "rounded-full",
                    "px-1.5",
                    "py-0.5",
                    "text-[10px]",

                    isActive
                      ? [
                          "bg-cyan-300/15",
                          "text-cyan-100",
                        ]
                      : [
                          "bg-white/[0.05]",
                          "text-slate-600",
                        ],
                  )}
                >
                  {tab.count}
                </span>
              ) : null}
            </button>
          );
        },
      )}
    </div>
  );
}