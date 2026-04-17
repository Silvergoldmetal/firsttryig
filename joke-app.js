// joke-app.js

const apiUrl = 'https://official-joke-api.appspot.com/jokes';

// Function to fetch a random joke by category
async function fetchJoke(category = 'programming') {
    try {
        const response = await fetch(`${apiUrl}/${category}/random`);
        handleResponse(response);
    } catch (error) {
        console.error('Error fetching the joke:', error);
        alert('Failed to fetch a joke. Please try again later.');
    }
}

// Function to handle the API response
async function handleResponse(response) {
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const joke = await response.json();
    displayJoke(joke);
}

// Function to display the joke
function displayJoke(joke) {
    const jokeContainer = document.getElementById('jokeContainer');
    jokeContainer.textContent = `${joke.setup} - ${joke.punchline}`;
    trackJokeHistory(joke);
}

// Function to copy joke to clipboard
function copyToClipboard(joke) {
    const jokeText = `${joke.setup} - ${joke.punchline}`;
    navigator.clipboard.writeText(jokeText).then(() => {
        alert('Joke copied to clipboard!');
    }).catch(err => {
        console.error('Failed to copy joke:', err);
    });
}

// Function to track joke history in local storage
function trackJokeHistory(joke) {
    let history = JSON.parse(localStorage.getItem('jokeHistory')) || [];
    history.push(joke);
    localStorage.setItem('jokeHistory', JSON.stringify(history));
}

// Event listeners for your application (just as an example)
document.getElementById('fetchJokeButton').addEventListener('click', () => fetchJoke('programming'));
document.getElementById('copyJokeButton').addEventListener('click', () => copyToClipboard(currentJoke));
