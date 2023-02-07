import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import visorBackend from "../../services/visor.backend";
import { AppState } from "../format";
import { ICompleteSystem, ISystem, ISystemSmall } from "../format/system.format";
import { ErrorResponse } from "./shared";
import { IVISORInput, IVISORReport, IVISORSmall, ISearchFilter } from "../format/report.format";
import { GET_LIST_REPORTS, GET_UPDATING_REPORT } from "../constants/reports";

export interface GetUpdatingReportAction extends Action<typeof GET_UPDATING_REPORT> {
	updating: boolean;
    report?: IVISORReport;
}

export interface GetListReportsAction extends Action<typeof GET_LIST_REPORTS> {
	total?: number;
	fetched?: number;
	reports?: IVISORSmall[];
}


export type ReportsActionTypes =
  | GetUpdatingReportAction

type ThunkResult<R> = ThunkAction<R, AppState, undefined, ReportsActionTypes>;

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

function getUpdatingReport(updating: boolean, report?: IVISORReport): GetUpdatingReportAction {
	return {
		type: GET_UPDATING_REPORT,
		updating: updating,
		report: report || undefined
	};
}

function getListReports(total?: number, fetched?: number, reports?: IVISORSmall[]): GetListReportsAction {
	return {
		type: GET_LIST_REPORTS,
		total,
		fetched,
		reports
	}
}

export function createReport(orgToken: string, userToken: string, visor: IVISORInput, callback: (err: ErrorResponse) => void): ThunkResult<void> {
	return async function (dispatch: (arg0:any) => void) {
		const result = await visorBackend.createReport(orgToken, userToken, visor);
		if (result.success && result.id) {
			const data = await visorBackend.getReport(orgToken, userToken, result.id);
			if (data.success && data.report) {
				dispatch(getUpdatingReport(true, data.report));
				callback(null);
			} else {
				callback({message: data.message});
			}
		 } else {
			callback({message: result.message});
		}
	}
}

export function listReports(orgToken: string, userToken: string, filter: ISearchFilter, callback: (err: ErrorResponse, list?: IVISORSmall[], total?: number) => void) {
	return async function (dispatch: (arg0: any) => void) {
		const fetched = filter.to || 20;
		const result = await visorBackend.listReports(orgToken, userToken, filter);
		if (result.success && result.reports && result.count) {
			dispatch(getListReports(result.count, fetched, result.reports));
			callback(null, result.reports, result.count);
		} else {
			callback({message: result.message});
		}
	}
}