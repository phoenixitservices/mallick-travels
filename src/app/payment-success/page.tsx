export default function PaymentSuccessPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50">

      <div className="rounded-3xl bg-white p-12 text-center shadow-2xl">

        <div className="text-7xl">
          🎉
        </div>

        <h1 className="mt-6 text-5xl font-bold">
          Payment Successful
        </h1>

        <p className="mt-4 text-lg text-gray-500">
          Your booking has been confirmed successfully.
        </p>

        <a
          href="/"
          className="mt-8 inline-block rounded-2xl bg-black px-8 py-4 font-semibold text-white transition hover:bg-blue-600"
        >
          Back To Home
        </a>
      </div>
    </main>
  );
}