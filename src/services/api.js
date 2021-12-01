import axios from "axios";

const defaultOptions = {
    baseURL: "https://vast-shore-74260.herokuapp.com",
    headers: {
        "Content-Type": "application/json"
    }
};
const api = axios.create(defaultOptions);

api.defaults.headers["content-type"] = "application/json";

api.interceptors.request.use(item => {
    return item;
});

api.interceptors.response.use(
    resp => {
        return resp;
    },
    err => {
        const { data, status, response, config } = err.response;

        if (status === 500 || status === 502) {
            console.log("500 error...");
        } else if (status === 401) {
            // console.log("Token expired.. You are logged out !");
        } else if (status === 400 && (data.message || data.response)) {
            console.log(data.message, data.response);
        }
        throw err.response;
    }
);

export default api;
