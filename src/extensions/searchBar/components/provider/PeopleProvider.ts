import { SPFx, spfi } from "@pnp/sp/presets/all";
import "@pnp/sp/profiles";
import { IPersonItem } from "../model/IPersonItem";

export default class PeopleProvider {
    public async GetPeopleItems(search: string, context: any): Promise<IPersonItem[]> {
    
        const getPropertyValue = (properties: any[], key: string): string => {
            const prop = properties.find(p => p.Key === key);
            return prop ? prop.Value : "";
        };

        // Set context for spfi
        const sp = spfi().using(SPFx(context));

        try {

            // Get initial results based on query string
            const results = await sp.profiles.clientPeoplePickerSearchUser({
                AllowEmailAddresses: true,
                AllowMultipleEntities: true,
                MaximumEntitySuggestions: 4,
                PrincipalSource: 1, // UserInfoList
                PrincipalType: 1, // User
                QueryString: search
            });

            // Array used to hold results from the next query
            let profileResults: IPersonItem[] = [];
    
            // Next query used to get user profile information
            for (let item of results) {
                const login = item.Key;
                if (login && login.startsWith("i:0#.f|membership")) {
                    const profile = await sp.profiles.getPropertiesFor(login);
                    console.log("profile");
                    console.log(profile);
                    
                    profileResults.push({
                        JobTitle: profile.Title,
                        DisplayName: profile.DisplayName,
                        FirstName: getPropertyValue(profile.UserProfileProperties, "FirstName"),
                        LastName: getPropertyValue(profile.UserProfileProperties, "LastName"),
                        Department: getPropertyValue(profile.UserProfileProperties, "Department"),
                        Office: getPropertyValue(profile.UserProfileProperties, "Office"),
                        WorkPhone: getPropertyValue(profile.UserProfileProperties, "WorkPhone"),
                        PictureUrl: getPropertyValue(profile.UserProfileProperties, "PictureURL"),
                        ProfileUrl: profile.UserUrl
                    });
                }
            }
            return profileResults;
        } catch (error) {
            console.error("Error in GetPeopleItems:", error);
            throw error;  // Re-throw the error if you want it to be caught higher up, or handle it here as needed.
        }   
    }
}