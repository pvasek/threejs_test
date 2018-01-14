import * as THREE from "three";
import { OrbitControls } from "three";


class Main {
    constructor(element: HTMLElement) {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0xb0b0b0);

        this.camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 1000);
        this.camera.position.set(0, 0, 200);

        const group = new THREE.Group();
        this.scene.add(group);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
        directionalLight.position.set(0.75, 0.75, 1.0).normalize();
        this.scene.add(directionalLight);
        const ambientLight = new THREE.AmbientLight(0xcccccc, 0.2);
        this.scene.add(ambientLight);
        const helper = new THREE.GridHelper(160, 10);
        helper.rotation.x = Math.PI / 2;
        group.add(helper);

        const geometry = new THREE.BoxBufferGeometry(10, 10, 10);
        const material = new THREE.MeshBasicMaterial({ color: 0x00ffff});
        const mesh = new THREE.Mesh(geometry, material);
        group.add(mesh);

        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        element.appendChild(this.renderer.domElement);
        
        const controls = new OrbitControls(this.camera, this.renderer.domElement);
        
        window.addEventListener('resize', () => this.onWindowResize(), false);        
        this.animate();
    }

    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;

    private onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);            
    }

    private animate() {
        requestAnimationFrame(() => this.animate());
        this.renderer.render(this.scene, this.camera);                 
    }
}

const element = document.getElementById("container");
const main = new Main(element);