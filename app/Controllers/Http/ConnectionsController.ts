import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
// import Database from '@ioc:Adonis/Lucid/Database'
import Connection from 'App/Models/Connection'

export default class ConnectionsController {
    public async index({}: HttpContextContract) {
        const connections = Connection.query()
        return connections
    }
    public async store({ request }: HttpContextContract) {
        const connection = new Connection()
        connection.userId = request.input('user_id')
        connection.isfollowingId = request.input('isfollowing_id')
        await connection.save()
        return connection
    }
    public async destroy({ params }: HttpContextContract) {
        await Connection.query().where('id', params.id).delete()
    }
}
