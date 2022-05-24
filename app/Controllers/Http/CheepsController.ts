import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Cheep from 'App/Models/Cheep'

export default class CheepsController {
    public async index({ auth }: HttpContextContract) {
        const user = await auth.authenticate()
        const cheeps = await Cheep.query().where('user_id', user.id)
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
