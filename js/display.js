let newIndex = 0;
let currentContent;
const nextBtn = document.querySelector('.next-btn');
const backBtn = document.querySelector('.back-btn');
const previewText = document.querySelector('.preview-text');
const liveText = document.querySelector('.live-text');
const liveBtn = document.querySelector('.live-btn');
let isLive = false;

export function displayContent(lyricsArray, currentIndex) {

    previewText.textContent = lyricsArray[currentIndex].lyrics;
    currentContent = lyricsArray;
    newIndex = currentIndex;
    isLive = false;

    console.log(lyricsArray);
    buttonState();
}


function buttonContentFunctionality() {

    nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        newIndex++;
        console.log(`New Index is currently at: ${newIndex}`);
        previewText.textContent = currentContent[newIndex].lyrics;
        console.log(currentContent[newIndex].lyrics);
        if(isLive === true) {
            liveText.textContent = currentContent[newIndex].lyrics;
        }
        buttonState();
    })

    backBtn.addEventListener('click', (e) => {
        e.preventDefault();
        newIndex--;
        console.log(`New Index is currently at: ${newIndex}`);
        previewText.textContent = currentContent[newIndex].lyrics;
        if(isLive === true) {
            liveText.textContent = currentContent[newIndex].lyrics;
        }
        buttonState();
    })

    liveBtn.addEventListener('click', (e) => {
        e.preventDefault();
        isLive = true;
        liveText.textContent = currentContent[newIndex].lyrics;
    })
}

function buttonState() {
        if(currentContent.length === 1) {
            backBtn.disabled = true;
            nextBtn.disabled = true;
        } else if(newIndex === 0) {
            backBtn.disabled = true;
            nextBtn.disabled = false;
        } else if(newIndex > 0 && newIndex < currentContent.length - 1) {
            backBtn.disabled = false;
            nextBtn.disabled = false;
        } else if(newIndex === currentContent.length - 1) {
            backBtn.disabled = false;
            nextBtn.disabled = true;
        }
    }

buttonContentFunctionality();