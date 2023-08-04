export default class Fetch {
    payload: Object | FormData;
    url: string;
    constructor(payload: Object | FormData, url: string);
    postJson(): Promise<any>;
    postAuthjson(): Promise<any>;
    get(): Promise<any>;
}
