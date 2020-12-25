import { LitElement, html, customElement } from 'lit-element';
import { Scene, PerspectiveCamera, WebGLRenderer, BoxGeometry, MeshBasicMaterial, Mesh } from 'three';

@customElement('my-element')
export class MyElement extends LitElement {
    private scene: Scene;
    private camera: PerspectiveCamera;
    private renderer: WebGLRenderer;
    private cube: Mesh;

    constructor(){
        super();

        this.scene = new Scene();
        this.camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new WebGLRenderer();

        this.renderer.setSize(window.innerWidth, window.innerHeight);

        const geometry = new BoxGeometry();
        const material = new MeshBasicMaterial({ color: 0xff0000 });
        this.cube = new Mesh(geometry, material);
        this.scene.add(this.cube);

        this.camera.position.z = 5;

        this.animLoop();
    }

    animLoop(){
        requestAnimationFrame(this.animLoop.bind(this));

        this.cube.rotation.x += 0.01;
        this.cube.rotation.y += 0.01;

        this.renderer.render(this.scene, this.camera);
    }

    render() {
        return html`${this.renderer.domElement}`;
    }
}
