import { Module } from '@nestjs/common'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'
import { DynamodbModule } from 'src/modules/dynamodb/dynamodb.module'
import { UsersRepository } from './usersRepository'

@Module({
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  exports: [UsersService],
  imports: [DynamodbModule]
})
export class UsersModule {}
