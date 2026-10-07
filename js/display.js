export function displayContent(lyricsArray, currentIndex, lyricContent) {
    const previewText = document.querySelector('.preview-text');
    const liveText = document.querySelector('.live-text');
    const liveBtn = document.querySelector('.live-btn');
    const backBtn = document.querySelector('.back-btn');
    const nextBtn = document.querySelector('.next-btn');

    previewText.textContent = lyricsArray[currentIndex].lyrics;

    if(lyricsArray) {
        liveBtn.disabled = false;
    }

    console.log(lyricsArray);
}