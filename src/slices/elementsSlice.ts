import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { api } from "../api/index";
import mockElements from "../modules/Mock";
import { setDecayInfAction } from "./userSlice";

interface ElementInf {
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
    helps: ElementInf[],
    atomic_mass: string,
    loading: boolean,
}

const initialState: helpsState = {
    helps: [],
    atomic_mass: '',
    loading: false,
}

export const getElementsWithSearch = createAsyncThunk(
    'helps/getElementsWithSearch',
    async (atomicMass:string, { dispatch, rejectWithValue }) => {
        try {
            const response = await api.helps.helpsList({
                duration: atomicMass!
            })
            dispatch(setDecayInfAction(response.data.lesion_information))
            return response.data
        }catch (error: any){
            dispatch(setDecayInfAction(mockElements.lesion_information))
            return rejectWithValue('Ошибка при загрузке данных');
        }
    }
)

export const addElementToDecay = createAsyncThunk(
    'help/addElementToDecay',
    async (helpId: string, { dispatch, rejectWithValue }) => {
        try {
            const response = await api.helps.helpsCreate2(helpId)
            dispatch(setDecayInfAction(response.data.lesion_information))
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
        builder.addCase(getElementsWithSearch.pending, (state) => {
            state.loading = true
        }),
        builder.addCase(getElementsWithSearch.fulfilled, (state, {payload}) => {
            state.helps = payload.helps;
            state.loading = false;
        }),
        builder.addCase(getElementsWithSearch.rejected, (state) => {
            state.helps = mockElements.helps.filter((el) => el.atomic_mass.toString().includes(state.atomic_mass.toString()))
            state.loading = false;
        })
    }
})

export const useAtomicMass = () => useSelector((state: RootState) => state.helps.atomic_mass)
export const useElementsLoading = () => useSelector((state: RootState) => state.helps.loading)
export const useElements = () => useSelector((state: RootState) => state.helps.helps)

export const {
    setAtomicMass: setAtomicMassAction
} = helpsSlice.actions

export default helpsSlice.reducer