# Simple CRUD Express Mongo As A Distributed System 
## Introduction
Simple CRUD Express Mongo As A Distributed System is a simple Express application that serves API with CRUD (Create, Read, Update, Delete) functionalities and uses a Command Query Responsibility Segregation (CQRS) pattern for showcasing a type of a distributed system pattern. By using sample_mflix from MongoDB Atlas dataset, this service will be able to manage
only the users entity. There are seven endpoints which are separated in `commands_server` and `queries_server` directories. These endpoints are:

[queries_server]
- `/users/`
- `/users/search`
- `/users/{user_id}`

[commands_server]
- `/users/create`
- `/users/update/{user_id}`
- `/users/delete/{user_id}`
- `/users/bulk-write`  

The application uses a partial distributed system pattern as there are two services that will only connect to a single database. 

## API Functionalities
### Query
#### /users
`/users` endpoint will return an array of users objects. The object will contain properties such as `id` (default Mongo object_id), `name`, `email` and hashed `password`
#### /users/search
`/users/search` endpoint will return an array of user objects. The search functionality will only accept a query parameter `name`. The objects should contain properties such as `id` (default Mongo object_id), `name`, `email`, hashed `password` and timestsamps. 
#### /users/{user_id}
`/users/search` endpoint will return a user object. The endpoint will only accept a url parameter of `user_id`. The object should contain properties such as `id` (default Mongo object_id), `name`, `email`, hashed `password` and timestsamps.
### Commands
#### /users/create
`/users` endpoint will return a succesfully created user object. The request body should contain required fields of `name`, `email` and plain `password` string.
#### /users/update/{user_id}
`/users/search` endpoint will return a successfully updated user object. The request body should contain fields of `name`, `email` and plain `password` string and the endpoint will only accept a url parameter of `user_id`. 
#### /users/delete/{user_id}
`/users/search` endpoint will return a successful message of a deletion. The endpoint will only accept a url parameter of `user_id`.
#### /users/bulk-write
`/users/search` endpoint will return an object which is the default of MongoDB `bulkWrite` function response. The endpoint accept commands such as `insertOne`, `updateOne`, `deleteOne`, `updateMany` and `deleteMany`. An example of the request body can be viewed below:
```
[
    {
        "command": "insertOne",
        "payload": {
            "name": "Kara 'Starbuck' Thrace",
            "email": "kara_starbuck.thrace@galactica.bt",
            "password": "karathrace123"
        }
    },
    {
        "command": "updateOne",
        "filter": {
            "name": "Lee 'Apollo' Adama"
        },
        "payload": {
            "email": "lee_apollo.adama@pegasus.bt"
        }
    },
    {
        "command": "deleteOne",
        "filter": {
            "name": "Fireball"
        }
    },
    {
        "command": "updateMany",
        "filter": {
            "name": "William 'Husker' Adama"
        },
        "payload": {
            "email": "william_husker.adama@galactica.bt"
        }
    },
    {
        "command": "deleteMany",
        "filter": {
            "name": "Flyboy"
        }
    }
]
```

