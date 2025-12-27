export interface BaseEntityState {
  createdAt: Date;
  id: string;
}

export abstract class BaseEntity<T extends BaseEntityState> {
  protected constructor(protected readonly state: T) {}

  get createdAt(): Date {
    return this.state.createdAt;
  }

  get id(): T['id'] {
    return this.state.id;
  }

  toState(): T {
    return structuredClone(this.state);
  }
}
