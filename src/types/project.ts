export interface ProjectStore {
    isInitialized: boolean,
    projects: Project[],
}

export interface Project {
    id: number,
    code: string,
    title: string,
    description: string
    methods: number[],
    settings: Setting[],
}

export interface Setting {
    code: string,
    value: string,
    group: string,
}