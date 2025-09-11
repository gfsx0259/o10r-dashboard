export interface ActiveScenarioStore {
    isInitialized: boolean,
    activeScenario?: ActiveScenario,
}

export interface ActiveScenario {
    scenarioId: number,
    staticRoutesIds: number[]
}