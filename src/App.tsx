import React, { useState, useEffect } from 'react';

interface Quote {
  q: string;
  a: string;
}

function App() {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    fetchQuote();
  }, []);

  const fetchQuote = async () => {
    try {
      const response = await fetch('/api/today');
      if (response.ok) {
        const data = await response.json();
        setQuote(data[0]);
        setError(null);
      } else {
        setError('API rate limit reached. Please try again later.');
      }
    } catch (err) {
      setError('Failed to load quote. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const shareQuote = () => {
    if (quote) {
      const text = `"${quote.q}" - ${quote.a}`;
      if (navigator.share) {
        navigator.share({ title: 'Quote of the Day', text });
      } else {
        navigator.clipboard.writeText(text).then(() => {
          alert('Quote copied to clipboard!');
        });
      }
    }
  };

  const LoadingSpinner = () => (
    <div className="text-center">
      <div className="w-12 h-12 border-4 border-blue-200 rounded-full animate-spin mx-auto"></div>
      <p className="mt-4 text-lg">Loading quote...</p>
    </div>
  );

  const ErrorMessage = () => (
    <div className="text-center">
      <p className="text-xl mb-4 text-red-500">{error}</p>
      <button 
        onClick={() => window.location.reload()} 
        className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Try Again
      </button>
    </div>
  );

  const QuoteDisplay = () => (
    <div className="max-w-2xl mx-auto">
      <div className={`p-8 rounded-lg border shadow-lg ${
        isDarkMode ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-300'
      }`}>
        <div className="text-center">
          <p className={`text-xl mb-6 italic ${
            isDarkMode ? 'text-white' : 'text-gray-800'
          }`}>
            "{quote?.q}"
          </p>
          <p className={`text-lg font-semibold ${
            isDarkMode ? 'text-blue-300' : 'text-blue-600'
          }`}>
            — {quote?.a}
          </p>
        </div>
        <div className="text-center mt-6">
          <button 
            onClick={shareQuote}
            className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Share Quote
          </button>
        </div>
      </div>
    </div>
  );

  const ThemeToggle = () => (
    <div className="text-center mt-8">
      <button
        onClick={() => setIsDarkMode(!isDarkMode)}
        className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      </button>
    </div>
  );

  return (
    <div className={`min-h-screen ${
      isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'
    }`}>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">
          Quote of the Day
        </h1>
        
        <div className="flex justify-center items-center min-h-96">
          {loading && <LoadingSpinner />}
          {error && <ErrorMessage />}
          {quote && <QuoteDisplay />}
        </div>
        
        <ThemeToggle />
      </div>
    </div>
  );
}

export default App;
