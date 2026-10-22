import { displayContent } from './display.js';
const bibleSectionImg = document.querySelector('.bible-icon');
const bibleSectionBtn = document.querySelector('.bible');
export function createBiblePanel() {
  const songSectionImg = document.querySelector('.song-icon');
  bibleSectionBtn.addEventListener('click', (e) => {
  e.preventDefault();
  bibleSectionBtn.style.background = 'linear-gradient(180deg, #10283e 0%, #103454 55%, #06447f 100%)';
  bibleSectionImg.src = '/icons/bible-active.svg';
  songSectionImg.src = '/icons/music-default.svg';
  showPanel();
  getDisplayBible();
  console.log('Btn clicked');
})
};

let chapterContent;
let verseIndex;
const liveBtn = document.querySelector('.live-btn');

const biblePanelBtn = document.querySelector('.bible-panel-btn');
const biblePanelContainer = document.createElement('div');
biblePanelContainer.classList.add('bible-panel-container');
let translationsLoaded = false;
const panel = document.querySelector('.panel');
const bookScrollBox = document.createElement('div');
bookScrollBox.classList.add('book-scroll-container');
const bookPanelExit = document.createElement('button');
bookPanelExit.textContent = 'X';
bookPanelExit.classList.add('book-panel-exit');
const exitBtn = document.createElement('button');
exitBtn.classList.add('bible-panel-exit-btn');

function showPanel() {

  function animatePanel() {
    biblePanelContainer.style.height = '100%';
    exitBtn.style.opacity = '1';
  }

  requestAnimationFrame(animatePanel);

  function animateClosePanel() {
    biblePanelContainer.style.height = '0';
    exitBtn.style.opacity = '0';
  }

  exitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    bibleSectionImg.src = '/icons/bible-default.svg';
    bibleSectionBtn.style.background = '';
    requestAnimationFrame(animateClosePanel);
  });

  biblePanelContainer.append(exitBtn);

  panel.append(biblePanelContainer);
}

