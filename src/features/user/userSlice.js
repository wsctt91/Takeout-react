import { createSlice } from "@reduxjs/toolkit";

/* function getPosition() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

async function fetchAddress() {
  // 1) We get the user's geolocation position
  const positionObj = await getPosition();
  const position = {
    latitude: positionObj.coords.latitude,
    longitude: positionObj.coords.longitude,
  };

  // 2) Then we use a reverse geocoding API to get a description of the user's address, so we can display it the order form, so that the user can correct it if wrong
  const addressObj = await getAddress(position);
  const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

  // 3) Then we return an object with the data that we are interested in
  return { position, address };
} */

//  初始化用户名  为了方便测试，我们将用户名设置为空字符串
const initialState = {
  username: "",
};
//  创建一个名为user的slice
const userSlice = createSlice({
  name: "user",
  initialState,
  // 创建一个名为updateName的reducer
  reducers: {
    updateName(state, action) {
      state.username = action.payload;
    },
  },
});

// 导出reducer和action
export const { updateName } = userSlice.actions;
//  导出reducer
export default userSlice.reducer;
