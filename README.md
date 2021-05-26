**eureka-educate** is a simple api endpoint for education application built with Node.js, Express Js as a framework of Node.js and MySQL as a database which has [features](#features).

## :memo: Table Of Content

-   [Prerequisites](#prerequisites)
-   [Installation](#installation)
-   [Features](#features)
-   [Examples](#examples)
-   [Built wtih](#features)
-   [Author](#author)
-   [License](#license)

## Prerequisites

-   NPM or Yarn as package manager.
-   Node.js installed on the local machine
-   PostgreSQL intalled on the local machine

## Installation

1. Clone this repository:
   `git clone https://github.com/rifanid98/eureka-educate`
2. Start PostgreSQL
3. Create eureka_educate database
4. Database configuration:
    Create .env file, and insert this env variables to .env file
    > - DB_HOST_LOCAL=localhost
    > - DB_USER_LOCAL=postgres
    > - DB_PASS_LOCAL=postgres
    > - DB_NAME_LOCAL=eureka_educate
    > - DB_PORT_LOCAL=5432

    - Type and run this command `npm run migrate` or `yarn migrate` to start the database migration.

5. Run the Unit Test to ensure that programs can run well
    - Type and run this command `npm run test` or `yarn test` to start the unit test.
6. Start the server:
    - Open root project folder with command line (terminal, linux. cmd, windows. etc.)
    - Type and run this command `npm install` or `yarn install` to install required dependencies.
    - Type and run this command `npm run tsc` or `yarn tsc` to compile typescript code into compiled javascript code.
    - Type and run this command `npm run dev` or `yarn dev` to start the server.
    - Make sure there are no other processes that use port 5000
7. Run app with api testing tools like postman, etc. on http://localhost:5000/eureka-educate/

## Features

-   [x] CRUD
-   [x] CORS allowed
-   [x] Unit Test

## Documentation

<!-- [How to use](https://github.com/rifanid98/eureka-educate/blob/master/docs.md) -->

## Built with

-   [Node.js](http://nodejs.org/) - JavaScript runtime environment
-   [Express.js](https://expressjs.com/) - Node.js framework
-   [MySQL](https://www.mysql.com/) Database

## Author

-   [Adnin Rifandi Sutanto Putra](https://www.linkedin.com/in/adnin-rifandi/)

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/rifanid98/eureka-educate/blob/master/LICENSE) file for details

Thanks to [Daniel Saputra](https://www.linkedin.com/in/danielwetan/) for the readme layout.