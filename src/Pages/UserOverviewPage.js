import { FirebaseAuthConsumer, IfFirebaseAuthed, IfFirebaseUnAuthed } from '@react-firebase/auth'
import { FirebaseDatabaseNode } from '@react-firebase/database';
import React, { Component } from 'react'
import getSchoolStages from '../api/getSchoolStages'
import firebase from "firebase/app"
import "firebase/auth"
import "firebase/database"
import { Redirect } from 'react-router-dom';
export default class UserOverviewPage extends Component {
    constructor(props) {
        super(props)
        this.getGradeName = this.getGradeName.bind(this)
    }
    state = {
        gradeLevel: ""
    }
    signOut() {
        firebase.auth().signOut()
    }
    getGradeName(gradeLevel) {
        switch (gradeLevel) {
            case 11: return "Junior"
            case 12: return "Senior"
            case 10: return "Sophomore"
            case 9: return "Freshman"
            default: return `${gradeLevel}th Grade`
        }
    }
    render() {
        let data = {}
        return (
            <FirebaseAuthConsumer>
                {({ isSignedIn, user, providerId }) => {
                    if (isSignedIn) {
                        return (
                            <FirebaseDatabaseNode path={`user_data/${user.uid}`} orderByValue="created_on">
                                {data => {
                                    return (
                                        <div>

                                            <header className="h short">
                                                <h2>{data.value && data.value["firstName"]}</h2>
                                                <h3>{data.value && this.getGradeName(data.value.gradeLevel)}</h3>
                                                {/* <h2>{data.value.firstName}</h2> */}
                                            </header>
                                            <main>
                                                <section id="collegesList">
                                                    <h3>Your Colleges</h3>
                                                    {data.value && data.value["college_choices"].map((val, ind) => {
                                                        return (
                                                            <div key={ind}>
                                                                <FirebaseDatabaseNode path={`all_colleges/${val}`}>
                                                                    {collegeData => {
                                                                        return (
                                                                            <ul className="collegeList">
                                                                                <li className="left"><span>{collegeData.value && collegeData.value.name}</span><div className="right"><span>{collegeData.value && getSchoolStages(collegeData.value.appStage)}</span> | <span>View College</span></div></li>
                                                                            </ul>
                                                                        )
                                                                    }}

                                                                </FirebaseDatabaseNode>
                                                            </div>
                                                        )
                                                    })}
                                                </section>
                                            </main>
                                            <p>Copyright &copy; 2020 Jose Sanchez. Fork me on GitHub!</p>
                                            <button onClick={this.signOut}>Sign Out</button>
                                        </div>)
                                }}
                            </FirebaseDatabaseNode>
                        );
                    }
                }
                }
            </FirebaseAuthConsumer>

        )
    }
}