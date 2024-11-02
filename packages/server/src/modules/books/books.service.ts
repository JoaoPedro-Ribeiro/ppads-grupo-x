import { Injectable } from '@nestjs/common'
import { InputCreateBookDto } from './dto/inputCreateBook.dto'
import { BooksRepository } from '../dynamodb/repositories/booksRepository'
import { InputUpdateBookDto } from './dto/inputUpdateBook.dto'
import { BookModel } from './book.schema'
import { S3Service } from '../s3/s3.service'

@Injectable()
export class BooksService {
  constructor(
    private readonly booksRepository: BooksRepository,
    private readonly s3Service: S3Service
  ) {}

  async create(input: InputCreateBookDto) {
    const { success } = await this.booksRepository.createBook(input)

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
    const { success: findBookSuccess, data: bookInfo } =
      await this.booksRepository.findBookById(id)

    if (!findBookSuccess || !bookInfo) {
    }

    const startIndex = bookInfo.coverUrl.indexOf('.com/') + 5
    const filePath = bookInfo.coverUrl.substring(startIndex)

    const { success: bookDeletionSuccess } =
      await this.booksRepository.deleteBookById(id)

    if (!bookDeletionSuccess) {
      return { success: false, message: 'Failed to delete book' }
    }

    await this.s3Service.deleteFile(filePath)

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
    const books = await BookModel.scan('title').contains(title).exec()
    return books
  }
}
