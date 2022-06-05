import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Cheep from 'App/Models/Cheep'

export default class CheepsController {

    public static table = 'cheeps'
    
    public async index({}: HttpContextContract) {
        const cheeps = await Database
            .from('cheeps')
            .join('users', 'user_id', '=', 'users.id')
            .select('cheeps.id', 'user_id', 'content', 'username', 'handle', 'icon', 'cheeps.created_at')
            .orderBy('created_at', 'desc')
        return cheeps
    }

    public async store({ request }: HttpContextContract) {
        const cheep = new Cheep()
        cheep.userId = request.input('user_id')
        cheep.content = request.input('content')
        await cheep.save()
        return cheep
    }

    public async indexForUser({ params }: HttpContextContract) {
        const cheepsForUser = await Database
            .from('cheeps')
            .join('users', 'user_id', '=', 'users.id')
            .select('cheeps.id', 'user_id', 'content', 'username', 'handle', 'icon', 'cheeps.created_at')
            .where('user_id', params.id)
            .orderBy('created_at', 'desc')
        return cheepsForUser
    }

    public async show({ params }: HttpContextContract) {
        const cheep = await Database
            .from('cheeps')
            .join('users', 'user_id', '=', 'users.id')
            .select('cheeps.id', 'user_id', 'content', 'username', 'handle', 'icon', 'cheeps.created_at')
            .where('cheeps.id', params.id)
        return cheep
    }

    public async destroy({ params }: HttpContextContract) {
        await Cheep.query().where('id', params.id).delete()
    }
}
