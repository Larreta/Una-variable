"use strict";

// ============================================
// MATEMÁTICA CHALLENGE
// Juego de Cálculo Diferencial
// ============================================

const TOTAL_PREGUNTAS = 5;
const TIEMPO_POR_PREGUNTA = 30;
const PUNTOS_BASE = 100;

const CLAVE_ULTIMA_PARTIDA = "matematicaChallengeUltimasPreguntas";
const CLAVE_PREGUNTAS_USADAS = "matematicaChallengePreguntasUsadas";

// ============================================
// BANCO DE 30 PREGUNTAS
// correcta: índice de la alternativa correcta (empieza en 0)
// ============================================

const bancoPreguntas = [
    // ===== NIVEL BÁSICO =====
    {
        id: "b01",
        categoria: "Límites",
        dificultad: "basico",
        pregunta: "Calcula el límite: lim(x → 2) (x² + 3x − 1).",
        alternativas: ["7", "9", "11", "13"],
        correcta: 1,
        explicacion: "Como es una función polinómica, sustituimos x = 2: 2² + 3(2) − 1 = 4 + 6 − 1 = 9."
    },
    {
        id: "b02",
        categoria: "Derivadas",
        dificultad: "basico",
        pregunta: "¿Cuál es la derivada de f(x) = 3x⁴ − 2x² + 5?",
        alternativas: [
            "12x³ − 4x",
            "3x³ − 2x",
            "12x⁴ − 4x²",
            "12x³ − 4x + 5"
        ],
        correcta: 0,
        explicacion: "Aplicamos la regla de la potencia: la derivada de 3x⁴ es 12x³, la de −2x² es −4x y la derivada de una constante es cero."
    },
    {
        id: "b03",
        categoria: "Regla de la potencia",
        dificultad: "basico",
        pregunta: "Si f(x) = x³, ¿cuál es su derivada?",
        alternativas: ["x²", "3x²", "3x", "x⁴"],
        correcta: 1,
        explicacion: "Usamos la regla d(xⁿ)/dx = nxⁿ⁻¹. Entonces, d(x³)/dx = 3x²."
    },
    {
        id: "b04",
        categoria: "Derivadas trigonométricas",
        dificultad: "basico",
        pregunta: "¿Cuál es la derivada de f(x) = sen(x)?",
        alternativas: ["−sen(x)", "−cos(x)", "cos(x)", "tan(x)"],
        correcta: 2,
        explicacion: "La regla básica establece que la derivada de sen(x) es cos(x)."
    },
    {
        id: "b05",
        categoria: "Funciones exponenciales",
        dificultad: "basico",
        pregunta: "¿Cuál es la derivada de f(x) = eˣ?",
        alternativas: ["xeˣ", "eˣ", "eˣ⁻¹", "ln(x)"],
        correcta: 1,
        explicacion: "La función exponencial natural eˣ es especial porque su derivada es la misma función: eˣ."
    },
    {
        id: "b06",
        categoria: "Continuidad",
        dificultad: "basico",
        pregunta: "¿Dónde es continua la función f(x) = x² + 1?",
        alternativas: [
            "Solo en x = 0",
            "Solo para x > 0",
            "En todos los números reales",
            "En ningún número real"
        ],
        correcta: 2,
        explicacion: "Toda función polinómica es continua en todos los números reales."
    },
    {
        id: "b07",
        categoria: "Logaritmos",
        dificultad: "basico",
        pregunta: "Para x > 0, ¿cuál es la derivada de f(x) = ln(x)?",
        alternativas: ["ln(x)", "x", "1/x", "1/ln(x)"],
        correcta: 2,
        explicacion: "La regla fundamental es d(ln x)/dx = 1/x, siempre que x > 0."
    },
    {
        id: "b08",
        categoria: "Reglas de derivación",
        dificultad: "basico",
        pregunta: "¿Cuál es la derivada de f(x) = 5x − 7?",
        alternativas: ["5x", "−7", "5", "5x − 1"],
        correcta: 2,
        explicacion: "La derivada de 5x es 5 y la de la constante −7 es cero. El resultado es 5."
    },
    {
        id: "b09",
        categoria: "Límites",
        dificultad: "basico",
        pregunta: "Calcula lim(x → 3) (2x + 1).",
        alternativas: ["5", "6", "7", "9"],
        correcta: 2,
        explicacion: "Sustituimos x = 3: 2(3) + 1 = 7."
    },
    {
        id: "b10",
        categoria: "Derivadas trigonométricas",
        dificultad: "basico",
        pregunta: "¿Cuál es la derivada de f(x) = cos(x)?",
        alternativas: ["sen(x)", "−sen(x)", "cos(x)", "−cos(x)"],
        correcta: 1,
        explicacion: "La derivada de cos(x) es −sen(x). Recuerda el signo negativo."
    },

    // ===== NIVEL INTERMEDIO =====
    {
        id: "i01",
        categoria: "Regla de la cadena",
        dificultad: "intermedio",
        pregunta: "Calcula la derivada de f(x) = (2x + 1)³.",
        alternativas: [
            "3(2x + 1)²",
            "6(2x + 1)²",
            "(2x + 1)²",
            "6(2x + 1)³"
        ],
        correcta: 1,
        explicacion: "Por la regla de la cadena, derivamos la función exterior y multiplicamos por la derivada de la interior: 3(2x + 1)² · 2 = 6(2x + 1)²."
    },
    {
        id: "i02",
        categoria: "Regla del producto",
        dificultad: "intermedio",
        pregunta: "¿Cuál es la derivada de f(x) = x² sen(x)?",
        alternativas: [
            "2x cos(x)",
            "x² cos(x)",
            "2x sen(x) + x² cos(x)",
            "2x sen(x) − x² cos(x)"
        ],
        correcta: 2,
        explicacion: "Regla del producto: (uv)' = u'v + uv'. Así, f'(x) = 2x sen(x) + x² cos(x)."
    },
    {
        id: "i03",
        categoria: "Derivación implícita",
        dificultad: "intermedio",
        pregunta: "Si x² + y² = 25, ¿cuál es dy/dx?",
        alternativas: ["x/y", "−x/y", "−y/x", "2x + 2y"],
        correcta: 1,
        explicacion: "Derivamos ambos lados respecto de x: 2x + 2y(dy/dx) = 0. Despejando, dy/dx = −x/y, para y ≠ 0."
    },
    {
        id: "i04",
        categoria: "Recta tangente",
        dificultad: "intermedio",
        pregunta: "¿Cuál es la recta tangente a f(x) = x² en x = 2?",
        alternativas: ["y = 2x", "y = 4x − 4", "y = 4x + 4", "y = x + 2"],
        correcta: 1,
        explicacion: "f(2) = 4 y f'(x) = 2x, por lo que la pendiente es f'(2) = 4. Con la fórmula y − y₁ = m(x − x₁): y − 4 = 4(x − 2), es decir, y = 4x − 4."
    },
    {
        id: "i05",
        categoria: "Límites indeterminados",
        dificultad: "intermedio",
        pregunta: "Calcula lim(x → 1) [(x² − 1)/(x − 1)].",
        alternativas: ["0", "1", "2", "No existe"],
        correcta: 2,
        explicacion: "Factorizamos x² − 1 = (x − 1)(x + 1). Para x ≠ 1, simplificamos y queda x + 1. Al tomar el límite, obtenemos 2."
    },
    {
        id: "i06",
        categoria: "Derivadas logarítmicas",
        dificultad: "intermedio",
        pregunta: "Para x > 0, ¿cuál es la derivada de f(x) = ln(3x)?",
        alternativas: ["3/x", "1/(3x)", "1/x", "ln(3)"],
        correcta: 2,
        explicacion: "Por la regla de la cadena, d[ln(3x)]/dx = (1/(3x)) · 3 = 1/x."
    },
    {
        id: "i07",
        categoria: "Regla de la cadena",
        dificultad: "intermedio",
        pregunta: "¿Cuál es la derivada de f(x) = cos(2x)?",
        alternativas: [
            "−sen(2x)",
            "−2 sen(2x)",
            "2 sen(2x)",
            "−2 cos(2x)"
        ],
        correcta: 1,
        explicacion: "Derivamos cos(u) como −sen(u) y multiplicamos por u'. Como u = 2x, su derivada es 2. Resultado: −2 sen(2x)."
    },
    {
        id: "i08",
        categoria: "Puntos críticos",
        dificultad: "intermedio",
        pregunta: "Si f(x) = x³ − 3x, ¿cuáles son sus puntos críticos?",
        alternativas: [
            "Solo x = 0",
            "x = −1 y x = 1",
            "x = −3 y x = 3",
            "x = 1 y x = 3"
        ],
        correcta: 1,
        explicacion: "Derivamos: f'(x) = 3x² − 3. Igualamos a cero: 3x² − 3 = 0, por lo que x² = 1 y x = −1 o x = 1."
    },
    {
        id: "i09",
        categoria: "Regla del producto",
        dificultad: "intermedio",
        pregunta: "¿Cuál es la derivada de f(x) = xeˣ?",
        alternativas: ["eˣ", "xeˣ", "eˣ(x + 1)", "xeˣ + 1"],
        correcta: 2,
        explicacion: "Aplicamos la regla del producto: (xeˣ)' = 1·eˣ + x·eˣ = eˣ(x + 1)."
    },
    {
        id: "i10",
        categoria: "Límites trigonométricos",
        dificultad: "intermedio",
        pregunta: "En radianes, calcula lim(x → 0) [sen(x)/x].",
        alternativas: ["0", "1", "−1", "No existe"],
        correcta: 1,
        explicacion: "Es un límite trigonométrico fundamental: lim(x → 0) sen(x)/x = 1, cuando x se mide en radianes."
    },

    // ===== NIVEL AVANZADO =====
    {
        id: "a01",
        categoria: "Regla de la cadena",
        dificultad: "avanzado",
        pregunta: "Calcula la derivada de f(x) = (x² + 1)⁵.",
        alternativas: [
            "5(x² + 1)⁴",
            "10x(x² + 1)⁴",
            "10x(x² + 1)⁵",
            "5x(x² + 1)⁴"
        ],
        correcta: 1,
        explicacion: "Aplicamos la regla de la cadena: 5(x² + 1)⁴ · 2x = 10x(x² + 1)⁴."
    },
    {
        id: "a02",
        categoria: "Derivación implícita",
        dificultad: "avanzado",
        pregunta: "Si xy + y² = 4, ¿cuál es dy/dx?",
        alternativas: [
            "−y/(x + 2y)",
            "y/(x + 2y)",
            "−x/(y + 2x)",
            "−y/x"
        ],
        correcta: 0,
        explicacion: "Derivamos: y + x(dy/dx) + 2y(dy/dx) = 0. Agrupamos: (x + 2y)(dy/dx) = −y. Por tanto, dy/dx = −y/(x + 2y), cuando el denominador no es cero."
    },
    {
        id: "a03",
        categoria: "Puntos críticos",
        dificultad: "avanzado",
        pregunta: "Para f(x) = x³ − 6x² + 9x, ¿cuáles son los números críticos?",
        alternativas: [
            "x = 0 y x = 3",
            "x = 1 y x = 3",
            "x = −1 y x = 3",
            "x = 2 y x = 4"
        ],
        correcta: 1,
        explicacion: "Derivamos: f'(x) = 3x² − 12x + 9 = 3(x − 1)(x − 3). Al igualar a cero obtenemos x = 1 y x = 3."
    },
    {
        id: "a04",
        categoria: "Optimización",
        dificultad: "avanzado",
        pregunta: "Un rectángulo tiene perímetro de 20 unidades. ¿Qué dimensiones maximizan su área?",
        alternativas: [
            "4 × 6",
            "3 × 7",
            "5 × 5",
            "2 × 8"
        ],
        correcta: 2,
        explicacion: "Si los lados son x e y, entonces 2x + 2y = 20, así que y = 10 − x. El área es A(x) = x(10 − x) = 10x − x². Su derivada es A'(x) = 10 − 2x. Al igualar a cero, x = 5 y y = 5. El área máxima corresponde a un cuadrado."
    },
    {
        id: "a05",
        categoria: "Segunda derivada",
        dificultad: "avanzado",
        pregunta: "Si f(x) = x⁴ − 2x², ¿cuál es la segunda derivada?",
        alternativas: [
            "4x³ − 4x",
            "12x² − 4",
            "12x³ − 4x",
            "4x² − 2"
        ],
        correcta: 1,
        explicacion: "Primero, f'(x) = 4x³ − 4x. Derivamos otra vez y obtenemos f''(x) = 12x² − 4."
    },
    {
        id: "a06",
        categoria: "Límites trigonométricos",
        dificultad: "avanzado",
        pregunta: "En radianes, calcula lim(x → 0) [(1 − cos(3x))/x²].",
        alternativas: ["3/2", "9/2", "9", "0"],
        correcta: 1,
        explicacion: "Usamos 1 − cos(3x) = 2 sen²(3x/2). Como sen(u)/u → 1, el límite equivale a (9/2) · [sen(3x/2)/(3x/2)]². Por tanto, el resultado es 9/2."
    },
    {
        id: "a07",
        categoria: "Derivadas logarítmicas",
        dificultad: "avanzado",
        pregunta: "¿Cuál es la derivada de f(x) = ln(x² + 1)?",
        alternativas: [
            "1/(x² + 1)",
            "2x/(x² + 1)",
            "2/(x² + 1)",
            "ln(2x)"
        ],
        correcta: 1,
        explicacion: "Aplicamos la regla de la cadena: la derivada de ln(u) es u'/u. Como u = x² + 1 y u' = 2x, obtenemos 2x/(x² + 1)."
    },
    {
        id: "a08",
        categoria: "Recta tangente",
        dificultad: "avanzado",
        pregunta: "¿Cuál es la recta tangente a f(x) = x³ en x = 1?",
        alternativas: ["y = 3x − 2", "y = x + 2", "y = 3x + 2", "y = x − 1"],
        correcta: 0,
        explicacion: "f(1) = 1 y f'(x) = 3x², por lo que la pendiente en x = 1 es 3. Usando y − 1 = 3(x − 1), obtenemos y = 3x − 2."
    },
    {
        id: "a09",
        categoria: "Puntos de inflexión",
        dificultad: "avanzado",
        pregunta: "¿En qué valor de x cambia la concavidad de f(x) = x³ − 3x²?",
        alternativas: ["x = 0", "x = 1", "x = 2", "x = 3"],
        correcta: 1,
        explicacion: "La segunda derivada es f''(x) = 6x − 6. Se anula en x = 1. Además, cambia de negativa a positiva al pasar por ese valor, por lo que hay un punto de inflexión en x = 1."
    },
    {
        id: "a10",
        categoria: "Máximos y mínimos",
        dificultad: "avanzado",
        pregunta: "¿En qué valor de x alcanza su mínimo la función f(x) = x² − 4x + 1?",
        alternativas: ["x = −2", "x = 0", "x = 2", "x = 4"],
        correcta: 2,
        explicacion: "Derivamos: f'(x) = 2x − 4. Al igualar a cero, obtenemos x = 2. Como f''(x) = 2 > 0, la función tiene un mínimo en x = 2."
    }
];

