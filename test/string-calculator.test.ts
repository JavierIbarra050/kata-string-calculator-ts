import { StringCalculator } from "../src/string-calculator";

describe("StringCalculator", () => {
    it("should return 0 when given an empty string", () => {
        const calculator = new StringCalculator();

        const result = calculator.add("");

        expect(result).toBe(0);
    });

    it("should return 5 when given a 5", () => {
        const calculator = new StringCalculator();

        const result = calculator.add("5");

        expect(result).toBe(5);
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
});
