export function createSongPanel() {
    addSong();
}

function addSong() {
    const panel = document.querySelector('.panel');
    const addSongBtn = document.querySelector('.add-song-btn');
    addSongBtn.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('Song Button Clicked');

        const songPanelContainer = document.createElement('div');
        songPanelContainer.classList.add('song-panel-container');

        const searchFormContainer = document.createElement('search');
        searchFormContainer.classList.add('search-form-container');

        const searchForm = document.createElement('form');
        searchForm.classList.add('search-form');

        const searchInput = document.createElement('input');
        searchInput.classList.add('search-input');
        searchInput.type = 'search';
        searchInput.placeholder = 'Search for a song';

        const exitBtn = document.createElement('button');
        exitBtn.classList.add('exit-btn');
        exitBtn.textContent = 'X';

        const addNewSongBtn = document.createElement('button');
        addNewSongBtn.classList.add('add-new-song-btn');
        addNewSongBtn.textContent = 'Add New Song';

        addNewSongBtn.addEventListener('click', (e) => {
            e.preventDefault();
            createNewSong();
        });

        exitBtn.addEventListener('click', (e) => {
            e.preventDefault();
            songPanelContainer.style.display = 'none';
            songPanelContainer.remove();
        });

        searchForm.append(searchInput);
        searchFormContainer.append(searchForm, exitBtn);
        songPanelContainer.append(searchFormContainer, addNewSongBtn);
        panel.append(songPanelContainer);

        // Song List

        let selectedSong;
        let currentSectionIndex = 0;

        const songListContainer = document.createElement('div');
        songListContainer.classList.add('song-list-container');
        const songListUL = document.createElement('ul');
        songListUL.classList.add('song-list-ul');
        const songPreviewText = document.querySelector('.preview-text');
        const backBtn = document.querySelector('.back-btn');
        backBtn.disabled = true;
        const nextBtn = document.querySelector('.next-btn');
        nextBtn.disabled = true;

        for(const value of Object.values(songList)) {
            console.log(`Song Title: ${value.title}`);
            const songListLI = document.createElement('li');
            songListLI.classList.add('song-list-li');
            songListLI.textContent = value.title;
            songListUL.append(songListLI);

            songListLI.addEventListener('click', (e) => {
                e.preventDefault();
                currentSectionIndex = 0;
                console.log(`Song Selected: ${value.title}`);
                selectedSong = value;
                console.log(value.sections);
                console.log(currentSectionIndex);
                console.log('Song is at:', value.sections.at(currentSectionIndex).lyrics);
                songPreviewText.textContent = selectedSong.sections[currentSectionIndex].lyrics;
                buttonState();

            });
        }
        songListContainer.append(songListUL);
        songPanelContainer.append(songListContainer);

        nextBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    currentSectionIndex++;
                    console.log(currentSectionIndex);
                    songPreviewText.textContent = selectedSong.sections[currentSectionIndex].lyrics;
                    buttonState();
                });

                backBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    currentSectionIndex--;
                    console.log(currentSectionIndex);
                    songPreviewText.textContent = selectedSong.sections[currentSectionIndex].lyrics;
                    buttonState();
                });



         function buttonState() {
        if(selectedSong.sections.length === 1) {
            backBtn.disabled = true;
            nextBtn.disabled = true;
        } else if(currentSectionIndex === 0) {
            backBtn.disabled = true;
            nextBtn.disabled = false;
        } else if(currentSectionIndex > 0 && currentSectionIndex < selectedSong.sections.length - 1) {
            backBtn.disabled = false;
            nextBtn.disabled = false;
        } else if(currentSectionIndex === selectedSong.sections.length - 1) {
            nextBtn.disabled = true;
            backBtn.disabled = false;
        } 
    }
    }); 

}

