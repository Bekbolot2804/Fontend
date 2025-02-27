import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { api } from "../api/index"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../store";
import mockHelps from '../modules/Mock'
import { set } from "date-fns";

interface helpState {
    help: {
        help_id?: number,
        name: string,
        description: string,
        status: "1" | "0",
        img_url?: string | null,
        duration: number,
        attributes?: {attribute?: {
            attribute_id?: number,
            name?: string
        },
            value?: string | null
        }[]
    },
    attribute_name?: string | null,
    attribute_value?: string | null,
    loading: boolean
}

const initialState: helpState = {
    help: {
        help_id: 0,
        name: '',
        description: '',
        status: '0',
        img_url: '',
        duration: 0
    },
    loading: false
}

export const getHelpWithId = createAsyncThunk(
    'help/getHelpWithId',
    async (helpId: string, { dispatch, rejectWithValue }) => {
        try {
            const response = await api.helps.helpsRead(helpId)
            dispatch(getHelpAttributes(helpId))
            return response.data
        } catch (error: any) {
            const help = mockHelps.helps.find((el) => el.help_id.toString() === helpId)
            dispatch(setHelpContentAction(help))
            return rejectWithValue("Произошла ошибка")
        }
    }
)

export const editHelp = createAsyncThunk(
    'help/editHelp',
    async (helpId: string, {getState, rejectWithValue}) => {
        const state = getState() as RootState
        try {
            const response = await api.helps.helpsUpdate(helpId, state.help.help!)
            return response.data
        } catch (error: any) {
            return rejectWithValue("Произошла ошибка")
        }
    }
)

export const saveHelpImage = createAsyncThunk(
    'help/saveHelpImage',
    async (credentials: {helpId: string, file: File}, {rejectWithValue}) => {
        try {
            const response = await api.helps.helpsAddImgCreate(credentials.helpId, {'img': credentials.file})
            return response.data
        } catch (error: any) {
            return rejectWithValue("Произошла ошибка")
        }
    }
)

export const deleteHelp = createAsyncThunk(
    'help/deleteHelp',
    async (helpId: string, {rejectWithValue}) => {
        try {
            const response = await api.helps.helpsDelete(helpId)
            return response.data
        } catch (error: any) {
            return rejectWithValue("Произошла ошибка")
        }
    }
)

export const createHelp = createAsyncThunk(
    'help/createHelp',
    async (_, {getState, rejectWithValue}) => {
        const state = getState() as RootState
        try {
            const response = await api.helps.helpsCreate(state.help.help)
            return response.data
        } catch (error: any) {
            return rejectWithValue("Произошла ошибка")
        }
    }
)

export const getHelpAttributes = createAsyncThunk(
    'help/getHelpAttributes',
    async (helpId: string, {rejectWithValue}) => {
        try {
            const response = await api.attribute.attributeRead(helpId)
            return response.data
        } catch (error: any) {
            return rejectWithValue("Произошла ошибка")
        }
    }
)

export const editHelpAttribute = createAsyncThunk(
    'help/editHelpAttribute',
    async (credentials: {helpId: number, attributeId: number}, { getState, rejectWithValue}) => {
        const state = getState() as RootState
        try {
            const response = await api.attribute.attributeUpdate(credentials.helpId.toString(), 
                                                                 credentials.attributeId.toString(), 
                                                                 {value: state.help.help.attributes?.find(
                                                                    (el) => el.attribute?.attribute_id === credentials.attributeId)?.value!})
            return response.data
        } catch (error: any) {
            return rejectWithValue("Произошла ошибка")
        }
    }
)

export const deleteHelpAttribute = createAsyncThunk(
    'help/deleteHelpAttribute',
    async (credentials: {helpId: number, attributeId: number}, {rejectWithValue}) => {
        try {
            const response = await api.attribute.attributeDelete(credentials.helpId.toString(), 
                                                                 credentials.attributeId.toString())
            return response.data
        } catch (error: any) {
            return rejectWithValue("Произошла ошибка")
        }
    }
)

export const addHelpAttribute = createAsyncThunk(
    'help/addHelpAttribute',
    async (helpId: string, {getState, rejectWithValue}) => {
        const state = getState() as RootState
        try {
            const response = await api.attribute.attributeCreate(helpId, 
                                                                {name: state.help.attribute_name!, 
                                                                 value: state.help.attribute_value!})
            return response.data
        } catch (error: any) {
            return rejectWithValue("Произошла ошибка")
        }
    }
)


const helpSlice = createSlice({
    name: 'help',
    initialState,
    reducers: {
        setHelpContent(state, {payload}) {
            state.help = payload
        },
        setHelpInitialState(state) {
            state.help = initialState.help
        },
        setHelpName(state, {payload}) {
            state.help.name = payload
        },
        setHelpDescription(state, {payload}) {
            state.help.description = payload
        },
        setHelpStatus(state, {payload}) {
            state.help.status = payload
        },
        setHelpDuration(state, {payload}) {
            state.help.duration = payload
        },
        setHelpAttributeValue(state, {payload}) {
            const attribute = state.help.attributes?.find((el) => el.attribute?.attribute_id === payload.attribute_id)
            attribute!.value = payload.value
        },
        setHelpAttributeAddName(state, {payload}) {
            state.attribute_name = payload
        },
        setHelpAttributeAddValue(state, {payload}) {
            state.attribute_value = payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getHelpWithId.pending, (state) => {
            state.loading = true
        }),
        builder.addCase(getHelpWithId.fulfilled, (state, {payload}) => {
            state.loading = false
            state.help = payload!
        }),
        builder.addCase(getHelpWithId.rejected, (state) => {
            state.loading = false
        }),
        builder.addCase(getHelpAttributes.fulfilled, (state, {payload}) => {
            state.help.attributes = payload?.attributes || []
        }),
        builder.addCase(deleteHelpAttribute.fulfilled, (state, {payload}) => {
            state.help.attributes = state.help.attributes?.filter((el) => el.attribute?.attribute_id !== payload.id)
        }),
        builder.addCase(addHelpAttribute.fulfilled, (state, {payload}) => {
            state.attribute_name = ''
            state.attribute_value = ''
            const attribute = state.help.attributes?.find((el) => el.attribute?.attribute_id === payload.attribute?.attribute_id)
            if (attribute){
                attribute.value = payload.value
            } else {
                state.help.attributes = state.help.attributes ? [...state.help.attributes, payload] : [payload]
            }
        })
    }
})

export const useHelp = () => useSelector((state: RootState) => state.help.help)
export const useHelpLoading = () => useSelector((state: RootState) => state.help.loading)
export const useHelpAttributeName = () => useSelector((state: RootState) => state.help.attribute_name)
export const useHelpAttributeValue = () => useSelector((state: RootState) => state.help.attribute_value)

export const {
    setHelpContent: setHelpContentAction,
    setHelpInitialState: setHelpInitialStateAction,
    setHelpName: setHelpNameAction,
    setHelpDescription: setHelpDescriptionAction,
    setHelpStatus: setHelpStatusAction,
    setHelpDuration: setHelpDurationAction,
    setHelpAttributeValue: setHelpAttributeValueAction,
    setHelpAttributeAddName: setHelpAttributeAddNameAction,
    setHelpAttributeAddValue: setHelpAttributeAddValueAction
} = helpSlice.actions

export default helpSlice.reducer