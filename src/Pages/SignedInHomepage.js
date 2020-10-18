import { FirebaseAuthConsumer } from '@react-firebase/auth'
import { FirebaseDatabaseNode } from '@react-firebase/database'
import React from 'react'
import HomePageSection from '../Components/HomePageSection'

export default function SignedInHomepage() {
    return (
        <FirebaseAuthConsumer>
            {({ isAuthed, user, providerId }) => {
                return (<div>
                    <FirebaseDatabaseNode path={`/user_data/${user.uid}`}>
                        {(data) => {
                            return (
                                <React.Fragment>
                                    <header className="h">
                                        <h1>Hi {data.value?.firstName}</h1>
                                    </header>
                                    <HomePageSection title="Your Deadlines">
                                        <p>{JSON.stringify(data.value)}</p>
                                    </HomePageSection>
                                    <HomePageSection title="Colleges in your list"></HomePageSection>
                                </React.Fragment>
                            )
                        }}
                    </FirebaseDatabaseNode>
                </div>)
            }}
        </FirebaseAuthConsumer>
    )
}