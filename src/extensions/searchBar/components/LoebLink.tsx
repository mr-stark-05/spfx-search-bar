import * as React from "react";
import { Link } from "@fluentui/react";
import { List } from "@fluentui/react/lib/List";
import { ILoebLinkItem } from "./model/ILoebLinkItem";
import { getClassNames } from "./SearchResults.theme";

export interface ILoebLinkProps {
    loeb: ILoebLinkItem[];
    link: string;
}

export default function LoebLink(props: ILoebLinkProps) {

    const {itemCell, itemContent, itemLink, itemName, itemAuthor, moreLink} = getClassNames();

    const onRenderCell = (item: ILoebLinkItem, index: number, isScrolling: boolean): JSX.Element => {
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
            <List items={props.loeb} onRenderCell={onRenderCell}>
            </List>
            <Link href={props.link} className={moreLink}>More...</Link>
        </div>
    )
}