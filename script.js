const humanImagePath = "Lung2OG.png";

const humanData = {
    exhibit: "A",
    title: "Radiologist Analysis",
    status: "clear",
    finding: "None",
    meaning: "No evidence of acute pulmonary disease",
    notes: "FINDINGS: Cardiovascular: The cardiac silhouette is normal in size. Pulmonary: There is no focal consolidation. There are no pleural effusions. There is no evidence of pneumothorax. Musculoskeletal: Mild degenerative changes are noted in the osseous structures.",
    alt: "Chest X-ray — radiologist read",
    points: [
        "cardiac silhouette normal in size",
        "no focal consolidation",
        "no pleural effusions",
        "no evidence of pneumothorax"
    ]
};

const aiImagePath = "Lung1.png";

const aiData = {
    exhibit: "B",
    title: "Chest-CAD (computer-assisted detection AI)",
    status: "flag",
    finding: "Squamous Cell Carcinoma",
    meaning: "Cancer",
    notes: "Quoted from source: Chest-CAD analysis identified suspicious regions of interest (ROIs) in the lungs, with one ROI encompassing early lung cancer in the left lung. A heatmap, which is an intermediate processing output of Chest-CAD and not shown to the end user, clearly focused on the known left infrahilar malignancy and post-obstructive left lower lung atelectasis.",
    alt: "Chest X-ray — Chest-CAD (AI) read",
    points: [
        "early lung cancer (left) detected by Chest-CAD",
        "left infrahilar malignancy",
        "post-obstructive left lower lung atelectasis"
    ]
};

const style = document.createElement("style");

