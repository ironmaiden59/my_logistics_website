# My Logistics Website

Welcome to the My Logistics Website project! This application is a logistics platform built with a React frontend and an Express backend, using PostgreSQL as the database. This README will guide you through the steps needed to set up and run the project on your local machine.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [Running the Application](#running-the-application)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js** (version 14.x or higher) and **npm** (Node Package Manager) are installed.
- **PostgreSQL** is installed and running on your local machine.
- A PostgreSQL database is created for the application.
- **Git** is installed for cloning the repository.

## Installation

1. **Clone the Repository**

   Clone this repository to your local machine using Git:

   ```bash
   git clone https://github.com/your-username/my_logistics_website.git
   cd my_logistics_website

# Install Dependencies 
cd backend
npm install

cd my_logistics_website
npm install

# Backend Setup
## Configure the Database
CREATE DATABASE logistics_app;

## Configure Environment Variables
Create a .env file in the backend directory and configure your environment variables:
DB_USER=postgres
DB_PASSWORD=your_database_password
DB_NAME=logistics_app
DB_HOST=localhost
DB_PORT=5432
JWT_SECRET=your_jwt_secret_key

### Make sure to replace your_database_password and your_jwt_secret_key with your actual PostgreSQL password and a secure JWT secret key.

# Run Database Migrations
npx sequelize-cli db:migrate
