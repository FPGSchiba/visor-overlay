export interface AppState {
    authState: AuthState;
}

/* Session handling
export interface UserState {
    sessionToken: string,
    user: IUser
} 
*/

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