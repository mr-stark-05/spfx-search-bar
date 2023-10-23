import { 
    getFocusStyle,
    getTheme,
    ITheme,
    mergeStyleSets,
    PartialTheme
} from "@fluentui/react";

export interface IComponentClassNames {
    h3Style: string;
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
    peopleMoreLink: string;
    itemCell: string;
    itemContent: string;
    itemName: string;
    itemAuthor: string;
    itemLink: string;
    publicIcon: string;
    proposalIcon: string;
    confidentialIcon: string;
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

    const theme: ITheme = getTheme();
    const { palette, semanticColors, fonts } = theme;

    return mergeStyleSets({
        h3Style: {
            marginBlockStart: '0.5em',
            marginBlockEnd: '0.5em',
        },
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
            padding: "10px"
        },
        stackItem: {
            width: "50%",
            position: "relative",
            "padding-bottom": "30px"
        },
        smallPersona: {
            "padding-left": "10px"
        },
        moreLink: {
            "padding-top": "40px",
            marginLeft: "10px",
            position: "absolute",
            bottom: "0"
        },
        peopleMoreLink : {
            "padding-top": "100px",
            marginLeft: "10px",
            position: "absolute",
            bottom: "0"
        },
        itemCell: [
            getFocusStyle(theme, { inset: -1 }),
            {
                maxHeight: "auto",
                boxSizing: 'border-box',
                borderBottom: `1px solid ${semanticColors.bodyDivider}`,
                display: 'flex',
                selectors: {
                    '&:hover': { background: palette.neutralLight },
                },
                width: "90%",  // Reduce the width to 90% or as per your requirement
                //marginLeft: "5%",  // Add left margin of 5% to center the borderBottom
                marginRight: "5%",  // Add right margin of 5% to center the borderBottom
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
};

