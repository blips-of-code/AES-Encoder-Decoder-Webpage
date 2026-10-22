// Classes & Types
import type { Matrix } from "./AESTypes";


// This file contains the script functions for the third step of our custom AES encryption algorithm, matrix multiplication.
// Written by Rayce G.


// -- Functions --

/**
   * Returns matrix multiplication of two matrices.
   * @param _matrixA - The first matrix.
   * @param _matrixB - The second matrix.
   * @returns The resulting matrix after multiplication.
   */
export default function multiplyMatrices(_matrixA: Matrix, _matrixB: Matrix): Matrix {
    // Tracks the dimensions of Matrix A.
    const matrixARowCount: number = _matrixA.length;
    const matrixAColumnCount: number = _matrixA[0].length;

    // Tracks the dimensions of Matrix B.
    const matrixBRowCount: number = _matrixB.length;
    const matrixBColumnCount: number = _matrixB[0].length;

    // For matrix multiplication to be valid, the number of columns in the first matrix must equal the number of rows in the second matrix.
    // If the number of columns in the first matrix is not equal to the number of rows in the second matrix, throw an error.
    if (matrixAColumnCount !== matrixBRowCount)
        throw new Error(`The matrices passed into multiplyMatrices have mismatching columns/rows; Matrix A has ${matrixAColumnCount} column(s), while Matrix B has ${matrixBRowCount} row(s)`);

    // Sets up the resulting matrix as an empty matrix.
    const resultingMatrix: Matrix = generateMatrix(matrixARowCount, matrixBColumnCount);

    // For each row in Matrix A and each column in Matrix B, calculate the dot product and store it in the resulting matrix.
    for (let matrixARow: number = 0; matrixARow < matrixARowCount; matrixARow++)
        for (let matrixBCol: number = 0; matrixBCol < matrixBColumnCount; matrixBCol++)
            resultingMatrix[matrixARow][matrixBCol] = calculateMatrixDotProduct(_matrixA, _matrixB, matrixARow, matrixBCol);

    // Return the resulting matrix after multiplication.
    return resultingMatrix;
}

/**
   * Generates a matrix using the given number of rows and columns, initializing all elements to 0.
   * @param _rows - The number of rows in the matrix.
   * @param _columns - The number of columns in the matrix.
   * @returns The generated matrix.
   */
export function generateMatrix(_rows: number, _columns: number): Matrix {
    // Sets up the resulting matrix as an empty number array.
    const resultingMatrix: Matrix = [];

    // For each desired row, create a new row in the resulting matrix.
    for (let i: number = 0; i < _rows; i++) {
        resultingMatrix[i] = [];

        // For each desired column, initialize the element to 0.
        for (let j = 0; j < _columns; j++)
            resultingMatrix[i][j] = 0;
    }

    // Return the now-generated, empty matrix.
    return resultingMatrix;
}

/**
   * Calculates the dot product of two given matrices.
   * @param _matrixA - The first matrix.
   * @param _matrixB - The second matrix.
   * @param _currentRow - The current row index of the element to calculate the dot product for.
   * @param _currentColumn - The current column index of the element to calculate the dot product for.
   * @returns The resulting dot product of the two matrices.
   */
export function calculateMatrixDotProduct(_matrixA: Matrix, _matrixB: Matrix, _currentRow: number, _currentColumn: number): number {
    // Tracks the number of columns in Matrix A.
    const matrixAColumnCount: number = _matrixA[0].length;

    // Sets up the dot product sum.
    let dotProductSum: number = 0;

    // Calculates the dot product of the two matrices. Iterates over Matrix A's columns, multiplying each element in the row of Matrix A by the corresponding element in the column of Matrix B, and summing the products.
    for (let matrixACol = 0; matrixACol < matrixAColumnCount; matrixACol++)
        dotProductSum += _matrixA[_currentRow][matrixACol] * _matrixB[matrixACol][_currentColumn];

    // Returns the resulting dot product.
    return dotProductSum;
}