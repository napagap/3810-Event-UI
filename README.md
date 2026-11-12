### What this PR does

Completes frontend web pages for Event CRUD (edit and show details) and implements the new Registration system (Model, Routes, and UI) for authenticated users.

### Files changed

* `routes/events.js` (modified) — Added logic for displaying event details, editing, updating, and deleting events.
* `views/events/index.ejs` & `views/events/new.ejs` (new) — Templates for event list and creation.
* `views/events/edit.ejs` & `views/events/show.ejs` (new) — Templates for modifying and viewing single event details.
* `models/Registration.js` (new) — Mongoose schema defining the registration records (eventCode, userName, status, timestamp).
* `routes/registrations.js` (new) — Express router handling querying, creating, and cancelling registrations.
* `views/registrations/index.ejs` (new) — User dashboard displaying their personal registration history and cancellation options.
* `server.js` (modified) — Uncommented event routes and mounted `app.use('/registrations', requireLogin, require('./routes/registrations'));`.

### Event Endpoints (base: `http://localhost:3000/events`)

| Method | URI | Purpose |
| :--- | :--- | :--- |
| GET | `/events` | List all events (protected dashboard) |
| GET | `/events/new` | Show the create event form |
| POST | `/events` | Process form submission to create a new event |
| GET | `/events/:eventCode` | Show single event details |
| GET | `/events/:eventCode/edit` | Show the edit event form |
| POST | `/events/:eventCode/update`| Process form submission to update an event |
| POST | `/events/:eventCode/delete`| Process request to delete an event |

### Registration Endpoints (base: `http://localhost:3000/registrations`)

| Method | URI | Purpose |
| :--- | :--- | :--- |
| GET | `/` | List all registrations for the logged-in user |
| POST | `/` | Create a new registration (prevents duplicates) |
| POST | `/:id/cancel` | Cancel an existing registration (updates status) |

### How to test

1. Run `npm install`
2. Ensure your `.env` file contains a valid `MONGODB_URI` and `SESSION_SECRET`, then run `npm start`
3. Open a browser and go to `http://localhost:3000/auth/register` to create a test account (or login if you already have one).
4. Navigate to `http://localhost:3000/events` to test full Event CRUD operations.
5. Navigate to `http://localhost:3000/registrations` to test viewing, adding, and cancelling registrations.

### Verification

* Tested unauthenticated access: Navigating directly to `/events` or `/registrations` without a session successfully redirects to the login page (verifying `requireLogin` middleware).
* Tested creation flow: Events and Registrations created via the UI are correctly saved to MongoDB and instantly reflect on their respective list views.
* Tested edge cases: Registration route successfully blocks duplicate registrations for the same event by the same user.
