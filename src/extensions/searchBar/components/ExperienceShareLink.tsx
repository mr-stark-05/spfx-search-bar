import { Stack } from "@fluentui/react";
import * as React from "react";
//import { IPersonItem } from "./model/IPersonItem";
import { getClassNames } from "./SearchResults.theme";
//import { Text } from '@fluentui/react/lib/Text';
import { IShareLinkItem } from "./model/IShareLinkItem";
import Experience from "./Experience";
import ShareLink from "./ShareLink";
import { IExperienceItem } from "./model/IExperienceItem";

export interface IExperienceShareLinkProps {
    share: IShareLinkItem[];
    exp: IExperienceItem[];
    link: string;
    isDesktop: boolean;
}

export default function ExperienceShareLink(props: IExperienceShareLinkProps) {

    let {stackItem, h3Style} = getClassNames();

    const MobileComponent = () => {
        return(
            <div>
                <Stack>
                    <Stack.Item>
                        <h3 className={h3Style}>Experiences</h3>
                        <Experience {...props}></Experience>
                    </Stack.Item>
                    <Stack.Item>
                        <h3 className={h3Style}>ShareLink</h3>
                        <ShareLink {...props}></ShareLink>
                    </Stack.Item>
                </Stack>
            </div>
        );
    }

    const DesktopComponent = () => {
        return(
            <Stack horizontal={true} horizontalAlign="space-evenly">
                <Stack.Item className={stackItem}>
                    <h3 className={h3Style}>Experiences</h3>
                    <Experience {...props}></Experience>
                </Stack.Item>
                <Stack.Item className={stackItem}>
                    <h3 className={h3Style}>ShareLink</h3>
                    <ShareLink {...props}></ShareLink>
                </Stack.Item>
            </Stack>
        );
    }

    return (
        <div>
            {props.isDesktop && (
                <DesktopComponent></DesktopComponent>
            )}
            {!props.isDesktop && (
                <MobileComponent></MobileComponent>
            )}
        </div>
    )
}