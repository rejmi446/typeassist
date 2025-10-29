'use client';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-gray-900">
            TypeAssist
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Advanced OCR-powered text recognition with AI
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg">
            Get Started
          </button>
        </div>
      </div>
    </main>
  );
}
