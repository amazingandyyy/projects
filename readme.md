# MEAN Scaffold

This is a MEAN Stack Scaffold which includes:

- Express
- Mongoose
- Angular
- Angular UI Router
- jQuery
- Bootstrap
- Gulp

Included is a Gulpfile, which will use your client directory to generate your public directory (bundling JS, turning SCSS into CSS, copying HTML).  It will watch your code for changes, and it will also start your server, by running nodemon for you.

Also included is a User model, which has built in methods and some middleware.  You'll need to modify parts of this user model to make it work with the rest of your app.  For instance, the auth middleware is expecting a JWT token in a cookie named authtoken, but you may like to do something else.

### Installation

1. Run an `npm install` and a `bower install`.
2. Export the required JWT_SECRET environment variable.
3. Run `gulp` to start the server.
