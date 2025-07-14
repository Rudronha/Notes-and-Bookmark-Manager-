# Notes & Bookmarks Manager

A full‑stack demo project that lets users **create, search, edit, and delete** notes and bookmarks.
Built with **React + Vite + Tailwind CSS** on the front‑end and **Node.js + Express + MongoDB (Mongoose)** on the back‑end.

---

## 🗂 Repository Structure

```txt
/.
├─ backend/          # Express REST API
└─ notes-bookmarks-ui/  # Vite + React + Tailwind app
```

---

## 🚀 Quick‑start

### 1. Clone & install everything

```bash
git clone <repo>
cd backend          && npm i            # API deps
cd ../notes-bookmarks-ui && npm i       # UI deps
```

### 2. Environment variables

`backend/.env`

```env
PORT=4000
MONGODB_URI=mongodb://localhost:27017/notes_db   # or Atlas URI
```

`notes-bookmarks-ui/.env`

```env
VITE_API_URL=http://localhost:4000/api
```

### 3. Run dev servers

```bash
# terminal 1
cd backend
npm run dev            # nodemon + MongoDB required

# terminal 2
cd notes-bookmarks-ui
npm run dev            # Vite front‑end at http://localhost:5173
```

Open `http://localhost:5173` → UI auto‑connects to the API.

---

## 📡 API Overview

| Endpoint                | Description                                | Body / Query                            |
| ----------------------- | ------------------------------------------ | --------------------------------------- |
| `POST /api/notes`       | create note                                | `{ title, content, tags[] }`            |
| `GET /api/notes`        | list / search notes                        | `?q=text&tags=tag1,tag2`                |
| `GET /api/notes/:id`    | fetch single                               | —                                       |
| `PUT /api/notes/:id`    | update                                     | same fields as POST                     |
| `DELETE /api/notes/:id` | delete                                     | —                                       |
| `POST /api/bookmarks`   | create bookmark (auto‑title if `title=""`) | `{ url, title?, description?, tags[] }` |
| `GET /api/bookmarks`    | list / search bookmarks                    | `?q=text&tags=tag1,tag2`                |
| ...                     | same CRUD routes as notes                  | —                                       |

* Validation via **express‑validator**
* Consistent **HTTP status codes**
* Central **errorHandler** middleware

### Sample cURL

```bash
# Create note
curl -X POST http://localhost:4000/api/notes \
  -H "Content-Type: application/json" \
  -d '{"title":"Project Kickoff","content":"Zoom at 10 AM","tags":["work"]}'

# Search notes
curl "http://localhost:4000/api/notes?q=kickoff"

# Delete bookmark
curl -X DELETE http://localhost:4000/api/bookmarks/<id>
```

> **Postman**: import `postman_collection.json` in `backend/docs/` *(included)*.

---

## 🖥 Front‑end (React)

* **Routing**: `react-router-dom`

  * `/notes` – list/search notes
  * `/bookmarks` – list/search bookmarks
* **State**: custom `useItems` hook

  * Fetches from API with **Axios**
  * Optimistic updates for create / edit / delete
* **UI**: Tailwind + shadcn‑style primitives

  * Responsive split‑pane layout (sidebar collapses on mobile)
  * Slide‑over drawer for create / edit
  * Confirmation dialog for deletes

---

## 🧑‍🔬 Skills Demonstrated

| Area                         | Highlights                                     |
| ---------------------------- | ---------------------------------------------- |
| **REST API design**          | CRUD routes, query search, proper HTTP codes   |
| **Data validation**          | URL & required fields via express‑validator    |
| **React routing & state**    | Nested routes, custom hooks, optimistic UI     |
| **Tailwind CSS**             | Mobile‑first utilities, responsive grid/cards  |
| **Clean code & structure**   | Controller‑service‑route layers, modular hooks |
| **Real‑world data modeling** | Mongoose schemas for notes & bookmarks         |

---

## 🏁 Next Steps / Extensions

* Auth (JWT / sessions)
* Tag auto‑suggest & filter chips
* Infinite scroll or pagination
* Deployment (Render / Vercel + MongoDB Atlas)

Enjoy hacking on it! Feel free to open issues or suggestions.
