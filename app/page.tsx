export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* Container for search text and input box */}
      <div className="z-10 w-full max-w-5xl items-center font-mono text-sm lg:flex">
        <div className="mr-4">Search:</div>
        <input type="text" className="border border-gray-300 px-3 py-1 rounded-md" placeholder="finger" />
      </div>
    </main>
  );
}
