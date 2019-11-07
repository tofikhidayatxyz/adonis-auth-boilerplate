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

Route.on('/').render('welcome')

Route.group( () => {
    Route.get('/login', 'Auth/LoginController.index').as('login').middleware('guest');
    Route.post('/login', 'Auth/LoginController.login').middleware('guest');
    Route.get('/logout', 'Auth/LoginController.logout').as('logout');
    Route.get('/register', 'Auth/RegisterController.index').as('register').middleware('guest');
})

Route.get('/home', ({request, response, view}) => {
    return view.render('home');
}).middleware(['auth','role:admin,user'])

Route.get('/employee', ({request, response, view}) => {
    return view.render('employee');
}).middleware(['auth', 'role:user'])

Route.get('/admin', ({request, response, view}) => {
    return view.render('admin');
}).middleware(['auth', 'role:admin']) 
