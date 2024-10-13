import { Module } from '@nestjs/common'
import { UsersModule } from './modules/users/users.module'
import { AuthModule } from './modules/auth/auth.module'
import { ConfigModule } from '@nestjs/config'
import { DynamodbModule } from './modules/dynamodb/dynamodb.module'
import { LivrosModule } from './modules/livros/livros.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    AuthModule,
    DynamodbModule,
    LivrosModule]
})
export class AppModule {}
