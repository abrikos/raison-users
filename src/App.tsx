import React, {FormEventHandler, SetStateAction, useEffect, useState} from 'react';
import "./app.sass"
import axios from "axios";
import f2o from "form-to-object"

function App() {
    const [list, setList] = useState<TUser[]>([]);

    //Define type for loop through keys
    class TUser {
        ID: number = 0;
        Name: string = '';
        Age: number = 0;
        Phone: string = '';
        "E-mail": string = '';
    }

    //Interface for lop through fields array
    interface IData {
        field: string,
        value: number | string
    }

    //Modify array of fields to TUser
    function parseUser(item: Array<IData>): TUser {
        const setKeyValue = <T extends object, U extends keyof T>(obj: T, value: any) => (key: U) => obj[key] = value;
        let user: { [key: string]: any } = new TUser();
        for (const field in user) {
            const data: IData = item.find((i: IData) => i.field === field) as IData;
            setKeyValue(user, data.value)(field)
        }
        return user as TUser
    }

    useEffect(() => {
        axios.get('https://frontend-test.netbox.ru/')
            .then(res => {
                setList(res.data.map((row: IData[]) => parseUser(row)))
            })
    }, [])

    //Initialise proto User to access it's keys
    const User = new TUser();


    //Component draws row of each user
    function UserRow(props: { item: TUser }) {
        const [edit, setEdit] = useState<boolean>();

        function handleEditUser(e: any) {
            e.preventDefault();
            setEdit(true)
        }

        function handleSaveUser(e: any) {
            e.preventDefault();
            const form: TUser = f2o(e.target) as TUser;
            //TODO post changed user's data
            setList(list.map(item => item.ID * 1 === form.ID * 1 ? form : item))
            console.log(list.map(item => item.ID === form.ID ? form : item))
            setEdit(false)
        }

        function handleDeleteUser(user: TUser) {
            //TODO delete user
            setList(list.filter((f: TUser) => f.ID !== user.ID) as SetStateAction<TUser[]>)
        }

        //Component draws cell of each user's field
        function UserCell(props: { item: TUser, field: keyof TUser }) {
            return <div className="col">
                {edit && props.field !== 'ID' ?
                    <input defaultValue={props.item[props.field]} name={props.field}/> : props.item[props.field]}
            </div>
        }

        return <div>
            <form onSubmit={e => handleSaveUser(e)} className="row" key={props.item.ID}>
                <input type="hidden" value={props.item.ID} name="ID"/>
                {Object.keys(User).map((field) => <UserCell key={field} item={props.item}
                                                            field={field as keyof TUser}/>)}
                <div className="col">
                    {edit ? <button onClick={() => setEdit(false)}>Cancel</button> :
                        <button onClick={() => handleDeleteUser(props.item)} className="btn-delete">Delete</button>}
                </div>
                <div className="col">
                    {edit ? <button type="submit" className="btn-save">Save</button> :
                        <button onClick={e => handleEditUser(e)}>Edit</button>
                    }
                </div>
            </form>
        </div>
    }

    return (
        <div className="App">
            <div className="table">
                <div className="tbody">
                    <div className="row">
                        {Object.keys(User).map(field => <div className="col" key={field}>{field}</div>)}
                        <div className="col"/>
                        <div className="col"/>
                    </div>

                    {list.map((item: TUser, i) => <UserRow item={item} key={i}/>)}
                </div>
            </div>
            <div><i>Users count:</i> {list.length}</div>

        </div>
    );
}

export default App;
