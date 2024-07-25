/**
 * Flag indicating whether the '=' button has been clicked.
 * This flag is used to determine if the 'C' button should clear the display before
 * updating it with the result of the calculation.
 * @type {boolean}
 */
let equal_typed = false;

/**
 * Handles a click on the calculator buttons.
 * @param {string} value - Value of the button that was clicked.
 */
const onclick_handle = (value) => {
  // If the '=' button was previously clicked, clear the display.
  if (equal_typed) {
    onclick_c();
    equal_typed = false;
  }

  const element = document.getElementById("display");
  const disp_text = element.innerText.trim();

  // Do not allow two operators in a row.
  const is_dup_op =
    (disp_text.endsWith("**") ||
      disp_text.endsWith("/") ||
      disp_text.endsWith("+") ||
      disp_text.endsWith("-")) &&
    (value === "*" || value === "/" || value === "+" || value === "-");

  // Do not allow '*' or '/' as the first character.
  const is_first_not_valid =
    disp_text.trim() === "" && (value === "*" || value === "/");

  // Do not allow more than one '.'.
  const has_dot = element.innerText.indexOf(".") > -1;

  // Do not allow '0' as the first character unless it is part of '0.'
  const is_first_zero = disp_text.trim() === "0" && value !== ".";

  // If any of the above conditions are true, do not allow the character.
  if (is_dup_op || is_first_not_valid || has_dot || is_first_zero) {
    return;
  }

  element.innerText += value;

  // Evaluate the expression in the display and update the alert box.
  try {
    eval(document.getElementById("display").innerText);
    document.getElementById("alerta").style.backgroundColor = "white";
  } catch {
    document.getElementById("alerta").style.backgroundColor = "red";
  }
};

/**
 * Handles a click on the 'CE' button.
 * This function is called whenever the user clicks the 'CE' button.
 * It removes the last character from the display and evaluates the expression
 * in the display. If the expression is valid, the background of the alert box
 * is set to white. If the expression is invalid, the background of the alert box
 * is set to red.
 */
const onclick_ce = () => {
  // Remove the last character from the display.
  document.getElementById("display").innerText = document
    .getElementById("display")
    .innerText.slice(0, -1);

  // Evaluate the expression in the display.
  try {
    eval(document.getElementById("display").innerText);

    // If the expression is valid, set the background of the alert box to white.
    document.getElementById("alerta").style.backgroundColor = "white";
  } catch {
    // If the expression is invalid, set the background of the alert box to red.
    document.getElementById("alerta").style.backgroundColor = "red";
  }
};

/**
 * Handles a click on the 'C' button.
 * This function is called whenever the user clicks the 'C' button.
 * It clears the display.
 */
const onclick_c = () => {
  // Clear the display.
  document.getElementById("display").innerText = "";
};

/**
 * Handles a click on the '=' button.
 * This function is called whenever the user clicks the '=' button.
 * It evaluates the expression in the display and updates the display with the result.
 * If the expression is valid, the background of the alert box is set to white.
 * If the expression is invalid, the background of the alert box is set to red.
 */
const onclick_equal = () => {
  try {
    // Evaluate the expression in the display.
    const result = eval(document.getElementById("display").innerText);

    // Move the last three operations to the history.
    move_history(3);
    move_history(2);
    move_history(1);

    // Set the first history item to the current date and the expression in the display.
    document.getElementById("time1").innerText = get_formated_date(new Date());
    document.getElementById("hist1").innerText =
      document.getElementById("display").innerText;

    // Set the display to the result of the expression.
    document.getElementById("display").innerText = result;

    // Set the flag indicating that the '=' button has been clicked.
    equal_typed = true;
  } catch {
    // If the expression is invalid, the background of the alert box is set to red.
    document.getElementById("alerta").style.backgroundColor = "red";
  }
};

/**
 * Formats a date object into a string in the format "DD/MM/YYYY HH:MM:SS".
 *
 * @param {Date} date - The date object to be formatted.
 * @returns {string} The formatted date string.
 */
const get_formated_date = (date) => {
  // Pad the day, month, hours, minutes, and seconds with leading zeros
  const day = `0${date.getDate()}`.slice(-2);
  const month = `0${date.getMonth() + 1}`.slice(-2);
  const hours = `0${date.getHours()}`.slice(-2);
  const minutes = `0${date.getMinutes()}`.slice(-2);
  const seconds = `0${date.getSeconds()}`.slice(-2);

  // Concatenate the formatted date and time into a single string
  return `${day}/${month}/${date.getFullYear()} ${hours}:${minutes}:${seconds}`;
};

/**
 * Moves the content of a history item to the next item.
 *
 * @param {number} origin - The index of the history item to move.
 */
const move_history = (origin) => {
  // Calculate the index of the destination history item.
  const destination = origin + 1;

  // Get the necessary DOM elements.
  const time_origin = document.getElementById("time" + origin);
  const hist_origin = document.getElementById("hist" + origin);
  const time_destination = document.getElementById("time" + destination);
  const hist_destination = document.getElementById("hist" + destination);

  // Move the content of the origin history item to the next item.
  hist_destination.innerText = hist_origin.innerText;
  time_destination.innerText = time_origin.innerText;
};

/**
 * Recovers the content of a history item and sets it as the current display value.
 *
 * @param {number} origin - The index of the history item to recover.
 */
const recover_history = (origin) => {
  // Get the content of the history item and trim any leading/trailing whitespace
  const recovered = document.getElementById("hist" + origin).innerText.trim();

  // If the history item is empty, do nothing
  if (recovered.length <= 0) return;

  // Set the current display value to the recovered history item
  document.getElementById("display").innerText = document.getElementById(
    "hist" + origin
  ).innerText;

  // Reset the flag indicating that the '=' button has been clicked
  equal_typed = false;
};
