import React, {useState, createContext} from 'react'

export const AppContext = createContext()

export const AppProvider = props => {
    const [users, setUsers] = useState(null)
    const [loginState, setLoginState] = useState(false)

    return (
        <AppContext.Provider value={[
            users, setUsers,
            loginState, setLoginState
        ]}>
            {props.children}
        </AppContext.Provider>
    )
}
