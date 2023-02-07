'use strict'

const Database = use('Database')
const { validate } = use('Validator')
const Env = use('Env')
const Hash = use('Hash')
const jwt = require('jsonwebtoken')
const { hashSync: hash, compareSync: compare } = require('bcryptjs')

class UserController {
    async login({ request, response }) {
        const { email, password } = request.all()

        const rules = {
            email: 'required',
            password: 'required'
        }

        const validation = await validate(request.all(), rules)

        if (validation.fails()) {
            response.status(400)
            return validation.messages()
        }

        let userLogin = email
        userLogin = userLogin.toLowerCase()

        const checkuser = await Database.raw(`select * from users where email = '${email}'`)
        if (checkuser.rows.length === 0) {
            response.status(400)
            return {
                message: 'email is does not exist'
            }
        }

        if (compare(password, checkuser.rows[0].password)) {
            let dataUser = checkuser.rows[0]

            let user = {
                username: dataUser.username,
                email: dataUser.email,
                role: dataUser.role,
                is_login: dataUser.is_login,
            }
            const token = jwt.sign(user, Env.get('APP_KEY'));
            const result = {
                user: user,
                token: token
            }

            await Database.raw(`UPDATE users SET is_login = true WHERE email = '${email}';`)

            return result
        } else {
            response.status(401)
            return {
                message: 'Email atau Password salah!'
            }
        }
    }
}

module.exports = UserController
