# Quote of the Day

A React TypeScript application that displays the daily quote from ZenQuotes API with a dark/light mode toggle.

## Features

- 🌅 **Daily Quotes**: Fetches the quote of the day from ZenQuotes API
- 🌙 **Dark/Light Mode**: Simple theme toggle
- 📱 **Responsive Design**: Works on all devices
- 🎨 **Clean UI**: Minimal and clean design

## Tech Stack

- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **ZenQuotes API** for quote data

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## API Configuration

This project uses the ZenQuotes API with a development proxy to avoid CORS issues:

- **Development**: Uses CRA's built-in proxy (`"proxy": "https://zenquotes.io"`)
- The app calls `/api/today` which gets proxied to `https://zenquotes.io/api/today`

## Project Structure

```
src/
├── App.tsx        # Main app component
├── index.tsx      # React entry point
└── index.css      # Global styles and Tailwind imports
```

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm test` - Launches the test runner

## How It Works

1. **Quote Fetching**: Uses `useEffect` to fetch the daily quote from ZenQuotes API on component mount
2. **Dark Mode**: Simple state toggle that adds/removes the `dark` class to the document
3. **UI**: Clean, minimal interface with Tailwind CSS styling

## API Usage

The app fetches from the ZenQuotes API endpoint `/api/today` which returns:
```json
[
  {
    "q": "Quote text here",
    "a": "Author name"
  }
]
```

## License

This project is open source and available under the [MIT License](LICENSE).
