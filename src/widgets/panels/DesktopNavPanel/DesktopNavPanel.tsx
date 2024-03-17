import {FC, useCallback} from "react";
import {useRouteNavigator} from "@vkontakte/vk-mini-apps-router";
import {activeStoryStyles} from "./const";
import {Panel, Group, Cell} from '@vkontakte/vkui';
import {panelsData} from "../shared/panelsData";

interface DesktopNavPanelProps {
    activePanel: string
}

export const DesktopNavPanel: FC = (props: DesktopNavPanelProps) => {
    const routeNavigator = useRouteNavigator();
    const onClick = useCallback((path: string) => routeNavigator.push(path), [routeNavigator]);

    return (
        <Panel>
            <Group>
                {panelsData.map((itemData =>
                    <Cell
                        key={itemData.path}
                        before={itemData.icon}
                        disabled={props.activePanel == itemData.path}
                        styles={props.activePanel == itemData.path ?
                            activeStoryStyles
                            : undefined
                        }
                        onClick={() => {
                            onClick(itemData.path)
                        }}
                    >
                        {itemData.text}
                    </Cell>
                ))}
            </Group>
        </Panel>
    )
}