# Appliance Register

A small web app for registering home appliances and keeping track of their warranties. I built it for the Server-Side Web Development module at Griffith College Dublin (spring 2026).

A user fills in their name, email and Eircode plus the appliance details (type, brand, model, serial number, purchase date, warranty end date). After that you can look an appliance up by serial number, change its warranty date, or delete it.

## Built with

- Next.js 16 (App Router) and React 19
- MySQL, through `mysql2` with prepared statements
- `xss` to clean user input before it goes anywhere near the database

## How it works

Each page is a client-side form that sends JSON to an API route:

| Page | API route | What it does |
|---|---|---|
| `/part-b-c` | `POST /api/register` | checks the email format, rejects a serial number that is already registered, then inserts the user and the appliance |
| `/search` | `POST /api/search` | joins `Appliance` and `User` to show an appliance with its owner |
| `/update` | `POST /api/update` | changes the warranty end date, but only if the serial number exists |
| `/delete` | `POST /api/delete` | deletes by serial number and returns 404 if nothing was deleted |

All queries use `?` placeholders, so input is never pasted straight into SQL. The routes return proper status codes (200, 400, 404, 500) and the pages show the error message from the server.

`/part-a` is a separate warm-up exercise from the same assignment (a cinema booking form with client-side validation only).

## Running it locally

1. Create the database with `schema.sql`:
   ```
   mysql -u root -p < schema.sql
   ```
2. Copy `.env.example` to `.env.local` and fill in your MySQL details.
3. Install and start:
   ```
   npm install
   npm run dev
   ```
4. Open http://localhost:3000

## What I'd do next

- Let one user own several appliances instead of creating a new user row every time
- Show a list of warranties that run out in the next 30 days
- Use a connection pool instead of opening a new connection on every request
