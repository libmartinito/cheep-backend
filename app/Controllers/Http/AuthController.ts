import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class AuthController {
    public async login({ request, auth }: HttpContextContract) {
        const { email, password } = request.all()
        const tokenInfo = await auth.use('api').attempt(email, password, {
            expiresIn: '7 days',
        })
        const user = await User.query().where('email', email)
        const userInfo = {
            user_id: user[0].id,
            token: tokenInfo.token,
            expires_at: tokenInfo.expiresAt,
            username: user[0].username,
            handle: user[0].handle,
            icon: user[0].icon,
            bio: user[0].bio
        }
        console.log(userInfo)
        return userInfo
    }

    public async register({ request, auth }: HttpContextContract) {
        const { email, password, username, handle, bio } = request.all()
        const user = new User()
        user.email = email
        user.password = password
        user.username = username
        user.handle = handle
        user.icon = "https://avatars.dicebear.com/api/croodles/" + user.handle + ".svg"
        user.bio = bio
        await user.save()
        const tokenInfo = await auth.use('api').login(user, {
            expiresIn: '7 days',
        })
        const userInfo = {
            user_id: user.id,
            token: tokenInfo.token,
            expires_at: tokenInfo.expiresAt,
            username: user.username,
            handle: user.handle,
            icon: user.icon,
            bio: user.bio
        }
        return userInfo
    }
}
