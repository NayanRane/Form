const firstnameInput = document.getElementById('firstname');
const lastnameInput = document.getElementById('lastname');
const cityInput = document.getElementById('city');
const zipInput = document.getElementById('zip');
const phoneInput = document.getElementById('phone');
const emailInput = document.getElementById('emailid');
const usernameInput = document.getElementById('username');
const passInput = document.getElementById('pass');
const confirmPassInput = document.getElementById('confirmpass');
const countryInput = document.getElementById('country');
const stateInput = document.getElementById('state');
const addressInput = document.getElementById('address');
const submitBtn = document.getElementById('submitBtn');
const resetBtn = document.getElementById('resetBtn');
const updateBtn = document.getElementById('updateBtn');  
let formDataArray = [];
let deleteIndex = null;


// List of countries to populate the dropdown (you can expand this list or fetch it from an API)
const countries = [
  'India',
  'USA',
  'UK',
  'Canada',
  'Australia',
  'Germany',
  'France',
  'Italy',
  'Brazil',
  'Mexico'
];

// Populate the country dropdown dynamically
function populateCountries() {
  countries.forEach(country => {
    const option = document.createElement('option');
    option.value = country;
    option.textContent = country;
    countryInput.appendChild(option);
  });
}

// Call the function to populate the countries
populateCountries();

countryInput.addEventListener('change', function() {
  const country = this.value;

  // Clear the current states
  stateInput.innerHTML = '<option value="">Select State</option>';

  // Define states for India
  const indiaStates = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
    'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
    'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
    'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
  ];

  // Define states for other countries (example)
  const usaStates = [
    'California', 'Texas', 'Florida', 'New York', 'Pennsylvania', 'Illinois',
    'Ohio', 'Georgia', 'North Carolina', 'Michigan'
  ];

  const ukStates = [
    'England', 'Scotland', 'Wales', 'Northern Ireland'
  ];

  // Populate state dropdown based on the selected country
  let states = [];
  if (country === 'India') {
    states = indiaStates;
  } else if (country === 'USA') {
    states = usaStates;
  } else if (country === 'UK') {
    states = ukStates;
  }

  // Populate the state select element with the corresponding states
  states.forEach(state => {
    const option = document.createElement('option');
    option.value = state;
    option.textContent = state;
    stateInput.appendChild(option);
  });
});


(() => {
  'use strict';

  // On page load, load existing data from localStorage (if any)
  window.addEventListener('load', () => {
    const storedData = localStorage.getItem('formData');
    if (storedData) {
      formDataArray = JSON.parse(storedData);
      formDataArray.forEach((data, index) => {
        // Dynamically create rows for existing data
        addRowToTable(data, index);
      });
    }
  });

  // Form submission event listener
  const forms = document.querySelectorAll('.needs-validation');
  
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      event.preventDefault();

  
      if (passInput.value !== confirmPassInput.value) {
        confirmPassInput.setCustomValidity("Passwords do not match.");
      } else {
        confirmPassInput.setCustomValidity("");
      }
  
      if (form.checkValidity() && !isFormEmpty()) {
        formDataToArray();
      } else {
        form.classList.add('was-validated');
      }
    }, false);

  });

})();

// Check if any form field is empty
function isFormEmpty() {
  return !firstnameInput.value || !lastnameInput.value || !cityInput.value || !zipInput.value || !phoneInput.value || !emailInput.value || !usernameInput.value || !passInput.value || !confirmPassInput.value || !countryInput.value || !stateInput.value || !addressInput.value;
}

// Password confirmation input handler
confirmPassInput.addEventListener('input', () => {
  if (passInput.value !== confirmPassInput.value) {
    confirmPassInput.setCustomValidity("Passwords do not match.");
    confirmPassInput.classList.add('is-invalid');
  } else {
    confirmPassInput.setCustomValidity(""); 
    confirmPassInput.classList.remove('is-invalid');
    confirmPassInput.classList.add('is-valid');
  }
});

