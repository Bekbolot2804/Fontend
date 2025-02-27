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
    period_time_text: string,
    period_time: number,
    atomic_mass: number
}

interface helpsState {
    helps: HelpInf[],
    atomic_mass: string,
    loading: boolean,
}

const initialState: helpsState = {
    helps: [],
    atomic_mass: '',
    loading: false,
}

export const getHelpsWithSearch = createAsyncThunk(
    'helps/getHelpsWithSearch',
    async (atomicMass:string, { dispatch, rejectWithValue }) => {
        try {
            const response = await api.helps.helpsList({
                duration: atomicMass!
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
        setAtomicMass(state, {payload}) {
            state.atomic_mass = payload
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
            state.helps = mockHelps.helps.filter((el) => el.atomic_mass.toString().includes(state.atomic_mass.toString()))
            state.loading = false;
        })
    }
})

export const useAtomicMass = () => useSelector((state: RootState) => state.helps.atomic_mass)
export const useHelpsLoading = () => useSelector((state: RootState) => state.helps.loading)
export const useHelps = () => useSelector((state: RootState) => state.helps.helps)

export const {
    setAtomicMass: setAtomicMassAction
} = helpsSlice.actions

export default helpsSlice.reducer