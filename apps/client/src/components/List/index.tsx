import { Fragment } from 'react'

interface IProps<T> {
  items: T[]
  renderItem: (item: T, index: number) => React.ReactNode
}

function List<T>({ items, renderItem }: IProps<T>) {
  return <Fragment>{items.map(renderItem)}</Fragment>
}

export default List
