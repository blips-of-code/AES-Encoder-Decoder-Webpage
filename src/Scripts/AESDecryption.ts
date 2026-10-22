// Utility Functions
// import multiplyMatrixes from './MatrixMultiplication';
import { 
    split_string_into_matrix,
    merge_matrix_into_string,
    string_to_numarray,
    } from './AESEncryption';
 import { undo_shiftRows } from './ShiftRows';
 import { inverseAddRoundKey } from './AddRoundKey';
 import { inverseSubBytes } from './SubBytes';
 import { inverseMixColumns } from './GaloisMatrixMult';
 import { expandKey } from './ExpandKey';

 import type { Matrix } from './AESTypes';


// This file is the main script for AES decryption, tying together all 4 steps inversely.
// May be used for the second project?


// -- Functions --

/**
   * Decrypts a given ciphertext using our custom AES decryption.
   * @param _ciphertext - The ciphertext to decrypt.
   * @param _key - The key to use for decryption.
   * @returns The decrypted plaintext.
   */
export default function decryptAES(_ciphertext: string, _key: string): string {
    // number of rounds (same as encryption)
    const round_count = 10;

    // Expand master Key to get round keys
    const mkey_array: number[] = string_to_numarray(_key);
    const round_keys: Matrix[] = expandKey(mkey_array);

    // split the ciphertext into 16-byte matrix blocks
    const ciphertext_matrices: Matrix[] = split_string_into_matrix(_ciphertext,16);

    // make an array to hold the plaintext matrices
    const plaintext_matrices: Matrix[] = [];

    // loop through the ciphertext blocks
    for(let j=0; j<ciphertext_matrices.length; j++){
        
        // Step 4: invert the final round key
        let current_matrix = inverseAddRoundKey(ciphertext_matrices[j], round_keys[10]);

        // Step 3: inverse matrix multiplication (skip because this is the inverse final round)

        // Step 2: inverse shift rows
        const unshiftedrowsMatrix:Matrix = undo_shiftRows(current_matrix);

        // Step 1: inverse shift bytes
        const unsubstituteMatrix:Matrix = inverseSubBytes(unshiftedrowsMatrix);

        // save the current state of the matrix, ready for the loop
        current_matrix = unsubstituteMatrix;

        // Loop round-count-1 times (9 times, like with encryption)
        for(let i=0; i < round_count-1; i++){
            // Step 4: inverse round key
            const undoroundkeyMatrix:Matrix = inverseAddRoundKey(current_matrix,round_keys[round_count-1-i]);

            // Step 3: inverse matrix multiplication
            const unshiftedcolsMatrix:Matrix = inverseMixColumns(undoroundkeyMatrix);

            // Step 2: inverse Shift Rows
            const unshiftedrowsMatrix:Matrix = undo_shiftRows(unshiftedcolsMatrix);

            // Step 1: inverse Sub Bytes
            const unsubstituteMatrix:Matrix = inverseSubBytes(unshiftedrowsMatrix);

            // save current state of the matrix for the next loop
            current_matrix = unsubstituteMatrix;
        }

        // undo the initial round key, this is our final plaintext for this block
        const undoroundkeyMatrix:Matrix = inverseAddRoundKey(current_matrix,round_keys[0]);

        // this block is all done, add it to the array of complete plaintext blocks!
        plaintext_matrices.push(undoroundkeyMatrix);
    }

    // convert the plaintext blocks back into a single string
    const plaintext:string = merge_matrix_into_string(plaintext_matrices);

    // Returns the decrypted plaintext.
    return plaintext;
}