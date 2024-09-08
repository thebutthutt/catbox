import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

let camera, scene, renderer, controls;
let geometry, material, mesh;

const cameraSize = 50;

init();

// runs before mount - just prelim setup stuff
function init() {
  // camera = new THREE.PerspectiveCamera(42, 1, 0.01, 10);
  camera = new THREE.OrthographicCamera(cameraSize / -2, cameraSize / 2, cameraSize / 2, cameraSize / -2, 0.1, 1000);
  camera.position.z = 1;

  scene = new THREE.Scene();

  geometry = new THREE.BoxGeometry(1, 1, 1);
  material = new THREE.MeshNormalMaterial();

  mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  renderer = new THREE.WebGLRenderer({ antialias: true });

  window.addEventListener("resize", onWindowResize);
  onWindowResize();
}

// resize and rerender
function onWindowResize() {
  const container = renderer.domElement.parentNode;

  if (container) {
    const width = container.offsetWidth;
    const height = container.offsetHeight;
    const aspect = width / height;

    renderer.setSize(width, height);

    // camera.aspect = width / height;
    camera.left = (cameraSize * aspect) / -2;
    camera.right = (cameraSize * aspect) / 2;

    camera.updateProjectionMatrix();
    render();
  }
}

// render if mounted
function render() {
  if (!renderer.domElement.parentNode) return;
  renderer.render(scene, camera);
}

// runs ONCE when react mounts the element
export function mount(container) {
  // on initial mount
  if (container) {
    container.insertBefore(renderer.domElement, container.firstChild);
    onWindowResize();
    controls = new OrbitControls(camera, renderer.domElement);
    controls.update();
    controls.addEventListener("change", render);
    render();
  }
  // on unmount
  else {
    renderer.domElement.remove();
  }
}
