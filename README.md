# House Numbers
___

Full-stack application with Express/Node.js backend API and React (Remix => React Router v7)
frontend, containerized with Docker.

## Prerequisites

- [Node.js](https://nodejs.org/) (v20+)
- [yarn](https://yarnpkg.com/) (comes with Node.js)
- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Project Structure

- `/api` - Backend (Express, TypeScript, MongoDB)
- `/front` - Frontend (React)
- `docker-compose.yaml` - Docker configuration

## Quick Start

## OpenAI API Key Setup

This application uses OpenAI's API for generating snippet summaries. To use this feature:

1. Create an account on the [OpenAI Platform](https://platform.openai.com/)
2. Navigate to the [API Keys section](https://platform.openai.com/api-keys)
3. Create a new API key
4. Add the API key to your environment variables as `OPENAI_API_KEY` in the `/api/.env` file

### Using Docker (Recommended)

1. Clone the repository
2. Clone a `.env.example` to `.env` file in the `/api` directory:

    2.1. Backend
   ```
    NODE_ENV=development
    PORT=3000
    MONGODB_URI=mongodb://mongodb:27017/dev
    JWT_SECRET=your_jwt_secret_here
    OPENAI_API_KEY=your_openai_api_key_here
    ```
    2.1. Frontend
    ```
    VITE_API_URL=http://api:3000/v1
    ```

3. Run:

```shell
  docker compose up --build
```

### Services

- MongoDB: port 27017
- API: http://localhost:3000/v1
- Frontend: http://localhost:3030

Common commands:

``` shell

docker compose up --build     # Rebuild and start
docker compose down           # Stop containers
docker compose down -v        # Stop and remove volumes
```

### Running Locally

#### API

``` shell

cd api
yarn install
yarn run dev
```

#### Frontend

```shell

cd front
yarn install
yarn run dev
```

## Testing

```shell

cd api
yarn run test             # All tests
yarn run test:unit        # Unit tests (watch mode)
yarn run test:integration # Integration tests (watch mode)
```
