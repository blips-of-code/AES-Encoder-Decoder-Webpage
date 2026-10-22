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
    <h1>AES Project</h1>
    <p>Put something on this page :)</p>
    <br>
    <form id="inputform" method="post" action="" onsubmit="encryptAES">
      <textarea id="msg_input" name="msg_input" rows="5" cols="55">
      Input your message here...
      </textarea>
      <br>
      Key (128-bit): <input type="text" id="key_input" name="key_input" minlength="16" maxlength="16">
      <br>
      <button type="submit" id="encrypt_button" name="encrypt_button" value="Encrypt">Encrypt</button>
      <button type="submit" id="decrypt_button" name="decrypt_button" value="Decrypt">Decrypt</button>
    </form>
    <br>
      <textarea readonly id="msg_output" name="msg_output" rows="5" cols="55">
      Output will be shown here...
    </textarea>
  </div>
</section>
`

const testkey:string = "abcdefghijklmnop";
const testmsg:string = "Hello World. This is my message.";
const ciphertext:string = encryptAES(testmsg, testkey);
console.log("Ciphertext: ",ciphertext);
const testtwo:string = encryptAES("The fitness graham pacer test is a multi-stage aerobic capacity test.", "abcdefghijklmnop");
console.log(testtwo);

const plaintext: string = decryptAES(ciphertext, testkey);
console.log("Plaintext: ",plaintext);
console.log(decryptAES(testtwo, "abcdefghijklmnop"));