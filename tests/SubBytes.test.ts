
import assert from 'node:assert/strict';
import { subBytes, inverseSubBytes } from '../src/Scripts/SubBytes.ts';
import type { Matrix } from '../src/Scripts/AESTypes';

// Test 1: Known AES S-box substitution
const original: Matrix = [
    [0x53, 0x00, 0x10, 0xff],
    [0x01, 0x20, 0x30, 0x40],
    [0x50, 0x60, 0x70, 0x80],
    [0x90, 0xa0, 0xb0, 0xc0]
];

const encrypted = subBytes(original);

assert.equal(encrypted[0][0], 0xed);
console.log('PASS: Known AES substitution (0x53 → 0xED)');

// Test 2: Inverse substitution
assert.equal(inverseSubBytes(encrypted)[0][0], 0x53);
console.log('PASS: Inverse AES substitution (0xED → 0x53)');

// Test 3: Full matrix round-trip
assert.deepEqual(inverseSubBytes(encrypted), original);
console.log('PASS: Full 4×4 matrix round-trip');

// Test 4: All 256 possible byte values
for (let value = 0; value < 256; value++) {
    const state: Matrix = [[value]];
    assert.deepEqual(inverseSubBytes(subBytes(state)), state);
}
console.log('PASS: All 256 byte values round-trip');

console.log('All SubBytes tests passed!');
