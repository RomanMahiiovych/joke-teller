const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

//Disable/Enable Button
function toggleButton() {
    //when button is disable then opposite state - enabled
    button.disabled = !button.disabled;
}

//Passing Joke to VoiseRSS API
function tellMe(joke) {
    VoiceRSS.speech({
        key: '7090d620054f4ac2b76a2972b5cda113',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

// Get Joke From JokeAPI
async function getJokes() {
    let joke = '';
    const apiUrl = 'https://sv443.net/jokeapi/v2/joke/Programming,Dark?blacklistFlags=nsfw,religious,political,racist';
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.setup) {
            joke = `${data.setup}...${data.delivery}`;
        } else {
            joke = data.joke;
        }
        // console.log(joke);
        //call ather function with own parameter
        tellMe(joke);
        //Disable Button until function tellMe is complited
        toggleButton();
    } catch(error) {
        console.log('woops', error);
    }
}

// Event Listeners
button.addEventListener('click', getJokes);
// The ended event occurs when the audio/video has reached the end.
audioElement.addEventListener('ended', toggleButton)