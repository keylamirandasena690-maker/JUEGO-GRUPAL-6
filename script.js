/* =========================================================
   CODE POWER
   JavaScript del proyecto
========================================================= */


/* =========================================================
   VARIABLES PRINCIPALES
========================================================= */

let currentGame = null;

const loginScreen = document.getElementById("loginScreen");
const mainApp = document.getElementById("mainApp");

const loginForm = document.getElementById("loginForm");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const loginMessage = document.getElementById("loginMessage");

const togglePassword =
    document.getElementById("togglePassword");

const logoutButton =
    document.getElementById("logoutButton");

const gameModal =
    document.getElementById("gameModal");

const gameContent =
    document.getElementById("gameContent");


/* =========================================================
   LOGIN
========================================================= */

loginForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    if (username === "" || password === "") {

        loginMessage.textContent =
            "⚠️ Completa todos los campos.";

        loginMessage.style.color = "#d95d69";

        return;
    }

    loginMessage.textContent =
        "✅ Bienvenido/a " + username;

    loginMessage.style.color = "#58a878";

    setTimeout(function() {

        loginScreen.classList.add("hidden");
        mainApp.classList.remove("hidden");

        showSection("home");

    }, 500);

});


/* =========================================================
   MOSTRAR / OCULTAR CONTRASEÑA
========================================================= */

togglePassword.addEventListener("click", function() {

    if (passwordInput.type === "password") {

        passwordInput.type = "text";
        togglePassword.textContent = "🙈";

    } else {

        passwordInput.type = "password";
        togglePassword.textContent = "👁";

    }

});


/* =========================================================
   CERRAR SESIÓN
========================================================= */

logoutButton.addEventListener("click", function() {

    mainApp.classList.add("hidden");
    loginScreen.classList.remove("hidden");

    usernameInput.value = "";
    passwordInput.value = "";

    loginMessage.textContent = "";

    showSection("home");

});


/* =========================================================
   NAVEGACIÓN
========================================================= */

const navButtons =
    document.querySelectorAll(".nav-button");

navButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const section =
            button.dataset.section;

        showSection(section);

    });

});


