import BaseComponent from './core/BaseComponent';
import BaseFramework from './core/BaseFramework';
import Home from './pages/home/Home';
import css from './assets/css/app.css';

const FRAMEWORK = BaseFramework(() => {
    const home = new Home();
    home.renderTo('#app');
});