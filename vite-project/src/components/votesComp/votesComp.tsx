import React, { useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { Candidate } from "../../types/Candidate";
import { fetchCandidates } from "../../store/features/candidatesSlice/candidayesSlice";
import { ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";
import { CandidateCard } from "../candidateCardComp/candidateCardComp";
import styles from "./votesComp.module.css";
import {io} from "socket.io-client";

const socket = io("http://localhost:5000");
export const Candidates: React.FC = () => {
    const dispatch = useDispatch<ThunkDispatch<RootState, unknown, UnknownAction>>();

    useEffect(() => {
        socket.on("voteUpdated", () => {
            dispatch(fetchCandidates());
        })

        socket.on("voteRemoved", () => {
            dispatch(fetchCandidates());
        })

        dispatch(fetchCandidates());
        return () => {
            socket.off("voteUpdated");
            socket.off("voteRemoved");
        }
    }, [dispatch]); 

    const candidates: Candidate[] = useSelector((state: RootState) => state.candidates.candidates);
    const status = useSelector((state: RootState) => state.candidates.status);
    const error = useSelector((state: RootState) => state.candidates.error);

    return (
        <div className={styles.candidatesContainer}>
            {/* {status === 'loading' && <p className={styles.loadingText}>Loading...</p>} */}
            {/* {error && <p className={styles.errorText}>Error: {error}</p>} */}
            {candidates.map((candidate,aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa) => (
                <CandidateCard key={candidate._id} candidate={candidate} />
            ))}
        </div>
    );
}


export default Candidates