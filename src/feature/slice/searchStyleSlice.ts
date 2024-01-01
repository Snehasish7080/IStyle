import type {PayloadAction} from '@reduxjs/toolkit';
import {createSlice} from '@reduxjs/toolkit';
import {ISearchStyle} from '../../interface/searchStyle';
import {searchApi} from '../services/search';

export interface SearchStyleState {
  searchStyles0: ISearchStyle[];
  searchStyles1: ISearchStyle[];
}

const initialState: SearchStyleState = {
  searchStyles0: [],
  searchStyles1: [],
};

export const searchStyleSlice = createSlice({
  name: 'searchStyleSlice',
  initialState,
  reducers: {
    setSearchStyles: (state, action: PayloadAction<ISearchStyle[]>) => {
      const midpoint = Math.ceil(action.payload.length / 2);
      if (midpoint > 0) {
        const firstHalf = action.payload.slice(0, midpoint);
        state.searchStyles0 = firstHalf;

        const secondHalf = action.payload.slice(-midpoint);
        state.searchStyles1 = secondHalf;
      }
    },
  },
  extraReducers: builder => {
    builder.addMatcher(
      searchApi.endpoints.searchStyleByText.matchFulfilled,
      (state, {payload}) => {
        if (payload.success) {
          if (payload.data) {
            const midpoint = Math.ceil(payload.data.length / 2);
            if (midpoint > 0) {
              const firstHalf = payload.data.slice(0, midpoint);
              state.searchStyles0 = firstHalf;

              const secondHalf = payload.data.slice(-midpoint);
              state.searchStyles1 = secondHalf;
            }
          }
        }
      },
    );
  },
});

// Action creators are generated for each case reducer function
export const {setSearchStyles} = searchStyleSlice.actions;
export default searchStyleSlice.reducer;
