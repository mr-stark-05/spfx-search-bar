import * as React from "react";
import { Link } from "@fluentui/react";
import { List } from "@fluentui/react/lib/List";
import { IShareLinkItem } from "./model/IShareLinkItem";
import { getClassNames } from "./SearchResults.theme";

export interface IShareLinkProps {
    share: IShareLinkItem[];
    link: string;
}

export default function ShareLink(props: IShareLinkProps) {

    const {itemCell, itemContent, itemLink, itemName, itemAuthor, moreLink} = getClassNames();

    const onRenderCell = (item: IShareLinkItem, index: number, isScrolling: boolean): JSX.Element => {
        if(item.Title!.length > 50) {
            item.Title = item.Title!.slice(0,50) + "...";
        }
        if(item.Author!.length > 65) {
            item.Author = item.Author!.slice(0,65)+ "...";
        }
        return (
            <div className={itemCell} data-is-focusable={true}>
                <Link className={itemLink} href={item.Link}>
                    <div className={itemContent}>
                        <div className={itemName}>{item.Title}</div>
                        <div className={itemAuthor}>{`Author: ${item.Author}`}</div>
                    </div>
                </Link>
            </div>
        );
    };

    return(
        <div>
            <List items={props.share} onRenderCell={onRenderCell}>
            </List>
            <Link href={props.link} className={moreLink}>More...</Link>
        </div>
    )
}