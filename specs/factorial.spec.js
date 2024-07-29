import factorial from '../src/factorial'; /// ARRANGE
describe ('Test of factorial function', () => {
    it('imported without errors', () => {
        expect(typeof factorial).toBe('function');
    });
    it ('factorial(0) is 1', () => {
        const result = factorial(0); /// ACT
        expect(result).toBe(1); /// ASSERT
    });
    it ('factorial(1) is 1', () => {
        const result = factorial(1); /// ACT
        expect(result).toBe(1); /// ASSERT
    });
});