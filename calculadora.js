let totalizou = false;

const onclick_handle = (value) => {
    if (totalizou) {
        onclick_c();
        totalizou = false;
    }
    document.getElementById("visor").innerText += value;
};

const onclick_ce = () => {
    document.getElementById("visor").innerText = visor.innerText.slice(0, -1);
};

const onclick_c = () => {
    document.getElementById("visor").innerText = "";
};

const onclick_equal = () => {
    move_historico(3);
    move_historico(2);
    move_historico(1);
    document.getElementById("time1").innerText = get_formated_date(new Date());
    document.getElementById("hist1").innerText = visor.innerText;
    document.getElementById("visor").innerText = eval(
        document.getElementById("visor").innerText
    );
    totalizou = true;
};

const get_formated_date = (date) => {
    const day = `0${date.getDate()}`.slice(-2);
    const month = `0${date.getMonth() + 1}`.slice(-2);
    const hours = `0${date.getHours()}`.slice(-2);
    const minutes = `0${date.getMinutes()}`.slice(-2);
    const seconds = `0${date.getSeconds()}`.slice(-2);
    return `${day}/${month}/${date.getFullYear()} ${hours}:${minutes}:${seconds}`;
};

const move_historico = (origem) => {
    const destino = origem + 1;
    const time_origem = document.getElementById("time" + origem);
    const hist_origem = document.getElementById("hist" + origem);
    const time_destino = document.getElementById("time" + destino);
    const hist_destino = document.getElementById("hist" + destino);
    hist_destino.innerText = hist_origem.innerText;
    time_destino.innerText = time_origem.innerText;
};
