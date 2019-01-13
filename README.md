![CF](http://i.imgur.com/7v5ASc8.png) LAB
=================================================

## Books

### Author: Siobhan Niess and George Raymond

### Links and Resources
* [repo](https://github.com/niesssiobhan/15-project-books)
* [travis](https://travis-ci.com/niesssiobhan/15-project-books)
* [server](https://git.heroku.com/niess-15-lab.git) 

#### Documentation
* [swagger](http://xyz.com) (API assignments only)

### Modules
#### `model-finder.js`
#### `books-schema.js`
#### `books.js`
#### `bookshelf-schema.js`
#### `bookshelf.js`
#### `model.js`
#### `app.js`
#### `index.js`
#### `server.js`
##### Exported Values and Methods

### Setup
#### `.env` requirements
* `PORT` - Port Number 8080
* `MONGODB_URI` - MONGODB_URI=mongodb://localhost:27017/books

#### Running the app
* the installastions that you will have to are going to be `htppie`, `nodemon`, `mongo db`
    * these are going to allow you to run the app
* in your terminal you are going to want to run the command `nodemon index.js`   
* open up another terminal window/tab and run the command `http :8080/api/v1`
* to start up mongo db:
    * `mongod --dbpath=<filepath>`
    * `start mongodb` (this will be in another window/tab of your terminal)
    * `start dbs`
    * `run: db.books.find().pretty();` (this will be to print all items in db)
* GET: see all with books or bookshelf or request an id
    * enter `http GET :8080/api/v1/books` or `http GET :8080/api/v1/books/<id>`
* POST: add an item to categories or products
    * category, enter `echo '{"title":"title","author":"author","isbn":"isbn","image_url":"image_url","description":"description"}' |http POST :8080/api/v1/categories`
    * product, enter `echo '{"title":"title","author":"author","isbn"":isbn","image_url":"image_url","description":"description"}' |http POST :8080/api/v1/products`
* PUT: update a record in products (/api/v1/products) or categories (/api/v1/categories).
    * update a product, enter `echo '{"title":"title","author":"author","isbn":"isbn","image_url":"image_url","description":"description"}' |http PUT :8080/api/v1/products`
    * update a category, enter `echo '{"title":"title","author":"author","isbn":"isbn,"image_url":"image_url","description":"description"}' |http PUT :8080/api/v1/categories`
* DELETE: delete a record in categories or products
    * delete a record, enter http DELETE :8080/api/v1/books/<id>
  
#### Tests
* How do you run tests?
* What assertions were made?
* What assertions need to be / should be made?