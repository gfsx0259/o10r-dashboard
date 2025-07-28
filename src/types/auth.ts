export interface UserStore {
    isInitialized: boolean,
    isAuthenticated: boolean,
    email?: string,
    session?: object
}