import { displayContent } from './display.js';

export function createBiblePanel() {
  biblePanelBtn.addEventListener('click', (e) => {
  e.preventDefault();
  
  showPanel();
  getDisplayBible();
  console.log('Btn clicked');
})
};

const biblePanelBtn = document.querySelector('.bible-panel-btn');
const biblePanelContainer = document.createElement('div');
biblePanelContainer.classList.add('bible-panel-container');
let translationsLoaded = false;
const panel = document.querySelector('.panel');

function showPanel() {
  const exitBtn = document.createElement('button');
  exitBtn.classList.add('bible-panel-exit-btn');

  function animatePanel() {
    biblePanelContainer.style.width = '100%';
    biblePanelContainer.style.display = 'block';
    exitBtn.style.opacity = '1';
  }

  requestAnimationFrame(animatePanel);

  function animateClosePanel() {
    biblePanelContainer.style.width = '0';
    exitBtn.style.opacity = '0';
    setTimeout(() => {
      biblePanelContainer.style.display = 'none';
    }, 1000);
  }

  exitBtn.addEventListener('click', (e) => {
    e.preventDefault();
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
  panel.append(bookPanel);

  const chaptersUL = document.createElement('ul');
  chaptersUL.classList.add('chapters-ul');
  panel.append(chaptersUL);

  const versePanel = document.createElement('div');
  versePanel.classList.add('verse-panel');

  const versePanelExit = document.createElement('div');
  versePanelExit.classList.add('verse-panel-exit');

  versePanel.append(versePanelExit);

  panel.append(versePanel);

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
    biblePanelContainer.append(booksUL);

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

          versePanel.style.display = 'block';
          versePanel.style.width = '30%';

          const chapterLink = `/api/${selectedTranslation}/${bookId}/${Number(e.target.textContent)}.json`;

          const verseResponse = await fetch(`https://bible.helloao.org${chapterLink}`)

          if(verseResponse.ok === false) {
            throw new Error(`ERROR: ${verseResponse.status}`)
          }

          const verseData = await verseResponse.json()

          console.log(verseData.chapter.content);

          versesUl.replaceChildren();

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
            let verseID = e.target.getAttribute('verse-id');
            console.log(verseID);
            const selectedVerseObject = verseData.chapter.content[verseID];
            console.log(selectedVerseObject);
            console.log(selectedVerseObject.content);
            console.log(selectedVerseObject.content.text);
            // Use Map instead for this
            const filteredVerseObject = selectedVerseObject.content.filter(verse => typeof verse === 'string');
            console.log(filteredVerseObject);
          })
        }
        screenDisplayVerse();
        })
        versePanelExit.addEventListener('click', (e) => {
          e.preventDefault();
          versePanel.style.width = '0';
          versePanel.style.display = 'none';
        })
      }

      function createBookPanel() {

        const bookPanelExit = document.createElement('div');
        bookPanelExit.classList.add('book-panel-exit');

        bookPanel.append(bookPanelExit);

        function animateBookPanel() {
          bookPanel.style.display = 'block';
          bookPanelExit.style.display = 'block';
          bookPanel.style.width = '100%';
          bookPanelExit.style.opacity = '1';
        }
        requestAnimationFrame(animateBookPanel)

        bookPanelExit.addEventListener('click', (e) => {
          e.preventDefault();
          function animateCloseBookPanel() {
          bookPanel.style.width = '0';
          bookPanelExit.style.opacity = '0';
          setTimeout(() => {
            bookPanel.style.display = 'none';
            bookPanelExit.style.display = 'none';
          }, 400)
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