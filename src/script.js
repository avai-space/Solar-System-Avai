import * as THREE from 'three';
import './style.css'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';

const canvas = document.querySelector('canvas.webgl')

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}


//---Scene---//
const scene = new THREE.Scene();

//---Camera---//
const camera = new THREE.PerspectiveCamera(
    45,
    sizes.width / sizes.height,
    0.1,
    1000
);

//---Controls---//
const orbit = new OrbitControls(camera, canvas);
orbit.target.set(0, 0.75, 0)
orbit.enableDamping = true

camera.position.set(-90, 140, 140);
orbit.update();

//---Light---//
const ambientLight = new THREE.AmbientLight(0x333333);
scene.add(ambientLight);


//---Textures---//
const textureLoader = new THREE.TextureLoader();
const sunTexture = textureLoader.load('/img/sun.jpg')
const mercuryTexture = textureLoader.load('/img/mercury.jpg')
const venusTexture = textureLoader.load('/img/venus.jpg')
const earthTexture = textureLoader.load('/img/earth.jpg')
const marsTexture = textureLoader.load('/img/mars.jpg')
const jupiterTexture = textureLoader.load('/img/jupiter.jpg')
const saturnTexture = textureLoader.load('/img/saturn.jpg')
const saturnRingTexture = textureLoader.load('/img/saturn ring.png')
const uranusTexture = textureLoader.load('/img/uranus.jpg')
const uranusRingTexture = textureLoader.load('/img/uranus ring.png')
const neptuneTexture = textureLoader.load('/img/neptune.jpg')


//---Geometry+Material---//
const sunGeo = new THREE.SphereGeometry(16, 30, 30);
const sunMat = new THREE.MeshBasicMaterial({
    map: sunTexture
});
const sun = new THREE.Mesh(sunGeo, sunMat);

scene.add(sun);

function createPlanete(size, texture, position, ring) {
    const geo = new THREE.SphereGeometry(size, 30, 30);
    const mat = new THREE.MeshStandardMaterial({
        map: texture
        });
    const mesh = new THREE.Mesh(geo, mat);
    const obj = new THREE.Object3D();
    obj.add(mesh);
    if(ring) {
        const ringGeo = new THREE.RingGeometry(
            ring.innerRadius,
            ring.outerRadius,
            32);
        const ringMat = new THREE.MeshBasicMaterial({
            map: ring.texture,
            side: THREE.DoubleSide
        });
        const ringMesh = new THREE.Mesh(ringGeo, ringMat);
        obj.add(ringMesh);
        ringMesh.position.x = position;
        ringMesh.rotation.x = -0.5 * Math.PI;
    }
    scene.add(obj);
    mesh.position.x = position;
    return {mesh, obj}
}

//---Creation---//
const mercury = createPlanete(3.2, mercuryTexture, 28);
const venus = createPlanete(5.8, venusTexture, 44);
const earth = createPlanete(6, earthTexture, 62);
const mars = createPlanete(4, marsTexture, 78);
const jupiter = createPlanete(12, jupiterTexture, 100);
const saturn = createPlanete(10, saturnTexture, 138, {
    innerRadius: 10,
    outerRadius: 20,
    texture: saturnRingTexture
});
const uranus = createPlanete(7, uranusTexture, 176, {
    innerRadius: 7,
    outerRadius: 12,
    texture: uranusRingTexture
});
const neptune = createPlanete(7, neptuneTexture, 200);

const pointLight = new THREE.PointLight(0xFFFFFF, 2, 300);
scene.add(pointLight);



//---Animation---//
function animate() {
    //Self-rotation
    sun.rotateY(0.004);
    mercury.mesh.rotateY(0.004);
    venus.mesh.rotateY(0.002);
    earth.mesh.rotateY(0.02);
    mars.mesh.rotateY(0.018);
    jupiter.mesh.rotateY(0.04);
    saturn.mesh.rotateY(0.038);
    uranus.mesh.rotateY(0.03);
    neptune.mesh.rotateY(0.032);

    //Around-sun-rotation
    mercury.obj.rotateY(0);
    venus.obj.rotateY(0.0015);
    earth.obj.rotateY(0.001);
    mars.obj.rotateY(0.008);
    jupiter.obj.rotateY(0.002);
    saturn.obj.rotateY(0.0009);
    uranus.obj.rotateY(0.0004);
    neptune.obj.rotateY(0.0001);

    renderer.render(scene, camera);
}

