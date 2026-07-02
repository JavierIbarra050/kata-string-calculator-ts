export class StringCalculator {

    private readonly IGNORE_NUMBERS_GREATER_THAN_THIS_NUMBER: number = 1000;


    public add(numbers: string): number {

        if ( this.numbersIsEmpty(numbers) ) { return 0; }

        numbers = this.turnNumbersDelimiterToCommas(numbers);

        const result: number = this.makeSumOfStringWithCommaAsDelimiter(numbers);

        return result;
    }


    private turnNumbersDelimiterToCommas (numbers: string): string {
        const delimiters: string[] = this.getDelimiters(numbers);
        
        numbers = this.sanitizeNewDelimiterString(numbers);

        delimiters.forEach(
            (delimiter: string) => {
                numbers = numbers.replaceAll(delimiter, ",");
            }
        )

        return numbers;
    }

    private getDelimiters(numbers: string): string[] {
        if (this.isUserSettingNewDelimiter(numbers)) {
            return this.getUserDelimiters(numbers);
        }

        if (this.doesNumbersIncludeLineJump(numbers)) {
            return ["\n"];
        }            

        return [","];
    }

    private getUserDelimiters(numbers: string): string[] {
        numbers = this.deleteNewDelimiterMarkFromString(numbers);

        if (this.isUserTryingToSetMoreThanOneDelimiter(numbers)) {
            return this.getUserDelimitersWithMoreThanOneCharacter(numbers);
        }        

        return this.getUserDelimiterWithOneCharacter(numbers);
    }

    private getUserDelimiterWithOneCharacter(numbers: string): string[] {
        const listSeparatedByLineJump = numbers.split("\n");
        
        const delimiter: string[] = [];
        delimiter.push(listSeparatedByLineJump[0]);

        return delimiter;
    }

    private getUserDelimitersWithMoreThanOneCharacter(numbers: string): string[] {
        const listOfDelimiters: string[] = [];
        const listOfRawDelimiters = numbers.split("]");


        for(let i: number = 0; i < listOfRawDelimiters.length - 1; i++) {
            const delimiter = listOfRawDelimiters[i].replace("[", "");
            listOfDelimiters.push(delimiter);
        }

        return listOfDelimiters;
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

    private isUserTryingToSetMoreThanOneDelimiter(numbers: string): boolean {
        return numbers.includes("[");
    }
}