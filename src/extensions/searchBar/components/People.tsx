import { Link, Persona, PersonaSize, Stack, Text } from "@fluentui/react";
import * as React from "react";
import { IPersonItem } from "./model/IPersonItem";
import { getClassNames } from "./SearchResults.theme";
import { useBoolean } from "@fluentui/react-hooks";

export interface IPeopleProps {
    isDesktop: boolean;
    search: string;
    peopleSearch: string;
    peopleItems: IPersonItem[];
}

const People: React.FC<IPeopleProps> = (props: IPeopleProps) => {
    
    const {personaText, moreLink, h3Style} = getClassNames();
    const filteredPeople = props.peopleItems.slice(0, 4);
    
    const [peopleDataLoaded, { setTrue: showPeople, setFalse: hidePeople }] = useBoolean(false);
    
    React.useEffect(() => {
        if (filteredPeople.length > 0) {
            showPeople();
        } else {
            hidePeople();
        }
    }, [filteredPeople]);

    return (
        <>
            {peopleDataLoaded && props.isDesktop && (
                <DesktopComponent people={filteredPeople} moreLink={moreLink} peopleSearch={props.peopleSearch} personaText={personaText} h3Style={h3Style} />
            )}
            {peopleDataLoaded && !props.isDesktop && (
                <MobileComponent people={filteredPeople} moreLink={moreLink} peopleSearch={props.peopleSearch} h3Style={h3Style} />
            )}
        </>
    );
}

const DesktopComponent: React.FC<{ people: IPersonItem[], moreLink: string, peopleSearch: string, personaText: string, h3Style: string }> = ({ people, moreLink, peopleSearch, personaText, h3Style }) => (
    <div>
        <h3 className={h3Style}>People</h3>
        <Stack horizontal={true} horizontalAlign="start" tokens={{childrenGap: 5, padding:10}}>
            {people.map((person) => (
                <Stack.Item key={person.ProfileUrl}>
                    <Link href={person.ProfileUrl}>
                        <Persona
                            size={PersonaSize.size40}
                            text={`${person.FirstName} ${person.LastName}`}
                            imageUrl={person.PictureUrl}
                            secondaryText={person.JobTitle}
                            showInitialsUntilImageLoads={true}
                            hidePersonaDetails={false}
                        >
                            <Text className={personaText}>
                                {`Office: ${person.Office}`}
                            </Text>
                            <Text className={personaText}>
                                {`Phone: ${person.WorkPhone}`}
                            </Text>
                        </Persona>
                    </Link>
                </Stack.Item>
            ))}
        </Stack>
        <br></br>
        <Link className={moreLink} href={peopleSearch}>More...</Link>
    </div>
);

const MobileComponent: React.FC<{ people: IPersonItem[], moreLink: string, peopleSearch: string, h3Style: string }> = ({ people, moreLink, peopleSearch, h3Style }) => (
    <div>
        <h3 className={h3Style}>People</h3>
        <Stack horizontal={false}>
            {people.map((person) => (
                <Stack.Item key={person.ProfileUrl}>
                    <Link href={person.ProfileUrl}>
                        <Persona
                            size={PersonaSize.size24}
                            text={`${person.FirstName} ${person.LastName}`}
                            imageUrl={person.PictureUrl}
                            showInitialsUntilImageLoads={true}
                        />
                    </Link>
                </Stack.Item>
            ))}
        </Stack>
        <br></br>
        <Link className={moreLink} href={peopleSearch}>More...</Link>
    </div>
);

export default React.memo(People);
