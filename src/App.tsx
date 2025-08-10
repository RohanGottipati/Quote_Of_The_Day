import React, { useState, useEffect } from 'react';

interface Quote {
  q: string;
  a: string;
}

function App() {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Apply dark mode class
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Fetch quote
  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const response = await fetch('/api/today');
        const data = await response.json();
        setQuote(data[0]);
      } catch (err) {
        console.error('Error fetching quote:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuote();
  }, []);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">Quote of the Day</h1>
        
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : quote ? (
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-xl mb-4">"{quote.q}"</p>
            <p className="text-lg">— {quote.a}</p>
          </div>
        ) : (
          <div className="text-center">Failed to load quote</div>
        )}
        
        {/* Enhanced Toggle Button */}
        <div className="text-center mt-8">
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 ${
              isDarkMode 
                ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg' 
                : 'bg-gray-200 hover:bg-gray-300 text-gray-800 shadow-lg'
            }`}
          >
            {/* Sun Icon for Light Mode */}
            {!isDarkMode && (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
              </svg>
            )}
            
            {/* Moon Icon for Dark Mode */}
            {isDarkMode && (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            )}
            
            {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
