import { LitElement, html, customElement, property } from 'lit-element';

@customElement('my-element')
export class MyElement extends LitElement {
    @property({ type: String })
    title = 'Hello World';

    render() {
        return html`
      <h1>${this.title}!</h1>
    `;
    }
}
