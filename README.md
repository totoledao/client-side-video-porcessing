[![License: MIT][license-shield]][license-url]
![Version](https://img.shields.io/badge/version-1.0.0-6bd4a7)
![Size](https://img.shields.io/github/repo-size/totoledao/client-side-video-processing)
![Platform](https://img.shields.io/badge/platform-Web-7F00FF)

[![LinkedIn][linkedin-shield]][linkedin-url]

[![Node.JS][nodejs-shield]][nodejs-url][![JavaScript][javascript-shield]][javascript-url]

<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/totoledao/client-side-video-processing">
    <!-- <img src="web\src\assets\logo.svg" alt="SpaceTime Logo" width="250"> -->
  </a>
  
  <p align="center">
    Cost-effective video processing in the web browser
    <br />
    <a href="https://github.com/totoledao/client-side-video-processing"><strong>Explore the docs »</strong></a>    
  </p>
</p>

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary><h2 style="display: inline-block">Table of Contents</h2></summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>    
    <li><a href="#usage">Usage</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>    
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

**A fast, cost-effective and user-friendly video processing tool that works directly in the web browser, making video processing a breeze.**

The primary objective of this project is to learn about [Web Workers](https://developer.mozilla.org/docs/Web/API/Web_Workers_API), [JSDoc](https://jsdoc.app/), file processing concepts and technologies while deepening my understanding of Node.js.<br>
Additionally, it aims to provide a real world solution for reducing the expenses associated with file uploads by implementing client-side video processing. This approach not only alleviates server-side processing overhead but also improves storage optimization.<br>
App created based on Semana JS Expert 8.0 by [Erick Wendel](https://cursos.erickwendel.com.br/)

Workflow:

- On demand download of mp4 file
- Demultiplexing file with MP4Box.js
- Encoding each fragment with video encoder
- Multiplexing each fragment
- Uploading fragments as WebM
- Decoding each fragment with video decoder to show progress

### Built With

- [Node.JS][nodejs-url]
- [JavaScript][javascript-url]
- [MP4Box.js](https://github.com/gpac/mp4box.js/)
- [WebCodecs](https://github.com/w3c/webcodecs/)

<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

- Node.JS

  [Download Node and npm](https://nodejs.org/)

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/totoledao/client-side-video-processing.git
   ```
2. Install the dependencies of each folder
   ```sh
   cd server; npm i
   ```
   ```sh
   cd web; npm i
   ```
3. Start the development server
   ```sh
   npm run dev
   ```
4. Start the client
   ```sh
   npm run dev
   ```

<!-- USAGE EXAMPLES -->

<!-- ## Usage -->

<!-- ![web-login](https://github.com/totoledao/totoledao/assets/40635662/60743232-836d-4190-96bc-828b88c560ed)
Create an account or Login using your GitHub account -->

<!-- LICENSE -->

## License

Distributed under the MIT License. See [`LICENSE`][license-url] for more information.

<!-- CONTACT -->

## Contact

Guilherme Toledo - guilherme-toledo@live.com

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/guilhermemtoledo/)[![Facebook](https://img.shields.io/badge/Facebook-1877F2?style=for-the-badge&logo=facebook&logoColor=white)](https://www.facebook.com/totoledao)[![Instagram](https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white)](https://www.instagram.com/totoledao)[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=whit)](https://www.github.com/totoledao)

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[license-shield]: https://img.shields.io/badge/License-MIT-blue.svg
[license-url]: https://github.com/totoledao/gameplay-app/blob/main/MIT-LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=0e76a8
[linkedin-url]: http://www.linkedin.com/in/guilhermemtoledo
[javascript-shield]: https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E
[javascript-url]: https://www.javascript.com/
[nodejs-shield]: https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white
[nodejs-url]: https://nodejs.org/
