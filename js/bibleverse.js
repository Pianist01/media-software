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

function showPanel() {
  const panel = document.querySelector('.panel');
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
  biblePanelContainer.append(translationDropdown);
  translationsLoaded = true;
  } catch(error) {
    console.log(error);
  }
}