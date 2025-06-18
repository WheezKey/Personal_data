import * as THREE from 'three';
import { loadFont } from '../utils/Loader.js';
import { bioData } from '../utils/Bio.js';

let scene, camera, renderer, car;

export function createScene() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color('#111');

  camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 100);
  camera.position.set(0, 2, 5);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(5, 10, 5);
  scene.add(light);

  // Ground
  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(50, 50),
    new THREE.MeshStandardMaterial({ color: 0x333333 })
  );
  ground.rotation.x = -Math.PI / 2;
  scene.add(ground);

  // Mobil
  car = new THREE.Mesh(
    new THREE.BoxGeometry(1, 0.5, 2),
    new THREE.MeshStandardMaterial({ color: 0xff5500 })
  );
  car.position.set(0, 0.25, 0);
  scene.add(car);

  // Nama 3D
  loadFont('/fonts/helvetiker_regular.typeface.json').then((font) => {
    const textGeo = new THREE.TextGeometry(bioData.name, {
      font: font,
      size: 0.5,
      height: 0.1
    });
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const mesh = new THREE.Mesh(textGeo, material);
    mesh.position.set(-3, 1, -3);
    scene.add(mesh);
  });

  return { scene, camera, renderer };
}

export function getObjects() {
  return { car };
}
