import { LitElement, html, customElement, property, internalProperty,  } from 'lit-element';
import { Scene, PerspectiveCamera, WebGLRenderer, BoxGeometry, MeshBasicMaterial, Mesh } from 'three';

@customElement('creating-a-scene')
export class ExampleOne extends LitElement {
    private scene: Scene;
    private camera: PerspectiveCamera;
    @internalProperty()
    private renderer: WebGLRenderer;
    private cube: Mesh;
    
    @property({ type: Number })
    width: number;
    private aspect: number;

    constructor(){
        super();

        this.width = 0;
        this.aspect = window.innerWidth / window.innerHeight;

        this.scene = new Scene();
        this.camera = new PerspectiveCamera(75, this.aspect, 0.1, 1000);
        this.renderer = new WebGLRenderer();

        const geometry = new BoxGeometry();
        const material = new MeshBasicMaterial({ color: 0xff0000 });
        this.cube = new Mesh(geometry, material);
    }

    firstUpdated(){
        this.scene.add(this.cube);
        this.camera.position.z = 5;
        
        this.renderer.setAnimationLoop(this.animLoop.bind(this))
    }
    
    updated(){
        this.aspect = window.innerWidth / window.innerHeight;
        this.camera.aspect = this.aspect;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(this.width, this.width / this.aspect);

    }

    animLoop() {
        this.cube.rotation.x += 0.001;
        this.cube.rotation.y += 0.001;

        this.renderer.render(this.scene, this.camera);
    }

    render() {
        return html`
            <h2>Creating a scene</h2>
            ${this.renderer.domElement}
        `;
    }
}
