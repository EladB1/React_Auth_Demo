const convert = (portion: string) => {
    return JSON.parse(window.atob(portion));
};

export const jwtdecode = (jwt: string) => {
    const [header, payload, signature] = jwt.split('.');
    return [convert(header), convert(payload), signature];
};