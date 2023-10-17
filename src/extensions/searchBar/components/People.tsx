
import { Link, Persona, PersonaSize, Stack } from "@fluentui/react";
import * as React from "react";
import { IPersonItem } from "./model/IPersonItem";
import { getClassNames } from "./SearchResults.theme";
import { Text } from '@fluentui/react/lib/Text';
//import PeopleProvider from "./provider/PeopleProvider";
import { useBoolean } from "@fluentui/react-hooks";
//import { ExtensionContext } from '@microsoft/sp-extension-base';

//create interface for people props
//interface will include search text as string
export interface IPeopleProps {
    isDesktop: boolean;
    search: string;
    peopleItems: any;
}

export default function People(props: IPeopleProps) {
    
    let {personaText} = getClassNames();

    
    const [people, setPeople] = React.useState<IPersonItem[]>([]);
    setPeople(props.peopleItems);
    
    //const [fullPeople, setFullPeople] = React.useState<IPersonItem[]>([]);
    
    const [peopleDataLoaded, { setTrue: showPeople, setFalse: hidePeople }] = useBoolean(false);
    if(people.length > 0) {
        setPeople(props.peopleItems);
        showPeople();
    }
    else {
        hidePeople();
    }
    /*
    
    const getPeopleData = async(): Promise<void> => {
        const peopleProvider = new PeopleProvider();
        const allPeople: IPersonItem[] = await peopleProvider.GetPeopleItems(props.search, props.context);
        if(allPeople.length > 0) {
            setPeople(allPeople);
            showPeople();
        }
        else {
            hidePeople();
        }
    }
    */

    /*
    React.useEffect(() => {
        if(props.search != "") {
            getPeopleData();
        }
    },[]);
    */

    const MobileComponent = () => {
        return(
            <div>
                <h3>People</h3>
                <Stack horizontal={false}>
                    {people.map((person: IPersonItem) => {
                        return(
                            <Stack.Item>
                                <Link href={person.ProfileUrl}>
                                    <Persona
                                        size={PersonaSize.size24}
                                        text={person.FirstName + " " + person.LastName}
                                        imageUrl={person.PictureUrl}
                                        showInitialsUntilImageLoads={true}
                                    >
                                    </Persona>
                                </Link>
                            </Stack.Item>
                        );
                    })}
                </Stack>
            </div>
        );
    }

    const DesktopComponent = () => {
        return(
            <div>
                <h3>People</h3>
                <Stack horizontal={true} horizontalAlign="start" tokens={{childrenGap: 5, padding:10}}>
                    {people.map((person: IPersonItem) => {
                        return(
                            <Stack.Item>
                                <Link href={person.ProfileUrl}>
                                    <Persona
                                        size={PersonaSize.size40}
                                        text={person.FirstName + " " + person.LastName}
                                        imageUrl={person.PictureUrl}
                                        secondaryText={person.JobTitle}
                                        showInitialsUntilImageLoads={true}
                                        hidePersonaDetails={false}
                                    >
                                        <Text className={personaText}>
                                            {"Office: " + person.Office}
                                        </Text>
                                        <Text className={personaText}>
                                            {"Phone: " + person.WorkPhone}
                                        </Text>
                                    </Persona>
                                </Link>
                            </Stack.Item>
                        );
                    })}
                </Stack>
            </div>
        );
    }

    return (
        <div>
            {peopleDataLoaded && props.isDesktop && (
                <DesktopComponent></DesktopComponent>
            )}
            {peopleDataLoaded && !props.isDesktop && (
                <MobileComponent></MobileComponent>
            )}
        </div>
    );
    
}

