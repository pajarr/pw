'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

const api = 'api/v1'
const exts = ['json', 'table', 'tablejson', 'jsontable']

Route.group(() => {
    Route.post('/login', 'UserController.login')
    Route.post('/register', 'UserController.register')
}).prefix(api).formats(exts)

Route.on('/').render('welcome')
