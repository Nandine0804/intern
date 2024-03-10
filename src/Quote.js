//To attract and make it even more informational or important to end users to see how journel is important










import React, { useState, useEffect } from "react";
import "./quote.css"
const JournalQuotes = () => {
  const [quotes, setQuotes] = useState([
    "We’re drawn to making our mark, leaving a record to show we were here, and a journal is a great place to do it.",
    "Your journal will stand as a chronicle of your growth, your hopes, your fears, your dreams, your ambitions, your sorrows, your serendipities.",
    "Journal writing is a voyage to the interior.",
    "Journal what you love, what you hate, what’s in your head, what’s important. Journaling organizes your thoughts; allows you to see things in a concrete way that otherwise you might not see.",
    // Add more quotes as needed
  ]);

  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    }, 5000); // Change quote every 5 seconds

    return () => clearInterval(interval);
  }, [quotes.length]); // Re-run effect when quotes array length changes

  return (
    <div className="quote-container">
      {quotes.map((quote, index) => (
        <p
          key={index}
          className={`quote ${index === currentQuoteIndex ? "active" : ""}`}
        >
          {quote}
        </p>
      ))}
    </div>
  );
};

export default JournalQuotes;
