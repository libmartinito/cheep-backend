import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Recheep from 'App/Models/Recheep'
import Database from '@ioc:Adonis/Lucid/Database'

export default class RecheepsController {
    public async store({ request }: HttpContextContract) {
        const recheep = new Recheep()
        recheep.userId = request.input('userid')
        recheep.cheepId = request.input('cheepid')
        await recheep.save()
        return recheep
    }

    public async destroy({ params }: HttpContextContract) {
        await Recheep.query().where('id', params.id).delete()
    }

    public async index ({}: HttpContextContract) {
        const recheeps = await Recheep.query()
        return recheeps
    }

    public async indexForUser({ params }: HttpContextContract) {
        const userRecheeps = await Recheep.query().where('user_id', params.id)
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
