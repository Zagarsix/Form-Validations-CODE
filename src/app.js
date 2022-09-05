const form = document.querySelector("#myForm");
const inputs = document.querySelectorAll("#myForm input");
const alertMsg = document.querySelector("#alertMessage");

const fields = {
  firstName: false,
  lastName: false,
  card: false,
  cvc: false,
  amount: false,
  city: false,
  postalCode: false
};

const expressions = {
  name: /^[a-zA-Z]+$/,
  card: /^\d{13,16}$/,
  cvc: /^\d{4}$/,
  amount: /\d+/,
  city: /^[a-zA-Z]+$/,
  postalCode: /^\d{4,8}$/
};

const validateForm = e => {
  switch (e.target.name) {
    case "cardnumber":
      validateInput(expressions.card, e.target, "card");
      break;
    case "cvc":
      validateInput(expressions.cvc, e.target, "cvc");
      break;

    case "amount":
      validateInput(expressions.amount, e.target, "amount");
      break;
    case "firstName":
      validateInput(expressions.name, e.target, "firstName");
      break;
    case "lastName":
      validateInput(expressions.name, e.target, "lastName");
      break;
    case "city":
      validateInput(expressions.city, e.target, "city");
      break;
    case "postalcode":
      validateInput(expressions.postalCode, e.target, "postalCode");
      break;
  }
};

const validateInput = (expression, input, field) => {
  if (expression.test(input.value)) {
    input.classList.remove("is-invalid");
    input.classList.add("is-valid");
    input.nextElementSibling.style.display = "none";
    input.classList.remove("bg-danger", "bg-opacity-25");
    fields[field] = true;
  } else {
    input.classList.add("bg-danger", "bg-opacity-25");
    input.classList.add("is-invalid");
    input.nextElementSibling.style.display = "inline";
    fields[field] = false;
  }
};

// For each input pass the validateForm function

inputs.forEach(input => {
  input.addEventListener("keyup", validateForm);
  input.addEventListener("blur", validateForm);
});

// Form submit event listener

form.addEventListener("submit", e => {
  e.preventDefault();

  if (
    fields.firstName &&
    fields.lastName &&
    fields.card &&
    fields.cvc &&
    fields.amount &&
    fields.city &&
    fields.postalCode
  ) {
    form.reset();

    alertMsg.innerHTML = "Form submitted successfully";
    alertMsg.classList.remove("alert-danger");
    alertMsg.classList.add("alert-success");
    alertMsg.classList.remove("d-none");

    setTimeout(() => {
      alertMsg.classList.add("d-none");
      inputs.forEach(input => {
        input.classList.remove("is-valid");
      });
    }, 2000);
  } else {
    alertMsg.innerHTML = "Some fields are missing";
    alertMsg.classList.remove("alert-success");
    alertMsg.classList.add("alert-danger");
    alertMsg.classList.remove("d-none");
  }
});
