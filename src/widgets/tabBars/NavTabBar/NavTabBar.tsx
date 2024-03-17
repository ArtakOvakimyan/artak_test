import {Tabbar, TabbarItem} from '@vkontakte/vkui';
import {FC, useCallback} from "react";
import {useRouteNavigator} from "@vkontakte/vk-mini-apps-router";
import {panelsData} from "../../panels/shared/panelsData";

interface NavTabBarProps {
    className: string
}

export const NavTabBar: FC = (props: NavTabBarProps) => {
    const routeNavigator = useRouteNavigator();
    const onClick = useCallback((path: string) => routeNavigator.push(path), [routeNavigator]);

    return (
        <Tabbar className={props.className}>
            {panelsData.map(itemData =>
                <TabbarItem
                    key={itemData.path}
                    text={itemData.text}
                    onClick={() => onClick(itemData.path)}
                >
                    {itemData.icon}
                </TabbarItem>
            )}
        </Tabbar>
    )
}