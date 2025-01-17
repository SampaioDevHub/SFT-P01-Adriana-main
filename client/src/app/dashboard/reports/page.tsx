/* eslint-disable import/no-unresolved */
import GenerateStoreReport from "@/features/StoreReport/components/GenerateStoreReport";

export default function ReportsPage() {
    return (
        <main className="flex main-h-screen flex-col items-center justify-between p-24">
            <h1 className="text-4xl font-bold mb-8">
                Relatorio
            </h1>
            <GenerateStoreReport/>
        </main>
    )
}