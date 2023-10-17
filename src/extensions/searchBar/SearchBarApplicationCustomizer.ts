import { override } from "@microsoft/decorators";
//import { Log } from "@microsoft/sp-core-library";
import {
  BaseApplicationCustomizer,
  PlaceholderContent,
  PlaceholderName,
} from "@microsoft/sp-application-base";
//import { Dialog } from "@microsoft/sp-dialog";
import * as React from "react";
import * as ReactDom from "react-dom";
import SearchResults from "./components/SearchResults";
import { graphfi, SPFx } from "@pnp/graph";
import { getHttpClient } from "./httpClientConfig";
import { SPBrowser, spfi } from "@pnp/sp";
//import * as strings from "SearchBarApplicationCustomizerStrings";
import { Version } from "@microsoft/sp-core-library";

//const LOG_SOURCE: string = "SearchBarApplicationCustomizer";

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface ISearchBarApplicationCustomizerProperties {
  // This is an example; replace with your own property
  testMessage: string;
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class SearchBarApplicationCustomizer extends BaseApplicationCustomizer<ISearchBarApplicationCustomizerProperties> {
  private topPlaceHolder: PlaceholderContent | undefined;

  @override
  public onInit(): Promise<void> {
    return super.onInit().then((_) => {
      console.log("starting extension");
      spfi().using(
        SPBrowser({
          baseUrl: `${window.location.protocol}//${window.location.hostname}`,
        })
      );
      console.log("Url:")
      console.log(`${window.location.protocol}//${window.location.hostname}`);
      graphfi().using(SPFx(this.context));
      getHttpClient(this.context.httpClient);
      this.context.placeholderProvider.changedEvent.add(
        this,
        this.renderPlaceholders
      );
      return Promise.resolve();
    });
  }

  protected onDispose(): void {
    // Added exclamation point to get rid of error. Could cause issues in the future so check here if not working
    ReactDom.unmountComponentAtNode(this.topPlaceHolder!.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse("1.0");
  }

  //Render the Search Box in the top placeholder
  private renderPlaceholders() {
    if (!this.topPlaceHolder) {
      this.topPlaceHolder = this.context.placeholderProvider.tryCreateContent(
        PlaceholderName.Top,
        { onDispose: this.onDispose }
      );
    }
    //Create functional component and render in top place holder
    const element: React.ReactElement<{}> = React.createElement(SearchResults, {
      onDispose: this.onDispose,
    });

    // Added exclamation points to avoid error. Check here if having problems
    if (
      this.context.pageContext
        .list!.serverRelativeUrl.toLowerCase()
        .indexOf("/lists/") == -1
    ) {
      let search = document.getElementById("sbcId");
      while (search!.firstChild) {
        search!.removeChild(search!.firstChild);
      }
      search!.innerHTML = "";
      ReactDom.render(element, search);
      console.log("React component rendered");
    }

    /*
    if (this.topPlaceHolder?.domElement) {
      let search = document.getElementById("sbcId");
      while (search!.firstChild) {
        search!.removeChild(search!.firstChild);
      }
      search!.innerHTML = "";
      ReactDom.render(element, search);
    }
    */
  }
}
