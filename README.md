# 🧑‍💻 Startup Discovery Platform — Rails + React + TS + PostgreSQL Search

A full-stack web app built to explore and filter startups efficiently using Ruby on Rails (API-only), React (frontend), and PostgreSQL full-text search (pg_search).

# 🧭 What I Learned

- **Composable queries** in Rails can be more elegant than GraphQL if you design scopes well.
- **Debouncing + cancellation** in React gives your UI a “pro” feel with minimal code.
- **TypeScript interfaces (Startup, Location, etc.)** helped me catch dozens of small bugs early — like forgetting optional chaining or mixing up fields.
- **PostgreSQL is underrated:** you can get powerful full-text search without leaving your main database.

Clean architecture pays off — both backend and frontend layers are testable, replaceable, and easy to reason about.

# Overview

This project began as an exploration of how to build a search and filtering platform inspired by real-world startup-scouting tools.
The goal was to design a system where users can:

- Filter startups dynamically by multiple fields (status, category, location, etc.),
- Search by name or keyword efficiently,
- And do all of this through a clean, reactive frontend built with React.

The idea wasn’t just to “get something working” — it was to understand how professional teams structure _data models_, _APIs_, and _client-side filtering systems_ that remain maintainable at scale.

⚙️ Stack & Architecture

- **Backend:** 	Ruby on Rails 7 (API mode) Domain logic, REST API, JSON serialization
- **Database:** PostgreSQL	Relational data, full-text search with pg_search
- **Frontend:**	React + TypeScript Modern SPA with _hooks_, _modular components_, and _search filters_
- **Styling:**	Custom CSS (responsive, app-like design) Layout, cards, and filter bar
- **State management:**	Local React state + custom hooks

# 🧰 The Data Model

<img width="1404" height="777" alt="image" src="https://github.com/user-attachments/assets/db763f2b-7421-4750-8168-3874ba0aafb8" />



Each Startup has:

- One Location (city, region, country),
- One Application (state, category),
- One Contact (state, email status),
- One Review (rating from the user).

# Why I Chose pg_search Over Elasticsearch

At the start, I considered two main paths for implementing full-text search:

**_Option 1: Elasticsearch / Searchkick_**

- ✅ Excellent scalability for large datasets.
- ✅ Advanced scoring and fuzzy matching.
- ❌ Adds another external dependency.
- ❌ Heavier setup (cluster, sync jobs, reindexing).

_**Option 2: PostgreSQL pg_trgm + pg_search**_

- ✅ Zero external dependencies — works within Rails + PostgreSQL.
- ✅ Simple to implement and performant for <100k records.
- ✅ Supports partial matches (ILIKE) and ranking.
- ❌ Less powerful ranking and language tokenization than Elasticsearch.

Since this project is focused on learning, iteration, and clean architecture, I chose pg_search — it gives 90% of what I need (fast and flexible queries) without operational overhead.

# 🎨 UI & Design Process

My first version was purely functional with:

- A glassy filter bar,
- Smooth hover transitions for startup cards,
- Clean color palettes for badges (info, muted),

I learned that design consistency (spacing and hover feedback) matters as much as logic — it communicates quality.

However, along the way I decided to challenge myself by doing an entire SaaS dashboard like Monday's design, therefore the design will: 

- Have a sidebar on the left to switch pages
- The use of a table instead of cards to display startups information
- The feel of a SaaS dashboard

# Coding Diary

## 28/10/2025:
At one point, the table filters seemed to have a mind of their own: instead of showing hundreds of startups, only a few appeared. I double-checked everything: pagination, count, even `startups.count` in Rails always said 30 per page, yet the data on screen was far fewer.

Curious (and also mildly panicking), I peeked into the SQL logs and found the culprit: the query used plain joins instead of left_outer_joins. That tiny difference meant ActiveRecord was excluding startups without related records, silently cutting the dataset.

One switch later from joins → left_outer_joins — and suddenly the results came back to life. Filters working perfectly, and a valuable reminder: SQL joins are sneaky little things.

## Roadmap (ordered by priority):

- Finalize the UI design for the dashboard ✅
- Create and manage startups (with associated location, application, and contact data)
- Testing	RSpec (Rails)	Model specs for search and scopes (planned extension)
