'use strict'

const { validate } = use('Validator')

class LoginController {
    index ({view}) {
        return view.render('auth.login');
    }

    async login({request, response, session, auth}) {
        const rules = {
            email: 'required|email',
            password: 'required'
        }
        const validation = await validate(request.all(), rules)
        if (validation.fails()) {
            session.withErrors(validation.messages())
                   .flashExcept(['password'])
            return response.redirect('back')
        }
        try {
            const token = await auth.attempt(
                request.input('email'),
                request.input('password')
            )
            return auth.user.redirectTo(response)
        } catch(err){
            session .withErrors([
                {
                    message: 'The email or password you entered is incorrect',
                    field: 'email',
                    validation: 'error'
                }
            ])
            .flashExcept(['password'])
            return response.redirect('back')
        }
    }

    async logout({request, response, auth}) {
        await auth.logout();
        return response.route('login');  
    }
    

}

module.exports = LoginController
