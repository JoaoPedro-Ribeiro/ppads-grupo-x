import { Module } from '@nestjs/common'
import { BooksService } from './books.service'
import { BooksController } from './books.controller'
import { BooksRepository } from '../dynamodb/repositories/booksRepository'

@Module({
  controllers: [BooksController],
  providers: [BooksService, BooksRepository]
})
export class BooksModule {}
