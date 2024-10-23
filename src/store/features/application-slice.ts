import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export interface ApplicationState {
  count: number;
}

const initialState: ApplicationState = {
  count: 0
};

export const applicationSlice = createSlice({
  name: 'application',
  initialState,
  reducers: {
    setCount: (state, action: PayloadAction<number>) => {
      state.count = action.payload;
    }
  }
});

// Action creators are generated for each case reducer function
export const { setCount } = applicationSlice.actions;

export default applicationSlice.reducer;
