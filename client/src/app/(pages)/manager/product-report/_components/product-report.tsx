/* eslint-disable import/no-unresolved */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ProductsTable } from "./products-table"
import type { Product } from "../types/product"
import { DollarSign, Package, TrendingUp } from "lucide-react"
import type React from "react" // Import React

function StatCard({
  title,
  value,
  icon: Icon,
  description,
}: {
  title: string
  value: string
  icon: React.ElementType
  description: string
}) {
  return (
    <Card className="transition-all duration-300 hover:scale-105 hover:shadow-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}

export function ProductReport({ products }: { products: Product[] }) {
  // Calcular estatísticas
  const totalProducts = products.length
  const totalStock = products.reduce((acc, product) => acc + product.stock, 0)
  const totalSales = products.reduce((acc, product) => acc + product.sales, 0)
  const totalRevenue = products.reduce((acc, product) => acc + product.price * product.sales, 0)

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total de Produtos"
          value={totalProducts.toString()}
          icon={Package}
          description="Produtos cadastrados"
        />
        <StatCard
          title="Estoque Total"
          value={totalStock.toString()}
          icon={Package}
          description="Unidades em estoque"
        />
        <StatCard
          title="Total de Vendas"
          value={totalSales.toString()}
          icon={TrendingUp}
          description="Unidades vendidas"
        />
        <StatCard
          title="Receita Total"
          value={new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(totalRevenue)}
          icon={DollarSign}
          description="Receita gerada"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Relatório de Produtos</CardTitle>
        </CardHeader>
        <CardContent>
          <ProductsTable data={products} />
        </CardContent>
      </Card>
    </div>
  )
}

