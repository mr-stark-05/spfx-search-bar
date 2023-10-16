import { Stack } from "@fluentui/react";
import * as React from "react";
//import { IPersonItem } from "./model/IPersonItem";
import { getClassNames } from "./SearchResults.theme";
//import { Text } from '@fluentui/react/lib/Text';
import { ILoebLinkItem } from "./model/ILoebLinkItem";
import Experience from "./Experience";
import LoebLink from "./LoebLink";
import { IExperienceItem } from "./model/IExperienceItem";

export interface IExperienceLoebLinkProps {
    loeb: ILoebLinkItem[];
    exp: IExperienceItem[];
    link: string;
    isDesktop: boolean;
}

export default function ExperienceLoeblink(props: IExperienceLoebLinkProps) {

    let {stackItem} = getClassNames();

    const MobileComponent = () => {
        return(
            <div>
                <Stack>
                    <Stack.Item>
                        <h3>Experiences</h3>
                        <Experience {...props}></Experience>
                    </Stack.Item>
                    <Stack.Item>
                        <h3>LoebLink</h3>
                        <LoebLink {...props}></LoebLink>
                    </Stack.Item>
                </Stack>
            </div>
        );
    }

    const DesktopComponent = () => {
        return(
            <Stack horizontal={true} horizontalAlign="space-evenly">
                <Stack.Item className={stackItem}>
                    <h3>Experiences</h3>
                    <Experience {...props}></Experience>
                </Stack.Item>
                <Stack.Item className={stackItem}>
                    <h3>LoebLink</h3>
                    <LoebLink {...props}></LoebLink>
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