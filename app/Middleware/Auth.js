'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class Auth {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ request, auth, response }, next) {
    try {
      if(await auth.check()) {
        return await next() 
      }
    } catch(e) {
      return response.route('login');
    }
    return response.route('login');
   
  }
}

module.exports = Auth