// ============================================
// ELEMENTOS HTML
// ============================================

const elemento = (id) => document.getElementById(id);

const pantallaInicio = elemento("pantalla-inicio");
const pantallaJuego = elemento("pantalla-juego");
const pantallaResultados = elemento("pantalla-resultados");

const nombreJugador = elemento("nombre-jugador");
const nivelDificultad = elemento("nivel-dificultad");
const mensajeInicio = elemento("mensaje-inicio");

const nombreMostrado = elemento("nombre-mostrado");
const puntuacionElemento = elemento("puntuacion");
const numeroPreguntaElemento = elemento("numero-pregunta");
const nivelMostrado = elemento("nivel-mostrado");
const progreso = elemento("progreso");
const progresoRelleno = elemento("progreso-relleno");
const temporizadorElemento = elemento("temporizador");
const categoriaPregunta = elemento("categoria-pregunta");
const textoPregunta = elemento("texto-pregunta");
const alternativasElemento = elemento("alternativas");

const zonaExplicacion = elemento("zona-explicacion");
const resultadoRespuesta = elemento("resultado-respuesta");
const explicacionRespuesta = elemento("explicacion-respuesta");
const botonSiguiente = elemento("btn-siguiente");

const tituloResultado = elemento("titulo-resultado");
const mensajeResultado = elemento("mensaje-resultado");
const puntuacionFinal = elemento("puntuacion-final");
const respuestasCorrectasElemento = elemento("respuestas-correctas");
const respuestasIncorrectasElemento = elemento("respuestas-incorrectas");
const porcentajeFinal = elemento("porcentaje-final");
const mensajeNuevasPreguntas = elemento("mensaje-nuevas-preguntas");