function createNewSong() {
    const body = document.querySelector('body');
    const newSongFormContainer = document.createElement('div');
    newSongFormContainer.classList.add('new-song-form-container');

    const newSongForm = document.createElement('form');
    newSongForm.classList.add('new-song-form');

    const songTitleLabel = document.createElement('label');
    songTitleLabel.classList.add('song-title-label');
    songTitleLabel.textContent = 'Song Title:';

    const songTitleInput = document.createElement('input');
    songTitleInput.classList.add('song-title-input');
    songTitleInput.placeholder = 'Te Doy Gloria';
    songTitleInput.required = true;

    const songAuthorLabel = document.createElement('label');
    songAuthorLabel.classList.add('song-author-label');
    songAuthorLabel.textContent = 'Author:';

    const songAuthorInput = document.createElement('input');
    songAuthorInput.classList.add('song-author-input');
    songAuthorInput.placeholder = 'Miel San Marcos';
    songAuthorInput.required = true;

    const submitBtn = document.createElement('button');
    submitBtn.classList.add('new-song-submit-btn');
    submitBtn.textContent = 'Add New Song';

    const lyricsContainer = document.createElement('div');
    lyricsContainer.classList.add('lyrics-container');

    const lyricsContainerLabel = document.createElement('label');
    lyricsContainerLabel.classList.add('lyrics-container-label');
    lyricsContainerLabel.textContent = 'Lyrics:';

    const lyricsTextArea = document.createElement('textarea');
    lyricsTextArea.classList.add('lyrics-textarea');
    lyricsTextArea.required = true;
    lyricsTextArea.readOnly = true;

    const addSectionBtn = document.createElement('button');
    addSectionBtn.classList.add('add-section-btn');
    addSectionBtn.textContent = '+ Add Section/Lyric';

    addSectionBtn.addEventListener('click', (e) => {
        e.preventDefault();
        addSection();
    });

    function addSection() {
        const sectionContainer = document.createElement('div');
        sectionContainer.classList.add('section-container');

        const lyricTypeContainer = document.createElement('div');
        lyricTypeContainer.classList.add('lyric-type-container');

        const lyricTypeLabel = document.createElement('label');
        lyricTypeLabel.classList.add('lyric-type-label');
        lyricTypeLabel.textContent = 'Section:';

        const lyricTypeInput = document.createElement('select');
        lyricTypeInput.classList.add('lyric-type-dropdown');
        lyricTypeInput.required = true;

        for(let i = 0; i < lyricTypeOptions.length; i++) {
            const option = document.createElement('option');
            option.classList.add('lyric-type-option');
            option.textContent = lyricTypeOptions[i];

            if(i === 0) {
                option.value = '';
            }

        lyricTypeInput.append(option);
        }

        const textAreaContainer = document.createElement('div');
        textAreaContainer.classList.add('popup-lyric-container');

        const lyricTextArea = document.createElement('textarea');
        lyricTextArea.classList.add('lyric-textarea');
        lyricTextArea.required = true;


        const addNewSectionBtn = document.createElement('button');
        addNewSectionBtn.classList.add('add-new-section-btn');
        addNewSectionBtn.type = 'button';
        addNewSectionBtn.textContent = 'Add New Section';

        addNewSectionBtn.addEventListener('click', (e) => {
            e.preventDefault();

            const addedLyricTypeLabel = document.createElement('label');
            addedLyricTypeLabel.classList.add('added-lyrictype-label');
            addedLyricTypeLabel.textContent = 'Section: ';

            const addedLyricTypeInput = document.createElement('select');
            addedLyricTypeInput.classList.add('lyric-type-dropdown');
            addedLyricTypeInput.required = true;

            for(let i = 0; i < lyricTypeOptions.length; i++) {
                const option = document.createElement('option');
                option.classList.add('lyric-type-option');
                option.textContent = lyricTypeOptions[i];

                if(i === 0) {
                option.value = '';
                }

            addedLyricTypeInput.append(option);
            }

            lyricTypeContainer.append(addedLyricTypeLabel, addedLyricTypeInput);

            const addedSectionTextArea = document.createElement('textarea');
            addedSectionTextArea.classList.add('lyric-textarea');
            addedSectionTextArea.required = true;
            
            textAreaContainer.append(addedSectionTextArea);
        });

        const saveLyricsBtn = document.createElement('button');
        saveLyricsBtn.classList.add('save-lyrics-btn');
        saveLyricsBtn.type = 'button';
        saveLyricsBtn.textContent = 'Save Lyrics';

        // Once user clicks this btn, lyrics will then be displayed in text container in add new song form
        saveLyricsBtn.addEventListener('click', () => {
            // sectionContainer.remove();
            const newSection = {
                name: '',
                lyrics: ''
            }
            document.querySelectorAll('.lyric-type-dropdown').forEach((type) => {
                newSection.name = type.value;
            });
            document.querySelectorAll('.lyric-textarea').forEach((lyric) => {
                newSection.lyrics = lyric.value;
            });
            addedSong.sections.push(newSection);
            console.log(textAreaContainer);
        });

        const closePopUp = document.createElement('button');
        closePopUp.classList.add('close-popup-btn');
        closePopUp.textContent = 'X';

        closePopUp.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('exit clicked');
            sectionContainer.remove();
        });
        textAreaContainer.append(lyricTextArea);
        lyricTypeContainer.append(lyricTypeLabel, lyricTypeInput);
        sectionContainer.append(lyricTypeContainer, textAreaContainer, addNewSectionBtn, saveLyricsBtn, closePopUp);
        body.append(sectionContainer);
    }

    lyricsContainer.append(lyricsContainerLabel, lyricsTextArea, addSectionBtn);

    newSongForm.append(songTitleLabel, songTitleInput, songAuthorLabel, songAuthorInput, lyricsContainer, submitBtn);

    newSongFormContainer.append(newSongForm);

    body.append(newSongFormContainer);

}

