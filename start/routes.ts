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
    Route.post('register', 'AuthController.register')
    Route.post('login', 'AuthController.login')
  }).prefix('auth')
  Route.group(() => {
    Route.resource('cheep', 'CheepsController').apiOnly()
    Route.get('cheep/all/:id', 'CheepsController.showAllForUser')
    Route.post('like', 'LikesController.store')
    Route.delete('like/:id', 'LikesController.destroy')
    Route.get('like', 'LikesController.showAllForUser')
    Route.get('like/:cheepid', 'LikesController.getCount')
    Route.post('recheep', 'RecheepsController.store')
    Route.delete('recheep/:id', 'RecheepsController.destroy')
    Route.get('recheep', 'RecheepsController.showAllForUser')
    Route.get('recheep/:cheepid', 'RecheepsController.getCount')
  }).middleware("auth:api")
}).prefix('api')
