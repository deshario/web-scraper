### Workflow

#### Keyword Upload

Users upload a CSV file containing keywords using the app's interface. This CSV file serves as the input data for further processing.

#### Job Splitting

After the CSV file is being uploaded, the backend will split the keywords into multiple chunks to create a multiple jobs to be processed separately. This step is important to make sure things get done quickly and efficiently

#### Job Processing

Uses **Bull(Redis-based queue)** to handle background job processing. Each job, representing a keyword chunk, is pushed into the background job queue for execution. This ensures that keyword processing does not block the main application thread, allowing for responsive user interactions.

#### WebSocket

Once the background job for a particular keyword chunk is complete, the results are being emmited over WebSocket to the user. This real-time communication method lets users get instant updates about the progress and outcomes of their uploaded keyword.

---

### Requirements

Before you run the application, please make sure you have the following tools and services installed and properly configured on your system:

1. **Redis**
2. **PostgreSQL**

### Environment variables

Before you run the application, it's important to configure your environment variables. To do this, simply create a `.env` file in the root directory of the `apps/server`, using the provided `.env.example` file as a reference. Below are the environment variables that require configuration:

`DB_HOST`: Postgres host
`DB_NAME`: Postgres database name
`DB_USER`: Postgres username
`DB_PASSWORD`: Postgres password
`REDIS_URL`: Redis connection string

Also you may want to take a look at `apps/server/src/config/environment.ts`, which can provide hints about certain variables that can be skipped in your `.env` file because they already have fallback values defined in the application's configuration. This can be helpful in determining which variables are **required** and which ones can be **omitted**

---

### Run project

1. Install dependencies
   `yarn`

2. Run migration
   `yarn migrate`

3. Start redis server
   `redis-server`

4. Run client/server in parallel
   `yarn dev`

5. Enjoy
   Client: http://localhost:3000
   Server: http://localhost:8080

# API

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/1566031-06f7635e-224f-4ca6-8e20-0b042f176f55?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D1566031-06f7635e-224f-4ca6-8e20-0b042f176f55%26entityType%3Dcollection%26workspaceId%3D4c9a5645-9212-4322-8cc2-1efedeb941ff)

| Method | Endpoint              | Description            |
| ------ | --------------------- | ---------------------- |
| `POST` | `/auth/local`         | Local authentication   |
| `POST` | `/auth/register`      | Local Signup           |
| `POST` | `/auth/token/refresh` | Refresh access token   |
| `GET`  | `/api/keywords`       | Get keywords           |
| `POST` | `/api/keywords`       | Upload keywords        |
| `GET`  | `/api/keywords/:key`  | Preview single keyword |
