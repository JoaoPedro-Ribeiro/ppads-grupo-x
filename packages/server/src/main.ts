import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { AllExceptionsFilter } from './all-exceptions.filter'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.enableCors({
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
    credentials: true
  })

  app.useGlobalPipes(new ValidationPipe())

  app.useGlobalFilters(new AllExceptionsFilter())

  await app.listen(3000)
}
bootstrap()
