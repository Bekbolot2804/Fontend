import { NavigateFunction } from 'react-router-dom';
import { Api } from './Api';

export const api = new Api({
    baseURL: 'https://127.0.0.1:3000/api',
});


export const setupInterceptors = (navigate: NavigateFunction) => {
    /*
    api.instance.interceptors.response.use(
        (response) => (response),
        (error) => {
            if (error.response.status === 403) {
                navigate(ROUTES.FORBIDDEN)
            } else if (error.response.status === 404) {
                navigate(ROUTES.NOT_FOUND)
            }
            return Promise.reject(error)
        }
    )
    */
}
