/* eslint-disable import/no-unresolved */

import { SignUp } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

export default function Page() {
  return (
    <>
      <div className="hidden dark:flex items-center justify-center min-h-screen">
        <div className="max-h-[80%] shadow-xl pr-1 overflow-y-auto overflow-x-hidden rounded-lg">
          <SignUp
            appearance={{ 
              baseTheme: dark,
              elements: {
                formButtonPrimary: 'bg-[#e11d48] hover:bg-[#be123c]',
              },
            }}
          />
        </div>
      </div>

      <div className="flex dark:hidden items-center justify-center min-h-screen">
        <div className="max-h-[80%] shadow-xl pr-1 overflow-y-auto overflow-x-hidden rounded-lg">
          <SignUp
            appearance={{
              elements: {
                formButtonPrimary: 'bg-[#e11d48] hover:bg-[#be123c]',
              },
            }}
          />
        </div>  
      </div>
    </>
  );
}
