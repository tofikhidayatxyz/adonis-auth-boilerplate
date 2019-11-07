'use strict'

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class User extends Model {
  static boot () {
    super.boot()

    /**
     * A hook to hash the user password before saving
     * it to the database.
     */
    this.addHook('beforeSave', async (userInstance) => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password)
      }
    })
  }

  /**
   * A relationship on tokens is required for auth to
   * work. Since features like `refreshTokens` or
   * `rememberToken` will be saved inside the
   * tokens table.
   *
   * @method tokens
   *
   * @return {Object}
   */
  tokens () {
    return this.hasMany('App/Models/Token')
  }
  /**
   * Relation to Role models 
   */
  roles () {
    return this.belongsToMany('App/Models/Role')
  }
  /**
   * Relation to Role models 
   */
  role () {
      return this.belongsTo('App/Models/Role');
  }
  /**
   * Check user single role
   */
  async hasRole(role) {
    return null !== await this.roles().where('name', role).first();
  }
  /**
  * Check multiple roles
  * @param array $roles
  */
  async hasAnyRole(role) {
    return null !== await this.roles().whereIn('name', role).first();
  } 
  /**
  * Redireting user by user  roles 
  * @param $roles
  */
  async redirectTo(response) {
    if(await this.hasRole('user')) {
        return response.route('employee');
    } else if(await this.hasRole('admin')) {
        return response.route('admin');
    }
   return response.route('login');
  } 


}

module.exports = User
