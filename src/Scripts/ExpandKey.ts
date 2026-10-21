// Generates round keys used by AddRoundKey from the 128-bit key
// Author: Kumi W.

import { bytesToMatrix } from './AddRoundKey.ts';
import { subBytes } from './SubBytes.ts';

import type { Matrix } from './AESTypes';

// Key is 4 words (4-byte columns) where each new word is built from earlier ones
// 4 words per group gives the round key

// Round constants: One per found. Using 10 rounds for 128-bit key size
const RCON: number[] = [0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80, 0x1b, 0x36];

// *** FUNCTIONS HERE ***

// Function: 128-bit key expanded into 1 round key matrix per round
// @param _key: number array containing 16 key bytes (0-255) eg: [0, 1, 2, ...]
// @returns: (_rounds + 1) round key matrices (16-byte 4x4 matrices, one for each round)
export function expandKey(_key: number[], _rounds: number = 10): Matrix[] {
    if (_key.length !== 16)
        throw new Error(`Must be a 16-byte key!`);
    if (!Number.isInteger(_rounds) || _rounds < 1 || _rounds > RCON.length)
        throw new Error(`This function supports between 1 and ${RCON.length} rounds. Try again?`);

    const words: number[][] = [];
    for (let i: number = 0; i < 4; i++)
        words.push(_key.slice(4*i, 4*i+4));

    // generate words
    for (let i: number = 4; i < 4 * (_rounds + 1); i++) {
        let temp: number[] = [...words[i-1]];

        if (i % 4 === 0) {
            // rotate left per byte, substituting each via S-box
            temp = [temp[1], temp[2], temp[3], temp[0]];
            temp = temp.map(byte => subBytes([[byte]])[0][0]);
            temp[0] ^= RCON[i / 4 - 1];
        }

        words.push(words[i - 4].map((byte, index) => byte ^ temp[index]));
    }

    // 4 words grouped to 4x4 round key matrix
    const roundKeys: Matrix[] = [];
    for (let round: number = 0; round <= _rounds; round++)
        roundKeys.push(bytesToMatrix(words.slice(4 * round, 4 * round + 4).flat()));

    return roundKeys;
}
