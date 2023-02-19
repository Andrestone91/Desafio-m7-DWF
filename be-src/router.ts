import { Router } from '@vaadin/router';

const router = new Router(document.querySelector(".root"));
router.setRoutes([
    { path: '/', component: 'welcome-page' },
    { path: '/login', component: 'login-page' },
    { path: '/create-user', component: 'create-page' },
    { path: '/my-user', component: 'data-page' },
    { path: '/lost-pets', component: 'lost-page' },
    { path: '/new-report', component: 'report-pet' },
]);
