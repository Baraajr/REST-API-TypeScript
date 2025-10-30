<<<<<<< HEAD
te session is tied to logging in and out
create session is logging in
d delete session is logging out

we use zod for validation

### config

-the package config is used to read variables from config/default.ts file

### zod (validation)

- zod middleware is used to validate a schema (anyZodObject)
- and validate the request object against this schema (typicaly the request body)

### tests

- we added tests usin jest and supertest

### prometheus for metrics (app performance)

- we installed prom-client and response-time for metrics
- we added prometheus server in file utils/metrics.ts

### Graphina

# is a data visualization plugin for WordPress and Elementor that allows users to create interactive and customizable charts and graphs. It supports multiple data sources, including REST APIs, databases, CSV files, and Google Sheets, making it useful for real-time analytics and dashboards.

# REST API with TypeScript, Express & MongoDB

A boilerplate RESTful API built using **Node.js**, **Express**, **TypeScript**, and **MongoDB**, featuring clean code structure, validation, error handling, and testing.

## 🚀 Features

- ⚙️ Express.js server written in TypeScript
- 🔐 JWT-based authentication
- ✅ Input validation with `express-validator`
- 📦 MongoDB with Mongoose
- 📊 **Prometheus** metrics endpoint
- 📚 **Swagger UI** for API docs
- 🧪 Jest & Supertest for testing
- 🐞 Centralized error handling
- 🌐 RESTful routing pattern

  ***

### config

-the package config is used to read variables from config/default.ts file

---

## 🧑‍💻 Getting Started

```bash
# clone the repo
git clone https://github.com/Baraajr/REST-API-TypeScript.git
cd REST-API-TypeScript

# run in dev
npm run dev
```
