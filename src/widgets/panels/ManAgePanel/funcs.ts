import {API_LINK} from "./const";

interface dataFields {
    count: number,
    name: string,
    age: number
}

const buildLink = (query: string) => {
    const newUrl = new URL(API_LINK);
    newUrl.searchParams.append("name", query);
    return newUrl;
}
export const getAge = async(name: string): Promise<number> => {
    if (name === "") {
        return 0;
    }
    const fetchingLink = buildLink(name);
    const answer = await fetch(fetchingLink);
    const data: dataFields = await answer.json();
    return data.age;
}