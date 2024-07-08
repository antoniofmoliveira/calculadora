let equal_typed = false;

const onclick_handle = (value) => {
    if (equal_typed) {
        onclick_c();
        equal_typed = false;
    }
    document.getElementById("display").innerText += value;
};

const onclick_ce = () => {
    document.getElementById("display").innerText = document
        .getElementById("display")
        .innerText.slice(0, -1);
};

const onclick_c = () => {
    document.getElementById("display").innerText = "";
};

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

const get_formated_date = (date) => {
    const day = `0${date.getDate()}`.slice(-2);
    const month = `0${date.getMonth() + 1}`.slice(-2);
    const hours = `0${date.getHours()}`.slice(-2);
    const minutes = `0${date.getMinutes()}`.slice(-2);
    const seconds = `0${date.getSeconds()}`.slice(-2);
    return `${day}/${month}/${date.getFullYear()} ${hours}:${minutes}:${seconds}`;
};

const move_history = (origin) => {
    const destination = origin + 1;
    const time_origin = document.getElementById("time" + origin);
    const hist_origin = document.getElementById("hist" + origin);
    const time_destination = document.getElementById("time" + destination);
    const hist_destination = document.getElementById("hist" + destination);
    hist_destination.innerText = hist_origin.innerText;
    time_destination.innerText = time_origin.innerText;
};

const recover_history = (origin) => {
    const recovered = document.getElementById("hist" + origin).innerText.trim();
    if (recovered.length <= 0) return;
    document.getElementById("display").innerText = document.getElementById(
        "hist" + origin
    ).innerText;
    equal_typed = false;
};
