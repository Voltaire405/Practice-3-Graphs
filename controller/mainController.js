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
let vertex = 0;
let sides = new Array();
let inciMat = new Array();

document.getElementById('vertex-form').onsubmit = function () {
    vertex = Number.parseInt(document.getElementById('vertex').value);
    sides = generateRandomSides(vertex);
    inciMat = getIncidenceMatrix(sides, vertex);    
    hideHouses(vertex);
    renderConnection(sides, coordinates);
    document.getElementById('send-vertex').setAttribute('disabled', 'true');
    return false;

};

document.getElementById('btn-clean').addEventListener("click",function(e){
    window.location.reload(true);
});
//let inciMat = getIncidenceMatrix(sides, 9);