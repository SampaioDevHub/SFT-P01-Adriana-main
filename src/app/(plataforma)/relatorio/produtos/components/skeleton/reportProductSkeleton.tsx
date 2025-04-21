export function ReportProductSkeleton() {
    return (
      <div className="container h-screen mx-auto px-4 py-8 animate-pulse space-y-6">
        <div className="flex gap-4 w-full justify-between items-center">
          <div className="h-32 w-full bg-muted rounded-md" />
          <div className="h-32 w-full bg-muted rounded-md" />
          <div className="h-32 w-full bg-muted rounded-md" />
          <div className="h-32 w-full bg-muted rounded-md" />
        </div>
  
        <div className="flex w-full justify-between items-center">
          <div className="h-8 w-1/5 bg-muted rounded-md" />
          <div className="h-8 w-1/5 bg-muted rounded-md" />
        </div>
  
        <div className="w-full h-56 rounded-md bg-muted"></div>
      </div>
    );
  }
  