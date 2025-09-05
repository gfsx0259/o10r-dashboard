export interface StaticStore {
    isInitialized: boolean,
    routes: StaticRoute[],
}

export interface StaticRoute {
    id?: number,
    scenario_id?: string,
    path: string,
    body: string,
}