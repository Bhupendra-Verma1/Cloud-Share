const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
        <div className="text-center max-w-md">
            <h1 className="text-8xl font-extrabold text-purple-500 mb-6">404</h1>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                Something's missing.
            </h2>
            <p className="text-gray-600 mb-8">
                Sorry, we can’t find that page. You’ll find lots to explore on the home page.
            </p>
            <a
                href="/"
                className="px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-500 hover:bg-purple-600 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
                Back to Home
            </a>
        </div>
    </div>
  );
};

export default NotFound;
