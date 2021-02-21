import BaseComponent from '../../core/BaseComponent';
import htmlTemplate from './Home.html';
import css from './Home.css';
import Footer from './../../modules/footer/Footer';

class Home extends BaseComponent {
    constructor(prop) {
        super();
        this.state({
            header: {
                title: "Fancy Boilerplate"
            }
        });
    };

    render() {
        const data = {
            header: {
                title: this.state().header.title
            },
            footer: new Footer({info: {text: this.state().header.title}})
        }
        var html = this.renderTemplate(htmlTemplate, data);
        return html;
    }
}

export default Home;