import {FC} from 'react';
import {NavIdProps, Panel, Group, Header, FormItem, Textarea, Button} from '@vkontakte/vkui';
import {HEADER_TITLE} from "./const";
import {useQuery} from "@tanstack/react-query";
import {getFact} from "./funcs";

export const CatFactPanel: FC<NavIdProps> = ({id}) => {
    const {data, isLoading, refetch} = useQuery({
        queryKey: ['fact'],
        queryFn: getFact,
        refetchOnWindowFocus: false,
        enabled: false
    });
    const handleClick = () => refetch();

    return (
        <Panel id={id}>
            <Group header={<Header mode="primary">{HEADER_TITLE}</Header>}>
                <FormItem top="Факт">
                    <Textarea readOnly value={data}/>
                </FormItem>
                <FormItem>
                    <Button
                        onClick={handleClick}
                        loading={isLoading} mode={'primary'} size={'m'}
                    >
                        Сгенерировать
                    </Button>
                </FormItem>
            </Group>
        </Panel>
    );
}