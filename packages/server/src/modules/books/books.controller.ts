import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Query,
  Put,
  UseInterceptors,
  UploadedFile,
  UseGuards
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { BooksService } from './books.service'
import { InputCreateBookDto } from './dto/inputCreateBook.dto'
import { InputUpdateBookDto } from './dto/inputUpdateBook.dto'
import { S3Service } from '../s3/s3.service'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'

@Controller('books')
export class BooksController {
  constructor(
    private readonly booksService: BooksService,
    private readonly s3Service: S3Service
  ) {}

  @Post('createBook')
  @UseInterceptors(FileInterceptor('cover'))
  @UseGuards(JwtAuthGuard)
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
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.booksService.findAll()
  }

  @Get('getBooksByCategory')
  @UseGuards(JwtAuthGuard)
  findBooksByCategory(@Query('category') category: number) {
    return this.booksService.findBooksByCategory(Number(category))
  }

  @Delete('deleteBook')
  @UseGuards(JwtAuthGuard)
  remove(@Query('id') id: string) {
    return this.booksService.delete(id)
  }

  @Put('updateBook')
  @UseGuards(JwtAuthGuard)
  updateBook(@Body() input: InputUpdateBookDto) {
    return this.booksService.updateBook(input)
  }

  @UseGuards(JwtAuthGuard)
  @Get('searchBookByTitle')
  searchBookByTitle(@Query('title') title: string) {
    return this.booksService.findBooksByTitle(title)
  }
}
