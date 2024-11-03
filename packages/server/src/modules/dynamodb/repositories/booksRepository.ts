import { Injectable } from '@nestjs/common'
import { InputCreateBookDto } from 'src/modules/books/dto/inputCreateBook.dto'
import { InputUpdateBookDto } from 'src/modules/books/dto/inputUpdateBook.dto'
import { v4 as uuid } from 'uuid'
import { BooksModel } from '../schemas/books.schema'

@Injectable()
export class BooksRepository {
  async createBook(data: InputCreateBookDto): Promise<{ success: boolean }> {
    try {
      await BooksModel.create({
        id: uuid(),
        ...data,
        category: Number(data.category),
        amount: Number(data.amount)
      })
      return { success: true }
    } catch (error) {
      console.debug('BooksRepository :: createBook :: DynamoError -> ', error)
      return { success: false }
    }
  }

  async findAllBooks(): Promise<{ success: boolean; data: any[] }> {
    try {
      const books = await BooksModel.scan().exec()
      return { success: true, data: books }
    } catch (error) {
      console.debug('BooksRepository :: findAllBooks :: DynamoError -> ', error)
      return { success: false, data: [] }
    }
  }

  async findBookById(
    id: string
  ): Promise<{ success: boolean; data: any | null }> {
    try {
      const book = await BooksModel.get(id)
      return { success: true, data: book }
    } catch (error) {
      console.debug('BooksRepository :: findBookById :: DynamoError -> ', error)
      return { success: false, data: null }
    }
  }

  async findBooksByCategory(
    category: number
  ): Promise<{ success: boolean; data: any[] }> {
    try {
      const books = await BooksModel.query('category').eq(category).exec()
      return { success: true, data: books }
    } catch (error) {
      console.debug(
        'BooksRepository :: findBooksByCategory :: DynamoError -> ',
        error
      )
      return { success: false, data: [] }
    }
  }

  async deleteBookById(id: string): Promise<{ success: boolean }> {
    try {
      await BooksModel.delete(id)
      return { success: true }
    } catch (error) {
      console.debug(
        'BooksRepository :: deleteBookById :: DynamoError -> ',
        error
      )
      return { success: false }
    }
  }

  async updateBook(
    input: InputUpdateBookDto
  ): Promise<{ success: boolean; message?: string }> {
    try {
      const { id, ...updates } = input
      const existingBook = await BooksModel.get(id)

      if (!existingBook) {
        return { success: false, message: 'Livro não encontrado' }
      }

      if (updates.category !== undefined) {
        updates.category = Number(updates.category)
      }

      if (updates.amount !== undefined) {
        updates.amount = Number(updates.amount)
      }

      await BooksModel.update({ id }, updates)
      return { success: true }
    } catch (error) {
      console.debug('BooksRepository :: updateBook :: DynamoError -> ', error)
      return { success: false, message: 'Erro ao atualizar o livro' }
    }
  }

  async findBooksByTitle(title: string) {
    try {
      const books = await await BooksModel.scan('name').contains(title).exec()
      return { success: true, data: books }
    } catch (error) {
      console.debug(
        'BooksRepository :: findBooksByTitle :: DynamoError -> ',
        error
      )
      return { success: false, data: [] }
    }
  }
}
