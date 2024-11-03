import { Module } from '@nestjs/common'
import { S3Service } from './s3.service'
import { S3Client } from '@aws-sdk/client-s3'
import { ConfigService } from '@nestjs/config'
import { ErrorsModule } from '../errors/errors.module'

@Module({
  providers: [
    {
      provide: 'S3_CLIENT',
      useFactory: (configService: ConfigService) => {
        return new S3Client({
          region: configService.getOrThrow<string>('AWS_REGION'),
          credentials: {
            accessKeyId: configService.getOrThrow<string>('AWS_ACCESS_KEY_ID'),
            secretAccessKey: configService.getOrThrow<string>(
              'AWS_SECRET_ACCESS_KEY'
            )
          }
        })
      },
      inject: [ConfigService]
    },
    S3Service
  ],
  exports: ['S3_CLIENT', S3Service],
  imports: [ErrorsModule]
})
export class S3Module {}
