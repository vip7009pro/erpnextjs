export async function encryptData(
    publicKey: string,
    data: object
  ): Promise<{ encryptedData: string; encryptedKey: string; iv: string }> {
    try {
      // Chuyển object thành chuỗi JSON
      const dataString = JSON.stringify(data);
      // Tạo khóa AES ngẫu nhiên
      const aesKey = await crypto.subtle.generateKey(
        { name: "AES-GCM", length: 256 },
        true,
        ["encrypt", "decrypt"]
      );
      // Tạo initialization vector (IV)
      const iv = crypto.getRandomValues(new Uint8Array(12));
      // Mã hóa dữ liệu bằng AES-GCM
      const encodedData = new TextEncoder().encode(dataString);
      const encryptedData = await crypto.subtle.encrypt(
        { name: "AES-GCM", iv },
        aesKey,
        encodedData
      );
      // Export khóa AES để mã hóa bằng RSA
      const exportedKey = await crypto.subtle.exportKey("raw", aesKey);
      // Chuyển publicKey từ PEM sang ArrayBuffer
      const publicKeyBuffer = pemToArrayBuffer(publicKey);
      // Import public key
      const importedKey = await crypto.subtle.importKey(
        "spki",
        publicKeyBuffer,
        { name: "RSA-OAEP", hash: "SHA-256" },
        false,
        ["encrypt"]
      );
      // Mã hóa khóa AES bằng RSA
      const encryptedKey = await crypto.subtle.encrypt(
        { name: "RSA-OAEP" },
        importedKey,
        exportedKey
      );
      // Chuyển dữ liệu mã hóa, khóa, và IV thành base64
      return {
        encryptedData: arrayBufferToBase64(encryptedData),
        encryptedKey: arrayBufferToBase64(encryptedKey),
        iv: arrayBufferToBase64(iv),
      };
    } catch (error: unknown) {
      // Ép kiểu error thành Error và kiểm tra an toàn
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      console.error("Encryption error:", error);
      throw new Error(`Failed to encrypt data: ${errorMessage}`);
    }
  }
  // Hàm hỗ trợ chuyển PEM sang ArrayBuffer
  function pemToArrayBuffer(pem: string): ArrayBuffer {
    try {
      const b64 = pem
        .replace(/-----BEGIN PUBLIC KEY-----/, "")
        .replace(/-----END PUBLIC KEY-----/, "")
        .replace(/\s/g, "");
      const binary = atob(b64);
      const buffer = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) {
        buffer[i] = binary.charCodeAt(i);
      }
      return buffer.buffer;
    } catch (error: unknown) {
      throw new Error("Invalid public key format");
    }
  }
  // Hàm hỗ trợ chuyển ArrayBuffer sang base64
  function arrayBufferToBase64(buffer: ArrayBuffer | Uint8Array): string {
    const bytes = buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer);
    let binary = "";
    for (let i = 0; i < bytes.length; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  }