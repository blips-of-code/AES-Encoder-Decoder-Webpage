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
  </div>
</section>
`