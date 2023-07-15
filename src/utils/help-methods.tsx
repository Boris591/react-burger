export const request = (url: string, options: RequestInit = {}): Promise<any> => {
    return fetch(url, options).then(checkResponse);
};

export function checkResponse(res: Response): Promise<any> {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(res);
}

export function setCookie(name: string, value: string, props?: { expires?: Date; [key: string]: any }): void {
    props = props || {};
    let exp = props.expires;
    if (typeof exp === 'number' && exp) {
        const d = new Date();
        d.setTime(d.getTime() + exp * 1000);
        exp = props.expires = d;
    }
    if (exp instanceof Date) {
        props.expires = exp;
    }
    value = encodeURIComponent(value);
    let updatedCookie = name + '=' + value;
    for (const propName in props) {
        updatedCookie += '; ' + propName;
        const propValue = props[propName];
        if (propValue !== true) {
            updatedCookie += '=' + propValue;
        }
    }
    document.cookie = updatedCookie;
}

export function getCookie(name: string): string | undefined {
    const matches = document.cookie.match(new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function saveTokens(refreshToken: string, accessToken: string): void {
    setCookie('accessToken', accessToken);
    setCookie('refreshToken', refreshToken);
}
