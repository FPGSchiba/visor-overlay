import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import visorBackend from "../../services/visor.backend";
import { AppState } from "../format";
import { ICompleteSystem, ISystem, ISystemSmall } from "../format/system.format";
import { ErrorResponse } from "./shared";
import { DUMMY_ACTION } from "../constants/dummy";
import { IVISORInput } from "../format/report.format";

export interface SystemDummyAction extends Action<typeof DUMMY_ACTION> {}


export type SystemActionTypes =
  | SystemDummyAction

type ThunkResult<R> = ThunkAction<R, AppState, undefined, SystemActionTypes>;

export function getSystems(
		orgToken: string,
		userToken: string,
		callback: (err: ErrorResponse, data?: ISystemSmall[]) => void
	): ThunkResult<void> {
	return async function (dispatch: (arg0:any) => void) {
		const result = await visorBackend.getSystems(orgToken, userToken);
		if (result.success) {
			callback(null, result.systems);
		 } else {
			callback({message: result.message});
		}
	}
}

export function getSystem(
		orgToken: string,
		userToken: string,
		id: string,
		callback: (err: ErrorResponse, data?: ICompleteSystem) => void
	): ThunkResult<void> {
		return async function (dispatch: (arg0:any) => void) {
			const result = await visorBackend.getSystem(orgToken, userToken, id);
			if (result.success) {
				callback(null, result.system);
			 } else {
				callback({message: result.message});
			}
		}
	}

export function createReport(orgToken: string, userToken: string, visor: IVISORInput, callback: (err: ErrorResponse, id?: string) => void): ThunkResult<void> {
	return async function (dispatch: (arg0:any) => void) {
		const result = await visorBackend.createReport(orgToken, userToken, visor);
		if (result.success) {
			callback(null, result.id);
		 } else {
			callback({message: result.message});
		}
	}
}