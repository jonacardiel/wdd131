// Import the winning numbers from our data file.

import { pastDrawings } from './lottery-data.js';

// Frequency calculation for white balls and Mega Balls
function calculateFrequency(drawings, ballType) {
    const allNumbers = drawings.flatMap(drawing => 
        ballType === 'white' ? drawing.numbers : drawing.megaBall
    );
    return allNumbers.reduce((counts, number) => {
        counts[number] = (counts[number] || 0) + 1;
        return counts;
    }, {});
}

// Returns the most frequent numbers from a frequency map
function getMostFrequent(frequencyMap, count) {
    return Object.entries(frequencyMap)
        .sort(([, countA], [, countB]) => countB - countA)
        .slice(0, count)
        .map(([number]) => parseInt(number));
}

// Returns the most recent drawing
function getLatestDrawing(drawings) {
    return drawings[0];
}

// Finds the most recent date a specific number was drawn
function findLastDrawnDate(numberToFind, drawings, ballType) {
    const drawing = drawings.find(d => 
        ballType === 'white' 
        ? d.numbers.includes(numberToFind) 
        : d.megaBall === numberToFind
    );
    return drawing ? drawing.date : 'N/A';
}


// Page-specific logic: runs code for the current page

// Home Page (index.html)
if (document.getElementById('ticket-checker-form')) {
    // --- DOM ELEMENT SELECTION ---
    const checkerForm = document.getElementById('ticket-checker-form');
    const userWhiteBallInputs = checkerForm.querySelectorAll('.number-group input:not(.mega-ball-input)');
    const userMegaBallInput = checkerForm.querySelector('.mega-ball-input');
    const checkerResultEl = document.getElementById('checker-result');
    const generateBtn = document.getElementById('generate-btn');
    const generatorResultEl = document.getElementById('generator-result');
    const latestNumbersDisplayEl = document.getElementById('latest-numbers-display'); // New element

    // Displays the latest winning numbers
    function displayLatestNumbers() {
        const latestDrawing = getLatestDrawing(pastDrawings);
        latestNumbersDisplayEl.innerHTML = ''; // Clear previous content

        // Create and add the white ball circles
        latestDrawing.numbers.forEach((num, index) => {
            const circle = document.createElement('div');
            circle.className = 'winning-number';
            circle.textContent = num;
            latestNumbersDisplayEl.appendChild(circle);

            // Add a separator after each white ball
            if (index < latestDrawing.numbers.length - 1) {
                const separator = document.createElement('span');
                separator.className = 'number-separator';
                separator.textContent = '-';
                latestNumbersDisplayEl.appendChild(separator);
            }
        });

        // Add a separator for the Mega Ball
        const megaSeparator = document.createElement('span');
        megaSeparator.className = 'number-separator';
        megaSeparator.textContent = '|';
        megaSeparator.style.margin = "0 10px"; // Add extra space
        latestNumbersDisplayEl.appendChild(megaSeparator);

        // Create and add the Mega Ball circle
        const megaCircle = document.createElement('div');
        megaCircle.className = 'winning-number mega-ball';
        megaCircle.textContent = latestDrawing.megaBall;
        latestNumbersDisplayEl.appendChild(megaCircle);
    }

    // Checks the user's ticket against the latest drawing
    checkerForm.addEventListener('submit', (event) => {
        event.preventDefault(); 
        const userWhiteBalls = Array.from(userWhiteBallInputs).map(input => parseInt(input.value));
        const userMegaBall = parseInt(userMegaBallInput.value);
        const latestDrawing = getLatestDrawing(pastDrawings);
        const winningWhiteBalls = latestDrawing.numbers;
        const winningMegaBall = latestDrawing.megaBall;
        const matchingWhiteBalls = userWhiteBalls.filter(num => winningWhiteBalls.includes(num));
        const megaBallMatch = userMegaBall === winningMegaBall;

        let message = '';
        if (matchingWhiteBalls.length === 5 && megaBallMatch) {
            message = '🎉 JACKPOT! You matched all numbers! Congratulations!';
        } else if (megaBallMatch && matchingWhiteBalls.length > 0) {
            message = `Congratulations! You matched ${matchingWhiteBalls.length} white ball(s) and the Mega Ball!`;
        } else if (matchingWhiteBalls.length > 0) {
            message = `You matched ${matchingWhiteBalls.length} white ball(s): ${matchingWhiteBalls.join(', ')}. No Mega Ball match.`;
        } else if (megaBallMatch) {
            message = `You matched the Mega Ball!`;
        } else {
            message = 'Sorry, not a winner this time. Try again!';
        }
        checkerResultEl.textContent = message;
    });

    // Generates lucky numbers based on frequency
    generateBtn.addEventListener('click', () => {
        const whiteBallFreq = calculateFrequency(pastDrawings, 'white');
        const megaBallFreq = calculateFrequency(pastDrawings, 'mega');
        const luckyWhiteBalls = getMostFrequent(whiteBallFreq, 5);
        const luckyMegaBall = getMostFrequent(megaBallFreq, 1);
        luckyWhiteBalls.sort((a, b) => a - b);
        generatorResultEl.innerHTML = `
            <strong>Your Lucky Numbers:</strong> 
            <p>${luckyWhiteBalls.join(' - ')} &nbsp; | &nbsp; <strong>Mega Ball:</strong> ${luckyMegaBall[0]}</p>
        `;
    });

    // Initialize Home Page
    displayLatestNumbers();
}

