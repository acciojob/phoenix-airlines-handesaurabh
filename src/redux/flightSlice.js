import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  search: {},
  selectedFlight: null,
  bookingDetails: null
};

const flightSlice = createSlice({
  name: "flight",
  initialState,
  reducers: {
    setSearchDetails: (state, action) => {
      state.search = action.payload;
    },
    setSelectedFlight: (state, action) => {
      state.selectedFlight = action.payload;
    },
    setBookingDetails: (state, action) => {
      state.bookingDetails = action.payload;
    }
  }
});

export const { setSearchDetails, setSelectedFlight, setBookingDetails } = flightSlice.actions;
export default flightSlice.reducer;

