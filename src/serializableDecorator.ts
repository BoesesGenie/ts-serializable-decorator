import { Serializable } from './Serializable';

export function serializable(...propsToExclude: string[]) {
  return function serializableDecorator<T extends { new(...args: any[]): {} }>(SerializableClass: T) {
    return class extends SerializableClass {
      constructor(...args) {
        super(...args);

        return new Proxy(this, {
          get(target, prop) {
            if (prop !== 'serialize') {
              return target[prop];
            }

            return () => {
              let result: any = {};

              // iterable object case
              if (typeof target[Symbol.iterator] === 'function'
                && typeof target !== 'string'
              ) {
                result = [];

                for (let value of target as unknown as Iterable<any>) {
                  if (!(value instanceof Serializable)) {
                    continue;
                  }

                  result.push(value.serialize());
                }

                return result;
              }

              Object.keys(target).forEach((key) => {
                if (typeof target[key] === 'function'
                  || propsToExclude.includes(key)
                  || (typeof target[key] === 'object'
                    && target[key] !== null
                    && !(target[key] instanceof Serializable))
                ) {
                  return;
                }

                if (typeof target[key] === 'object'
                  && target[key] !== null
                  && typeof target[key][Symbol.iterator] === 'function'
                  && typeof target[key] !== 'string'
                ) {
                  result[key] = [];

                  for (let value of target[key]) {
                    if (!(value instanceof Serializable)) {
                      continue;
                    }

                    result[key].push(value.serialize());
                  }

                  return;
                }

                if (target[key] instanceof Serializable) {
                  result[key] = target[key].serialize();

                  return;
                }

                result[key] = target[key];
              })

              return result;
            };
          }
        });
      }
    };
  }
}
