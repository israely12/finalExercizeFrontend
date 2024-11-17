import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { Candidate } from "../../types/Candidate";
import { fetchCandidates } from "../../store/features/candidatesSlice/candidayesSlice";
import { ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import styles from "./votesChartComp.module.css";

const VotesChart: React.FC = () => {
    const dispatch = useDispatch<ThunkDispatch<RootState, unknown, UnknownAction>>();

    useEffect(() => {
        dispatch(fetchCandidates());
    }, [dispatch]);

    // Retrieve candidates data from the Redux store
    const candidates: Candidate[] = useSelector((state: RootState) => state.candidates.candidates);
    const status = useSelector((state: RootState) => state.candidates.status);
    const error = useSelector((state: RootState) => state.candidates.error);

    // Prepare data for the chart by mapping over candidates and extracting necessary properties
    const chartData = candidates.map(candidate => ({
        name: candidate.name,
        votes: candidate.votes,
    }));

    return (
        <div className={styles.chartContainer}>
            {status === 'loading' && <p className={styles.loadingText}>Loading...</p>}
            {error && <p className={styles.errorText}>Error: {error}</p>}
            <ResponsiveContainer width="100%" height={400}>
                <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="votes" fill="#8884d8" barSize={40} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default VotesChart;
