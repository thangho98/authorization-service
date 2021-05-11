import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Nullable } from '../types';
import { AutoMap } from 'nestjsx-automapper';

export abstract class BaseEntity {
  @AutoMap()
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  // @Column({ type: 'boolean', default: true })
  // isActive: boolean;
  //
  // @Column({ type: 'boolean', default: false })
  // isArchived: boolean;
  @Column({ type: 'varchar', length: 255, nullable: true })
  createdBy: Nullable<string>;
  @Column({ type: 'varchar', length: 36, nullable: true })
  createdById: Nullable<string>;
  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  updatedAt: Nullable<Date>;
  @Column({ type: 'varchar', length: 255, nullable: true })
  updatedBy: Nullable<string>;
  @Column({ type: 'varchar', length: 36, nullable: true })
  updatedById: Nullable<string>;
  @DeleteDateColumn({ type: 'timestamptz', nullable: true })
  deletedAt: Nullable<Date>;
  @Column({ type: 'varchar', length: 255, nullable: true })
  deletedBy: Nullable<string>;
  @Column({ type: 'varchar', length: 36, nullable: true })
  deletedById: Nullable<string>;
}
