# AES-Encoder-Decoder-Webpage
First project for Computer and Network Security class

AES Encoder/Decoder Webpage 

Group 17 – Claire Justis, Sharmin Zaman, Kumi Weilbacher, Rayce Giles 

This proposal is based on this article: https://www.geeksforgeeks.org/computer-networks/advanced-encryption-standard-aes/  

In the article, the basic steps for performing an AES encryption/decryption are given. Those steps are:  

Before encrypting, use key schedule algorithm to get variations of the key for each Round. Each block of the message will go through a number of rounds depending on the key length. For a 128-bit key, 16 bytes are handled at once, arranged in a 4x4 column-major matrix. 

Encryption: 

Substitute bytes using an S-box lookup table 

Left circular shift of the matrix rows 

Matrix Multiplication to mix columns (skip this on last round) 

XOR the mixed matrix with the round key 

Each of these steps has a mathematical inverse or opposite that when performed in-order for the given number of rounds will decrypt the data.  

For this project, each group member in the group of 4 can select a step from the list and write functions to both perform and undo that step of the encryption (plus helper functions as they see fit for the design). Once all steps are put together and verified to work as intended, a simple web interface will allow users to input a message and provide a key and get its encrypted or decrypted form at the press of a button. The web interface will be a collaborative effort with the interface itself, and any additional functions required to position the text between steps in the process. For simplicity, the shortest key option (128 bit) can be selected, and the number of rounds performed on each block can be reduced from 10 to 5. A character limit should be placed on the message length that is a multiple of our key length for simplicity and to ensure users cannot overwhelm the encryptor. 

Tentative details 

Programming language: Typescript 

Key length: 128 bits 

Number of rounds: 5 

Collaboration tool: GitHub
