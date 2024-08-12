import { generateKeyPairSync } from "crypto";

// 生成 secp256r1 (也称为 P-256) 密钥对
const { publicKey, } = generateKeyPairSync('ec', {
  namedCurve: 'prime256v1',
  publicKeyEncoding: {
    type: 'spki',
    format: 'pem'
  },
  privateKeyEncoding: {
    type: 'pkcs8',
    format: 'pem'
  }
});

// 将 PEM 格式的公钥转换为 DER 格式
const pemToDer = (pem: string): Buffer => {
    // 移除 PEM 头部和尾部
    const pemHeader = '-----BEGIN PUBLIC KEY-----';
    const pemFooter = '-----END PUBLIC KEY-----';
    const pemContents = pem
      .replace(pemHeader, '')
      .replace(pemFooter, '')
      .replace(/\n/g, '');
  
    // 使用 Base64 解码
    return Buffer.from(pemContents, 'base64');
};

// 打印生成的公钥和私钥
console.log('Public Key:', pemToDer(publicKey).toString('base64'));