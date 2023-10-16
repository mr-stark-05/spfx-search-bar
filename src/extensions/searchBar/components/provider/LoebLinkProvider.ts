import { spfi, SPBrowser } from "@pnp/sp/presets/all";
import "@pnp/sp/search";
import { ISearchQuery } from "@pnp/sp/search";
//import { graphfi } from "@pnp/graph";
import "@pnp/graph/search";

export default class LoebLinkProvider {
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

    public async GetLoebLinkItems(search: string): Promise<any[]> {
        const loeblinkitems = await this.GetLoebLink(search);
        return loeblinkitems;
    }

    private async GetLoebLink(search: string): Promise<any[]> {
        var listItems: any[] = [];
        const results = await spfi().search(<ISearchQuery>{
            Querytext: search,
            RowLimit: 5
        });
        const primaryResults = results.PrimarySearchResults;
        //console.log("search text: " + search);
        //console.log(primaryResults);
        primaryResults.forEach((prop) => {
            listItems.push({
                Title: prop.Title,
                Author: prop.Author,
                Link: prop.Path
            })
        });
        
        return listItems;
    }
}