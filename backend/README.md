# Media Items API

A RESTful API for managing media items and workspaces with face tracking capabilities.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Setup](#setup)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Examples](#examples)
- [Docker Support](#docker-support)

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- npm (v6 or higher)
- PostgreSQL
- Docker (optional, for containerized deployment)

## Setup

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

Create a .env file based on .env.example and configure your environment variables

Set up the database:
```bash
npm run migrate:dev
```
Usage
Development
To start the development server:
```bash
npm run start
```

Docker Support
To run the application with Docker (includes database seeding):

```bash
docker compose up --build
```

## Setup Steps

This will:

- Build the Docker image  
- Start the PostgreSQL container  
- Run database migrations  
- Seed the database  
- Start the API server  

---

## API Endpoints

### Workspaces

- **GET** `/api/media-items/workspaces?workspaceId=`  
  Retrieves details for a specific workspace.


### Media Items

- **GET** `/api/media-items?workspace=`  
  Retrieves all media items for a specific workspace.

- **POST** `/api/media-items`  
  Creates a new media item for a workspace.

---

## Examples

### Create a Media Item Request:

```http
POST /api/media-items
```

```json
{
  "workspaceId": 2,
  "type": "static",
  "name": "Media Item Example",
  "format": "jpeg",
  "location": "Kampala",
  "number_of_faces": 2,
  "closest_landmark": "Makerere University",
  "availability": "available",
  "faces": [
    {
      "description": "Front face with heavy traffic exposure",
      "images": ["face1.jpg"],
      "rent": 1200,
      "availability": "available"
    },
    {
      "description": "Side face viewable from market entrance",
      "images": ["face2.jpg"],
      "rent": 800,
      "availability": "unavailable"
    }
  ]
}
```

Successful Response:
```json
{
  "message": "Media item created",
  "mediaItem": {
    "id": 3
  }
}
```

Retrieve Workspace Details
```bash
GET /api/media-items/workspaces?workspaceId=<workspaceId>
```

Retrieve Media Items for Workspace
```bash
GET /api/media-items?workspace=<workspaceId>
```
