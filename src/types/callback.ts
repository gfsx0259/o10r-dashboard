export interface CallbackStore {
    isInitialized: boolean,
    callbacks: Callback[],
}

export interface Callback {
    id?: number,
    scenario_id?: string,
    body: string,
    order: number,
}