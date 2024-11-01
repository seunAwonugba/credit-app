## Description

The **Credit App** is an MVP backend solution that provides essential wallet functionality for a mobile lending app. This service allows borrowers to manage their loan disbursements and repayments with ease and security.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup and Installation](#setup-and-installation)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Error Handling](#error-handling)
- [Testing](#testing)
- [Future Improvements](#future-improvements)

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
- **TypeORM** ORM for database operations
- **JWT** for authentication and authorization

## Setup and Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   ```

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
