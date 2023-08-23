let fields = [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null
];
const WINNING_COMBINATIONS = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // horizontal
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // vertical
    [0, 4, 8], [2, 4, 6], // diagonal
];

let currentPlayer = 'circle';

function init() {
    render();
}

function render() {
    const contentDiv = document.getElementById('content');
    let tableHTML = '<table>';
    for (let i = 0; i < 3; i++) {
        tableHTML += '<tr>';
        for (let j = 0; j < 3; j++) {
            const index = i * 3 + j;
            let symbol = '';
            if (fields[index] === 'circle') {
                symbol = generateCircleSVG();
            } else if (fields[index] === 'cross') {
                symbol = generateCrossSVG();
            }
            tableHTML += `<td onclick="handleClick(this, ${index})">${symbol}</td>`;
        }
        tableHTML += '</tr>';
    }
    tableHTML += '</table>';

    contentDiv.innerHTML = tableHTML;

}

function handleClick(cell, index) {
    if (fields[index] === null) {
        fields[index] = currentPlayer;
        cell.innerHTML = currentPlayer === 'circle' ? generateAnimatedCircleSVG() : generateAnimatedCrossSVG();
        cell.onclick = null;
        currentPlayer = currentPlayer === 'circle' ? 'cross' : 'circle';


        if (isGameFinished()) {
            const winCombination = getWinningCombination();
            drawWinningLine(winCombination);
        }
    }
}


function generateAnimatedCircleSVG() {
    const circleColor = "#00B0EF";
    const svgWidth = 70;
    const svgHeight = 70;
    const svgCode = `
        <svg width="${svgWidth}" height="${svgHeight}" xmlns="http://www.w3.org/2000/svg">
            <circle cx="35" cy="35" r="30" stroke="${circleColor}" stroke-width="5" fill="none">
                <animate attributeName="stroke-dasharray" dur="200ms" values="0, 188.5; 188.5, 0" fill="freeze" />
            </circle>
        </svg>
    `;
    
    return svgCode;
}

const svgHTML = generateAnimatedCircleSVG();
console.log(svgHTML);



function generateAnimatedCrossSVG() {
    const svgWidth = 70;
    const svgHeight = 70;
    const crossColor = "#FFC000";

    const svgCode = `
        <svg width="${svgWidth}" height="${svgHeight}" xmlns="http://www.w3.org/2000/svg">
            <g transform="rotate(45 ${svgWidth / 2} ${svgHeight / 2})">
                <rect x="${svgWidth / 2 - 2.5}" y="0" width="5" height="${svgHeight}" fill="${crossColor}">
                    <animate attributeName="height" from="0" to="${svgHeight}" dur="200ms" fill="freeze" />
                </rect>
                <rect x="0" y="${svgHeight / 2 - 2.5}" width="${svgWidth}" height="5" fill="${crossColor}">
                    <animate attributeName="width" from="0" to="${svgWidth}" dur="200ms" fill="freeze" />
                </rect>
            </g>
        </svg>
    `;

    return svgCode;
}

const animatedCrossSVG = generateAnimatedCrossSVG();
console.log(animatedCrossSVG);

function isGameFinished() {
    return fields.every((field) => field !== null) || getWinningCombination() !== null;
}

function getWinningCombination() {
    for (let i = 0; i < WINNING_COMBINATIONS.length; i++) {
        const [a, b, c] = WINNING_COMBINATIONS[i];
        if (fields[a] === fields[b] && fields[b] === fields[c] && fields[a] !== null) {
            return WINNING_COMBINATIONS[i];
        }
    }
    return null;
}
function drawWinningLine(combination) {
    const lineColor = '#ffffff';
    const lineWidth = 5;

  
    const startCell = document.querySelectorAll(`td`)[combination[0]];
    const endCell = document.querySelectorAll(`td`)[combination[2]];
    const startRect = startCell.getBoundingClientRect();
    const endRect = endCell.getBoundingClientRect();


    const contentRect = document.getElementById('content').getBoundingClientRect();

    const lineLength = Math.sqrt(
        Math.pow(endRect.left - startRect.left, 2) + Math.pow(endRect.top - startRect.top, 2),
        Math.pow(endRect.left - startRect.left, 2) + Math.pow(endRect.top - startRect.top, 2)
    );
    const lineAngle = Math.atan2(endRect.top - startRect.top, endRect.left - startRect.left);

  
    const line = document.createElement('div');
    line.style.position = 'absolute';
    line.style.width = `${lineLength}px`;
    line.style.height = `${lineWidth}px`;
    line.style.backgroundColor = lineColor;
    line.style.top = `${ startRect.top + startRect.height / 2 - lineWidth / 2 } px`;
    line.style.left = `${ startRect.left + startRect.width / 2 } px`;
    line.style.transform = `rotate(${ lineAngle }rad)`;
    line.style.top = `${startRect.top + startRect.height / 2 - lineWidth / 2 - contentRect.top}px`;
    line.style.left = `${startRect.left + startRect.width / 2 - contentRect.left}px`;
    line.style.transform = `rotate(${lineAngle}rad)`;
    line.style.transformOrigin = `top left`;
    document.getElementById('content').appendChild(line);
}
