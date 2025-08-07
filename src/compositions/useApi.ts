import type {ApiResponse} from "@/types/api.ts";
import type {Project} from "@/types/project.ts";
import type {Method} from "@/types/method.ts";
import type {Schema} from "@/types/schema.ts";
import type {Route} from "@/types/route.ts";
import type {Scenario} from "@/types/scenario.ts";
import type {Callback} from "@/types/callback.ts";

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
        return get<ApiResponse<Method[]>>('/method');
    }

    const createMethod = async (method: Method): Promise<ApiResponse<Method>> => {
        return post<ApiResponse<Method>>('/method', method);
    }

    const updateMethod = async (method: Method): Promise<ApiResponse<Method[]>> => {
        return patch<ApiResponse<Method[]>>(`/method/${method.id}`, method);
    }

    const deleteMethod = async (id: number): Promise<ApiResponse<null>> => {
        return del<ApiResponse<null>>(`/method/${id}`);
    };

    const getSchemas = async (): Promise<ApiResponse<Schema[]>> => {
        return useCatalog.get<ApiResponse<Schema[]>>('/schema');
    }

    const createSchema = async (schema: Schema): Promise<ApiResponse<Schema>> => {
        return post<ApiResponse<Schema>>(`/schema`, schema);
    };

    const updateSchema = async (schema: Schema): Promise<ApiResponse<null>> => {
        return patch<ApiResponse<null>>(`/schema/${schema.id}`, schema);
    };

    const deleteSchema = async (id: number): Promise<ApiResponse<null>> => {
        return del<ApiResponse<null>>(`/schema/${id}`);
    };

    const getRoute = async (): Promise<ApiResponse<Route[]>> => {
        return get<ApiResponse<Route[]>>('/route');
    }

    const createRoute = async (route: Route): Promise<ApiResponse<Route>> => {
        return post<ApiResponse<Route>>('/route', route);
    }

    const updateRoute = async (route: Route): Promise<ApiResponse<null>> => {
        return patch<ApiResponse<null>>(`/route/${route.id}`, route);
    }

    const deleteRoute = async (id: number): Promise<ApiResponse<null>> => {
        return del<ApiResponse<null>>(`/route/${id}`);
    };

    const getScenario = async (): Promise<ApiResponse<Scenario[]>> => {
        return get<ApiResponse<Scenario[]>>('/scenario');
    }

    const createScenario = async (scenario: Scenario): Promise<ApiResponse<Scenario>> => {
        return post<ApiResponse<Scenario>>('/scenario', scenario);
    }

    const updateScenario = async (scenario: Scenario): Promise<ApiResponse<null>> => {
        return patch<ApiResponse<null>>(`/scenario/${scenario.id}`, scenario);
    }

    const deleteScenario = async (id: number): Promise<ApiResponse<null>> => {
        return del<ApiResponse<null>>(`/scenario/${id}`);
    };

    const getCallback = async (): Promise<ApiResponse<Callback[]>> => {
        return get<ApiResponse<Callback[]>>('/callback');
    }

    const createCallback = async (callback: Callback): Promise<ApiResponse<Callback>> => {
        return post<ApiResponse<Callback>>('/callback', callback);
    }

    const updateCallback = async (callback: Callback): Promise<ApiResponse<null>> => {
        return patch<ApiResponse<null>>(`/callback/${callback.id}`, callback);
    }

    const deleteCallback = async (id: number): Promise<ApiResponse<null>> => {
        return del<ApiResponse<null>>(`/callback/${id}`);
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
        createMethod,
        updateMethod,
        deleteMethod,
        getSchemas,
        createSchema,
        updateSchema,
        deleteSchema,
        getRoute,
        createRoute,
        updateRoute,
        deleteRoute,
        getScenario,
        createScenario,
        updateScenario,
        deleteScenario,
        getCallback,
        createCallback,
        updateCallback,
        deleteCallback,
    };
};

export const useProject = httpClient('https://project.o10r.io', 'project')
export const useCatalog = httpClient('https://project.o10r.io', 'catalog')
export const useGateway = httpClient('https://project.o10r.io', 'gateway')
