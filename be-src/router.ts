import { Router } from '@vaadin/router';

const router = new Router(document.querySelector(".root"));
router.setRoutes([
    { path: '/', component: 'welcome-page' },
    { path: '/login', component: 'login-page' },
    { path: '/create-user', component: 'create-page' },
    { path: '/lost-pets', component: 'lost-page' },
]);
