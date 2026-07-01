export class StringCalculator {
    public add(numbers: string): number {

        const isNumbersEmpty = this.isNumbersArgumentEmpty(numbers);

        if ( isNumbersEmpty ) { return 0; }

        if (numbers.includes(",")) {
            return this.convertStringToNumber(numbers.split(",")[1])
        }

        return this.convertStringToNumber(numbers);
    }

    private isNumbersArgumentEmpty(numbers: string): boolean { 
        return !numbers;
    }

    private convertStringToNumber(stringNumber: string): number {
        return parseInt(stringNumber);
    }
}