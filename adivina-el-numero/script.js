const entradaNumero = document.getElementById("numero");
const botonComprobar = document.getElementById("comprobar");
const botonReiniciar = document.getElementById("reiniciar");
const mensaje = document.getElementById("mensaje");
const intentosTexto = document.getElementById("intentos"); 

let numeroSecreto;
let intentos;
let juegoTerminado; 

function iniciarJuego() {
numeroSecreto = Math.floor(Math.random() * 100) + 1;
intentos = 0;
juegoTerminado = false; 

entradaNumero.value = "";
mensaje.textContent = "";
mensaje.style.color = "#7b2cbf";
intentosTexto.textContent = intentos;
entradaNumero.disabled = false;
botonComprobar.disabled = false;

entradaNumero.focus();

} 

function comprobarNumero() {
if (juegoTerminado) {
return;
} 

const numero = Number(entradaNumero.value);

if (entradaNumero.value === "" || numero < 1 || numero > 100) {
mensaje.textContent = "⚠️ Escribe un número válido del 1 al 100.";
mensaje.style.color = "#ff7096";
entradaNumero.focus();
return;
}

intentos++;
intentosTexto.textContent = intentos;

if (numero === numeroSecreto) {
mensaje.textContent = "🎉 ¡Correcto! Adivinaste el número secreto.";
mensaje.style.color = "#2a9d8f";
juegoTerminado = true;
entradaNumero.disabled = true;
botonComprobar.disabled = true;
} else if (numero < numeroSecreto) {
mensaje.textContent = "⬆️ El número secreto es mayor.";
mensaje.style.color = "#7b2cbf";
// CORREGIDO: Selecciona el texto para que pueda ver qué escribió y reescribir encima fácil
entradaNumero.focus();
entradaNumero.select();

} else {
mensaje.textContent = "⬇️ El número secreto es menor.";
mensaje.style.color = "#7b2cbf";
// CORREGIDO: Selecciona el texto para mantener la usabilidad impecable
entradaNumero.focus();
entradaNumero.select();

}

} 

botonComprobar.addEventListener("click", comprobarNumero); 

entradaNumero.addEventListener("keydown", function(evento) {
if (evento.key === "Enter") {
comprobarNumero();
}
}); 

botonReiniciar.addEventListener("click", iniciarJuego); 

iniciarJuego();
