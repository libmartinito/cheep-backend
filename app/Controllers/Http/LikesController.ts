import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Like from 'App/Models/Like'
import Database from '@ioc:Adonis/Lucid/Database'

export default class LikesController {
    public async store({ auth, request }: HttpContextContract) {
        const user = await auth.authenticate()
        const like = new Like()
        like.userId = request.input('userid')
        like.cheepId = request.input('cheepid')
        await user.related('likes').save(like)
        return like
    }
    public async destroy({ auth, params }: HttpContextContract) {
        const user = await auth.authenticate()
        await Like.query().where('user_id', user.id).where('id', params.id).delete()
    }
    public async showAllForUser({ auth }: HttpContextContract) {
        const user = await auth.authenticate()
        const userLikes = await Like.query().where('user_id', user.id)
        return userLikes
    }
    public async getCount({ params }: HttpContextContract) {
        const count = await Database
            .from('likes')
            .where('cheep_id', params.cheepid)
            .count('* as total')
        return count
    }
}
