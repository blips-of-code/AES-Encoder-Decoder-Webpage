# AES Encoder/Decoder Webpage

First project for Computer and Network Security class

**Group 17 – Claire Justis, Sharmin Zaman, Kumi Weilbacher, Rayce Giles**

This proposal is based on this article:
https://www.geeksforgeeks.org/computer-networks/advanced-encryption-standard-aes/

In the article, the basic steps for performing an AES encryption/decryption
are given.

Before encrypting, the key schedule algorithm is used to generate variations
of the key for each round. Each block of the message will go through a number
of rounds. For a 128-bit key, 16 bytes are handled at once and arranged in a
4x4 column-major matrix.

## Encryption

The main steps of the encryption process are:

1. Substitute bytes using an S-box lookup table.
2. Left circular shift the matrix rows.
3. Perform matrix multiplication to mix the columns (skipped on the last round).
4. XOR the matrix with the round key.

An initial AddRoundKey step is performed before the main encryption rounds.

Each of these steps has a mathematical inverse or corresponding operation
that can be used to decrypt the data.

For this project, each group member will select one step and write functions
to perform and undo that step of the encryption, plus any helper functions
needed for the design. Once all steps are put together and verified to work
as intended, a simple web interface will allow users to input a message and
provide a key to get its encrypted or decrypted form at the press of a button.

The web interface will be a collaborative effort, along with any additional
functions required to prepare and pass the data between steps in the process.

For simplicity, the shortest key option (128 bit) will be used. The number
of rounds can be configured as needed for the simplified AES implementation.
A character limit should be placed on the message length that is a multiple
of the key length for simplicity and to ensure users cannot overwhelm the
encryptor.

## Group Responsibilities

- **Sharmin Zaman:** Substitute bytes using S-box lookup table / inverse S-box
- **Claire Justis:** Shift rows / inverse shift rows
- **Rayce Giles:** Matrix multiplication / inverse matrix multiplication
- **Kumi Weilbacher:** Add round key

## Project Details

- **Programming language:** TypeScript
- **Development tool:** Vite
- **Hosting:** GitHub Pages
- **Key length:** 128 bits
- **State matrix:** 4x4 column-major matrix
- **Number of rounds:** Configurable / To Be Determined
- **Collaboration tool:** GitHub

## Project Timeline

### October 6–9
- Complete individual encryption/decryption components.
- Test each component independently.
- Determine how key scheduling/round keys will be handled.

### October 10–13
- Begin integrating individual components.
- Implement the main encryption and decryption processes.
- Test passing the state matrix between each transformation.

### October 14–17
- Develop and connect the web interface.
- Add message and key inputs.
- Add Encrypt and Decrypt controls.
- Display the resulting encrypted/decrypted output.

### October 18–20
- Test the complete program.
- Debug integration issues.
- Test different inputs and keys.
- Verify that encrypted messages can be successfully decrypted.

### October 21
- Final testing and cleanup.
- Verify the GitHub Pages deployment.
- Complete documentation.

### October 22
- Project due.
