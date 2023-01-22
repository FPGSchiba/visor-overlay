export interface AppState {
    authState: AuthState;
}

export interface AuthState {
    currentUser: IUser
    currentOrg: IOrg
}

export interface IOrg {
    token: string,
    name: string
}

export interface IUser {
    token: string, 
    handle: string,
    role: string,
}