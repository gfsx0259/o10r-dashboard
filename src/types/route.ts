export interface RouteStore {
    isInitialized: boolean,
    routes: Route[],
}

export interface Route {
    id?: number,
    method_id?: string,
    conditions: string,
}