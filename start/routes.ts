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
    Route.resource('cheep', 'CheepsController').apiOnly()
    Route.get('cheep/all/:id', 'CheepsController.showAllForUser')
    // Routes for dealing with cheep likes
    Route.post('like', 'LikesController.store')
    Route.delete('like/:id', 'LikesController.destroy')
    Route.get('like', 'LikesController.showAllForUser')
    Route.get('like/:cheepid', 'LikesController.getCount')
    // Routes for dealing with cheep recheeps
    Route.post('recheep', 'RecheepsController.store')
    Route.delete('recheep/:id', 'RecheepsController.destroy')
    Route.get('recheep', 'RecheepsController.showAllForUser')
    Route.get('recheep/:cheepid', 'RecheepsController.getCount')
    // Routes for dealing with cheep replies
    Route.post('reply', 'RepliesController.store')
    Route.delete('reply/:cheepid', 'RepliesController.store')
    Route.get('reply', 'RepliesController.showAllForUser')
    Route.get('reply/:cheepid', 'RepliesController.getCount')
  }).middleware("auth:api")
}).prefix('api')
