// generate public and private key for  tokens

import { writeFileSync } from 'fs';
import { generateKeyPairSync } from 'crypto';

const { publicKey, privateKey } = generateKeyPairSync('rsa', {
  modulusLength: 2048, // 2048-bit key
  publicKeyEncoding: {
    type: 'pkcs1',
    format: 'pem',
  },
  privateKeyEncoding: {
    type: 'pkcs1',
    format: 'pem',
  },
});

// Save keys to files
writeFileSync('private.key', privateKey);
writeFileSync('public.key', publicKey);

console.log('✅ RSA Key Pair Generated!');
