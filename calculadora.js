/**
 * controls if display should be cleaned before new entry
 */
let equal_typed = false;

/**
 * handles clicks on most keys of calculator
 * @param {*} value the value of the key
 */
const onclick_handle = (value) => {
    if (equal_typed) {
        onclick_c();
        equal_typed = false;
    }
    let element = document.getElementById("display");
    let disp_text = element.innerText.trim();
    let is_dup_op =
        (disp_text.endsWith("**") ||
            disp_text.endsWith("/") ||
            disp_text.endsWith("+") ||
            disp_text.endsWith("-")) &&
        (value === "*" || value === "/" || value === "+" || value === "-");
    let is_first_not_valid =
        disp_text.trim() === "" && (value === "*" || value === "/");
    if (
        is_dup_op ||
        is_first_not_valid ||
        (value === "." && element.innerText.indexOf(".") > -1) ||
        (value === "0" && element.innerText === "0")
    ) {
        return;
    }
    element.innerText += value;
    try {
        eval(document.getElementById("display").innerText);
        document.getElementById("alerta").style.backgroundColor = "white";
    } catch {
        document.getElementById("alerta").style.backgroundColor = "red";
    }
};

/**
 * handles clicks on CE key cleaning the last number or operation entered
 */
const onclick_ce = () => {
    document.getElementById("display").innerText = document
        .getElementById("display")
        .innerText.slice(0, -1);
    try {
        eval(document.getElementById("display").innerText);
        document.getElementById("alerta").style.backgroundColor = "white";
    } catch {
        document.getElementById("alerta").style.backgroundColor = "red";
    }
};

/**
 * handles clicks on C key cleaning the display
 */
const onclick_c = () => {
    document.getElementById("display").innerText = "";
};

/**
 * handles click on equal key
 * if the argument entered in display cannot be evaled does nothing
 */
const onclick_equal = () => {
    try {
        const result = eval(document.getElementById("display").innerText);
        move_history(3);
        move_history(2);
        move_history(1);
        document.getElementById("time1").innerText = get_formated_date(
            new Date()
        );
        document.getElementById("hist1").innerText =
            document.getElementById("display").innerText;
        document.getElementById("display").innerText = result;
        equal_typed = true;
    } catch {}
};

/**
 * formats a date in pt-BR format DD/MM/YYYY HH:MM:SS
 * @param {*} date a date
 * @returns  date in pt-BR format DD/MM/YYYY HH:MM:SS
 */
const get_formated_date = (date) => {
    const day = `0${date.getDate()}`.slice(-2);
    const month = `0${date.getMonth() + 1}`.slice(-2);
    const hours = `0${date.getHours()}`.slice(-2);
    const minutes = `0${date.getMinutes()}`.slice(-2);
    const seconds = `0${date.getSeconds()}`.slice(-2);
    return `${day}/${month}/${date.getFullYear()} ${hours}:${minutes}:${seconds}`;
};

/**
 * moves a history entry to a higher position
 * there are four positions in history
 * @param {*} origin
 */
const move_history = (origin) => {
    const destination = origin + 1;
    const time_origin = document.getElementById("time" + origin);
    const hist_origin = document.getElementById("hist" + origin);
    const time_destination = document.getElementById("time" + destination);
    const hist_destination = document.getElementById("hist" + destination);
    hist_destination.innerText = hist_origin.innerText;
    time_destination.innerText = time_origin.innerText;
};

/**
 * handles clicks in history element filling the display with it
 * resets equal_typed flag
 * @param {*} origin
 * @returns
 */
const recover_history = (origin) => {
    const recovered = document.getElementById("hist" + origin).innerText.trim();
    if (recovered.length <= 0) return;
    document.getElementById("display").innerText = document.getElementById(
        "hist" + origin
    ).innerText;
    equal_typed = false;
};