// ============================================
// ESTADO DEL JUEGO
// ============================================

let jugador = "";
let preguntasPartida = [];
let indicePregunta = 0;
let puntuacion = 0;
let correctas = 0;
let incorrectas = 0;
let tiempoRestante = TIEMPO_POR_PREGUNTA;
let intervaloTemporizador = null;
let preguntaRespondida = false;

// ============================================
// FUNCIONES AUXILIARES
// ============================================

function mezclar(array) {
    const copia = [...array];

    for (let i = copia.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copia[i], copia[j]] = [copia[j], copia[i]];
    }

    return copia;
}

function leerAlmacenamiento(clave, valorPredeterminado) {
    try {
        const valor = localStorage.getItem(clave);

        if (valor === null) {
            return valorPredeterminado;
        }

        return JSON.parse(valor);
    } catch (error) {
        return valorPredeterminado;
    }
}

function guardarAlmacenamiento(clave, valor) {
    try {
        localStorage.setItem(clave, JSON.stringify(valor));
    } catch (error) {
        console.warn("No se pudo guardar el historial del juego.");
    }
}

function nombreNivel(nivel) {
    const nombres = {
        basico: "Básico",
        intermedio: "Intermedio",
        avanzado: "Avanzado"
    };

    return nombres[nivel] || "Mixto";
}

