
export interface person {
    name: string;
    location: string
}
/**
 *
 * @param passengers
 * @param shuffle
 * @returns
 */
const taskOne = (passengers:number, shuffle:number)=>{
    // generate all passengers and push to reservation
    let reservation = generatePassengers(passengers);

    // return all passengers if passengers' number < 5
    if (passengers < 5) {
        return {
            boarded:[],
            reservation,
            count:0
        }
    }

    // get first trip using total number of passengers and number of passengers in reservation
    let { count, boarded, newReservation } = getFirstTrip(passengers, reservation);
    reservation = newReservation;

    // if shuffle is 0 return after first trip
    if (shuffle === 0) {
        return {
            boarded,
            reservation,
            count
        }
    }

    // if shuffle != 0 and passengers is not more than 5
    // break out of loop if passengers are less than 5 or shuffle is equal to 0
    while (shuffle > 0 && reservation.length >= 5) {
        const { multiple } = getMultipleOfFive(reservation.length);
        // if passengers in reservation list are more than 50, remove 50
        if (multiple > 10) {
            boarded = reservation.splice(0, 50);
            shuffle--;
            count++;
        } else {
            // get multiple of five and remove it
            const firstTripMultiple = getMultipleOfFive(reservation.length);
            boarded = reservation.splice(0, firstTripMultiple.multiple * 5);
            shuffle--;
            count++;
        }
    }

    return {boarded, reservation, count};
}

//Generate array of passengers and put them all in reservation
/**
 *
 * @param passengers
 * @returns
 */
const generatePassengers = (passengers:number): person[] => {
    const reservation:person[] = [];
    let count:number = 0;
    const locations:string[] = [ 'Abuja', 'Benue', 'Katsina', 'Lagos', 'Sambisa']
    for (let i=0; i < passengers; i++) {
        const person = { name: `passenger${i + 1}`, location: locations[count] };
        reservation.push(person);
        count === 4 ? count = 0 : count++;
    }
    return reservation
}

// calculate multiples of 5 in reservation
/**
 *
 * @param number
 * @returns
 */
const getMultipleOfFive = (number: number): { multiple:number, remainder:number} => {
    let multiple = 0
    let newNum = number
    if(number === 0 ){
       return {multiple: 0, remainder: 0}
    }
    for (let i = 5; i <= number; i +=5 ){
        multiple++
        newNum -= 5
    }
    return {multiple, remainder: newNum}
}

// calculate first trip
/**
 *
 * @param passengers
 * @param reservation
 * @returns
 */
const getFirstTrip = (passengers:number, reservation: person[]) => {
    let remainderAfterFirstTrip:number = 0;
    let boarded: person[] = []
    if (passengers >= 50) {
        boarded = reservation.splice(0, 50);
        remainderAfterFirstTrip = passengers - 50;
    } else {
        const firstTripMultiple = getMultipleOfFive(passengers);
        boarded = reservation.splice(0, firstTripMultiple.multiple * 5);
    }

    return {count: 1, boarded, newReservation: reservation, remainderAfterFirstTrip}
}

// console.log(taskOne(55, 4));


export default taskOne;

const generateMockPassengers = (start:number, end:number,): person[] => {
    const reservation:person[] = [];
    let count:number = 0;
    const locations:string[] = [ 'Abuja', 'Benue', 'Katsina', 'Lagos', 'Sambisa']
    for (let i=start; i <= end; i++) {
        const person = { name: `passenger${i}`, location: locations[count] };
        reservation.push(person);
        count === 4 ? count = 0 : count++;
    }
    return reservation
}

console.log(generateMockPassengers(101, 105));
