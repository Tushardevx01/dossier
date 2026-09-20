/**
 * File Validation for Credential Storage
 *
 * Validates uploaded files server-side using file size boundaries,
 * file extensions, and cryptographic magic bytes inspections.
 */

export interface ValidatedFile {
  buffer: Buffer;
  mimeType: string;
  extension: string;
  size: number;
}

export interface FileValidationOptions {
  maxSizeBytes?: number;
  allowedTypes?: ('pdf' | 'png' | 'jpg' | 'jpeg' | 'webp')[];
}

const DEFAULT_MAX_CERT_SIZE = 15 * 1024 * 1024; // 15 MB
const DEFAULT_MAX_THUMB_SIZE = 5 * 1024 * 1024; // 5 MB

/**
 * Detect file MIME type and normalized extension from buffer header bytes.
 */
export function detectMimeFromMagicBytes(buffer: Buffer): { mimeType: string; extension: string } | null {
  if (buffer.length < 12) {
    return null;
  }

  // PDF: starts with %PDF- (0x25, 0x50, 0x44, 0x46)
  if (
    buffer[0] === 0x25 &&
    buffer[1] === 0x50 &&
    buffer[2] === 0x44 &&
    buffer[3] === 0x46
  ) {
    return { mimeType: 'application/pdf', extension: 'pdf' };
  }

  // PNG: 0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A
  if (
    buffer[0] === 0x89 &&
    buffer[1] === 0x50 &&
    buffer[2] === 0x4e &&
    buffer[3] === 0x47 &&
    buffer[4] === 0x0d &&
    buffer[5] === 0x0a &&
    buffer[6] === 0x1a &&
    buffer[7] === 0x0a
  ) {
    return { mimeType: 'image/png', extension: 'png' };
  }

  // JPEG / JPG: 0xFF, 0xD8, 0xFF
  if (buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) {
    return { mimeType: 'image/jpeg', extension: 'jpg' };
  }

  // WEBP: RIFF....WEBP (0x52, 0x49, 0x46, 0x46 ... 0x57, 0x45, 0x42, 0x50)
  if (
    buffer[0] === 0x52 &&
    buffer[1] === 0x49 &&
    buffer[2] === 0x46 &&
    buffer[3] === 0x46 &&
    buffer[8] === 0x57 &&
    buffer[9] === 0x45 &&
    buffer[10] === 0x42 &&
    buffer[11] === 0x50
  ) {
    return { mimeType: 'image/webp', extension: 'webp' };
  }

  return null;
}

/**
 * Validate an uploaded file object or buffer.
 */
export async function validateCredentialFile(
  fileInput: File | Blob | Buffer,
  options: FileValidationOptions = {}
): Promise<ValidatedFile> {
  const maxBytes = options.maxSizeBytes ?? DEFAULT_MAX_CERT_SIZE;
  const allowed = options.allowedTypes ?? ['pdf', 'png', 'jpg', 'jpeg', 'webp'];

  let buffer: Buffer;
  let clientFilename = '';

  if (fileInput instanceof Buffer) {
    buffer = fileInput;
  } else if (fileInput instanceof Blob || fileInput instanceof File) {
    const arrayBuffer = await fileInput.arrayBuffer();
    buffer = Buffer.from(arrayBuffer);
    if ('name' in fileInput && typeof fileInput.name === 'string') {
      clientFilename = fileInput.name;
    }
  } else {
    throw new Error('Invalid file input');
  }

  if (buffer.length === 0) {
    throw new Error('Uploaded file is empty');
  }

  if (buffer.length > maxBytes) {
    const maxMb = Math.round(maxBytes / (1024 * 1024));
    throw new Error(`File size exceeds the ${maxMb}MB limit`);
  }

  // Check client extension if available
  if (clientFilename) {
    const ext = clientFilename.split('.').pop()?.toLowerCase() ?? '';
    const normalizedExt = ext === 'jpeg' ? 'jpg' : ext;
    if (!allowed.includes(normalizedExt as 'pdf' | 'png' | 'jpg' | 'jpeg' | 'webp')) {
      throw new Error(`Unsupported file extension: .${ext}. Allowed extensions: ${allowed.join(', ')}`);
    }
  }

  // Deep inspect magic bytes
  const magic = detectMimeFromMagicBytes(buffer);
  if (!magic) {
    throw new Error('File content does not match any accepted format (PDF, PNG, JPG, WEBP)');
  }

  const normalizedDetected = magic.extension === 'jpeg' ? 'jpg' : magic.extension;
  if (!allowed.includes(normalizedDetected as 'pdf' | 'png' | 'jpg' | 'jpeg' | 'webp')) {
    throw new Error(`Detected file type (${magic.mimeType}) is not allowed for this field`);
  }

  return {
    buffer,
    mimeType: magic.mimeType,
    extension: magic.extension,
    size: buffer.length,
  };
}

/**
 * Generate safe, normalized storage keys for Cloudflare R2.
 * Never uses the user's raw client filename.
 *
 * Example: credentials/42/certificate-1718900000000.pdf
 */
export function generateSafeStorageKey(
  credentialId: string | number,
  type: 'certificate' | 'thumbnail',
  extension: string
): string {
  const sanitizedId = String(credentialId).replace(/[^a-zA-Z0-9_-]/g, '');
  const cleanExt = extension.replace(/^\./, '').toLowerCase();
  const timestamp = Date.now();
  return `credentials/${sanitizedId || 'draft'}/${type}-${timestamp}.${cleanExt}`;
}

export { DEFAULT_MAX_CERT_SIZE, DEFAULT_MAX_THUMB_SIZE };
