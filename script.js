// This function fetches input values and validates them
function getInputValues() {
  const mortgageAmount = document.getElementById("mortgageAmount");
  const mortgageTerm = document.getElementById("mortgageTerm");
  const interestRate = document.getElementById("interestRate");

  // Validate fields
  validateField(mortgageAmount);
  validateField(mortgageTerm);
  validateField(interestRate);

  const selectedOption = document.querySelector(
    'input[name="options"]:checked'
  )?.id;

  const clearBtn = document.getElementById("clearBtn");

  const resultsHeading = document.getElementById("resultsHeading");
  const resultsDescription = document.getElementById("resultsDescription");
  const resultsContainer = document.getElementById("resultsContainer");

  const monthlyRepayment = document.getElementById("monthlyRepayment");
  const totalRepayment = document.getElementById("totalRepayment");

  return {
    mortgageAmount: parseFloat(mortgageAmount.value),
    mortgageTerm: parseFloat(mortgageTerm.value),
    interestRate: parseFloat(interestRate.value),
    selectedOption,
    monthlyRepayment,
    totalRepayment,
    clearBtn,
    resultsHeading,
    resultsDescription,
    resultsContainer,
  };
}

// Function to validate a field
function validateField(field) {
  if (field.value.trim() === "" || isNaN(parseFloat(field.value))) {
    field.classList.add("is-invalid");
    field.classList.remove("is-valid");
  } else {
    field.classList.remove("is-invalid");
    field.classList.add("is-valid");
  }
}

// Function to clear the form and hide results
function clearForm() {
  document.getElementById("mortgageForm").reset();

  // Clear validation classes
  document.querySelectorAll(".form-control").forEach((field) => {
    field.classList.remove("is-valid", "is-invalid");
  });

  // Clear displayed results
  document.getElementById("monthlyRepayment").textContent = "£0.00";
  document.getElementById("totalRepayment").textContent = "£0.00";

  // Hide results container
  document.getElementById("resultsContainer").classList.add("hide");
}
