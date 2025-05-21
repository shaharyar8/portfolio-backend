# Portfolio Backend API

This project serves as the backend API for a personal portfolio website. It manages data related to education, work experience, projects, and skills.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
  - [Education](#education)
  - [Experience](#experience)
  - [Projects](#projects)
  - [Skills](#skills)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- CRUD (Create, Read, Update, Delete) operations for:
  - Education entries
  - Work Experience entries
  - Personal Projects
  - Skills
- RESTful API design.

## Tech Stack

- **Node.js:** JavaScript runtime environment.
- **Express.js:** Web application framework for Node.js.
- **MongoDB:** NoSQL database.
- **Mongoose:** ODM (Object Data Modeling)

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (LTS version recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js) or [Yarn](https://yarnpkg.com/)
- [MongoDB](https://www.mongodb.com/try/download/community) (ensure it's running)
- [Git](https://git-scm.com/)

## Getting Started

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/portfolio-backend.git
    cd portfolio-backend
    ```

2.  **Install dependencies:**
    Using npm:
    ```bash
    npm install
    ```
    Or using Yarn:
    ```bash
    yarn install
    ```

### Environment Variables

Create a `.env` file in the root of the project and add the following environment variables. 