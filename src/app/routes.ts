import {
    createBrowserRouter,
    createPanel,
    createRoot,
    createView,
    RoutesConfig,
} from '@vkontakte/vk-mini-apps-router';

export const DEFAULT_ROOT = 'default_root';

export const DEFAULT_VIEW = 'default_view';

export const DEFAULT_VIEW_PANELS = {
    FACTS: 'facts',
    AGE: 'age',
} as const;

export const DEFAULT_VIEW_PANELS_PATHS = {
    [DEFAULT_VIEW_PANELS.FACTS]: '/',
    [DEFAULT_VIEW_PANELS.AGE]: '/age',
} as const;



export const routes = RoutesConfig.create([
    createRoot(DEFAULT_ROOT, [
        createView(DEFAULT_VIEW, [
            createPanel(DEFAULT_VIEW_PANELS.FACTS, DEFAULT_VIEW_PANELS_PATHS[DEFAULT_VIEW_PANELS.FACTS], []),
            createPanel(DEFAULT_VIEW_PANELS.AGE, DEFAULT_VIEW_PANELS_PATHS[DEFAULT_VIEW_PANELS.AGE], []),
        ]),
    ]),
]);

export const router = createBrowserRouter(routes.getRoutes());