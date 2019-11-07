'use strict'

/*
|--------------------------------------------------------------------------
| UserTableSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const User =  use('App/Models/User');
const Role =  use('App/Models/Role');
const Hash = use('Hash')

class UserTableSeeder {
  async run () {

    const roleUser = await Role.query().where('name', 'user').first(); 
    const roleAdmin = await Role.query().where('name', 'admin').first(); 

    const employee = await User.create();
          employee.name = 'Employee';
          employee.email = 'employee@test.app';
          employee.password = 'secret';
          await employee.save();
          await employee.roles().attach(roleUser.id);
    
    const admin = await User.create();
          admin.name = 'Administrator';
          admin.email = 'admin@test.app';
          admin.password = 'secret';
          await admin.save();
          await admin.roles().attach(roleAdmin.id);
          
    
  }
}

module.exports = UserTableSeeder
