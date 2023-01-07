const { ipcRenderer } = window.require("electron");
import Cookies from 'js-cookie';
import { IOrg, IUser } from '../store/format';
import visorBackend from './visor.backend';

export function setUserInfoToCookies(data: { org: IOrg; user: IUser }): string | undefined {
    return Cookies.set('userInfo', JSON.stringify(data), { secure: true });
}

export function getUserInfoFromCookies(): { org: IOrg; user: IUser } | undefined {
    const data = JSON.parse(Cookies.get('userInfo') || '{}');
    return Object.keys(data).length ? data : undefined;
}

export async function checkUserInfo(): Promise<boolean> {
    const userInfo = getUserInfoFromCookies();
    if (!userInfo) {
      return await checkUserFromSaved();
    }
  
    const userToken = userInfo.user.token;
    const orgToken = userInfo.org.token;
    const result = await visorBackend.getUserInfo(orgToken, userToken);
    if (result.success) {
        return true;
    } else {
        return false;
    }
}

async function checkUserFromSaved(): Promise<boolean> {
    const hasLoginFile = ipcRenderer.sendSync('hasLoginFile');
    if (hasLoginFile) {
        // Check it
        const credentials = ipcRenderer.sendSync('getLoginFromFile');
        if (credentials) {
            const userToken = credentials.userToken;
            const orgToken = credentials.orgToken;
            const result = await visorBackend.getUserInfo(orgToken, userToken);
            if (result.success) {
                return true;
            } else {
                return false;
            }            
        } else {
            return false;
        }
    } else {
        return false;
    }
}

export function eraseCookies(): void {
    Cookies.remove('token');
    return Cookies.remove('userInfo');
}
