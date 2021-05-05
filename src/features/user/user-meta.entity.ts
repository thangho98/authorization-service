import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { UserEntity } from '@features/user/user.entity';

@Entity({ name: 'user_meta' })
@Unique(['user', 'key'])
export class UserMetaEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => UserEntity, (user) => user.metadata)
  user: string;

  @Column({ type: 'varchar', length: 30, nullable: false })
  key: string;

  @Column({ type: 'text', nullable: false })
  value: string;
}
