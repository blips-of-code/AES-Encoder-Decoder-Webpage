// Initial adding of this file just to make sure I did this right :)

import type { Matrix } from "./AESTypes";

/* 
Process for the Shift Rows Step
Within each row, the bytes are shifted a certian number of steps to the left
Like rotating a rubix cube. 

Row 1: no shift
Row 2: one shift
Row 3: two shift
Row 4: three shift

I'm doing my best to match rgiles's matrix multiplication for formatting

Reference for the shift method: https://www.geeksforgeeks.org/javascript/javascript-program-for-left-rotate-by-one-in-an-array/ 
Used TypeScript Playground in browser to test, does work as far as I can tell.

TODO: DECRYPTION
For decryption, in order to get the rows back into their original orientation,
We would either have to shift them the same number of places to the right, 
or complete the loop, meaning:

Row 1: no shift (or 4 shift, looping back to the same position)
Row 2: 3 shift
Row 3: 2 shift
Row 4: 1 shift

*/

/**
 * Returns Matrix with columns shifted Left for Encryption
 * @param input_matrix matrix to be shifted
 * @returns matrix with columns shifted for encryption
 */
export function shiftRows(input_matrix: Matrix): Matrix{
    // number of rows
    const rowcount = input_matrix.length;
    // number of columns is not necessary

    // set up new matrix to hold the shifted rows
    const new_matrix:Matrix = [];

    // loop through each row in the input matrix
    for(let i: number = 0; i < rowcount; i++){
        // copy the current input row into the new row, with map rotating the indexes
        // modified from the map example of the G4G article cited above
        let newrow:number[] = input_matrix[i].map((_, index, array) =>
        array[(index + (rowcount-i)) % array.length]);
        // repeat 0, then 1, then 2, then 3, etc.
        // for(let j:number = 0; j < i; j++){
        //     // // pops off the first value and returns it (pops from lefthand side)
        //     // let firstval:number = newrow.shift() as number;
        //     // temprow = newrow;
        //     // console.log("firstval, newrow",firstval,":::", newrow)
        //     // // put the first value back on at the end (like its looping over)
        //     // temprow.push(firstval);
        //     // // newrow = temprow;
        //     newrow = rotationFunction(input_matrix[i]);
        //     console.log(newrow)

        // }
        
        // console.log("newrow",newrow);
        // console.log("temprow", temprow)
        // row shift complete, add it to the matrix
        new_matrix.push(newrow);
    }
    // return matrix with shifted rows
    return new_matrix;
}

/**
 * Returns Matrix with columns unshifted Left for Decryption
 * @param input_matrix matrix to be unshifted
 * @returns matrix with columns unshifted for decryption
 */
export function undo_shiftRows(input_matrix: Matrix): Matrix{
    // number of rows
    const rowcount = input_matrix.length;
    // number of columns is not necessary 

    // set up new matrix to hold the shifted rows
    const new_matrix:Matrix = [];

    // loop through each row in the input matrix
    for(let i:number =0; i < rowcount; i++){
        // // copy the current input row into the new row
        // let newrow = input_matrix[i];
        // // shift row 1 left 4 times (same position), row 2 left 3 times, etc
        // for(let j:number = 4; j > i; j--){
        //     // pop off the leftmost value shifting everything else up
        //     let firstval:number = newrow.shift() as number;
        //     // put the leftmost value back on the end
        //     newrow.push(firstval);
        // }
        let newrow:number[] = input_matrix[i].map((_, index, array) =>
        array[(index + i) % array.length]);
        // row shift complete, add the row to the new matrix
        new_matrix[i] = newrow;
    }
    // return the new matrix with unshifted rows
    return new_matrix;
}