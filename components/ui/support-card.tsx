import Link from "next/link";
import { LifeBuoy, MessageCircle, Mail, Phone } from "lucide-react";

const supportLinks = [
  {
    id: "telegram",
    label: "تلگرام",
    value: "@MeowLingoSupport",
    href: "https://t.me/MeowLingoSupport",
    icon: MessageCircle,
    external: true,
  },
  {
    id: "email",
    label: "ایمیل",
    value: "support@meowlingo.ai",
    href: "mailto:support@meowlingo.ai",
    icon: Mail,
    external: true,
  },
  {
    id: "phone",
    label: "تلفن",
    value: "+989123456789",
    href: "tel:+989123456789",
    icon: Phone,
    external: true,
  },
] as const;

export function SupportCard() {
  return (
    <div className="mt-4 px-3 pb-4 pt-4">
      <div
        className="
          relative overflow-hidden rounded-2xl
          border border-cyan-300/15
          bg-gradient-to-br from-cyan-600/90 to-blue-700/90
          p-4 shadow-xl shadow-blue-950/30
        "
      >
        <div
          aria-hidden="true"
          className="
            pointer-events-none absolute -left-12 -top-12
            h-32 w-32 rounded-full bg-white/10 blur-2xl
          "
        />

        <div
          aria-hidden="true"
          className="
            pointer-events-none absolute inset-x-0 bottom-0
            h-1/2 bg-gradient-to-t from-black/30 to-transparent
          "
        />

        <div className="relative">
          <div className="flex items-center gap-2">
            <span
              className="
                flex h-9 w-9 items-center justify-center
                rounded-xl bg-white/10 text-cyan-100
              "
            >
              <LifeBuoy aria-hidden="true" className="h-5 w-5" />
            </span>

            <h2 className="text-sm font-bold text-white">پشتیبانی</h2>
          </div>

          <p className="mt-3 text-xs leading-6 text-cyan-100/80">
            برای ارتباط با تیم پشتیبانی از یکی از روش‌های زیر استفاده کنید.
          </p>

          <ul className="mt-4 space-y-2">
            {supportLinks.map((item) => {
              const Icon = item.icon;

              return (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noreferrer" : undefined}
                    className="
                      flex items-center justify-between gap-3 rounded-xl
                      border border-white/10 bg-white/10 px-3 py-2.5
                      text-xs text-cyan-50/90 transition
                      hover:bg-white/20 hover:text-white
                    "
                  >
                    <span className="flex items-center gap-2">
                      <Icon aria-hidden="true" className="h-4 w-4" />
                      <span>{item.label}</span>
                    </span>
                    <span className="font-semibold">{item.value}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
