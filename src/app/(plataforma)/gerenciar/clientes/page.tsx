import { Suspense } from 'react';
import CustomersPage from './Customers';

export default function Page() {
  return (
    <Suspense fallback={<CustomersSkeleton />}>
      <CustomersPage />
    </Suspense>
  );
}

function CustomersSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8 animate-pulse space-y-6">
      <div className="h-8 w-1/3 bg-muted rounded-md" />
      
      <div className="flex justify-between items-center">
        <div className="h-6 w-1/4 bg-muted rounded-md" />
        <div className="h-10 w-32 bg-muted rounded-md" />
      </div>

      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="grid grid-cols-4 gap-4">
            <div className="h-6 bg-muted rounded-md" />
            <div className="h-6 bg-muted rounded-md" />
            <div className="h-6 bg-muted rounded-md" />
            <div className="h-6 bg-muted rounded-md" />
          </div>
        ))}
      </div>
    </div>
  );
}