function showSection(section) {

    const homeSection =
        document.getElementById("homeSection");

    const aboutSection =
        document.getElementById("aboutSection");

    if (section === "home") {

        homeSection.classList.remove("hidden");
        aboutSection.classList.add("hidden");

    }

    if (section === "about") {

        homeSection.classList.add("hidden");
        aboutSection.classList.remove("hidden");

    }


    navButtons.forEach(function(button) {

        button.classList.remove("active");

        if (button.dataset.section === section) {
            button.classList.add("active");
        }

    });

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =========================================================
   IR A LOS JUEGOS
========================================================= */

function scrollToGames() {

    const games =
        document.getElementById("games");

    if (games) {

        games.scrollIntoView({
            behavior: "smooth"
        });

    }

}


/* =========================================================
   ABRIR JUEGO
========================================================= */

function openGame(game) {

    currentGame = game;

    gameModal.classList.remove("hidden");

    if (game === "hangman") {
        createHangman();
    }

    if (game === "number") {
        createNumberGame();
    }

    if (game === "tic") {
        createTicTacToe();
    }

    if (game === "memory") {
        createMemoryGame();
    }

    if (game === "mines") {
        createMinesweeper();
    }

}


/* =========================================================
   CERRAR JUEGO
========================================================= */

function closeGame() {

    currentGame = null;

    gameModal.classList.add("hidden");

    gameContent.innerHTML = "";

}


/* =========================================================
   1. AHORCADO
========================================================= */

let hangmanWord = "";
let hangmanGuessed = [];
let hangmanAttempts = 6;

const hangmanWords = [
    "COMPUTADOR",
    "JAVASCRIPT",
    "PROGRAMACION",
    "TECLADO",
    "INTERNET",
    "VIDEOJUEGO",
    "PANTALLA",
    "CODIGO"
];


function createHangman() {

    hangmanWord =
        hangmanWords[
            Math.floor(
                Math.random() * hangmanWords.length
            )
        ];

    hangmanGuessed = [];
    hangmanAttempts = 6;

    renderHangman();

}


function renderHangman() {

    let wordDisplay = "";

    for (let letter of hangmanWord) {

        if (hangmanGuessed.includes(letter)) {
            wordDisplay += letter + " ";
        } else {
            wordDisplay += "_ ";
        }

    }


    let letters = "";

    for (
        let i = 65;
        i <= 90;
        i++
    ) {

        const letter =
            String.fromCharCode(i);

        letters += `
            <button
                class="letter-button"
                onclick="guessHangman('${letter}')"
                ${hangmanGuessed.includes(letter)
                    ? "disabled"
                    : ""}
            >
                ${letter}
            </button>
        `;

    }


    gameContent.innerHTML = `

        <div class="game-title">

            <h2>🔤 Ahorcado</h2>

            <p>
                Descubre la palabra secreta.
            </p>

        </div>

        <div class="hangman-word">
            ${wordDisplay}
        </div>

        <div class="hangman-attempts">
            Intentos restantes:
            <strong>${hangmanAttempts}</strong>
        </div>

        <div class="hangman-letters">
            ${letters}
        </div>

        <p
            id="hangmanMessage"
            class="game-status"
        ></p>

    `;

}


function guessHangman(letter) {

    if (hangmanGuessed.includes(letter)) {
        return;
    }

    hangmanGuessed.push(letter);

    if (!hangmanWord.includes(letter)) {

        hangmanAttempts--;

    }


    if (hangmanWord
        .split("")
        .every(letter =>
            hangmanGuessed.includes(letter)
        )) {

        renderHangman();

        document.getElementById(
            "hangmanMessage"
        ).textContent =
            "🎉 ¡Ganaste!";

        return;
    }


    if (hangmanAttempts <= 0) {

        renderHangman();

        document.getElementById(
            "hangmanMessage"
        ).textContent =
            "❌ Perdiste. La palabra era: "
            + hangmanWord;

        return;
    }


    renderHangman();

}


/* =========================================================
   2. ADIVINA EL NÚMERO
========================================================= */

let secretNumber = 0;
let numberAttempts = 0;


function createNumberGame() {

    secretNumber =
        Math.floor(
            Math.random() * 100
        ) + 1;

    numberAttempts = 0;

    gameContent.innerHTML = `

        <div class="game-title">

            <h2>🔢 Adivina el número</h2>

            <p>
                El número está entre 1 y 100.
            </p>

        </div>

        <div class="number-form">

            <input
                type="number"
                id="numberInput"
                class="number-input"
                min="1"
                max="100"
                placeholder="Escribe un número"
            >

            <button
                class="game-button"
                onclick="checkNumber()"
            >
                Comprobar
            </button>

        </div>

        <p
            id="numberMessage"
            class="game-status"
        ></p>

    `;

    setTimeout(function() {

        const input =
            document.getElementById(
                "numberInput"
            );

        if (input) {
            input.focus();
        }

    }, 100);

}


function checkNumber() {

    const input =
        document.getElementById(
            "numberInput"
        );

    const message =
        document.getElementById(
            "numberMessage"
        );

    const number =
        Number(input.value);

    if (
        !number ||
        number < 1 ||
        number > 100
    ) {

        message.textContent =
            "⚠️ Escribe un número entre 1 y 100.";

        return;
    }

    numberAttempts++;


    if (number === secretNumber) {

        message.textContent =
            "🎉 ¡Correcto! Lo lograste en "
            + numberAttempts
            + " intento(s).";

        return;
    }


    if (number < secretNumber) {

        message.textContent =
            "⬆️ El número secreto es mayor.";

    } else {

        message.textContent =
            "⬇️ El número secreto es menor.";

    }

}


/* =========================================================
   3. TIC TAC TOE
========================================================= */

let ticBoard = [];
let ticPlayer = "X";
let ticGameOver = false;


function createTicTacToe() {

    ticBoard = [
        "", "", "",
        "", "", "",
        "", "", ""
    ];

    ticPlayer = "X";
    ticGameOver = false;

    renderTicTacToe();

}


function renderTicTacToe() {

    let cells = "";

    ticBoard.forEach(function(cell, index) {

        cells += `

            <button
                class="tic-cell"
                onclick="playTic(${index})"
            >
                ${cell}
            </button>

        `;

    });


    gameContent.innerHTML = `

        <div class="game-title">

            <h2>❌ Tic Tac Toe</h2>

            <p>
                Turno de:
                <strong>${ticPlayer}</strong>
            </p>

        </div>

        <div class="tic-board">
            ${cells}
        </div>

        <p
            id="ticMessage"
            class="game-status"
        ></p>

    `;

}


function playTic(index) {

    if (
        ticBoard[index] !== "" ||
        ticGameOver
    ) {
        return;
    }

    ticBoard[index] = ticPlayer;


    if (checkTicWinner()) {

        ticGameOver = true;

        renderTicTacToe();

        document.getElementById(
            "ticMessage"
        ).textContent =
            "🎉 ¡Ganó " + ticPlayer + "!";

        return;
    }


    if (!ticBoard.includes("")) {

        ticGameOver = true;

        renderTicTacToe();

        document.getElementById(
            "ticMessage"
        ).textContent =
            "🤝 ¡Empate!";

        return;
    }


    ticPlayer =
        ticPlayer === "X"
            ? "O"
            : "X";

    renderTicTacToe();

}


function checkTicWinner() {

    const combinations = [

        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],

        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],

        [0, 4, 8],
        [2, 4, 6]

    ];


    return combinations.some(
        function(combo) {

            const [a, b, c] =
                combo;

            return (
                ticBoard[a] !== "" &&
                ticBoard[a] === ticBoard[b] &&
                ticBoard[a] === ticBoard[c]
            );

        }
    );

}


