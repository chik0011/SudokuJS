var matriceInitial = createMatrice();

function createArea() {
    let error = 0;

    let newMatrice = [];

    if (matriceInitial) 
        newMatrice = formatMatrice(matriceInitial);
    else 
        error ++;

    if (!error && newMatrice != []) {
        matriceInitial = newMatrice;
        createTab(matriceInitial);
        addListnerCells(matriceInitial);
    }
}

function addListnerCells(newMatrice) {
    document
    .querySelectorAll("input")
    .forEach((elem) => elem.addEventListener("change", () => {
        chekCell(newMatrice, elem);
    }));
}

function checkCube(coord, valueElem, format=false) {
    let bornY = [];
    let bornX = [];

    if (coord[0] <= 2) {
        bornY = [0, 1, 2];
    } else if (coord[0] > 2 && coord[0] <= 5) {
        bornY = [3, 4, 5];
    } else {
        bornY = [6, 7, 8];
    }

    if (coord[1] <= 2) {
        bornX = [0, 1, 2];
    } else if (coord[1] > 2 && coord[1] <= 5) {
        bornX = [3, 4, 5];
    } else {
        bornX = [6, 7, 8];
    }

    var cellsCube = [];
    matriceInitial.forEach((element, line) => {
        if (bornY.includes(line)) {
            for (let col = bornX[0]; col < bornX[2] + 1; col++) {
                cellsCube.push(element[col]);
            }
        }
    });
    
    if (format) {
        let counter = 0;
        for (ele of cellsCube) {
            if (ele == valueElem) {
                    counter++;
            }
        };
        
        if (counter > 1) {
            return true;
        } else {
            return false
        }
    }

    if (!cellsCube.includes(valueElem)) {
        return true;
    } else {
        return false;
    }
}

function chekCell(matrice, elem) {
    let valueElem = parseInt(elem.value);
    const coord = elem.id.split('_');
    
    let checkX = false;
    let checkY = false;
    let checkC = checkCube(coord, valueElem);

    cellsX = matrice[coord[0]];

    if (!cellsX.includes(valueElem)) {
        checkX = true;
    }
    
    var cellsY = [];
    matriceInitial.forEach((element, x) => {
        for (let y = 0; y < 9; y++) {
            if(y == coord[1]) {
                cellsY[x] = matriceInitial[x][y];
            }
        }
    });

    if (!cellsY.includes(valueElem)) {
        checkY = true;
    } 

    if (checkX && checkY && checkC) {
        elem.style.backgroundColor = "green";
    } else {
        elem.style.backgroundColor = "red";
    }

    matrice[coord[0]][coord[1]] = valueElem;
}

function createTab(matrice) {
    let contenair = document.querySelector('#contain_play');
    const body = document.body,
    tbl = document.createElement('table');
    tbl.setAttribute('id', 'table')

    tbl.style.width = '500px';
    tbl.style.height = '400px';
    tbl.style.border = '1px solid black';

    for (let i = 0; i < matrice.length; i++) {
        const tr = tbl.insertRow();

        for (let j = 0; j < matrice[i].length; j++) {
            const td = tr.insertCell();
            let value = matrice[i][j];

            if (value != '') {
                td.appendChild(document.createTextNode(`${value}`));
            } else {
                let input = document.createElement("input");
                input.type = "number";
                input.min = "1";
                input.max = "9";
                input.setAttribute('id', `${i}_${j}`)
                td.appendChild(input);
            }
            
            td.style.border = '1px solid black';
        }
    }

    contenair.appendChild(tbl);
}

function createMatrice() {
    return Array.from({length: 9}, () => Array.from({length: 9}, () => Math.floor(Math.random() * 9)));
}

function formatMatrice(matrice) {
    
    matrice.forEach(function(element, index) {
        let removeX = removeDuplicates(element)
        matrice[index] = removeX
    });

    matrice.forEach(function(element, x) {
        let unique = {};
        for (let y = 0; y < 9; y++) {
            let value = matrice[y][x];

            if(!unique[value]) {
                unique[value] = true;
            }
            else
                matrice[y][x] = '';
        }
    });

    matrice = formatCube(matrice);

    return matrice;
}

function formatCube(matrice) {

    let res = '';

    for (let x = 0; x <= 8; x++) {
        for (let y = 0; y <= 8; y++) {
            if (matrice[x][y] != undefined && matrice[x][y] != 0) {
                res = checkCube([x, y], matrice[x][y], true)

                if (res) {
                    matrice[x][y] = '';
                }
            }
        }
    }

    return matrice;
}

function removeDuplicates(tab) {
  let unique = {};
  let res = [];

  Object.entries(tab).forEach(([key, value]) => {
    if(!unique[value]) {
        res[key] = value;
        unique[value] = true;
    }
    else
        res[key] = '';
  })
  
  return res;
}
