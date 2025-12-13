/*
=======================================
📘 JavaScript & Web APIs Lab
All tasks in one file (script.js)
=======================================
*/

// Wait for DOM to be ready before accessing elements
document.addEventListener("DOMContentLoaded", function () {
  
  /*  
  =======================================
  TODO1: Welcome Board
  ---------------------------------------
  When the page loads, display a welcome message 
  inside the <p> element with id="t1-msg".

  ✅ Task:
  - Select the element with id "t1-msg".
  - Change its text to "Hello, World!".

  💡 Hint:
  document.getElementById("t1-msg").innerHTML = "Hello, World!";
  */
  const welcomeMsg = document.getElementById("t1-msg");
  if (welcomeMsg) {
    welcomeMsg.textContent = "Hello, World!";
  }

  /*  
  =======================================
  TODO2: Interaction Corner
  ---------------------------------------
  There is a button with id="t2-btn".
  When the button is clicked, change the text inside 
  the <p> with id="t2-status" to:
      "You clicked the button!"

  ✅ Task:
  - Get the button element.
  - Add a click event listener.
  - Inside the event, change the text of the status paragraph.

  💡 Hint:
  button.addEventListener("click", function () {
      // change text here
  });
  */
  const interactionBtn = document.getElementById("t2-btn");
  const statusEl = document.getElementById("t2-status");
  if (interactionBtn && statusEl) {
    interactionBtn.addEventListener("click", function () {
      statusEl.textContent = "You clicked the button!";
    });
  }

  /*  
  =======================================
  TODO3: Inspiring Quote Board
  ---------------------------------------
  Use the Quotable API to display a random quote.

  🌍 API Link:
  https://dummyjson.com/quotes/random

  ✅ Task:
  - When the button with id="t3-loadQuote" is clicked:
      - Fetch a random quote from the API.
      - Display the quote text inside the <p> with id="t3-quote".
      - Display the author inside the <p> with id="t3-author".

  💡 Hint:
  The API returns JSON like:
  {
    "content": "Do not watch the clock. Do what it does. Keep going.",
    "author": "Sam Levenson"
  }

  Use:
  data.content   // the quote text
  data.author    // the author
  */
  const quoteBtn = document.getElementById("t3-loadQuote");
  const quoteEl = document.getElementById("t3-quote");
  const authorEl = document.getElementById("t3-author");
  if (quoteBtn && quoteEl && authorEl) {
    quoteBtn.addEventListener("click", function () {
      fetch("https://dummyjson.com/quotes/random")
        .then(function (response) {
          if (!response.ok) {
            throw new Error("HTTP " + response.status);
          }
          return response.json();
        })
        .then(function (data) {
          // dummyjson API returns 'quote' field, but handle both for flexibility
          quoteEl.textContent = data.quote || data.content || "";
          authorEl.textContent = data.author || "";
        })
        .catch(function (err) {
          quoteEl.textContent = "Failed to load quote. Please try again.";
          authorEl.textContent = "";
          console.error("Quote fetch error:", err);
        });
    });
  }

  /*  
  =======================================
  TODO4: Dammam Weather Now
  ---------------------------------------
  Use the OpenWeatherMap API to display live weather data.

  🌍 API Link:
  https://api.openweathermap.org/data/2.5/weather?q=Dammam&appid=API_KEY=metric

  ⚠️ Replace YOUR_API_KEY with your actual API key from:
  https://openweathermap.org/api

  ✅ Task:
  - When the button with id="t4-loadWx" is clicked:
      - Fetch current weather data for Dammam.
      - Show temperature in the element with id="t4-temp".
      - Show humidity in the element with id="t4-hum".
      - Show wind speed in the element with id="t4-wind".

  💡 Hint:
  data.main.temp      → temperature (°C)
  data.main.humidity  → humidity (%)
  data.wind.speed     → wind speed (m/s)
  */
  const weatherBtn = document.getElementById("t4-loadWx");
  const tempEl = document.getElementById("t4-temp");
  const humEl = document.getElementById("t4-hum");
  const windEl = document.getElementById("t4-wind");
  const errEl = document.getElementById("t4-err");
  
  if (weatherBtn && tempEl && humEl && windEl && errEl) {
    weatherBtn.addEventListener("click", function () {
      // Clear previous error
      errEl.textContent = "";
      
      // Disable button and show loading state
      weatherBtn.disabled = true;
      tempEl.textContent = "Loading...";
      humEl.textContent = "Loading...";
      windEl.textContent = "Loading...";
      
      // Note: The API URL in the TODO has a typo. Using correct format:
      // Replace YOUR_API_KEY with actual key from openweathermap.org
      const apiKey = "YOUR_API_KEY"; // Replace with your actual API key
      const url = `https://api.openweathermap.org/data/2.5/weather?q=Dammam&appid=${apiKey}&units=metric`;
      
      fetch(url)
        .then(function (response) {
          if (!response.ok) {
            throw new Error("HTTP " + response.status);
          }
          return response.json();
        })
        .then(function (data) {
          // Display weather data with units
          tempEl.textContent = (data.main?.temp ?? "—") + " °C";
          humEl.textContent = (data.main?.humidity ?? "—") + " %";
          windEl.textContent = (data.wind?.speed ?? "—") + " m/s";
          weatherBtn.disabled = false;
        })
        .catch(function (err) {
          // Show error message
          errEl.textContent = "Failed to load weather data. " + err.message;
          tempEl.textContent = "—";
          humEl.textContent = "—";
          windEl.textContent = "—";
          weatherBtn.disabled = false;
          console.error("Weather fetch error:", err);
        });
    });
  }

});
