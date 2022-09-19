import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { GET_USER_SUCCESS } from '../constants/user';
import { AppState, IUser } from '../format';
import { ErrorResponse } from './shared';
// import { ipcRenderer } from 'electron';

export interface GetUserProfileSuccessAction extends Action<typeof GET_USER_SUCCESS> {
    user: IUser;
  }

export type UserActionTypes =
  | GetUserProfileSuccessAction;

type ThunkResult<R> = ThunkAction<R, AppState, undefined, UserActionTypes>;

export function doLogin(
    username: string,
    password: string,
    remember: boolean,
    callback: (
      err?: ErrorResponse,
      /*data?: {
        message: string;
        token: string;
        expirationTime: string;
      }*/
      data?: boolean
    ) => void,
  ): ThunkResult<void> {
    return async function (dispatch: (arg0: any) => void) {
      try {
        /* TODO: Handle user Login
        const result = await userManagementService.login(username, Hash(password));
        dispatch(getUserProfileSuccess(result.user, result.token));
        setUserInfoToCookies({ expiredTime: result.expirationTime, user: result.user });
        setTokenToCookies(result.token, new Date(result.expirationTime));
        callback(null, result); */
        const result = username == 'test' && password == 'test';
        if (result && remember) {
            // ipcRenderer.sendSync('saveLogin', {username, password})
        }
        callback(null, result);
      } catch (err: any) {
        const error = err.response?.data || err;
        callback(error);
      }
    };
}