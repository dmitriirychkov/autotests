import factorial from '../src/factorial'; /// ARRANGE
describe ('Test of factorial function', () => {
    it('imported without errors', ('function') => {
        expect(typeof factorial).toBe();
    });
    it ('factorial(0) is 1', () => {
        const result = factorial(0); /// ACT
        expect(result).toBe(1); /// ASSERT
    });
    it ('factorial(1) is 1', () => {
        const result = factorial(1); /// ACT
        expect(result).toBe(1); /// ASSERT
    });
    it ('factorial(3) is 6', () => {
        const result = factorial(3); /// ACT
        expect(result).toBe(6); /// ASSERT
    });
    it ('factorial(-1) fails', () => {
        const expression = () => factorial(-1); /// ACT
        expect(expression).toThrow('range'); /// ASSERT
    });
    it ('factorial(101) fails', () => {
        const expression = () => factorial(101); /// ACT
        expect(expression).toThrow('range'); /// ASSERT
    });
    it ('factorial("abc") fails', () => {
        const expression = () => factorial('abc'); /// ACT
        expect(expression).toThrow('X must be number'); /// ASSERT
    });
});