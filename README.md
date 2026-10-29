# Annie Finnerty Portfolio Website

This repository contains the source for Annie Finnerty's personal portfolio and resume site. It is a static front-end site built with HTML, CSS, and JavaScript, with additional pages for portfolio case studies and a downloadable resume.

## Project overview

The site includes:
- a home page with introduction and services sections
- a portfolio section with case studies and article-style project pages
- a resume page and downloadable PDF asset
- responsive layouts for desktop and mobile
- interactive navigation, image gallery behavior, and contact form validation

## Repository structure

- `index.html` — homepage
- `resume.html` — resume viewer/download page
- `portfolio/` — portfolio landing page and project pages
- `css/` — site stylesheets
- `img/` — image assets used across the site
- `js/` — additional client-side scripts if present in the project
- `app.js` — main site JavaScript behaviors
- `deploy.py` — static site deployment script
- `DEPLOYING.md` — deployment instructions
- `deploy_config.example.json` — sample deployment configuration
- `A. Finnerty Resume.pdf` — resume PDF file

## Local development

Because this is a static site, you can preview it by serving the folder locally.

1. Open a terminal in the project root.
2. Start a local web server:

```bash
python -m http.server 8000
```

3. Visit `http://localhost:8000` in your browser.

If you want to open the HTML files directly from the filesystem, that usually works for basic static pages, but using a local web server is the safer option for consistent behavior.

## Notes about the resume

The PDF resume is included at the repository root as:

- `A. Finnerty Resume.pdf`

The website links to it from the home page and resume page, and the resume page includes a viewer and download button.

## Deployment

This project is set up for static hosting and can be deployed to S3 or another static hosting provider.

See [DEPLOYING.md](DEPLOYING.md) for the project’s deployment instructions and configuration details.

## Customization

To customize the site content:
- edit the HTML files in the root or `portfolio/` folders
- update styling in the files under `css/`
- update behavior in `app.js`

## Requirements

The Python deployment helper depends on:

```text
boto3>=1.34,<2
```

Install dependencies with:

```bash
python -m pip install -r requirements.txt
```

## GitHub-friendly usage

This repository is meant to be easy to browse and clone from GitHub. Keep the public-facing assets and project pages in the repository root and under `portfolio/`, and use the deployment config files only for environment-specific settings.

If you plan to upload the site to a public GitHub Pages or static hosting setup, make sure any private deployment credentials remain out of the repository.
