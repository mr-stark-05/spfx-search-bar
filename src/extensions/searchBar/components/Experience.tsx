import { Link, List, FontIcon } from "@fluentui/react";
//import { ColorRegular } from "@fluentui/react-icons";
//import { Stack } from "@fluentui/react/lib/Stack";
import * as React from "react";
import { IExperienceItem } from "./model/IExperienceItem";
import { getClassNames } from "./SearchResults.theme";

export interface IExperienceProps {
    exp: IExperienceItem[];
    link: string;
}

export default function Experience(props: IExperienceProps) {
    
    const {itemCell, itemContent, itemLink, itemName, itemAuthor ,publicIcon, proposalIcon, confidentialIcon, moreLink} = getClassNames();

    const onRenderCell = (item: IExperienceItem, index: number, isScrolling: boolean): JSX.Element => {
        
        if(item.Title.length > 50) {
            item.Title = item.Title.slice(0,50) + "...";
        }
        if(item.Abstract.length > 65) {
            item.Abstract = item.Abstract.slice(0,65)+ "...";
        }

        //let iconPath: string = ""
        //iconPath = "";
        let iconClass: string;
        if(item.Disclosure == "Public") {
            //iconPath = "../SiteAssets/icons/publicIcon.png";
            iconClass = publicIcon;
        }
        else if(item.Disclosure == "Proposal") {
            //iconPath = "../SiteAssets/icons/proposalIcon.png";
            iconClass = proposalIcon;
        }
        else {
            //iconPath = "../SiteAssets/icons/confidentialIcon.png" ;
            iconClass = confidentialIcon;
        }

        return (
            <div className={itemCell} data-is-focusable={true}>
                <FontIcon iconName="AlertSolid" className={iconClass}></FontIcon>
                <Link className={itemLink} href={""}>
                    <div className={itemContent}>
                        <div className={itemName}>{item.Title}</div>
                        <div className={itemAuthor}>{`Abstract: ${item.Abstract}`}</div>
                    </div>
                </Link>
            </div>
        );
    };

    return (
        <div>
            <List items={props.exp} onRenderCell={onRenderCell}></List>
            <Link href={props.link} className={moreLink}>More...</Link>
        </div>
    )
    
}