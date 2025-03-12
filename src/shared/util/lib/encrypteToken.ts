import CryptoJS from 'crypto-js';


const SECRET_KEY = process.env.NEXT_PUBLIC_SECRET_KEY as string ;

/**
 * 토큰을 암호화합니다
 * @param token 암호화할 토큰 문자열
 * @returns 암호화된 문자열
 */
export function encryptToken(token: string): string {
  if (!token) return '';
  
  try {
    const encrypted = CryptoJS.AES.encrypt(token, SECRET_KEY).toString();
    return encrypted;
  } catch (error) {
    console.error('토큰 암호화 실패:', error);
    throw new Error('토큰 암호화 중 오류가 발생했습니다');
  }
}

/**
 * 암호화된 토큰을 복호화합니다
 * @param encryptedToken 암호화된 토큰 문자열
 * @returns 복호화된 원본 토큰
 */
export  function decryptToken(encryptedToken: string): string {
  if (!encryptedToken) return '';
  
  try {
    const decrypted = CryptoJS.AES.decrypt(encryptedToken, SECRET_KEY);
    return decrypted.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    console.error('토큰 복호화 실패:', error);
    throw new Error('토큰 복호화 중 오류가 발생했습니다');
  }
}

/**
 * 토큰을 안전하게 해싱합니다 (복호화 불가능, 인증 비교용)
 * @param token 해싱할 토큰
 * @returns 해시된 토큰 문자열
 */
export  function hashToken(token: string): string {
  return CryptoJS.SHA256(token).toString();
}