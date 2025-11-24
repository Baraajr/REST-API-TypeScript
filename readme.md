# REST‑API‑TypeScript

A boilerplate for building a clean, well-tested RESTful API using **Node.js**, **Express**, **TypeScript**, and **MongoDB** — now with **OpenAPI (Swagger)** documentation, validation, metrics, and more.

---

## 🚀 Features

- Express server in TypeScript  
- JWT-based authentication  
- Input validation (via **zod**)  
- Centralized error handling  
- MongoDB integration (using Mongoose)  
- Prometheus metrics endpoint  
- **OpenAPI / Swagger documentation**  
- Automated tests with **Jest** & **Supertest**  
- Key generation script (`generateKeys.ts`)  

---

## 📁 Architecture & Structure

- **`src/`** — main TypeScript source code  
- **`src/config/`** — configuration  
- **`src/middleware/`** — validation, error handling, metrics, etc.  
- **`src/routes/`** — route definitions  
- **`src/controllers/`** — business logic  
- **`src/models/`** — Mongoose models / schemas  
- **`src/utils/`** — utility modules  
- **`docs/`** — OpenAPI documentation (Swagger JSON/YAML)  
- `generateKeys.ts` — script to generate keys  

---

## 🛠️ Getting Started

### Prerequisites

- Node.js (v14+)  
- npm / Yarn  
- MongoDB (local or remote)  

### Installation

1. Clone the repo  
   ```bash
   git clone https://github.com/Baraajr/REST-API-TypeScript.git  
   cd REST-API-TypeScript  
