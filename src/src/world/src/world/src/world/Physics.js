const popup = document.getElementById('popup');
let direction = 1;

export function updatePhysics(car, camera) {
  // Animasi mobil maju-mundur
  car.position.x += 0.02 * direction;
  if (car.position.x > 3 || car.position.x < -3) direction *= -1;

  // Cek jarak kamera ke mobil → popup muncul
  const distance = camera.position.distanceTo(car.position);
  popup.style.display = (distance < 3) ? 'block' : 'none';
}
