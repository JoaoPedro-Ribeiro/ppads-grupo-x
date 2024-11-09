import { Inject, Injectable } from '@nestjs/common'
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand
} from '@aws-sdk/client-s3'
import { v4 as uuidv4 } from 'uuid'
import { ErrorsService } from '../errors/errors.service'

@Injectable()
export class S3Service {
  private readonly s3: S3Client
  private readonly bucketName = 'books-cover'

  constructor(@Inject('S3_CLIENT') private readonly s3Client: S3Client) {
    this.s3 = s3Client
  }

  async uploadFile(fileBuffer: Buffer, fileName: string) {
    const formattedFileName = fileName
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-zA-Z0-9]/g, '')
      .replace(/\s+/g, '')
      .toLowerCase()

    const uniqueFileName = `${uuidv4()}-${formattedFileName}`

    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: uniqueFileName,
      Body: fileBuffer,
      ContentType: 'image/jpeg'
    })

    try {
      await this.s3.send(command)
      return `https://${this.bucketName}.s3.amazonaws.com/${uniqueFileName}`
    } catch (error) {
      console.debug('S3 Service :: UploadCover :: S3Error -> ', error)
      throw ErrorsService.failToUploadFile()
    }
  }

  async deleteFile(fileName: string) {
    const command = new DeleteObjectCommand({
      Bucket: this.bucketName,
      Key: fileName
    })

    try {
      await this.s3.send(command)
    } catch (error) {
      console.debug('S3 Service :: DeleteFile :: S3Error -> ', error)
      throw ErrorsService.failToDeleteFile()
    }
  }
}
