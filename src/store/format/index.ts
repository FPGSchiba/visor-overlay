import { IVISORReport, IVISORSmall } from "./report.format";

export interface AppState {
    authState: AuthState;
    reportState: IReportState;
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

export interface IReportState {
    updateState: IUpdateState;
}

export interface IUpdateState {
    updating: boolean;
    open: boolean;
    report?: IVISORReport;
}