import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Recheep from 'App/Models/Recheep'
import Database from '@ioc:Adonis/Lucid/Database'

export default class RecheepsController {
    public async store({ auth, request}: HttpContextContract) {
        const user = await auth.authenticate()
        const recheep = new Recheep()
        recheep.userId = request.input('userid')
        recheep.cheepId = request.input('cheepid')
        await user.related('recheeps').save(recheep)
        return recheep
    }
    public async destroy({ auth, params }: HttpContextContract) {
        const user = await auth.authenticate()
        await Recheep.query().where('user_id', user.id).where('id', params.id).delete()
    }
    public async showAllForUser({ auth }: HttpContextContract) {
        const user = await auth.authenticate()
        const userRecheeps = await Recheep.query().where('user_id', user.id)
        return userRecheeps
    }
    public async getCount({ params }: HttpContextContract) {
        const count = await Database
            .from('recheeps')
            .where('cheep_id', params.cheepid)
            .count('* as total')
        return count
    }
}
