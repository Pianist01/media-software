export function displayContent(lyricsArray, currentIndex, lyricContent) {
    const previewText = document.querySelector('.preview-text');
    const liveText = document.querySelector('.live-text');
    const liveBtn = document.querySelector('.live-btn');

    previewText.textContent = lyricsArray[currentIndex].lyrics;

    if(lyricContent) {
        liveBtn.disabled = false;
    }

    console.log(lyricsArray);
}