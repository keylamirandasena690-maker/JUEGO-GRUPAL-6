const tablero = document.getElementById("tablero");
const mensaje = document.getElementById("mensaje");
const botonReiniciar = document.getElementById("reiniciar");
const tiempoTexto = document.getElementById("tiempo");
const minasTexto = document.getElementById("minas"); 

const filas = 10;
const columnas = 10;
const cantidadMinas = 10; 

let casillas = [];
let juegoTerminado = false;
let tiempo = 0;
let intervalo;
let banderasColocadas = 0;
let primerClic = true; // CORREGIDO: Rastrillo para saber si es el primer movimiento 

function iniciarJuego() {
tablero.innerHTML = "";
mensaje.textContent = "";
tiempo = 0;
juegoTerminado = false;
casillas = [];
banderasColocadas = 0;
primerClic = true; // Reinicia el estado del primer clic 

tiempoTexto.textContent = tiempo;
minasTexto.textContent = cantidadMinas;

clearInterval(intervalo);

intervalo = setInterval(function() {
if (!juegoTerminado && !primerClic) { // El tiempo empieza a correr tras el primer clic
tiempo++;
tiempoTexto.textContent = tiempo;
}
}, 1000);

for (let fila = 0; fila < filas; fila++) {
for (let columna = 0; columna < columnas; columna++) {
    const casilla = {
        fila: fila,
        columna: columna,
        mina: false,
        descubierta: false,
        bandera: false,
        elemento: null
    };

    const elemento = document.createElement("div");
    elemento.classList.add("casilla");

    elemento.addEventListener("click", function() {
        descubrirCasilla(casilla);
    });

    elemento.addEventListener("contextmenu", function(evento) {
        evento.preventDefault();
        colocarBandera(casilla);
    });

    casilla.elemento = elemento;
    casillas.push(casilla);
    tablero.appendChild(elemento);
}

}

} 

// CORREGIDO: Ahora recibe la casilla del primer clic para no poner minas ni ahí ni cerca
function colocarMinas(casillaInicial) {
let minasColocadas = 0;
const vecinasIniciales = obtenerVecinas(casillaInicial); 

while (minasColocadas < cantidadMinas) {
const posicion = Math.floor(Math.random() * casillas.length);
const casilla = casillas[posicion];
// Evita poner mina en la casilla inicial y en sus vecinas directas para dar espacio al arrancar
const esCasillaInicial = casilla === casillaInicial;
const esVecinaInicial = vecinasIniciales.includes(casilla);

if (!casilla.mina && !esCasillaInicial && !esVecinaInicial) {
    casilla.mina = true;
    minasColocadas++;
}

}

} 

function obtenerVecinas(casilla) {
return casillas.filter(function(otra) {
return (
Math.abs(otra.fila - casilla.fila) <= 1 &&
Math.abs(otra.columna - casilla.columna) <= 1 &&
otra !== casilla
);
});
} 

function contarMinas(casilla) {
return obtenerVecinas(casilla).filter(function(vecina) {
return vecina.mina;
}).length;
} 

function descubrirCasilla(casilla) {
if (
juegoTerminado ||
casilla.descubierta ||
casilla.bandera
) {
return;
} 

// CORREGIDO: Si es el primer clic, genera las minas de forma segura en este instante
if (primerClic) {
primerClic = false;
colocarMinas(casilla);
}

casilla.descubierta = true;
casilla.elemento.classList.add("descubierta");

if (casilla.mina) {
casilla.elemento.textContent = "💣";
casilla.elemento.classList.add("mina");
terminarJuego(false);
return;
}

const minasCercanas = contarMinas(casilla);

if (minasCercanas > 0) {
casilla.elemento.textContent = minasCercanas;
} else {
obtenerVecinas(casilla).forEach(function(vecina) {
descubrirCasilla(vecina);
});
}

comprobarVictoria();

} 

function colocarBandera(casilla) {
if (juegoTerminado || casilla.descubierta) {
return;
} 

casilla.bandera = !casilla.bandera;

if (casilla.bandera) {
casilla.elemento.textContent = "🚩";
casilla.elemento.classList.add("bandera");
banderasColocadas++;
} else {
casilla.elemento.textContent = "";
casilla.elemento.classList.remove("bandera");
banderasColocadas--;
}

minasTexto.textContent = cantidadMinas - banderasColocadas;

} 

function comprobarVictoria() {
const casillasSeguras = casillas.filter(function(casilla) {
return !casilla.mina;
}); 

const descubiertas = casillasSeguras.filter(function(casilla) {
return casilla.descubierta;
});

if (descubiertas.length === casillasSeguras.length) {
terminarJuego(true);
}

} 

function terminarJuego(gano) {
juegoTerminado = true;
clearInterval(intervalo); 

casillas.forEach(function(casilla) {
if (casilla.mina) {
casilla.elemento.textContent = "💣";
casilla.elemento.classList.add("mina");
}
});

if (gano) {
mensaje.textContent = "🎉 ¡Ganaste! Encontraste todas las casillas seguras.";
} else {
mensaje.textContent = "💥 ¡Perdiste! Tocaste una mina.";
}

} 

botonReiniciar.addEventListener("click", iniciarJuego); 

iniciarJuego();
