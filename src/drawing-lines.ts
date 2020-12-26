import { LitElement, html, customElement, property, internalProperty, } from 'lit-element';
import { Scene, PerspectiveCamera, WebGLRenderer, Line, BufferGeometry, Vector3, LineBasicMaterial } from 'three';

@customElement('drawing-lines')
export class ExampleTwo extends LitElement {
    private scene: Scene;
    private camera: PerspectiveCamera;
    @internalProperty()
    private renderer: WebGLRenderer;
    private line: Line;

    @property({ type: Number })
    width: number;
    private aspect: number;

    constructor() {
        super();

        this.width = 0;
        this.aspect = window.innerWidth / window.innerHeight;

        this.scene = new Scene();
        this.camera = new PerspectiveCamera(45, this.aspect, 1, 500);
        this.renderer = new WebGLRenderer();

        const geometry = new BufferGeometry().setFromPoints([
            new Vector3(-10, 0, 0),
            new Vector3(0, 10, 0),
            new Vector3(10, 0, 0)
        ]);
        const material = new LineBasicMaterial({ color: 0xff0000 });
        this.line = new Line(geometry, material);
    }

    firstUpdated() {
        this.scene.add(this.line);
        this.camera.position.set(0,0,100);
        this.camera.lookAt(0,0,0);

        this.renderer.setAnimationLoop(this.animLoop.bind(this))
    }

    updated() {
        this.aspect = window.innerWidth / window.innerHeight;
        this.camera.aspect = this.aspect;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(this.width, this.width / this.aspect);
    }

    animLoop() {
        this.renderer.render(this.scene, this.camera);
    }

    render() {
        return html`
            <h2>Drawing lines</h2>
            ${this.renderer.domElement}
        `;
    }
}
