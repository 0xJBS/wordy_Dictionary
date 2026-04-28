// Select elements
const form = document.getElementById("search-form");
const input = document.getElementById("word-input");
const errorMessage = document.getElementById("error-message");

const wordEl = document.getElementById("word");
const phoneticEl = document.getElementById("phonetic");
const definitionEl = document.getElementById("definition");
const exampleEl = document.getElementById("example");
const synonymsEl = document.getElementById("synonyms");
const audioEl = document.getElementById("audio");

// Simple cache (prevents repeated API calls for same words)
const validWordCache = {};

// Event listener
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const word = input.value.trim();

  if (!word) {
    showError("Please enter a word");
    return;
  }

  fetchWord(word);
});

// Fetch word from API
function fetchWord(word) {
  errorMessage.textContent = "Loading...";

  fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`"${word}" is not defined`);
      }
      return response.json();
    })
    .then(data => {
      // Validate structure before using it
      if (
        !data ||
        !data[0] ||
        !data[0].meanings ||
        data[0].meanings.length === 0 ||
        !data[0].meanings[0].definitions ||
        data[0].meanings[0].definitions.length === 0
      ) {
        throw new Error(`"${word}" is not defined`);
      }

      errorMessage.textContent = "";
      displayResult(data);
    })
    .catch(error => {
      showError(error.message);
    });
}

// Check if a synonym is valid (with caching)
function isValidWord(word) {
  if (validWordCache[word] !== undefined) {
    return Promise.resolve(validWordCache[word]);
  }

  return fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    .then(res => {
      const isValid = res.ok;
      validWordCache[word] = isValid;
      return isValid;
    })
    .catch(() => {
      validWordCache[word] = false;
      return false;
    });
}

// Handle synonym click
function handleSynonymClick(word) {
  input.value = word;
  fetchWord(word);
}

// Render synonyms with validation
async function renderSynonyms(synonyms) {
  synonymsEl.innerHTML = "";

  for (let word of synonyms) {
    const span = document.createElement("span");
    span.textContent = word;

    const valid = await isValidWord(word);

    if (valid) {
      span.onclick = () => handleSynonymClick(word);
    } else {
      span.style.opacity = "0.5";
      span.style.cursor = "not-allowed";
      span.title = "Word not defined";
    }

    synonymsEl.appendChild(span);
  }
}

// Display results
function displayResult(data) {
  const wordData = data[0];

  // Basic info
  wordEl.textContent = wordData.word;
  phoneticEl.textContent = wordData.phonetic || "";

  // Meaning & definition
  const meaning = wordData.meanings[0];
  const definition = meaning.definitions[0];

  definitionEl.textContent = definition.definition;
  exampleEl.textContent = definition.example || "No example available";

  // Synonyms (safe fallback)
  const synonyms =
    meaning.synonyms ||
    definition.synonyms ||
    [];

  if (synonyms.length > 0) {
    renderSynonyms(synonyms);
  } else {
    synonymsEl.textContent = "No synonyms available";
  }

  // Audio handling
  if (
    wordData.phonetics &&
    wordData.phonetics.length > 0 &&
    wordData.phonetics[0].audio
  ) {
    audioEl.src = wordData.phonetics[0].audio;
    audioEl.style.display = "block";
  } else {
    audioEl.style.display = "none";
  }
}

// Error handling (DO NOT clear previous results)
function showError(message) {
  errorMessage.textContent = message;
}

// Clear UI when input is empty
input.addEventListener("input", function () {
  if (input.value.trim() === "") {
    clearResults();
  }
});

function clearResults() {
  wordEl.textContent = "";
  phoneticEl.textContent = "";
  definitionEl.textContent = "";
  exampleEl.textContent = "";
  synonymsEl.innerHTML = "";
  audioEl.style.display = "none";
  errorMessage.textContent = "";
}