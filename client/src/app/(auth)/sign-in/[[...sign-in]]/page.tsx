import { SignIn } from "@clerk/nextjs";
import { dark } from '@clerk/themes'

export default function Page() {
  return (
    <>
      <div className="dark:flex hidden justify-center items-center w-full h-[100vh] ">
        <SignIn appearance={{
          baseTheme: dark,
          elements: {
            formButtonPrimary: 'bg-[#e11d48] hover:bg-[#be123c]',
          },
        }}
        />
      </div>

      <div className="flex dark:hidden justify-center items-center w-full h-[100vh] ">
        <SignIn appearance={{
          elements: {
            formButtonPrimary: 'bg-[#e11d48] hover:bg-[#be123c]',
          },
        }}
        />
      </div>
    </>
  );
}