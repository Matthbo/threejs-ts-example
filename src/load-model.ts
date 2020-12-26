import { LitElement, html, customElement, property, internalProperty, } from 'lit-element';
import { Scene, PerspectiveCamera, WebGLRenderer, DirectionalLight, Light } from 'three';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

@customElement('load-model')
export class ExampleThree extends LitElement {
    private scene: Scene;
    private camera: PerspectiveCamera;
    @internalProperty()
    private renderer: WebGLRenderer;

    @property({ type: Number })
    width: number;
    private aspect: number;

    private directionalLight: Light;
    private colour: number;

    constructor() {
        super();

        this.width = 0;
        this.aspect = window.innerWidth / window.innerHeight;

        this.scene = new Scene();
        this.camera = new PerspectiveCamera(80, this.aspect, 0.1, 1000);
        this.renderer = new WebGLRenderer();

        this.directionalLight = new DirectionalLight(0x00FF00, 0.8);
        this.colour = 0x0;
    }

    firstUpdated() {
        this.camera.position.y = 20;
        this.camera.position.z = 30;

        const loader = new GLTFLoader();
        loader.load('../src/Reginald-T-Rex.glb', (gltf) => {
            this.scene.add(this.directionalLight);
            this.scene.add(gltf.scene);

            const controls = new OrbitControls(this.camera, this.renderer.domElement);
            controls.target.set(0, 5, 0);
            controls.update();

        });

        this.renderer.setAnimationLoop(this.animLoop.bind(this));
    }

    updated() {
        this.aspect = window.innerWidth / window.innerHeight;
        this.camera.aspect = this.aspect;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(this.width, this.width / this.aspect);
    }

    animLoop() {
        if(this.colour < 0xFFFFFF) {
            if(this.colour < 0xFF) this.colour += 0x1;
            else if(this.colour < 0xFFFF) this.colour += 0x100;
            else this.colour += 0x10000;
            this.directionalLight.color.set(this.colour);
            console.log(this.directionalLight.color.getHexString())
        }
        this.renderer.render(this.scene, this.camera);
    }

    render() {
        return html`
            <h2>Load a 3D model</h2>
            ${this.renderer.domElement}
        `;
    }
}
