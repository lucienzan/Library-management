import { ReactNode, createContext, useReducer } from "react";

type ThemeContextType = {
  theme: string;
  changeTheme?: (theme: string) => void ;
  isDark?: boolean;
};

type ThemeProviderProps = {
  children: ReactNode;
}

type ThemeAction = {
  type: "CHANGE_THEME";
  payload: string;
};

function themeReducer(state: ThemeContextType, action:ThemeAction) {
  switch (action.type) {
    case "CHANGE_THEME":
      return {
        ...state,
        theme: action.payload,
      };
    default:
      return state;
  }
}

const ThemeContext = createContext<ThemeContextType|undefined>(undefined);

const ThemeContextProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(themeReducer, {
    theme: "light"
  });

  const changeTheme = (theme:string) => {
    dispatch({type: "CHANGE_THEME",payload:theme});
  }

  const isDark = state.theme === "dark";

  return (
    <ThemeContext.Provider value={{...state, changeTheme, isDark}}>
      {children}
    </ThemeContext.Provider>
  );
};
export { ThemeContext, ThemeContextProvider };

