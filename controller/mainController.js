let coordinates = [//coordenadas de las casas.
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

let sides = generateRandomSides(9);
let inciMat = getIncidenceMatrix(sides, 9);
lazoDisapear();
hideHouses(9);
renderConnection(sides, coordinates);

