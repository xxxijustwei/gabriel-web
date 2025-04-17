import axios from "axios";
import { toast } from "sonner";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;

axios.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        toast.error(
            error.data?.message ||
                "System error, please check the browser console for more information",
        );
        console.error(error);
        return Promise.reject(error);
    },
);

export interface IRequest {
    path: string;
    params?: unknown;
    headers?: Record<string, string>;
    token?: string;
}

export interface IBodyReqest extends IRequest {
    data?: unknown;
}

export const getReq = async <T>(req: IRequest) => {
    const { path, params, headers, token } = req;
    const response = await axios.get<T>(path, {
        params,
        headers: getHeaders({ token, headers }),
    });
    return response.data;
};

export const delReq = async <T>(req: IRequest) => {
    const { path, params, headers, token } = req;
    const response = await axios.delete<T>(path, {
        params,
        headers: getHeaders({ token, headers }),
    });
    return response.data;
};

export const postReq = async <T>(req: IBodyReqest) => {
    const { path, data, params, headers, token } = req;
    const response = await axios.post<T>(path, data, {
        params,
        headers: getHeaders({ token, headers }),
    });
    return response.data;
};

export const putReq = async <T>(req: IBodyReqest) => {
    const { path, data, params, headers, token } = req;
    const response = await axios.put<T>(path, data, {
        params,
        headers: getHeaders({ token, headers }),
    });
    return response.data;
};

const getHeaders = ({
    token,
    headers,
}: { token?: string; headers?: Record<string, string> }) => {
    return {
        ...(token && {
            Authorization: `Bearer ${token}`,
        }),
        ...headers,
    };
};
