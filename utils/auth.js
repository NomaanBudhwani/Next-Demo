import cookies from "js-cookie";
import Router from "next/router";

export function handleLogin(token, route) {
    cookies.set("token", token);
    Router.push(route);
}
export function redirectUser(ctx, location) {
    if (ctx.req) {
        ctx.res.writeHead(302, { Location: location });
        ctx.res.end();
    } else {
        Router.push(location);
    }
}
export function handleLogout() {
    cookies.remove("token");
    window.localStorage.setItem("logout", Date.now());
    Router.push("/login");
}
export function getCookies(name) {
    return cookies.get(name);
}
export function pushRoute(route) {
    Router.push(route);
}
