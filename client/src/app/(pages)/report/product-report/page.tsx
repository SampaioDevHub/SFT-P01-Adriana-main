'use client'


import { GenerateStoreReport } from './_components/GenerateStoreReport';

export default function ReportPage() {

  return (
    <>
      <div className="container flex flex-col lg:gap-0 gap-8 px-4 py-8">
        <GenerateStoreReport />
        <div
          className="hidden h-[65vh] w-full bg-cover bg-center lg:flex"
          style={{
            backgroundImage: "url('/assets/relatorio-products-report.gif')",
          }}
        ></div>
        <div
          className="h-[40vh] w-full bg-cover bg-center lg:hidden"
          style={{
            backgroundImage: "url('/assets/relatorio-products-gif-tab.png')",
          }}
        ></div>
      </div>
    </>
  );
}

