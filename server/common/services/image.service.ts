import 'reflect-metadata';
import { randomUUID } from 'crypto';
import type { H3Event } from 'h3';
import { inject, injectable } from 'tsyringe';
import { logger } from 'server/common/decorators/logger.decorator';
import { ImageRepository } from 'server/common/repositories/image.repository';
import type { LoggerService } from 'server/common/services';

@logger('image.service')
@injectable()
export class ImageService {
  blob = hubBlob();
  logger: LoggerService;

  constructor(
    @inject(ImageRepository) private imageRepository: ImageRepository,
  ) {}

  async upload(event: H3Event, entityType: string, entityId: string) {
    this.logger.log(`Uploading image ${entityType}`, { entityType, entityId });
    const blobObjects = await this.blob.handleUpload(event);
    const uploadedImages = blobObjects.map(blob => ({
      uuid: this.generateUUID(),
      url: blob.pathname,
      entityId,
      entityType,
      size: blob.size,
      mimeType: blob.contentType,
      metadata: JSON.stringify(blob.customMetadata || {}),
      createdAt: new Date(),
    }));

    this.logger.log('Images to upload: ', uploadedImages);

    return uploadedImages;
  }

  private generateUUID(): string {
    return randomUUID();
  }
}
