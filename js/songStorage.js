export function saveSongs(songs) {
    console.log(songs);
    const songsToString = JSON.stringify(songs);
    console.log(songsToString);
    return songsToString;
}

export function loadSongs(savedStringSong) {
    const stringToData = JSON.parse(savedStringSong);
    console.log(stringToData);
    console.log(stringToData);
    return stringToData;
}
