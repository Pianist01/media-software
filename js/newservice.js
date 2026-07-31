export function createService() {
  const newServiceBtn = document.querySelector('button');
  newServiceBtn.addEventListener('click', (e) => {
    e.preventDefault();
    console.log('Button is clicked and export/import is working');
    createForm();
  });
}

function createForm() {
  const body = document.querySelector('body');

  const formContainer = document.createElement('div');
  formContainer.classList.add('form-container');

  const formTitle = document.createElement('h2');
  formTitle.classList.add('form-title');
  formTitle.textContent = 'Your Service';


  const titleInputContainer = document.createElement('div');
  titleInputContainer.classList.add('title-container');

  const serviceTitleLabel = document.createElement('label');
  serviceTitleLabel.classList.add('service-title');
  serviceTitleLabel.textContent = 'Service Name';

  const serviceTitleInput = document.createElement('input');
  serviceTitleInput.classList.add('service-title-input');
  serviceTitleInput.placeholder = 'Vigil';

  const serviceTypeLabel = document.createElement('label');
  serviceTypeLabel.classList.add('service-type-label');
  serviceTypeLabel.textContent = 'Service Type';

  titleInputContainer.append(formTitle, serviceTitleLabel, serviceTitleInput);
  formContainer.append(titleInputContainer);
  body.append(formContainer);
}