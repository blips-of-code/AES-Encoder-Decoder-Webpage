// Utility Functions
import multiplyMatrixes from './Scripts/MatrixMultiplication';

// Assets
import AuburnLogo from './assets/AuburnLogo.svg'

// Styling
import './App.css'


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