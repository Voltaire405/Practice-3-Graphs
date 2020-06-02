"use strict";
class Grafo {
    constructor(matrizIncidencia) {
        this.inci = matrizIncidencia;
    }
    getInci() {
        return this.inci;
    }
    setInci(value) {
        this.inci = value;
    }
    numeroVertices() {
        let vertices = this.inci.length - 1;
        return vertices;
    }
    numeroLados() {
        let lados = this.inci[0].length - 1;
        return lados;
    }
    /**
     * Devuelve un arreglo de arreglos. Cada arreglo es una trayectoria.
     * Para cada arreglo la primera posición representa la longitud de la trayectoria n.
     * Las siguientes n posiciones representan los vertices por los que pasa la
     * trayectoria.
     * En la siguiente posición se indica si es una trayectoria simple con un 1 o 0
     * En la ultima posición se indica si es una trayectoria con ciclo con un 1 o 0
     * @param vertice1 entero que indica el vertice desde donde incia la trayectoria
     * @param vertice2 entero que indica el vertice donde termina la trayectoria
     * @returns retorna el arreglo de arreglos con las diferentes trayectorias y la información
     * de estas
     */
    trayectorias(vertice1, vertice2) {
        let trayectoriasTotales = [];
        let verticesRepetidos = Array(this.numeroVertices()).fill(0);
        let trayectoria = [];
        trayectoria.push(vertice1);
        this.calcularTrayectorias(vertice1, vertice2, trayectoriasTotales, verticesRepetidos, trayectoria);
        for (let i = 0; i < trayectoriasTotales.length; i++) {
            this.trayectoriaSimple(trayectoriasTotales[i]);
            this.longitud(trayectoriasTotales[i]);
            this.ciclo(trayectoriasTotales[i]);
        }
        return trayectoriasTotales;
    }
    /**
     * Calcula las diferentes trayectorias entre dos vertices
     * @param vertice1 vertice de inicio de la trayectoria
     * @param vertice2 vertide de llegada de la trayectoria
     * @param trayectoriasTotales arreglo de arreglos que contiene todas las trayectorias
     * @param verticesRepetidos contiene los indices de los vertices repetidos
     * @param trayectoria arreglo que se usa para guardar los vertices de cada trayectoria
     * durante su construcción
     */
    calcularTrayectorias(vertice1, vertice2, trayectoriasTotales, verticesRepetidos, trayectoria) {
        verticesRepetidos[vertice1 - 1] = 1;
        if (vertice1 == vertice2) {
            let t = [];
            for (let i = 0; i < trayectoria.length; i++) {
                t.push(trayectoria[i]);
            }
            if (t.length != 1)
                trayectoriasTotales.push(t);
            trayectoria.pop();
            verticesRepetidos[vertice1 - 1] = 0;
            return;
        }
        for (let j = 1; j <= this.numeroLados(); j++) {
            if (this.inci[vertice1][j] == 1) {
                for (let i = 1; i <= this.numeroVertices(); i++) {
                    if (this.inci[i][j] == -1) {
                        if (!verticesRepetidos[i - 1]) {
                            trayectoria.push(i);
                            this.calcularTrayectorias(i, vertice2, trayectoriasTotales, verticesRepetidos, trayectoria);
                            trayectoria.pop();
                        }
                    }
                }
            }
        }
    }
    /**
     * Calcula la longitud de una trayectoria que es ingresda como parametro
     * @param trayectoria arreglo que contiene los vertices de una trayectoria
     */
    longitud(trayectoria) {
        let n = trayectoria.length - 1;
        trayectoria.unshift(n);
    }
    /**
     * Determina si una trayectoria tiene ciclo
     * @param trayectoria arreglo que contiene los vertices de una trayectoria
     */
    ciclo(trayectoria) {
        let ciclo = 0;
        let n = trayectoria[0];
        if (trayectoria[n + 1]) {
            if (trayectoria[1] == trayectoria[n])
                ciclo = 1;
        }
        trayectoria.push(ciclo);
    }
    /**
     * Determina si una trayectoria es simple
     * @param trayectoria arreglo que contiene los vertices de una trayectoria
     */
    trayectoriaSimple(trayectoria) {
        let simple = 1;
        for (let i = 1; i < trayectoria.length; i++) {
            let k = trayectoria[i];
            if (trayectoria.indexOf(k) != trayectoria.lastIndexOf(k))
                simple = 0;
        }
        trayectoria.push(simple);
    }
    /**
     * Determina si un grafo esta fuertemente conectado
     * @returns booleano que indica si el grafo es fuertemente conectado
     */
    EsConectado() {
        let conectado = true;
        for (let i = 1; i <= this.numeroVertices(); i++) {
            for (let j = 1; j <= this.numeroVertices(); j++) {
                if (i != j) {
                    if (this.trayectorias(i, j).length == 0)
                        conectado = false;
                }
            }
        }
        return conectado;
    }
    /**
     * Determina si son adyacentes dos vertices ingresados como parametros
     * retorna true si son adyacentes, false de lo contrario
     * @param vertice1 numero del primer vertice que se va a evaluar
     * @param vertice2 numero del segundo vertice que se va a evaluar
     * @returns {boolean}  booleano que indica si son adyacentes o no
     */
    adyacentes(vertice1, vertice2) {
        let adyacentes = false;
        for (let i = 1; i <= this.numeroLados(); i++) {
            if (this.inci[vertice1][i] != 2 && this.inci[vertice1][i] != 0) {
                if (this.inci[vertice2][i] != 2 && this.inci[vertice2][i] != 0) {
                    adyacentes = true;
                    break;
                }
            }
        }
        return adyacentes;
    }
    /**
     * calcula el grado saliente de un vertice que recibe como parametro
     * @param vertice vertice para el cual se que calculará el grado saiente
     * @returns numero que representa el grado saliente del vertice
     */
    gradoEntrante(vertice) {
        let grado = 0;
        for (let i = 1; i <= this.numeroLados(); i++) {
            if (this.inci[vertice][i] == -1 || this.inci[vertice][i] == 2) {
                grado++;
            }
        }
        return grado;
    }
    /**
     * calcula el grado saliente de un vertice que recibe como parametro
     * @param vertice vertice para el cual se calculará el grado saliente
     * @returns numero que representa el grado saliente del vertice
     */
    gradoSaliente(vertice) {
        let grado = 0;
        for (let i = 1; i <= this.numeroLados(); i++) {
            if (this.inci[vertice][i] == 1 || this.inci[vertice][i] == 2) {
                grado++;
            }
        }
        return grado;
    }
    /**
     * Calcula el recorrido BFS en el grafo
     * @returns arreglo de numeros en los que cada indice representa el vertice
     * por el que se pasará en el recorrido
     */
    BFS() {
        let recorrido = [];
        let cola = [];
        let vertice = 1;
        let visitado = Array(this.numeroVertices()).fill(0);
        visitado[vertice - 1] = 1;
        cola.push(vertice);
        let n = cola.length;
        while (n != 0) {
            vertice = cola[0];
            recorrido.push(vertice);
            cola.shift();
            for (let j = 1; j <= this.numeroLados(); j++) {
                if (this.inci[vertice][j] != 0) {
                    for (let i = 1; i <= this.numeroVertices(); i++) {
                        if (this.inci[i][j] != 0 && i != vertice) {
                            if (visitado[i - 1] == 0) {
                                visitado[i - 1] = 1;
                                cola.push(i);
                            }
                        }
                    }
                }
            }
            n = cola.length;
        }
        return recorrido;
    }
    /**
     * Construye el recorrido DFS dentro del grafo
     * @param vertice vertice de inicio del recorrido
     * @param visitado arreglo que contiene los vertices visitados dentro del recorrido
     * @param recorrido arreglo que se usa para construir el recorrido
     */
    recorridoDFS(vertice, visitado, recorrido) {
        visitado[vertice - 1] = 1;
        recorrido.push(vertice);
        for (let j = 1; j <= this.numeroLados(); j++) {
            if (this.inci[vertice][j] != 0) {
                for (let i = 1; i <= this.numeroVertices(); i++) {
                    if (this.inci[i][j] != 0 && i != vertice) {
                        if (visitado[i - 1] == 0) {
                            this.recorridoDFS(i, visitado, recorrido);
                        }
                    }
                }
            }
        }
    }
    /**
     * Determina el recorrido DFS en el grafo
     * @returns arreglo de  en el que cada indice representa cada vertice
     * por el que se pasará en el recorrido
     */
    DFS() {
        let vertice = 1;
        let visitado = Array(this.numeroVertices()).fill(0);
        let recorrido = [];
        this.recorridoDFS(vertice, visitado, recorrido);
        return recorrido;
    }
}
