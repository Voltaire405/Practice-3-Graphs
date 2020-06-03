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
let vertex = 0, vertexOneHouse = 0;
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
    document.getElementById('send-vertex').setAttribute('disabled', 'true');
    return false;

};

document.getElementById('btn-clean').addEventListener("click",function(e){
    window.location.reload(true);
});

document.getElementById('one-house').onsubmit = function () {
    vertexOneHouse = Number.parseInt(document.getElementById("house").value);
    document.getElementById("grade").innerHTML = "Grado entrante: " + graph.gradoEntrante(vertexOneHouse) + " Grado saliente: " + graph.gradoSaliente(vertexOneHouse);
    document.getElementById('send-onehouse').setAttribute('disabled', 'true');
    return false;
};

document.getElementById('two-houses').onsubmit = function () {
    vertex1 = Number.parseInt(document.getElementById("1-house").value);
    vertex2 = Number.parseInt(document.getElementById("2-house").value);
    document.getElementById("grade").innerHTML = "Grado entrante: " + graph.gradoEntrante(vertexOneHouse) + " Grado saliente: " + graph.gradoSaliente(vertexOneHouse);
    document.getElementById('send-onehouse').setAttribute('disabled', 'true');
    return false;
};