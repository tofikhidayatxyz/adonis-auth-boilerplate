'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class Guest {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ request, auth, response }, next) {
    //console.log(auth.check())
    try {
      if(await auth.check()) {
        return await auth.user.redirectTo(response, next);
      }
    } catch(e) {
      return await next();
    }
    return await next();
   
    
  }
}

module.exports = Guest
