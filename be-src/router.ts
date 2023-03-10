import { Router } from '@vaadin/router';

const router = new Router(document.querySelector(".root"));
router.setRoutes([
    { path: '/', component: 'welcome-page' },
    { path: '/login', component: 'login-page' },
    { path: '/create-user', component: 'create-page' },
    { path: '/edit-user', component: 'edit-user' },
    { path: '/my-user', component: 'data-page' },
    { path: '/lost-pets', component: 'lost-page' },
    { path: '/my-reports', component: 'myreport-page' },
    { path: '/message', component: 'message-page' },
    { path: '/new-report', component: 'report-pet' },
    { path: '/edit', component: 'edit-pet' },
    { path: '/test', component: 'test-page' },
]);