//---Sizes---//
window.addEventListener('resize', () =>
{
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight 

    camera.aspect =  sizes.width / sizes.height
    camera.updateProjectionMatrix();

    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

//---Renderer---//
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
});

renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
document.body.appendChild(renderer.domElement);


const tick = () =>
{

    orbit.update()

    renderer.setAnimationLoop(animate);

    renderer.render(scene, camera)

    window.requestAnimationFrame(tick)
}

tick()

const questions = [
  {
    name: "1. Which planet is known as the 'Red Planet'?",
    a_1: "A. Earth",
    a_2: "B. Venus",
    a_3: "C. Mars",
    a_4: "D. Jupiter",
    correct: "C"
  },
  {
    name: "2. Which planet is closest to the Sun?",
    a_1: "A. Venus",
    a_2: "B. Mercury",
    a_3: "C. Mars",
    a_4: "D. Saturn",
    correct: "B"
  },
  {
    name: "3. Which planet is the largest in our solar system?",
    a_1: "A. Jupiter",
    a_2: "B. Saturn",
    a_3: "C. Uranus",
    a_4: "D. Neptune",
    correct: "A"
  },
  {
    name: "4. Which planet has the most prominent ring system?",
    a_1: "A. Saturn",
    a_2: "B. Jupiter",
    a_3: "C. Uranus",
    a_4: "D. Neptune",
    correct: "A"
  },
  {
    name: "5. Which planet is known as the 'Morning Star' or 'Evening Star'?",
    a_1: "A. Venus",
    a_2: "B. Mercury",
    a_3: "C. Mars",
    a_4: "D. Jupiter",
    correct: "A"
  },
  {
    name: "6. Which planet has the Great Red Spot, a persistent storm?",
    a_1: "A. Earth",
    a_2: "B. Venus",
    a_3: "C. Mars",
    a_4: "D. Jupiter",
    correct: "D"
  },
  {
    name: "7. Which planet has the most moons in our solar system?",
    a_1: "A. Earth",
    a_2: "B. Mars",
    a_3: "C. Saturn",
    a_4: "D. Jupiter",
    correct: "D"
  },
  {
    name: "8. Which planet is known for its beautiful blue color and strong winds?",
    a_1: "A. Uranus",
    a_2: "B. Neptune",
    a_3: "C. Saturn",
    a_4: "D. Jupiter",
    correct: "B"
  }
];

  
  const quizText = document.querySelector('.quiz_text');
  
  const a_text = document.querySelector('.a_text');
  const b_text = document.querySelector('.b_text');
  const c_text = document.querySelector('.c_text');
  const d_text = document.querySelector('.d_text');
  
  const nextBtn = document.querySelector('.next');
  const prevBtn = document.querySelector('.prev');
  const radioEls = document.querySelectorAll(`input[type="radio"]`);
  const correctAnswer = document.querySelector('.correct_answer');
  const labelEls = document.querySelectorAll('label');
  
  let currentQuiz = 0;
  
  loadQuiz();
  
  function loadQuiz() {
    const currentQuizDate = questions[currentQuiz];
  
    quizText.innerHTML = currentQuizDate["name"];
    a_text.innerHTML = currentQuizDate["a_1"];
    b_text.innerHTML = currentQuizDate["a_2"];
    c_text.innerHTML = currentQuizDate["a_3"];
    d_text.innerHTML = currentQuizDate["a_4"];
  }
  
  
  
  nextBtn.addEventListener('click', () => {

    radioEls.forEach((radioEl) => {
      radioEl.checked = false;
    })
    correctAnswer.innerHTML = "Check Answer";
    correctAnswer.style.backgroundColor = "#000";
  
    currentQuiz++;
    if (currentQuiz < questions.length) {
      loadQuiz();
    } else {
      alert("Quiz finished!!");
    }
  })
  
  prevBtn.addEventListener('click', () => {
    correctAnswer.innerHTML = "Check Answer";
    correctAnswer.style.backgroundColor = "#000";
  
    currentQuiz--;
    if (currentQuiz >= 0) {
      loadQuiz();
    } else {
      currentQuiz++;
      alert("This is the first quiz");
    }
  })



  correctAnswer.addEventListener('click', (e) => {
    e.target.innerHTML = `Correct Answer: ${questions[currentQuiz].correct}`;
    e.target.style.backgroundColor = " rgb(57, 219, 65)";
  })

  

// Function to show the container
function showQuizComponent() {
  const quizContainer = document.querySelector('.container');
  quizContainer.style.display = 'block';
}

// Function to hide the container
function hideQuizComponent() {
  const quizContainer = document.querySelector('.container');
  quizContainer.style.display = 'none';
}