/* =========================================================
   4. JUEGO DE MEMORIA
========================================================= */

let memoryCards = [];
let memoryFlipped = [];
let memoryMatched = [];
let memoryLock = false;


function createMemoryGame() {

    const values = [
        "🍎",
        "🍎",
        "🍕",
        "🍕",
        "🚗",
        "🚗",
        "⚽",
        "⚽",
        "🎵",
        "🎵",
        "🐱",
        "🐱",
        "🌟",
        "🌟",
        "🎮",
        "🎮"
    ];


    memoryCards =
        values.sort(
            () => Math.random() - 0.5
        );

    memoryFlipped = [];
    memoryMatched = [];
    memoryLock = false;

    renderMemory();

}


function renderMemory() {

    let cards = "";

    memoryCards.forEach(
        function(card, index) {

            const visible =
                memoryFlipped.includes(index) ||
                memoryMatched.includes(index);

            cards += `

                <button
                    class="memory-card-game
                    ${visible ? "flipped" : ""}
                    ${memoryMatched.includes(index)
                        ? "matched"
                        : ""}"
                    onclick="flipMemory(${index})"
                >
                    ${visible ? card : "?"}
                </button>

            `;

        }
    );


    gameContent.innerHTML = `

        <div class="game-title">

            <h2>🧠 Memoria</h2>

            <p>
                Encuentra todas las parejas.
            </p>

        </div>

        <div class="memory-board">
            ${cards}
        </div>

        <p
            id="memoryMessage"
            class="game-status"
        >
            Parejas encontradas:
            ${memoryMatched.length / 2}
        </p>

    `;

}


function flipMemory(index) {

    if (
        memoryLock ||
        memoryFlipped.includes(index) ||
        memoryMatched.includes(index)
    ) {
        return;
    }

    memoryFlipped.push(index);

    renderMemory();


    if (memoryFlipped.length !== 2) {
        return;
    }

    memoryLock = true;

    const first =
        memoryFlipped[0];

    const second =
        memoryFlipped[1];


    if (
        memoryCards[first] ===
        memoryCards[second]
    ) {

        memoryMatched.push(
            first,
            second
        );

        memoryFlipped = [];
        memoryLock = false;

        renderMemory();

        if (
            memoryMatched.length ===
            memoryCards.length
        ) {

            document.getElementById(
                "memoryMessage"
            ).textContent =
                "🎉 ¡Completaste el juego!";

        }

    } else {

        setTimeout(function() {

            memoryFlipped = [];
            memoryLock = false;

            renderMemory();

        }, 800);

    }

}


/* =========================================================
   5. BUSCAMINAS
========================================================= */

let mineBoard = [];
let mineGameOver = false;

const mineRows = 8;
const mineCols = 8;
const mineCount = 10;


function createMinesweeper() {

    mineGameOver = false;

    mineBoard = [];

    for (
        let row = 0;
        row < mineRows;
        row++
    ) {

        mineBoard[row] = [];

        for (
            let col = 0;
            col < mineCols;
            col++
        ) {

            mineBoard[row][col] = {

                mine: false,
                revealed: false,
                flagged: false,
                number: 0

            };

        }

    }


    let placed = 0;

    while (placed < mineCount) {

        const row =
            Math.floor(
                Math.random() * mineRows
            );

        const col =
            Math.floor(
                Math.random() * mineCols
            );

        if (!mineBoard[row][col].mine) {

            mineBoard[row][col].mine = true;

            placed++;

        }

    }


    for (
        let row = 0;
        row < mineRows;
        row++
    ) {

        for (
            let col = 0;
            col < mineCols;
            col++
        ) {

            if (
                mineBoard[row][col].mine
            ) {
                continue;
            }

            let count = 0;

            for (
                let dr = -1;
                dr <= 1;
                dr++
            ) {

                for (
                    let dc = -1;
                    dc <= 1;
                    dc++
                ) {

                    const nr = row + dr;
                    const nc = col + dc;

                    if (
                        nr >= 0 &&
                        nr < mineRows &&
                        nc >= 0 &&
                        nc < mineCols &&
                        mineBoard[nr][nc].mine
                    ) {

                        count++;

                    }

                }

            }

            mineBoard[row][col].number =
                count;

        }

    }


    renderMinesweeper();

}


