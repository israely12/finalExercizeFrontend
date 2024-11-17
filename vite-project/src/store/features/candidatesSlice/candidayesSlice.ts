import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import { Candidate } from '../../../types/Candidate'
import axios from 'axios'

const BASE_URL = "http://localhost:5000/api/candidates/";

interface CandidateState {
    candidates: Candidate[]
    status: 'idle' | 'loading' | 'succeeded'| 'failed'
    error: string | null
    }  

const initialState: CandidateState = {
    candidates: [],
    status: 'idle',
    error: null
}

export const fetchCandidates = createAsyncThunk('candidates/fetchCandidates', async () : Promise<Candidate[] | undefined> => {
    const response = await axios.get(BASE_URL);
    return response.data;
});

export const addVote = createAsyncThunk('candidates/addVote', async (id:string) => {
    
    const response = await axios.put(`${BASE_URL}votes/${id}`,null,{headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }});
      
    return response.data;
    
})

export const removeVote = createAsyncThunk('candidates/removeVote', async (id:string) => {
    const response = await axios.put(`${BASE_URL}unvotes/${id}`,null,{headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }});
    return response.data;
    
})



export const candidatesSlice = createSlice({
    name: 'candidates',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchCandidates.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(fetchCandidates.fulfilled, (state, action) => {
            if(action.payload) 
            state.candidates = action.payload;
            state.status = 'succeeded';
            
        })
        .addCase(fetchCandidates.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message ?? 'Unknown error';
        })
        .addCase(addVote.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(addVote.fulfilled, (state, action) => {
            state.status = 'succeeded';
            const candidate = state.candidates.find((candidate) => candidate._id === action.payload.id);
            if (candidate) {
            candidate.votes += 1;
            }
                
        
        })
        .addCase(addVote.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message ?? 'Unknown error';
        })
        .addCase(removeVote.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(removeVote.fulfilled, (state, action) => {
            state.status = 'succeeded';
            const candidate = state.candidates.find((candidate) => candidate._id === action.payload.id);
            if (candidate) {
            candidate.votes -= 1;
            }
        })
        .addCase(removeVote.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message ?? 'Unknown error';
        })

        
    },
} 

)
 export default candidatesSlice.reducer
