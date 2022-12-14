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
  Route.resource('coworkers', 'CoworkersController').apiOnly();
}).prefix('/api');

Route.group(() => {
  Route.post('contacts','ContactsController.store');
  Route.get('contacts','ContactsController.index');
  Route.get('contacts/:contactId','ContactsController.show');
  Route.put('contacts/:contactId','ContactsController.update');
  Route.delete('contacts/:contactId', 'ContactsController.delete');
}).prefix('/api/coworkers/:id');
