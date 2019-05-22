import React, { Component } from 'react';

const FirebaseContext = React.createContext(null);

export const withFirebase:React.StatelessComponent<{
    
}> = (props) => {

    return (
        <FirebaseContext.Consumer>
            {firebase => <Component {...props} firebase={firebase} />}
        </FirebaseContext.Consumer>
    );
};

export default FirebaseContext;
