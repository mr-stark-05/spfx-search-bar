import { PrincipalSource, PrincipalType, spfi, SPBrowser } from "@pnp/sp/presets/all";
import { IPersonItem } from "../model/IPersonItem";
import "@pnp/sp/profiles";
import { getConfig, getHttpClient } from "../../httpClientConfig";
import { ISPHttpClientOptions } from "@microsoft/sp-http";
//import { Users } from "@pnp/graph/users";
import { HttpClient } from "@microsoft/sp-http";

export default class PeopleProvider {
    constructor() {
        spfi().using(SPBrowser({
            baseUrl:`${window.location.protocol}//${window.location.hostname}`
        }));
        /*
        sp.setup({
            sp: {
                headers: {
                    Accept: "application/json;odata=verbose"
                },
                baseUrl: `${window.location.protocol}//${window.location.hostname}`,
            }
        });
        */
    }

    public async GetPeopleItems(search: string): Promise<IPersonItem[]> {
        //const people = await this.GetPeople(search);
        var users: Array<IPersonItem>;

        const results = await spfi().profiles.clientPeoplePickerSearchUser({
            AllowEmailAddresses: true,
            AllowMultipleEntities: true,
            MaximumEntitySuggestions: 4,
            PrincipalSource: PrincipalSource.UserInfoList,
            PrincipalType: PrincipalType.User,
            QueryString: search
        });

        var emailResults = [];

        for(var i = 0; i < results.length; i++) {
            var item = results[i];
            var login = item.Key;
            if(login != null && login.startsWith("i:0#.f|membership")) {
                const profile = await spfi().profiles.getPropertiesFor(login);
                emailResults.push({
                    Email: profile.Email,
                    Url: profile.UserUrl
                });
            }
        }
        //console.log(emailResults);

        var userResults: Array<IPersonItem> = [];
        emailResults.forEach(item => {
            this.GetPeople(item.Email, item.Url)
                .then(res => {
                    if(typeof res != "undefined") {
                        userResults.push(res);
                    }
                });
        });
        users = userResults;
        return users;
    }
    
    private async GetPeople(search: string, url: string): Promise<IPersonItem> {

        const client: HttpClient | null = getHttpClient();
        var users: Array<IPersonItem> = [];

        const headers = new Headers();
        headers.append("Authorization", "Bearer 30c4d69889304cb29f393d2413ce96ac");

        const httpOptions: ISPHttpClientOptions = {
            headers: headers,
            method: "GET",
            mode: "cors"
        };
        

        await client?.fetch("https://api.justsift.com/v1/search/people?email=" + search,
            getConfig(),
            httpOptions
            ).then(res => {
                const r = res.json();
                return r;
            }).then( r => {
                if(r !=null && r.data.length > 0) {
                    //console.log(r);
                    r.data.map((item: { title: any; displayName: any; firstName: any; lastName: any; department: any; officeCity: any; cell: any; pictureUrl: any; }) => {
                        users.push({
                            JobTitle: item.title,
                            DisplayName: item.displayName,
                            FirstName: item.firstName,
                            LastName: item.lastName,
                            Department: item.department,
                            Office: item.officeCity,
                            WorkPhone: item.cell,
                            PictureUrl: item.pictureUrl,
                            ProfileUrl: url
                        });
                    });
                }
            })
            .catch(error => console.error("Error retriving from sift: ", error.message));
        
        return users[0];
        /*
        const results = await sp.profiles.clientPeoplePickerSearchUser({
            AllowEmailAddresses: true,
            AllowMultipleEntities: true,
            MaximumEntitySuggestions: 4,
            PrincipalSource: PrincipalSource.UserInfoList,
            PrincipalType: PrincipalType.User,
            QueryString: search
        });

        var listItems = [];
        
        for(var i = 0; i < results.length; i++) {
            var item = results[i];
            var login = item.Key;
            if(login != null && login.startsWith("i:0#.f|membership")) {
                const profile = await sp.profiles.getPropertiesFor(login);
                
                if(profile != null && profile.UserProfileProperties != null) {
                    
                    var props = {};
                    profile.UserProfileProperties.results.forEach((prop) => {
                        props[prop.Key] = prop.Value;
                    });
                    profile.userProperties = props;
                    
                    listItems.push({
                        DisplayName: profile.DisplayName,
                        JobTitle: profile.Title,
                        FirstName: profile.userProperties.FirstName,  
                        LastName: profile.userProperties.LastName, 
                        Department: profile.userProperties.Department, 
                        Office: profile.userProperties.Office,       
                        WorkPhone: profile.userProperties.WorkPhone, 
                        PictureUrl: profile.PictureUrl,
                        ProfileUrl: profile.UserUrl 
                    });
                }
            }
        }
        return listItems;
    }
    */
    }
}