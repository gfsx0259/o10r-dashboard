import type {ApiResponse} from "@/types/api.ts";
import type {Project} from "@/types/project.ts";
import type {Method} from "@/types/method.ts";
import type {Schema} from "@/types/schema.ts";

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

        if (response.status === 204) {
            return undefined as T;
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

    const getMethods = async (): Promise<ApiResponse<Method[]>> => {
        return useCatalog.get<ApiResponse<Method[]>>('/method');
    }

    const getSchemas = async (): Promise<ApiResponse<Schema[]>> => {
        return useCatalog.get<ApiResponse<Schema[]>>('/schema');
    }

    const createSchema = async (schema: Schema): Promise<ApiResponse<Schema>> => {
        return post<ApiResponse<Schema>>(`/schema`, schema);
    };

    const updateSchema = async (schema: Schema): Promise<ApiResponse<null>> => {
        return patch<ApiResponse<null>>(`/schema/${schema.id}`, schema);
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
        getMethods,
        getSchemas,
        createSchema,
        updateSchema,
    };
};

export const useProject = httpClient('https://project.o10r.io', 'project')
export const useCatalog = httpClient('https://project.o10r.io', 'catalog')
