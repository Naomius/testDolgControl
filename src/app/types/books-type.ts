
export type JsonType = {
  error?: string,
  total?: string,
  books: BooksType[]
}

export type BooksType = {
  id: number,
  title: string,
  subtitle: string,
  isbn13: string,
  price: string,
  image: string,
  url: string
}
