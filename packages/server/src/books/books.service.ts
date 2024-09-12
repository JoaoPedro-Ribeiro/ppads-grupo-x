import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Book } from './book.schema'

@Injectable()
export class BooksService {
  constructor(@InjectModel(Book.name) private bookModel: Model<Book>) {}

  async searchBooks(
    title?: string,
    author?: string,
    isbn?: string,
  ): Promise<Book[]> {
    const searchQuery = {}

    if (title) {
      searchQuery['title'] = { $regex: title, $options: 'i' }
    }

    if (author) {
      searchQuery['author'] = { $regex: author, $options: 'i' }
    }

    if (isbn) {
      searchQuery['isbn'] = isbn
    }

    return this.bookModel.find(searchQuery).exec()
  }
}
