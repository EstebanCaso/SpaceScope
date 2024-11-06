import * as THREE from 'three';
import { FirstPersonControls } from 'three/addons/controls/FirstPersonControls.js';
import Stats from 'three/addons/libs/stats.module.js';
import { loadModel, loadSky } from './modelos.js'; 
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { OutlinePass } from 'three/addons/postprocessing/OutlinePass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { FXAAShader } from 'three/addons/shaders/FXAAShader.js';



// Inicialización básica
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 3000000);
camera.position.set(30000, 0, 6000);

const clock = new THREE.Clock();

// Ajustar luces
const ambientLight = new THREE.AmbientLight(0xFFFFFF , 0.5); // Baja la intensidad de la luz ambiental
scene.add(ambientLight);

// Controles
const controls = new FirstPersonControls(camera, renderer.domElement);
controls.movementSpeed = 1800;
controls.lookSpeed = 0.20;

// Configuración de EffectComposer
const composer = new EffectComposer(renderer);
const renderPass = new RenderPass(scene, camera);
renderPass.clear = true;  // Asegurarse de que el frame buffer se limpie correctamente
composer.addPass(renderPass);

const outlinePass = new OutlinePass(new THREE.Vector2(window.innerWidth, window.innerHeight), scene, camera);
outlinePass.edgeStrength = 3.0;
outlinePass.edgeGlow = 1.0;
outlinePass.edgeThickness = 2.0;
outlinePass.pulsePeriod = 0;
outlinePass.visibleEdgeColor.set('#ffffff');
outlinePass.hiddenEdgeColor.set('#190a05');
composer.addPass(outlinePass);

const fxaaPass = new ShaderPass(FXAAShader);
fxaaPass.uniforms['resolution'].value.set(1 / window.innerWidth, 1 / window.innerHeight);
composer.addPass(fxaaPass);

// Cargar modelos
loadModel(scene, outlinePass);
loadSky(scene);


// Manejar redimensionamiento de la ventana
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  composer.setSize(window.innerWidth, window.innerHeight);
  controls.handleResize();
  fxaaPass.uniforms['resolution'].value.set(1 / window.innerWidth, 1 / window.innerHeight);
});

// Ciclo de animación
function animate() {
  requestAnimationFrame(animate);
 const delta = clock.getDelta();
  controls.update(delta);
  composer.render(); 
}



animate();
  

