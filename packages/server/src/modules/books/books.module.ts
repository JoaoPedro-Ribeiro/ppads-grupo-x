import { Module } from '@nestjs/common'
import { BooksService } from './books.service'
import { BooksController } from './books.controller'
import { BooksRepository } from '../dynamodb/repositories/booksRepository'
import { S3Module } from '../s3/s3.module'
import { ErrorsModule } from '../errors/errors.module'

@Module({
  controllers: [BooksController],
  providers: [BooksService, BooksRepository],
  imports: [S3Module, ErrorsModule]
})
export class BooksModule {}
