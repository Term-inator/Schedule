import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number

  @Column("text")
  name: string

  @Column()
  date: string
}
