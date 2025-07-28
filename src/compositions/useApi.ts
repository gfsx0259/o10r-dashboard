import type {ApiResponse} from "@/types/api.ts";
import type {Project} from "@/types/project.ts";
import type {Setting} from "@/types/setting.ts";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

const httpClient = (baseUrl: string, entity: string) => {
    const invoke = async <T>(
        path: string,
        method: HttpMethod = "GET",
        body?: unknown
    ): Promise<T> => {
        const url = `${baseUrl}/${entity}${path}`;
        const response = await fetch(url, {
            method,
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: body ? JSON.stringify(body) : undefined,
        });

        if (!response.ok) {
            const errorBody = await response.text();
            throw new Error(`API error ${response.status}: ${errorBody}`);
        }

        return response.json();
    };

    const get = <T>(path: string = "") => invoke<T>(path, "GET");
    const post = <T>(path: string = "", body?: unknown) => invoke<T>(path, "POST", body);
    const put = <T>(path: string = "", body?: unknown) => invoke<T>(path, "PUT", body);
    const patch = <T>(path: string = "", body?: unknown) => invoke<T>(path, "PATCH", body);
    const del = <T>(path: string = "") => invoke<T>(path, "DELETE");

    const getProjects = async (): Promise<ApiResponse<Project[]>> => {
        return get<ApiResponse<Project[]>>("?include=method,setting");
    };

    const replaceMethods = async (projectId: number, methods: number[]): Promise<ApiResponse<number[]>> => {
        return put<ApiResponse<number[]>>(`/${projectId}/method`, methods);
    };

    const updateSettings = async (projectId: number, settings: Setting[]): Promise<ApiResponse<null>> => {
        return patch<ApiResponse<null>>(`/${projectId}/setting`, settings);
    };

    return {
        invoke,
        get,
        post,
        put,
        patch,
        del,
        getProjects,
        replaceMethods,
        updateSettings,
    };
};

export const useProject = httpClient('https://project.o10r.io', 'project')
export const useMethod = httpClient('https://project.o10r.io', 'method')
