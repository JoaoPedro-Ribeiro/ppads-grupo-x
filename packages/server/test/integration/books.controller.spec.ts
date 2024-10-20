import { Test, TestingModule } from '@nestjs/testing'
import { BooksController } from 'src/modules/books/books.controller'
import { BooksService } from 'src/modules/books/books.service'

describe('BooksController', () => {
  let controller: BooksController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [BooksService]
    }).compile()

    controller = module.get<BooksController>(BooksController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
