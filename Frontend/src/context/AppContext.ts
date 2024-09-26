import {createContext} from "react";

export const AppContext = createContext({
    account: undefined,
    setAccount: (account: Account) => {},
});