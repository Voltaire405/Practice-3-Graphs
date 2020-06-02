/**
 * @description Funciones auxiliares de los módulos.
 */

//PRINCIPALES
/**
 * @type Array
 * @description Genera pares ordenados correspondientes a los lados del grafo dirigido primer
 * elemento es vértice saliente y el segundo es el vértice entrante.
 * @param {*} vertexNumber : int Número de vertices que tiene le grafo. 
 * @returns Array contiene tripletas {origen, destino, longitud}
 */
function generateRandomSides(vertexNumber) {
    let sides = new Array();
    let tuple, count = 1,
        condition = true;

    do {
        tuple = getRandom(vertexNumber + 1);
        if (sides.tupleExist(tuple)) { //tupla repetida.
            condition = true;
        } else {
            sides[count] = tuple;
            condition = !checkGrade(sides, vertexNumber);
            count++;
        }
    }
    while (condition);
    count--;
    sides[0] = count;
    return sides;
}

/**
 * @type Array
 * @description Calcula la matriz de incidencia
 * @param {Array} sidesArray Arreglo de lados dirigidos
 */
function getIncidenceMatrix(sidesArray, vertexNumber) {
    let inciMat = new Array(vertexNumber + 1);
    console.log("numero de lados: " + sidesArray.length);
    //Construye matriz de ceros
    for (let index = 0; index < inciMat.length; index++) {
        inciMat[index] = new Array().zeros(sidesArray.length - 1);

    }
    //llena filas superiores con el número del lado correspondiente
    for (let side = 1; side < sidesArray.length; side++) {
        inciMat[0][side] = side;
    }
    //Llenar primer elemento de cada fila con el número del vértice que le corresponde
    for (let vertex = 1; vertex <= vertexNumber; vertex++) {
        inciMat[vertex][0] = vertex;
    }
    //Reemplazar según: 1 saliente, -1 entrante, 2 ciclo
    for (let side = 1; side < sidesArray.length; side++) {
        if (sides[side][0] == sides[side][1]) {
            inciMat[sides[side][0]][side] = 2;
        } else {
            inciMat[sides[side][0]][side] = 1;
            inciMat[sides[side][1]][side] = -1;
        }
    }
    console.log(sidesArray);
    console.log(inciMat);
    return inciMat;
}

//INTERFAZ DE USUARIO
/**
 * @type void
 * @description Oculta los blucles de cada casa. Función utilitaria para la vista.
 */
function lazoDisapear() {
    let lazos = document.getElementsByClassName("lazo");
    let lazo;
    for (let index = 0; index < lazos.length; index++) {
        lazo = lazos[index];
        lazo.style.visibility = 'hidden';
    }
}

/**
 * @description Conecta las casas con lineas identificando la dirección de las lineas mediante colores, verdes para
 * denotar entrante y rojo para linea saliente.
 * @param {Array} sides lados del grafo direccionado como arreglo de pares ordenados
 * @param {Array} coordinates arreglo de arreglos con las coordenadas de cada vértice, a partir de la posición
 * 1 con correspondencia respectiva a los vértices.
 * La posición 1 contiene las coordenadas del vértice 1 y así sucesivamente.
 */
function renderConnection(sides, coordinates) {
    let lineBlock = `<g transform="translate(0.5,0.5)" style="visibility: visible; cursor: crosshair;">
    <path d="M $x1 $y1 L $x2 $y2" fill="none" stroke="#000000" stroke-miterlimit="10" pointer-events="stroke"></path>
    <ellipse cx="$cx2" cy="$cy2" rx="3" ry="3" fill="#00FF00" stroke="#000000" pointer-events="all"></ellipse>
    <ellipse cx="$cx1" cy="$cy1" rx="3" ry="3" fill="#FF0000" stroke="#000000" pointer-events="all"></ellipse>
    </g>`; // estructura: linea, circulo de llegada y circulo de salida.

    let valuesToReplace = ["$x1", "$y1", "$x2", "$y2", "$cx1", "$cy1", "$cx2", "$cy2"];
    let replaceValues = new Array(8);
    let section = document.getElementById("board");
    let lineBlockReplaced = "";

    for (i = 1; i < sides.length; i++) {
        if (sides[i][0] == sides[i][1]) {
            document.getElementById(sides[i][0].toString()).style.visibility = 'visible';
        } else {
            replaceValues[0] = coordinates[sides[i][0]][0];
            replaceValues[1] = coordinates[sides[i][0]][1] + 37;
            replaceValues[2] = coordinates[sides[i][1]][0];
            replaceValues[3] = coordinates[sides[i][1]][1];
            replaceValues[4] = coordinates[sides[i][0]][0];
            replaceValues[5] = coordinates[sides[i][0]][1] + 37;
            replaceValues[6] = coordinates[sides[i][1]][0];
            replaceValues[7] = coordinates[sides[i][1]][1];

            lineBlockReplaced = lineBlock.replaceArray(valuesToReplace, replaceValues);
            section.insertAdjacentHTML("afterend", lineBlockReplaced);
        }

    }

}

/**
 * Oculta el número de casas restantes, teniendo en cuenta que el máximo de casas
 * es 12.
 * @param {Number} vertexNumber Número de casas, mayor o igual a 8.
 */
function hideHouses(vertexNumber) {
    let surplus;
    for (let house = 12; house > vertexNumber; house--) {
        surplus = document.getElementById('v' + house);
        surplus.style.visibility = 'hidden';
    }
}

//CUSTOM PROTOTYPES
/**
 * Añade un método al prototipo string para reemplazar un array de strings por otro en
 * correspondencia con la posición que ocupan. 
 * @param find arreglo de string a buscar y reemplazar.
 * @param replace arreglo de string que sustituirán los valores indicados.
 */
String.prototype.replaceArray = function (find, replace) {
    var replaceString = this;
    for (var i = 0; i < find.length; i++) {
        replaceString = replaceString.replace(find[i], replace[i]);
    }
    return replaceString;
};

/**Función personalizada para el prototipo Array. Verifica la existencia de la tupla pasada por parámetro en
 * el arreglo que la invoca.
 */
Array.prototype.tupleExist = function (tuple) {
    for (let index = 1; index < this.length; index++) {
        //debugger;
        if (this[index][0] == tuple[0]) {
            if (this[index][1] == tuple[1]) {
                return true;
            }
        }
    }
    return false;
};

/**
 * Genera arreglo de ceros de longitud zeros + 1.
 */
Array.prototype.zeros = function (zeros) {
    let array = new Array(zeros);
    for (let index = 0; index <= zeros; index++) {
        array[index] = 0;
    }
    return array;
}


//UTILITARIAS
/**
 * @description Comprueba que el arreglo de vertices cumpla con la condición de grado de entrada y salida de almenos uno.
 * @param {*} array 
 * @param {*} vertexNumber 
 */
function checkGrade(array, vertexNumber) { //TODO revisar funcionamiento
    let length = array.length;
    if (length > 2 * vertexNumber) {

        let comprobationArray = new Array().zeros(vertexNumber);
        for (let vertex = 1; vertex <= vertexNumber; vertex++) {
            for (let i = 1; i < length; i++) {
                if (array[i][0] == vertex) {
                    comprobationArray[vertex] += comprobationArray[vertex] == 0 || comprobationArray[vertex] == 2 ? 1 : 0;
                } else if (array[i][1] == vertex) {
                    comprobationArray[vertex] += comprobationArray[vertex] == 0 || comprobationArray[vertex] == 1 ? 2 : 0;
                }

            }
        }

        for (let vertex = 1; vertex <= vertexNumber; vertex++) {
            if (comprobationArray[vertex] != 3) {
                return false;
            }
        }

        return true;
    } else return false;
}

/**
 * @description genera par ordenado aleatorio que representa un lado dirigido.
 * @param {Number} top valor máximo(no incluído) que tiene el número aleatorio calculado.
 * @returns {Array} tuple que representa un lado dirigido.
 */
function getRandom(top) {
    let random1 = 0,
        random2 = 0,
        tuple = new Array(1);

    do {
        random1 = Math.floor(Math.random() * top);
        random2 = Math.floor(Math.random() * top);

    } while (random1 == 0 || random2 == 0);
    tuple = [random1, random2];
    return tuple;
}