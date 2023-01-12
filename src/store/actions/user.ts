import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { getUserInfoFromCookies, setUserInfoToCookies } from '../../services/util';
import visorBackend from '../../services/visor.backend';
import { GET_USER_SUCCESS, GET_ORG_SUCCESS } from '../constants/user';
import { AppState, IOrg, IUser } from '../format';
import { ErrorResponse } from './shared';
const { ipcRenderer } = window.require("electron");

export interface GetUserSuccessAction extends Action<typeof GET_USER_SUCCESS> {
    user: IUser;
}

export interface GetOrgSuccessAction extends Action<typeof GET_ORG_SUCCESS> {
	org: IOrg;
}

export type UserActionTypes =
  | GetUserSuccessAction
  | GetOrgSuccessAction;

type ThunkResult<R> = ThunkAction<R, AppState, undefined, UserActionTypes>;

export function getUserSuccess(handle: string, token: string, role: string): GetUserSuccessAction {
	return {
		type: GET_USER_SUCCESS,
		user: {
			handle,
			role,
			token
		}
	};
}

export function getOrgSuccess(name: string, token: string): GetOrgSuccessAction {
	return {
		type: GET_ORG_SUCCESS,
		org: {
			name,
			token
		}
	}
}

export function doLogin(
    orgToken: string,
    userToken: string,
    remember: boolean,
    callback: (
      err?: ErrorResponse,
    ) => void,
  ): ThunkResult<void> {
    return async function (dispatch: (arg0: any) => void) {
      try {
        const result = await visorBackend.getUserInfo(orgToken, userToken);
        if (result.success) {
			if (remember) {
				ipcRenderer.send('saveLogin', {userToken, orgToken});
			}
			if (result.handle && result.role && result.orgName) {
				dispatch(getUserSuccess(result.handle, userToken, result.role));
				dispatch(getOrgSuccess(result.orgName, orgToken));
				const org: IOrg = {
					name: result.orgName,
					token: orgToken,
				}
				const user: IUser = {
					handle: result.handle,
					role: result.role,
					token: userToken,
				}
				setUserInfoToCookies({org, user});
				callback(null);
			} else {
				callback({ message: result.message })
			}
        } else {
			callback({ message: result.message })
		}
      } catch (err: any) {
        const error = err.response?.data || err;
        callback(error);
      }
    };
}

export function updateUserInfo(): ThunkResult<void>{
	return async function (dispatch: (arg0: any) => void) {
	  const currentAuth = await getUserInfoFromCookies();
	  const {user, org} = currentAuth;
	  if (user) dispatch(getUserSuccess(user.handle, user.token, user.role));
	  if (org) dispatch(getOrgSuccess(org.name, org.token));
	}
}

export function getUsersList(orgToken: string, userToken: string, callback: (err?: ErrorResponse, data?: IUser[]) => void): ThunkResult<void> {
	return async function (dispatch: (arg0:any) => void) {
		const result = await visorBackend.listUsers(orgToken, userToken);
		if (result.success && result.users) {
			callback(null, result.users);
		} else {
			callback({message: result.message});
		}
	}
}

export function getSpecificUser(orgToken: string, userToken: string, handle: string, callback: (err?: ErrorResponse, data?: IUser) => void) {
	return async function (dispatch: (arg0:any) => void) {
		const result = await visorBackend.getUser(orgToken, userToken, handle);
		if (result.success && result.user) {
			callback(null, result.user);
		} else {
			callback({message: result.message});
		}
	}
}