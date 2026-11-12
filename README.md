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
| GET | `/events` | List all events (protected dashboard) |
| GET | `/events/new` | Show the create event form |
| POST | `events` | Process form submission to create a new event |
| GET | `/events/:eventCode/edit` | Show the edit event form |
| POST | `/events/:eventCode/update` | Process form submission to update an event |
| POST | `/events/:eventCode/delete` | Process request to delete an event |

### How to test
1. Run `npm install`.
2. Ensure your `.env` file contains a valid `MONGODB_URI` and `SESSION_SECRET`, then run `npm start`.
3. Open a browser and go to `http://localhost:3000/auth/register` to create a test account (or login if you already have one).
4. Once logged in, navigate to `http://localhost:3000/events` to view the event list.
5. Click "Add Event", fill out the form, and submit to verify it successfully writes to the database and redirects back to the updated list.

### Verification
* Tested unauthenticated access: Navigating directly to `/events` without a session successfully redirects to the login page (verifying `requireLogin` middleware).
* Tested creation flow: Events created via the UI are correctly saved to MongoDB and instantly reflect on the `index.ejs` list view.
* Confirmed that the existing `models/Event.js` schema is successfully reused by these frontend routes.

### Review checklist
* [ ] Ensure `requireLogin` properly protects all `/events` routes
* [ ] Check EJS templates render without syntax errors and data variables pass correctly
* [ ] Merge to `main` after review
