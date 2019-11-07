'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class Role {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ request, auth, response }, next, role) {
    // call next to advance the request
    try {
       let user =  await auth.user.hasAnyRole(role);
       if(!user) {
         return response.status(403).send('This action is unauthorized');
       }
       
    } catch (e) {
       return response.status(403).send('This action is unauthorized');
    }
    await next()
  }
}

module.exports = Role
