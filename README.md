Meadowlark Travel Agency project from 'Web Development with Node & Express' by Ethan Brown

/**
 * app.METHOD (get or post, usually)
 * 
 * two parameters (path, function)
 * 
 * path defines the route 
 * 
 * function gets invoked with the route is matched. pass in request and response objects
 * 
 * IN EXPRESS, THE ORDER IN WHICH ROUTES AND MIDDLEWARE ARE ADDED IS SIGNIFICANT
 */


Using Jest as a test framework (will run both unit and integration tests)
    npm i --save-dev jest

    "scripts": { "test": "jest"}

    npm test

    Also installing puppeteer, portfinder and eslint