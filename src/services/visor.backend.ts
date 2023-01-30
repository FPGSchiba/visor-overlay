/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance } from "axios";
import https from 'https';
import { IUser } from "../store/format";
import { ICompleteSystem, ISystem, ISystemSmall } from "../store/format/system.format";
const UNAUTHORIZED_CODE = 401;

/**
 * Initialization needs to be done before calling any method,
 * @param target
 * @param propertyKey
 * @param descriptor
 */
function wrapInit(target: VISORApi, propertyKey: string | symbol, descriptor: PropertyDescriptor): void {
    const originalMethod = descriptor.value;
    const newMethod = async (...args: any[]): Promise<any> => {
      await target.init();
      return originalMethod(...args);
    };
    descriptor.value = newMethod.bind(target);
}

class VISORApi {
    protected static endpoint: AxiosInstance;
    public async init(): Promise<void> {
        if (VISORApi.endpoint !== undefined) {
            return;
        }

        // At request level
        const httpsAgent = new https.Agent({
            rejectUnauthorized: false,
        });

        const apiURL = "http://192.168.1.202:3000"

        VISORApi.endpoint = axios.create({
            baseURL: apiURL,
            httpsAgent,
        });
    }

    @wrapInit
    public async getUserInfo(
        orgToken: string,
        userToken: string
    ):Promise<{ success: boolean, message: string, handle?: string, role?: string, orgName?: string }>{
        try {
            const { data } = await VISORApi.endpoint.get('/user', {
                headers: {
                    'Content-Type': 'application/json',
                    'X-VISOR-Org-Key': orgToken,
                    'X-VISOR-User-Key': userToken
                },
            });
            return {
                message: data.message,
                success: true,
                handle: data.data.handle,
                role: data.data.role,
                orgName: data.data.orgName
            };
        } catch (reason) {
            return {
                success: false,
                message: reason.response.data.message
            }
        }
    }

    @wrapInit
    public async listUsers(
        orgToken: string,
        userToken: string
    ):Promise<{ success: boolean, message: string, users?: IUser[] }>{
        try {
            const { data } = await VISORApi.endpoint.get('/users/list', {
                headers: {
                    'Content-Type': 'application/json',
                    'X-VISOR-Org-Key': orgToken,
                    'X-VISOR-User-Key': userToken
                },
            });
            return {
                message: data.message,
                success: true,
                users: data.data.users
            };
        } catch (reason) {
            return {
                success: false,
                message: reason.response.data.message
            }
        }
    }

    @wrapInit
    public async getUser(
        orgToken: string,
        userToken: string,
        handle: string
    ):Promise<{ success: boolean, message: string, user?: IUser }>{
        try {
            const { data } = await VISORApi.endpoint.get(`/users/get?handle=${handle}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-VISOR-Org-Key': orgToken,
                    'X-VISOR-User-Key': userToken
                },
            });
            return {
                message: data.message,
                success: true,
                user: data.data
            };
        } catch (reason) {
            return {
                success: false,
                message: reason.response.data.message
            }
        }
    }

    @wrapInit
    public async updateUser(
        orgToken: string,
        userToken: string,
        handle: string,
        role: string
    ): Promise<{ success: boolean, message: string}> {
        try {
            const { data } = await VISORApi.endpoint.post('/users/update',
            {
                handle,
                update: {
                    role
                }
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'X-VISOR-Org-Key': orgToken,
                    'X-VISOR-User-Key': userToken
                },
            });
            return {
                message: data.message,
                success: true,
            };
        } catch (reason) {
            return {
                success: false,
                message: reason.response.data.message,
            }
        }
    }

    @wrapInit
    public async createUser(
        orgToken: string,
        userToken: string,
        handle: string,
        role: string
    ): Promise<{ success: boolean, message: string, userKey?: string}> {
        try {
            const { data } = await VISORApi.endpoint.post('/users/create',
            {
                handle,
                role,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'X-VISOR-Org-Key': orgToken,
                    'X-VISOR-User-Key': userToken
                },
            });
            return {
                message: data.message,
                success: true,
                userKey: data.data.userKey
            };
        } catch (reason) {
            return {
                success: false,
                message: reason.response.data.message,
            }
        }
    }

    @wrapInit
    public async deleteUser(
        orgToken: string,
        userToken: string,
        token: string,
        reason: string
    ): Promise<{ success: boolean, message: string}> {
        try {
            const { data } = await VISORApi.endpoint.post('/users/delete',
            {
                token,
                reason,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'X-VISOR-Org-Key': orgToken,
                    'X-VISOR-User-Key': userToken
                },
            });
            return {
                message: data.message,
                success: true,
            };
        } catch (reason) {
            return {
                success: false,
                message: reason.response.data.message,
            }
        }
    }

    @wrapInit
    public async getSystems(
        orgToken: string,
        userToken: string,
    ): Promise<{ success: boolean, message: string, systems?: ISystemSmall[]}> {
        try {
            const { data } = await VISORApi.endpoint.get('/data/get-systems',
            {
                headers: {
                    'Content-Type': 'application/json',
                    'X-VISOR-Org-Key': orgToken,
                    'X-VISOR-User-Key': userToken
                },
            });
            return {
                message: data.message,
                success: true,
                systems: data.data,
            };
        } catch (reason) {
            return {
                success: false,
                message: reason.response.data.message,
            }
        }
    }

    @wrapInit
    public async getSystem(
        orgToken: string,
        userToken: string,
        id: string
    ): Promise<{success: boolean, message: string, system?: ICompleteSystem}> {
        try {
            const { data } = await VISORApi.endpoint.get(`/data/get-system?id=${id}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'X-VISOR-Org-Key': orgToken,
                    'X-VISOR-User-Key': userToken
                },
            });
            return {
                message: data.message,
                success: true,
                system: data.data,
            };
        } catch (reason) {
            return {
                success: false,
                message: reason.response.data.message,
            }
        }
    }
}

export default new VISORApi();
