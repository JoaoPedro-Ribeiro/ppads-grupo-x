import { Module } from '@nestjs/common'
import { CategoriesController } from './categories.controller'
import { CategoriesService } from './categories.service'
import { DynamodbModule } from 'src/modules/dynamodb/dynamodb.module'
import { CategoriesRepository } from '../../dynamodb/repositories/categoriesRepository'

@Module({
  controllers: [CategoriesController],
  providers: [CategoriesService, CategoriesRepository],
  exports: [CategoriesService],
  imports: [DynamodbModule]
})
export class CategoriesModule {}
