import "@pnp/sp/webs";
import "@pnp/sp/site-users/web";
import "@pnp/sp/profiles";
import "@pnp/sp/lists/web";
import "@pnp/sp/files";
import "@pnp/graph/users";
import "@pnp/graph/onedrive";
import { IPersonItem } from "./model/IPersonItem";
import * as React from "react";

import {
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
import ShareLinkProvider from "./provider/ShareLinkProvider";
import ExperienceShareLink from "./ExperienceShareLink";
import { useMediaQuery } from "react-responsive";
import { ExtensionContext } from "@microsoft/sp-extension-base";

interface ISearchResultsProps {
  context: ExtensionContext;
  onDispose: () => void;
}

// Debounce function to delay the execution of a function
// until after a certain amount of time has passed since the last time the debounced function was invoked.
const debounce = (func: (...args: any[]) => void, wait: number) => {
  let timeout: number | null;
  return function executedFunction(...args: any[]) {
    const later = () => {
      if (timeout !== null) {
        clearTimeout(timeout);
        timeout = null;
      }
      func(...args);
    };
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait) as unknown as number; // Explicit cast here
  };
};

export default function SearchResults(props: ISearchResultsProps) {
  let { searchBox, suggestionDiv, calloutStyles, shimmerStyle } =
    getClassNames();

  //Arrays needed to hold search results
  const [people, setPeople] = React.useState<IPersonItem[]>([]);
  //const [fullPeople, setFullPeople] = React.useState<IPersonItem[]>([]);
  const [exp, setExp] = React.useState<IExperienceItem[]>([]);
  //const [fullExp, setFullExp] = React.useState<IExperienceItem[]>([]);
  const [share, setShare] = React.useState<any[]>([]);
  //const [fullLoeb, setFullLoeb] = React.useState<any[]>([]);
  const [searchText, setSearchText] = React.useState<string>("");

  //Id used as target for Callout
  const searchBoxId = useId("search-bar");
  console.log("get prop by key");

  const [isCalloutVisible, { toggle: toggleIsCalloutVisible }] =
    useBoolean(false);
  const [peopleDataLoaded, { toggle: togglePeopleLoaded }] = useBoolean(false);
  const [expShareDataLoaded, { toggle: toggleExpShareDataLoaded }] = useBoolean(false);

  //Get each list and set the arrays
  const getListData = async (): Promise<void> => {
    const peopleProvider = new PeopleProvider();
    const experienceProvider = new ExperienceProvider();
    const shareLinkProvider = new ShareLinkProvider();

    const allPeople: IPersonItem[] = await peopleProvider.GetPeopleItems(
      searchText,
      props.context
    );
    if (JSON.stringify(allPeople) !== JSON.stringify(people)) {
      setPeople(allPeople);
    }

    const allExp: IExperienceItem[] =
      await experienceProvider.GetExperienceItems(searchText, props.context);
    if (JSON.stringify(allExp) !== JSON.stringify(exp)) {
      setExp(exp);
    }

    const allShare: any[] = await shareLinkProvider.GetShareLinkItems(searchText, props.context);

    if (allPeople.length > 0) {
      setPeople(allPeople);
      //setFullPeople(allPeople);
    }
    if (allExp.length > 0) {
      setExp(allExp);
      //setFullExp(allExp);
    }
    if (allShare.length > 0) {
      setShare(allShare);
      //setFullLoeb(allLoeb);
    }
  };

  React.useEffect(() => {
    if (people.length > 0 && !peopleDataLoaded) {
      togglePeopleLoaded();
    }

    if ((exp.length > 0 && !expShareDataLoaded) || (share.length > 0 && !expShareDataLoaded)) {
      toggleExpShareDataLoaded();
    }
  }, [people, exp]);

  const onAbort = () => {
    //setPeople(fullPeople);
  };

  const onChange = async (
    ev: React.ChangeEvent<HTMLInputElement>,
    newValue: string
  ) => {
    setSearchText(newValue);

    if (newValue.length % 2 === 0 || newValue.length > 4) {
      getListData();
    }

    if (newValue.length !== 0 && !isCalloutVisible) {
      toggleIsCalloutVisible();
    } else if (newValue.length === 0 && isCalloutVisible) {
      toggleIsCalloutVisible();
    }
  };

  // Debounced version of the onChange function to prevent rapid API calls
  const debouncedOnChange = debounce(onChange, 300); // 300ms delay

  const onSearch = (searchQuery: string) => {
    let url =
      "https://pparkerdev.sharepoint.com/_layouts/15/search.aspx/?q=" +
      searchQuery;
    window.location.assign(url);
  };

  //props for functional components
  const isDesktop = useMediaQuery({
    query: "(min-width: 700px)",
  });

  const peopleSearch: string =
    "https://pparkerdev.sharepoint.com/_layouts/15/search.aspx/people?q=" +
    searchText;

  const peopleProps = {
    isDesktop: isDesktop,
    search: searchText,
    peopleSearch: peopleSearch,
    peopleItems: people,
    context: props.context,
    onDispose: props.onDispose,
  };

  const experienceShareLinkProps = {
    share: share,
    exp: exp,
    link:
      "https://pparkerdev.sharepoint.com/_layouts/15/search.aspx/?q=" +
      searchText,
    isDesktop: isDesktop,
  };

  

  return (
    <div id="searchExtension" className={suggestionDiv}>
      <Stack>
        <Stack.Item>
          <SearchBox
            className={searchBox}
            onChange={debouncedOnChange}
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
              <Shimmer isDataLoaded={peopleDataLoaded} className={shimmerStyle}>
                <People {...peopleProps}></People>
              </Shimmer>
			        {expShareDataLoaded && (
                <Shimmer isDataLoaded={expShareDataLoaded} className={shimmerStyle}>
                  <ExperienceShareLink {...experienceShareLinkProps}></ExperienceShareLink>
                </Shimmer>
			      )}
            </Callout>
          )}
        </Stack.Item>
      </Stack>
    </div>
  );
}
