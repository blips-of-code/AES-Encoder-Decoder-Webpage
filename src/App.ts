// Utility Functions
import encryptAES from './Scripts/AESEncryption';
import decryptAES from './Scripts/AESDecryption';

// Assets
import AuburnLogo from './Assets/AuburnLogo.svg';

// Styling
import './App.css';


// This script is the main HTML for the project.



// -- Rendering --

// Renders the main content of the app.
document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
<section id="center">
  <div class="hero">
    <img src="${AuburnLogo}" class="base" width="170" height="179" alt="Auburn Logo">
  </div>

  <div>

    <h1>Auburn COMP5370</h1>
    <h2>AES Encryption Project</h2>
    <p>This project implements AES encryption and decryption.</p>
    <p>Try it out by entering a message and a 128-bit key (16 characters) below, then click "Encrypt" or "Decrypt".</p>

    <br>

    <form id="inputform">
      <textarea id="msg_input" name="msg_input" rows="5" cols="55" placeholder="Input your message here..."></textarea>

      <br>

      Key (128-bit): <input type="text" id="key_input" name="key_input" minlength="16" maxlength="16">

      <br>

      <button type="submit" id="encrypt_button" name="encrypt_button" value="Encrypt">Encrypt</button>
      <button type="submit" id="decrypt_button" name="decrypt_button" value="Decrypt">Decrypt</button>
    </form>

    <br>
      <textarea readonly id="msg_output" name="msg_output" rows="5" cols="55" placeholder="Output will be shown here..."></textarea>
  </div>
</section>
`


// -- Event Listeners --

// Retrieves references to various form elements.
const inputForm: HTMLFormElement = document.querySelector<HTMLFormElement>('#inputform')!;
const messageInput: HTMLTextAreaElement = document.querySelector<HTMLTextAreaElement>('#msg_input')!;
const keyInput: HTMLInputElement = document.querySelector<HTMLInputElement>('#key_input')!;
const messageOutput: HTMLTextAreaElement = document.querySelector<HTMLTextAreaElement>('#msg_output')!;

// Adds an event listener to the form to handle encryption and decryption.
inputForm.addEventListener('submit', (event) => {
    // Prevents the default form submission behavior.
    event.preventDefault();

    // Retrieves the message and key from the input fields, and determines which action (encrypt or decrypt) was requested.
    const message: string = messageInput.value;
    const key: string = keyInput.value;
    const action: 'Encrypt' | 'Decrypt' = (event.submitter as HTMLButtonElement | null)?.value as 'Encrypt' | 'Decrypt';

    // If the decrypt action is requested, use DecryptAES; Otherwise, use EncryptAES. The result is displayed in the output textarea.
    messageOutput.value = action === 'Decrypt'
        ? decryptAES(message, key)
        : encryptAES(message, key);
});


// -- Test Cases --

// Test case stuff
const testkey:string = "abcdefghijklmnop";
const testmsg:string = "Hello World. This is my message.";
const ciphertext:string = encryptAES(testmsg, testkey);
console.log("Ciphertext: ",ciphertext);
const testtwo:string = encryptAES("The fitness graham pacer test is a multi-stage aerobic capacity test.", "abcdefghijklmnop");
console.log(testtwo);

const plaintext: string = decryptAES(ciphertext, testkey);
console.log("Plaintext: ",plaintext);
console.log(decryptAES(testtwo, "abcdefghijklmnop"));