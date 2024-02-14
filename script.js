// Select inputs, button, and result elements
const inputDay = document.querySelector("#day");
const inputMonth = document.querySelector("#month");
const inputYear = document.querySelector("#year");
const inputElements = document.querySelectorAll(".card__input");
const submitButton = document.querySelector("button");
const resultYear = document.querySelector(".Year");
const resultMonth = document.querySelector(".Month");
const resultDay = document.querySelector(".Day");

// Calculate age function
function calculateAge(day, month, year) {
  const isInputValid = validateInputs(day, month, year);
  if (!isInputValid) return;

  const currentDate = new Date();
  const currentDay = currentDate.getDate();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();

  let ageYear = currentYear - year;
  let ageMonth = currentMonth - month;
  let ageDay = currentDay - day;

  // Handle negative age values
  if (ageMonth < 0 || (ageMonth === 0 && ageDay < 0)) {
    ageYear--;
    ageMonth += 12;
  }
  if (ageDay < 0) {
    const daysInLastMonth = getDaysInMonth(currentMonth - 1, currentYear);
    ageDay += daysInLastMonth;
    ageMonth--;
  }
  if (ageYear < 0) {
    inputYear.classList.add("card__input--error");
    return;
  }

  // Update result elements
  inputYear.classList.remove("card__input--error");
  resultYear.innerHTML = ageYear;
  resultMonth.innerHTML = ageMonth;
  resultDay.innerHTML = ageDay;
}

// Validate input values function
function validateInputs(day, month, year) {
  const regexDay = /^([1-9]|[12][0-9]|3[01])$/;
  const regexMonth = /^([1-9]|1[0-2])$/;
  const regexYear = /^\d{4}$/;
  const daysInMonth = getDaysInMonth(month, year);

  if (!regexDay.test(day) || day > daysInMonth) {
    inputDay.classList.add("card__input--error");
    return false;
  }
  inputDay.classList.remove("card__input--error");

  if (!regexMonth.test(month)) {
    inputMonth.classList.add("card__input--error");
    return false;
  }
  inputMonth.classList.remove("card__input--error");

  if (!regexYear.test(year)) {
    inputYear.classList.add("card__input--error");
    return false;
  }
  inputYear.classList.remove("card__input--error");

  return true;
}

// Get days in month function
function getDaysInMonth(month, year) {
  switch (month) {
    case 2:
      return isLeapYear(year) ? 29 : 28;
    case 4:
    case 6:
    case 9:
    case 11:
      return 30;
    default:
      return 31;
  }
}

// Check if year is a leap year function
function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

// Handle click event on button
submitButton.addEventListener("click", (event) => {
  event.preventDefault();
  calculateAge(
    parseInt(inputDay.value),
    parseInt(inputMonth.value),
    parseInt(inputYear.value)
  );
});

// Handle Enter key press on input elements
inputElements.forEach((item, index, array) => {
  item.addEventListener("keydown", (event) =>
    handleEnterKey(event, index, array)
  );
});

// Handle Enter key press function
function handleEnterKey(event, index, array) {
  if (event.key === "Enter") {
    const nextIndex = (index + 1) % array.length;
    array[nextIndex].focus();
    submitButton.click();
  }
}
