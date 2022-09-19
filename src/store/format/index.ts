export interface AppState {
    currentUser: IUser
}

/* Session handling
export interface UserState {
    sessionToken: string,
    user: IUser
} 
*/

export interface IUser {
    username: string, 
    password: string
}