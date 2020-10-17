import { IfFirebaseAuthed } from '@react-firebase/auth'
import React, { Component } from 'react'

export default class CollegeAdminPage extends Component{
    render() {
        return(
            <div>
                <IfFirebaseAuthed>
                <header className="h short"><h1>College Admin Page</h1></header>
                <div className="flex">
                    <div>
                        <textarea />
                        <input type="submit" />
                    </div>
                </div>
                </IfFirebaseAuthed>
            </div>
        )
    }
}