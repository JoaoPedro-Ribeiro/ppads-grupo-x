import { Module } from '@nestjs/common'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'
import { DynamodbModule } from 'src/modules/dynamodb/dynamodb.module'
import { UsersRepository } from '../dynamodb/repositories/usersRepository'
import { ErrorsModule } from '../errors/errors.module'

@Module({
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  exports: [UsersService],
  imports: [DynamodbModule, ErrorsModule]
})
export class UsersModule {}
