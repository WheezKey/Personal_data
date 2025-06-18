import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { bioData } from './bio.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color('#222');

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(0, 2, 5);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Kontrol kamera
const controls = new OrbitControls(camera, renderer.domElement);

// Cahaya
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 10, 7.5);
scene.add(light);

// Tanah
const ground = new THREE.Mesh(
  new THREE.PlaneGeometry(50, 50),
  new THREE.MeshStandardMaterial({ color: 0x333333 })
);
ground.rotation.x = -Math.PI / 2;
scene.add(ground);

// Mobil Kotak
const car = new THREE.Mesh(
  new THREE.BoxGeometry(1, 0.5, 2),
  new THREE.MeshStandardMaterial({ color: 0xff5500 })
);
car.position.set(0, 0.25, 0);
scene.add(car);

// Tampilkan Nama
const loader = new FontLoader();
loader.load('/fonts/helvetiker_regular.typeface.json', (font) => {
  const textGeo = new TextGeometry(bioData.name, {
    font: font,
    size: 0.5,
    height: 0.1
  });

  const textMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const textMesh = new THREE.Mesh(textGeo, textMaterial);
  textMesh.position.set(-3, 1, -3);
  scene.add(textMesh);
});

// Render loop
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();

// ...existing imports and setup
const popup = document.getElementById('popup');

// Mobil animasi bergerak maju-mundur
let carDirection = 1;

// Skill Texts
const skills = ['JavaScript', 'Three.js', 'React', 'WebGL'];
const projects = ['Portfolio 3D', 'Game Balap', 'UI Web Keren'];

function addTextAround(textArray, radius, y, color) {
  loader.load('/fonts/helvetiker_regular.typeface.json', (font) => {
    textArray.forEach((txt, i) => {
      const angle = (i / textArray.length) * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;

      const geo = new TextGeometry(txt, {
        font,
        size: 0.3,
        height: 0.05
      });
      const mat = new THREE.MeshStandardMaterial({ color });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(x, y, z);
      mesh.lookAt(0, y, 0); // face center
      scene.add(mesh);
    });
  });
}

addTextAround(skills, 5, 1.2, 0x00ffff);
addTextAround(projects, 6.5, 0.5, 0xffdd00);

// Tombol interaksi (box kecil)
const button = new THREE.Mesh(
  new THREE.BoxGeometry(0.5, 0.2, 0.5),
  new THREE.MeshStandardMaterial({ color: 0x00ff00 })
);
button.position.set(2, 0.1, 0);
scene.add(button);

// Event listener (click di objek)
window.addEventListener('click', (event) => {
  const mouse = new THREE.Vector2(
    (event.clientX / window.innerWidth) * 2 - 1,
    -(event.clientY / window.innerHeight) * 2 + 1
  );
  const raycaster = new THREE.Raycaster();
  raycaster.setFromCamera(mouse, camera);

  const intersects = raycaster.intersectObjects([button]);
  if (intersects.length > 0) {
    alert("Tombol ditekan! 🚀 Kamu bisa ganti ini jadi buka CV PDF atau aksi lainnya.");
  }
});

function animate() {
  requestAnimationFrame(animate);
  controls.update();

  // Mobil animasi
  car.position.x += 0.02 * carDirection;
  if (car.position.x > 3 || car.position.x < -3) carDirection *= -1;

  // Jarak kamera ke mobil
  const distance = camera.position.distanceTo(car.position);
  popup.style.display = (distance < 3) ? 'block' : 'none';

  renderer.render(scene, camera);
}
animate();
