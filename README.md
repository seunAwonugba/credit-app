## Overview

The **Credit App** is an MVP backend solution that provides essential wallet functionality for a mobile lending app. This service allows borrowers to manage their loan disbursements and repayments with ease and security.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Model](#model)
- [Setup and Installation](#setup-and-installation)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Testing](#testing)
- [Blacklist Check](#blacklist)
- [Future Improvements](#future-improvements)
- [Stay in touch](#connect)

## Features

The Demo Credit Wallet Service provides the following functionalities:

1. **Account Creation**: Users can create an account and start using the wallet service.
2. **Funding**: Users can fund their wallet to enable further transactions.
3. **Transfer**: Users can transfer funds to other users.
4. **Withdrawal**: Users can withdraw funds from their wallet.
5. **Blacklist Check**: Users on the Lendsqr Adjutor Karma blacklist are prevented from onboarding.

## Tech Stack

The project is built with:

- **Node.js** and **Nest.js** for server-side logic
- **MySQL** for database management
- **Knex.js** SQL query builder for database operations
- **JWT** for authentication and authorization

## Model

- [ER Diagram](https://dbdesigner.page.link/y6KyLSTs1TNt42nC9)

## Setup and Installation

1. **Clone the repository:**

```bash
git clone https://github.com/seunAwonugba/credit-app.git

cd demo-credit-wallet-service

```

2. **Install dependencies:**

```bash
npm install
```

3. **Set up the database:**

- Create a MySQL database.
- Run Knex migrations to set up the database schema.

```bash
npm run migrate
```

4. **Environment Variables:** Set up environment variables as listed below.

5. **Start the server:**

```bash
# development
npm run start

# watch mode
npm run dev

# production mode
npm run start:prod
```

## Environment Variables

```bash
DB_PORT=
DB_HOST=
DB_USERNAME=
DB_PASSWORD=
DB_NAME=
SALT=
KARMA_BASE_URL=
ADJUTOR_API_KEY=
ACCESS_TOKEN_KEY=
REFRESH_TOKEN_KEY=
ACCESS_TOKEN_KEY_EX=
REFRESH_TOKEN_KEY_EX=
```

## API Endpoints

- [Swagger Documentation](http://localhost:3000/api)

## Testing

```bash
# unit tests
npm run test

# e2e tests
npm run test:e2e

# test coverage
npm run test:cov
```

## Blacklist Check

The system checks users against the Lendsqr Adjutor Karma blacklist during onboarding to prevent blacklisted users from creating accounts.

## Future Improvements

- **Automated Notification Service:** Notify users of successful transactions.

- **Integration with Lending APIs:**
  Allow seamless integration with lending and repayment functions.

## Stay in touch

- Author - [Awonugba Seun](https://github.com/seunAwonugba)
