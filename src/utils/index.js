import OSS from 'ali-oss';

// 配置阿里云 OSS 访问密钥和 Bucket 地址
const client = new OSS({
    region: 'oss-cn-hongkong',
    accessKeyId: 'LTAI5tGXJjPFqwm7Kck8VopQ',
    accessKeySecret: 'qpiC2x5s2SJEXDIqh0Tb0QTlnkymFC',
    bucket: 'webcam-ace-recognition',
});

// 将 Base64 图片转换为 Blob 对象
function dataURItoBlob(dataURI) {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], {type: mimeString});
}

// 上传图片
const uploadImage = function uploadImage(base64Data) {
    const blobData = dataURItoBlob(base64Data);
    const result = client.put('your-object-key', blobData);
    console.log()
    return result.url;
}

export default uploadImage
