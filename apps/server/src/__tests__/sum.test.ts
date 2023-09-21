// math.test.js
const sum = (a: number, b: number) => a + b

describe('sum', () => {
  test('should add two numbers correctly', () => {
    const result = sum(5, 10)
    expect(result).toBe(15)
  })
})
