import { Module } from '@nestjs/common'
import { BooksService } from './books.service'
import { BooksController } from './books.controller'
import { BooksRepository } from '../dynamodb/repositories/booksRepository'
import { S3Module } from '../s3/s3.module'

@Module({
  controllers: [BooksController],
  providers: [BooksService, BooksRepository],
  imports: [S3Module]
})
export class BooksModule {}
