// =================================
// ADD YOUR X-RAY IMAGE FILES HERE
// Upload your PNG files to the "images" folder in GitHub.
// The filename here must exactly match the uploaded file.
// =================================

const xrayImages = [
    "images/00000001.png",
    "images/00000002.png",
    "images/00000003.png",
    "images/00000004.png",
    "images/00000005.png",
    "images/00000006.png",
    "images/00000007.png",
    "images/00000008.png",
    "images/00000009.png",
    "images/00000010.png"
];

// Explanations for medical terms
const terms = {
    "Cardiomegaly": "Enlarged heart",
    "Emphysema": "Damage to the air sacs in the lungs",
    "Effusion": "Fluid buildup around the lungs",
    "No Finding": "No abnormal findings",
    "Hernia": "Organ protruding through muscle",
    "Infiltration": "Substance denser than air in the lungs",
    "Mass": "Localized swelling or lump",
    "Nodule": "Small spot or lump in the lung",
    "Atelectasis": "Partial or complete lung collapse",
    "Consolidation": "Lung tissue filled with liquid",
    "Edema": "Fluid buildup in the lungs",
    "Pleural_Thickening": "Thickening of the lung lining",
    "Pneumonia": "Lung infection",
    "Pneumothorax": "Air outside the lung",
    "Fibrosis": "Scarring of lung tissue",
    "PA": "PA chest X-ray",
    "AP": "AP chest X-ray",
    "M": "male",
    "F": "female"
};

// Data for exactly 10 X-rays
const xrayData = [
    { finding: "Cardiomegaly", age: 58, sex: "M", view: "PA" },
    { finding: "No Finding", age: 81, sex: "M", view: "PA" },
    { finding: "Hernia", age: 81, sex: "F", view: "PA" },
    { finding: "Mass, Nodule", age: 82, sex: "M", view: "AP" },
    { finding: "No Finding", age: 69, sex: "F", view: "PA" },
    { finding: "No Finding", age: 81, sex: "M", view: "PA" },
    { finding: "No Finding", age: 82, sex: "M", view: "PA" },
    { finding: "Cardiomegaly", age: 69, sex: "F", view: "PA" },
    { finding: "Emphysema", age: 73, sex: "M", view: "PA" },
    { finding: "Infiltration", age: 84, sex: "F", view: "PA" }
];

function init() {
    createStyles();
    createPageLayout();
    createCards();
}

function getMeaning(finding) {
    // Handle multiple findings (like "Mass, Nodule")
    const parts = finding.split(", ");
    let meaning = "";
    for (let i = 0; i < parts.length; i++) {
        if (terms[parts[i]]) {
            if (meaning !== "") meaning += ", ";
            meaning += terms[parts[i]];
        }
    }
    return meaning || "No explanation available";
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
        .grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            gap: 20px;
            max-width: 1200px;
            margin: 0 auto;
        }
        .card {
            border: 1px solid #cccccc;
            background-color: #f9f9f9;
            position: relative;
            height: 300px;
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
            padding: 20px;
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
            font-size: 14px;
        }
        .overlay .label {
            color: #cccccc;
            font-size: 12px;
            margin-top: 10px;
            text-transform: uppercase;
        }
    `;
    document.head.appendChild(style);
}

function createPageLayout() {
    const header = document.createElement("div");
    header.className = "header";
    header.innerHTML = `
        <h1>Chest X-ray Explorer</h1>
        <p>A simple visualization of NIH ChestX-ray14 metadata.</p>
    `;
    document.body.appendChild(header);

    const grid = document.createElement("div");
    grid.className = "grid";
    grid.id = "grid";
    document.body.appendChild(grid);
}

function createCards() {
    const grid = document.getElementById("grid");

    for (let i = 0; i < 10; i++) {
        const data = xrayData[i];
        const imagePath = xrayImages[i];
        const card = document.createElement("div");
        card.className = "card";

        let content = "";
        
        if (imagePath === "") {
            content = `<div class="placeholder">Insert X-ray Image ${i + 1} Here</div>`;
        } else {
            content = `<img src="${imagePath}" alt="Chest X-ray" onerror="this.outerHTML='<div class=\\'placeholder\\'>Insert X-ray Image ${i + 1} Here</div>'">`;
        }

        const meaning = getMeaning(data.finding);
        const sexTerm = terms[data.sex] || data.sex;
        const viewTerm = terms[data.view] || data.view;

        content += `
            <div style="position: absolute; top: 10px; left: 10px; background: rgba(0,0,0,0.7); color: white; padding: 4px 8px; border-radius: 4px; font-size: 14px; z-index: 1;">Image ${i + 1}</div>
            <div class="overlay">
                <div class="label">Finding:</div>
                <p>${data.finding}</p>
                
                <div class="label">Meaning:</div>
                <p>${meaning}</p>
                
                <div class="label">Patient:</div>
                <p>${data.age}-year-old ${sexTerm}</p>
                
                <div class="label">View:</div>
                <p>${viewTerm}</p>
            </div>
        `;

        card.innerHTML = content;
        grid.appendChild(card);
    }
}

// Start the page
init();
