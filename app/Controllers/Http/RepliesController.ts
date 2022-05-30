import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Reply from 'App/Models/Reply'
import Database from '@ioc:Adonis/Lucid/Database'

export default class RepliesController {
    public async store({ auth, request }: HttpContextContract) {
        const user = await auth.authenticate()
        const reply = new Reply()
        reply.userId = request.input('userid')
        reply.cheepId = request.input('cheepid')
        reply.replyTo = request.input('parentcheepid')
        await user.related('replies').save(reply)
        return reply
    }
    public async destroy({ auth, params }: HttpContextContract) {
        const user = await auth.authenticate()
        await Reply.query().where('user_id', user.id).where('cheep_id', params.cheepid).delete()
    }
    public async showAllForUser({ auth }: HttpContextContract) {
        const user = await auth.authenticate()
        const userReplies = await Reply.query().where('user_id', user.id)
        return userReplies
    }
    public async getCount({ params }: HttpContextContract) {
        const count = await Database
            .from('replies')
            .where('reply_to', params.cheepid)
            .count('* as total')
        return count
    }
}
