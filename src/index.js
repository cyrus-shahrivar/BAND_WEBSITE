import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AboutSection from './about';
import ShowsSection from './shows';
import NewsSection from './news';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<AboutSection />, document.getElementById('about'));
ReactDOM.render(<ShowsSection />, document.getElementById('shows'));
ReactDOM.render(<NewsSection />, document.getElementById('news'));
registerServiceWorker();
