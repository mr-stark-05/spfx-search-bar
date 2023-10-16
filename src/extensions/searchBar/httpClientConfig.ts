//import { WebPartContext } from "@microsoft/sp-webpart-base";
import { HttpClient, HttpClientConfiguration } from "@microsoft/sp-http";

let _httpClient: HttpClient | null = null;

//No web part context so need to pass HttpClient directly
export const getHttpClient = (context?: HttpClient) => {
    if (context != null) {
        _httpClient = context;
    }
    return _httpClient;
};

export const getConfig = (): HttpClientConfiguration => {
    return HttpClient.configurations.v1;
}