// Function to show the quiz inside quizcontainer
function showQuiz(){
  const quizContainer = document.querySelector('.quizcontainer');
  quizContainer.style.display = 'block';
}

const quizButton = document.querySelector('#quizButton');
quizButton.addEventListener('click', () => {
  showQuiz();
})


function showContainer(containerId) {
  const allContainers = document.querySelectorAll(".container");
  allContainers.forEach(container => {
    if (container.id === containerId) {
      container.style.display = "block";
    } else {
      container.style.display = "none";
    }
  });
}

function hideAllContainers() {
  const allContainers = document.querySelectorAll(".container");
  allContainers.forEach(container => {
    container.style.display = "none";
  });
  
}

//---Event Listener---
canvas.addEventListener('click', onClick, false);

function onClick(event) {
  event.preventDefault();

  const mouse = new THREE.Vector2();
  mouse.x = (event.clientX / sizes.width) * 2 - 1;
  mouse.y = -(event.clientY / sizes.height) * 2 + 1;

  const raycaster = new THREE.Raycaster();
  raycaster.setFromCamera(mouse, camera);

  const intersects = raycaster.intersectObjects(scene.children, true);

  if (intersects.length > 0) {
    
    const firstIntersection = intersects[0];

    
    if (firstIntersection.object === sun) {
      
      const info = showContainer("container-sun");
      showQuizComponent(info);

    } else if (firstIntersection.object === mercury.mesh) {
     
      const info = showContainer("container-mercury");
      showQuizComponent(info);

    } else if (firstIntersection.object === venus.mesh) {
      
      const info = showContainer("container-venus");
      showQuizComponent(info);
    
    } else if (firstIntersection.object === earth.mesh) {
      
      const info = showContainer("container-earth");
      showQuizComponent(info);
    
    } else if (firstIntersection.object === mars.mesh) {
      
      const info = showContainer("container-mars");
      showQuizComponent(info);
    
    } else if (firstIntersection.object === jupiter.mesh) {
      
      const info = showContainer("container-jupiter");
      showQuizComponent(info);
    
    } else if (firstIntersection.object === saturn.mesh) {
      
      const info = showContainer("container-saturn");
      showQuizComponent(info);

    } else if (firstIntersection.object === uranus.mesh) {
      
      const info = showContainer("container-uranus");
      showQuizComponent(info);

    
    } else if (firstIntersection.object === neptune.mesh) {
    
      const info = showContainer("container-neptune");
      showQuizComponent(info);
    }

    else {
      hideAllContainers()
      
    }
  } else {
    hideAllContainers()
    
  }
}


// Add the event listener for the "Test" buttons
const testButtons = document.querySelectorAll('.test-button');
testButtons.forEach(button => {
  button.addEventListener('click', () => {
    const planet = button.dataset.planet; // Get the planet name from the data attribute
    openQuizForPlanet(planet);
  });
});

// Function to open the quiz for a specific planet
function openQuizForPlanet(planet) {
  // Hide all containers first
  // hideAllContainers();


  // Get the quiz container for the specific planet and show it
  const quizContainer = document.getElementById(`container-${planet}-quiz`);
  quizContainer.style.display = 'block';
}

const startButton = document.getElementById('startButton');
startButton.addEventListener('click', startSpeech);

function startSpeech() {
  //alert("Hello");
  const speechText = `Welcome to the Avai Space Solar System Model! 
  In this immersive educational experience, we will take a journey through our magnificent solar system,
  exploring each planet and uncovering fascinating facts about our celestial neighbors.
  Get ready to be amazed and enlightened!`;

  const speechSynthesisUtterance = new SpeechSynthesisUtterance(speechText);
  window.speechSynthesis.speak(speechSynthesisUtterance);

}

    // Function to convert text to speech using the Web Speech API
    function speakText(text) {
      const synth = window.speechSynthesis;
      const speechText = new SpeechSynthesisUtterance(text);
      synth.speak(speechText);
  }

  // Get all speech buttons
  const speechButtons = document.querySelectorAll('.speech-button');

  // Add click event listeners to each speech button
  speechButtons.forEach((button) => {
      button.addEventListener('click', () => {
          // Get the planet container associated with the speech button
          const planetContainerId = 'container-' + button.dataset.planet;
          const planetContainer = document.getElementById(planetContainerId);

          // Extract the text content from the planet container
          const planetContent = planetContainer.textContent.trim();

          // Speak the text content
          speakText(planetContent);
      });
  });
