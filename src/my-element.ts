
import "./ups-system";
import { LitElement, html, customElement, css, internalProperty } from 'lit-element';
import "./creating-a-scene";
import "./drawing-lines";
import "./load-model";

@customElement('my-element')
export class MyElement extends LitElement {
    @internalProperty()
    private contentWidth: number;

    constructor(){
        super();

        this.contentWidth = window.innerWidth / 4 * 3;
        
        window.addEventListener("resize", () => {
            this.contentWidth = window.innerWidth / 4 * 3;
        });
    }

    static get styles(){
        return css`
            .example {
                display: block;
                width: 75vw;
                margin: 0 auto 32px;
            }
        `;
    }

    render() {
        return html`
            <h1>Examples</h1>
            <creating-a-scene .width="${this.contentWidth}" class="example"></creating-a-scene>
            <drawing-lines .width="${this.contentWidth}" class="example"></drawing-lines>
            <load-model .width="${this.contentWidth}" class="example"></load-model>
            <ups-system .width="${this.contentWidth}" class="example"></ups-system>
        `;
    }
}