style.textContent = `
    :root {
        --paper: #fbfaf7;
        --plate: #f1efe9;
        --ink: #17181a;
        --ink-muted: #5c5e61;
        --rule: rgba(23,24,26,.16);
        --alert: #b3271f;
        --serif: Georgia, "Iowan Old Style", "Palatino Linotype", Palatino, "Book Antiqua", serif;
        --sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    }

    * {
        box-sizing: border-box;
    }

    html {
        color-scheme: light;
    }

    body {
        margin: 0;
        background-color: var(--paper);
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E");
        color: var(--ink);
        font-family: var(--serif);
        line-height: 1.6;
        -webkit-font-smoothing: antialiased;
    }

    img {
        max-width: 100%;
        display: block;
    }

    a {
        color: var(--ink);
    }

    :focus-visible {
        outline: 2px solid var(--ink);
        outline-offset: 3px;
    }

    .wrap {
        max-width: 1040px;
        margin: 0 auto;
        padding: 88px 24px 64px;
    }

    h1 {
        font-family: var(--serif);
        font-size: clamp(32px, 5vw, 52px);
        line-height: 1.15;
        text-align: center;
        margin: 0 0 20px;
        font-weight: 700;
    }

    .sub {
        max-width: 520px;
        margin: 0 auto;
        text-align: center;
        color: var(--ink-muted);
        font-size: 16px;
    }

    .note {
        max-width: 520px;
        margin: 14px auto 0;
        text-align: center;
        color: var(--ink-muted);
        font-size: 13px;
        font-style: italic;
    }

    hr.rule {
        border: 0;
        border-top: 1px solid var(--rule);
        margin: 56px 0 48px;
    }

    .exhibits {
        display: grid;
        grid-template-columns: 1fr 1px 1fr;
        column-gap: 48px;
    }

    .spine {
        background: var(--rule);
    }

    .exhibit__label {
        font-family: var(--serif);
        font-size: 13px;
        letter-spacing: .1em;
        text-transform: uppercase;
        color: var(--ink-muted);
        border-bottom: 1px solid var(--rule);
        padding-bottom: 10px;
        margin-bottom: 16px;
    }

    .exhibit__source {
        font-size: 13px;
        color: var(--ink-muted);
        margin-bottom: 18px;
    }

    .plate {
        position: relative;
        aspect-ratio: 4 / 3;
        background: var(--plate);
        border: 1px solid var(--rule);
        margin-bottom: 22px;
    }

    .plate img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }

    .plate.is-empty img {
        display: none;
    }

    .fig-pending {
        display: none;
    }

    .plate.is-empty .fig-pending {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        text-align: center;
        padding: 24px;
        color: var(--ink-muted);
        font-size: 12.5px;
        line-height: 1.6;
    }

    .stamp {
        position: absolute;
        top: 14px;
        right: 14px;
        border: 2px solid var(--alert);
        color: var(--alert);
        background: var(--paper);
        font-family: var(--serif);
        font-weight: 700;
        font-size: 11px;
        letter-spacing: .12em;
        text-transform: uppercase;
        padding: 4px 10px;
        transform: rotate(-5deg);
    }

    .mark {
        position: absolute;
        top: 16px;
        right: 14px;
        color: var(--ink-muted);
        font-size: 11px;
        letter-spacing: .1em;
        text-transform: uppercase;
    }

    .field {
        margin-bottom: 20px;
    }

    .field__label {
        font-size: 11.5px;
        letter-spacing: .08em;
        text-transform: uppercase;
        color: var(--ink-muted);
        margin: 0 0 6px;
    }

    .field__value {
        margin: 0;
        font-size: 16px;
    }

    .is-finding .field__value {
        font-family: var(--serif);
        font-size: clamp(22px, 3vw, 28px);
        line-height: 1.2;
        font-weight: 700;
    }

    .exhibit--alert .is-finding .field__value {
        color: var(--alert);
    }

    .points {
        margin: 0;
        padding-left: 20px;
        color: var(--ink);
        font-size: 15px;
        line-height: 1.7;
    }

    .points li {
        margin-bottom: 6px;
    }

    details summary {
        cursor: pointer;
        list-style: none;
        display: inline-flex;
        align-items: center;
        gap: 6px;
        font-size: 13px;
        font-weight: 600;
        letter-spacing: .03em;
        text-transform: uppercase;
        color: var(--ink-muted);
    }

    details summary:hover {
        color: var(--ink);
    }

    details summary::marker {
        content: "";
    }

    details summary::-webkit-details-marker {
        display: none;
    }

    details .chev {
        width: 12px;
        height: 12px;
        transition: transform .2s ease;
    }

    details[open] .chev {
        transform: rotate(180deg);
    }

    details .findings {
        margin-top: 14px;
        padding-top: 14px;
        border-top: 1px solid var(--rule);
        font-size: 15px;
        color: var(--ink);
        line-height: 1.7;
        max-width: 46ch;
    }

    details .findings p {
        margin: 0;
    }


    footer.cite {
        margin-top: 56px;
        padding-top: 20px;
        border-top: 1px solid var(--rule);
        font-size: 13px;
        color: var(--ink-muted);
        line-height: 1.6;
        font-style: italic;
    }

    footer.cite strong {
        font-style: normal;
        color: var(--ink);
    }

    @media (max-width: 760px) {
        .wrap {
            padding: 56px 20px 48px;
        }

        h1 {
            font-size: clamp(28px, 8vw, 40px);
        }

        hr.rule {
            margin: 40px 0 36px;
        }

        .exhibits {
            grid-template-columns: 1fr;
            row-gap: 0;
        }

        .spine {
            display: none;
        }

        .exhibit ~ .exhibit {
            border-top: 1px solid var(--rule);
            padding-top: 36px;
            margin-top: 36px;
        }
    }

    @media (prefers-reduced-motion: reduce) {
        details .chev {
            transition: none;
        }
    }
`;

document.head.appendChild(style);

document.title = "AI-driven Diagnosis of Potential Lung Disease";

const metaCharset = document.createElement("meta");
metaCharset.setAttribute("charset", "UTF-8");
document.head.appendChild(metaCharset);

const metaViewport = document.createElement("meta");
metaViewport.setAttribute("name", "viewport");
metaViewport.setAttribute("content", "width=device-width, initial-scale=1.0");
document.head.appendChild(metaViewport);

const metaTheme = document.createElement("meta");
metaTheme.setAttribute("name", "theme-color");
metaTheme.setAttribute("content", "#fbfaf7");
document.head.appendChild(metaTheme);