function renderMinesweeper() {

    let cells = "";

    for (
        let row = 0;
        row < mineRows;
        row++
    ) {

        for (
            let col = 0;
            col < mineCols;
            col++
        ) {

            const cell =
                mineBoard[row][col];

            let content = "";

            if (cell.flagged) {

                content = "🚩";

            } else if (cell.revealed) {

                if (cell.mine) {

                    content = "💣";

                } else {

                    content =
                        cell.number === 0
                            ? ""
                            : cell.number;

                }

            }


            cells += `

                <button
                    class="
                        mine-cell
                        ${cell.revealed ? "revealed" : ""}
                        ${cell.flagged ? "flagged" : ""}
                    "
                    onclick="revealMine(${row},${col})"
                    oncontextmenu="flagMine(event,${row},${col})"
                >
                    ${content}
                </button>

            `;

        }

    }


    gameContent.innerHTML = `

        <div class="game-title">

            <h2>💣 Buscaminas</h2>

            <p>
                Clic para descubrir.
                Clic derecho para poner bandera.
            </p>

        </div>

        <div class="mines-board">
            ${cells}
        </div>

        <p
            id="mineMessage"
            class="game-status"
        >
            🚩 Banderas:
            ${mineBoard.flat()
                .filter(cell => cell.flagged)
                .length}
        </p>

    `;

}


function revealMine(row, col) {

    if (
        mineGameOver ||
        mineBoard[row][col].revealed ||
        mineBoard[row][col].flagged
    ) {
        return;
    }


    const cell =
        mineBoard[row][col];

    cell.revealed = true;


    if (cell.mine) {

        mineGameOver = true;

        mineBoard.flat().forEach(
            function(item) {

                if (item.mine) {
                    item.revealed = true;
                }

            }
        );

        renderMinesweeper();

        document.getElementById(
            "mineMessage"
        ).textContent =
            "💥 ¡Pisaste una mina!";

        return;
    }


    if (cell.number === 0) {

        revealEmptyCells(row, col);

    }


    renderMinesweeper();


    if (checkMineWin()) {

        mineGameOver = true;

        document.getElementById(
            "mineMessage"
        ).textContent =
            "🎉 ¡Ganaste Buscaminas!";

    }

}


function revealEmptyCells(row, col) {

    for (
        let dr = -1;
        dr <= 1;
        dr++
    ) {

        for (
            let dc = -1;
            dc <= 1;
            dc++
        ) {

            const nr = row + dr;
            const nc = col + dc;


            if (
                nr < 0 ||
                nr >= mineRows ||
                nc < 0 ||
                nc >= mineCols
            ) {
                continue;
            }


            const cell =
                mineBoard[nr][nc];


            if (
                cell.revealed ||
                cell.mine ||
                cell.flagged
            ) {
                continue;
            }


            cell.revealed = true;


            if (cell.number === 0) {

                revealEmptyCells(
                    nr,
                    nc
                );

            }

        }

    }

}


function flagMine(event, row, col) {

    event.preventDefault();

    if (
        mineGameOver ||
        mineBoard[row][col].revealed
    ) {
        return false;
    }

    mineBoard[row][col].flagged =
        !mineBoard[row][col].flagged;

    renderMinesweeper();

    return false;

}


function checkMineWin() {

    let safeCells = 0;

    mineBoard.flat().forEach(
        function(cell) {

            if (
                !cell.mine &&
                cell.revealed
            ) {

                safeCells++;

            }

        }
    );


    return safeCells ===
        mineRows * mineCols - mineCount;

}


/* =========================================================
   ATAJOS DE TECLADO
========================================================= */

