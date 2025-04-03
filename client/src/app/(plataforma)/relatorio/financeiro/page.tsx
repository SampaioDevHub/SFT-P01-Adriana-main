import { GenerateFinacialReport } from './_components/GenerateFinancialReport';

export default function ReportsPage() {
  return (
    <div className="container flex flex-col lg:gap-0 gap-8 px-4 py-8">
      <GenerateFinacialReport />
      <div
        className="h-[65vh] hidden lg:flex w-full bg-cover bg-center"
        style={{
          backgroundImage: "url('/assets/relatorio-financial-report.gif')",
        }}
      ></div>
      <div
        className="h-[40vh] w-full bg-cover bg-center lg:hidden"
        style={{
          backgroundImage: "url('/assets/relatorio-financial-gif-tab.gif')",
        }}
      ></div>
    </div>
  );
}
