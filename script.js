const humanImagePath = "Lung2OG.png";

const humanData = {
    id: "human",
    exhibit: "A",
    title: "Radiologist Analysis",
    status: "clear",
    finding: "None",
    meaning: "No evidence of acute pulmonary disease",
    notes: "FINDINGS: Cardiovascular: The cardiac silhouette is normal in size. Pulmonary: There is no focal consolidation. There are no pleural effusions. There is no evidence of pneumothorax. Musculoskeletal: Mild degenerative changes are noted in the osseous structures.",
    alt: "Chest X-ray — radiologist read"
};

const aiImagePath = "Lung1.png";

const aiData = {
    id: "ai",
    exhibit: "B",
    title: "Chest-CAD (computer-assisted detection AI)",
    status: "flag",
    finding: "Squamous Cell Carcinoma",
    meaning: "Cancer",
    notes: "Quoted from source: Chest-CAD analysis identified suspicious regions of interest (ROIs) in the lungs, with one ROI encompassing early lung cancer in the left lung. A heatmap, which is an intermediate processing output of Chest-CAD and not shown to the end user, clearly focused on the known left infrahilar malignancy and post-obstructive left lower lung atelectasis.",
    alt: "Chest X-ray — Chest-CAD (AI) read"
};

const styles = `
    :root {
        --paper: #fbfaf7;
        --plate: #f1efe9;
        --ink: #17181a;
        --ink-muted: #5c5e61;
        --rule: rgba(23, 24, 26, .16);
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
        font-family: var(--sans);
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

    .kicker {
        font-size: 12px;
        letter-spacing: .16em;
        text-transform: uppercase;
        color: var(--ink-muted);
        margin: 0 0 22px;
        text-align: center;
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
        font-family: var(--sans);
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

    .verdict {
        text-align: center;
        font-family: var(--serif);
        font-style: italic;
        font-size: 15px;
        color: var(--ink-muted);
        margin: 48px 0 0;
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

function escapeHTML(value) {
    return String(value ?? "").replace(/[&<>"']/g, character => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    }[character]));
}

function createElement(tag, options = {}) {
    const element = document.createElement(tag);

    if (options.className) {
        element.className = options.className;
    }

    if (options.textContent !== undefined) {
        element.textContent = options.textContent;
    }

    if (options.attributes) {
        for (const [name, value] of Object.entries(options.attributes)) {
            element.setAttribute(name, value);
        }
    }

    return element;
}

function createExhibit(imagePath, data) {
    const exhibit = createElement("div", {
        className: data.status === "flag" ? "exhibit exhibit--alert" : "exhibit"
    });

    const label = createElement("p", {
        className: "exhibit__label",
        textContent: `Exhibit ${data.exhibit}`
    });

    const source = createElement("p", {
        className: "exhibit__source",
        textContent: data.title
    });

    const plate = createElement("div", {
        className: "plate"
    });

    const figureMessage = createElement("div", {
        className: "fig-pending"
    });

    if (imagePath) {
        const image = createElement("img", {
            attributes: {
                src: imagePath,
                alt: data.alt
            }
        });

        image.addEventListener("error", () => {
            plate.classList.add("is-empty");
        }, { once: true });

        figureMessage.textContent = `Fig. ${data.exhibit} — "${imagePath}" not found`;

        plate.appendChild(image);
    } else {
        plate.classList.add("is-empty");
        figureMessage.textContent = `Fig. ${data.exhibit} — image pending`;
    }

    if (data.status === "flag") {
        const stamp = createElement("div", {
            className: "stamp",
            textContent: "Flagged"
        });

        stamp.setAttribute("aria-hidden", "true");
        plate.appendChild(stamp);
    } else {
        const mark = createElement("div", {
            className: "mark",
            textContent: "Reviewed"
        });

        mark.setAttribute("aria-hidden", "true");
        plate.appendChild(mark);
    }

    plate.appendChild(figureMessage);

    const findingField = createElement("div", {
        className: "field is-finding"
    });

    const findingLabel = createElement("p", {
        className: "field__label",
        textContent: "Finding"
    });

    const findingValue = createElement("p", {
        className: "field__value",
        textContent: data.finding
    });

    findingField.appendChild(findingLabel);
    findingField.appendChild(findingValue);

    const meaningField = createElement("div", {
        className: "field"
    });

    const meaningLabel = createElement("p", {
        className: "field__label",
        textContent: "Meaning"
    });

    const meaningValue = createElement("p", {
        className: "field__value",
        textContent: data.meaning
    });

    meaningField.appendChild(meaningLabel);
    meaningField.appendChild(meaningValue);

    const details = createElement("details");

    const summary = createElement("summary", {
        textContent: "Full read"
    });

    const arrow = document.createElementNS("http://www.w3.org/2000/svg", "svg");

    arrow.setAttribute("class", "chev");
    arrow.setAttribute("viewBox", "0 0 24 24");
    arrow.setAttribute("fill", "none");
    arrow.setAttribute("stroke", "currentColor");
    arrow.setAttribute("stroke-width", "2.3");
    arrow.setAttribute("stroke-linecap", "round");
    arrow.setAttribute("stroke-linejoin", "round");
    arrow.setAttribute("aria-hidden", "true");

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", "M6 9l6 6 6-6");

    arrow.appendChild(path);
    summary.appendChild(arrow);

    const findings = createElement("div", {
        className: "findings"
    });

    const findingsText = createElement("p", {
        textContent: data.notes
    });

    findings.appendChild(findingsText);

    details.appendChild(summary);
    details.appendChild(findings);

    exhibit.appendChild(label);
    exhibit.appendChild(source);
    exhibit.appendChild(plate);
    exhibit.appendChild(findingField);
    exhibit.appendChild(meaningField);
    exhibit.appendChild(details);

    return exhibit;
}

function buildPage() {
    document.title = "Same Film, Split Verdict — Human vs. AI";

    const metaViewport = createElement("meta", {
        attributes: {
            name: "viewport",
            content: "width=device-width, initial-scale=1.0"
        }
    });

    const metaCharset = createElement("meta", {
        attributes: {
            charset: "UTF-8"
        }
    });

    const metaTheme = createElement("meta", {
        attributes: {
            name: "theme-color",
            content: "#fbfaf7"
        }
    });

    const metaDescription = createElement("meta", {
        attributes: {
            name: "description",
            content: "A comparison of a radiologist's and an AI system's read of the same chest X-ray."
        }
    });

    const styleElement = createElement("style");
    styleElement.textContent = styles;

    document.head.appendChild(metaCharset);
    document.head.appendChild(metaViewport);
    document.head.appendChild(metaTheme);
    document.head.appendChild(metaDescription);
    document.head.appendChild(styleElement);

    document.body.innerHTML = "";

    const wrapper = createElement("div", {
        className: "wrap"
    });

    const kicker = createElement("p", {
        className: "kicker",
        textContent: "Case File — Radiology"
    });

    const heading = createElement("h1", {
        textContent: "Same film. Split verdict."
    });

    const subtitle = createElement("p", {
        className: "sub",
        textContent: "A chest X-ray, read independently by a radiologist and an AI system."
    });

    const note = createElement("p", {
        className: "note",
        textContent: "For demonstration only — not a diagnostic tool."
    });

    const rule = createElement("hr", {
        className: "rule"
    });

    const exhibits = createElement("div", {
        className: "exhibits",
        attributes: {
            id: "grid"
        }
    });

    const humanExhibit = createExhibit(humanImagePath, humanData);

    const spine = createElement("div", {
        className: "spine"
    });

    spine.setAttribute("aria-hidden", "true");

    const aiExhibit = createExhibit(aiImagePath, aiData);

    exhibits.appendChild(humanExhibit);
    exhibits.appendChild(spine);
    exhibits.appendChild(aiExhibit);

    const verdict = createElement("p", {
        className: "verdict",
        textContent: "The two reads did not agree."
    });

    const footer = createElement("footer", {
        className: "cite"
    });

    const sourceParagraph = createElement("p");

    const sourceStrong = createElement("strong", {
        textContent: "Source."
    });

    const sourceText = document.createTextNode(
        ' Sicular et al., “Reevaluation of missed lung cancer with artificial intelligence,” Respiratory Medicine Case Reports 39 (2022): 101733 — '
    );

    const sourceLink = createElement("a", {
        textContent: "doi.org/10.1016/j.rmcr.2022.101733",
        attributes: {
            href: "https://doi.org/10.1016/j.rmcr.2022.101733",
            target: "_blank",
            rel: "noopener noreferrer"
        }
    });

    sourceParagraph.appendChild(sourceStrong);
    sourceParagraph.appendChild(sourceText);
    sourceParagraph.appendChild(sourceLink);
    footer.appendChild(sourceParagraph);

    wrapper.appendChild(kicker);
    wrapper.appendChild(heading);
    wrapper.appendChild(subtitle);
    wrapper.appendChild(note);
    wrapper.appendChild(rule);
    wrapper.appendChild(exhibits);
    wrapper.appendChild(verdict);
    wrapper.appendChild(footer);

    document.body.appendChild(wrapper);
}

buildPage();
