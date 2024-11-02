import { Controller, Get, Post, Body, Delete, Query, Put } from '@nestjs/common'
import { BooksService } from './books.service'
import { InputCreateBookDto } from './dto/inputCreateBook.dto'
import { InputUpdateBookDto } from './dto/inputUpdateBook.dto'

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post('createBook')
  createBook(@Body() input: InputCreateBookDto) {
    return this.booksService.create(input)
  }

  @Get('getAllBooks')
  findAll() {
    return this.booksService.findAll()
  }

  @Get('getBooksByCategory')
  findBooksByCategory(@Query('category') category: number) {
    return this.booksService.findBooksByCategory(Number(category))
  }

  @Delete('deleteBook')
  remove(@Query('id') id: string) {
    return this.booksService.delete(id)
  }

  @Put('updateBook')
  updateBook(@Body() input: InputUpdateBookDto) {
    return this.booksService.updateBook(input)
  }

  async searchBooks(@Query('title') title: string) {
    const books = await this.booksService.findBooksByTitle(title)
    return books
  }
}
