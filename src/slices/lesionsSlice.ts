import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../api/index";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { format, parseISO } from "date-fns";

interface decay {
    decay_id?: number;
    creator?: string;
    moderator?: string;
    status?: string;
    date_of_creation?: string;
    date_of_formation?: string | null;
    date_of_finish?: string | null;
    qr?: string | null;
}

interface decaysState {
    decays: decay[],
    start_date: string,
    end_date: string,
    status: string,
    email: string,
    loading: boolean
}

const initialState: decaysState = {
    decays: [],
    start_date: "",
    end_date: "",
    status: "",
    email: "",
    loading: false
}

const dateFormat = (date:string) => {
    return format(parseISO(date), "dd.MM.yyyy HH:mm")
}

const statusFormat = (status: string) => {
    const statusMap: Record<string, string> = {
        completed: "Завершен",
        rejected: "Отклонен",
        formed: "Сформирован"
    };

    return statusMap[status]
};

export const getLesions = createAsyncThunk(
    'decays/getLesions',
    async (credentials: {start_date?: string, end_date?: string, status?: string}, { rejectWithValue }) => {
        try {
            const response = await api.decays.decaysList({start_date: credentials?.start_date, 
                                                          end_date: credentials.end_date ? `${credentials?.end_date} 23:59` : undefined, 
                                                          status: credentials?.status})
            return response.data
        } catch (error: any) {
            return rejectWithValue("Произошла ошибка")
        }
    }
)

export const moderateLesion = createAsyncThunk(
    'decays/moderateLesion',
    async (decayId: number, {rejectWithValue}) => {
        try {
            const response = await api.decay.decayModerateUpdate(decayId.toString(), {accept: 'true'})
            return response.data
        } catch (error: any) {
            return rejectWithValue("Произошла ошибка")
        }
    }
)

export const rejectLesion = createAsyncThunk(
  'decays/rejectLesion',
  async (decayId: number, {rejectWithValue}) => {
      try {
          const response = await api.decay.decayModerateUpdate(decayId.toString(), {accept: 'false'})
          return response.data
      } catch (error: any) {
          return rejectWithValue("Произошла ошибка")
      }
  }
)

const decaysSlice = createSlice({
    name: 'decays',
    initialState,
    reducers: {
        setFilterStartDate(state, {payload}) {
            state.start_date = payload
        },
        setFilterEndDate(state, {payload}) {
            state.end_date = payload
        },
        setFilterStatus(state, {payload}) {
            state.status = payload
        },
        resetFilters(state) {
            state.status = ''
            state.end_date = ''
            state.start_date = ''
            state.email = ''
        },
        setLesionsEmail(state, {payload}) {
            state.email = payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getLesions.pending, (state) => {
            state.loading = true
        }),
        builder.addCase(getLesions.fulfilled, (state, {payload}) => {
            state.decays = payload
            state.decays.forEach((item, index) => {
                if (item.date_of_creation) {
                    item.date_of_creation = dateFormat(item.date_of_creation!)
                }
                if (item.date_of_formation) {
                    item.date_of_formation = dateFormat(item.date_of_formation!)
                }
                if (item.date_of_finish) {
                    item.date_of_finish = dateFormat(item.date_of_finish!)
                }
                item.status = statusFormat(item.status!)
            })
            state.loading = false
        }),
        builder.addCase(getLesions.rejected, (state) => {
            state.loading = false
        }),
        builder.addCase(moderateLesion.pending, (state) => {
            state.loading = true
        }),
        builder.addCase(moderateLesion.fulfilled, (state, {payload}) => {
            const help = state.decays.find((el) => el.decay_id === payload.decay_id)
            help!.status = statusFormat(payload.status!)
            help!.date_of_finish = dateFormat(payload.date_of_finish!)
            help!.moderator = payload.moderator
            state.loading = false
        }),
        builder.addCase(moderateLesion.rejected, (state) => {
            state.loading = false
        }),
        builder.addCase(rejectLesion.pending, (state) => {
            state.loading = true
        }),
        builder.addCase(rejectLesion.fulfilled, (state, {payload}) => {
            const help = state.decays.find((el) => el.decay_id === payload.decay_id)
            help!.status = statusFormat(payload.status!)
            help!.date_of_finish = dateFormat(payload.date_of_finish!)
            help!.moderator = payload.moderator
            state.loading = false
        }),
        builder.addCase(rejectLesion.rejected, (state) => {
            state.loading = false
        })
    }
})

export const useLesions = () => useSelector((state: RootState) => state.decays.decays)
export const useStartDate = () => useSelector((state: RootState) => state.decays.start_date)
export const useEndDate = () => useSelector((state: RootState) => state.decays.end_date)
export const useStatus = () => useSelector((state: RootState) => state.decays.status)
export const useLesionsLoading = () => useSelector((state: RootState) => state.decays.loading)
export const useLesionsEmail = () => useSelector((state: RootState) => state.decays.email)

export const {
    setFilterStartDate: setFilterStartDateAction,
    setFilterEndDate: setFilterEndDateAction,
    setFilterStatus: setFilterStatusAction,
    resetFilters: resetFiltersAction,
    setLesionsEmail: setLesionsEmailAction
} = decaysSlice.actions

export default decaysSlice.reducer