function mostrarPantalla(pantallaActiva) {
    [pantallaInicio, pantallaJuego, pantallaResultados].forEach((pantalla) => {
        pantalla.classList.add("oculta");
    });

    pantallaActiva.classList.remove("oculta");
}

function detenerTemporizador() {
    if (intervaloTemporizador !== null) {
        clearInterval(intervaloTemporizador);
        intervaloTemporizador = null;
    }
}

// ============================================
// SELECCIÓN SIN REPETIR PREGUNTAS
// ============================================

function obtenerPreguntasDisponibles() {
    const nivelSeleccionado = nivelDificultad.value;

    if (nivelSeleccionado === "todos") {
        return [...bancoPreguntas];
    }

    return bancoPreguntas.filter(
        (pregunta) => pregunta.dificultad === nivelSeleccionado
    );
}

function seleccionarPreguntas() {
    const disponibles = obtenerPreguntasDisponibles();

    // Guarda las preguntas que aparecieron en la partida anterior.
    const ultimaPartida = leerAlmacenamiento(
        CLAVE_ULTIMA_PARTIDA,
        []
    );

    // También guarda el historial del ciclo actual.
    let usadas = leerAlmacenamiento(
        CLAVE_PREGUNTAS_USADAS,
        []
    );

    const idsDisponibles = disponibles.map((pregunta) => pregunta.id);

    // Si cambió el nivel, solo se consideran preguntas del nivel elegido.
    usadas = usadas.filter((id) => idsDisponibles.includes(id));

    // Excluye las preguntas de la partida inmediatamente anterior.
    const sinRepetirUltimaPartida = disponibles.filter(
        (pregunta) => !ultimaPartida.includes(pregunta.id)
    );

    // Excluye además las preguntas usadas durante el ciclo actual.
    let candidatas = sinRepetirUltimaPartida.filter(
        (pregunta) => !usadas.includes(pregunta.id)
    );

    // Si quedan menos de cinco, prioriza no repetir la partida anterior.
    if (candidatas.length < TOTAL_PREGUNTAS) {
        candidatas = sinRepetirUltimaPartida;
        usadas = [];
    }

    // Si ya no hay suficientes preguntas nuevas, inicia otro ciclo.
    // Las preguntas de la última partida siguen excluidas siempre que
    // haya suficientes preguntas distintas en el nivel seleccionado.
    if (candidatas.length < TOTAL_PREGUNTAS) {
        candidatas = disponibles.filter(
            (pregunta) => !ultimaPartida.includes(pregunta.id)
        );
        usadas = [];
    }

    // Último recurso: el nivel debe tener preguntas para iniciar la partida.
    if (candidatas.length < TOTAL_PREGUNTAS) {
        candidatas = disponibles;
        usadas = [];
    }

    const seleccionadas = mezclar(candidatas).slice(0, TOTAL_PREGUNTAS);

    guardarAlmacenamiento(
        CLAVE_ULTIMA_PARTIDA,
        seleccionadas.map((pregunta) => pregunta.id)
    );

    guardarAlmacenamiento(
        CLAVE_PREGUNTAS_USADAS,
        [
            ...usadas,
            ...seleccionadas.map((pregunta) => pregunta.id)
        ]
    );

    return seleccionadas;
}

