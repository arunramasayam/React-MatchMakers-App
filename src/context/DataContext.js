import { createContext } from "react";


export const DataContext = createContext({});

export const DataProvider = ({ children }) => {
    return (
        <DataContext.Provider value={{
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext;