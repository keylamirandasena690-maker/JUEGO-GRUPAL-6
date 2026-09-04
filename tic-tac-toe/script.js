// Obtener las casillas del tablero
const casillas = document.querySelectorAll(".casilla");

// Obtener los elementos del HTML
const mensaje = document.getElementById("mensaje");
const turnoTexto = document.getElementById("turno");
const botonReiniciar = document.getElementById("reiniciar");

// Tablero vacío
let tablero = ["", "", "", "", "", "", "", "", ""];

// Jugador que comienza
let jugadorActual = "X";

// Saber si el juego terminó
let juegoTerminado = false;

// Combinaciones ganadoras
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


// FUNCIÓN PARA JUGAR

function jugar(event) {

    const casilla = event.target;

    const posicion = casilla.dataset.posicion;

    // No permitir jugar si la casilla está ocupada
    if (
        tablero[posicion] !== "" ||
        juegoTerminado
    ) {
        return;
    }

    // Guardar el símbolo en el tablero
    tablero[posicion] = jugadorActual;

    // Mostrar el símbolo
    casilla.textContent = jugadorActual === "X" ? "✕" : "○";

    casilla.classList.add(
        jugadorActual === "X" ? "x" : "o"
    );

    // Comprobar si hay ganador
    comprobarGanador();

}


// FUNCIÓN PARA COMPROBAR EL GANADOR

function comprobarGanador() {

    for (let combinacion of combinacionesGanadoras) {

        const posicion1 = combinacion[0];
        const posicion2 = combinacion[1];
        const posicion3 = combinacion[2];

        if (
            tablero[posicion1] !== "" &&
            tablero[posicion1] === tablero[posicion2] &&
            tablero[posicion1] === tablero[posicion3]
        ) {

            juegoTerminado = true;

            mensaje.textContent =
                "🎉 ¡Ganó el jugador " + jugadorActual + "!";

            // Marcar las casillas ganadoras
            combinacion.forEach(function(posicion) {
                casillas[posicion].classList.add("ganadora");
            });

            return;
        }
    }

    // Comprobar empate
    if (!tablero.includes("")) {

        juegoTerminado = true;

        mensaje.textContent =
            "🤝 ¡Empate! No hay más espacios.";

        return;
    }

    // Cambiar de jugador
    cambiarJugador();
}


// FUNCIÓN PARA CAMBIAR DE JUGADOR

function cambiarJugador() {

    if (jugadorActual === "X") {
        jugadorActual = "O";
    } else {
        jugadorActual = "X";
    }

    const simbolo = jugadorActual === "X" ? "✕" : "○";

    turnoTexto.textContent = simbolo;

    mensaje.textContent =
        "Es el turno del jugador " + simbolo;
}


// FUNCIÓN PARA REINICIAR

function reiniciarJuego() {

    tablero = ["", "", "", "", "", "", "", "", ""];

    jugadorActual = "X";

    juegoTerminado = false;

    turnoTexto.textContent = "✕";

    mensaje.textContent =
        "Es el turno del jugador ✕";

    casillas.forEach(function(casilla) {

        casilla.textContent = "";

        casilla.classList.remove("x");

        casilla.classList.remove("o");

        casilla.classList.remove("ganadora");

    });
}


// Agregar evento a cada casilla

casillas.forEach(function(casilla) {

    casilla.addEventListener("click", jugar);

});


// Botón de reiniciar

botonReiniciar.addEventListener(
    "click",
    reiniciarJuego
);
