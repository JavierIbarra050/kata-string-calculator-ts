export class StringCalculator {
    public add(numbers: string): number {

        const isNumbersEmpty = this.isNumbersArgumentEmpty(numbers);

        if ( isNumbersEmpty ) { return 0; }

        if (this.doesNumbersIncludeComa(numbers)) {

            const listOfNumbers = numbers.split(",");

            return this.makeSumOfStringNumbers(listOfNumbers);
        }

        return this.convertStringToNumber(numbers);
    }

    private isNumbersArgumentEmpty(numbers: string): boolean { 
        return !numbers;
    }

    private convertStringToNumber(stringNumber: string): number {
        return parseInt(stringNumber);
    }

    private doesNumbersIncludeComa(numbers: string): boolean {
        return numbers.includes(",");
    } 

    private makeSumOfStringNumbers(stringNumbersOnList: string[]): number {
        let result: number = 0;

        stringNumbersOnList.forEach(
            (number: string) => {
                result = result + this.convertStringToNumber(number);
            }
        )

        return result;
    }
}