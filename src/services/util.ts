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

export function checkUserInfo(callback: (currentAuth: boolean) => void) {
    const userInfo = getUserInfoFromCookies();
    if (userInfo) {
        const userToken = userInfo.user ? userInfo.user.token : '';
        const orgToken = userInfo.org ? userInfo.org.token : '';
        visorBackend.getUserInfo(orgToken, userToken).then((value) => {
            callback(value.success);
        });
    } else {
        checkUserFromSaved().then((value) => {
            console.log(value);
            callback(value);
        })
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
                const org = {token: orgToken, name: result.orgName};
                const user = {handle: result.handle, token: userToken, role: result.role};
                const userInfo = {org, user};
                console.log(userInfo);
                setUserInfoToCookies(userInfo);
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
    Cookies.remove('userInfo');
}

export function logoutUser() {
    const hasLoginFile = ipcRenderer.sendSync('hasLoginFile');
    if (hasLoginFile) {
        ipcRenderer.sendSync('removeLoginFile');
    }
    eraseCookies();
}
