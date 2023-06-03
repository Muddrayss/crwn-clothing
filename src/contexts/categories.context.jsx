import { createContext, useEffect, useReducer } from 'react';

import { getCategoriesAndDocuments } from '../utils/firebase/firebase.utils';
import { createAction } from '../utils/reducers/reducers.utils';

export const CategoriesContext = createContext({
  categoriesMap: {},
});

const CATEGORIES_STATE_TYPES = {
  SET_CATEGORIES_MAP: 'SET_CATEGORIES_MAP',
};

const categoriesReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case CATEGORIES_STATE_TYPES.SET_CATEGORIES_MAP:
      return { ...state, categoriesMap: payload };
    default:
      throw new Error(`Unhandled type ${type} in categoriesReducer`);
  }
};

const INITIAL_STATE = {
  categoriesMap: {},
};

export const CategoriesProvider = ({ children }) => {
  const [{ categoriesMap }, dispatch] = useReducer(
    categoriesReducer,
    INITIAL_STATE
  );

  useEffect(() => {
    (async () => {
      const categoryMap = await getCategoriesAndDocuments();
      dispatch(
        createAction(CATEGORIES_STATE_TYPES.SET_CATEGORIES_MAP, categoryMap)
      );
    })();
  }, []);

  const value = { categoriesMap };

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};
