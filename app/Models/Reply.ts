import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Reply extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  
  @column()
  public userId: number

  @column()
  public cheepId: number

  @column()
  public replyTo: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
