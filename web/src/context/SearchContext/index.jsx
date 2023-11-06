import { createContext, useState } from "react";

export const SearchContext = createContext({
  searchString: "",
  setSearchString: () => {},
  category: "",
  setCategory: () => {},
  rate: "",
  setRate: () => {},
  favorite: false,
  setFavorite: () => {},
  getAll: () => {},
});

export const SearchContextProvider = ({ children }) => {
  const [searchString, setSearchString] = useState(undefined);
  const [category, setCategory] = useState(undefined);
  const [rate, setRate] = useState(undefined);
  const [favorite, setFavorite] = useState(undefined);

  const getAll = () => {
    return {
      searchString,
      category,
      rate,
      favorite,
    };
  };

  return (
    <SearchContext.Provider
      value={{
        searchString,
        setSearchString,
        category,
        setCategory,
        rate,
        setRate,
        favorite,
        setFavorite,
        getAll,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
