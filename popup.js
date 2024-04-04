document.addEventListener("DOMContentLoaded", () => {
  const countDisplay = document.getElementById("count");
  const incrementButton = document.getElementById("increment");
  const dateDisplay = document.getElementById("date");
  const resetButton = document.getElementById("reset");

  // Function to get today's date in YYYY-MM-DD format
  function getTodayDateString() {
    const today = new Date();
    return today.toISOString().split("T")[0];
    //const simulateDate = new Date();
    //simulateDate.setDate(simulateDate.getDate() + 10);
    //return simulateDate.toISOString().split("T")[0];
  }

  // Function to load the count for today and display it
  function loadCount() {
    const todayString = getTodayDateString();
    chrome.storage.local.get([todayString], function (result) {
      const todayCount = result[todayString] ? result[todayString] : 0;
      countDisplay.textContent = todayCount;
    });
  }

  // Function to increment the count for today
  function incrementCount() {
    const todayString = getTodayDateString();
    chrome.storage.local.get([todayString], function (result) {
      let todayCount = result[todayString] ? result[todayString] : 0;
      todayCount++;
      chrome.storage.local.set({ [todayString]: todayCount }, function () {
        countDisplay.textContent = todayCount;
        loadApplicationHistory(); // Reload the application history to update the display
      });
    });
  }

  // Function to update the date display
  function updateDateDisplay() {
    const todayString = getTodayDateString();
    dateDisplay.textContent = `Today (${todayString}):`;
  }

  // Function to reset the count for today
  function resetCount() {
    const todayString = getTodayDateString();
    chrome.storage.local.set({ [todayString]: 0 }, function () {
      countDisplay.textContent = "0";
      loadApplicationHistory(); // Reload the application history to update the display
    });
  }

  // Function to load the application history
  function loadApplicationHistory() {
    chrome.storage.local.get(null, function (items) {
      const historyBody = document.getElementById("historyBody");
      if (historyBody) {
        historyBody.innerHTML = ""; // Clear current history

        // Get keys and sort them in descending order (most recent date first)
        Object.keys(items)
          .sort((a, b) => new Date(b) - new Date(a))
          .forEach(function (date) {
            const count = items[date];
            const row = document.createElement("tr");
            row.innerHTML = `<td>${date}</td><td>${count}</td>`;
            historyBody.appendChild(row); // Append new row to history
          });
      }
    });
  }

  // Load the current count and the application history when the popup is opened
  updateDateDisplay();
  loadCount();
  loadApplicationHistory();

  // Add event listeners for the buttons
  incrementButton.addEventListener("click", incrementCount);
  resetButton.addEventListener("click", resetCount);
});
