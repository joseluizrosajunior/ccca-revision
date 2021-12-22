export default class Cpf {
    value: string;

    constructor (value: string) {
        if (!this.validate(value)) throw new Error("CPF inválido");    
        this.value = value;
    }

    FACTOR_FIRST_VERIFIER_DIGIT = 10;
    FACTOR_SECOND_VERIFIER_DIGIT = 11;
    MAX_DIGITS_1 = 9;
    MAX_DIGITS_2 = 10;

    validate(cpf = "") {
        cpf = this.getOnlyDigitsCpf(cpf);
        if (this.isInvalidLength(cpf)) return false;
        if (this.areAllDigitsEquals(cpf)) return false;
        const firstDigitVerifier = this.calculateDigit(cpf, this.FACTOR_FIRST_VERIFIER_DIGIT, this.MAX_DIGITS_1);
        const secondDigitVerifier = this.calculateDigit(cpf, this.FACTOR_SECOND_VERIFIER_DIGIT, this.MAX_DIGITS_2);
        let calculatedDigitVerified = `${firstDigitVerifier}${secondDigitVerifier}`;  
        return this.getCheckDigit(cpf) == calculatedDigitVerified;
    }

    getOnlyDigitsCpf(cpf: string) {
        return cpf.replace(/\D/g, "");
    }

    isInvalidLength(cpf: string) {
        return cpf.length !== 11;
    }

    areAllDigitsEquals(cpf: string) {
        const [firstDigit] = cpf;
        return cpf.split("").every(digit => digit === firstDigit);
    }

    calculateDigit(cpf: string, factor: number, max: number) {
        let total = 0;
        for (const digit of this.toDigitArray(cpf).slice(0, max)) {
            total += digit * factor--;
        }
        return (total%11 < 2) ? 0 : (11 - total%11);
    }

    toDigitArray(cpf: string) {
        return [...cpf].map(digit => parseInt(digit));
    }

    getCheckDigit(cpf: string) {
        return cpf.slice(9);
    }
}