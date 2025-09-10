export interface MockModeStore {
    isInitialized: boolean,
    mode?: MockMode,
}

export interface MockMode {
    scenarioId: number,
    staticRoutesIds: number[]
}