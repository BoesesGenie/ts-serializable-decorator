import {Street, Vehicle, VehicleCollection, VehicleType} from './Vehicle';

const car = new Vehicle(
  '8247b4f6-13cc-49f3-aac4-e828a2f19c6e',
  'car',
  VehicleType.Car,
  4
);

console.log(car.serialize());

// Expected output:
// {
//   id: '8247b4f6-13cc-49f3-aac4-e828a2f19c6e',
//   name: 'car',
//   type: 'Car',
//   wheelsNum: 4
// }

const collection = new VehicleCollection([
  new Vehicle(
    '8247b4f6-13cc-49f3-aac4-e828a2f19c6e',
    'car',
    VehicleType.Car,
    4
  ),
  new Vehicle(
    '229ade70-d5cd-4841-a60f-ec8ddf141780',
    'bus',
    VehicleType.Bus,
    8
  ),
  new Vehicle(
    '96587162-9410-48b9-a5c6-89209ed4685c',
    'bike',
    VehicleType.Bike,
    2
  )
]);

console.log(collection.serialize());

// Expected output:
// [
//   {
//     id: '8247b4f6-13cc-49f3-aac4-e828a2f19c6e',
//     name: 'car',
//     type: 'Car',
//     wheelsNum: 4
//   },
//   {
//     id: '229ade70-d5cd-4841-a60f-ec8ddf141780',
//     name: 'bus',
//     type: 'Bus',
//     wheelsNum: 8
//   },
//   {
//     id: '96587162-9410-48b9-a5c6-89209ed4685c',
//     name: 'bike',
//     type: 'Bike',
//     wheelsNum: 2
//   }
// ]


const street = new Street(
  '8247b4f6-13cc-49f3-aac4-e828a2f19c6e',
  'Street Name',
  collection,
  new Vehicle(
    'ed0c0b19-9d54-42e5-b8d3-a4c0b1760781',
    'bike',
    VehicleType.Bike,
    2
  )
);

console.log(street.serialize());

// Expected output:
// {
//   id: '8247b4f6-13cc-49f3-aac4-e828a2f19c6e',
//   name: 'Street Name',
//   vehicles: [
//     {
//       id: '8247b4f6-13cc-49f3-aac4-e828a2f19c6e',
//       name: 'car',
//       type: 'Car',
//       wheelsNum: 4
//     },
//     {
//       id: '229ade70-d5cd-4841-a60f-ec8ddf141780',
//       name: 'bus',
//       type: 'Bus',
//       wheelsNum: 8
//     },
//     {
//       id: '96587162-9410-48b9-a5c6-89209ed4685c',
//       name: 'bike',
//       type: 'Bike',
//       wheelsNum: 2
//     }
//   ],
//   firstVehicle: {
//     id: 'ed0c0b19-9d54-42e5-b8d3-a4c0b1760781',
//       name: 'bike',
//       type: 'Bike',
//       wheelsNum: 2
//   }
// }
