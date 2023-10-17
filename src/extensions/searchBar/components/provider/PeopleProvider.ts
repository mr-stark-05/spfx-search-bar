import { spfi } from "@pnp/sp/presets/all";
//import { IPersonItem } from "../model/IPersonItem";
import "@pnp/sp/profiles";
//import { getConfig, getHttpClient } from "../../httpClientConfig";
//import { ISPHttpClientOptions } from "@microsoft/sp-http";
//import { Users } from "@pnp/graph/users";
//import { HttpClient } from "@microsoft/sp-http";

export default class PeopleProvider {
    constructor() {

    }
                                        // Change back to Promise<IPersonItem[]>
    public async GetPeopleItems(search: string): Promise<any[]> {
        //const people = await this.GetPeople(search);
        //let users: Array<IPersonItem>;

        try {
            console.log("Here come the people");
    
            const results = await spfi().profiles.clientPeoplePickerSearchUser({
                AllowEmailAddresses: true,
                AllowMultipleEntities: true,
                MaximumEntitySuggestions: 4,
                PrincipalSource: 1, // UserInfoList
                PrincipalType: 1, // User
                QueryString: search
            });
    
            console.log(results);
    
            let emailResults = [];
    
            for (let item of results) {
                const login = item.Key;
                if (login && login.startsWith("i:0#.f|membership")) {
                    const profile = await spfi().profiles.getPropertiesFor(login);
                    emailResults.push({
                        Email: profile.Email,
                        Url: profile.UserUrl
                    });
                }
            }
    
            console.log(emailResults);
            return emailResults;
    
        } catch (error) {
            console.error("Error in GetPeopleItems:", error);
            throw error;  // Re-throw the error if you want it to be caught higher up, or handle it here as needed.
        }   
    }
}