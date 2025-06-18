import { createScene, getObjects } from './world/Scene.js';
import { setupControls } from './world/Controls.js';
import { updatePhysics } from './world/Physics.js';

let { scene, camera, renderer } = createScene();
setupControls(camera, renderer);

const { car } = getObjects(); // akses objek yg perlu dianimasikan

function animate() {
  requestAnimationFrame(animate);
  updatePhysics(car, camera); // gerakan mobil & handle popup
  renderer.render(scene, camera);
}
animate();
