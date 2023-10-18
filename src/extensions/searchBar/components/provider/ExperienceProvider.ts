//import { spfi, SPBrowser, SPFx } from "@pnp/sp/presets/all";
import { IExperienceItem } from "../model/IExperienceItem";
//import { ISPFXContext } from "@pnp/common";
//import { graphfi } from "@pnp/graph";
import "@pnp/graph/search";

export default class ExperienceProvider {
    public async GetExperienceItems(search: string, context: any): Promise<IExperienceItem[]> {
        
        // Set context for spfi
        //const sp = spfi().using(SPFx(context));
        
        let experiences : Array<IExperienceItem> = [];
        experiences.push({Title: "Represented Gap in Collaboration with Kanye West and Balenciaga", 
            Abstract: "Represented Gap in its collaboration with Yeezy, a high-fashion clothing brand created by Ye (formerly known as Kanye West), and Balenciaga, a Paris-based luxury powerhouse brand.", 
            Disclosure: "Public", Attorneys: "Howard, Melanie"});

        experiences.push({Title: "Trademark Infringement Involving an American Media Conglomerate", 
            Abstract: "Representation of Turner Broadcasting affiliate, CNN, in a trademark infringement action in the District of Nevada filed against Shenzhen Crystal Video Technology Co. Ltd. for use of a mark/logo that is confusingly similar to CNN’s famous red and white logo and continuously promoting its goods at major media conventions in the U.S. We obtained a consent judgement for CNN shortly after filing and threatening to enjoin use at an ongoing trade show.",
            Disclosure: "Proposal", Attorneys: "Crisafulli, Sara; Masters, Douglas"});

        experiences.push({Title: "Defense of Magazine Publisher in Class Action Allegations", 
            Abstract: "Represented Meredith Corporation in a case brought as a class action on behalf of subscribers to MORE magazine. When Meredith shuttered that title, the company transferred the subscriptions to other Meredith titles, including Shape, Better Homes & Garden, Rachel Ray. The complaint alleged that this practice breached the subscription contracts and violated Missouri’s Merchandising Practices Act. Loeb negotiated a settlement with the named plaintiff, resulting in her dropping her class allegations. Jager v. Meredith, No. 16-cv-01119 (E.D. Mo.)",
            Disclosure: "CONFIDENTIAL - Internal Only", Attorneys: "McNally, Laura"});

        let filterExp = experiences.filter(
            exp => exp.Title && exp.Title.toLowerCase().indexOf(search.toLowerCase()) !== -1,
        );
        filterExp = filterExp.slice(0,5);

        return filterExp;
    }

    /*
    private async GetExperience(): Promise<any[]> {
        
        //start here tommorow (do graph.setup in constructor)
        //need to give graph context and maybe the graph client
        
        const results = await graph.query({
            entityTypes: ["externalItem"],
            contentSources: ["/external/connections/datamartprototype"],
            fields:[
                "Title",
                "Abstract",
                "Disclosure",
                "Department",
                "Author",
                "Practices"
            ],
            from: 0,
            size: 100,
            query: {
                queryString: "department:real estate"
            }
        });
        console.log("results");
        console.log(results);
        
        var listItems = [];
        listItems.push({
            title: "",
            description: ""
        });
        return listItems;
        
    }
    */
}