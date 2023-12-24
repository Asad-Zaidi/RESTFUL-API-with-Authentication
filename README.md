# API with NodeJS and MongoDB
## Description

This is a simple API with NodeJS and MongoDB. It is a simple CRUD with a Product model. It perform the following actions:

- Create a Product
- Read a Product
- Update a Product
- Delete a Product

## 🚀 Live Demo <a name="live-demo"></a>


- [Live Demo Link](https://asad-zaidi.github.io/Restful-Api-MongoDB/)

## 🚀 Live BackEnd Demo <a name="live-demo"></a>


- [Live BackEnd Link](https://restful-api-mongo-db.vercel.app/api/products)

    To test the API you can use Postman or Insomnia



## Installation

To install this API you need to have installed NodeJS and MongoDB. Then you need to clone this repository and run the following command:

```bash
npm install
```
```bash
npm install mongoose
```
```bash
npm install express
```

## Usage

To use this API you need to run the following command:

```bash
node index.js 
```
or

```bash
nodemon ./bin/www 
```

You can also change the port in the bin/www and .env file.
To test the API at port 3000 you can use Postman or Insomnia and perform the following requests:

- Create a Product: POST http://localhost:3000/api/products
- Read all Product: GET http://localhost:3000/api/products
- Read a Product: GET http://localhost:3000/api/:id
- Update a Product: PUT http://localhost:3000/api/:id
- Delete a Product: DELETE http://localhost:3000/api/:id

## Contributing
Issues and pull requests are welcome!

## License
[MIT](https://choosealicense.com/licenses/mit/)