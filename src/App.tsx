import React, {useEffect, useState} from 'react';
import "./app.sass"
import axios from "axios";

function App() {
    const [list, setList] = useState<[]>([]);
    class IUser {
        ID: number = 0;
        Name: string = '';
        Age: number = 0;
        Phone: string = '';
        "E-mail": string = '';
    }

    interface IData {
        field: string,
        value: number | string
    }


    useEffect(() => {
        axios.get('https://frontend-test.netbox.ru/')
            .then(res => {
                setList(res.data.map((row:IData[])=>getUser(row)))
            })
    }, [])

    const User = new IUser();
    const fields: Array<string> = Object.keys(User)
    const setKeyValue = <T extends object, U extends keyof T>(obj: T, value:any) => (key: U) => obj[key] = value;

    function getUser(item: Array<IData>) {
        let user:{[key:string]: any} =  new IUser();
        for (const field in user) {
            const data: IData = item.find((i: IData) => i.field === field) as IData;
            setKeyValue(user, data.value)(field)

        }
        return user
    }

    return (
        <div className="App">
            <table>
                <thead>
                <tr>
                    {fields.map(field => <th key={field}>{field}</th>)}
                </tr>
                </thead>
                <tbody>
                {list.map((item, i) => <tr key={i}>
                    {fields.map(field => <td key={field}>{item[field]}</td>)}
                </tr>)}
                </tbody>
            </table>
        </div>
    );
}

export default App;
