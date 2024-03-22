## To run this application
  `$ npm install`

  `$ npm start`

## To run the unit test
  `$ npm test`

## Some notes

I see that the provided json server does not response correct if the path contains `/` character (eg: `/fs?path=directory-1/directory-1a`).
So that I created a small NodeJS server with the same logic, and resolve the mentioned issue. Please take a look on that here: [File Server Repository](https://github.com/hhphuc/fileserver).
