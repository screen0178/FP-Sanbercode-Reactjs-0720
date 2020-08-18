import React, {useState, createContext} from 'react'

export const AppContext = createContext()

export const AppProvider = props => {
    const [users, setUsers] = useState(null)
    const [loginState, setLoginState] = useState(false)

    const [filmData, setFilmData] = useState(null)
    const [editId, setEditId] = useState(0)
    const [isEdit, setIsEdit] = useState(false)
    const [gameData, setGameData] = useState(null)
    return (
        <AppContext.Provider value={[
            users, setUsers,
            loginState, setLoginState,
            filmData, setFilmData,
            editId, setEditId,
            isEdit, setIsEdit,
            gameData, setGameData
        ]}>
            {props.children}
        </AppContext.Provider>
    )
}
