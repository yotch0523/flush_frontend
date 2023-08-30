import React, { createContext, Dispatch, SetStateAction, useRef } from 'react'

export enum AppContextType {
  IsSidebarVisible = 'isSidebarVisible',
}

type ValueType = {
  [key in AppContextType]?: Dispatch<SetStateAction<boolean | undefined>>
}

export const AppContext = createContext<ValueType>(undefined as never)

const AppContextProvider = ({ children }: any) => {
  const dispatches = useRef<ValueType>({}).current

  return <AppContext.Provider value={dispatches}>{children}</AppContext.Provider>
}

export default AppContextProvider
