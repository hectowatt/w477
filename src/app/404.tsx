const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export default function Custom404() {
  return (
    <div className="flex h-screen justify-center items-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
        <p className="mt-4">The page you are looking for doesn't exist.</p>
        <a
          href={`${basePath}/`}
          className="mt-6 px-4 py-2 bg-blue-600 text-white rounded inline-block"
        >
          Go Home
        </a>
      </div>
    </div>
  );
}
