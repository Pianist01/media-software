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