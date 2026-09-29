// Utility Functions
import multiplyMatrixes from './MatrixMultiplication';

// Classes & Types
import type { Matrix } from './AESTypes';


// This file is the main script for AES encryption, tying together all 4 steps.


// -- Functions --

/**
   * Encrypts a given plaintext using our custom AES encryption.
   * @param _plaintext - The plaintext to encrypt.
   * @param _key - The key to use for encryption.
   * @returns The encrypted ciphertext.
   */
export default function encryptAES(_plaintext: string, _key: string): string {
    // Step 1: Substitute bytes using s-box lookup table.
    // Add functionality here.

    // Step 2: Shift rows of the state matrix.
    // Add functionality here.

    // Step 3: Matrix multiplication.
    const resultingMatrix: Matrix = multiplyMatrixes([[1, 2], [3, 4]], [[5, 6], [7, 8]]);

    // Step 4: Add round key
    // Add functionality here.

    // Returns the AES-encrypted ciphertext.
    return "Implement AES ciphertext generation.";
}