// full_history.js
// history.js
document.addEventListener("DOMContentLoaded", function() {
    // Function to load the full application history
    function loadFullHistory() {
        chrome.storage.local.get(null, function(items) {
            const historyBody = document.getElementById('historyBody'); // ID corrected to 'historyBody'
            // Sort keys (dates) in descending order
            const dates = Object.keys(items).sort((a, b) => new Date(b) - new Date(a));
            dates.forEach(function(date) {
                const count = items[date];
                const row = document.createElement('tr');
                row.innerHTML = `<td>${date}</td><td>${count}</td>`;
                historyBody.appendChild(row);
            });
        });
    }

    loadFullHistory();
});
