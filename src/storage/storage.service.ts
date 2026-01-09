import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

@Injectable()
export class StorageService {
  private client: S3Client;

  constructor(private configService: ConfigService) {
    this.client = new S3Client({
      region: this.configService.get("S3_REGION", "us-east-1"),
      endpoint: this.configService.get("S3_ENDPOINT"),
      forcePathStyle: this.configService.get("S3_FORCE_PATH_STYLE") === "true",
      credentials: {
        accessKeyId: this.configService.getOrThrow("S3_ACCESS_KEY"),
        secretAccessKey: this.configService.getOrThrow("S3_SECRET_KEY")
      }
    });
  }

  async createPresignedUpload(key: string, contentType: string, expiresInSeconds = 900) {
    const bucket = this.configService.getOrThrow("S3_BUCKET");
    const command = new PutObjectCommand({ Bucket: bucket, Key: key, ContentType: contentType });
    const url = await getSignedUrl(this.client, command, { expiresIn: expiresInSeconds });
    return { url, key, bucket };
  }
}
