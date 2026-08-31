let formContainer;

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

  formContainer = document.createElement('form');
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
  serviceTitleInput.required = true;

  const dateLabel = document.createElement('label');
  dateLabel.classList.add('date-label');
  dateLabel.textContent = 'Select Date';

  const selectDate = document.createElement('input');
  selectDate.id = 'calender';
  selectDate.type = 'date';
  selectDate.name = 'date-selection';
  selectDate.required = true;

  const serviceTypeContainer = document.createElement('div');
  serviceTypeContainer.classList.add('service-type-container');

  const serviceTypeLabel = document.createElement('label');
  serviceTypeLabel.classList.add('service-type-label');
  serviceTypeLabel.textContent = 'Service Type';

  const serviceTypeInput = document.createElement('select');
  serviceTypeInput.classList.add('service-type-dropdown');
  serviceTypeInput.required = true;

  for(let i = 0; i < options.length; i++) {
    const option = document.createElement('option');
    option.classList.add('service-type-options');
    option.textContent = options[i];

    if(i === 0) {
      option.value = '';
    }

    serviceTypeInput.append(option);
  }

  const submitBtn = document.createElement('button');
  submitBtn.classList.add('service-form-submitBtn');
  submitBtn.textContent = 'Create Service';
  submitBtn.type = 'submit';

  const exitContainer = document.createElement('div');
  exitContainer.classList.add('exit-container');
  const exitImage = document.createElement('img');
  exitImage.classList.add('exit-icon');
  exitImage.src = '/img/exit.png';

  exitContainer.addEventListener('click', (e) => {
    e.preventDefault();
    console.log('exit clicked');
    function formDisappear() {
      formContainer.style.height = '0px';
    }
    requestAnimationFrame(formDisappear);
    formContainer.classList.add('not-displayed');
  });

  formContainer.addEventListener('submit', (e) => {
    e.preventDefault();
    currentService.title = serviceTitleInput.value;
    currentService.date = selectDate.value;
    currentService.serviceType = serviceTypeInput.value;

    const serviceTitle = document.querySelector('.current-service');

    serviceTitle.textContent = `${currentService.title}-${currentService.date}(${currentService.serviceType})`;

    formContainer.classList.add('not-displayed');
  });

  function formPopup() {
    formContainer.style.height = '300px';
    titleInputContainer.style.opacity = '1';
    serviceTypeContainer.style.opacity = '1';
  }

  requestAnimationFrame(formPopup);

  exitContainer.append(exitImage);

  serviceTypeContainer.append(serviceTypeLabel, serviceTypeInput);

  formContainer.append(serviceTypeContainer, submitBtn, exitContainer);

  titleInputContainer.append(formTitle, serviceTitleLabel, serviceTitleInput, dateLabel, selectDate);
  formContainer.append(titleInputContainer);
  body.append(formContainer);
}

const options = ['Select Service Type', 'Sunday', 'Tuesday', 'Santa Cena', 'Vigilia'];

let currentService = {
  title: '',
  date: '',
  serviceType: ''
}