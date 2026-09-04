const casillas = document.querySelectorAll(".casilla");
const turnoTexto = document.getElementById("turno");
const mensaje = document.getElementById("mensaje");
const botonReiniciar = document.getElementById("reiniciar");

let jugadorActual = "X";
let tablero = ["", "", "", "", "", "", "", ""];
let juegoTerminado = false;

const combinacionesGanadoras = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function jugar(posicion) {
    if (juegoTerminado || tablero[posicion] !== "") {
        return;
    }

    tablero[posicion] = jugadorActual;
    casillas[posicion].textContent = jugadorActual;

    comprobarResultado();
}

function comprobarResultado() {
    let ganador = false;

    for (const combinacion of combinacionesGanadoras) {
        const [a, b, c] = combinacion;

        if (
            tablero[a] !== "" &&
            tablero[a] === tablero[b] &&
            tablero[a] === tablero[c]
        ) {
            ganador = true;
            break;
        }
    }

    if (ganador) {
        mensaje.textContent =
            "🎉 ¡Ganó el jugador " + jugadorActual + "!";
        juegoTerminado = true;
        return;
    }

    if (!tablero.includes("")) {
        mensaje.textContent = "🤝 ¡Empate!";
        juegoTerminado = true;
        return;
    }

    jugadorActual = jugadorActual === "X" ? "O" : "X";

    turnoTexto.textContent =
        "Turno del jugador " + jugadorActual;
}

function reiniciarJuego() {
    tablero = ["", "", "", "", "", "", "", ""];
    jugadorActual = "X";
    juegoTerminado = false;

    casillas.forEach(function(casilla) {
        casilla.textContent = "";
    });

    turnoTexto.textContent = "Turno del jugador X";
    mensaje.textContent = "";
}

casillas.forEach(function(casilla, posicion) {
    casilla.addEventListener("click", function() {
        jugar(posicion);
    });
});

botonReiniciar.addEventListener("click", reiniciarJuego);
