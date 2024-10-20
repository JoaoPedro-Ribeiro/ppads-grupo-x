import { Module } from '@nestjs/common'
import { UsersModule } from './modules/users/users.module'
import { AuthModule } from './modules/auth/auth.module'
import { ConfigModule } from '@nestjs/config'
import { DynamodbModule } from './modules/dynamodb/dynamodb.module'
import { CategoriesModule } from './modules/categories/categories.module'
import { BooksModule } from './modules/books/books.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    AuthModule,
    CategoriesModule,
    BooksModule,
    DynamodbModule
  ]
})
export class AppModule {}
