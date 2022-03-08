<p align="center">
  <a href="#">
    <img alt="mern-app-generator" src="https://www.mindinventory.com/blog/wp-content/uploads/2021/06/mern-stack.png" />
  </a>
</p>
<h3 align="center">Create, build and deploy MERN stack application.</h3>

## Introduction
A Fullstack MERN Support Ticket System with Redux Toolkit.
![MERN Stack](https://miro.medium.com/max/1400/1*u8xh3we2xdp9piDGFpaHSg.png)
![MERN Architerure](https://www.bocasay.com/wp-content/uploads/2020/03/MERN-stack-1.png)

## Getting Started


### Built With

This section should list any major frameworks/libraries used to bootstrap your project.

* [MongoDB Atlas](https://www.mongodb.com/atlas/database)
  **Database**. Deploy a multi-cloud database.
  The most advanced cloud database service on the market, with unmatched data distribution and mobility across AWS, Azure, and Google Cloud, built-in automation for resource and workload optimization, and so much more.
* [MongoDB Compass](https://www.mongodb.com/products/compass)
  **Compass**. The GUI for MongoDB.
  Compass is an interactive tool for querying, optimizing, and analyzing your MongoDB data. Get key insights, drag and drop to build pipelines, and more.
* [Express.js](https://expressjs.com/)
  Express.js, or simply Express, is a back end web application framework for Node.js, released as free and open-source software under the MIT License. It is designed for building web applications and APIs. It has been called the de facto standard server framework for Node.js.
* [React.js](https://reactjs.org/)
  A JavaScript library for building user interfaces.
* [Node.js](https://nodejs.org/en/)
  Node.js is a free, open-sourced, cross-platform JavaScript run-time environment that lets developers write command line tools and server-side scripts outside of a browser.
* [Redux Toolkit](https://redux-toolkit.js.org/)
  The official, opinionated, batteries-included toolset for efficient Redux development.
* [Postman](https://www.postman.com/)
  Postman is an application used for API testing.


### Deployed On
* [HEROKU](https://heroku.com/)
  
  [Support Ticket App](https://support-desk-mern-arifmd.herokuapp.com/)

### Installation

### .env

Lets create a `.env` file in the root of the project:

```bash
touch .env
```

Then put the following code in that `.env` except you should add your details.

```bash
NODE_ENV = development
PORT = 5000
MONGODB_URL=<your_mongodb_connection_string>
JWT_SECRET=<your_secret_key>
```

Provided in the root of the project, a `.sample.env` for guidance.


### Folder Structure

```
├── README.md
├── backend
│   ├── config
│   │   └── db.js
│   ├── controllers
│   │   ├── noteController.js
│   │   ├── ticketController.js
│   │   └── userController.js
│   ├── middleware
│   │   ├── authMiddleware.js
│   │   └── errorMiddleware.js
│   ├── models
│   │   ├── noteModel.js
│   │   ├── ticketModel.js
│   │   └── userModel.js
│   ├── routes
│   │   ├── noteRoutes.js
│   │   ├── ticketRoutes.js
│   │   └── userRoutes.js
│   └── server.js
├── frontend
│   ├── README.md
│   ├── package-lock.json
│   ├── package.json
│   ├── public
│   │   ├── favicon.ico
│   │   ├── index.html
│   │   ├── logo192.png
│   │   ├── logo512.png
│   │   ├── manifest.json
│   │   └── robots.txt
│   └── src
│       ├── App.js
│       ├── app
│       │   └── store.js
│       ├── components
│       │   ├── BackButton.jsx
│       │   ├── Header.jsx
│       │   ├── NoteItem.jsx
│       │   ├── PrivateRoute.jsx
│       │   ├── Spinner.jsx
│       │   └── TicketItem.jsx
│       ├── features
│       │   ├── auth
│       │   │   ├── authService.js
│       │   │   └── authSlice.js
│       │   ├── notes
│       │   │   ├── noteService.js
│       │   │   └── noteSlice.js
│       │   └── tickets
│       │       ├── ticketService.js
│       │       └── ticketSlice.js
│       ├── hooks
│       │   └── useAuthStatus.js
│       ├── index.css
│       ├── index.js
│       ├── pages
│       │   ├── Home.jsx
│       │   ├── Login.jsx
│       │   ├── NewTicket.jsx
│       │   ├── Register.jsx
│       │   ├── Ticket.jsx
│       │   └── Tickets.jsx
│       └── serviceWorker.js
├── node_modules
├── package-lock.json
└── package.json
```

### Run backend & frontend servers concurrently

In order to run the backend & frontend servers using [concurrently](https://www.npmjs.com/package/concurrently):

```sh
npm run dev
```

This will automatically open the local development server at [http://localhost:3000](http://localhost:3000).

The page will automatically reload if you make changes to the code.<br>
You will see the build errors and lint warnings in the console.

### Routes

Inside of `/backend/controllers/userController.js` are a collection of routes that involve `CRUD` functions of persistent storage.

- **POST** `/api/users` - Register/create a new user using **registerUser** method in User Controller, requires a **URL-encoded** data in the **Body** containing key value of { name, email, password }, it returns the unique ID along with JWT token
- **POST** `/api/users/login` - Register/create a new user using **loginUser** method in User Controller, requires a **URL-encoded** data in the **Body** containing key value of { email, password }, it returns the registered numeric ID from DB along with unique generated JWT token
- **GET** `/api/users/me` - Get current user

Inside of `/backend/controllers/ticketController.js` are a collection of.

  getTickets, [done]
  getTicket, [done]
  createTicket, [done]
  updateTicket
  deleteTicket,

- **GET** `/api/tickets` - Get all the tickets of logged in user while passing the right `Authorization` `Bearer Token`.
- **POST** `/api/tickets` - Create a new ticket, requires a **URL-encoded** data in the **Body** containing key value of { product, description }
- **GET** `/api/tickets/:id` - Get the particular ticket detail  while passing the right `Authorization` `Bearer Token`.
- 
[Postman](https://learning.postman.com/docs/sending-requests/requests/#sending-body-data)

### Build an application

In order to make a production build of your application:

```sh
npm run build
```

This will produce an optimized build of your application in `build` folder.

### Deploy your application

In order to produce a ready-to-deploy version of your application to deploy to Heroku:

```sh
npm run deploy
```

This will produce a ready-to-deploy version of your application in `deploy` folder. 
Now you can deploy your application by running few handful commands:

```sh
cd deploy
heroku login
git init
git add *
git commit -m "deploying my-app"
heroku create my-app
git push heroku master
```
And within a few seconds, your application will be live at [https://support-desk-mern-arifmd.herokuapp.com/](https://support-desk-mern-arifmd.herokuapp.com/).


## Author(s)

- **Mohammad Arif** - [mdarif](https://github.com/mdarif)
