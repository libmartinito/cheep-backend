import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Reply from 'App/Models/Reply'
import Database from '@ioc:Adonis/Lucid/Database'

export default class RepliesController {
    public async store({ request }: HttpContextContract) {
        const reply = new Reply()
        reply.userId = request.input('userid')
        reply.cheepId = request.input('cheepid')
        reply.replyTo = request.input('parentcheepid')
        await reply.save()
        return reply
    }

    public async destroy({ params }: HttpContextContract) {
        await Reply.query().where('cheep_id', params.cheepid).delete()
    }

    public async index ({}: HttpContextContract) {
        const replies = await Reply.query()
        return replies
    }

    public async indexForUser({ params }: HttpContextContract) {
        const userReplies = await Reply.query().where('user_id', params.id)
        return userReplies
    }
    public async indexForPost({ params }: HttpContextContract) {
        const postReplies = await Reply.query().where('reply_to', params.parentid).orderBy('created_at', 'desc')
        return postReplies
    }
    public async getCount({ params }: HttpContextContract) {
        const count = await Database
            .from('replies')
            .where('reply_to', params.cheepid)
            .count('* as total')
        return count
    }
}
