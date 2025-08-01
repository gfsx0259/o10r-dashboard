export interface SchemaStore {
    isInitialized: boolean,
    schemas: Schema[],
}

export interface Schema {
    id?: number,
    method_id?: number,
    fields: string,
}