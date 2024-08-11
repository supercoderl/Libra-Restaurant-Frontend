import HttpClient from './iHttpImp'
import { keys, get } from '../utils/localStorage'
import { HTTP_METHODS, RequestConfig } from './interface/iHttp'

const isLog = false
const baseUrl = process.env.NEXT_PUBLIC_API_URL || '';

export function getHeaders() {
    let token = get(keys.KEY_TOKEN)
    return {
        'Authorization': 'Bearer ' + token,
    }
}
interface APIParams {
    url: string
    params?: any
    extra?: any
    data?: object
}

function _buildRequestConfig({
    method
}: {
    method: HTTP_METHODS
}): RequestConfig {
    return {
        headers: getHeaders(),
        method
    }
}

const errorHanding = (err: any) => {
    isLog && console.log('-------- error --------')
    isLog && console.error(err)
}

function _wrapperResponse<T>(data: any): T {
    isLog && console.log('-------- response --------')
    isLog && console.log(data)
    return data as T
}

export async function apiGet<T>(params: APIParams): Promise<T | undefined> {
    return _api<T>(params, {}, HTTP_METHODS.GET)
}

export async function apiPost<T>(params: APIParams, data: object): Promise<T | undefined> {
    return _api<T>(params, data, HTTP_METHODS.POST)
}

export async function apiDelete<T>(params: APIParams): Promise<T | undefined> {
    return _api<T>(params, {}, HTTP_METHODS.DELETE)
}

export async function apiPut<T>(params: APIParams, data: object): Promise<T | undefined> {
    return _api<T>(params, data, HTTP_METHODS.PUT)
}

async function _api<T>(params: APIParams, data: object, method: HTTP_METHODS) {
    isLog && console.log('-------- request start --------')
    isLog && console.log(params)
    isLog && console.log(method)
    isLog && console.log('-------- request end --------')
    try {
        let res = await HttpClient.request(
            baseUrl.concat(params.url),
            params.params,
            data,
            _buildRequestConfig({ method })
        )
        return _wrapperResponse<T>(res.data)
    } catch (error) {
        errorHanding(error)
    }
}
