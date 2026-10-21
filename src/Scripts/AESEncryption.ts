// Utility Functions
import multiplyMatrixes from './MatrixMultiplication';
import { addRoundKey } from './AddRoundKey';
import { shiftRows } from './ShiftRows';
import { subBytes } from './SubBytes';

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
    const substitutedMatrix: Matrix = subBytes([[1, 2], [3, 4]]);

    // Step 2: Shift rows of the state matrix.
    const matrixWithShiftedRows: Matrix = shiftRows(substitutedMatrix);

    // Step 3: Matrix multiplication.
    const multipliedMatrix: Matrix = multiplyMatrixes(matrixWithShiftedRows, matrixWithShiftedRows);

    // Step 4: Add round key
    const matrixAfterRoundKey: Matrix = addRoundKey(multipliedMatrix, multipliedMatrix);

    // Returns the AES-encrypted ciphertext.
    return "Implement AES ciphertext generation.";
}