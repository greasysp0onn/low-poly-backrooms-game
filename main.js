import * as THREE from 'three';
import { World } from './world.js';

const scene = new THREE.Scene();
scene.fog = new THREE.Fog(0x000000, 1, 15);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: false });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(0.5); // "Potato" resolution effect
document.body.appendChild(renderer.domElement);

// Lighting - The classic "humming" fluorescent light
const light = new THREE.PointLight(0xfff9c4, 1, 10);
scene.add(light);
const ambient = new THREE.AmbientLight(0x222222);
scene.add(ambient);

const world = new World(scene);
world.generate(50, 50);

camera.position.set(6, 1.6, 6);

// Simple FPS Controls
const keys = {};
document.addEventListener('keydown', (e) => keys[e.code] = true);
document.addEventListener('keyup', (e) => keys[e.code] = false);

function update() {
    const speed = 0.1;
    if (keys['KeyW']) camera.translateZ(-speed);
    if (keys['KeyS']) camera.translateZ(speed);
    if (keys['KeyA']) camera.translateX(-speed);
    if (keys['KeyD']) camera.translateX(speed);
    
    // Light follows player with a slight flicker
    light.position.copy(camera.position);
    light.intensity = 0.8 + Math.random() * 0.4;

    document.getElementById('coords').innerText = 
        `X: ${Math.floor(camera.position.x)} Z: ${Math.floor(camera.position.z)}`;
}

function animate() {
    requestAnimationFrame(animate);
    update();
    renderer.render(scene, camera);
}

animate();
