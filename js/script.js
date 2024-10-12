// This function fetches input values
function getInputValues() {
  const mortgageAmount = parseFloat(
    document.getElementById("mortgageAmount").value
  );
  const mortgageTerm = parseFloat(
    document.getElementById("mortgageTerm").value
  );
  const interestRate = parseFloat(
    document.getElementById("interestRate").value
  );
  const selectedOption = document.querySelector(
    'input[name="options"]:checked'
  )?.id;

  const monthlyRepayment = document.getElementById("monthlyRepayment");
  const totalRepayment = document.getElementById("totalRepayment");
  const resultsContainer = document.getElementById("resultsContainer");
  const resultsHeading1 = document.getElementById("resultsHeading1");
  const resultsDescription1 = document.getElementById("resultsDescription1");
  const resultsHeading2 = document.getElementById("resultsHeading2");
  const resultsDescription2 = document.getElementById("resultsDescription2");

  return {
    mortgageAmount,
    mortgageTerm,
    interestRate,
    selectedOption,
    monthlyRepayment,
    totalRepayment,
    resultsContainer,
    resultsHeading1,
    resultsDescription1,
    resultsHeading2,
    resultsDescription2,
  };
}

// Hide results section on page load
function hideResults() {
  const {
    resultsContainer,
    resultsHeading1,
    resultsDescription1,
    resultsHeading2,
    resultsDescription2,
  } = getInputValues();
  resultsContainer.style.display = "none";
  resultsHeading2.style.display = "none";
  resultsDescription2.style.display = "none";
}

// Show results after successful calculation
function showResults() {
  const {
    resultsContainer,
    resultsHeading1,
    resultsDescription1,
    resultsHeading2,
    resultsDescription2,
  } = getInputValues();
  resultsContainer.style.display = "block";
  resultsHeading1.style.display = "none"; // Hide the initial results message
  resultsDescription1.style.display = "none";
  resultsHeading2.style.display = "block"; // Show the actual result message
  resultsDescription2.style.display = "block";
}

// Form validation using Bootstrap
document.getElementById("mortgageForm").addEventListener(
  "submit",
  function (event) {
    event.preventDefault();
    event.stopPropagation();

    const form = this;
    if (form.checkValidity()) {
      calculateRepayments(); // Perform calculations only if form is valid
    }

    form.classList.add("was-validated"); // Show Bootstrap validation styles
  },
  false
);

// This function calculates the repayments
function calculateRepayments() {
  console.log("Calculating repayments...");

  const {
    mortgageAmount,
    mortgageTerm,
    interestRate,
    selectedOption,
    monthlyRepayment,
    totalRepayment,
  } = getInputValues();

  if (selectedOption === "repayment") {
    const monthlyRate = interestRate / 1200;
    const numberOfPayments = mortgageTerm * 12;
    const monthlyPayment =
      (mortgageAmount * monthlyRate) /
      (1 - Math.pow(1 + monthlyRate, -numberOfPayments));

    monthlyRepayment.textContent = `£${monthlyPayment.toFixed(2)}`;
    totalRepayment.textContent = `£${(
      monthlyPayment * numberOfPayments
    ).toFixed(2)}`;
    showResults(); // Show the results once calculation is successful
  } else if (selectedOption === "interestOnly") {
    const monthlyPayment = mortgageAmount * (interestRate / 1200);

    monthlyRepayment.textContent = `£${monthlyPayment.toFixed(2)}`;
    totalRepayment.textContent = `£${(
      monthlyPayment *
      mortgageTerm *
      12
    ).toFixed(2)}`;
    showResults(); // Show the results once calculation is successful
  } else {
    console.log("Please select a mortgage type.");
  }
}

// Clear form and reset results
function clearForm() {
  const { monthlyRepayment, totalRepayment } = getInputValues();
  document.getElementById("mortgageForm").reset();
  document.getElementById("mortgageAmount").value = "";
  document.getElementById("mortgageTerm").value = "";
  document.getElementById("interestRate").value = "";
  document.getElementById("repayment").checked = false;
  document.getElementById("interestOnly").checked = false;
  monthlyRepayment.textContent = "£0.00";
  totalRepayment.textContent = "£0.00";
  hideResults(); // Hide the results when form is cleared
}

// Hide results initially when the page loads
document.addEventListener("DOMContentLoaded", function () {
  hideResults();
});
