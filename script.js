//save() function inspired by Google Overview
function save() {
    const text = document.getElementById("input").textContent.trim().toLowerCase().replaceAll(/[!,.]/g,"");
    localStorage.setItem('savedQuote', text);
    console.log(text);
}

//all CSV analysis was vibe coded using ChatGPT
async function load() {
    const savedText = localStorage.getItem("savedQuote");

    const inputWords = tokenize(savedText);
    const poems = await loadCSV();

    const MAX_POEM_WORDS = 150;
    const filteredPoems = poems.filter(poem => {
    const wordCount = tokenize(poem.text).length;
    return wordCount <= MAX_POEM_WORDS;
    });

    let bestMatch = null;
    let bestScore = 0;

    filteredPoems.forEach(poem => {
    const poemWords = tokenize(poem.text);
    const score = similarityScore(inputWords, poemWords);

    if (score > bestScore) {
        bestScore = score;
        bestMatch = poem;
        }
    });

    const output = document.getElementById("output");

    output.textContent = bestMatch
    ? `${bestMatch.title}\n\n${bestMatch.poet}\n\n${bestMatch.text}`
    : "No match found.";
}

async function loadCSV() {
    const response = await fetch("PoetryFoundationData.csv");
    const csvText = await response.text();
    return parseCSV(csvText);
}

function parseCSV(csv) {
    const rows = [];
    let current = "";
    let inQuotes = false;

    // Handle multi-line quoted fields
    for (let char of csv) {
        if (char === '"') inQuotes = !inQuotes;
        if (char === '\n' && !inQuotes) {
            rows.push(current);
            current = "";
        } else {
            current += char;
        }
    }
    if (current) rows.push(current);

    // Remove header
    rows.shift();

    return rows.map(row => {
        const parts = [];
        let field = "";
        let insideQuotes = false;

        for (let i = 0; i < row.length; i++) {
            const char = row[i];

            if (char === '"') {
                insideQuotes = !insideQuotes;
            } else if (char === ',' && !insideQuotes) {
                parts.push(field);
                field = "";
            } else {
                field += char;
            }
        }
        parts.push(field); // last field

        // Extract fields safely
        const title = parts[1]?.trim() || "";
        let text = parts[2]?.trim() || "";
        let poet = parts[3]?.trim() || "";

        // Remove wrapping quotes
        if (text.startsWith('"') && text.endsWith('"')) {
            text = text.slice(1, -1);
        }

        // Normalize line breaks
        text = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n');

        if (poet.startsWith('"') && poet.endsWith('"')) {
            poet = poet.slice(1, -1);
        }

        return { title, text, poet };
    });
}

function tokenize(text) {
    if (!text) return [];

    return text
        .toLowerCase()
        .replace(/[^\w\s]/g, " ")
        .split(/\s+/)
        .filter(Boolean);
}

function similarityScore(inputWords, poemWords) {
    const poemSet = new Set(poemWords);
    let matches = 0;

    for (const word of inputWords) {
        if (poemSet.has(word)) matches++;
    }

    console.log(matches)
    return matches;
}

