import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
// import Database from '@ioc:Adonis/Lucid/Database'
import User from 'App/Models/User'
// import Database from '@ioc:Adonis/Lucid/Database'

export default class UsersController {
    public async index({}: HttpContextContract) {
        const users = User.query()
        return users
    }

    public async getUserInfoFromHandle({ params }: HttpContextContract) {
        const userInfo = await Database
            .from('users')
            .select('id', 'username', 'handle', 'icon', 'bio')
            .where('handle', params.handle)
        return userInfo
    }
}
