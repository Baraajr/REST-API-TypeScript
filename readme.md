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

is a data visualization plugin for WordPress and Elementor that allows users to create interactive and customizable charts and graphs. It supports multiple data sources, including REST APIs, databases, CSV files, and Google Sheets, making it useful for real-time analytics and dashboards.
