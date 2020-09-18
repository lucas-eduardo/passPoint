import { AES, enc, LibWordArray } from 'crypto-js';

export const encrypt = (text: string | LibWordArray): string => {
  const encryptedText = String(
    AES.encrypt(text, process.env.SECRET_KEY as string),
  );

  return encryptedText;
};

export const decryp = (textEncrypted: string): string => {
  const bytes = AES.decrypt(textEncrypted, process.env.SECRET_KEY as string);
  const unencryptedText = bytes.toString(enc.Utf8);

  return unencryptedText;
};
