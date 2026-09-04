const tablero = document.getElementById("tablero");
const mensaje = document.getElementById("mensaje");
const botonReiniciar = document.getElementById("reiniciar");

const minasTexto = document.getElementById("minas");
const banderasTexto = document.getElementById("banderas");
const tiempoTexto = document.getElementById("tiempo");

// Configuración del juego
const filas = 10;
const columnas = 10;
const cantidadMinas = 10;

let casillas = [];
let minas = [];
let banderas = 0;
let casillasDescubiertas = 0;
let juegoTerminado = false;
let tiempo = 0;
let temporizador;


// Crear el tablero

function crearTablero() {

    tablero.innerHTML = "";

    casillas = [];
    minas = [];
    banderas = 0;
    casillasDescubiertas = 0;
    juegoTerminado = false;
    tiempo = 0;

    clearInterval(temporizador);

    tiempoTexto.textContent = "0";
    banderasTexto.textContent = "0";
    minasTexto.textContent = cantidadMinas;

    mensaje.textContent =
        "¡Encuentra las casillas seguras!";

    mensaje.classList.remove("exito");
    mensaje.classList.remove("derrota");

    // Crear las casillas
    for (let i = 0; i < filas * columnas; i++) {

        const casilla = document.createElement("button");

        casilla.classList.add("casilla");

        casilla.dataset.posicion = i;

        casilla.addEventListener("click", descubrirCasilla);

        casilla.addEventListener("contextmenu", colocarBandera);

        tablero.appendChild(casilla);

        casillas.push(casilla);
    }

    // Crear las minas
    while (minas.length < cantidadMinas) {

        const posicion = Math.floor(
            Math.random() * (filas * columnas)
        );

        if (!minas.includes(posicion)) {
            minas.push(posicion);
        }
    }

    // Iniciar el tiempo
    temporizador = setInterval(function() {

        if (!juegoTerminado) {
            tiempo++;
            tiempoTexto.textContent = tiempo;
        }

    }, 1000);
}


// Descubrir una casilla

function descubrirCasilla(event) {

    if (juegoTerminado) {
        return;
    }

    const casilla = event.target;
    const posicion = Number(casilla.dataset.posicion);

    if (
        casilla.classList.contains("descubierta") ||
        casilla.classList.contains("bandera")
    ) {
        return;
    }

    // Si tiene una mina
    if (minas.includes(posicion)) {

        casilla.textContent = "💣";

        casilla.classList.add("mina");

        mostrarMinas();

        mensaje.textContent =
            "💥 ¡Perdiste! Encontraste una mina.";

        mensaje.classList.add("derrota");

        juegoTerminado = true;

        clearInterval(temporizador);

        return;
    }

    // Descubrir la casilla
    descubrirSegura(posicion);

    comprobarVictoria();
}


// Descubrir una casilla segura

function descubrirSegura(posicion) {

    const casilla = casillas[posicion];

    if (
        casilla.classList.contains("descubierta") ||
        casilla.classList.contains("bandera")
    ) {
        return;
    }

    casilla.classList.add("descubierta");

    casillasDescubiertas++;

    const minasCercanas = contarMinasCercanas(posicion);

    if (minasCercanas > 0) {

        casilla.textContent = minasCercanas;

        casilla.classList.add(
            "numero-" + minasCercanas
        );

    } else {

        // Descubrir casillas cercanas automáticamente
        const vecinos = obtenerVecinos(posicion);

        vecinos.forEach(function(vecino) {

            if (!minas.includes(vecino)) {
                descubrirSegura(vecino);
            }

        });
    }
}


// Contar minas cercanas

function contarMinasCercanas(posicion) {

    let cantidad = 0;

    const vecinos = obtenerVecinos(posicion);

    vecinos.forEach(function(vecino) {

        if (minas.includes(vecino)) {
            cantidad++;
        }

    });

    return cantidad;
}


// Obtener las casillas vecinas

function obtenerVecinos(posicion) {

    const vecinos = [];

    const fila = Math.floor(posicion / columnas);
    const columna = posicion % columnas;

    for (let cambioFila = -1; cambioFila <= 1; cambioFila++) {

        for (
            let cambioColumna = -1;
            cambioColumna <= 1;
            cambioColumna++
        ) {

            if (
                cambioFila === 0 &&
                cambioColumna === 0
            ) {
                continue;
            }

            const nuevaFila = fila + cambioFila;
            const nuevaColumna = columna + cambioColumna;

            if (
                nuevaFila >= 0 &&
                nuevaFila < filas &&
                nuevaColumna >= 0 &&
                nuevaColumna < columnas
            ) {

                const nuevaPosicion =
                    nuevaFila * columnas + nuevaColumna;

                vecinos.push(nuevaPosicion);
            }
        }
    }

    return vecinos;
}


// Colocar o quitar banderas

function colocarBandera(event) {

    event.preventDefault();

    if (juegoTerminado) {
        return;
    }

    const casilla = event.target;

    if (casilla.classList.contains("descubierta")) {
        return;
    }

    if (casilla.classList.contains("bandera")) {

        casilla.classList.remove("bandera");

        casilla.textContent = "";

        banderas--;

    } else {

        if (banderas >= cantidadMinas) {
            return;
        }

        casilla.classList.add("bandera");

        casilla.textContent = "🚩";

        banderas++;
    }

    banderasTexto.textContent = banderas;
}


// Mostrar todas las minas

function mostrarMinas() {

    minas.forEach(function(posicion) {

        const casilla = casillas[posicion];

        casilla.textContent = "💣";

        casilla.classList.add("mina");

    });
}


// Comprobar victoria

function comprobarVictoria() {

    const casillasSeguras =
        filas * columnas - cantidadMinas;

    if (casillasDescubiertas === casillasSeguras) {

        juegoTerminado = true;

        clearInterval(temporizador);

        mensaje.textContent =
            "🎉 ¡Ganaste! Descubriste todas las casillas seguras.";

        mensaje.classList.add("exito");

        minas.forEach(function(posicion) {

            casillas[posicion].textContent = "🚩";

        });
    }
}


// Reiniciar juego

botonReiniciar.addEventListener(
    "click",
    crearTablero
);


// Iniciar el juego al cargar la página

crearTablero();
