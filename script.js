const humanImagePath = "Lung2OG.png";

const humanData = {
    title: "Radiologist Analysis",
    finding: "None",
    meaning: "No evidence of acute pulmonary disease",
    notes: "FINDINGS: Cardiovascular: The cardiac silhouette is normal in size. Pulmonary: There is no focal consolidation. There are no pleural effusions. There is no evidence of pneumothorax. Musculoskeletal: Mild degenerative changes are noted in the osseous structures.",
    reference: "https://doi.org/10.1016/j.rmcr.2022.101733"
};


const aiImagePath = "Lung1.png";

const aiData = {
    title: "Chest-CAD (computer-assisted detection AI)",
    finding: "Squamous Cell Carcinoma",
    meaning: "Cancer",
    notes: "Quoted from source: Chest-CAD analysis identified suspicious regions of interest (ROIs) in the lungs, with one ROI encompassing early lung cancer in the left lung. A heatmap, which is an intermediate processing output of Chest-CAD and not shown to the end user, clearly focused on the known left infrahilar malignancy and post-obstructive left lower lung atelectasis.",
    reference: "https://doi.org/10.1016/j.rmcr.2022.101733"
};


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
    const humanCard = document.createElement("div");
    humanCard.className = "card";

    let humanImgHTML = "";
    if (humanImagePath === "") {
        humanImgHTML = `<div class="placeholder">Insert ${humanData.title} Image Here</div>`;
    } else {
        humanImgHTML = `<img src="${humanImagePath}" alt="${humanData.title}" onerror="this.outerHTML='<div class=&quot;placeholder&quot; style=&quot;color: #dd4444;&quot;>Image not found:<br><strong>${humanImagePath}</strong><br><br><span style=&quot;font-size: 12px; color: #888;&quot;>Check exact spelling and uppercase/lowercase</span></div>'">`;
    }

    humanCard.innerHTML = `
        ${humanImgHTML}
        <div style="position: absolute; top: 10px; left: 10px; background: rgba(0,0,0,0.7); color: white; padding: 6px 12px; border-radius: 4px; font-size: 16px; font-weight: bold; z-index: 1;">${humanData.title}</div>
        <div class="overlay">
            <div class="label">Finding:</div>
            <p>${humanData.finding}</p>
            
            <div class="label">Meaning:</div>
            <p>${humanData.meaning}</p>
            
            <div class="label">Notes / Process:</div>
            <p>${humanData.notes}</p>
            <a href="${humanData.reference}" target="_blank" style="position: absolute; bottom: 15px; right: 20px; font-size: 11px; color: #aaaaaa; text-decoration: none;">Ref: ${humanData.reference}</a>
        </div>
    `;
    grid.appendChild(humanCard);
    const aiCard = document.createElement("div");
    aiCard.className = "card";

    let aiImgHTML = "";
    if (aiImagePath === "") {
        aiImgHTML = `<div class="placeholder">Insert ${aiData.title} Image Here</div>`;
    } else {
        aiImgHTML = `<img src="${aiImagePath}" alt="${aiData.title}" onerror="this.outerHTML='<div class=&quot;placeholder&quot; style=&quot;color: #dd4444;&quot;>Image not found:<br><strong>${aiImagePath}</strong><br><br><span style=&quot;font-size: 12px; color: #888;&quot;>Check exact spelling and uppercase/lowercase</span></div>'">`;
    }

    aiCard.innerHTML = `
        ${aiImgHTML}
        <div style="position: absolute; top: 10px; left: 10px; background: rgba(0,0,0,0.7); color: white; padding: 6px 12px; border-radius: 4px; font-size: 16px; font-weight: bold; z-index: 1;">${aiData.title}</div>
        <div class="overlay">
            <div class="label">Finding:</div>
            <p>${aiData.finding}</p>  
       <div class="label">Meaning:</div>
       <p>${aiData.meaning}</p>
            
            <div class="label">Notes / Process:</div>
     <p>${aiData.notes}</p>
            <a href="${aiData.reference}" target="_blank" style="position: absolute; bottom: 15px; right: 20px; font-size: 11px; color: #aaaaaa; text-decoration: none;">Ref: ${aiData.reference}</a>
        </div>
    `;
    grid.appendChild(aiCard);
}
init();
