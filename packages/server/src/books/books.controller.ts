import { Controller, Get, Query } from '@nestjs/common'
import { BooksService } from './books.service'

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get('search')
  async searchBooks(
    @Query('title') title: string,
    @Query('author') author: string,
    @Query('isbn') isbn: string,
  ) {
    return this.booksService.searchBooks(title, author, isbn)
  }
}
