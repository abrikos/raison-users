import React, {useEffect, useState} from 'react';
import "./app.sass"
import axios from "axios";

function App() {
    const [list, setList] = useState<[]>([]);
    useEffect(() => {
        axios.get('https://frontend-test.netbox.ru/')
            .then(res => {
                setList(res.data)
            })
    }, [])

    class IUser {
        id: number = 0;
        name: string = '';
        age: number = 0;
        phone: string = '';
        email: string = ''
    }

    const User = new IUser();
    const fields: Array<string> = Object.keys(User)
    function getUser(item:Array<Object>){
        const user = {}
        for(const field of fields){
            console.log(field)
            //user[field] = item.filter((i:IData)=>i.field===field)
        }
    }

    function parseUser(item:[], field:string):IUser{
        const user:IUser = new IUser()
        //TODO transform array to IUser
        //user[field] = 'aaa';
        return user;
    }

    return (
        <div className="App">
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Phone</th>
                    <th>Email</th>
                </tr>
                </thead>
                <tbody>
                {list.map((item, i) => <tr key={i}>
                    {fields.map(field=><td key={field}>{JSON.stringify(item)}</td>)}
                </tr>)}
                </tbody>
            </table>
        </div>
    );
}

export default App;
