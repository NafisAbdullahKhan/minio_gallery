import { S3Client } from "@aws-sdk/client-s3";

export default function S3Init() {
    const config = window.config;

    return new S3Client({
        region: "us-east-1",
        credentials: {
            accessKeyId: config.accessKeyId,
            secretAccessKey: config.secretAccessKey,
        },
        endpoint: config.baseUrl,
        forcePathStyle: true,
    });
}