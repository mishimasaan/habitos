const routes = new Map();
let onChange = () => {};
let currentRouteKey = '';

export function registerRoute(name, handler) {
  routes.set(name, handler);
}

export function parseRoute(hash = location.hash) {
  const clean = hash.replace(/^#\/?/, '') || 'home';
  const [name, ...parts] = clean.split('/');
  return { name, parts, query: new URLSearchParams(location.search) };
}

function routeKey(route) {
  return `${route.name}/${route.parts.join('/')}?${route.query.toString()}`;
}

function handleChange(force = false) {
  const route = parseRoute();
  const nextKey = routeKey(route);
  if (!force && nextKey === currentRouteKey) return;
  currentRouteKey = nextKey;
  onChange(route);
}

export function navigate(path) {
  const target = path.startsWith('#') ? path : `#/${path.replace(/^\//, '')}`;
  if (location.hash === target) return;
  location.hash = target;
}

export function startRouter(callback) {
  onChange = callback;
  addEventListener('hashchange', () => handleChange());
  handleChange(true);
}

export function resolveRoute(route) {
  return routes.get(route.name) || routes.get('home');
}
