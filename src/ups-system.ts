import { LitElement, html, customElement, property, internalProperty, css, } from 'lit-element';
import { Scene, PerspectiveCamera, WebGLRenderer, BoxGeometry, MeshBasicMaterial, Mesh } from 'three';
import '@material/mwc-slider';

@customElement('ups-system')
export class UPSSystem extends LitElement {
    private scene: Scene;
    private camera: PerspectiveCamera;
    @internalProperty()
    private renderer: WebGLRenderer;
    private cube: Mesh;

    @property({ type: Number })
    width: number = 0;
    private aspect: number;

    private ups = 60; 
    private frames = 0;
    @internalProperty()
    private fpsCount: number = 0;
    @internalProperty()
    private upsCount: Number = 0;

    constructor() {
        super();

        this.aspect = window.innerWidth / window.innerHeight;

        this.scene = new Scene();
        this.camera = new PerspectiveCamera(75, this.aspect, 0.1, 1000);
        this.renderer = new WebGLRenderer();

        const geometry = new BoxGeometry();
        const material = new MeshBasicMaterial({ color: 0xff0000 });
        this.cube = new Mesh(geometry, material);
    }

    firstUpdated() {
        this.scene.add(this.cube);
        this.camera.position.z = 5;

        this.setUpdateLoop();
        this.renderer.setAnimationLoop(this.renderLoop.bind(this));
    }

    updated() {
        this.aspect = window.innerWidth / window.innerHeight;
        this.camera.aspect = this.aspect;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(this.width, this.width / this.aspect);
    }

    setUpdateLoop(){
        let lastTime = Date.now();
        let timer = Date.now();
        let updates = 0;
        let delta = 0;
        // const frequency = 1000 / this.ups;

        const updateSetup = () => {
            const now = Date.now();
            const frequency = 1000 / this.ups;
            delta += (now - lastTime) / frequency;
            lastTime = now;

            while(delta >= 1){
                this.updateLoop();
                updates += 1;
                delta -= 1;
            }

            if (Date.now() - timer > 1000) {
                timer += 1000;
                this.fpsCount = this.frames;
                this.frames = 0;
                this.upsCount = updates;
                updates = 0;
            }

            setTimeout(updateSetup, 0);
        }

        setTimeout(updateSetup, 0);
    }

    updateLoop() {
        this.cube.rotation.x += 0.01;
        this.cube.rotation.y += 0.01;
    }

    renderLoop() {
        this.frames += 1;
        this.renderer.render(this.scene, this.camera);
    }

    static get styles(){
        return css`
            mwc-slider {
                width: 100%;
            }
        `;
    }

    render() {
        return html`
            <h2>Updates-per-second system</h2>
            <p>
                FPS: ${this.fpsCount},
                UPS: ${this.upsCount}
            </p>
            ${this.renderer.domElement}
            <mwc-slider step="5" pin markers value="${this.ups}" max="200" @change=${(event: Event) => { this.ups = parseInt((event.target as HTMLInputElement).value) }}></mwc-slider>
        `;
    }
}
