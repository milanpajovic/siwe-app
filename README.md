# Sign-In with Ethereum (SIWE) Web Application

This web application is designed to provide Sign-In with Ethereum (SIWE) functionality. It allows users to create a profile, modify their profile, and persist their data in a database. The application is built using Express (TypeScript) for the server and React for the frontend. Additionally, it utilizes Nx as a build system, which enables monorepo architecture to manage both server and frontend code efficiently.

## Table of Contents

- [Technologies Used](#technologies-used)
- [Advantages of Nx and Monorepo](#advantages-of-nx-and-monorepo)
- [Why Pnpm?](#why-pnpm)
- [Docker Services](#docker-services)
- [Getting Started](#getting-started)
- [NX Commands](#nx-commands)
- [Swagger Documentation](#swagger-documentation)
- [Jaeger](#jaeger)
- [Usage](#usage)
- [GitHub Actions](#github-actions)
- [Deployment](#deployment)
- [License](#license)

## Technologies Used

- **Server**: Express (TypeScript)
- **Frontend**: React
- **Build System**: Nx
- **Package Manager**: Pnpm
- **Deployment**: Docker

## Advantages of Nx and Monorepo

Nx and the monorepo architecture offer several advantages for managing project:

- **Code Reusability**: We can share code and libraries between the server and frontend, reducing duplication and improving maintainability.
- **Simplified Tooling**: Nx provides a unified development experience with consistent tooling across all projects in our monorepo.
- **Efficient Testing**: Nx makes it easy to run tests across multiple projects and ensures that changes do not break other parts of the application.

## Why Pnpm?

This project uses the Pnpm package manager for several reasons:

- **Faster Installations**: Pnpm uses a unique approach to package management, which results in faster installations and smaller storage requirements.
- **Efficient Disk Usage**: Pnpm employs hard links and symlinks to optimize disk space usage.
- **Compatibility**: Pnpm is fully compatible with npm and Yarn, allowing us to work with existing npm and Yarn projects seamlessly.

## Docker Services

These services work together to create a development environment for our web application. The `api` service hosts our application's backend, the `db` service provides the database, the `cache` service handles caching, and the `jaeger` service facilitates tracing and monitoring.

### api

- The API service hosts web application's backend.
- It can be used for development purpose to match environment on server
- Container of this server is built and published to AWS ECR for production deployment

### db

- The DB service runs a PostgreSQL database container.
- It is used for development, managed RDS is used in production

### cache

- The Cache service runs a Redis caching server.
- It should be used as a layer between server and database
- Redis service should be used for custom rate limiter service on application level

### jaeger

- The Jaeger service runs the Jaeger tracing system's all-in-one container.
- Enables OpenTelemetry Protocol (OTLP) and specifies log levels.
- Used for both development and for production

## Getting Started

To get started with the SIWE web application, follow these steps:

1. Clone the repository: `git clone https://github.com/milanpajovic/siwe-app`
2. Navigate to the project directory: `cd <project-directory>`
3. Create `.env` files in both the `frontend` and `server` directories based on the provided `.env.example` files.
4. Update the environment variables in these `.env` files to match your specific configuration.
5. Install pnpm if not installed `npm install -g pnpm`
6. Install dependencies using Pnpm: `pnpm install`
7. If you want your local server outside docker comment api service in docker-compose file
8. Run the following command to start all defined services (server, database, cache, and Jaeger) simultaneously: `docker-compose up` (docker build will be automatically executed)
9. Start the application using Nx commands: `nx serve server` (for server) and `nx serve frontend` (for frontend).
10. Access the application in your browser at the provided URL.

## NX Commands

1. `serve` Build the application, start up a development web server, and rebuild/reload on changes
2. `build` Build and bundle the application for distribution
3. `dep-graph` Generate a dependency graph for the project
4. `lint` Run the lint checker for the workspace
5. `e2e` Run all the E2E tests for the workspace
6. `format:write` Run the code formatter across all the projects
7. `format:check` Check the formatted code across all the projects
8. `test` Run the unit tests for all projects

The easiest way to run all checks is to use command such us `nx affected -t lint,test`

## Swagger Documentation

The SIWE web application includes Swagger documentation, which provides an interactive API explorer. With Swagger, you can easily interact with the backend server's API endpoints without using the frontend interface. This is particularly useful for testing and understanding the API's capabilities.

You can access it at `/api-docs`

Swagger is automatically generated using` @swagger` decorators in routes files

## Jaeger

### What is Jaeger?

Jaeger is a distributed tracing system that helps you monitor and trace requests as they flow through your application. It provides insights into the performance and latency of your services, allowing you to identify bottlenecks, troubleshoot issues, and optimize your application's performance.

### Why Use Jaeger?

Jaeger is a valuable tool for monitoring and debugging complex distributed systems. It offers the following benefits:

- **End-to-End Tracing**: Jaeger traces requests from end to end, making it easy to identify which services are involved in handling a specific request.

- **Latency Analysis**: Jaeger measures the time it takes for requests to travel between services, helping you pinpoint latency issues and optimize response times.

- **Error Detection**: Jaeger traces can highlight errors and exceptions that occur during request processing, enabling you to quickly identify and resolve issues.

- **Performance Optimization**: By visualizing the flow of requests through your services, Jaeger helps you optimize your application's architecture and improve overall performance.

### Accessing Jaeger's UI

To access Jaeger's user interface and start monitoring your application, follow these steps:

1. Ensure that the Docker Compose services are running
2. Once the services are running, you can access Jaeger's UI by opening your web browser and navigating to: `http://localhost:16686/`

## Usage

### Authentication Routes

#### Get a Random Nonce

- **Summary:** Retrieves a random nonce for authentication purposes.
- **Request Type:** GET
- **Endpoint:** `/api/auth/nonce`
- **Response:** Returns a JSON object with a random nonce.
- **Usage:** Useful for initiating authentication processes.

#### Get Session Information

- **Summary:** Retrieves session information if the user is authenticated. Returns a simple object if not authenticated.
- **Request Type:** GET
- **Endpoint:** `/api/auth/session`
- **Request Parameters:** `sessionId` (optional) - Session ID for authentication.
- **Response:** Returns session information if authenticated, or a simple object indicating an unauthenticated state.
- **Usage:** Check user session status and retrieve session data when authenticated.

#### Verify a Signed Message

- **Summary:** Verifies a message using the provided signature. Returns a success status if verification is successful.
- **Request Type:** POST
- **Endpoint:** `/api/auth/verify`
- **Request Body:** JSON object with `message` and `signature` properties.
- **Response:** Returns a JSON object with a boolean `ok` property indicating the result of the verification.
- **Usage:** Verify the authenticity of a signed message.

#### Sign Out the User

- **Summary:** Signs out the user by destroying the session.
- **Request Type:** GET
- **Endpoint:** `/api/auth/sign_out`
- **Request Parameters:** `sessionId` (required) - Session ID to identify the user session to be destroyed.
- **Response:** Returns a JSON object with a boolean `ok` property indicating a successful sign-out.
- **Usage:** Allows users to sign out and terminate their session.

### User Profile Routes

#### Retrieve User Profile Information

- **Summary:** Returns user profile data, including name, location, contact phone, and email.
- **Request Type:** GET
- **Endpoint:** `/api/profile`
- **Request Parameters:** `sessionId` (required) - Session ID for authentication.
- **Response:** Returns a user profile object in JSON format.
- **Usage:** Retrieve and display user profile information.

#### Update User Profile

- **Summary:** Updates the user's profile information.
- **Request Type:** PUT
- **Endpoint:** `/api/profile`
- **Request Parameters:** `sessionId` (required) - Session ID for authentication.
- **Request Body:** JSON object with properties to update the user's profile.
- **Response:** Returns a success message upon updating the profile.
- **Usage:** Allows users to modify and save their profile information.

These routes provide various authentication and user profile functionalities for your SIWE web application. Users can use these routes to authenticate, check their session status, sign out, and manage their profile data.

## GitHub Actions

### Pull Request Validation (CI)

- **Trigger:** This Action is triggered automatically when a pull request is opened or updated.

- **Validation Steps:**
  - Checks code formatting using `npx nx format:check`.
  - Runs linting, testing, and building tasks in parallel using `npx nx affected -t lint,test,build --parallel=3`.

### Amazon ECS Deployment

- **Trigger:** This Action is triggered when code is pushed to the `main` branch
- **Deployment Steps:**
- Checks out the code using `actions/checkout@v4`.
- Configures AWS credentials using `aws-actions/configure-aws-credentials`.
- Logs in to Amazon ECR using `aws-actions/amazon-ecr-login`.
- Builds, tags, and pushes the Docker image to Amazon ECR.
- Downloads the task definition and fills in the new image ID.
- Deploys the updated task definition to Amazon ECS and waits for service stability.

## Deployment

- Frontend: The frontend of the application is deployed and accessible at [https://siwe-app.vercel.app/](https://siwe-app.vercel.app/).

- Backend: The backend of the application is deployed and accessible at [https://www.milanpajovic.com/](https://www.milanpajovic.com/).

### Frontend Deployment with Vercel

The frontend of the SIWE web application is deployed using Vercel, a platform for hosting frontend applications. Vercel simplifies the deployment process and provides a reliable hosting environment. Here's how the frontend deployment works:

- **Continuous Deployment:** The frontend code is automatically deployed to Vercel whenever changes are pushed to the main branch of the repository.

- **Vercel Configuration:** The Vercel deployment configuration is set up to build and host the React-based frontend of the application. Vercel provides a simple and seamless deployment experience for frontend projects.

### Backend Deployment with GitHub Actions

The backend of the SIWE web application is deployed using GitHub Actions, specifically the "Deploy to Amazon ECS" GitHub Action described earlier.

## License

This project is licensed under the [MIT License](LICENSE).