document.addEventListener(
    "keydown",
    function(event) {

        const key =
            event.key.toLowerCase();

        const modalOpen =
            !gameModal.classList.contains(
                "hidden"
            );


        /* ESC = cerrar juego */

        if (
            event.key === "Escape" &&
            modalOpen
        ) {

            closeGame();

            return;
        }


        /* R = reiniciar */

        if (
            key === "r" &&
            modalOpen
        ) {

            event.preventDefault();

            if (currentGame === "hangman") {
                createHangman();
            }

            if (currentGame === "number") {
                createNumberGame();
            }

            if (currentGame === "tic") {
                createTicTacToe();
            }

            if (currentGame === "memory") {
                createMemoryGame();
            }

            if (currentGame === "mines") {
                createMinesweeper();
            }

            return;
        }


        /* No ejecutar navegación mientras se escribe */

        const active =
            document.activeElement;

        const typing =
            active &&
            (
                active.tagName === "INPUT" ||
                active.tagName === "TEXTAREA"
            );


        if (
            typing ||
            modalOpen
        ) {
            return;
        }


        /* G = juegos */

        if (key === "g") {

            showSection("home");

            setTimeout(
                scrollToGames,
                100
            );

        }


        /* A = acerca de */

        if (key === "a") {

            showSection("about");

        }


        /* H = inicio */

        if (key === "h") {

            showSection("home");

        }


        /* HOME = inicio */

        if (event.key === "Home") {

            showSection("home");

        }

    }
);


/* =========================================================
   ENTER PARA ADIVINA EL NÚMERO
========================================================= */

document.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key === "Enter" &&
            currentGame === "number"
        ) {

            const input =
                document.getElementById(
                    "numberInput"
                );

            if (
                input &&
                document.activeElement === input
            ) {

                checkNumber();

            }

        }

    }
);





