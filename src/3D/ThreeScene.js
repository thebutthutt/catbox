import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

let camera, scene, renderer, controls, perspectiveControls, orthoControls, perspectiveCamera, orthoCamera;
let geometry, material, mesh;

const cameraSize = 20;

let isPerspective = true;

init();

// runs before mount - just prelim setup stuff
function init() {
  perspectiveCamera = new THREE.PerspectiveCamera(42, 1, 0.01, 1000);
  orthoCamera = new THREE.OrthographicCamera(
    cameraSize / -2,
    cameraSize / 2,
    cameraSize / 2,
    cameraSize / -2,
    0.01,
    1000
  );
  perspectiveCamera.position.z = 15;
  orthoCamera.position.z = 1;

  scene = new THREE.Scene();

  geometry = new THREE.BoxGeometry(1, 1, 1);
  material = new THREE.MeshNormalMaterial();

  mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  const axesHelper = new THREE.AxesHelper(50);
  scene.add(axesHelper);

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

    perspectiveCamera.aspect = width / height;
    orthoCamera.left = (cameraSize * aspect) / -2;
    orthoCamera.right = (cameraSize * aspect) / 2;

    perspectiveCamera.updateProjectionMatrix();
    orthoCamera.updateProjectionMatrix();
    render();
  }
}

// render if mounted
function render() {
  if (!renderer.domElement.parentNode) return;

  if (isPerspective) {
    renderer.render(scene, perspectiveCamera);
  } else {
    renderer.render(scene, orthoCamera);
  }
}

// runs ONCE when react mounts the element
export function mount(container) {
  // on initial mount
  if (container) {
    container.insertBefore(renderer.domElement, container.firstChild);
    onWindowResize();

    perspectiveControls = new OrbitControls(perspectiveCamera, renderer.domElement);
    orthoControls = new OrbitControls(orthoCamera, renderer.domElement);
    perspectiveControls.update();
    orthoControls.update();

    perspectiveControls.addEventListener("change", render);
    // no ortho listener

    render();
  }
  // on unmount
  else {
    renderer.domElement.remove();
  }
}

export function togglePerspectiveOrtho() {
  isPerspective = !isPerspective;
  if (isPerspective) {
    orthoControls.removeEventListener("change");
    perspectiveControls.addEventListener("change", render);
  } else {
    perspectiveControls.removeEventListener("change");
    orthoControls.addEventListener("change", render);
  }

  perspectiveControls.update();
  orthoControls.update();
  render();
}
