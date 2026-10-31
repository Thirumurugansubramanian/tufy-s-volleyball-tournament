# TUFY Volleyball Tournament Website

A responsive static website built with HTML, CSS and JavaScript. It includes the four supplied photos, 10 prize-place cards, 30 team slots, a match fixture list, scoreboard and a team registration form.

## Run locally
Open `index.html` in a browser. For best results, use VS Code Live Server.

## Important before publishing
- Prize names currently show generic labels (Champion, Runner-up, 3rd–10th place). Add actual prize amounts/items in `script.js` / the prize rendering section.
- Team names and fixtures are sample placeholders. Replace them with the official team draw, dates, venues and match format.
- Scores are sample/blank values. The score editor saves to the current browser's localStorage only.
- Registration currently saves to the current browser's localStorage only. It does NOT send entries to an organizer or shared database. Connect a backend, Google Sheets form integration, or hosted form service before accepting real registrations.
- Add organizer contact details, entry fee, rules, event date and venue before launch.

## Deploy with GitHub Pages (when you are ready)
1. Create a new public GitHub repository, for example `tufy-volleyball-tournament`.
2. Extract this ZIP and upload all files and the `assets` folder to the repository root.
3. Commit the files to the `main` branch.
4. In GitHub, open **Settings → Pages**.
5. Under **Build and deployment**, choose **Deploy from a branch**, select `main` and `/ (root)`, then Save.
6. Wait for GitHub Pages to publish. The site URL will appear in the Pages section.

You can also import the repository into Vercel and deploy it as a static site (no build command; output directory is `.`).

## Files
- `index.html` — page sections and form
- `style.css` — responsive visual design
- `script.js` — teams, fixtures, score table and browser-preview registration logic
- `assets/` — four photos provided in the chat
