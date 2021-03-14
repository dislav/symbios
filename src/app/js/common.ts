import { fromEvent } from 'rxjs';
import objectFitImages from 'object-fit-images';
import { getComponent } from './component';

import '../scss/common.scss';

// SVG
const requireAll = (r: __WebpackModuleApi.RequireContext) => r.keys().forEach(r);
requireAll(require.context('../../assets/icons', true, /\.svg$/));

// Components
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';

import TradeForm from '../../components/trade-form/trade-form';

fromEvent(document, 'DOMContentLoaded').subscribe(() => {
    new Header(getComponent('header'));
    new Footer(getComponent('footer'));

    if (getComponent('trade-form').component) new TradeForm(getComponent('trade-form'));

    const images = document.querySelectorAll('img');
    objectFitImages(images);
});
