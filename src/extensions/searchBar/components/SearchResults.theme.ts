import { 
    mergeStyleSets,
    PartialTheme
} from "@fluentui/react";

export interface IComponentClassNames {
    searchBox: string;
    suggestionDiv: string;
    stackStyles: string;
    calloutStyles: string;
    teachingBubble: string;
    suggestionHeader: string;
    personaText: string;
    shimmerStyle: string;
    stackItem: string;
    smallPersona: string;
    moreLink: string;
  }
  
  //const background: IColor = getColorFromString("#333333")!;
  
  //const backgroundHover: IColor = getShade(background, Shade.Shade5)!;
  
  //WFC this will affect all the app...the neutralLight is the default color, but I'm using below
  export const appTheme: PartialTheme = {
    palette: {
      white: "#ffffff",
      neutralLight: "#EDEBE9"
    },
    // for ContextualMenu section header
    semanticColors: {
      menuHeader: "#1A78D1",
    }
  };
  
export const getClassNames = (): IComponentClassNames => {
    return mergeStyleSets({
        searchBox: {
            width: "100%"
        },
        suggestionDiv: {
            width: "100%",
            "background-color": "#333333",
            color: "#333333"
        },
        stackStyles:{
            "align-items": "center",
            "padding-bottom": "10px",
            width: "inherit"
        },
        calloutStyles: { width: "100%" },
        teachingBubble: { color: "white"},
        suggestionHeader:{ "padding-left": "5%"},
        personaText: { 
            "font-size": "12px",
            color: "rgb(96, 94, 92)"
        },
        shimmerStyle: { 
            paddingTop: "5px", // No padding on the top
            paddingRight: "20px",
            paddingBottom: "20px",
            paddingLeft: "20px"
        },
        stackItem: {
            width: "50%"
        },
        smallPersona: {
            "padding-left": "10px"
        },
        moreLink: {
            "padding-top": "10px"
        }
    });
};

