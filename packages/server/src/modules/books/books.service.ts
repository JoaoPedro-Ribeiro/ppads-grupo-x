import { Injectable } from '@nestjs/common'
import { InputCreateBookDto } from './dto/inputCreateBook.dto'
import { BooksRepository } from '../dynamodb/repositories/booksRepository'
import { v4 as uuid } from 'uuid'
import { InputUpdateBookDto } from './dto/inputUpdateBook.dto'
import { BookModel } from './book.schema';


@Injectable()
export class BooksService {
  constructor(private readonly booksRepository: BooksRepository) {}

  async create(input: InputCreateBookDto) {
    const newBook = {
      ...input,
      id: uuid()
    }

    const { success } = await this.booksRepository.createBook(newBook)

    if (!success) {
      return { success: false, message: 'Failed to create book' }
    }

    return { success: true, message: 'Book created successfully' }
  }

  async findAll() {
    const { success, data } = await this.booksRepository.findAllBooks()

    if (success) {
      return { success, data }
    }
    return null
  }

  async findBooksByCategory(category: number) {
    const { success, data } =
      await this.booksRepository.findBooksByCategory(category)

    if (success) {
      return { success, data }
    }
    return null
  }

  async delete(id: string) {
    const { success: deletionSuccess } =
      await this.booksRepository.deleteBookById(id)

    if (!deletionSuccess) {
      return { success: false, message: 'Failed to delete book' }
    }

    return { success: true, message: 'Book deleted successfully' }
  }

  async updateBook(input: InputUpdateBookDto) {
    const { success } = await this.booksRepository.updateBook(input)

    if (!success) {
      return { success: false, message: 'Failed to update book' }
    }

    return { success: true, message: 'Book updated successfully' }
  }
  
  async findBooksByTitle(title: string): Promise<any> {
    const books = await BookModel.scan('title').contains(title).exec();
    return books;
  }
}
