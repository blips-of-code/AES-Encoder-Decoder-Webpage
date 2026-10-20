// File of the 4th step of AES encryption: Add Round Key
// Reference: https://www.geeksforgeeks.org/computer-networks/advanced-encryption-standard-aes/ 
// Author: Kumi Weilbacher

import type { Matrix } from './AESTypes';

// Process of the this step:
// Each byte of 4x4 regular matrix XOR'ed with corresponding byte of 4x4 round key matrix
// reg[row][col] XOR roundKey[row][col]
// XOR - same process for encrypting/decrypting

// *** FUNCTIONS HERE ***
export function addRoundKey(_state: Matrix, _roundKey: Matrix): Matrix {
    // Condition check to validate state and round key must be same size to pair bytes
    if (_state.length !== _roundKey.length)
        throw new Error('Matrices have mismatched rows given that state matrix has ${_state.length} row(s), while round key matrix has ${_roundKey.length} row(s).');

    // XOR'ing every byte of the row state in the same position as the round key
    return _state.map((row, rowIndex) => {
        if (row.length !== _roundKey[rowIndex].length)
            throw new Error('Matrices have mismatched columns given that state matrix has ${row.length} column(s), while round key matrix has ${_roundKey[rowIndex].length} column(s).');

        return row.map((byte, colIndex) => byte ^ _roundKey[rowIndex][colIndex]);
    });
}


// Inverse Function
export function inverseAddRoundKey(_state: Matrix, _roundKey: Matrix): Matrix {
    return addRoundKey(_state, _roundKey);
}

// Function that puts 16 bytes into a 4x4 column-major matrix
// @param _bytes: 16 bytes (0-255) to arrange
// @return matrix: 4x4 matrix 
export function bytesToMatrix(_bytes: number[]): Matrix {
    if (_bytes.length !== 16)
        throw new Error('This function must have exactly 16 bytes!');

    const matrix: Matrix = [[], [], [], []];
    for (let i: number = 0; i < 16; i++)
        matrix[i % 4][Math.floor(i / 4)] = _bytes[i];

    return matrix;
}

// Inverse Function of above function that converts a 4x4 column-major matrix to 16 byte
// @param: _matrix: 4x4 matrix
// @return 16 bytes, read down per column left to right
export function matrixToBytes(_matrix: Matrix): number[] {
    const bytes: number[] = [];
    for (let col: number = 0; col < 4; col++)
        for (let row: number = 0; row < 4; row++)
            bytes.push(_matrix[row][col]);

    return bytes;
}