async function getDisplayBible() {

  try {

    if(translationsLoaded) {
      return
    }

    const translationsResponse = await fetch('https://bible.helloao.org/api/available_translations.json')

  if(translationsResponse.ok === false) {
    throw new Error(`ERROR: ${translationsResponse.status}`)
  }

  const translationsData = await translationsResponse.json();
  console.log(translationsData);

  const translationDropdown = document.createElement('select');

  translationsData.translations.forEach((translation) => {
    const option = document.createElement('option');
    option.value = translation.id;
    option.text = translation.englishName;

    translationDropdown.append(option);
  })

  const booksUL = document.createElement('ul');
  booksUL.classList.add('books-unorderedList');
  const bookPanel = document.createElement('div');
  bookPanel.classList.add('book-panel');
  biblePanelContainer.append(bookPanel);

  const chaptersUL = document.createElement('ul');
  chaptersUL.classList.add('chapters-ul');
  biblePanelContainer.append(chaptersUL);

  const versePanel = document.createElement('div');
  versePanel.classList.add('verse-panel');

  const versePanelExit = document.createElement('div');
  versePanelExit.classList.add('verse-panel-exit');

  versePanel.append(versePanelExit);

  biblePanelContainer.append(versePanel);

  const versesUl = document.createElement('ul');
  versesUl.classList.add('verses-ul');

  versePanel.append(versesUl);

  let verseList;

  translationDropdown.addEventListener('change', async (e) => {
    const selectedTranslation = e.target.value;
    console.log(selectedTranslation);

    booksUL.replaceChildren();

    const translationObject = translationsData.translations.find((translation) => selectedTranslation === translation.id);

    if(translationObject === undefined) {
      throw new Error('The translation you are looking for is not available or does not exist')
    }

    console.log(translationObject);

    const translationBooksLink = translationObject.listOfBooksApiLink;

    console.log(typeof translationBooksLink);
    if(typeof translationBooksLink !== 'string' || translationBooksLink === '') {
      throw new Error('Link is not a string and or is an empty string')
    }

    const listOfBooksResponse = await fetch(`https://bible.helloao.org${translationBooksLink}`)

    if(listOfBooksResponse.ok === false) {
      throw new Error(`ERROR: ${listOfBooksResponse.status}`)
    }

    const listOfBooksData = await listOfBooksResponse.json()

    console.log(listOfBooksData);

    console.log(listOfBooksData.books.length);


    listOfBooksData.books.forEach((book) => {
      const bookList = document.createElement('li');
      bookList.classList.add('book-list');
      bookList.setAttribute('data-id', book.id);
      
      bookList.textContent = book.name;


      booksUL.append(bookList);
      console.log(bookList);
    })
    bookScrollBox.append(booksUL)
    biblePanelContainer.append(bookScrollBox);

    booksUL.addEventListener('click', (e) => {
      const bookId = e.target.getAttribute('data-id');
      console.log(bookId);
      if(bookId === null) {
        return;
      }

      const selectedBook = listOfBooksData.books.find(book => book.id === bookId);


      function displayChapters() {

        if(selectedBook === undefined) {
          throw new Error('The book you are looking for is not available or does not exist')
        }

        console.log(selectedBook);

        console.log(selectedBook.numberOfChapters);


        for(let i = 1; i <= selectedBook.numberOfChapters; i++) {
          const chapterList = document.createElement('li');
          chapterList.classList.add('chapter-list');

          chapterList.textContent = i;

          chaptersUL.append(chapterList);
          bookPanel.append(chaptersUL);
          console.log(i);
        }
      }

      function displayVerses() {
        chaptersUL.addEventListener('click', async (e) => {
          console.log(e.target.textContent)

          function showVersePanel() {
            versePanel.style.width = '100%';
          }

          requestAnimationFrame(showVersePanel);

          const chapterLink = `/api/${selectedTranslation}/${bookId}/${Number(e.target.textContent)}.json`;

          const verseResponse = await fetch(`https://bible.helloao.org${chapterLink}`)

          if(verseResponse.ok === false) {
            throw new Error(`ERROR: ${verseResponse.status}`)
          }

          const verseData = await verseResponse.json()

          console.log(verseData.chapter.content);

          versesUl.replaceChildren();

          chapterContent = verseData.chapter.content.map(item => ({
            verseNumber: item.number,
            type: 'text',
            content: item.content
              .map(verse => {
                if(typeof verse === 'string') {
                  return verse;
                }

                return verse.text;
              })
              .join(' ')
          }));
          console.log(chapterContent);

          // Continue from here, clean up code and then work on user clicking on verse and displaying on preview screen.
          verseData.chapter.content.forEach((verse) => {
            verseList = document.createElement('li');
            verseList.classList.add('verse-list');
            verseList.setAttribute('verse-id', verse.number - 1);

            verseList.textContent = verse.number;

            versesUl.append(verseList); 
          })

          function screenDisplayVerse() {
          versesUl.addEventListener('click', (e) => {
            console.log(e.target);
            liveBtn.disabled = false;
            let verseID = e.target.getAttribute('verse-id');
            console.log(verseID);
            verseIndex = Number(verseID);
            console.log(verseIndex);
            const selectedVerseObject = verseData.chapter.content[verseID];
            console.log(selectedVerseObject);
            console.log(selectedVerseObject.content);
            // Use Map instead for this
            const mappedVerseObject = selectedVerseObject.content.map(verse => {
              if(typeof verse === 'string') {
                console.log('This is a string');
                return verse;
              }
              return verse.text;
            });
            console.log(mappedVerseObject);
            const completeVerse = mappedVerseObject.join(' ');
            console.log(completeVerse);
            displayContent(chapterContent, verseIndex);
          })
        }
        screenDisplayVerse();
        })
        versePanelExit.addEventListener('click', (e) => {
          e.preventDefault();
          function closeVersePanel() {
            versePanel.style.width = '0';
          }
          requestAnimationFrame(closeVersePanel);
        })
      }

      function createBookPanel() {

        bookPanel.append(bookPanelExit);

        function animateBookPanel() {
          exitBtn.classList.add('hidden');
          bookPanelExit.style.display = 'block';
          bookPanel.style.width = '100%';
          bookPanelExit.style.opacity = '1';
        }
        requestAnimationFrame(animateBookPanel)

        bookPanelExit.addEventListener('click', (e) => {
          e.preventDefault();
          exitBtn.classList.remove('hidden');
          function animateCloseBookPanel() {
          bookPanel.style.width = '0';
          bookPanelExit.style.opacity = '0';
          chaptersUL.remove();
        }
        requestAnimationFrame(animateCloseBookPanel);
        })

      }

      createBookPanel();
      displayChapters();
      displayVerses();

    })
  })

  biblePanelContainer.append(translationDropdown);
  translationsLoaded = true;
  } catch(error) {
    console.log(error);
  }
}