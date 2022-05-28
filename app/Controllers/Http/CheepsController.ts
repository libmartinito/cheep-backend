import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Cheep from 'App/Models/Cheep'

export default class CheepsController {
    public async index({}: HttpContextContract) {
        const cheeps = await Database
            .from('cheeps')
            .join('users', 'user_id', '=', 'users.id')
            .select('cheeps.id','user_id','content', 'username', 'handle', 'icon', 'cheeps.created_at')
            .orderBy('created_at', 'desc')
        return cheeps
    }

    public async store({ auth, request }: HttpContextContract) {
        const user = await auth.authenticate()
        const cheep = new Cheep()
        cheep.content = request.input('content')
        await user.related('cheeps').save(cheep)
        return cheep
    }

    public async show({ params }: HttpContextContract) {
        const cheep = await Cheep.find(params.id)
        return cheep
    }

    public async showAllForUser({ params }: HttpContextContract) {
        const allCheeps = await Cheep.query().where('user_id', params.id).orderBy('created_at', 'desc')
        return allCheeps
    }

    public async update({ request, params }: HttpContextContract) {
        const cheep = await Cheep.find(params.id)
        if (cheep) {
            cheep.content = request.input('content')
            if (await cheep.save()) {
                return cheep
            }
            return
        }
        return
    }

    public async destroy({ response, auth, params }: HttpContextContract) {
        const user = await auth.authenticate()
        await Cheep.query().where('user_id', user.id).where('id', params.id).delete()
        return
    }
}
