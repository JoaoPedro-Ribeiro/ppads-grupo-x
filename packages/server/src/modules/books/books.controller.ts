import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Query,
  Put,
  UseInterceptors,
  UploadedFile
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { BooksService } from './books.service'
import { InputCreateBookDto } from './dto/inputCreateBook.dto'
import { InputUpdateBookDto } from './dto/inputUpdateBook.dto'
import { S3Service } from '../s3/s3.service'

@Controller('books')
export class BooksController {
  constructor(
    private readonly booksService: BooksService,
    private readonly s3Service: S3Service
  ) {}

  @Post('createBook')
  @UseInterceptors(FileInterceptor('cover'))
  async createBook(
    @Body() input: InputCreateBookDto,
    @UploadedFile() file: Express.Multer.File
  ) {
    let coverUrl = null

    if (file) {
      coverUrl = await this.s3Service.uploadFile(file.buffer, file.originalname)
    }

    const bookData = {
      ...input,
      coverUrl
    }

    return this.booksService.create(bookData)
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
