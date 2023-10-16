import { getFocusStyle, getTheme, ITheme, Link, List, mergeStyleSets, FontIcon } from "@fluentui/react";
//import { ColorRegular } from "@fluentui/react-icons";
//import { Stack } from "@fluentui/react/lib/Stack";
import * as React from "react";
import { IExperienceItem } from "./model/IExperienceItem";

export interface IExperienceProps {
    exp: IExperienceItem[];
    link: string;
}

export default function Experience(props: IExperienceProps) {
    
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
                width: "100%"
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
        publicIcon: {
            opacity: "1",
            width: "12px",
            height: "12px",
            color: "#1aa80d"
        },
        proposalIcon : {
            opacity: "1",
            width: "12px",
            height: "12px",
            color: "#ffb818"
        },
        confidentialIcon: {
            opacity: "1",
            width: "12px",
            height: "12px",
            color: "#c90404"
        }
    });

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
            iconClass = classNames.publicIcon;
        }
        else if(item.Disclosure == "Proposal") {
            //iconPath = "../SiteAssets/icons/proposalIcon.png";
            iconClass = classNames.proposalIcon;
        }
        else {
            //iconPath = "../SiteAssets/icons/confidentialIcon.png" ;
            iconClass = classNames.confidentialIcon;
        }

        return (
            <div className={classNames.itemCell} data-is-focusable={true}>
                <FontIcon iconName="AlertSolid" className={iconClass}></FontIcon>
                <Link className={classNames.itemLink} href={""}>
                    <div className={classNames.itemContent}>
                        <div className={classNames.itemName}>{item.Title}</div>
                        <div className={classNames.itemAuthor}>{`Abstract: ${item.Abstract}`}</div>
                    </div>
                </Link>
            </div>
        );
    };

    return (
        <div>
            <List items={props.exp} onRenderCell={onRenderCell}></List>
            <Link href={props.link}>More...</Link>
        </div>
    )
    
}