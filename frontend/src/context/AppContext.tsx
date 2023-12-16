import { createContext } from "react";
import { AppContextType } from "../typings/AppContextType";

const defaultValue: AppContextType = {
    data: null
}

export const AppContext = createContext<AppContextType>(defaultValue);