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

  const dateLabel = document.createElement('label');
  dateLabel.classList.add('date-label');
  dateLabel.textContent = 'Select Date';

  const selectDate = document.createElement('input');
  selectDate.id = 'calender';
  selectDate.type = 'date';
  selectDate.name = 'date-selection';

  const serviceTypeLabel = document.createElement('label');
  serviceTypeLabel.classList.add('service-type-label');
  serviceTypeLabel.textContent = 'Service Type';

  const serviceTypeInput = document.createElement('select');
  serviceTitleInput.classList.add('service-type-dropdown');

  for(let i = 0; i <= options.length - 1; i++) {
    const option = document.createElement('option');
    option.classList.add('service-type-options');
    option.textContent += options[i];

    serviceTypeInput.append(option);
  }

  formContainer.append(serviceTitleLabel, serviceTypeInput);

  titleInputContainer.append(formTitle, serviceTitleLabel, serviceTitleInput, dateLabel, selectDate);
  formContainer.append(titleInputContainer);
  body.append(formContainer);
}

const options = ['Select Service Type', 'Sunday', 'Tuesday', 'Santa Cena', 'Vigilia'];