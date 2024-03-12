# To-Do List Application

Welcome to the To-Do List Application! This web application allows you to manage your tasks efficiently, with separate routes for today's to-do list and your work list.

## Technologies Used

- HTML
  ![HTML Logo](https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/HTML5_logo_and_wordmark.svg/32px-HTML5_logo_and_wordmark.svg.png)
  Hypertext Markup Language is the standard markup language for documents designed to be displayed in a web browser. It provides the structure for web pages.

- CSS
  ![CSS Logo](https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/CSS3_logo_and_wordmark.svg/32px-CSS3_logo_and_wordmark.svg.png)
  Cascading Style Sheets is used to style the HTML elements, enhancing the visual presentation of the web pages.

- Node.js
  ![Node.js Logo](https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/32px-Node.js_logo.svg.png)
  Node.js is a JavaScript runtime environment that allows running JavaScript code outside of a web browser. It's used to build the backend server for this application.

- EJS (Embedded JavaScript)
  Embedded JavaScript templates allow embedding JavaScript code within HTML, making it easier to generate dynamic content based on data from the server.

- Express
  ![Express Logo](https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Expressjs.png/32px-Expressjs.png)
  Express.js is a web application framework for Node.js, providing features for building web applications and APIs. It simplifies routing, middleware integration, and more.

- MongoDB64px-MongoDB-Logo.svg)
  MongoDB is a NoSQL database management system that uses a document-oriented database model. It's highly scalable and flexible, making it suitable for various types of applications.

-  Nodemon
  Nodemon is a utility that automatically restarts the node application when file changes in the directory are detected. It streamlines the development process by eliminating the need for manual restarts.

## MongoDB Connection

MongoDB is used as the database for this application to store the to-do list items. To connect your application to MongoDB, follow these steps:

1. **Create a MongoDB Atlas Account**: If you haven't already, sign up for a free account on MongoDB Atlas (https://www.mongodb.com/cloud/atlas).

2. **Create a Cluster**: After signing in to your MongoDB Atlas account, create a new cluster. Choose the provider, region, and cluster configuration according to your requirements.

3. **Get Connection String**: Once your cluster is created, click on the "Connect" button and choose "Connect your application". Copy the connection string.

4. **Replace Connection String in Your Code**: In your Node.js application code, replace the connection string in the `mongoose.connect()` method with the one you obtained from MongoDB Atlas.

   ```bash
   npm install mongoose
   ```

   ```javascript
   const mongoose = require("mongoose");

   mongoose.connect("your_connection_string_here", {useNewUrlParser: true});
   ```
5. You can also set up an environment variable, which you can pass as DB URL to connection string Guidance on using environment variables for MongoDB connection:

    - **Create a .env File**: In the root directory of your project, create a new file named `.env`. Add the following line to the `.env` file, replacing `'your_mongodb_url_here'` with the connection string you obtained from MongoDB Atlas:

   ```
   MONGODB_URL=your_mongodb_url_here
   ```

    - **Access Environment Variables in Your Code**: In your Node.js application code, use `process.env.MONGODB_URL` to access the MongoDB URL. Here's an example of how to connect to MongoDB using Mongoose:

    ```javascript
    require('dotenv').config(); // Load variables from .env file

    const mongoose = require('mongoose');
    
    mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser: true})
        .then(() => console.log('MongoDB Connected'))
        .catch(err => console.error('MongoDB Connection Error:', err));
    ```

    This approach allows you to keep sensitive information like database credentials out of your codebase and safely store them in environment variables.

6. **Run Your Application**: After updating the connection string, run your Node.js application. It should now be connected to your MongoDB database hosted on MongoDB Atlas.

## Routes

- `/`: This is the home route, displaying today's to-do list for the current date and day. It lists all the tasks that need to be completed for the current day. Users can add, edit, and delete tasks from this list.

- `/work`: This route displays the work list. It includes tasks specifically related to work or professional responsibilities. Users can manage their work-related tasks separately from their personal to-do list.

---

Need a break from the hustle and bustle? Let our To-Do List Application be your sidekick in the journey of productivity! Whether it's conquering your daily tasks or tackling your work projects, we've got you covered. Have an idea to make our app even better? We'd love to hear from you! 🚀

---