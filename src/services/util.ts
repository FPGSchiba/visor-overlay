const { ipcRenderer } = window.require("electron");

export function CheckUserInfo() {
    return ipcRenderer.sendSync('isUserLoggedIn');
}