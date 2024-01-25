const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// Show Loading
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// Hide Loading
function complete() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

// Show Local Quote
function showLocalQuote() {
  loading();
  const quote = localQuotes[Math.floor(Math.random() * localQuotes.length)];
  // Check if Author field is blank and replace it with 'Unknown'
  if (!quote.author) {
    authorText.textContent = 'Unknown';
  } else {
    authorText.textContent = quote.author;
  }

  // Check Quote length to determine styling
  if (quote.text.length > 120) {
    quoteText.classList.add('long-quote');
  } else {
    quoteText.classList.remove('long-quote');
  }
  // Set Quote, Hide Loader
  quoteText.textContent = quote.text;
  complete();
}

// Get Quotes From API
async function getQuotes() {
  loading();
  const apiUrl = 'https://api.quotable.io/quotes/random';
  try {
    const response = await fetch(apiUrl);
    if (response.ok) {
      const apiQuotes = await response.json();

      // Get a random quote from API
      const getRandomQuote = apiQuotes.map((data) => data.content);
      quoteText.textContent = getRandomQuote;

      // Check quote length to determine styling
      if (quoteText.length > 90) {
        quoteText.classList.add('long-quote');
      } else {
        quoteText.classList.remove('long-quote');
      }

      // Get the quote author from API
      const getAuthor = apiQuotes.map((data) => data.author);
      authorText.textContent = getAuthor;
    } else {
      showLocalQuote();
      throw new Error('Request Failed!');
    }
  } catch (error) {
    // Catch Error Here
    console.log(error);
  }
  complete();
}

// Tweet Quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', getQuotes);
twitterBtn.addEventListener('click', tweetQuote);

// On Page Load
getQuotes();
