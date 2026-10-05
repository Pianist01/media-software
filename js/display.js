export function displayContent(content) {
    const previewText = document.querySelector('.preview-text');
    const liveText = document.querySelector('.live-text');

    previewText.textContent = content;

}