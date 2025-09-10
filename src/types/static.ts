export interface StaticStore {
    isInitialized: boolean,
    routes: StaticRoute[],
}

export interface StaticRoute {
    id?: number,
    name: string,
    path: string,
    body: string,
}