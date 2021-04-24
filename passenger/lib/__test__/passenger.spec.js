"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mock_1 = require("./mock");
var app_1 = __importDefault(require("../task/app"));
var shuffleOne = [
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
var shuffleTwo = [
    { name: 'passenger101', location: 'Abuja' },
    { name: 'passenger102', location: 'Benue' },
    { name: 'passenger103', location: 'Katsina' },
    { name: 'passenger104', location: 'Lagos' },
    { name: 'passenger105', location: 'Sambisa' }
];
var shuffleThree = [
    { name: 'passenger151', location: 'Abuja' },
    { name: 'passenger152', location: 'Benue' },
    { name: 'passenger153', location: 'Katsina' },
    { name: 'passenger154', location: 'Lagos' },
    { name: 'passenger155', location: 'Sambisa' }
];
var shuffleFour = [
    { name: 'passenger201', location: 'Abuja' },
    { name: 'passenger202', location: 'Benue' },
    { name: 'passenger203', location: 'Katsina' },
    { name: 'passenger204', location: 'Lagos' },
    { name: 'passenger205', location: 'Sambisa' }
];
var locations = ['Abuja', 'Benue', 'Katsina', 'Lagos', 'Sambisa'];
describe("Test for function structure", function () {
    it("Returns an object for even distro", function () {
        var returnValue = app_1.default(100, 2);
        expect(returnValue).toHaveProperty('boarded');
        expect(returnValue).toHaveProperty('count');
        expect(returnValue).toHaveProperty('reservation');
    });
    it("checks that the function is called with 2 arguments", function () {
        var length = app_1.default.length;
        expect(length).toEqual(2);
    });
});
describe("Test for function expected value", function () {
    it("Returns evenly distributed values for boarded", function () {
        var returnValue = app_1.default(10, 2);
        var locations = returnValue.boarded.map(function (location) { return location.location; });
        //get location frequency
        var locationFreq = locations.reduce(function (tally, value) {
            tally[value] = (tally[value] || 0) + 1;
            return tally;
        }, {});
        var evenDistribution = locations.every(function (location) { return locationFreq[location] === 2; });
        expect(evenDistribution).toBe(true);
    });
    it("Returns reservation list for uneven distro", function () {
        var returnValue = app_1.default(61, 2);
        expect(returnValue.reservation).toHaveLength(1);
    });
    it("boarded does not exceed 50 people for 60 passengers with shuffle of 0", function () {
        var returnValue = app_1.default(60, 0);
        expect(returnValue.boarded.length).toBe(50);
    });
});
describe("test for shuffle", function () {
    it("Single shuffle works ", function () {
        var returnValue = app_1.default(60, 1);
        expect(returnValue.count).toEqual(2);
        expect(returnValue.boarded).toEqual(shuffleOne);
    });
    it("first multiple shuffle works ", function () {
        var returnValue = app_1.default(105, 2);
        expect(returnValue.count).toBe(3);
        expect(returnValue.boarded).toEqual(shuffleTwo);
    });
    it("second multiple shuffle works ", function () {
        var returnValue = app_1.default(155, 3);
        expect(returnValue.count).toBe(4);
        expect(returnValue.boarded).toEqual(shuffleThree);
    });
    it("third multiple shuffle works ", function () {
        var returnValue = app_1.default(205, 4);
        expect(returnValue.count).toBe(5);
        expect(returnValue.boarded).toEqual(shuffleFour);
    });
});
describe("test for boarded value with passengers of 50 and shuffle 0", function () {
    var passengers = 50;
    var shuffle = 0;
    var expected = app_1.default(passengers, shuffle);
    expect(expected.boarded).toStrictEqual(mock_1.prefilled);
});
