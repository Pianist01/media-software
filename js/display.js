let previewIndex = 0;
let currentIndex;
let currentContent;
let previewContent;
const nextBtn = document.querySelector('.next-btn');
const backBtn = document.querySelector('.back-btn');
const previewText = document.querySelector('.preview-text');
const liveText = document.querySelector('.live-text');
const liveBtn = document.querySelector('.live-btn');
let isLive;

const liveNextBtn = document.querySelector('.live-next-btn');
const liveBackBtn = document.querySelector('.live-back-btn');

export function displayContent(content, index) {
    previewContent = content;
    previewIndex = index;
    isLive = false;
    previewText.textContent = previewContent[previewIndex].content;
    console.log(previewContent);
    console.log(previewContent[previewIndex].content);
    buttonState(previewContent, previewIndex, backBtn, nextBtn);
}


function buttonContentFunctionality() {

    nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        previewIndex++;
        console.log(`New Index is currently at: ${previewIndex}`);
        previewText.textContent = previewContent[previewIndex].content;
        console.log(previewContent[previewIndex].content);
        
        buttonState(previewContent, previewIndex, backBtn, nextBtn);

        if(previewIndex >= previewContent.length - 1) {
            return;
        }
    })

    backBtn.addEventListener('click', (e) => {
        e.preventDefault();
        previewIndex--;
        console.log(`New Index is currently at: ${previewIndex}`);
        previewText.textContent = previewContent[previewIndex].content;

        buttonState(previewContent, previewIndex, backBtn, nextBtn);

        if(previewIndex <= previewContent.length[0]) {
            return;
        }
    })

    liveBtn.addEventListener('click', (e) => {
        e.preventDefault();
        isLive = true;
        currentContent = previewContent;
        currentIndex = previewIndex
        liveText.textContent = currentContent[currentIndex].content;
        buttonState(currentContent, currentIndex, liveBackBtn, liveNextBtn);
    })

    liveNextBtn.addEventListener('click', (e) => {
        currentIndex++;
        console.log(`Live Index is currently at: ${currentIndex}`);
        liveText.textContent = currentContent[currentIndex].content;
        buttonState(currentContent, currentIndex, liveBackBtn, liveNextBtn);
        if(currentIndex >= currentContent.length - 1) {
            return;
        }
    });

    liveBackBtn.addEventListener('click', (e) => {
        currentIndex--;
        console.log(`Live Index is currently at: ${currentIndex}`);
        liveText.textContent = currentContent[currentIndex].content;
        buttonState(currentContent, currentIndex, liveBackBtn, liveNextBtn);
        if(currentIndex <= currentContent.length[0]) {
            return;
        }
    })
}

function buttonState(content, index, backBtn, nextBtn) {
    console.log({backBtn, nextBtn});

    if(content === undefined) {
        return;
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