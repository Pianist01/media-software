let newIndex = 0;
let currentContent;

export function displayContent(lyricsArray, currentIndex, lyricContent) {
    // const previewText = document.querySelector('.preview-text');
    // const liveText = document.querySelector('.live-text');
    // previewText.textContent = lyricsArray[currentIndex].lyrics;

    if(lyricsArray) {
        currentContent = lyricsArray;
        currentIndex = 0;
        newIndex = currentIndex;
        liveBtn.disabled = false;
        nextBtn.disabled = false;
        backBtn.disabled = true;
    }

    console.log(lyricsArray);

    // Button State
    // function buttonState() {
    //     if(lyricsArray.length === 1) {
    //         backBtn.disabled = true;
    //         nextBtn.disabled = true;
    //     } else if(currentIndex === 0) {
    //         backBtn.disabled = true;
    //         nextBtn.disabled = false;
    //     } else if(currentIndex > 0 && currentIndex < lyricsArray.length - 1) {
    //         backBtn.disabled = false;
    //         nextBtn.disabled = false;
    //     } else if(currentIndex === lyricsArray.length - 1) {
    //         backBtn.disabled = false;
    //         nextBtn.disabled = true;
    //     }
    // }

    // function buttonContentFunctionality() {
    //     nextBtn.addEventListener('click', (e) => {
    //         e.preventDefault();
    //         currentIndex++;
    //         console.log(currentIndex);
    //         previewText.textContent = lyricsArray[currentIndex].lyrics;
    //         console.log(lyricsArray[currentIndex].lyrics);
    //         buttonState();
    //     })

    //     backBtn.addEventListener('click', (e) => {
    //         e.preventDefault();
    //         currentIndex--;
    //         console.log(currentIndex);
    //         previewText.textContent = lyricsArray[currentIndex].lyrics;
    //         buttonState();
    //     })
    // }
    // buttonContentFunctionality();

}


function buttonContentFunctionality() {
    const liveBtn = document.querySelector('.live-btn');
    const backBtn = document.querySelector('.back-btn');
    const nextBtn = document.querySelector('.next-btn');
    const previewText = document.querySelector('.preview-text');
    const liveText = document.querySelector('.live-text');
    previewText.textContent = currentContent[newIndex].lyrics;

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

    nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        newIndex++;
        console.log(`New Index is currently at: ${newIndex}`);
        previewText.textContent = currentContent[newIndex].lyrics;
        console.log(currentContent[newIndex].lyrics);
        buttonState();
    })

    backBtn.addEventListener('click', (e) => {
        e.preventDefault();
        newIndex--;
        console.log(`New Index is currently at: ${newIndex}`);
        previewText.textContent = currentContent[newIndex].lyrics;
        buttonState();
    })
}

buttonContentFunctionality();