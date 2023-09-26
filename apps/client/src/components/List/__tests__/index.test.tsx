import { render, screen } from '@testing-library/react'
import List from '../index'

const items = ['Bangkok', 'California', 'Kiev']

const renderItem = (item: string, index: number) => <div key={index}>{item}</div>

test('Render List', () => {
  render(<List items={items} renderItem={renderItem} />)

  items.forEach((item) => {
    const value = new RegExp(item, 'i')
    expect(screen.getByText(value)).toBeInTheDocument()
  })
})
