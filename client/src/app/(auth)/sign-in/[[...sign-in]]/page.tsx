import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex justify-center py-24 ">
      <SignIn appearance={{
        elements: {
          formButtonPrimary: 'bg-[#e11d48] hover:bg-[#be123c]',
        },
      }}
      />
    </div>
  );
}