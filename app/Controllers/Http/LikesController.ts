import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Like from 'App/Models/Like'
import Database from '@ioc:Adonis/Lucid/Database'

export default class LikesController {
    public async store({ request }: HttpContextContract) {
        const like = new Like()
        like.userId = request.input('userid')
        like.cheepId = request.input('cheepid')
        await like.save()
        return like
    }

    public async destroy({ params }: HttpContextContract) {
        await Like.query().where('id', params.id).delete()
    }
    public async index ({}: HttpContextContract) {
        const likes = await Like.query()
        return likes
    }
    public async indexForUser({ params }: HttpContextContract) {
        const userLikes = await Like.query().where('user_id', params.id)
        return userLikes
    }

    public async getCount({ params }: HttpContextContract) {
        const count = await Database
            .from('likes')
            .where('cheep_id', params.cheepid)
            .count('* as total')
        return count
    }

    public async showAllForOtherUser({ params }: HttpContextContract) {
        const otherUserLikes = await Like.query().where('user_id', params.otherid)
        return otherUserLikes
    }
}
