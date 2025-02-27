import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { api } from "../api/index";

interface helpForLesion {
    help_id?: number;
    name: string;
    status?: string;
    img_url?: string | null;
  }

interface helpLesion {
  id?: number;
  help?: helpForLesion;
  quantity?: string | null;
  remaining_quantity?: string | null;
  decay?: number;
}

interface decay {
  decay_id?: number;
  helps?: helpLesion[];
  creator?: string;
  moderator?: string;
  status?: string;
  date_of_creation?: string;
  date_of_formation?: string | null;
  date_of_finish?: string | null;
  pass_time?: string | null;
}

interface decayState {
    decay: decay,
    loading: boolean
}

const initialState: decayState = {
    decay: {pass_time: ""},
    loading: false
}

export const getLesionInformation = createAsyncThunk(
    'decay/getLesionInformation',
    async (decayId: string, { rejectWithValue }) => {
      try {
        const response = await api.decay.decayRead(decayId)
        return response.data
      } catch (error: any) {
        return rejectWithValue("Произошла ошибка")
      }
    }
)

export const deleteHelpFromLesion = createAsyncThunk(
    'decay/deleteHelpFromLesion',
    async (credentials: {decayId: number, helpId: number}, { dispatch,rejectWithValue }) => {
        try {
            const response = await api.helpLesion.helpLesionDelete(credentials.helpId.toString(), credentials.decayId.toString())
            dispatch(deleteHelpFromLesionAction({helpId: credentials.helpId, decayId: credentials.decayId}))
            return response.data
        } catch (error: any) {
          return rejectWithValue("Произошла ошибка")
        }
    }
)

export const savePassTime = createAsyncThunk(
    'decay/savePassTime',
    async (credentials: {decayId: number, passTime: string}, { rejectWithValue }) => {
        try {
            const response = await api.decay.decayUpdate(credentials.decayId.toString(), {pass_time: credentials.passTime})
            return response.data
        } catch (error: any) {
          return rejectWithValue("Произошла ошибка")
        }
    }
)

export const saveQuantity = createAsyncThunk(
  'decay/saveQuantity',
  async (credentials: {decayId: number, helpId: number, quantity: string}, { rejectWithValue }) => {
      try {
          const response = await api.helpLesion.helpLesionUpdate(credentials.helpId.toString(), credentials.decayId.toString(), {quantity: credentials.quantity})
          return response.data
      } catch (error: any) {
        return rejectWithValue("Произошла ошибка")
      }
  }
)

export const deleteLesion = createAsyncThunk(
  'decay/deleteLesion',
  async (decayId: number, { rejectWithValue }) => {
      try {
          const response = await api.decay.decayFormingDelete(decayId.toString())
          return response.data
      } catch (error: any) {
        return rejectWithValue("Произошла ошибка")
      }
  }
)

export const formLesion = createAsyncThunk(
  'decay/formLesion',
  async (decayId: number, { rejectWithValue }) => {
      try {
          const response = await api.decay.decayFormingUpdate(decayId.toString())
          return response.data
      } catch (error: any) {
          return rejectWithValue("Произошла ошибка")
      }
  }
)

const decaySlice = createSlice({
    name: 'decay',
    initialState,
    reducers: {
      setLesionPassTime(state, {payload}) {
        state.decay.pass_time = payload
      },
      setLesionHelpQuantity(state, {payload}) {
        const help = state.decay.helps?.find((el) => el.help?.help_id === payload.help_id)
        help!.quantity = payload.quantity
      },
      deleteHelpFromLesion(state, {payload}) {
        state.decay.helps = state.decay.helps?.filter((el) => el.help?.help_id !== payload.helpId)
      }
    },
    extraReducers: (builder) => {
        builder.addCase(getLesionInformation.pending, (state) => {
          state.loading = true
        }),
        builder.addCase(getLesionInformation.fulfilled, (state, {payload}) => {
          state.decay = payload
          state.loading = false
        }),
        builder.addCase(getLesionInformation.rejected, (state) => {
          state.loading = false
        })
    }
})

export const useLesion = () => useSelector((state: RootState) => state.decay.decay)
export const useLesionHelps = () => useSelector((state: RootState) => state.decay.decay.helps)
export const useLesionLoading = () => useSelector((state: RootState) => state.decay.loading)
export const useLesionStatus = () => useSelector((state: RootState) => state.decay.decay.status)

export const {
  setLesionPassTime: setLesionPassTimeAction,
  setLesionHelpQuantity: setLesionHelpQuantityAction,
  deleteHelpFromLesion: deleteHelpFromLesionAction
} = decaySlice.actions

export default decaySlice.reducer