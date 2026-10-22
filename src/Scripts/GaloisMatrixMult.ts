import { generateMatrix} from "./MatrixMultiplication";
import type { Matrix } from "./AESTypes";

import { G2, G3, G9, G11, G13, G14 } from "./Galois_Lookup_Tables";

//https://en.wikipedia.org/wiki/Rijndael_MixColumns
//Lookup tables from "Galois Multiplication lookup tables" section of wikipedia article
//Code adapted from the C# example and InverseMixColumns sections

/**
 * 
 * @param c constant, determines which lookup table is used
 * @param p byte to be multiplied, determines position in the lookup table to retrieve
 * @returns dot multiplied value according to Galois Field multiplication from the lookup tables
 */
export function Table_GMul(c:number, p:number): number{
    // set up result variable
    let result:number = 0;
    switch(c){
        case 1:
            // case 1: multiplied by 1, value does not change
            result = p;
            break;
        case 2:
            // case 2: multiply by 2, use G2 table
            result = G2[p];
            break;
        case 3:
            // case 3: multiply by 3, use G3 table
            result = G3[p];
            break;
        case 9:
            // case 9: multiply by 9, use G9 table
            result = G9[p];
            break;
        case 11:
            // case 11: multiply by 11, use G11 table
            result = G11[p];
            break;
        case 13:
            // case 13: multiply by 13, use G13 table
            result = G13[p];
            break;
        case 14:
            // case 14: multiply by 14, use G14 table
            result = G14[p];
            break;
        default:
            // only reach this if something goes wrong?
            break;
    }
    // return the multiplied value
    return result;
}

/**
 * 
 * @param _input Matrix to be multiplied by the constant matrix
 * @returns Matrix with columns shuffled using GF(2^8) multiplication
 */
export function MixColumns(_input:Matrix): Matrix {
    // create matrix to hold output
    const temp_matrix: Matrix = generateMatrix(4,4);
    // give input new name (easier to type/read below)
    const s:Matrix = _input;

    //for each column in the matrix, calculate the dot products according to the fixed matrix and combine with XOR
    for(let c = 0; c < 4; c++){
        temp_matrix[0][c] = (Number)(Table_GMul(2, s[0][c]) ^ Table_GMul(3, s[1][c]) ^ Table_GMul(1, s[2][c]) ^ Table_GMul(1, s[3][c]));
        temp_matrix[1][c] = (Number)(Table_GMul(1, s[0][c]) ^ Table_GMul(2, s[1][c]) ^ Table_GMul(3, s[2][c]) ^ Table_GMul(1, s[3][c]));
        temp_matrix[2][c] = (Number)(Table_GMul(1, s[0][c]) ^ Table_GMul(1, s[1][c]) ^ Table_GMul(2, s[2][c]) ^ Table_GMul(3, s[3][c]));
        temp_matrix[3][c] = (Number)(Table_GMul(3, s[0][c]) ^ Table_GMul(1, s[1][c]) ^ Table_GMul(1, s[2][c]) ^ Table_GMul(2, s[3][c]));
    }
    // return the scrambled matrix
    return temp_matrix;
}

export function inverseMixColumns(_input:Matrix): Matrix {
    // create matrix to hold output
    const temp_matrix: Matrix = generateMatrix(4,4);
    // give input new name (easier to type/read below)
    const s:Matrix = _input;

     //for each column in the matrix, calculate the dot products according to the fixed matrix and combine with XOR
    for(let c = 0; c < 4; c++){
        temp_matrix[0][c] = (Number)(Table_GMul(14, s[0][c]) ^ Table_GMul(11, s[1][c]) ^ Table_GMul(13, s[2][c]) ^ Table_GMul(9, s[3][c]));
        temp_matrix[1][c] = (Number)(Table_GMul(9, s[0][c]) ^ Table_GMul(14, s[1][c]) ^ Table_GMul(11, s[2][c]) ^ Table_GMul(13, s[3][c]));
        temp_matrix[2][c] = (Number)(Table_GMul(13, s[0][c]) ^ Table_GMul(9, s[1][c]) ^ Table_GMul(14, s[2][c]) ^ Table_GMul(11, s[3][c]));
        temp_matrix[3][c] = (Number)(Table_GMul(11, s[0][c]) ^ Table_GMul(13, s[1][c]) ^ Table_GMul(9, s[2][c]) ^ Table_GMul(14, s[3][c]));
    }
    // return the unscrambled matrix
    return temp_matrix;
}

// four columns are a set of test vectors from the wiki
// const testmatrix:Matrix = [
//     [242,99,198,212],
//     [10,71,198,212],
//     [34,162,198,212],
//     [92,240,198,213]];

// const mixedmatrix:Matrix = MixColumns(testmatrix);
// console.log("mix",mixedmatrix);
// const unmixmatrix:Matrix = inverseMixColumns(mixedmatrix);
// console.log("unmix",unmixmatrix);