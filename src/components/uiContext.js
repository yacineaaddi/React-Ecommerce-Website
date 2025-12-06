import { createContext, useContext, useState } from "react";
const UiContext = createContext();

export function UiProvider({ children }) {
  const [sidebar, setSidebar] = useState(false);
  const [sideMenu, SetsideMenu] = useState(false);
  const [lightbox, setlightbox] = useState();

  return (
    <UiContext.Provider
      value={{
        sidebar,
        setSidebar,
        sideMenu,
        SetsideMenu,
        lightbox,
        setlightbox,
      }}
    >
      {children}
    </UiContext.Provider>
  );
}

export function useUi() {
  return useContext(UiContext);
}
