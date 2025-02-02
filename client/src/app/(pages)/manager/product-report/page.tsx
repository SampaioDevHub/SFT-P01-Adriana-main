import { ProductReport } from "./_components/product-report"

// dados 
const mockProducts = [
  {
    id: "1",
    name: "Notebook Pro",
    category: "Eletrônicos",
    price: 4999.99,
    stock: 15,
    sales: 23,
    lastUpdated: "2024-01-30",
  },
  {
    id: "2",
    name: "Mouse Sem Fio",
    category: "Acessórios",
    price: 89.99,
    stock: 45,
    sales: 156,
    lastUpdated: "2024-01-29",
  },
]

export default function ReportPage() {
  return (
    <div className="container mx-auto py-10">
      <ProductReport products={mockProducts} />
    </div>
  )
}

