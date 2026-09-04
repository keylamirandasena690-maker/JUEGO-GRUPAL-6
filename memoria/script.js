const tablero = document.getElementById("tablero");
const movimientosTexto = document.getElementById("movimientos");
const mensaje = document.getElementById("mensaje");
const botonReiniciar = document.getElementById("reiniciar"); 

const simbolos = ["🍎", "🍌", "🍇", "🍉", "🍓", "🍒", "🥝", "🍍"]; 

let cartas = [];
let primeraCarta = null;
let segundaCarta = null;
let bloquear = false;
let movimientos = 0;
let parejasEncontradas = 0; 

function iniciarJuego() {
tablero.innerHTML = "";
mensaje.textContent = "";
movimientos = 0;
parejasEncontradas = 0;
primeraCarta = null;
segundaCarta = null;
bloquear = false; 

movimientosTexto.textContent = movimientos;

cartas = [...simbolos, ...simbolos];

cartas.sort(function() {
return Math.random() - 0.5;
});

cartas.forEach(function(simbolo) {
const carta = document.createElement("div");
carta.classList.add("carta");
carta.dataset.simbolo = simbolo;
carta.textContent = "";

carta.addEventListener("click", voltearCarta);

tablero.appendChild(carta);

});

} 

function voltearCarta() {
if (
bloquear ||
this === primeraCarta ||
this.classList.contains("volteada") ||
this.classList.contains("encontrada")
) {
return;
} 

this.classList.add("volteada");
this.textContent = this.dataset.simbolo;

if (!primeraCarta) {
primeraCarta = this;
return;
}

segundaCarta = this;
movimientos++;
movimientosTexto.textContent = movimientos;

comprobarPareja();

} 

function comprobarPareja() {
const sonIguales = primeraCarta.dataset.simbolo === segundaCarta.dataset.simbolo; 

if (sonIguales) {
// CORREGIDO: Se quita 'volteada' y se pone 'encontrada' para liberar el flujo del juego
primeraCarta.classList.remove("volteada");
segundaCarta.classList.remove("volteada");
primeraCarta.classList.add("encontrada");
segundaCarta.classList.add("encontrada");

parejasEncontradas++;

primeraCarta = null;
segundaCarta = null;

if (parejasEncontradas === simbolos.length) {
    mensaje.textContent = "🎉 ¡Ganaste! Encontraste todas las parejas.";
}

} else {
bloquear = true;
setTimeout(function() {
    primeraCarta.classList.remove("volteada");
    segundaCarta.classList.remove("volteada");

    primeraCarta.textContent = "";
    segundaCarta.textContent = "";

    primeraCarta = null;
    segundaCarta = null;
    bloquear = false;
}, 900);

}

} 

botonReiniciar.addEventListener("click", iniciarJuego); 

iniciarJuego();
