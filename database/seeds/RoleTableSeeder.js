'use strict'


/*
|--------------------------------------------------------------------------
| RoleTableSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Role =  use('App/Models/Role');
/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class RoleTableSeeder {
  async run () {
    let admin =  await Role.create();
        admin.name = 'admin'
        admin.description = 'Role for administrator'
        admin.save();

    let user =  await Role.create();
        user.name = 'user'
        user.description = 'Role for user'
        user.save();
  }
}

module.exports = RoleTableSeeder
