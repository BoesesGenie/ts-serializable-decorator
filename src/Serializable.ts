export abstract class Serializable<T> {
  serialize(): T {
    throw new Error('Method not implemented.');
  }
}
