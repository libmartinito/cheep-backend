import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Connection from 'App/Models/Connection'
import Cheep from 'App/Models/Cheep'
import Like from 'App/Models/Like'
import Recheep from 'App/Models/Recheep'
import Reply from 'App/Models/Reply'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public username: string

  @column()
  public handle: string

  @column()
  public icon: string

  @column()
  public bio: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Connection)
  public connections: HasMany<typeof Connection>

  @hasMany(() => Cheep)
  public cheeps: HasMany<typeof Cheep>

  @hasMany(() => Like)
  public likes: HasMany<typeof Like>

  @hasMany(() => Recheep)
  public recheeps: HasMany<typeof Recheep>

  @hasMany(() => Reply)
  public replies: HasMany<typeof Reply>
}
