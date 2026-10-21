// Utility Functions
import encryptAES from './Scripts/AESEncryption';
import decryptAES from './Scripts/AESDecryption';

// Assets
import AuburnLogo from './assets/AuburnLogo.svg';

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
    <form id="inputform" method="post" action="" onsubmit="encryptAES">
      <textarea id="msg_input" name="msg_input" rows="5" cols="55">
      Input your message here...
      </textarea>
      <br>
      <input type="text" id="key_input" name="key_input" minlength="16" maxlength="16">
      <br>
      <button type="submit" id="encrypt_button" name="encrypt_button" value="Encrypt">Encrypt</button>
      <button type="submit" id="decrypt_button" name="decrypt_button" value="Decrypt">Decrypt</button>
    </form>
    <br>
      <textarea id="msg_output" name="msg_output" rows="5" cols="55">
      Output will be shown here...
    </textarea>
  </div>
</section>
`
function run_aes(event: Event): void{
    let formcontent = event.target;
    console.log(formcontent);

}

console.log(encryptAES("Hello World. This is my message.", "abcdefghijklmnop"));
console.log(encryptAES("The fitness graham pacer test is a multi-stage aerobic capacity test.", "abcdefghijklmnop"));
