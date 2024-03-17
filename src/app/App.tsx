import {useState, useEffect, ReactNode} from 'react';
import bridge, {UserInfo} from '@vkontakte/vk-bridge';
import {
    View,
    SplitLayout,
    SplitCol,
    Epic,
    useAdaptivityConditionalRender,
} from '@vkontakte/vkui';
import {useActiveVkuiLocation} from '@vkontakte/vk-mini-apps-router';

import {DEFAULT_VIEW_PANELS} from './routes';
import {NavTabBar} from "../widgets/tabBars/NavTabBar";
import {ManAgePanel} from "../widgets/panels/ManAgePanel";
import {CatFactPanel} from "../widgets/panels/CatFactPanel";
import {DesktopNavPanel} from "../widgets/panels/DesktopNavPanel";

export const App = () => {
    const {panel: activePanel = DEFAULT_VIEW_PANELS.FACTS} = useActiveVkuiLocation();

    const [fetchedUser, setUser] = useState<UserInfo | undefined>({first_name: 'a', last_name: 'b'});
    const [popout, setPopout] = useState<ReactNode | null>(null);
    const {viewWidth} = useAdaptivityConditionalRender();

    useEffect(() => {
        async function fetchData() {
            const user = await bridge.send('VKWebAppGetUserInfo');
            setUser(user);
            setPopout(null);
        }

        fetchData();
    }, []);

    return (
        <SplitLayout popout={popout} style={{justifyContent: 'center'}}>
            <SplitCol className={viewWidth.tabletPlus.className} fixed width={280} maxWidth={280}>
                <DesktopNavPanel activeNavPanel />
            </SplitCol>
            <SplitCol maxWidth="560px" autoSpaced>
                <Epic
                    tabbar={<NavTabBar className={viewWidth.tabletMinus.className}/>}
                    activeStory={activePanel}
                >
                    <View nav={DEFAULT_VIEW_PANELS.FACTS} activePanel={DEFAULT_VIEW_PANELS.FACTS}>
                        <CatFactPanel id={DEFAULT_VIEW_PANELS.FACTS} fetchedUser={fetchedUser}/>
                    </View>
                    <View nav={DEFAULT_VIEW_PANELS.AGE} activePanel={DEFAULT_VIEW_PANELS.AGE}>
                        <ManAgePanel id={DEFAULT_VIEW_PANELS.AGE}/>
                    </View>
                </Epic>
            </SplitCol>
        </SplitLayout>
    );
};