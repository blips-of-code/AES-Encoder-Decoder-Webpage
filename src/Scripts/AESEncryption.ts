// Utility Functions
import multiplyMatrixes from './MatrixMultiplication';
import { addRoundKey, bytesToMatrix, matrixToBytes } from './AddRoundKey';
import { shiftRows } from './ShiftRows';
import { subBytes } from './SubBytes';

// Classes & Types
import type { Matrix } from './AESTypes';
import { expandKey } from './ExpandKey';
import { MixColumns } from './GaloisMatrixMult';


// This file is the main script for AES encryption, tying together all 4 steps.
// References:
// https://www.geeksforgeeks.org/computer-networks/advanced-encryption-standard-aes/ 
// https://medium.com/@atulit23/aes-encryption-i-how-it-works-d93f8cc8193e 
// https://xilinx.github.io/Vitis_Libraries/security/2021.1/guide_L1/internals/iaes.html
// (additional references listed in comment above the function for which they are used)

// -- Functions --

/**
   * Encrypts a given plaintext using our custom AES encryption.
   * @param _plaintext - The plaintext to encrypt.
   * @param _key - The key to use for encryption.
   * @returns The encrypted ciphertext.
   */
export default function encryptAES(_plaintext: string, _key: string): string {
    // Number of rounds
    const round_count = 10;

    // Expand master Key to get round keys
    const mkey_array: number[] = string_to_numarray(_key);
    const round_keys: Matrix[] = expandKey(mkey_array);

    // split the plaintext string into 16 byte matrices (blocks)
    const plaintext_matrices: Matrix[] = split_string_into_matrix(_plaintext,16);

    // array to hold the pieces of ciphertext
    const ciphertext_matrices: Matrix[] = [];

    for(let j=0; j<plaintext_matrices.length; j++){

        // add initial round key
        let current_matrix = addRoundKey(plaintext_matrices[j],round_keys[0]);

        // Loop Round number -1 times (9 full rounds, then one final round)
        for(let i=0; i < round_count-1; i++){
            // Step 1: Substitute bytes using s-box lookup table.
            const substitutedMatrix: Matrix = subBytes(current_matrix);

            // Step 2: Shift rows of the state matrix.
            const matrixWithShiftedRows: Matrix = shiftRows(substitutedMatrix);

            // Step 3: Matrix multiplication.
            // const multipliedMatrix: Matrix = multiplyMatrixes(matrixWithShiftedRows, matrixWithShiftedRows);
            const multipliedMatrix: Matrix = MixColumns(matrixWithShiftedRows);

            // Step 4: Add round key
            const matrixAfterRoundKey: Matrix = addRoundKey(multipliedMatrix, round_keys[i+1]);

            // save current state of matrix for the next loop
            current_matrix = matrixAfterRoundKey;
        }
        // Step 1: Substitute bytes using s-box lookup table. (final round)
        const substitutedMatrix: Matrix = subBytes(current_matrix);

        // Step 2: Shift rows of the state matrix. (final round)
        const matrixWithShiftedRows: Matrix = shiftRows(substitutedMatrix);

        // Step 3: Matrix multiplication. (skip on last round)
        // const multipliedMatrix: Matrix = multiplyMatrixes(matrixWithShiftedRows, matrixWithShiftedRows);
        // const multipliedMatrix = MixColumns(matrixWithShiftedRows);

        // Step 4: Add round key (final round)
        const matrixAfterRoundKey: Matrix = addRoundKey(matrixWithShiftedRows, round_keys[10]);
        
        // this block is all done, add it to the array of encrypted blocks
        ciphertext_matrices.push(matrixAfterRoundKey);
    
    }
    // convert the matrix blocks back into one string, the finished ciphertext
    const ciphertext:string = merge_matrix_into_string(ciphertext_matrices);

    // Returns the AES-encrypted ciphertext.
    return ciphertext;
}

/** Converts a string to a number array
 * https://www.javacodegeeks.com/2021/11/javascript-convert-character-to-ascii-and-vice-versa.html 
 * 
 * @param _input string to be converted to a number array
 * @returns a number array containing the ascii value of each character from the input string as a separate element
 */
export function string_to_numarray(_input: string): number[] {
    const num_array: number[] = [];
    for(let i=0; i < _input.length; i++){
        num_array.push(_input[i].charCodeAt(0));
    }
    return num_array;
}

/** Converts a number array to a string
 * 
 * @param _input number array of ascii values to be converted to a string
 * @returns single string of characters corresponding to each element of the input array
 */
export function numarray_to_string(_input: number[]): string {
    let out_string: string = "";
    for(let i=0; i < _input.length; i++){
        const temp_string = String.fromCharCode(_input[i]);
        // console.log("temp_string",_input[i],temp_string)
        out_string = out_string.concat(temp_string);
    }
    return out_string;
}

/** converts a string into equally sized blocks stored as nxn matrices of _length size 
 * (16 for our purposes). Will pad with spaces if the string length is not a perfect multiple of _length.
 * https://www.geeksforgeeks.org/javascript/how-to-split-a-string-into-segments-of-n-characters-in-javascript/
 * 
 * @param _input string to be split into blocks
 * @param _length number of bytes in each block
 * @returns array of matrices, each one is a _length size block of bytes
 */
export function split_string_into_matrix(_input: string, _length: number): Matrix[] {
    // array to hold the blocks
    const matrices: Matrix[] = [];
    // loop until the whole string has been handled
    for(let i=0; i < _input.length; i+=_length){
        // slice portion of _length size from the string
        const n_slice:string = _input.slice(i, i + _length);
        // convert the string to a number array (for encryption math)
        const n_array:number[] = string_to_numarray(n_slice);
        // fill in at the end with trailing spaces if the last block is too short
        // preventative measure so we get an even 16 bytes every time
        while(n_array.length < _length){
            // ascii number for " "
            n_array.push(32);
        }
        // convert the number array to a matrix block
        const n_matrix:Matrix = bytesToMatrix(n_array);
        // add the block to the return array
        matrices.push(n_matrix);
    }
    // returns array of matrices
    return matrices;
}

/** Converts an array of matrices to a string
 * 
 * @param _input array of matrices to be converted into a string
 * @returns string containing characters corresponding to the contents of the matrix blocks, in order
 */
export function merge_matrix_into_string(_input: Matrix[]): string {
    // string to hold the output
    let out_string: string = "";
    // loop through the matrices
    for(let i=0; i<_input.length; i++){
        // convert the matrix to a flat number array (maintains correct number order)
        const n_array:number[] = matrixToBytes(_input[i]);
        // convert the number array to a string
        const n_string:string = numarray_to_string(n_array);
        // concatenate the output string with the new piece of converted string
        out_string = out_string.concat("",n_string);
    }
    // trim off any trailing spaces we may have had for evening the block size
    out_string.trimEnd();
    // return a string of the matrix contents
    return out_string;
}