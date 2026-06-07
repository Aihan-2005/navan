export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-[#041121] text-white antialiased">
      {children}
    </main>
  );
}
