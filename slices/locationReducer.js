import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Alert } from "react-native";
import gglApiKey from "../gglApiKey";

const initialState = {
  userLoc: {},
  nearestStation: null,
  targetedBus: {
    name: "ab",
  },
  STATIONS: null,
  BUS: [],
  BusPath: null,
  isFetching: false,
  isSuccess: false,
  isError: false,
  errorMessage: "",
  driverDetails: {},
  DRIVERS: [],
  WAYPOINTS: [],

};

export const getDriver = createAsyncThunk(
  "loc/getDrivers",

  async (driverId, thunkAPI) => {
    try {
      //code fetch driver from the database
      const response = await fetch(
        `https://strategic-kite-348606-default-rtdb.firebaseio.com/users/${driverId}.json`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      let data = await response.json();
      // console.log('Data get Driver Loc', data);
      if (response.status === 200) {
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      console.log("Error", e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const DistanceMatrix = createAsyncThunk(
  "loc/DistanceMatrix",
  async ({ origin, destination }, thunkAPI) => {
    console.log('---------------ORIGIN--DIS------',origin,destination)
    try {
      //code fetch driver loc from the database
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin.location.latitude},${origin.location.longitude}&destinations=${destination.latitude},${destination.longitude}&key=${gglApiKey}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      let data = await response.json();
      console.log("ggl DATA--------------------------------", data);
      if (response.status === 200) {
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      console.log("Error", e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const getDriverLoc = createAsyncThunk(
  "loc/getDriver",
  async ({ userId, id }, thunkAPI) => {
    try {
      //code fetch driver loc from the database
      const response = await fetch(
        `https://strategic-kite-348606-default-rtdb.firebaseio.com/users/${userId}/${id}/location.json`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      let data = await response.json();
      console.log("Data get Driver Loc--------------------------------", data);
      if (response.status === 200) {
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      console.log("Error", e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const updateUserLoc = createAsyncThunk(
  "loc/updateUserLoc",
  async ({ targetedUser, userLoc ,send }, thunkAPI) => {
    console.log(targetedUser, userLoc, "in Update");
    try {
      const response = await fetch(
        `https://strategic-kite-348606-default-rtdb.firebaseio.com/users/${targetedUser.userId}/${targetedUser.uid}.json`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            location: userLoc,
            isMoving: send,
          }),
        }
      );

      if (response.status === 200) {
        console.log(
          "--------------------------------------it did update-------------------------------------------------------"
        );
      } else {
        console.log(
          "--------------------------------smthin went wron------------------------------"
        );
      }
    } catch (e) {
      console.log("Error smthin went wron", e.response.data);
    }
  }
);

export const getStations = createAsyncThunk(
  "loc/getStations",
  async (args, thunkAPI) => {
    try {
      //code fetch all station from the database
      const response = await fetch(
        "https://strategic-kite-348606-default-rtdb.firebaseio.com/stations.json",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      let data = await response.json();
      //console.log('data GET Stations', data);
      if (response.status === 200) {
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      console.log("Error", e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const getStationBuses = createAsyncThunk(
  "loc/getStationBuses",
  async (BusId, thunkAPI) => {
    try {
      //code fetch all station from the database
      const response = await fetch(
        `https://strategic-kite-348606-default-rtdb.firebaseio.com/Bus/${BusId}.json`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      let data = await response.json();

      // console.log('data GET Stations', data);
      if (response.status === 200) {
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      console.log("Error", e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const locationReducer = createSlice({
  name: "loc",
  initialState,
  reducers: {
    setUserLoc: (state, action) => {
      state.userLoc = action.payload;
    },
    setBusPath: (state, { payload }) => {
      state.BusPath = payload.path;
      state.WAYPOINTS = state.STATIONS.filter((station) => {
        return Object.values(station.BusIds).indexOf(payload.id) >= 0;
      });
    },
    setDrivers: (state, action) => {
      state.DRIVERS = action.payload;
    },
    setNearsetStation: (state, action) => {
      state.nearestStation = action.payload;
    },
    setTargetedBus: (state, action) => {
      state.targetedBus = action.payload;
    },
    setDistanceBetween: (state, { payload }) => {
      state.STATIONS[payload.index].distanceBetween = payload.distance;
    },
    sortBydistance: (state) => {
      state.STATIONS.sort((a, b) => a.distanceBetween - b.distanceBetween);
    },
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;
      return state;
    },
  },
  extraReducers: {
    [getStations.pending]: (state) => {
      state.isFetching = true;
    },
    [getStations.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      try {
        state.STATIONS = Object.values(payload);
        console.log("its after");
      } catch (error) {
        Alert.alert("somethin went wrong in getStation");
        state.STATIONS = [];
      }
    },
    [getStations.rejected]: (state, { payload }) => {
      console.log("getStations ReJected", payload);
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = "coudnt get stations data";
    },
    [getStationBuses.pending]: (state) => {},
    [getStationBuses.fulfilled]: (state, { payload }) => {
      try {
        const bus = Object.values(payload);
        bus.forEach((elm) => {
          elm.driverIds = Object.values(elm.driverIds);
        });
        state.BUS = bus;
        console.log("-----------------BUSES-------", state.BUS);
      } catch (error) {
        Alert.alert("somethin went wrong in getStationBuses");
        state.BUS = [];
      }
      console.log(
        "fulfilled getStationBuses-------------------------------------------------------------------------",
        state.BUS
      );
    },
    [getStationBuses.rejected]: (state, { payload }) => {
      console.log("getStationBuses ReJected", payload);
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = "coudnt get Station Buses data";
    },
    [getDriverLoc.pending]: (state) => {},
    [getDriverLoc.fulfilled]: (state, { payload }) => {
      try {
       const index= state.DRIVERS.indexOf((driver)=>driver.id == state.targetedBus.id);
        state.targetedBus = { ...state.targetedBus, location: payload };
        console.log(
          state.targetedBus,
          "==================DA TARGETED BUS======================"
        );
        state.DRIVERS[index]= state.targetedBus;
        console.log(state.DRIVERS[index],'--------------DADadADADADAD----------------');
      } catch (error) {
        Alert.alert("somethin went wrong in getDriverLoc");
      }
    },
    [getDriverLoc.rejected]: (state, { payload }) => {
      console.log("getDriverLoc ReJected", payload);
      state.isError = true;
      state.errorMessage = "coudnt get DriverLoc data";
    },
    [getDriver.pending]: (state) => {},
    [getDriver.fulfilled]: (state, { payload }) => {
      try {
        const uid = Object.keys(payload);
        console.log(
          "fulfilled getDriver-------------------------------------------------------------------------",
          payload
        );
        console.log("uid", uid);
        if (state.DRIVERS) {
          state.DRIVERS = [...state.DRIVERS, { ...payload[uid], id: uid[0] }];
        } else {
          state.DRIVERS = [{ ...payload[uid], id: uid[0] }];
        }
        console.log(
          "-----------------Drivers----------------------",
          state.DRIVERS
        );
        // {...state.targetedBus,location:payload[uid].location,isMoving:payload[uid].isMoving}
      } catch (error) {
        Alert.alert("somethin went wrong in getDriver");
      }
    },
    [getDriver.rejected]: (state, { payload }) => {
      console.log("getDrivery ReJected", payload);
      state.isError = true;
      state.errorMessage = "coudnt get Driver data";
    },
    [DistanceMatrix.fulfilled]: (state, { payload }) => {
      console.log('----------------ggl on-----------------',payload);
      state.targetedBus = {...state.targetedBus,info:payload.rows[0].elements}
      console.log(state.targetedBus);
     // state.DRIVERS[state.DRIVERS.indexOf(payload.origin)]={...state.DRIVERS[state.DRIVERS.indexOf(payload.origin),payload.rows]};
    }
  },
});

export const {
  setUserLoc,
  setNearsetStation,
  setTargetedBus,
  setDistanceBetween,
  sortBydistance,
  clearState,
  setDrivers,
  setBusPath,
} = locationReducer.actions;
export const isSmthing = (state) => state.loc;
export default locationReducer.reducer;