// ============================================
// COMENZAR PARTIDA
// ============================================

function comenzarPartida() {
    jugador = nombreJugador.value.trim();

    if (!jugador) {
        mensajeInicio.textContent = "Por favor, escribe tu nombre para comenzar.";
        nombreJugador.focus();
        return;
    }

    const disponibles = obtenerPreguntasDisponibles();

    if (disponibles.length < TOTAL_PREGUNTAS) {
        mensajeInicio.textContent = "No hay suficientes preguntas para este nivel.";
        return;
    }

    mensajeInicio.textContent = "";

    preguntasPartida = seleccionarPreguntas();
    indicePregunta = 0;
    puntuacion = 0;
    correctas = 0;
    incorrectas = 0;

    nombreMostrado.textContent = jugador;
    puntuacionElemento.textContent = "0";

    mostrarPantalla(pantallaJuego);
    mostrarPregunta();
}

// ============================================
// MOSTRAR PREGUNTA
// ============================================

function mostrarPregunta() {
    detenerTemporizador();

    preguntaRespondida = false;
    tiempoRestante = TIEMPO_POR_PREGUNTA;

    const pregunta = preguntasPartida[indicePregunta];

    numeroPreguntaElemento.textContent =
        `Pregunta ${indicePregunta + 1} de ${TOTAL_PREGUNTAS}`;

    nivelMostrado.textContent = nombreNivel(pregunta.dificultad);

    progreso.setAttribute("aria-valuenow", String(indicePregunta));
    progresoRelleno.style.width =
        `${(indicePregunta / TOTAL_PREGUNTAS) * 100}%`;

    temporizadorElemento.textContent = `${tiempoRestante} s`;
    temporizadorElemento.classList.remove("tiempo-bajo");

    categoriaPregunta.textContent = pregunta.categoria;
    textoPregunta.textContent = pregunta.pregunta;

    zonaExplicacion.classList.add("oculta");
    botonSiguiente.classList.add("oculta");

    alternativasElemento.replaceChildren();

    const letras = ["A", "B", "C", "D"];

    pregunta.alternativas.forEach((alternativa, indice) => {
        const boton = document.createElement("button");
        boton.type = "button";
        boton.className = "alternativa";

        const letra = document.createElement("span");
        letra.className = "letra-alternativa";
        letra.textContent = letras[indice];

        const texto = document.createElement("span");
        texto.textContent = alternativa;

        boton.append(letra, texto);
        boton.addEventListener("click", () => responderPregunta(indice));

        alternativasElemento.appendChild(boton);
    });

    progreso.setAttribute("aria-valuenow", String(indicePregunta));
    iniciarTemporizador();
}

