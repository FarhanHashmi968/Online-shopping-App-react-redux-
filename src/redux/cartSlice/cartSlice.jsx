import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const url = 'https://dummyjson.com/products?limit=100'

export const getData = createAsyncThunk(
  'cart/getData',
  async (arg, thunkAPI) => {
    try {
      const resp = await fetch(url)
      const data = await resp.json()

      return data.products
    } catch (error) {
      return console.log(error)
    }
  }
)

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    isLoading: true,
    data: [],
    items: [],
    totalPrice: 0,
  },
  reducers: {
    addtoCart: (state, action) => {
      console.log(action.payload)

      const newItem = action.payload
      state.items.push(newItem)
      state.totalPrice += newItem.price
    },
    clearCart: (state) => {
      state.items = []
      state.totalPrice = 0
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getData.pending, function (state, action) {
        state.isLoading = true
      })
      .addCase(getData.fulfilled, function (state, action) {
        state.isLoading = false
        state.data = action.payload
      })
      .addCase(getData.rejected, function (state, action) {
        state.isLoading = false
      })
  },
})

export const { addtoCart, clearCart } = cartSlice.actions

export default cartSlice.reducer
