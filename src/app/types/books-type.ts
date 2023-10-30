// export type BooksType = {
//   title?: string,
//   subtitle?: string,
//   isbn13?: string,
//   price?: string,
//   image?: string,
//   url?: string
// }
export type BooksType = {
  error?: string,
  total?: string,
  books: JsonType[]
}

export type JsonType = {
  id: number,
  title: string,
  subtitle: string,
  isbn13: string,
  price: string,
  image: string,
  url: string
}
