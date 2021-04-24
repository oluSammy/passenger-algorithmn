import { prefilled } from "./mock";
import task, { person } from '../task/app';

const shuffleOne: person[] = [
  { name: 'passenger51', location: 'Abuja' }, 
  { name: 'passenger52', location: 'Benue' }, 
  { name: 'passenger53', location: 'Katsina' }, 
  { name: 'passenger54', location: 'Lagos' }, 
  { name: 'passenger55', location: 'Sambisa' }, 
  { name: 'passenger56', location: 'Abuja' }, 
  { name: 'passenger57', location: 'Benue' }, 
  { name: 'passenger58', location: 'Katsina' }, 
  { name: 'passenger59', location: 'Lagos' }, 
  { name: 'passenger60', location: 'Sambisa' }
];

const shuffleTwo: person[] = [
  { name: 'passenger101', location: 'Abuja' }, 
  { name: 'passenger102', location: 'Benue' }, 
  { name: 'passenger103', location: 'Katsina' }, 
  { name: 'passenger104', location: 'Lagos' }, 
  { name: 'passenger105', location: 'Sambisa' }
];

const shuffleThree: person[] = [
  { name: 'passenger151', location: 'Abuja' }, 
  { name: 'passenger152', location: 'Benue' }, 
  { name: 'passenger153', location: 'Katsina' }, 
  { name: 'passenger154', location: 'Lagos' }, 
  { name: 'passenger155', location: 'Sambisa' }
]

const shuffleFour: person[] = [
  { name: 'passenger201', location: 'Abuja' }, 
  { name: 'passenger202', location: 'Benue' }, 
  { name: 'passenger203', location: 'Katsina' }, 
  { name: 'passenger204', location: 'Lagos' }, 
  { name: 'passenger205', location: 'Sambisa' }
]

interface keyValue {
  [propName:string]: number
}

const locations:string[] = [ 'Abuja', 'Benue', 'Katsina', 'Lagos', 'Sambisa'];

describe("Test for function structure", () => {
  it("Returns an object for even distro", () => {
    const returnValue = task(100, 2);
    expect(returnValue).toHaveProperty('boarded');
    expect(returnValue).toHaveProperty('count');
    expect(returnValue).toHaveProperty('reservation');
  });

  it("checks that the function is called with 2 arguments", () => {
    const length:number = task.length;
    expect(length).toEqual(2);
  });
});

describe("Test for function expected value", () => {
  it("Returns evenly distributed values for boarded", () => {
    const returnValue = task(10, 2);
    const locations = returnValue.boarded.map(location => location.location);

    //get location frequency
    const locationFreq = locations.reduce((tally:keyValue, value:string) => {
      tally[value] = (tally[value] || 0) + 1;
      return tally;
    }, {});

    const evenDistribution = locations.every((location) => locationFreq[location] === 2);
    expect(evenDistribution).toBe(true);
  })
  it("Returns reservation list for uneven distro", () => {
    const returnValue = task(61, 2);
    expect(returnValue.reservation).toHaveLength(1);
  });

  it("boarded does not exceed 50 people for 60 passengers with shuffle of 0", () => {
    const returnValue = task(60, 0);
    expect(returnValue.boarded.length).toBe(50);
  });
});

describe("test for shuffle", () => {
  it("Single shuffle works ", () => {
    const returnValue = task(60, 1);
    expect(returnValue.count).toEqual(2);
    expect(returnValue.boarded).toEqual(shuffleOne);
  });

  it("first multiple shuffle works ", () => {
    const returnValue = task(105, 2);
    expect(returnValue.count).toBe(3)
    expect(returnValue.boarded).toEqual(shuffleTwo)
  });

  it("second multiple shuffle works ", () => {
    const returnValue = task(155, 3);
    expect(returnValue.count).toBe(4);
    expect(returnValue.boarded).toEqual(shuffleThree);
  });

  it("third multiple shuffle works ", () => {
    const returnValue = task(205, 4);
    expect(returnValue.count).toBe(5);
    expect(returnValue.boarded).toEqual(shuffleFour);
  });
});

describe("test for boarded value with passengers of 50 and shuffle 0", () => {
  let passengers = 50;
  let shuffle = 0;

  const expected = task(passengers, shuffle);
  expect(expected.boarded).toStrictEqual(prefilled);
});