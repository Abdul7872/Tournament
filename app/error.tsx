'use client'
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  console.log(error.message)
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <h2>{error.message || "Something went wrong!"}</h2>
      <button onClick={() => reset()} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
        Try again
      </button>
    </div>
  )
}