// ============================================
// TEMPORIZADOR
// ============================================

function iniciarTemporizador() {
    detenerTemporizador();

    temporizadorElemento.textContent = `${tiempoRestante} s`;

    intervaloTemporizador = setInterval(() => {
        if (preguntaRespondida) {
            detenerTemporizador();
            return;
        }

        tiempoRestante--;
        temporizadorElemento.textContent = `${tiempoRestante} s`;

        if (tiempoRestante <= 10) {
            temporizadorElemento.classList.add("tiempo-bajo");
        }

        if (tiempoRestante <= 0) {
            responderPregunta(-1);
        }
    }, 1000);
}

// ============================================
// COMPROBAR RESPUESTA
// ============================================

function responderPregunta(indiceElegido) {
    if (preguntaRespondida) {
        return;
    }

    preguntaRespondida = true;
    detenerTemporizador();

    const pregunta = preguntasPartida[indicePregunta];
    const botones = alternativasElemento.querySelectorAll(".alternativa");
    const esCorrecta = indiceElegido === pregunta.correcta;

    botones.forEach((boton, indice) => {
        boton.disabled = true;

        if (indice === pregunta.correcta) {
            boton.classList.add("correcta");
        }

        if (indice === indiceElegido && !esCorrecta) {
            boton.classList.add("incorrecta");
        }
    });

    if (esCorrecta) {
        correctas++;

        // Premia las respuestas rápidas.
        puntuacion += PUNTOS_BASE + (tiempoRestante * 2);

        resultadoRespuesta.textContent = "¡Correcto! 🎉";
        resultadoRespuesta.style.color = "#198754";
    } else {
        incorrectas++;

        if (indiceElegido === -1) {
            resultadoRespuesta.textContent = "¡Se acabó el tiempo!";
        } else {
            resultadoRespuesta.textContent = "Respuesta incorrecta";
        }

        resultadoRespuesta.style.color = "#dc3545";
    }

    puntuacionElemento.textContent = String(puntuacion);
    explicacionRespuesta.textContent = pregunta.explicacion;

    zonaExplicacion.classList.remove("oculta");

    progreso.setAttribute("aria-valuenow", String(indicePregunta + 1));
    progresoRelleno.style.width =
        `${((indicePregunta + 1) / TOTAL_PREGUNTAS) * 100}%`;

    botonSiguiente.textContent =
        indicePregunta === TOTAL_PREGUNTAS - 1
            ? "Ver resultados"
            : "Siguiente pregunta";

    botonSiguiente.classList.remove("oculta");
}

