
import { addRecordToBlockchain } from './blockchain';

// Types for Bluetooth token sharing
export interface BluetoothToken {
  tokenId: string;
  patientId: string;
  createdAt: number;
  expiresAt: number;
  usedBy: string | null;
  usedAt: number | null;
  accessLevel: 'read' | 'write';
  dataScope: 'full' | 'limited' | 'emergency';
}

// Mock in-memory storage for bluetooth tokens
const tokens: BluetoothToken[] = [];

export class BluetoothTokenService {
  // Generate a new token for sharing
  static generateToken(
    patientId: string,
    validityMinutes: number = 30,
    accessLevel: 'read' | 'write' = 'read',
    dataScope: 'full' | 'limited' | 'emergency' = 'limited'
  ): BluetoothToken {
    // Generate random token ID (in production would be more secure)
    const tokenId = Math.random().toString(36).substring(2, 15) + 
                   Math.random().toString(36).substring(2, 15);
    
    const createdAt = Date.now();
    const expiresAt = createdAt + (validityMinutes * 60 * 1000);
    
    const token: BluetoothToken = {
      tokenId,
      patientId,
      createdAt,
      expiresAt,
      usedBy: null,
      usedAt: null,
      accessLevel,
      dataScope
    };
    
    // Store token
    tokens.push(token);
    
    // Add to blockchain for auditing
    addRecordToBlockchain({
      type: 'BLUETOOTH_TOKEN_GENERATED',
      tokenId,
      patientId,
      timestamp: createdAt,
      expiresAt,
      accessLevel,
      dataScope
    });
    
    return token;
  }
  
  // Verify and use a token
  static useToken(tokenId: string, providerId: string): BluetoothToken | null {
    const now = Date.now();
    const tokenIndex = tokens.findIndex(t => t.tokenId === tokenId && t.expiresAt > now && !t.usedBy);
    
    if (tokenIndex === -1) {
      return null;
    }
    
    // Mark token as used
    tokens[tokenIndex].usedBy = providerId;
    tokens[tokenIndex].usedAt = now;
    
    // Add to blockchain for auditing
    addRecordToBlockchain({
      type: 'BLUETOOTH_TOKEN_USED',
      tokenId,
      patientId: tokens[tokenIndex].patientId,
      providerId,
      timestamp: now,
      accessLevel: tokens[tokenIndex].accessLevel,
      dataScope: tokens[tokenIndex].dataScope
    });
    
    return tokens[tokenIndex];
  }
  
  // Get active tokens for a patient
  static getActiveTokens(patientId: string): BluetoothToken[] {
    const now = Date.now();
    return tokens.filter(t => t.patientId === patientId && t.expiresAt > now);
  }
  
  // Revoke a specific token
  static revokeToken(tokenId: string): boolean {
    const tokenIndex = tokens.findIndex(t => t.tokenId === tokenId);
    
    if (tokenIndex === -1) {
      return false;
    }
    
    // Mark token as expired
    tokens[tokenIndex].expiresAt = Date.now();
    
    // Add to blockchain for auditing
    addRecordToBlockchain({
      type: 'BLUETOOTH_TOKEN_REVOKED',
      tokenId,
      patientId: tokens[tokenIndex].patientId,
      timestamp: Date.now()
    });
    
    return true;
  }
  
  // Revoke all active tokens for a patient
  static revokeAllTokens(patientId: string): number {
    const now = Date.now();
    const activeTokens = tokens.filter(t => t.patientId === patientId && t.expiresAt > now);
    
    activeTokens.forEach(token => {
      token.expiresAt = now;
      
      // Add to blockchain for auditing
      addRecordToBlockchain({
        type: 'BLUETOOTH_TOKEN_REVOKED',
        tokenId: token.tokenId,
        patientId,
        timestamp: now
      });
    });
    
    return activeTokens.length;
  }
  
  // Format token for display
  static formatTokenForDisplay(token: BluetoothToken): string {
    // Format as 4 character groups for readability
    const formattedToken = token.tokenId.match(/.{1,4}/g)?.join('-') || token.tokenId;
    return formattedToken.toUpperCase();
  }
}
