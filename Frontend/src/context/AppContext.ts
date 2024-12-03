import {createContext} from "react";

interface appContextType{
    account: Account | undefined,
    setAccount: (account: Account | undefined) => void;
}


export const AppContext = createContext<appContextType>({
    account: undefined,
    setAccount: () => {},
});
