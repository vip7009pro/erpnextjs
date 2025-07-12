import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Tab = {
  key: string;
  title: string;
  component: string;
};

interface TabState {
  activeKey: string;
  tabs: Tab[];
}

const initialState: TabState = {
  activeKey: 'dashboard',
  tabs: [{ key: 'dashboard', title: 'Trang chính', component: 'Dashboard' }],
};

const tabSlice = createSlice({
  name: 'tab',
  initialState,
  reducers: {
    openTab: (state, action: PayloadAction<Tab>) => {
      const exists = state.tabs.find((t) => t.key === action.payload.key);
      if (!exists) state.tabs.push(action.payload);
      state.activeKey = action.payload.key;
    },
    closeTab: (state, action: PayloadAction<string>) => {
      state.tabs = state.tabs.filter((t) => t.key !== action.payload);
      if (state.activeKey === action.payload && state.tabs.length > 0) {
        state.activeKey = state.tabs[state.tabs.length - 1].key;
      }
    },
    setActiveTab: (state, action: PayloadAction<string>) => {
      state.activeKey = action.payload;
    },
  },
});

export const { openTab, closeTab, setActiveTab } = tabSlice.actions;
export default tabSlice.reducer;
