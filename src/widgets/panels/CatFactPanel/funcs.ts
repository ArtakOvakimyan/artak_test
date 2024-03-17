import {API_LINK} from "./const";

interface dataFields {
    fact: string,
    length: number
}

export const getFact = async(): Promise<string> => {
    const answer = await fetch(API_LINK);
    const data: dataFields = await answer.json();
    return data.fact;
}