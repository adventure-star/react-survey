import { getFetch } from "./fetch";
import { getUrl, getLocalToken } from "./common";

const query = async function (path, options = {}, useToken = true) {
    if (!options.headers) {
        options.headers = {
            "Content-Type": "application/json",
            "Accept": "application/json"
        };
    }
    options.headers = options.headers || {};
    const userInfo = useToken ? getLocalToken() : null;
    const token = (userInfo && userInfo.token);
    if (token) {
        options.headers["Authorization"] = `Bearer ${token}`;
    }
    const url = getUrl(path, options.searchParams || {});

    // const fetch = await getFetch(options);
    const fetch = await getFetch();
    const response = await fetch(url);

    if (200 <= response.status && 300 > response.status) {
        if (options && (options.responseType === 'blob')) {
            return response;
        }
        return response.json();
    }
    try {
        const error = await response.json();
        return Promise.reject(new Error(error.message));
    } catch (error) {
        console.log("error-----", error)
        throw new Error(`HTTP status ${response.status} is not OK`);
    }

};

export default query;
