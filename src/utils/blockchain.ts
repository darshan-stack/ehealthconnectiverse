
// This is a mock implementation of blockchain functionality for demonstration purposes

interface BlockchainRecord {
  id: string;
  timestamp: number;
  data: any;
  previousHash: string;
  hash: string;
}

interface UserCredential {
  aadharNumber: string;
  hashedPassword: string;
  userId: string;
}

// Mock function to hash data (in a real implementation, this would use a proper cryptographic hash function)
const hashData = (data: any): string => {
  const stringData = JSON.stringify(data);
  let hash = 0;
  for (let i = 0; i < stringData.length; i++) {
    const char = stringData.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash.toString(16).padStart(8, '0');
};

// Mock in-memory storage for our "blockchain"
const blockchainLedger: BlockchainRecord[] = [];
const userCredentials: UserCredential[] = [];

// Add the genesis block
blockchainLedger.push({
  id: 'genesis',
  timestamp: Date.now(),
  data: { message: 'Genesis Block for eHealthWave' },
  previousHash: '0000000000000000',
  hash: hashData({ message: 'Genesis Block for eHealthWave', timestamp: Date.now(), previousHash: '0000000000000000' })
});

// Function to add a new record to our blockchain
export const addRecordToBlockchain = (data: any): BlockchainRecord => {
  const previousBlock = blockchainLedger[blockchainLedger.length - 1];
  const newBlock: BlockchainRecord = {
    id: `block_${blockchainLedger.length}`,
    timestamp: Date.now(),
    data,
    previousHash: previousBlock.hash,
    hash: '',
  };
  
  // Calculate hash including all previous data
  newBlock.hash = hashData({ 
    data, 
    timestamp: newBlock.timestamp, 
    previousHash: newBlock.previousHash 
  });
  
  blockchainLedger.push(newBlock);
  return newBlock;
};

// Function to register a user in the blockchain
export const registerUserOnBlockchain = (aadharNumber: string, password: string): string => {
  // Check if user already exists
  const existingUser = userCredentials.find(u => u.aadharNumber === aadharNumber);
  if (existingUser) {
    throw new Error('User with this Aadhar number already exists');
  }
  
  // Create a new user ID
  const userId = `user_${Math.random().toString(36).substring(2, 9)}`;
  
  // Hash the password
  const hashedPassword = hashData(password);
  
  // Create user credential
  const newUserCredential: UserCredential = {
    aadharNumber,
    hashedPassword,
    userId,
  };
  
  // Add to our "database"
  userCredentials.push(newUserCredential);
  
  // Add to blockchain as a record
  addRecordToBlockchain({
    type: 'USER_REGISTRATION',
    userId,
    aadharNumber,
    timestamp: Date.now(),
  });
  
  return userId;
};

// Function to authenticate a user
export const authenticateUser = (aadharNumber: string, password: string): boolean => {
  const user = userCredentials.find(u => u.aadharNumber === aadharNumber);
  if (!user) return false;
  
  const hashedPassword = hashData(password);
  return user.hashedPassword === hashedPassword;
};

// Function to add a medical record to the blockchain
export const addMedicalRecord = (userId: string, recordData: any): BlockchainRecord => {
  const record = {
    type: 'MEDICAL_RECORD',
    userId,
    data: recordData,
    timestamp: Date.now(),
  };
  
  return addRecordToBlockchain(record);
};

// Function to get all medical records for a user
export const getUserMedicalRecords = (userId: string): any[] => {
  return blockchainLedger
    .filter(block => 
      block.data.type === 'MEDICAL_RECORD' && 
      block.data.userId === userId
    )
    .map(block => ({
      id: block.id,
      timestamp: block.data.timestamp,
      data: block.data.data,
      hash: block.hash,
    }));
};

// Function to verify the integrity of the blockchain
export const verifyBlockchain = (): boolean => {
  for (let i = 1; i < blockchainLedger.length; i++) {
    const currentBlock = blockchainLedger[i];
    const previousBlock = blockchainLedger[i - 1];
    
    // Verify previous hash
    if (currentBlock.previousHash !== previousBlock.hash) {
      return false;
    }
    
    // Verify current hash
    const calculatedHash = hashData({
      data: currentBlock.data,
      timestamp: currentBlock.timestamp,
      previousHash: currentBlock.previousHash,
    });
    
    if (calculatedHash !== currentBlock.hash) {
      return false;
    }
  }
  
  return true;
};
