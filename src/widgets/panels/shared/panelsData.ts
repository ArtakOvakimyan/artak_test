import {ReactElement} from "react";
import {DEFAULT_VIEW_PANELS, DEFAULT_VIEW_PANELS_PATHS} from "../../../app/routes";
import {icons} from "../../icons"

interface panelsDataProps {
    path: string,
    text: string,
    icon: ReactElement
}

export const panelsData: panelsDataProps[] = [
    {
        path: DEFAULT_VIEW_PANELS_PATHS[DEFAULT_VIEW_PANELS.FACTS],
        text: "Факты",
        icon: icons.pawIcon,

    },
    {
        path: DEFAULT_VIEW_PANELS_PATHS[DEFAULT_VIEW_PANELS.AGE],
        text: "Возраст",
        icon: icons.manIcon
    },
];