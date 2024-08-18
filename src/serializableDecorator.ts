import { Serializable } from './Serializable';

export function serializable(...propsToExclude: string[]) {
  return function serializableDecorator<T extends { new(...args: any[]): {} }>(SerializableClass: T) {
    return class extends SerializableClass {
      constructor(...args) {
        super(...args);

        return Object.assign(this, {
          serialize() {
            // iterable object case
            if (typeof this[Symbol.iterator] === 'function') {
              const result = [];

              for (let value of this) {
                if (!(value instanceof Serializable)) {
                  continue;
                }

                result.push(value.serialize());
              }

              return result;
            }

            const result = {};

            Object.keys(this).forEach((key) => {
              if (typeof this[key] === 'function'
                || propsToExclude.includes(key)
                || (typeof this[key] === 'object'
                  && this[key] !== null
                  && !(this[key] instanceof Serializable))
              ) {
                return;
              }

              if (typeof this[key] === 'object'
                && this[key] !== null
                && typeof this[key][Symbol.iterator] === 'function'
                && typeof this[key] !== 'string'
              ) {
                result[key] = [];

                for (let value of this[key]) {
                  if (!(value instanceof Serializable)) {
                    continue;
                  }

                  result[key].push(value.serialize());
                }

                return;
              }

              if (this[key] instanceof Serializable) {
                result[key] = this[key].serialize();

                return;
              }

              result[key] = this[key];
            })

            return result;
          }
        });
      }
    };
  }
}
