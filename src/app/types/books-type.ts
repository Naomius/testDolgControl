export type Json = {
  error?: string,
  total?: string,
  books: Book[]
}

export type Book = {
  id: number,
  title: string,
  subtitle: string,
  isbn13: string,
  price: string,
  image: string,
  url: string,
  count: number | null,
  totalCountPrice?: number
}