const allInputs = document.querySelectorAll('.needs-validation input, .needs-validation select, .needs-validation textarea');
allInputs.forEach(input => {
  input.addEventListener('input', () => {
    // Trigger custom validity checks
    input.checkValidity();

    // Add/remove appropriate validation classes based on input validity
    if (input.checkValidity()) {
      input.classList.remove('is-invalid');
      input.classList.add('is-valid');
    } else {
      input.classList.remove('is-valid');
      input.classList.add('is-invalid');
    }
  });
});


function formDataToArray() {
  let srno = formDataArray.length + 1;  // Unique serial number
  let formData = {
    srno: srno,
    firstname: firstnameInput.value,
    lastname: lastnameInput.value,
    country: countryInput.value,
    state: stateInput.value,
    city: cityInput.value,
    address: addressInput.value,
    zip: zipInput.value,
    status: document.querySelector('input[name="inlineRadioOptions"]:checked').value,
    phone: phoneInput.value,
    pass: passInput.value,
    username: usernameInput.value,
    email: emailInput.value
  };

  if (formDataArray.length > 0 && formDataArray.filter(x => x.email == emailInput.value).length > 0){
    // if(formDataArray.filter(x => x.email == emailInput.value).length)
    $('#duplicateEmailModal').modal('show');
    let duplicateEmail = document.getElementById('duplicateEmail');
    duplicateEmail.innerText = emailInput.value;

  }else{
    formDataArray.push(formData);
    console.log("Add", formDataArray);  
    localStorage.setItem('formData', JSON.stringify(formDataArray));
  
    // Dynamically create a new row for the data table
    addRowToTable(formData, formDataArray.length - 1);
    resetForm();
  
  }

  // Store the updated array to localStorage
}

function addRowToTable(data, index) {
  let row = document.createElement('tr');
  row.setAttribute('data-index', index); // Assign the correct index to the row

  row.innerHTML = `
    <td>${data.srno}</td>
    <td>${data.username}</td>
    <td>${data.firstname}</td>
    <td>${data.lastname}</td>
    <td>${data.email}</td>
    <td>${data.phone}</td>
    <td>${data.status}</td>
    <td>
      <button class="btn btn-secondary view-btn" onclick="viewData(event)" type="button" data-bs-toggle="modal" data-bs-target="#viewModal"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-fill me-1" viewBox="0 0 16 16">
      <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0"/>
      <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7"/>
      </svg>View</button>
      <button class="btn btn-dark edit-btn my-1" type="button" onclick="editData(event)"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square me-1" viewBox="0 0 16 16">
      <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
      <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
      </svg>Edit</button>
      <button class="btn btn-danger delete-btn" type="button" onclick="deleteData(event)" data-bs-toggle="modal" data-bs-target="#deleteConfirmModal"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill me-1" viewBox="0 0 16 16">
      <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
      </svg>Delete</button>
    </td>
  `;

  // Append the newly created row to the table body
  document.querySelector('#dataTable tbody').appendChild(row);
}

function viewData(event) {
  const row = event.target.closest('tr'); // Get the row that the view button was clicked on
  const index = row.getAttribute('data-index');
  const data = formDataArray[index]; // Fetch the correct form data from the array

  document.getElementById('modalFirstName').textContent = data.firstname;
  document.getElementById('modalLastName').textContent = data.lastname;
  document.getElementById('modalUserName').textContent = data.username;
  document.getElementById('modalEmail').textContent = data.email;
  document.getElementById('modalPhone').textContent = data.phone;
  document.getElementById('modalStatus').textContent = data.status;
  document.getElementById('modalAddress').textContent = data.address;
  document.getElementById('modalCity').textContent = data.city;
  document.getElementById('modalState').textContent = data.state;
  document.getElementById('modalCountry').textContent = data.country;
  document.getElementById('modalZip').textContent = data.zip;
}


function editData(event) {
  const row = event.target.closest('tr');
  const index = row.getAttribute('data-index');
  const data = formDataArray[index];

  // Populate the form inputs with the data for editing
  firstnameInput.value = data.firstname;
  lastnameInput.value = data.lastname;
  cityInput.value = data.city;
  zipInput.value = data.zip;
  phoneInput.value = data.phone;
  emailInput.value = data.email;
  usernameInput.value = data.username;
  countryInput.value = data.country;
  stateInput.value = data.state;
  addressInput.value = data.address;
  document.querySelector(`input[name="inlineRadioOptions"][value="${data.status}"]`).checked = true;

  // Set the correct button to "Update" and hide "Submit"
  submitBtn.classList.add('d-none');
  updateBtn.classList.remove('d-none');

  // Store the index in the updateBtn to use later
  updateBtn.setAttribute('data-index', index);
}

