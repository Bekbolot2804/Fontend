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
  comment?: string | null;
  lesion?: number;
}

interface lesion {
  lesion_id?: number;
  helps?: helpLesion[];
  creator?: string;
  moderator?: string;
  status?: string;
  date_of_creation?: string;
  date_of_formation?: string | null;
  date_of_finish?: string | null;
  sum_duration?: number | null;
}

interface lesionState {
    lesion: lesion,
    loading: boolean
}

const initialState: lesionState = {
    lesion: {},
    loading: false
}

export const getLesionInformation = createAsyncThunk(
    'lesion/getLesionInformation',
    async (lesionId: string, { rejectWithValue }) => {
      try {
        const response = await api.lesion.lesionRead(lesionId)
        return response.data
      } catch (error: any) {
        return rejectWithValue("Произошла ошибка")
      }
    }
)

export const deleteHelpFromLesion = createAsyncThunk(
    'lesion/deleteHelpFromLesion',
    async (credentials: {lesionId: number, helpId: number}, { dispatch,rejectWithValue }) => {
        try {
            const response = await api.helpLesion.helpLesionDelete(credentials.helpId.toString(), credentials.lesionId.toString())
            dispatch(deleteHelpFromLesionAction({helpId: credentials.helpId, lesionId: credentials.lesionId}))
            return response.data
        } catch (error: any) {
          return rejectWithValue("Произошла ошибка")
        }
    }
)

export const saveComment = createAsyncThunk(
  'lesion/comment?: string | null;',
  async (credentials: {lesionId: number, helpId: number, comment: string}, { rejectWithValue }) => {
      try {
          const response = await api.helpLesion.helpLesionUpdate(credentials.helpId.toString(), credentials.lesionId.toString(), {comment: credentials.comment})
          return response.data
      } catch (error: any) {
        return rejectWithValue("Произошла ошибка")
      }
  }
)

export const deleteLesion = createAsyncThunk(
  'lesion/deleteLesion',
  async (lesionId: number, { rejectWithValue }) => {
      try {
          const response = await api.lesion.lesionFormingDelete(lesionId.toString())
          return response.data
      } catch (error: any) {
        return rejectWithValue("Произошла ошибка")
      }
  }
)

export const formLesion = createAsyncThunk(
  'lesion/formLesion',
  async (lesionId: number, { rejectWithValue }) => {
      try {
          const response = await api.lesion.lesionFormingUpdate(lesionId.toString())
          return response.data
      } catch (error: any) {
          return rejectWithValue("Произошла ошибка")
      }
  }
)

const lesionSlice = createSlice({
    name: 'lesion',
    initialState,
    reducers: {
      setLesionHelpComment(state, {payload}) {
        const help = state.lesion.helps?.find((el) => el.help?.help_id === payload.help_id)
        help!.comment = payload.quantity
      },
      deleteHelpFromLesion(state, {payload}) {
        state.lesion.helps = state.lesion.helps?.filter((el) => el.help?.help_id !== payload.helpId)
      }
    },
    extraReducers: (builder) => {
        builder.addCase(getLesionInformation.pending, (state) => {
          state.loading = true
        }),
        builder.addCase(getLesionInformation.fulfilled, (state, {payload}) => {
          state.lesion = payload
          state.loading = false
        }),
        builder.addCase(getLesionInformation.rejected, (state) => {
          state.loading = false
        })
    }
})

export const useLesion = () => useSelector((state: RootState) => state.lesion.lesion)
export const useLesionHelps = () => useSelector((state: RootState) => state.lesion.lesion.helps)
export const useLesionLoading = () => useSelector((state: RootState) => state.lesion.loading)
export const useLesionStatus = () => useSelector((state: RootState) => state.lesion.lesion.status)

export const {
  setLesionHelpComment: setLesionHelpQuantityAction,
  deleteHelpFromLesion: deleteHelpFromLesionAction
} = lesionSlice.actions

export default lesionSlice.reducer