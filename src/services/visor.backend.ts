/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance } from "axios";
import https from 'https';
import { IUser } from "../store/format";
import { ISearchFilter, IVISORImage, IVISORInput, IVISORReport, IVISORSmall } from "../store/format/report.format";
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

function buildParams(filter: ISearchFilter) {
    let params = '';
    if (filter.location && typeof(filter.location) == 'object') {
        params += `&location=${JSON.stringify(filter.location)}`;
    }
    if (filter.meta && typeof(filter.meta) == 'object') {
        params += `&meta=${JSON.stringify(filter.meta)}`;
    }
    if (filter.approved && typeof(filter.approved) == 'string') {
        params += `&approved=${filter.approved}`;
    }
    if (filter.keyword && typeof(filter.keyword) == 'string') {
        params += `&keyword=${filter.keyword}`;
    }
    if (filter.name && typeof(filter.name) == 'string') {
        params += `&name=${filter.name}`;
    }
    if (filter.published && typeof(filter.published) == 'string') {
        params += `&published=${filter.published}`;
    }
    if (filter.from && typeof(filter.from) == 'number') {
        params += `&from=${filter.from}`;
    }
    if (filter.length && typeof(filter.length) == 'number') {
        params += `&length=${filter.length}`;
    }
    if (filter.to && typeof(filter.to) == 'number') {
        params += `&to=${filter.to}`;
    }

    return params.replace(/^&/, '?');
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

        const apiURL = "http://192.168.1.224:3000"

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

    @wrapInit
    public async createReport(
        orgToken: string,
        userToken: string,
        visor: IVISORInput
    ): Promise<{success: boolean, message: string, id?: string}> {
        try {
            const { data } = await VISORApi.endpoint.post(`/visor/create`, visor,
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
                id: data.data.id,
            };
        } catch (reason) {
            return {
                success: false,
                message: reason.response.data.message,
            }
        }
    }

    @wrapInit
    public async getReport(
        orgToken: string,
        userToken: string,
        id: string
    ): Promise<{success: boolean, message: string, report?: IVISORReport}> {
        try {
            const { data } = await VISORApi.endpoint.get(`/visor/get?id=${id}`,
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
                report: data.data,
            };
        } catch (reason) {
            return {
                success: false,
                message: reason.response.data.message,
            }
        }
    }

    @wrapInit
    public async listReports(
        orgToken: string,
        userToken: string,
        filter: ISearchFilter
    ): Promise<{success: boolean, message: string, count?: number, reports?: IVISORSmall[]}> {
        try {
            const params = buildParams(filter);
            const { data } = await VISORApi.endpoint.get(`/visor/list${params}`,
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
                reports: data.data.reports,
                count: data.data.count
            };
        } catch (reason) {
            return {
                success: false,
                message: reason.response.data.message,
            }
        }
    }

    @wrapInit
    public async updateReport(
        orgToken: string,
        userToken: string,
        id: string,
        report: IVISORInput
    ): Promise<{success: boolean, message: string, id?: string}> {
        try {
            const { data } = await VISORApi.endpoint.post(`/visor/update?id=${id}`,
            report,
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
                id: data.data.id,
            };
        } catch (reason) {
            return {
                success: false,
                message: reason.response.data.message,
            }
        }
    }

    @wrapInit
    public async approveReport(
        orgToken: string,
        userToken: string,
        id: string,
        approverHandle: string,
        approveReason: string
    ): Promise<{success: boolean, message: string}> {
        try {
            const body = {
                id,
                approverHandle,
                approveReason
            }
            const { data } = await VISORApi.endpoint.post(`/visor/approve`,
            body,
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
    public async deleteReport(
        orgToken: string,
        userToken: string,
        id: string,
        deletionReason: string
    ): Promise<{success: boolean, message: string}> {
        try {
            const body = {
                id,
                deletionReason,
            }
            const { data } = await VISORApi.endpoint.post(`/visor/delete`,
            body,
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
    public async getImages(
        orgToken: string,
        userToken: string,
        id: string
    ): Promise<{success: boolean, message: string, images?: IVISORImage[]}> {
        try {
            const { data } = await VISORApi.endpoint.get(`/visor/images?id=${id}`,
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
                images: data.data.images,
            };
        } catch (reason) {
            return {
                success: false,
                message: reason.response.data.message,
            }
        }
    }

    @wrapInit
    public async uploadImage(
        orgToken: string,
        userToken: string,
        id: string,
        imageData: File,
        description: string
    ): Promise<{success: boolean, message: string}> {
        try {
            var formData = new FormData();
            formData.append('image', imageData);
            formData.append('description', description)
            const { data } = await VISORApi.endpoint.post(`/visor/image?id=${id}`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
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
    public async updateImageDescription(
        orgToken: string,
        userToken: string,
        name: string,
        description: string
    ): Promise<{success: boolean, message: string}> {
        try {
            const { data } = await VISORApi.endpoint.post(`/visor/image-desc?name=${name}`,
            {
                description
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
    public async checkOMSimilarity(
        orgToken: string,
        userToken: string,
        oms: number[],
        system: string,
        stellarObject: string,
        planetLevelObject?: string
    ): Promise<{success: boolean, message: string, reports?: string[]}> {
        try {
            const body: {[key: string]: any} = {
                oms: oms,
                system,
                stellarObject
            }
            if (typeof(planetLevelObject) == 'string') {
                body.planetLevelObject = planetLevelObject;
            }
            const { data } = await VISORApi.endpoint.post(`/visor/om-similarity`,
            JSON.parse(JSON.stringify(body)),
            {
                headers: {
                    'Content-Type': 'application/json',
                    'X-VISOR-Org-Key': orgToken,
                    'X-VISOR-User-Key': userToken
                },
            });
            const reports = typeof(data.similarReports) == 'object' ? data.similarReports : undefined;
            return {
                message: data.message,
                success: true,
                reports
            };
        } catch (reason) {
            if (reason.response.status == 404) {
                return {
                    success: true,
                    message: reason.response.data.message
                }
            }
            return {
                success: false,
                message: reason.response.data.message,
            }
        }
    }

    @wrapInit
    public async deleteImage(
        orgToken: string,
        userToken: string,
        name: string
    ): Promise<{success: boolean, message: string}> {
        try {
            const { data } = await VISORApi.endpoint.delete(`/visor/image?name=${name}`,
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
}

export default new VISORApi();