document.addEventListener("DOMContentLoaded", function() {
    
    // CAPAS DE NAVEGACIÓN ARCADE
    const navBtns = document.querySelectorAll(".nav-btn");
    const vistasConsola = document.querySelectorAll(".seccion-consola");
    const contenedorConsola = document.getElementById("contenedor-consola");
    const contenedorArcadePantalla = document.getElementById("contenedor-arcade-pantalla");
    const btnSalirArcade = document.getElementById("btn-salir-arcade");
    const modulosJuego = document.querySelectorAll(".modulo-juego");

    // FILTROS EDAD RECREATIVOS
    const btnSetNinos = document.getElementById("set-ninos");
    const btnSetJovenes = document.getElementById("set-jovenes");
    let modoEdad = "ninos"; // Inicia en Modo Infantil por defecto

    // MARCADORES OVERLAY
    const feedbackPantalla = document.getElementById("feedback-pantalla");
    const feedbackTitulo = document.getElementById("feedback-titulo");
    const feedbackSub = document.getElementById("feedback-sub");
    const btnCerrarFeedback = document.getElementById("btn-cerrar-feedback");

    // DISPARADORES PANTALLA COMPLETA
    document.querySelectorAll(".btn-lanzar").forEach(btn => {
        btn.addEventListener("click", function() {
            const juegoDestino = this.getAttribute("data-juego");
            contenedorConsola.classList.add("oculto");
            contenedorArcadePantalla.classList.remove("oculto");
            
            modulosJuego.forEach(mod => mod.classList.add("oculto"));
            document.getElementById(juegoDestino).classList.remove("oculto");

            arrancarLogicaJuego(juegoDestino);
        });
    });

    btnSalirArcade.addEventListener("click", function() {
        contenedorArcadePantalla.classList.add("oculto");
        contenedorConsola.classList.remove("oculto");
        detenerTodosLosCronometros();
    });

    // Control de pestañas de navegación del menú principal
    navBtns.forEach(btn => {
        btn.addEventListener("click", function() {
            navBtns.forEach(b => b.classList.remove("activo"));
            this.classList.add("activo");
            vistasConsola.forEach(v => v.classList.add("oculto"));
            document.getElementById(this.getAttribute("data-target")).classList.remove("oculto");
        });
    });

    // Cambiar Edad Global (Fácil / Pro)
    btnSetNinos.addEventListener("click", () => { cambiarEdadGlobal("ninos"); });
    btnSetJovenes.addEventListener("click", () => { cambiarEdadGlobal("jovenes"); });

    function cambiarEdadGlobal(edad) {
        modoEdad = edad;
        if(edad === "ninos") {
            btnSetNinos.classList.add("active");
            btnSetJovenes.classList.remove("active");
            document.body.classList.add("kids-theme");
        } else {
            btnSetJovenes.classList.add("active");
            btnSetNinos.classList.remove("active");
            document.body.classList.remove("kids-theme");
        }
        const moduloActivo = Array.from(modulosJuego).find(m => !m.classList.contains("oculto"));
        if(moduloActivo) arrancarLogicaJuego(moduloActivo.id);
    }

    function lanzarFeedback(titulo, sub, esExito) {
        feedbackTitulo.textContent = titulo;
        feedbackSub.textContent = sub;
        feedbackPantalla.classList.remove("oculto");
    }
    btnCerrarFeedback.addEventListener("click", () => { feedbackPantalla.classList.add("oculto"); });

    function arrancarLogicaJuego(id) {
        if(id === "juego-ahorcado") iniciarAhorcado();
        if(id === "juego-adivina") iniciarAdivina();
        if(id === "juego-tictac") iniciarTicTacToe();
        if(id === "juego-memoria") iniciarMemoria();
        if(id === "juego-buscamina") iniciarBuscaminas();
    }

    function detenerTodosLosCronometros() {
        clearInterval(minesIntervalo);
    }

    // ==========================================
    // 🔤 JUEGO 1: AHORCADO GRÁFICO
    // ==========================================
    const palabrasKids = ["SOL", "LUNA", "GATO", "PERRO", "CASA", "PAPA"];
    const palabrasTeens = ["ALGORITMO", "VARIABLES", "INTERNET", "PROGRAMA", "PROYECTO"];
    let ahPalabra = "", ahLetras = [], ahIntentos = 6;

    function iniciarAhorcado() {
        const banco = (modoEdad === "ninos") ? palabrasKids : palabrasTeens;
        ahPalabra = banco[Math.floor(Math.random() * banco.length)];
        ahLetras = [];
        ahIntentos = (modoEdad === "ninos") ? 8 : 4;
        
        document.getElementById("ahorcado-intentos").textContent = ahIntentos;
        document.querySelectorAll(".parte-a").forEach(p => p.classList.add("oculto"));
        document.getElementById("a-base").classList.remove("oculto");
        pintarPalabraAhorcado();
        generarTecladoAhorcado();
    }

    function pintarPalabraAhorcado() {
        let display = "";
        ahPalabra.split("").forEach(l => display += (ahLetras.includes(l) ? l : "_") + " ");
        document.getElementById("ahorcado-palabra").textContent = display.trim();
        if(!display.includes("_")) lanzarFeedback("🎉 ¡SÚPER JUGADOR!", "¡Lograste salvar al personaje adivinando la palabra!", true);
    }

    function generarTecladoAhorcado() {
        const caja = document.getElementById("ahorcado-teclado"); caja.innerHTML = "";
        "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ".split("").forEach(l => {
            const b = document.createElement("button"); b.textContent = l;
            b.addEventListener("click", () => { b.disabled = true; jugarLetraAh(l); });
            caja.appendChild(b);
        });
    }

    function jugarLetraAh(l) {
        if(ahPalabra.includes(l)) { ahLetras.push(l); pintarPalabraAhorcado(); }
        else {
            ahIntentos--; document.getElementById("ahorcado-intentos").textContent = ahIntentos;
            if(ahIntentos === 5) document.getElementById("a-soga").classList.remove("oculto");
            if(ahIntentos === 3) document.getElementById("a-cabeza").classList.remove("oculto");
            if(ahIntentos === 2) document.getElementById("a-cuerpo").classList.remove("oculto");
            if(ahIntentos === 1) document.getElementById("a-brazos").classList.remove("oculto");
            if(ahIntentos <= 0) {
                document.getElementById("a-piernas").classList.remove("oculto");
                lanzarFeedback("💥 ¡FIN DEL INTENTO!", "La palabra correcta era: " + ahPalabra, false);
            }
        }
    }
    document.getElementById("reiniciar-ahorcado").addEventListener("click", iniciarAhorcado);

    // ==========================================
    // 🔢 JUEGO 2: ADIVINA EL NÚMERO
    // ==========================================
    let adNumSecreto, adIntentos, adMax;
    function iniciarAdivina() {
        adMax = (modoEdad === "ninos") ? 10 : 100;
        adNumSecreto = Math.floor(Math.random() * adMax) + 1;
        adIntentos = 0;
        document.getElementById("adivina-intentos").textContent = adIntentos;
        document.getElementById("adivina-input").value = "";
        
        const btnAyuda = document.getElementById("btn-revelar-magico");
        if(modoEdad === "ninos") {
            btnAyuda.classList.remove("oculto");
            document.getElementById("pista-caja").textContent = `✨ Pista Mágica: Piensa un número del 1 al 10. ¡Es muy fácil!`;
        } else {
            btnAyuda.classList.add("oculto");
            let pista = `Analizando datos: El número aleatorio se encuentra entre 1 y 100. `;
            pista += (adNumSecreto % 2 === 0) ? "💡 Reporte: Es un número PAR." : "💡 Reporte: Es un número IMPAR.";
            document.getElementById("pista-caja").textContent = pista;
        }
    }

    document.getElementById("adivina-btn-comprobar").addEventListener("click", function() {
        const val = Number(document.getElementById("adivina-input").value);
        if(!val || val < 1 || val > adMax) return;
        adIntentos++; document.getElementById("adivina-intentos").textContent = adIntentos;
        
        if(val === adNumSecreto) {
            lanzarFeedback("🎉 ¡FANTÁSTICO!", `¡Adivinaste en solo ${adIntentos} intentos!`, true);
        } else {
            if(modoEdad === "ninos") {
                document.getElementById("pista-caja").textContent = (val < adNumSecreto) ? "🎈 ¡Prueba otra vez! El número mágico es MÁS GRANDE." : "🎈 ¡Prueba otra vez! El número mágico es MÁS PEQUEÑO.";
            } else {
                document.getElementById("pista-caja").textContent = (val < adNumSecreto) ? "⚙️ Rango Técnico: El número secreto es MAYOR que la propuesta." : "⚙️ Rango Técnico: El número secreto es MENOR que la propuesta.";
            }
        }
    });

    document.getElementById("btn-revelar-magico").addEventListener("click", function() {
        document.getElementById("pista-caja").textContent = `🎁 ¡El número secreto es el ${adNumSecreto}! Escríbelo para ganar.`;
    });
    document.getElementById("reiniciar-adivina").addEventListener("click", iniciarAdivina);

    // ==========================================
    // ❌ JUEGO 3: TIC TAC TOE + IA
    // ==========================================
    let ttTablero = Array(9).fill(""), ttActivo = true, ttModo = "1p";
    
    function iniciarTicTacToe() {
        ttTablero.fill(""); ttActivo = true;
        document.querySelectorAll(".tictac-celda").forEach(c => c.textContent = "");
    }

    document.getElementById("tictac-1p").addEventListener("click", function() { ttModo = "1p"; this.classList.add("active"); document.getElementById("tictac-2p").classList.remove("active"); iniciarTicTacToe(); });
    document.getElementById("tictac-2p").addEventListener("click", function() { ttModo = "2p"; this.classList.add("active"); document.getElementById("tictac-1p").classList.remove("active"); iniciarTicTacToe(); });
    
    document.querySelectorAll(".tictac-celda").forEach(celda => {
        celda.addEventListener("click", function() {const idx = this.getAttribute("data-idx");if(ttTablero[idx] !== "" || !ttActivo) return;ejecutarMovimientoTT(idx, "X");if(ttActivo && ttModo === "1p") setTimeout(movimientoIA, 250);});});function ejecutarMovimientoTT(idx, jugador) {ttTablero[idx] = jugador;const cElement = document.querySelector([data-idx='${idx}']);cElement.textContent = jugador;cElement.style.color = (jugador === "X") ? "#4cc9f0" : "#f72585";comprobarEstadoTT();}function movimientoIA() {let vacias = [];ttTablero.forEach((c, i) => { if(c === "") vacias.push(i); });if(vacias.length > 0 && ttActivo) {let seleccionada;if(modoEdad === "jovenes") {const combos = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];for(let combo of combos) {let piezasX = combo.filter(i => ttTablero[i] === "X").length;let piezasVacias = combo.filter(i => ttTablero[i] === "").length;if(piezasX === 2 && piezasVacias === 1) {seleccionada = combo.find(i => ttTablero[i] === "");break;}}}if(seleccionada === undefined) {seleccionada = vacias[Math.floor(Math.random() * vacias.length)];}ejecutarMovimientoTT(seleccionada, "O");}}function comprobarEstadoTT() {const combos = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];for(let combo of combos) {if(ttTablero[combo[0]] && ttTablero[combo[0]] === ttTablero[combo[1]] && ttTablero[combo[0]] === ttTablero[combo[2]]) {ttActivo = false;lanzarFeedback(ttTablero[combo[0]] === "X" ? "🎉 ¡VICTORIA TOTAL!" : "💥 ¡Computadora Ganó!", "Tres símbolos alineados en línea recta.", ttTablero[combo[0]] === "X");return;}}if(!ttTablero.includes("")) { ttActivo = false; lanzarFeedback("⚖️ ¡EMPATE!", "El tablero se completó de forma equitativa.", true); }}document.getElementById("reiniciar-tictac").addEventListener("click", iniciarTicTacToe);// ==========================================// 🧠 JUEGO 4: MEMORIA GIGANTE 3D// ==========================================let memCartas = [], memAbiertas = [], memMovs = 0, memParejas = 0;function iniciarMemoria() {const poolKids = ["🐶", "🐱", "🦁"];const poolTeens = ["🍎", "🍌", "🍇", "🍉", "🍓", "🍒", "🥝", "🍍"];const pool = (modoEdad === "ninos") ? poolKids : poolTeens;memCartas = [...pool, ...pool].sort(() => Math.random() - 0.5);memMovs = 0; memParejas = 0; memAbiertas = [];document.getElementById("memoria-movimientos").textContent = memMovs;const grid = document.getElementById("memoria-tablero"); grid.innerHTML = "";grid.style.gridTemplateColumns = (modoEdad === "ninos") ? "repeat(3, 1fr)" : "repeat(4, 1fr)";grid.style.maxWidth = (modoEdad === "ninos") ? "450px" : "600px";memCartas.forEach((sym, idx) => {const c = document.createElement("div"); c.classList.add("m-carta"); c.dataset.sym = sym;c.addEventListener("click", voltearCartaMem);grid.appendChild(c);});}function voltearCartaMem() {if(memAbiertas.length >= 2 || this.classList.contains("flipped")) return;this.classList.add("flipped"); this.textContent = this.dataset.sym;memAbiertas.push(this);if(memAbiertas.length === 2) {memMovs++; document.getElementById("memoria-movimientos").textContent = memMovs;if(memAbiertas[0].dataset.sym === memAbiertas[1].dataset.sym) {memParejas++; memAbiertas = [];if(memParejas === memCartas.length / 2) lanzarFeedback("🎉 ¡FANTÁSTICO!", "¡Encontraste todas las parejas ocultas!", true);} else {setTimeout(() => {memAbiertas[0].classList.remove("flipped"); memAbiertas[0].textContent = "";memAbiertas[1].classList.remove("flipped"); memAbiertas[1].textContent = "";memAbiertas = [];}, 800);}}}document.getElementById("reiniciar-memoria").addEventListener("click", iniciarMemoria);// ==========================================// 💣 JUEGO 5: BUSCAMINAS CON CONTROL DE DAÑO// ==========================================let minesGrid = [], minesFallos = 0, minesTime = 0, minesIntervalo, minesDimension, totalBombs;let minesIntervaloLocal; // Para evitar conflictos localesfunction iniciarBuscaminas() {minesFallos = 0; minesTime = 0;document.getElementById("mines-fallos").textContent = minesFallos;document.getElementById("mines-time").textContent = minesTime;clearInterval(minesIntervaloLocal);minesIntervaloLocal = setInterval(() => { minesTime++; document.getElementById("mines-time").textContent = minesTime; }, 1000);minesDimension = (modoEdad === "ninos") ? 25 : 100;totalBombs = (modoEdad === "ninos") ? 2 : 15;const caja = document.getElementById("mines-tablero"); caja.innerHTML = "";caja.style.gridTemplateColumns = (modoEdad === "ninos") ? "repeat(5, 1fr)" : "repeat(10, 1fr)";caja.style.maxWidth = (modoEdad === "ninos") ? "350px" : "500px";minesGrid = Array(minesDimension).fill(false);let colocadas = 0;while(colocadas < totalBombs) {let r = Math.floor(Math.random() * minesDimension);if(!minesGrid[r]) { minesGrid[r] = true; colocadas++; }}minesGrid.forEach((tieneMina, idx) => {const celda = document.createElement("div"); celda.classList.add("m-celda");celda.addEventListener("click", function() {if(this.classList.contains("safe") || this.classList.contains("boom")) return;if(tieneMina) {this.classList.add("boom"); this.textContent = "💥";minesFallos++; document.getElementById("mines-fallos").textContent = minesFallos;} else {this.classList.add("safe"); this.textContent = "✔";}comprobarVictoriaMines();});caja.appendChild(celda);});}function comprobarVictoriaMines() {const descubiertas = document.querySelectorAll(".m-celda.safe").length;const segurasNecesarias = minesDimension - totalBombs;if(descubiertas === segurasNecesarias) {clearInterval(minesIntervaloLocal);lanzarFeedback("🎉 ¡CUPIDO LOGRADO!", ¡Limpiaste la zona con éxito! Fallos cometidos: ${minesFallos}, true);}}document.getElementById("reiniciar-buscamina").addEventListener("click", iniciarBuscaminas);// Forzar renderizado inicial en modo infantilcambiarEdadGlobal("ninos");});