let songList = [
    {
        id: 1,
        title: 'No Hay Lugar Más Alto',
        author: 'Miel San Marcos',
        sections: [
            {
                name: 'Verse',
                lyrics: 'A tus pies, arde mi corazon, a tus pies entrego lo que soy'
            },
            {
                name: 'Verse',
                lyrics: 'Ese lugar de mi seguridad, donde nadie me puede senalar'
            },
            {
                name: 'Pre-Chorus',
                lyrics: 'Me perdonaste, me acercaste a tu presencia, me levantaste hoy me postro a adorarte'
            },
            {
                name: 'Chorus',
                lyrics: 'No hay lugar mas alto, mas grande. Que estar a tus pies, que estar a tus pies.'
            },
            {
                name: 'Verse',
                lyrics: 'A tus pies, arde mi corazon, a tus pies te entrego lo que soy'
            },
            {
               name: 'Bridge',
               lyrics: 'Y aqui permanecere postrado a tus pies, y aqui permanecere a los pies de Cristo'
            }
        ]
    },
    {
        id: 2,
        title: 'Yo te Busco',
        author: 'Marcos Whitt',
        sections: [
            {
                name: 'Verse',
                lyrics: 'Yo te busco, yo te busco, con fuego en mi corazon'
            },
            {
                name: 'Verse',
                lyrics: 'Yo te busco, yo te busco, recibe mi adoracion'
            },
            {
                name: 'Chorus',
                lyrics: 'Te anhelo te necesito, te amo mas que a mi ser'
            }
        ]
    },
    {
        id: 3,
        title: 'Padre Nuestro',
        author: 'Marcos Brunet',
        sections: [
            {
                name: 'Verse',
                lyrics: 'Padre nuestro, del cielo tu nombre santo es que tu reino venga pronto, y tu voluntad tambien'
            },
            {
                name: 'Pre-Chorus',
                lyrics: 'Aqui, como en el cielo que el cielo venga aqui'
            },
            {
                name: 'Pre-Chorus',
                lyrics: 'El cielo aqui'
            },
            {
                name: 'Chorus',
                lyrics: 'Tuyo es el reino tuyo, el poder tuya es la gloria por siempre amen'
            }
        ]
    }
]

let lyricTypeOptions = ['Lyric Type', 'Verse', 'Pre-Chorus', 'Chorus', 'Bridge'];

let addedSong = {
    id: 4,
    title: '',
    author: '',
    sections: []
}