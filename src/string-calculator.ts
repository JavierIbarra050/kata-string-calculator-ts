export class StringCalculator {

    private readonly IGNORE_NUMBERS_GREATER_THAN_THIS_NUMBER: number = 1000;

    
    public add(numbers: string): number {

        if ( this.numbersIsEmpty(numbers) ) { return 0; }

        numbers = this.turnNumbersDelimiterToCommas(numbers);

        const result: number = this.makeSumOfStringWithCommaAsDelimiter(numbers);

        return result;
    }


    private turnNumbersDelimiterToCommas (numbers: string): string {
        const delimiter = this.getDelimiter(numbers);
        
        numbers = this.sanitizeNewDelimiterString(numbers);

        return numbers.replaceAll(delimiter, ",");
    }

    private getDelimiter(numbers: string): string {
        if (this.isUserSettingNewDelimiter(numbers)) {
            return this.getUserDelimiter(numbers);
        }

        if (this.doesNumbersIncludeLineJump(numbers)) {
            return "\n";
        }            

        return ",";
    }

    private getUserDelimiter(numbers: string): string {
        numbers = this.deleteNewDelimiterMarkFromString(numbers);

        const listSeparatedByLineJump = numbers.split("\n");
        
        const delimiter = listSeparatedByLineJump[0];

        return delimiter;
    }

    private sanitizeNewDelimiterString(numbers: string): string {
        if (!this.isUserSettingNewDelimiter(numbers)) {
            return numbers;
        }

        const listSeparatedByLineJump = numbers.split("\n");
        
        return listSeparatedByLineJump[1];
    }

    private makeSumOfStringWithCommaAsDelimiter(numbers: string): number {
        const listOfNumbers = numbers.split(",");

        return this.makeSumOfStringNumbers(listOfNumbers);
    }

    private makeSumOfStringNumbers(stringNumbersOnList: string[]): number {   
        let result: number = 0;
        const negativeNumbers: string[] = [];

        stringNumbersOnList.forEach(
            (number: string) => {
                if (number.includes("-")) {
                    negativeNumbers.push(number);
                }

                const intNumber = this.convertStringToNumber(number);
                if (intNumber < this.IGNORE_NUMBERS_GREATER_THAN_THIS_NUMBER) {
                    result = result + intNumber;
                }
            }
        )

        this.throwErrorIfThereAreNegativeNumbers(negativeNumbers);
        return result;
    }

    private throwErrorIfThereAreNegativeNumbers(negativeNumbers: string[]): void {
        if(this.areThereAnyNegativeNumbers(negativeNumbers)) {
            throw new Error("Negative numbers are not valid: " + negativeNumbers.join(","));
        }
    }



    private areThereAnyNegativeNumbers(stringNegativeNumbersOnList: string[]): boolean {
        return stringNegativeNumbersOnList.length > 0;
    }

    private numbersIsEmpty(numbers: string): boolean { 
        return !numbers;
    }

    private convertStringToNumber(stringNumber: string): number {
        return parseInt(stringNumber);
    }

    private doesNumbersIncludeLineJump(numbers: string): boolean {
        return numbers.includes("\n");
    }

    private isUserSettingNewDelimiter(numbers: string): boolean {
        return numbers.startsWith("//");
    }


    private deleteNewDelimiterMarkFromString(numbers: string): string {
        return numbers.replace("//", "");
    }
}