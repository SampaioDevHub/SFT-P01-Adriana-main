/* eslint-disable import/no-unresolved */

import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <main className="flex items-center justify-center min-h-screen pt-14">
      <SignUp
        appearance={{
          elements: {
            card: "max-w-md w-full shadow-lg rounded-lg",
            formButtonPrimary: 'bg-[#e11d48] hover:bg-[#be123c]',
          },
        }}
      />
    </main>
  );
}
