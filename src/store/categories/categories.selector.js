import { createSelector } from 'reselect';

const selectCategoryReducer = (state) => state.categories;

export const selectCategories = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.categories
);

export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories) => {
    const categoryMap = categories.reduce((accumulator, categoryArray) => {
      const { title, items } = categoryArray;
      accumulator[title.toLowerCase()] = items;
      return accumulator;
    }, {});
    return categoryMap;
  }
);
