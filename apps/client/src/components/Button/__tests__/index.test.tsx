import { render, screen } from '@testing-library/react'
import Button from '../index'

describe('Button', () => {
  test('Should return valid button', () => {
    render(<Button />)
    expect(screen.getByText(/Login/i)).toBeInTheDocument()
  })
})
