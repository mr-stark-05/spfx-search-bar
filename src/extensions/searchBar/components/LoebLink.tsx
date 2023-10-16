import * as React from "react";
import { getFocusStyle, getTheme, ITheme, Link, mergeStyleSets } from "@fluentui/react";
import { List } from "@fluentui/react/lib/List";
import { ILoebLinkItem } from "./model/ILoebLinkItem";

export interface ILoebLinkProps {
    loeb: ILoebLinkItem[];
    link: string;
}

export default function LoebLink(props: ILoebLinkProps) {

    const theme: ITheme = getTheme();
    const { palette, semanticColors, fonts } = theme;
    const classNames = mergeStyleSets({
        container: {
            overflow: 'auto',
            maxHeight: 500,
        },
        itemCell: [
            getFocusStyle(theme, { inset: -1 }),
            {
                maxHeight: 75,
                boxSizing: 'border-box',
                borderBottom: `1px solid ${semanticColors.bodyDivider}`,
                display: 'flex',
                selectors: {
                    '&:hover': { background: palette.neutralLight },
                },
                width: "100%",
            },
        ],
        itemContent: {
            marginLeft: 10,
            overflow: 'hidden',
            flexGrow: 1,
        },
        itemName: [
            fonts.small,
            {
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
            },
        ],
        itemAuthor: {
            fontSize: fonts.xSmall.fontSize,
            color: palette.neutralTertiary,
            marginBottom: 10,
        },
        itemLink: {
            color: 'inherit'
        },
        listStyle: {
            width: "50%"
        }
    });

    const onRenderCell = (item: ILoebLinkItem, index: number, isScrolling: boolean): JSX.Element => {
        if(item.Title.length > 50) {
            item.Title = item.Title.slice(0,50) + "...";
        }
        if(item.Author.length > 65) {
            item.Author = item.Author.slice(0,65)+ "...";
        }
        return (
            <div className={classNames.itemCell} data-is-focusable={true}>
                <Link className={classNames.itemLink} href={item.Link}>
                    <div className={classNames.itemContent}>
                        <div className={classNames.itemName}>{item.Title}</div>
                        <div className={classNames.itemAuthor}>{`Author: ${item.Author}`}</div>
                    </div>
                </Link>
            </div>
        );
    };

    return(
        <div>
            <List items={props.loeb} onRenderCell={onRenderCell}>
            </List>
            <Link href={props.link}>More...</Link>
        </div>
    )
}