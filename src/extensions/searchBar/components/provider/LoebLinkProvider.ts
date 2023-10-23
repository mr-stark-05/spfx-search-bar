import { spfi, SPFx } from "@pnp/sp/presets/all";
import "@pnp/sp/search";
import { ISearchQuery } from "@pnp/sp/search";
//import { graphfi } from "@pnp/graph";
import "@pnp/graph/search";
import { ILoebLinkItem } from "../model/ILoebLinkItem";

export default class LoebLinkProvider {

    public async GetLoebLinkItems(search: string, context: any): Promise<ILoebLinkItem[]> {
        // Set context for spfi
        const sp = spfi().using(SPFx(context));

        let listItems: ILoebLinkItem[] = [];
        const results = await sp.search(<ISearchQuery>{
            Querytext: search,
            RowLimit: 5
        });
        const primaryResults = results.PrimarySearchResults;
        primaryResults.forEach((prop) => {
            listItems.push({
                Title: prop.Title,
                Author: prop.Author,
                Link: prop.Path
            })
        });
        return listItems;
    }

    /*
    private async GetLoebLink(search: string, context: any): Promise<any[]> {

        // Set context for spfi
        //const sp = spfi().using(SPFx(context));

        let listItems: any[] = [];
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
    */
}