import { SummaryCard } from "./summary-card";

interface SummaryGridProps {
  totalProducts: number;
  lowStock: number;
  averageRating: number;
  inventoryValue: number;
}

export function SummaryGrid({
  totalProducts,
  lowStock,
  averageRating,
  inventoryValue,
}: SummaryGridProps) {
  return (
    <section
      aria-label="Product summary"
      className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
    >
      <SummaryCard
        label="Total Products"
        value={totalProducts.toLocaleString()}
        description="Products in catalogue"
      />

      <SummaryCard
        label="Low Stock"
        value={lowStock.toLocaleString()}
        description="On this page"
      />

      <SummaryCard
        label="Average Rating"
        value={`${averageRating.toFixed(1)} / 5`}
        description="Across loaded products"
      />

      <SummaryCard
        label="Inventory Value"
        value={`$${inventoryValue.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`}
        description="Based on loaded products"
      />
    </section>
  );
}