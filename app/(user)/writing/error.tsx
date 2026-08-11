"use client";

type ErrorProps = {
  error: Error;
  reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
  return (
    <div>
      <h2>خطایی رخ داد</h2>

      <button onClick={() => reset()}>
        تلاش مجدد
      </button>
    </div>
  );
}