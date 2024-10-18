import NavbarMenuItems, { NavbarMenuItem } from '@/types/application';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export interface ApplicationState {
  selectedMenuItem: NavbarMenuItem;
}

const initialState: ApplicationState = {
  selectedMenuItem: NavbarMenuItems.HOME
};

export const applicationSlice = createSlice({
  name: 'application',
  initialState,
  reducers: {
    setSelectedMenuItem: (state, action: PayloadAction<NavbarMenuItem>) => {
      state.selectedMenuItem = action.payload;
    }
  }
});

// Action creators are generated for each case reducer function
export const { setSelectedMenuItem } = applicationSlice.actions;

export default applicationSlice.reducer;