// ============================================
// SIGUIENTE PREGUNTA
// ============================================

function siguientePregunta() {
    if (!preguntaRespondida) {
        return;
    }

    indicePregunta++;

    if (indicePregunta >= TOTAL_PREGUNTAS) {
        mostrarResultados();
        return;
    }

    mostrarPregunta();
}

// ============================================
// RESULTADOS
// ============================================

function mostrarResultados() {
    detenerTemporizador();

    const porcentaje = Math.round(
        (correctas / TOTAL_PREGUNTAS) * 100
    );

    tituloResultado.textContent =
        porcentaje === 100
            ? "¡Excelente, respuesta perfecta!"
            : porcentaje >= 60
                ? "¡Muy buen trabajo!"
                : "¡Sigue practicando!";

    mensajeResultado.textContent =
        `Terminaste la partida, ${jugador}. Estos son tus resultados.`;

    puntuacionFinal.textContent = String(puntuacion);
    respuestasCorrectasElemento.textContent = String(correctas);
    respuestasIncorrectasElemento.textContent = String(incorrectas);
    porcentajeFinal.textContent = `${porcentaje}%`;

    mensajeNuevasPreguntas.textContent =
        "La próxima partida seleccionará otras preguntas para que sigas practicando.";

    mostrarPantalla(pantallaResultados);
}

// ============================================
// VOLVER A JUGAR
// ============================================

function volverAJugar() {
    // No borramos el historial: así el juego puede evitar repetir preguntas.
    mensajeInicio.textContent = "";
    comenzarPartida();
}

function cambiarNivel() {
    detenerTemporizador();
    mostrarPantalla(pantallaInicio);
}

// ============================================
// EVENTOS DE LOS BOTONES
// ============================================

elemento("btn-comenzar").addEventListener("click", comenzarPartida);

botonSiguiente.addEventListener("click", siguientePregunta);

elemento("btn-volver-jugar").addEventListener("click", volverAJugar);

elemento("btn-cambiar-nivel").addEventListener("click", cambiarNivel);

nombreJugador.addEventListener("keydown", (evento) => {
    if (evento.key === "Enter" && pantallaInicio.classList.contains("oculta") === false) {
        comenzarPartida();
    }
});

// ============================================
// INICIO
// ============================================

mostrarPantalla(pantallaInicio);