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

