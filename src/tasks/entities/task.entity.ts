import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Status } from '../enum/status.enum';
import { User } from '../../users/entities/user.entity';
import { Priority } from '../enum/priority.enum';

@Entity({
  name: 'tasks',
})
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ type: 'enum', enum: Status, default: Status.NotStarted })
  status: Status;

  @Column({ type: 'enum', enum: Priority })
  priority: Priority;

  @Column()
  category: string;

  @Column({ type: 'date' })
  dueDate: Date;

  @ManyToOne(() => User, (user) => user.tasks)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: User;

  @Column()
  userId: number;

  @Column()
  userEmail: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
