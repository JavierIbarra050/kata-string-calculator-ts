export class StringCalculator {
    public add(numbers: string): number {

        const isNumbersEmpty = this.isNumbersArgumentEmpty(numbers);

        if ( isNumbersEmpty ) { return 0; }


        if (this.userIsSettingNewDelimiter(numbers)) {
            
            const delimiter = this.getUserDelimiter(numbers);

            return this.convertStringToNumber(numbers.split(delimiter)[2]);
        }


        if (this.doesNumbersIncludeLineJump(numbers)) {

            const listOfNumbers = numbers.split("\n");

            numbers = listOfNumbers.join(",");
        }


        if (this.doesNumbersIncludeComma(numbers)) {

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

    private doesNumbersIncludeComma(numbers: string): boolean {
        return numbers.includes(",");
    } 

    private doesNumbersIncludeLineJump(numbers: string): boolean {
        return numbers.includes("\n");
    }

    private userIsSettingNewDelimiter(numbers: string): boolean {
        return numbers.startsWith("//");
    }

    private deleteNewDelimiterMarkFromString(numbers: string): string {
        return numbers.replace("//", "");
    }

    private getUserDelimiter(numbers: string): string {
        numbers = this.deleteNewDelimiterMarkFromString(numbers);

        const listSeparatedByLineJump = numbers.split("\n");
        
        const delimiter = listSeparatedByLineJump[0];

        return delimiter;
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