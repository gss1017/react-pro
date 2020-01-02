export function getAuthorityFromRouter(routes, path) {
    return routes.find(item => item.path === path);
}
