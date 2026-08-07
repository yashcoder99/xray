# Chest X-Ray Explorer

A simple static HTML and vanilla JavaScript website for exploring Chest X-Ray metadata.

## Features
- **No Node.js Required**: This project is built entirely with basic HTML and JavaScript. There are no npm packages, `package.json`, or Node servers involved.
- **No API Keys**: It doesn't rely on any external APIs (like Gemini) or backend services.
- **GitHub Pages Ready**: Can be hosted directly on GitHub Pages by simply pushing the files.

## How to Use

1. Upload the files to your GitHub repository.
2. Create an `images` folder in the root directory.
3. Upload your X-ray PNG files into the `images` folder.
4. Ensure the filenames match the ones listed in the `script.js` file (e.g., `00000001.png`, `00000002.png`, etc.).
5. Turn on GitHub Pages for the repository. The website will serve `index.html` automatically and load the images.

## Project Structure

```
Chest-X-Ray-Explorer/
├── index.html       # The single HTML file (loads the script)
├── script.js        # The vanilla JavaScript file handling the entire app
└── images/          # Create this folder on GitHub and place your PNG images inside
```
