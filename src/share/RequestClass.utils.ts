import { Request } from 'ask-sdk-model';
export type RequestClassOptions = {
    name: string | string[];
    path: string;
    ssml: 'default' | 'tsx';
    ['request-type']: Request['type'];
    speech?: string;
    reprompt?: string;
    test?: 'false' | 'true';
}