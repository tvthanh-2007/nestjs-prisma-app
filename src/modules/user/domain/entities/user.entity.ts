import { BaseEntity } from '@/shared/domain/base.entity';
import { Email } from '../value-objects/email.value-object';

export class User extends BaseEntity {
  private constructor(
    id: string,
    public readonly email: Email,
    private _passwordHash: string,
    public readonly name: string | null,
    public readonly role: 'USER' | 'ADMIN',
    createdAt: Date,
    updatedAt: Date,
  ) {
    super(id, createdAt, updatedAt);
  }

  static create(props: {
    id: string;
    email: string;
    passwordHash: string;
    name?: string;
    role?: 'USER' | 'ADMIN';
    createdAt?: Date;
    updatedAt?: Date;
  }): User {
    return new User(
      props.id,
      new Email(props.email),
      props.passwordHash,
      props.name ?? null,
      props.role ?? 'USER',
      props.createdAt ?? new Date(),
      props.updatedAt ?? new Date(),
    );
  }

  get passwordHash(): string {
    return this._passwordHash;
  }
}
