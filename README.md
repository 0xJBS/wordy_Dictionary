# Wordly Dictionary SPA

## Project Overview

Wordly Dictionary is a Single Page Application (SPA) that allows users to search for English words and instantly retrieve definitions, pronunciation, examples, and synonyms without reloading the page.

The application demonstrates modern JavaScript techniques such as API integration, DOM manipulation, and asynchronous programming.



## Objectives

* Build a dynamic SPA using JavaScript
* Integrate with an external dictionary API
* Provide real-time search results
* Improve user experience with responsive UI and error handling



## Features

Word Search
Users can input any English word and retrieve results instantly.

Dictionary Data Display
Displays:

* Word
* Phonetic pronunciation
* Definition
* Example sentence
* Synonyms

Audio Pronunciation

* Plays pronunciation audio when available
* Hides audio player if not available

Smart Synonym Handling

* Valid synonyms are clickable
* Invalid synonyms are disabled and marked as “Word not defined”

Error Handling

* Handles invalid words and API failures
* Displays clear messages without breaking the UI

Dynamic UI Updates

* Updates content without page reload
* Clears results when input is empty



## Technologies Used

* HTML5
* CSS3
* JavaScript (ES6)
* Fetch API
* Free Dictionary API



## API Used

Free Dictionary API
https://api.dictionaryapi.dev/

Reason for choice:

* Free and no API key required
* Provides definitions, phonetics, and audio

Limitations:

* Some words may not have full data
* Some synonyms may be invalid
* Audio is not always available



## Project Structure

wordly/

* index.html
* wordy.css
* wordy.js
* README.md



## Installation & Setup

1. Clone the repository
2. Open the project folder
3. Open index.html with Live Server



## Usage

1. Enter a word in the search bar
2. Click "Search"
3. View results
4. Click a synonym to search it



## Testing

The app has been tested for:

* Valid words
* Invalid words
* Missing data (examples, synonyms, audio)
* Clearing input



## Key Design Decisions

* SPA architecture for fast interaction
* Validation of API data before display
* Synonym validation to avoid broken results
* Caching to reduce repeated API calls



## Future Improvements

* Save favorite words
* Search history
* Dark/light theme
* Voice selection
* Loading spinner


## Limitations

* Depends on external API
* Some data may be incomplete
* Extra API calls for synonym validation


## Author

Johnson Barasa


## Conclusion

This project demonstrates how to build a responsive and interactive web application using modern JavaScript techniques while handling real-world data limitations effectively.



## Repository

https://github.com/0xJBS/wordy_Dictionary.git
