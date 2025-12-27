import { isEqual } from 'lodash';

export abstract class ValueObject<T> {
  public readonly value: T;

  constructor(props: T) {
    this.value = Object.freeze(props);
  }

  public equals(valueObject: ValueObject<T>): boolean {
    if (valueObject === null || valueObject === undefined) {
      return false;
    }

    return isEqual(this.value, valueObject.value);
  }
}
