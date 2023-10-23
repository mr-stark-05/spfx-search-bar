import { SPFx, spfi } from "@pnp/sp/presets/all";
import "@pnp/sp/profiles";
import { IPersonItem } from "../model/IPersonItem";

export default class PeopleProvider {
    public async GetPeopleItems(search: string, context: any): Promise<IPersonItem[]> {

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
                    console.log(profile);
                    
                    profileResults.push({
                        JobTitle: profile.Title,
                        DisplayName: profile.DisplayName,
                        FirstName: profile.UserProfileProperties[4].Value,
                        LastName: profile.UserProfileProperties[6].Value,
                        Department: profile.UserProfileProperties[11].Value,
                        Office: profile.UserProfileProperties[61].Value,
                        WorkPhone: profile.UserProfileProperties[10].Value,
                        PictureUrl: "string",
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