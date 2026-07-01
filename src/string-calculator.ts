export class StringCalculator {
    public add(numbers: string): number {

        const isNumbersEmpty = this.isNumbersArgumentEmpty(numbers);

        if ( isNumbersEmpty ) { return 0; }

        numbers = this.turnDelimiterToCommas(numbers);

        const result: number = this.makeSumOfStringWithCommaDelimiter(numbers);

        return result;
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

    private sanitizeNewDelimiterString(numbers: string): string {
        if (!this.isUserSettingNewDelimiter(numbers)) {
            return numbers;
        }

        numbers = this.deleteNewDelimiterMarkFromString(numbers);
        const listSeparatedByLineJump = numbers.split("\n");
        
        return listSeparatedByLineJump[1];
    }

    private turnDelimiterToCommas (numbers: string): string {
        const delimiter = this.getDelimiter(numbers);
        
        numbers = this.sanitizeNewDelimiterString(numbers);

        return numbers.replaceAll(delimiter, ",");
    }

    private makeSumOfStringWithCommaDelimiter(numbers: string): number {
        const listOfNumbers = numbers.split(",");

        return this.makeSumOfStringNumbers(listOfNumbers);
    }

    private getUserDelimiter(numbers: string): string {
        numbers = this.deleteNewDelimiterMarkFromString(numbers);

        const listSeparatedByLineJump = numbers.split("\n");
        
        const delimiter = listSeparatedByLineJump[0];

        return delimiter;
    }

    private makeSumOfStringNumbers(stringNumbersOnList: string[]): number {   
        let result: number = 0;
        const negativeNumbers: string[] = [];

        stringNumbersOnList.forEach(
            (number: string) => {
                if (number.includes("-")) {
                    negativeNumbers.push(number);
                }
                
                result = result + this.convertStringToNumber(number);
            }
        )

        if(negativeNumbers.length > 0) {
            throw new Error("Negative numbers are not valid: " + negativeNumbers.join(","));
        }
        return result;
    }



    private isNumbersArgumentEmpty(numbers: string): boolean { 
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