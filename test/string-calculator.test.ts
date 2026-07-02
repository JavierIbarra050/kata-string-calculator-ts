import { StringCalculator } from "../src/string-calculator";

describe("StringCalculator", () => {
    it("should return 0 when given an empty string", () => {
        const calculator = new StringCalculator();

        const result = calculator.add("");

        expect(result).toBe(0);
    });

    it("should return any number when given any number", () => {
        const calculator = new StringCalculator();

        const result = calculator.add("9");

        expect(result).toBe(9);
    });

    it("should return sum of numbers when given two numbers", () => {
        const calculator = new StringCalculator();

        const result = calculator.add("2,3");

        expect(result).toBe(5);
    });

    it("should return sum of numbers when given any amount of numbers", () => {
        const calculator = new StringCalculator();

        const result = calculator.add("2,3,4");

        expect(result).toBe(9);
    });

    it("should return sum of numbers when given using a line jump instead of comma", () => {
        const calculator = new StringCalculator();

        const result = calculator.add("2\n3");

        expect(result).toBe(5);
    });

    it("should return sum of numbers when given using a line jumps and commas", () => {
        const calculator = new StringCalculator();

        const result = calculator.add("2\n3,7");

        expect(result).toBe(12);
    });

    it("should return sum of numbers if new delimiter is set", () => {
        const calculator = new StringCalculator();

        const result = calculator.add("//;\n2;7");

        expect(result).toBe(9);
    })

    it("should return an error if there is a negative number", () => {
        const calculator = new StringCalculator();

        expect(
            () => calculator.add("2,-7")
        ).toThrow("Negative numbers are not valid: -7")
    })

    it("should return an error if there are negative numbers", () => {
        const calculator = new StringCalculator();

        expect(
            () => calculator.add("2,-7,-5,-8")
        ).toThrow("Negative numbers are not valid: -7,-5,-8")
    })

    it("should ignore numbers over 1000", () => {
        const calculator = new StringCalculator();

        const result = calculator.add("2,1001,3");

        expect(result).toBe(5);
    })

    it("should not ignore numbers less than 1001", () => {
        const calculator = new StringCalculator();

        const result = calculator.add("2,1000,3");

        expect(result).toBe(5);
    })

    it("should return sum of numbers with delimiters with more than one character long", () => {
        const calculator = new StringCalculator();

        const result = calculator.add("//[***]\n1***2***3");

        expect(result).toBe(6);
    })

    it("should return sum of numbers with many delimiters with more than one character long", () => {
        const calculator = new StringCalculator();

        const result = calculator.add("//[**][%%]\n1**2%%3");

        expect(result).toBe(6);
    })
});