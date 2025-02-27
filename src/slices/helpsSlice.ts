import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { api } from "../api/index";
import mockHelps from "../modules/Mock";
import { setLesionInfAction } from "./userSlice";

interface HelpInf {
    help_id: number,
    name: string,
    description: string,
    status: string,
    img_url: string,
    duration: number
}

interface helpsState {
    helps: HelpInf[],
    search_name: string,
    loading: boolean,
}

const initialState: helpsState = {
    helps: [],
    search_name: '',
    loading: false,
}

export const getHelpsWithSearch = createAsyncThunk(
    'helps/getHelpsWithSearch',
    async (searchName:string, { dispatch, rejectWithValue }) => {
        try {
            const response = await api.helps.helpsList({
                name: searchName!
            })
            dispatch(setLesionInfAction(response.data.lesion_information))
            return response.data
        }catch (error: any){
            dispatch(setLesionInfAction(mockHelps.lesion_information))
            return rejectWithValue('Ошибка при загрузке данных');
        }
    }
)

export const addHelpToLesion = createAsyncThunk(
    'help/addHelpToLesion',
    async (helpId: string, { dispatch, rejectWithValue }) => {
        try {
            const response = await api.helps.helpsCreate2(helpId)
            dispatch(setLesionInfAction(response.data.lesion_information))
            return response.data
        } catch (error: any) {
            return rejectWithValue("Произошла ошибка")
        }
    }
)

const helpsSlice = createSlice ({
    name: 'helps',
    initialState,
    reducers: {
        setName(state, {payload}) {
            state.search_name = payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getHelpsWithSearch.pending, (state) => {
            state.loading = true
        }),
        builder.addCase(getHelpsWithSearch.fulfilled, (state, {payload}) => {
            state.helps = payload.helps!;
            state.loading = false;
        }),
        builder.addCase(getHelpsWithSearch.rejected, (state) => {
            state.helps = mockHelps.helps.filter((el) => el.duration.toString().includes(state.search_name.toString()))
            state.loading = false;
        })
    }
})

export const useSearchName = () => useSelector((state: RootState) => state.helps.search_name)
export const useHelpsLoading = () => useSelector((state: RootState) => state.helps.loading)
export const useHelps = () => useSelector((state: RootState) => state.helps.helps)

export const {
    setName: setNameAction
} = helpsSlice.actions

export default helpsSlice.reducer