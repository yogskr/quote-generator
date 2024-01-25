# Quote Generator

## Table of contents

- [Overview](#overview)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
- [Author](#author)

## Overview

As the name suggests, it generates a random quote from an API, [quotable](https://github.com/lukePeavey/quotable) by _Luke Peavey_.

### Screenshot

#### Mobile Screenshot

![Mobile Screenshot](./public/mobile-screenshot.png)

#### Desktop Screenshot

![Desktop Screenshot](./public/desktop-screenshot.png)

### Links

Live URL: [https://yogskr.github.io/quote-generator/](https://yogskr.github.io/quote-generator/)

## My process

### Built with

This project is built with:

- HTML5
- CSS3 Flexbox
- JavaScript

### What I learned

In this project, I built a quote generator that randomly generates a quote from an API [quotable](https://github.com/lukePeavey/quotable). I use JavaScript `async..await` to request data from the API.

```js
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
```

## Author

- Website - [Yoga Krisanta](https://yogskr.github.io/personal-website)
- Frontend Mentor - [@yogskr](https://www.frontendmentor.io/profile/yogskr)
- GitHub - [@yogskr](https://www.github.com/yogskr)
- Twitter - [@yogskr\_](https://www.twitter.com/yogskr_)