const metaDescription = document.createElement("meta");
metaDescription.setAttribute("name", "description");
metaDescription.setAttribute(
    "content",
    "A comparison of a radiologist's and an AI system's read of the same chest X-ray."
);
document.head.appendChild(metaDescription);

document.body.innerHTML = "";

const wrap = document.createElement("div");
wrap.className = "wrap";


const heading = document.createElement("h1");
heading.textContent = "The Comparison of Human and AI reasoning";

const subtitle = document.createElement("p");
subtitle.className = "sub";
subtitle.textContent =
    "LEFT IMAGE, No obvious sign of lung disease detected by radiologist (human) \nRIGHT IMAGE, Suspicious “Squamous Cell Carcinoma” diagnosis by AI-driven tool";

const note = document.createElement("p");
note.className = "note";
note.textContent = "For demonstration only.";

const rule = document.createElement("hr");
rule.className = "rule";

const exhibits = document.createElement("div");
exhibits.className = "exhibits";
exhibits.id = "grid";

function createExhibit(imagePath, data) {
    const exhibit = document.createElement("div");

    if (data.status === "flag") {
        exhibit.className = "exhibit exhibit--alert";
    } else {
        exhibit.className = "exhibit";
    }

    const label = document.createElement("p");
    label.className = "exhibit__label";
    label.textContent = "Exhibit " + data.exhibit;

    const source = document.createElement("p");
    source.className = "exhibit__source";
    source.textContent = data.title;

    const plate = document.createElement("div");
    plate.className = "plate";

    const image = document.createElement("img");
    image.src = imagePath;
    image.alt = data.alt;

    const pending = document.createElement("div");
    pending.className = "fig-pending";
    pending.textContent =
        "Fig. " + data.exhibit + " — \"" + imagePath + "\" not found";

    image.addEventListener("error", function() {
        plate.className = "plate is-empty";
    });

    plate.appendChild(image);
    plate.appendChild(pending);

    if (data.status === "flag") {
        const stamp = document.createElement("div");
        stamp.className = "stamp";
        stamp.textContent = "Anomaly";
        stamp.setAttribute("aria-hidden", "true");
        plate.appendChild(stamp);
    } else {
        const mark = document.createElement("div");
        mark.className = "mark";
        mark.textContent = "No Anomaly";
        mark.setAttribute("aria-hidden", "true");
        plate.appendChild(mark);
    }

    const list = document.createElement("ul");
    list.className = "points";

    for (let i = 0; i < data.points.length; i++) {
        const item = document.createElement("li");
        item.textContent = data.points[i];
        list.appendChild(item);
    }

    exhibit.appendChild(label);
    exhibit.appendChild(source);
    exhibit.appendChild(plate);
    exhibit.appendChild(list);

    return exhibit;
}

const humanExhibit = createExhibit(humanImagePath, humanData);

const spine = document.createElement("div");
spine.className = "spine";
spine.setAttribute("aria-hidden", "true");

const aiExhibit = createExhibit(aiImagePath, aiData);

exhibits.appendChild(humanExhibit);
exhibits.appendChild(spine);
exhibits.appendChild(aiExhibit);


const footer = document.createElement("footer");
footer.className = "cite";

const sourceParagraph = document.createElement("p");

const sourceStrong = document.createElement("strong");
sourceStrong.textContent = "Source.";

const sourceText = document.createTextNode(
    " Sicular et al., \"Reevaluation of missed lung cancer with artificial intelligence,\" Respiratory Medicine Case Reports 39 (2022): 101733 — "
);

const sourceLink = document.createElement("a");
sourceLink.href = "https://doi.org/10.1016/j.rmcr.2022.101733";
sourceLink.target = "_blank";
sourceLink.rel = "noopener noreferrer";
sourceLink.textContent = "doi.org/10.1016/j.rmcr.2022.101733";

sourceParagraph.appendChild(sourceStrong);
sourceParagraph.appendChild(sourceText);
sourceParagraph.appendChild(sourceLink);

footer.appendChild(sourceParagraph);

wrap.appendChild(heading);
wrap.appendChild(subtitle);
wrap.appendChild(note);
wrap.appendChild(rule);
wrap.appendChild(exhibits);
wrap.appendChild(footer);

document.body.appendChild(wrap);
