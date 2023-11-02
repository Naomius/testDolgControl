
export type JsonType = {
  error?: string,
  total?: string,
  books: BookType[]
}

export type BookType = {
  id: number,
  title: string,
  subtitle: string,
  isbn13: string,
  price: string,
  image: string,
  url: string,
  count?: number,
  totalCountPrice?: number
}
