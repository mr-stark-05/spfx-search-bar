import "@pnp/sp/webs";
import "@pnp/sp/site-users/web";
import "@pnp/sp/profiles";
import "@pnp/sp/lists/web";
import "@pnp/sp/files";
import "@pnp/graph/users";
import "@pnp/graph/onedrive";
import { IPersonItem } from "./model/IPersonItem";
import * as React from 'react';
import { 
    Link, 
    SearchBox,
    Stack,
    Callout,
    Shimmer,
    DirectionalHint,
} from "@fluentui/react";
import PeopleProvider from "./provider/PeopleProvider";
import { useBoolean, useId } from "@fluentui/react-hooks";
import { getClassNames } from "./SearchResults.theme";
import People from "./People";
import { IExperienceItem } from "./model/IExperienceItem";
import ExperienceProvider from "./provider/ExperienceProvider";
import LoebLinkProvider from "./provider/LoebLinkProvider";
import ExperienceLoeblink from "./ExperienceLoebLink";
import { useMediaQuery } from "react-responsive";

export default function SearchResults() {

    let {
        searchBox,
        suggestionDiv,
        calloutStyles,
        shimmerStyle,
        moreLink,
    } = getClassNames();

    //Arrays needed to hold search results
    //const [people, setPeople] = React.useState<IPersonItem[]>([]);
    const [fullPeople, setFullPeople] = React.useState<IPersonItem[]>([]);
    const [exp, setExp] = React.useState<IExperienceItem[]>([]);
    const [fullExp, setFullExp] = React.useState<IExperienceItem[]>([]);
    const [loeb, setLoeb] = React.useState<any[]>([]);
    //const [fullLoeb, setFullLoeb] = React.useState<any[]>([]);
    const [searchText, setSearchText] = React.useState<string>("");

    //Id used as target for Callout
    const searchBoxId = useId("search-bar");

    const [isCalloutVisible, { toggle: toggleIsCalloutVisible }] = useBoolean(false);
    const [peopleDataLoaded, { toggle: togglePeopleLoaded }] = useBoolean(false);
    const [expDataLoaded, { toggle: toggleExpDataLoaded }] = useBoolean(false);

    //Get each list and set the arrays
    const getListData = async(): Promise<void> => {
        const peopleProvider = new PeopleProvider();
        const experienceProvider = new ExperienceProvider();
        const loebLinkProvider = new LoebLinkProvider();
        
        const allPeople: IPersonItem[] = await peopleProvider.GetPeopleItems(searchText);
        console.log(allPeople);
        const allExp: IExperienceItem[] = await experienceProvider.GetExperienceItems(searchText);
        const allLoeb: any[] = await loebLinkProvider.GetLoebLinkItems(searchText);

        //setPeople(allPeople);
        setFullPeople(allPeople);
        if(allExp.length > 0) {
            setExp(allExp);
            setFullExp(allExp);
        }
        if(allLoeb.length > 0) {
            setLoeb(allLoeb);
            //setFullLoeb(allLoeb);
        }
    }
    
    React.useEffect(() => {
        if(fullPeople.length > 0 && !peopleDataLoaded) {
            togglePeopleLoaded();
        }
        if(fullExp.length > 0 && !expDataLoaded) {
            toggleExpDataLoaded();
        }
    });

    const onAbort = () => {
        //setPeople(fullPeople);
    }

    const onChange = async(ev: React.ChangeEvent<HTMLInputElement>, newValue: string) => {

        setSearchText(newValue);
        console.log(searchText);
        
        if(newValue.length % 2 == 0 || newValue.length > 4) {
            getListData();
        }

        if(newValue.length != 0 && !isCalloutVisible) {
            toggleIsCalloutVisible();
        }
        else if (newValue.length == 0 && isCalloutVisible){
            toggleIsCalloutVisible();
        }
            
        //let filterPeople = fullPeople.slice(0,4);
        //setPeople(filterPeople);
    }

    const onSearch = (searchQuery: string) => {
        let url = "https://pparkerdev.sharepoint.com/_layouts/15/search.aspx/?q=" + searchQuery;
        window.location.assign(url); 
    }

    //props for functional components
    const isDesktop = useMediaQuery({
        query: "(min-width: 700px)"
    });

    const peopleProps = {
        isDesktop: isDesktop,
        search: searchText
    }

    const experienceLoebLinkProps = {
        loeb: loeb,
        exp: exp,
        link: "https://pparkerdev.sharepoint.com/_layouts/15/search.aspx/?q=" + searchText,
        isDesktop: isDesktop
    }

    const peopleSearch: string = "https://pparkerdev.sharepoint.com/_layouts/15/search.aspx/people?q=" + searchText;

    return(
        <div id="searchExtension" className={suggestionDiv}>
                <Stack>
                    <Stack.Item>
                        <SearchBox
                            className={searchBox}
                            onChange={onChange}
                            onAbort={onAbort}
                            onSearch={onSearch}
                            id={searchBoxId}
                        />
                    </Stack.Item>
                    <Stack.Item>
                        {isCalloutVisible && (
                            <Callout
                                onDismiss={toggleIsCalloutVisible}
                                shouldUpdateWhenHidden={true}
                                target={`#${searchBoxId}`}
                                isBeakVisible={false}
                                calloutMaxWidth={700}
                                calloutMinWidth={300}
                                className={calloutStyles}
                                directionalHint={DirectionalHint.bottomCenter}
                            >
                                <Shimmer
                                    isDataLoaded={peopleDataLoaded}
                                    className={shimmerStyle}
                                >
                                    <People {...peopleProps}></People>
                                    <br></br>
                                    <Link className={moreLink} href={peopleSearch}>More...</Link>
                                </Shimmer>
                                <Shimmer
                                    isDataLoaded={expDataLoaded}
                                    className={shimmerStyle}
                                >
                                    <ExperienceLoeblink {...experienceLoebLinkProps}></ExperienceLoeblink>
                                </Shimmer>
                            </Callout>
                        )}
                    </Stack.Item>
                </Stack>
        </div>
    )
}

