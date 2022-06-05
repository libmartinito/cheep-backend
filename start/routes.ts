/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.group(() => {
    // Routes for authentication
    Route.post('register', 'AuthController.register')
    Route.post('login', 'AuthController.login')
  }).prefix('auth')
  Route.group(() => {
    // Routes for dealing with cheeps
    Route.get('cheep/all', 'CheepsController.index')
    Route.post('cheep', 'CheepsController.store')
    Route.get('cheep/all/:id', 'CheepsController.indexForUser')
    Route.get('cheep/:id', 'CheepsController.show')
    Route.delete('cheep/:id', 'CheepsController.destroy')
    
    // Routes for dealing with cheep likes
    Route.post('like', 'LikesController.store')
    Route.delete('like/:id', 'LikesController.destroy')
    Route.get('like/all', 'LikesController.index')
    Route.get('like/all/:id', 'LikesController.indexForUser')
    Route.get('like/count/:cheepid', 'LikesController.getCount')
    // Routes for dealing with cheep recheeps
    Route.post('recheep', 'RecheepsController.store')
    Route.delete('recheep/:id', 'RecheepsController.destroy')
    Route.get('recheep/all', 'RecheepsController.index')
    Route.get('recheep/all/:id', 'RecheepsController.indexForUser')
    Route.get('recheep/count/:cheepid', 'RecheepsController.getCount')
    // Routes for dealing with cheep replies
    Route.post('reply', 'RepliesController.store')
    Route.delete('reply/:cheepid', 'RepliesController.destroy')
    Route.get('reply/all', 'RepliesController.index')
    Route.get('reply/all/:id', 'RepliesController.indexForUser')
    Route.get('reply/count/:cheepid', 'RepliesController.getCount')
    Route.get('reply/all/cheep/:parentid', 'RepliesController.indexForPost')
    // Routes for dealing with users
    Route.get('user/:handle', 'UsersController.getUserInfoFromHandle')
    Route.get('user', 'UsersController.index')
  }).middleware("auth:api")
}).prefix('api')
