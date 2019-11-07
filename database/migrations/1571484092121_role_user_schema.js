'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RoleUserSchema extends Schema {
  up () {
    this.create('role_user', (table) => {
      table.increments()
      table.integer('user_id');
      table.integer('role_id');
      table.timestamps()
    })
  }

  down () {
    this.drop('role_users')
  }
}

module.exports = RoleUserSchema
