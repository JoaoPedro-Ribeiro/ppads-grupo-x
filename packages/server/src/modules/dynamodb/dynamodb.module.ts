import { Module, Global } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: 'DYNAMODB',
      useFactory: (configService: ConfigService) => {
        AWS.config.update({
          region: configService.get<string>('AWS_REGION'),
          accessKeyId: configService.get<string>('AWS_ACCESS_KEY_ID'),
          secretAccessKey: configService.get<string>('AWS_SECRET_ACCESS_KEY'),
        });
        return new AWS.DynamoDB.DocumentClient();
      },
      inject: [ConfigService],
    },
  ],
  exports: ['DYNAMODB'],
})
export class DynamodbModule {}
