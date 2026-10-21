// Utility Functions
import multiplyMatrixes from './MatrixMultiplication';
import { addRoundKey, bytesToMatrix, matrixToBytes } from './AddRoundKey';
import { shiftRows, undo_shiftRows } from './ShiftRows';
import { subBytes } from './SubBytes';

// Classes & Types
import type { Matrix } from './AESTypes';
import { expandKey } from './ExpandKey';
import { MixColumns } from './MatrixMultiplication';


// This file is the main script for AES encryption, tying together all 4 steps.


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

    const plaintext_matrices: Matrix[] = split_string_into_matrix(_plaintext,16);
    console.log(plaintext_matrices);

    // array to hold the pieces of ciphertext
    const ciphertext_matrices: Matrix[] = [];

    for(let j=0; j<plaintext_matrices.length; j++){
        let current_matrix = plaintext_matrices[j];
        // Loop Round number -1 times, 
        for(let i=0; i < round_count; i++){
            // console.log(i);
            // console.log("current_matrix",current_matrix);
            // Step 1: Substitute bytes using s-box lookup table.
            const substitutedMatrix: Matrix = subBytes(current_matrix);
            // console.log("After subbytes:", substitutedMatrix);

            // Step 2: Shift rows of the state matrix.
            const matrixWithShiftedRows: Matrix = shiftRows(substitutedMatrix);
            // console.log("After shiftrows:", matrixWithShiftedRows);

            // Step 3: Matrix multiplication.
            // const multipliedMatrix: Matrix = multiplyMatrixes(matrixWithShiftedRows, matrixWithShiftedRows);
            const multipliedMatrix: Matrix = MixColumns(matrixWithShiftedRows);
            // console.log("After matrixmult:", multipliedMatrix)

            // Step 4: Add round key
            const matrixAfterRoundKey: Matrix = addRoundKey(multipliedMatrix, round_keys[i]);
            // console.log("After roundkey:", matrixAfterRoundKey);

            current_matrix = matrixAfterRoundKey;
        }
        // Step 1: Substitute bytes using s-box lookup table.
        const substitutedMatrix: Matrix = subBytes(current_matrix);
        // console.log(substitutedMatrix)

        // Step 2: Shift rows of the state matrix.
        const matrixWithShiftedRows: Matrix = shiftRows(substitutedMatrix);
        // console.log(matrixWithShiftedRows)

        // Step 3: Matrix multiplication. (skip on last round)
        // const multipliedMatrix: Matrix = multiplyMatrixes(matrixWithShiftedRows, matrixWithShiftedRows);

        // Step 4: Add round key
        const matrixAfterRoundKey: Matrix = addRoundKey(matrixWithShiftedRows, round_keys[10]);
        
        ciphertext_matrices.push(matrixAfterRoundKey);
    
    }
    // console.log(ciphertext_matrices);
    const ciphertext:string = merge_matrix_into_string(ciphertext_matrices);
    // console.log(ciphertext);

    // Returns the AES-encrypted ciphertext.
    return ciphertext;
}

export function string_to_numarray(_input: string): number[] {
    const num_array: number[] = [];
    for(let i=0; i < _input.length; i++){
        num_array.push(_input[i].charCodeAt(0));
    }
    return num_array;
}

export function numarray_to_string(_input: number[]): string {
    let out_string: string = "";
    for(let i=0; i < _input.length; i++){
        const temp_string = String.fromCharCode(_input[i]);
        // console.log("temp_string",_input[i],temp_string)
        out_string = out_string.concat(temp_string);
    }
    return out_string;
}

export function split_string_into_matrix(_input: string, _length: number): Matrix[] {
    const matrices: Matrix[] = [];
    // console.log("there should be ", (_input.length/_length), " arrays");
    for(let i=0; i < _input.length; i+=_length){
        const n_slice:string = _input.slice(i, i + _length);
        // console.log(n_slice);
        const n_array:number[] = string_to_numarray(n_slice);
        // fill in at the end with # symbols if last array is too short
        // preventative measure so we get an even 16 bytes every time
        while(n_array.length < _length){
            // ascii number value for #
            n_array.push(35);
        }
        // console.log(n_array);
        const n_matrix:Matrix = bytesToMatrix(n_array);
        matrices.push(n_matrix);
    }
    return matrices;
}

export function merge_matrix_into_string(_input: Matrix[]): string {
    let out_string: string = "";
    for(let i=0; i<_input.length; i++){
        const n_array:number[] = matrixToBytes(_input[i]);
        const n_string:string = numarray_to_string(n_array);
        // console.log("n_string",n_string);
        out_string = out_string.concat("",n_string);
    }
    // console.log("out_string",out_string);
    return out_string;
}

// export function modulo_matrix_vals(_input:Matrix,_mod:number): Matrix{

// }