updateBtn.addEventListener('click', (event) => {
  event.preventDefault(); // Prevent form submission

  const index = updateBtn.getAttribute('data-index');
  const updatedData = {
    srno: formDataArray[index].srno,  // Keep the same serial number
    firstname: firstnameInput.value,
    lastname: lastnameInput.value,
    country: countryInput.value,
    state: stateInput.value,
    city: cityInput.value,
    address: addressInput.value,
    zip: zipInput.value,
    status: document.querySelector('input[name="inlineRadioOptions"]:checked').value,
    phone: phoneInput.value,
    pass: passInput.value, // You may want to leave the password unchanged unless you want the user to update it
    username: usernameInput.value,
    email: emailInput.value
  };

  // Update the data in formDataArray
  formDataArray[index] = updatedData;
  console.log("update",formDataArray);

  // Store the updated array to localStorage
  localStorage.setItem('formData', JSON.stringify(formDataArray));

  // Update the row in the table
  const row = document.querySelector(`tr[data-index='${index}']`);
  row.querySelector('td:nth-child(1)').textContent = updatedData.srno;
  row.querySelector('td:nth-child(2)').textContent = updatedData.username;
  row.querySelector('td:nth-child(3)').textContent = updatedData.firstname;
  row.querySelector('td:nth-child(4)').textContent = updatedData.lastname;
  row.querySelector('td:nth-child(5)').textContent = updatedData.email;
  row.querySelector('td:nth-child(6)').textContent = updatedData.phone;
  row.querySelector('td:nth-child(7)').textContent = updatedData.status;

  // Hide the update button and show the submit button
  submitBtn.classList.remove('d-none');
  updateBtn.classList.add('d-none');

  // Reset the form
  resetForm();
});

function deleteData(event) { 
  const row = event.target.closest('tr');
  const index = row.getAttribute('data-index');

  // Store the index of the row to delete for confirmation
  deleteIndex = index;

  // Show the delete confirmation modal
  $('#deleteConfirmModal').modal('show');
  resetForm();  //new
}

function confirmDelete(){
  if (deleteIndex !== null) {
    // Remove the data from formDataArray
    formDataArray.splice(deleteIndex, 1);
    console.log("AfterDelete",formDataArray)

    // Store the updated array to localStorage
    localStorage.setItem('formData', JSON.stringify(formDataArray));

    // Remove the row from the table
    const row = document.querySelector(`tr[data-index='${deleteIndex}']`);
    if (row) row.remove();

    // Update serial numbers after deletion
    updateSerialNumbers();

    // Reset deleteIndex after the deletion
    deleteIndex = null;
  }
  $('#deleteConfirmModal').modal('hide');

  resetForm();  
}

function updateSerialNumbers() {
  const rows = document.querySelectorAll('#dataTable tbody tr');
  rows.forEach((row, index) => {
    row.querySelector('td:first-child').textContent = index + 1; // Update the serial number
    row.setAttribute('data-index', index); // Update the row's data-index
  });
}

function resetForm() {
  const form = document.querySelector('.needs-validation');
  form.reset();

  const inputs = form.querySelectorAll('input');
  inputs.forEach(input => {
    input.classList.remove('is-invalid', 'is-valid');
  });
  
  const selects = form.querySelectorAll('select');
  selects.forEach(select => {
    select.classList.remove('is-invalid', 'is-valid');
  });

  const textarea = form.querySelector('textarea').classList.remove('is-invalid','is-valid');

  form.classList.remove('was-validated');

  submitBtn.classList.remove('d-none');
  updateBtn.classList.add('d-none');

}

resetBtn.addEventListener('click', (event) => {
  submitBtn.classList.remove('d-none');
  updateBtn.classList.add('d-none');
  event.preventDefault();
  resetForm();
});


