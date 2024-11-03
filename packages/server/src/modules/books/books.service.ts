import { Injectable } from '@nestjs/common'
import { InputCreateBookDto } from './dto/inputCreateBook.dto'
import { BooksRepository } from '../dynamodb/repositories/booksRepository'
import { InputUpdateBookDto } from './dto/inputUpdateBook.dto'
import { S3Service } from '../s3/s3.service'
import { ErrorsService } from '../errors/errors.service'

@Injectable()
export class BooksService {
  constructor(
    private readonly booksRepository: BooksRepository,
    private readonly s3Service: S3Service
  ) {}

  async create(input: InputCreateBookDto) {
    const { success } = await this.booksRepository.createBook(input)

    if (!success) {
      throw ErrorsService.failToCreateBook()
    }

    return { success: true, message: 'Book created successfully' }
  }

  async findAll() {
    const { success, data } = await this.booksRepository.findAllBooks()

    if (success) {
      return { success, data }
    }
    throw ErrorsService.dynamoError()
  }

  async findBooksByCategory(category: number) {
    const { success, data } =
      await this.booksRepository.findBooksByCategory(category)

    if (success) {
      return { success, data }
    }
    throw ErrorsService.dynamoError()
  }

  async delete(id: string) {
    const { success: findBookSuccess, data: bookInfo } =
      await this.booksRepository.findBookById(id)

    if (!findBookSuccess || !bookInfo) {
      throw ErrorsService.bookNotFound()
    }

    const startIndex = bookInfo.coverUrl.indexOf('.com/') + 5
    const filePath = bookInfo.coverUrl.substring(startIndex)

    const { success: bookDeletionSuccess } =
      await this.booksRepository.deleteBookById(id)

    if (!bookDeletionSuccess) {
      throw ErrorsService.failToDeleteBook()
    }

    await this.s3Service.deleteFile(filePath)

    return { success: true, message: 'Book deleted successfully' }
  }

  async updateBook(input: InputUpdateBookDto) {
    const { success } = await this.booksRepository.updateBook(input)

    if (!success) {
      throw ErrorsService.failToUpdateBook()
    }

    return { success: true, message: 'Book updated successfully' }
  }

  async findBooksByTitle(title: string): Promise<any> {
    const { success, data } = await this.booksRepository.findBooksByTitle(title)

    if (!success) {
      throw ErrorsService.dynamoError()
    }

    return { success: true, data }
  }
}
