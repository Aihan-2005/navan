type AuthLayoutProps = {
  children: React.ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <section className="min-h-screen bg-[#041121] text-white">
      {children}
    </section>
  );
}