// Statistics Page (stats.html)
if (document.getElementById('white-ball-stats')) {
    // --- DOM ELEMENT SELECTION ---
    const whiteBallStatsEl = document.getElementById('white-ball-stats');
    const megaBallStatsEl = document.getElementById('mega-ball-stats');
    const showMoreWhiteBtn = document.getElementById('show-more-white');
    const showMoreMegaBtn = document.getElementById('show-more-mega');

    // Displays the stats for white balls and Mega Balls
    function displayStats(container, frequencyMap, drawings, ballType) {
        container.innerHTML = '';
        const sortedStats = Object.entries(frequencyMap).sort(([, countA], [, countB]) => countB - countA);
        
        sortedStats.forEach(([numberStr, count], index) => {
            const number = parseInt(numberStr);
            const lastDrawn = findLastDrawnDate(number, drawings, ballType);
            const statEl = document.createElement('div');
            statEl.className = 'stat-item';
            if (index >= 5) {
                statEl.style.display = 'none';
            }
            statEl.innerHTML = `
                <strong>${number}</strong> 
                <span class="count">(${count} times)</span>
                <span class="last-drawn">Last drawn: ${lastDrawn}</span>
            `;
            container.appendChild(statEl);
        });
    }

    // Handles the Show More / Show Less button logic
    function setupShowMoreButton(button, container) {
        button.addEventListener('click', () => {
            const isShowingMore = button.textContent === 'Show Less';
            const allItems = container.querySelectorAll('.stat-item');
            allItems.forEach((item, index) => {
                if (index >= 5) {
                    item.style.display = isShowingMore ? 'none' : 'block';
                }
            });
            button.textContent = isShowingMore ? 'Show More' : 'Show Less';
        });
    }

    // Initialize Statistics Page
    const whiteBallFreq = calculateFrequency(pastDrawings, 'white');
    const megaBallFreq = calculateFrequency(pastDrawings, 'mega');
    displayStats(whiteBallStatsEl, whiteBallFreq, pastDrawings, 'white');
    displayStats(megaBallStatsEl, megaBallFreq, pastDrawings, 'mega');
    setupShowMoreButton(showMoreWhiteBtn, whiteBallStatsEl);
    setupShowMoreButton(showMoreMegaBtn, megaBallStatsEl);
}
