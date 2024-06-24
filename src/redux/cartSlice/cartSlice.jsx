import { createSlice } from '@reduxjs/toolkit'

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalPrice: 0,
  },
  reducers: {
    addtoCart: (state, action) => {
      const newItem = action.payload
      state.items.push(newItem)
      state.totalPrice += newItem.price
    },
    clearCart: (state) => {
      state.items = []
      state.totalPrice = 0
    },
  },
})

export const { addtoCart, clearCart } = cartSlice.actions

export default cartSlice.reducer
