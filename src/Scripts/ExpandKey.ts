// Generates round keys used by AddRoundKey from the 128-bit key
// Author: Kumi Weilbacher (WITH the assistance of Claude)
// AI DISCLOSURE STATEMENT: The author(s) would like to acknowledge the use of Claude, a language model developed by Anthropic, in the preparation of this assignment. Claude was used in the following way(s) in this assignment: code structure and logic, Typescript syntax, validating rounds and key length in expandKey(), and generating words.
// Additional sources are provided as reference.

import { bytesToMatrix } from './AddRoundKey.ts';
import { subBytes } from './SubBytes.ts';

import type { Matrix } from './AESTypes';

// Key is 4 words (4-byte columns) where each new word is built from earlier ones
// 4 words per group gives the round key

// Round constants: One per round. 
// Using 10 rounds for 128-bit key size as per this article here, giving the RCON matrix: https://medium.com/@burakozpoyraz/advanced-encryption-standard-part-1-25a18b2efa95
const RCON: number[] = [0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80, 0x1b, 0x36];

// *** FUNCTIONS HERE ***

// Function: 128-bit key expanded into 1 round key matrix per round
// @param _key: number array containing 16 key bytes (0-255) eg: [0, 1, 2, ...]
// @returns: (_rounds + 1) round key matrices (16-byte 4x4 matrices, one for each round)
export function expandKey(_key: number[], _rounds: number = 10): Matrix[] {
    if (_key.length !== 16)
        throw new Error(`Must be a 16-byte key!`);
    // Also used Claude to validate the rounds to ensure it is within the bounds of 1 and up to 10 rounds
    if (!Number.isInteger(_rounds) || _rounds < 1 || _rounds > RCON.length)
        throw new Error(`This function supports between 1 and ${RCON.length} rounds. Try again?`);

    const words: number[][] = [];
    for (let i: number = 0; i < 4; i++)
        words.push(_key.slice(4*i, 4*i+4));

    // Generate words
    // According to Claude, given that 4 bytes represents a word, (_rounds + 1) is supposed to generate 44 words from 11 round keys which will stop at 43 words at the tenth round.
    // For clarification, this article also makes mention of this process known as Key Schedule: https://medium.com/@sundaeGAN/advanced-encryption-standard-aes-8d1a01a41579 
    for (let i: number = 4; i < 4 * (_rounds + 1); i++) {
        let temp: number[] = [...words[i-1]];
        // Reflects the steps from here: https://medium.com/@sundaeGAN/advanced-encryption-standard-aes-8d1a01a41579
        if (i % 4 === 0) {
            // 1. RotWord: circular shift left per byte
            temp = [temp[1], temp[2], temp[3], temp[0]];
            // 2. SubWord: substituting each byte from the S-box from subBytes.ts
            temp = temp.map(byte => subBytes([[byte]])[0][0]);
            // 3. RCON: XOR between a round constant and byte
            temp[0] ^= RCON[i / 4 - 1];
        }
        // 4. Final XOR: Builds the new word 
        words.push(words[i - 4].map((byte, index) => byte ^ temp[index]));
    }

    // 4 words grouped to 4x4 round key matrix
    const roundKeys: Matrix[] = [];
    for (let round: number = 0; round <= _rounds; round++)
        roundKeys.push(bytesToMatrix(words.slice(4 * round, 4 * round + 4).flat()));

    return roundKeys;
}
