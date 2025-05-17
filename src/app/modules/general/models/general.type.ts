export interface menuItems {
  show: boolean,
  icon: string,
  title: string,
  route: string,
}

export interface dataChart {
  name: string,
  value: number,
}

export interface books {
  id?: number,
  status?: string,
  status_boolean?: boolean,
  category: any,
  code: string,
  title: string,
  cover: any,
  author: string,
  edition: string,
  publication: any,
  synopsis: string,
  stock: number,
}

export interface historyReservation {
  code: string,
  title: string,
  reservation_date: string,
  delivery_date: string,
  status: string,
}

export interface configurations {
  section: string,
  properties: SystemPropieties | NotificationsPropieties | (string | any)[]
}

export interface SystemPropieties {
  max_loan_books: number,
  max_loan_days: number
}

export interface NotificationsPropieties {
  email: string,
  last_day: boolean,
  days_advance: number,
}

export interface bookListFilters {
  page: number,
  size: number,
  order: string,
  sort: 'asc' | 'desc',
  f_category: string,
  f_author: string,
  f_title: string,
  f_publication: string,
}

export interface bookList {
  id: number,
  category: string,
  code: string,
  title: string,
  cover: string,
  author: string,
  edition: string,
  publication: number,
  synopsis: string,
  stock: number,
  status: string,
}

export interface categoriesList {
  id: number,
  title: string,
  status: string,
  deleted?: boolean
}

export interface filtersCategory {
  page: number,
  size: number,
  order: string,
  sort: 'asc' | 'desc',
}

export interface GeneralReport {
  books: number,
  categories: number,
  bookings: number,
  notGiveBack: number,
  booksPerCategory: any,
  topReservedBooks: { title: string, reservations: number }[],
  reservationsPerMonth: any
}

export interface resevesHistory {
  booking_code: string,
  book_category: string,
  book_title: string,
  book_code: string,
  booking_date: string,
  delivery_date: string,
  giveback_date: string,
  status: string,
}

export interface resevesShow {
  booking_code: string,
  user: string,
  book_category: string,
  book_code: string,
  book_title: string,
  booking_date: string,
  delivery_date: string,
  giveback_date: string,
  status: string,
}
