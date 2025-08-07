export interface ScenarioStore {
    isInitialized: boolean,
    scenarios: Scenario[],
}

export interface Scenario {
    id?: number,
    route_id?: string,
    title: string,
    conditions: string,
}