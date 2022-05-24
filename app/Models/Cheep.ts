import { DateTime } from 'luxon'
import { BaseModel, belongsTo, BelongsTo, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Like from 'App/Models/Like'
import Recheep from 'App/Models/Recheep'
import Reply from 'App/Models/Reply'
import User from 'App/Models/User'

export default class Cheep extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public userId: number

  @column()
  public content: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Like)
  public likes: HasMany<typeof Like>

  @hasMany(() => Recheep)
  public recheeps: HasMany<typeof Recheep>

  @hasMany(() => Reply)
  public reply: HasMany<typeof Reply>

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>
}
