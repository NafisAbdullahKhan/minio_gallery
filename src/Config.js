export default async function Config() {
    const response = await fetch("/config.json");
    const config = await response.json();
    console.log(config);
    return config;
    // this.baseUrl = config.baseUrl;
    // // this.baseUrlSSL = config.baseUrlSSL;
    // this.bucket = config.bucket;
    // this.accessKeyId = config.accessKeyId;
    // this.secretAccessKey = config.secretAccessKey;
}