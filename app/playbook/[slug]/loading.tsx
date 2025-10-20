export default function Loading() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <div className="h-12 w-2/3 bg-gray-800 rounded-lg mx-auto animate-pulse"></div>
        <div className="h-6 w-1/3 bg-gray-800 rounded-lg mx-auto mt-4 animate-pulse"></div>
      </div>
      <div className="space-y-6">
        <div className="h-8 w-1/2 bg-gray-800 rounded-lg animate-pulse"></div>
        <div className="h-40 bg-gray-800 rounded-lg animate-pulse"></div>
        <div className="h-8 w-1/3 bg-gray-800 rounded-lg animate-pulse"></div>
        <div className="h-64 bg-gray-800 rounded-lg animate-pulse"></div>
      </div>
    </main>
  );
}