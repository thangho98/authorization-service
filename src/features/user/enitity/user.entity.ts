import { BaseEntity } from '@cores/entity/base.entity';
import { BeforeInsert, Column, Entity, OneToMany } from 'typeorm';
import { UserStatus } from '@features/user/user.status';
import { Nullable } from '@cores/types';
import { UserMetaEntity } from '@features/user/enitity/user-meta.entity';
import * as bcrypt from 'bcrypt';
import { AutoMap } from 'nestjsx-automapper';

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity {
  @AutoMap()
  @Column({ type: 'varchar', unique: true })
  username: string;

  @AutoMap()
  @Column({ type: 'varchar', nullable: false })
  password: string;

  @AutoMap()
  @Column({ type: 'varchar', nullable: true })
  firstName: Nullable<string>;

  @AutoMap()
  @Column({ type: 'varchar', nullable: true })
  lastName: Nullable<string>;

  @AutoMap()
  @Column({ type: 'varchar', nullable: true })
  email: Nullable<string>;

  @AutoMap()
  @Column({ type: 'varchar', nullable: true })
  displayName: Nullable<string>;

  @Column({ default: true })
  isActive: boolean;

  @Column({ type: 'timestamptz', nullable: true })
  registeredAt: Nullable<Date>;

  @Column({ type: 'timestamptz', nullable: true })
  lastLogin: Nullable<Date>;

  @Column({ type: 'varchar', length: 10, default: UserStatus.Activate })
  status: UserStatus;

  @OneToMany((type) => UserMetaEntity, (metadata) => metadata.user)
  metadata: UserMetaEntity[];

  @BeforeInsert()
  async setPassword(password: string) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(password || this.password, salt);
  }
}
