import { greet, farewell } from '../src/utils/greeting';

describe('Greeting utilities', () => {
    describe('greet function', () => {
        it('should return a greeting message for a valid name', () => {
            const result = greet('Alice');
            expect(result).toBe('Hello, Alice! Welcome to the TypeScript project.');
        });

        it('should throw an error for empty name', () => {
            expect(() => greet('')).toThrow('Name cannot be empty');
        });

        it('should throw an error for whitespace-only name', () => {
            expect(() => greet('   ')).toThrow('Name cannot be empty');
        });
    });

    describe('farewell function', () => {
        it('should return a farewell message for a valid name', () => {
            const result = farewell('Bob');
            expect(result).toBe('Goodbye, Bob! Thanks for using our application.');
        });

        it('should throw an error for empty name', () => {
            expect(() => farewell('')).toThrow('Name cannot be empty');
        });
    });
});
