let previewIndex = 0;
let currentSongIndex;
let currentContent;
let previewContent;
const nextBtn = document.querySelector('.next-btn');
const backBtn = document.querySelector('.back-btn');
const previewText = document.querySelector('.preview-text');
const liveText = document.querySelector('.live-text');
const liveBtn = document.querySelector('.live-btn');
let isLive = false;

const liveNextBtn = document.querySelector('.live-next-btn');
const liveBackBtn = document.querySelector('.live-back-btn');

export function displayContent(lyricsArray, currentIndex) {

    previewText.textContent = lyricsArray[currentIndex].lyrics;
    previewContent = lyricsArray;
    previewIndex = currentIndex;
    isLive = false;

    console.log(lyricsArray);
    buttonState(previewContent, previewIndex, backBtn, nextBtn);
}


function buttonContentFunctionality() {

    nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        previewIndex++;
        console.log(`New Index is currently at: ${previewIndex}`);
        previewText.textContent = previewContent[previewIndex].lyrics;
        console.log(previewContent[previewIndex].lyrics);
        if(isLive === true) {
            liveText.textContent = previewContent[previewIndex].lyrics;
        }
        buttonState(previewContent, previewIndex, backBtn, nextBtn);
    })

    backBtn.addEventListener('click', (e) => {
        e.preventDefault();
        previewIndex--;
        console.log(`New Index is currently at: ${previewIndex}`);
        previewText.textContent = previewContent[previewIndex].lyrics;
        if(isLive === true) {
            liveText.textContent = previewContent[previewIndex].lyrics;
        }
        buttonState(previewContent, previewIndex, backBtn, nextBtn);
    })

    liveBtn.addEventListener('click', (e) => {
        e.preventDefault();
        isLive = true;
        liveText.textContent = currentContent[newIndex].lyrics;
        buttonState(currentContent, newIndex, liveBackBtn, liveNextBtn);
    })
}

function buttonState(content, index, backBtn, nextBtn) {
    console.log({backBtn, nextBtn});
    if(backBtn === undefined || nextBtn === undefined) {
        console.log('The buttons are undefined');
    }
        if(content.length === 1) {
            backBtn.disabled = true;
            nextBtn.disabled = true;
        } else if(index === 0) {
            backBtn.disabled = true;
            nextBtn.disabled = false;
        } else if(index > 0 && index < content.length - 1) {
            backBtn.disabled = false;
            nextBtn.disabled = false;
        } else if(index === content.length - 1) {
            backBtn.disabled = false;
            nextBtn.disabled = true;
        }
    }

buttonContentFunctionality();