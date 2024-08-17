import { serializable } from './serializableDecorator';
import { Serializable } from './Serializable';

export enum VehicleType {
  Car = 'Car',
  Bus = 'Bus',
  Bike = 'Bike',
}

type SerializedVehicle = {
  readonly id: string;
  readonly name: string;
  readonly type: VehicleType;
  readonly wheelsNum: number;
};

@serializable('checkExcluded')
export class Vehicle extends Serializable<SerializedVehicle> {
  private checkExcluded = 'checkExcluded';
  private checkNotSerializable = Object.create({});

  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly type: VehicleType,
    public readonly wheelsNum: number,
  ) {
    super();
  }

  get checkGetter() {
    return 'test';
  }

  drive() {
    // ...do something
  }

  repair() {
    // ...do something
  }
}

abstract class Collection<KEY, VALUE, SERIALIZED> extends Serializable<SERIALIZED[]> {
  protected data: Map<KEY, VALUE>;

  protected constructor() {
    super();
  }

  *[Symbol.iterator]() {
    for (const [,item] of this.data) {
      yield item;
    }
  }
}

@serializable()
export class VehicleCollection extends Collection<Vehicle['id'], Vehicle, SerializedVehicle[]> {
  constructor(vehicles: Vehicle[]) {
    super();

    this.data = new Map(vehicles.map((vehicle) => [vehicle.id, vehicle]));
  }
}

type SerializableStreet = {
  readonly id: string;
  readonly name: string;
  readonly vehicles: SerializedVehicle[],
}

// Example with nested serializable collection and object
@serializable()
export class Street extends Serializable<SerializableStreet> {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly vehicles: VehicleCollection,
    public readonly firstVehicle: Vehicle,
  ) {
    super();
  }
}
