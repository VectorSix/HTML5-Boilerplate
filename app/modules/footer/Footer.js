import BaseComponent from '../../core/BaseComponent';
import htmlTemplate from './Footer.html';
import css from './Footer.css';

class Footer extends BaseComponent {
    constructor(prop) {
        super();
        this.state({
            copyright: {
                year: 2021,
                author: "severin-holm.ch",
                test: this.getJsonValue('info.text', prop, 'none')
            }
        });
    };

    render() {
        var html = this.renderTemplate(htmlTemplate, this.state());
        return html;
    }
}

export default Footer;