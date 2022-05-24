import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class AuthController {
    public async login({ request, auth }: HttpContextContract) {
        const { email, password } = request.all()
        const token = await auth.use('api').attempt(email, password, {
            expiresIn: '7 days',
        })
        return token.toJSON()
    }

    public async register({ request, auth }: HttpContextContract) {
        const { email, password, username, handle, icon, bio } = request.all()
        const user = new User()
        user.email = email
        user.password = password
        user.username = username
        user.handle = handle
        user.icon = icon
        user.bio = bio
        await user.save()
        const token = await auth.use('api').login(user, {
            expiresIn: '7 days',
        })
        return token.toJSON()
    }
}
