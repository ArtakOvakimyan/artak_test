import {FC, useEffect, useRef, useState} from 'react';
import {NavIdProps, Panel, Header, FormItem, Group, Button, Textarea, FormLayoutGroup, Input} from '@vkontakte/vkui';
import {DELAY, HEADER_TITLE, INPUT_REGEXP} from "./const";
import {keepPreviousData, useQuery} from "@tanstack/react-query";
import {getAge} from "./funcs";

export const ManAgePanel: FC<NavIdProps> = ({id}) => {
    const [name, setName] = useState<string>("");
    const timer = useRef<ReturnType<number> | null>(null);
    const {data, isLoading, refetch, isPlaceholderData} = useQuery({
        queryKey: ['age', name],
        queryFn: () => getAge(name),
        refetchOnWindowFocus: false,
        placeholderData: keepPreviousData,
        enabled: false
    });
    const handleClick = () => {
        if (!data || isPlaceholderData) {
            window.clearTimeout(timer.current);
            refetch();
        }
    }
    const handleChange = (e) => {
        setName((e.currentTarget.value.replace(INPUT_REGEXP, "")));
    }
    useEffect(() => {
        if (!data || isPlaceholderData) {
            timer.current = window.setTimeout(() => {
                refetch();
            }, DELAY);
        }
        return () => window.clearTimeout(timer.current);
    }, [data, isPlaceholderData, name, refetch])

    return (
        <Panel id={id}>
            <Group header={<Header mode="primary">{HEADER_TITLE}</Header>}>
                <FormLayoutGroup>
                    <FormItem top="Ввод имени (eng)">
                        <Input
                            type={"text"}
                            onChange={handleChange}
                            value={name}
                            pattern={"[a-zA-Z]+"}
                        />
                    </FormItem>
                    <FormItem top="Возраст">
                        <Textarea readOnly value={data || ""}/>
                    </FormItem>
                    <FormItem>
                        <Button
                            onClick={handleClick}
                            loading={isLoading}
                            mode={'primary'}
                            size={'m'}
                            type={"submit"}
                        >
                            Найти
                        </Button>
                    </FormItem>
                </FormLayoutGroup>
            </Group>
        </Panel>
    );
}