import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/Addons.js';

export default function Models() {
    const outerBox = document.querySelector(".outerBox");
    let canvas = document.querySelector("#box");
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera((outerBox.clientWidth / outerBox.clientHeight) *100/(window.innerWidth/window.innerHeight), outerBox.clientWidth / outerBox.clientHeight, 0.1, 1000);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const spotLight = new THREE.SpotLight(0xffffff, 2, 100, Math.PI / 6, 0.5, 2);
    spotLight.position.set(20, 40, 50);
    spotLight.castShadow = true;
    scene.add(spotLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(-30, 20, 20);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    // Environment map for reflections
    const loader = new THREE.CubeTextureLoader();
    const envMap = loader.load([
        'https://threejs.org/examples/textures/cube/Bridge2/posx.jpg',
        'https://threejs.org/examples/textures/cube/Bridge2/negx.jpg',
        'https://threejs.org/examples/textures/cube/Bridge2/posy.jpg',
        'https://threejs.org/examples/textures/cube/Bridge2/negy.jpg',
        'https://threejs.org/examples/textures/cube/Bridge2/posz.jpg',
        'https://threejs.org/examples/textures/cube/Bridge2/negz.jpg'
    ]);
    scene.environment = envMap;
    camera.up.set(0, -2, 0); // Y axis is up
    camera.position.set(0, -0.7, -10); // Looking towards the origin from +Z

    document.title = "3d models";
    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
    renderer.setSize(outerBox.clientWidth, outerBox.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    window.addEventListener("resize", () => {
        renderer.setSize(outerBox.clientWidth, outerBox.clientHeight);
        camera.aspect = outerBox.clientWidth / outerBox.clientHeight;
        camera.updateProjectionMatrix();
    });

    // --- Interactivity ---

    // Model moves only on x-axis (left/right)
    let targetRotationY = 0;

    outerBox.addEventListener("mousemove", (event) => {
        const rect = outerBox.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width;

        // Map cursor position to rotation angle (only y-axis)
        targetRotationY = (x - 0.5) * Math.PI; // left/right
    });


    // --- GLTF Model Loading ---
    let loadedModel = null;
    const gltfLoader = new GLTFLoader();
    gltfLoader.load(
        '../assets/models/scene.gltf',
        function (gltf) {
            loadedModel = gltf.scene;
            loadedModel.traverse((child) => {
                if (child.isMesh) {
                    // Make it shiny!
                    child.material = new THREE.MeshPhysicalMaterial({
                        color: child.material.color,
                        metalness: 1,
                        roughness: 0.1,
                        envMap: envMap,
                        clearcoat: 1,
                        clearcoatRoughness: 0.05,
                        reflectivity: 1
                    });
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });
            scene.add(loadedModel);
        },
        undefined,
        function (error) {
            console.error('Error loading GLTF model:', error);
        }
    );

    // --- Cursor pointing in x-axis ---
    // Remove hover effect code and add a cursor arrow mesh
    const cursorGeometry = new THREE.ConeGeometry(0.05, 0.2, 16);
    const cursorMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });
    const cursor = new THREE.Mesh(cursorGeometry, cursorMaterial);
    cursor.position.set(0, 0, 0);
    cursor.rotation.z = -Math.PI / 2; // Point along +X axis
    scene.add(cursor);

    // --- Animation Loop ---
    function animate() {
        requestAnimationFrame(animate);

        if (loadedModel) {
            // Only rotate on y-axis (left/right)
            loadedModel.rotation.y += (targetRotationY - loadedModel.rotation.y) * 0.05;
        }

        camera.position.z = 3;
        renderer.render(scene, camera);
    }

    animate();
}
