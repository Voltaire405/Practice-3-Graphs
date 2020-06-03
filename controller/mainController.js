lazoDisapear();
let coordinates = [ //coordenadas de las casas.
    ['length', 12],
    [360, 511],
    [610, 250],
    [230, 472],
    [490, 60],
    [169, 140],
    [260, 60],
    [571, 140],
    [160, 370],
    [599, 370],
    [370, 30],
    [510, 472],
    [130, 250]
];
let vertex = 0,
    vertexOneHouse = 0;
let sides = new Array();
let inciMat = new Array();
let graph = null;


document.getElementById('vertex-form').onsubmit = function () {
    vertex = Number.parseInt(document.getElementById('vertex').value);
    sides = generateRandomSides(vertex);
    inciMat = getIncidenceMatrix(sides, vertex);
    hideHouses(vertex);
    renderConnection(sides, coordinates);
    graph = new Grafo(inciMat);
    let html = graph.EsConectado() ? "<p>Grafo es fuertemente conectado.</p>" : "<p>El grafo no es conectado.</p>"
    document.getElementById('graph-info').innerHTML = html;
    document.getElementById('send-vertex').setAttribute('disabled', 'true');
    document.getElementById('house').setAttribute('max', vertex);
    document.getElementById('1-house').setAttribute('max', vertex);
    document.getElementById('2-house').setAttribute('max', vertex);
    return false;

};

document.getElementById('btn-clean').addEventListener("click", function (e) {
    window.location.reload(true);
});

document.getElementById('one-house').onsubmit = function () {
    if (vertex != 0) {
        vertexOneHouse = Number.parseInt(document.getElementById("house").value);
        document.getElementById("grade").innerHTML = "Grado entrante: " + graph.gradoEntrante(vertexOneHouse) + " Grado saliente: " + graph.gradoSaliente(vertexOneHouse);
        document.getElementById('send-onehouse').setAttribute('disabled', 'true');
    } else {
        alert("Ingrese por favor el número de vértices!");
    }
    return false;
};

document.getElementById('two-houses').onsubmit = function () {
    let path1 = "",
        path2 = "";
    if (vertex != 0) {
        vertex1 = Number.parseInt(document.getElementById("1-house").value);
        vertex2 = Number.parseInt(document.getElementById("2-house").value);
        let calculatePath1 = graph.trayectorias(vertex1, vertex2);
        let calculatePath2 = graph.trayectorias(vertex2, vertex1);
        let strArrayPath1 = translatePath(calculatePath1, vertex1, vertex2);
        let strArrayPath2 = translatePath(calculatePath2, vertex2, vertex1);
        let html = "";

        html = graph.adyacentes(vertex1, vertex2) ? "<p>Vértices vecinos.</p>" : "<p>Vértices no son vecinos.</p>"
        document.getElementById('neighborhood').innerHTML = html;

        for (let p = 0; p < strArrayPath1.length; p++) {
            html = "<p>" + strArrayPath1[p] + "</p>";
            document.getElementById("going").insertAdjacentHTML('afterend', html);
        }

        for (let p = 0; p < strArrayPath2.length; p++) {
            html = "<p>" + strArrayPath2[p] + "</p>";
            document.getElementById("back").insertAdjacentHTML('afterend', html);
        }
        let bfs = graph.BFS();
        let dfs = graph.DFS();

        html = "El recorrido bfs por los vértices es: ";
        for (let index = 0; index < bfs.length; index++) {
            html += bfs[index] + " ";
        }
        html = "<p>" + html + "<p>";
        document.getElementById("bfs").insertAdjacentHTML('afterend', html);

        html = "El recorrido dfs por los vértices es: ";
        for (let index = 0; index < dfs.length; index++) {
            html += dfs[index] + " ";
        }
        html = "<p>" + html + "<p>";
        document.getElementById("dfs").insertAdjacentHTML('afterend', html);

        document.getElementById('send-twohouses').setAttribute('disabled', 'true');
    } else {
        alert("Ingrese por favor el número de vértices!");
    }

    return false;
};