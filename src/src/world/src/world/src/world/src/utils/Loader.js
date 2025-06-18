import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';

export function loadFont(path) {
  return new Promise((resolve, reject) => {
    const loader = new FontLoader();
    loader.load(path, resolve, undefined, reject);
  });
}
