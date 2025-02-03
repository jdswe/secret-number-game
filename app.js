//Array de numeros sorteados para evitar que se repitan
//Lo cual  guarda los números sorteados en un array.
let listaNumerosSorteados = [];
let numeroMaximo = 10;
/**
 * @summary Asigna un texto a un elemento HTML.
 * @param {string} elemento - El selector del elemento HTML.
 * @param {string} texto - El texto que se asignará al elemento.
 */
function asignarTextoElemento(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}

/**
 * @summary Verifica si el número ingresado por el usuario es igual al número secreto.
 * @returns {void}
 */
function verificarIntentoi() {
    let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value);
    if (numeroDeUsuario === numeroSecreto) {
        asignarTextoElemento('P', `¡Felicidades! ¡Acertaste el número secreto!,`
            + ` lo lograste en ${intentos} ${(intentos === 1) ? 'intento' : 'intentos'}`);
        document.getElementById('reiniciar').removeAttribute('disabled');
    }
    else {
        if (numeroDeUsuario > numeroSecreto) {
            asignarTextoElemento('P', '¡El número secreto es menor!');
        }
        else {
            asignarTextoElemento('P', '¡El número secreto es mayor!');
        }
        intentos++;
        limpiarCaja();
    }
    return;
}
/**
 * @summary Limpia la caja de texto de la entrada de usuario
 * por medio de la asignación de un string vacío con la llamada de id.
 * @returns {void}
 */
function limpiarCaja() {
    document.querySelector('#valorUsuario').value = '';
}


/**
 * @summary Genera un número aleatorio entre 1 y 10.
 *  utilizamos recursividad para evitar que se repitan los números sorteados.
 * la funcion se llama a si misma si el numero generado ya esta en la lista de numeros sorteados
 * @returns {number} Un número aleatorio entre 1 y 10.
*/
function generarNumeroSecreto() {
    let numeroGenerado = Math.floor(Math.random() * numeroMaximo) + 1;

    console.log(numeroGenerado);
    console.log(listaNumerosSorteados);

    //Si ya sortemaos todos los numeros, limpiamos la lista
    if (listaNumerosSorteados.length === numeroMaximo) {
        asignarTextoElemento('p', 'Se han sorteado todos los números, se reiniciará el juego.');
    }
    else {
        //si el numero generado esta incluido en la lista de numeros sorteados
        //se vuelve a generar un nuevo numero
        if (listaNumerosSorteados.includes(numeroGenerado)) {
            return generarNumeroSecreto();
        }
        else {
            listaNumerosSorteados.push(numeroGenerado);
            return numeroGenerado;
        }
    }
}

/**
 * @summary nos permite mostrar un mensaje en el h1 y p del html del juego
 * crear de nuevo el número secreto y reiniciar los intentos inicializado en 1.
 * @returns {void}
 */
function CondicionesIniciales() {
    asignarTextoElemento('h1', 'Juego del número secreto!');
    asignarTextoElemento('p', `Indicame un número entre 1 y ${numeroMaximo}.`);
    numeroSecreto = generarNumeroSecreto();
    intentos = 1;
}

/**
 * @summary  Reinicia el juego al estado inicial en su flujo habitual.
 * para comenzar una nueva partida.
 * @returns {void}
 */
function reiniciarJuego() {
    //Limpiar caja de texto
    limpiarCaja();
    //Mostrar mensaje inicial
    CondicionesIniciales();
    //Deshabilitar boton de reiniciar
    document.querySelector('#reiniciar').setAttribute('disabled', 'true');
}

//llamado a la función CondicionesIniciales
CondicionesIniciales();

