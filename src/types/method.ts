export interface MethodStore {
    isInitialized: boolean,
    methods: Method[],
}

export interface Method {
    id?: number,
    code: string,
    title: string,
    description: string,
}