// app/page.tsx
"use client";
import dynamic from 'next/dynamic';

const LoginForm = dynamic(() => import('../src/components/auth/login'), {
  ssr: false, 
  loading: () => <p>Loading login form...</p>, 
});

export default function HomePage() {
  return (
    <div className="flex items-center justify-center sm:min-h-screen bg-gray-900">
      {/* */}
      <LoginForm />
    </div>
  );
}
