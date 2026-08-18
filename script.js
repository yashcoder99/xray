// =================================
// ADD YOUR X-RAY IMAGE FILES HERE
// Upload your PNG files to the "images" folder in GitHub.
// The filename here must exactly match the uploaded file.
// =================================

const xrayImages = [
    "xrayheart.png", // Image 1: Human (Radiologist)
    "xrayheart.png"           // Image 2: AI (CNN)
];

// Data for the 2 X-rays (Human vs AI comparison)
const xrayData = [
    {
        title: "Radiologist Analysis",
        finding: "Cardiomegaly",
        meaning: "Enlarged heart",
        notes: "Patient presents with shortness of breath. Evaluation of the scan reveals an increased cardiothoracic ratio (CTR greater than 0.50), indicating significant enlargement of the cardiac silhouette. The right medial contour is particularly prominent, suggesting atrial enlargement. Margins are sharp with no evidence of acute pulmonary edema. Diagnosis is based on clinical experience and these specific structural measurements.",
        reference: "https://doi.org/10.53347/rID-12334"
    },
    {
        title: "AI Analysis (CNN)",
        finding: "Cardiomegaly",
        meaning: "Enlarged heart",
        notes: "When an AI looks at this X-ray, it doesn't see a picture—it sees a massive grid of data. Every pixel is turned into a number based on how light or dark it is (from white bone to black air). The AI scans this grid for patterns, first finding simple edges and shapes. Then, it combines these shapes to recognize larger structures like the heart. By comparing the size of the heart's pixels to the rest of the chest, it can detect if the heart is larger than normal."
    }
];

function init() {
    createStyles();
    createPageLayout();
    createCards();
}

function createStyles() {
    const style = document.createElement("style");
    style.innerHTML = `
        body {
            font-family: Arial, sans-serif;
            background-color: #ffffff;
            color: #000000;
            margin: 0;
            padding: 20px;
        }
        .header {
            text-align: center;
            margin-bottom: 30px;
        }
        .demo-badge {
            position: absolute;
            top: 20px;
            right: 20px;
            background-color: #ffcc00;
            color: #000;
            padding: 5px 10px;
            font-size: 12px;
            font-weight: bold;
            border-radius: 4px;
            text-transform: uppercase;
        }
        .grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
            gap: 40px;
            max-width: 1000px;
            margin: 0 auto;
        }
        .card {
            border: 1px solid #cccccc;
            background-color: #f9f9f9;
            position: relative;
            height: 450px;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            overflow: hidden;
        }
        .card img {
            width: 100%;
            height: 100%;
            object-fit: contain;
        }
        .placeholder {
            color: #888888;
            padding: 20px;
        }
        .overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.85);
            color: #ffffff;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
            padding: 30px;
            box-sizing: border-box;
            opacity: 0;
            transition: opacity 0.2s ease;
            text-align: left;
        }
        .card:hover .overlay {
            opacity: 1;
        }
        .overlay p {
            margin: 5px 0;
            font-size: 15px;
            line-height: 1.5;
        }
        .overlay .label {
            color: #cccccc;
            font-size: 13px;
            margin-top: 15px;
            text-transform: uppercase;
            font-weight: bold;
        }
    `;
    document.head.appendChild(style);
}

function createPageLayout() {
    const badge = document.createElement("div");
    badge.className = "demo-badge";
    badge.innerText = "For demonstration purposes only";
    document.body.appendChild(badge);

    const header = document.createElement("div");
    header.className = "header";
    header.innerHTML = `
        <h1>Human vs AI X-Ray Analysis</h1>
        <p>Hover over the images to compare how a Radiologist and an AI analyze the same scan.</p>
    `;
    document.body.appendChild(header);

    const grid = document.createElement("div");
    grid.className = "grid";
    grid.id = "grid";
    document.body.appendChild(grid);
}

function createCards() {
    const grid = document.getElementById("grid");

    for (let i = 0; i < xrayData.length; i++) {
        const data = xrayData[i];
        const imagePath = xrayImages[i];
        const card = document.createElement("div");
        card.className = "card";

        let content = "";
        
        if (imagePath === "") {
            content = `<div class="placeholder">Insert ${data.title} Image Here</div>`;
        } else {
            content = `<img src="${imagePath}" alt="${data.title}" onerror="this.outerHTML='<div class=\\'placeholder\\'>Insert ${data.title} Image Here</div>'">`;
        }

        content += `
            <div style="position: absolute; top: 10px; left: 10px; background: rgba(0,0,0,0.7); color: white; padding: 6px 12px; border-radius: 4px; font-size: 16px; font-weight: bold; z-index: 1;">${data.title}</div>
            <div class="overlay">
                <div class="label">Finding:</div>
                <p>${data.finding}</p>
                
                <div class="label">Meaning:</div>
                <p>${data.meaning}</p>
                
                <div class="label">Notes / Process:</div>
                <p>${data.notes}</p>
                ${data.reference ? `<a href="${data.reference}" target="_blank" style="position: absolute; bottom: 15px; right: 20px; font-size: 11px; color: #aaaaaa; text-decoration: none;">Ref: ${data.reference}</a>` : ""}
            </div>
        `;

        card.innerHTML = content;
        grid.appendChild(card);
    }
}

// Start the page
init();
