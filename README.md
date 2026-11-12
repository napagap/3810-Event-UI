### **What this PR does**
Implements frontend web pages for Event CRUD — providing an authenticated user interface for event management

### Files changed
* `routes/events.js` (new) — Express router handling frontend web requests. It contains the logic for displaying the event list and creation forms, and passes database records to the EJS templates.
* `views/events/index.ejs` (new) — EJS template for the event list page, responsible for rendering event data fetched from MongoDB.
* `views/events/new.ejs` (new) — EJS template for the "Create Event" form, including basic HTML form validation.
* `server.js` (modified) — Uncommented app.use('/events', requireLogin, require('./routes/events')); to mount the web routes and enforce the requireLogin session protection.

### Endpoint (base: `http://localhost:3000/events`)
| Method | URI | Purpose |
| :--- | :--- | :--- |
| GET | `events` | List all events (protected dashboard) |
