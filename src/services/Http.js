import axios from 'axios';



const routes = {
    
};

const encodeQueryData = data => {
    let ret = [], temp;
    for (let i in data) {
        temp = data[i];
        if (temp !== '' && temp !== null) {
            ret.push(encodeURIComponent(i) + '=' + encodeURIComponent(temp));
        }
    }
    return ret.length ? '?' + ret.join('&') : '';
};

const updateTokenInHeader = () => {
    /* this commenting is temporary purpose. Remove it when token needs. */
    const token = {
        local: JSON.parse(localStorage.getItem('token')),
        header: axios.defaults.headers.common['token']
    };
    if (token.local && !token.header) {
        axios.defaults.headers.common['token'] = token.local;
    }
};

const Http = {
    GET: (key, params = '',uriParams='') => {
        updateTokenInHeader();
        params = typeof params === 'object' ? encodeQueryData(params) : params;
        return axios.get(routes[key]+ uriParams + params, {
            headers: {
                'token': JSON.parse(localStorage.getItem('token'))
            }
        });
    },
    POST: (key, params, postData='') => {
        updateTokenInHeader();
        return axios.post(routes[key]+postData, params, {
            headers: {
                'token': JSON.parse(localStorage.getItem('token'))
            }
        });
    },
    PUT: (key, params) => {
        updateTokenInHeader();
        return axios.put(routes[key], params, {
            headers: {
                'token': JSON.parse(localStorage.getItem('token'))
            }
        });
    },
    UPLOAD: (key, formData, params='') => {
        updateTokenInHeader();
        return axios.post(routes[key]+params, formData, {
            headers: {
                'token': JSON.parse(localStorage.getItem('token')),
                'Content-Type': 'multipart/form-data'
            }
        });
    },
    DELETE: (key, params = '') => {
        updateTokenInHeader();
        return axios.delete(routes[key]+ params, {
            headers: {
                'token': JSON.parse(localStorage.getItem('token'))
            }
        });
    }
};

export default Http;
