import { Candidate } from "../../types/Candidate";
import React from "react";
import { useDispatch } from "react-redux";
import { addVote, removeVote } from "../../store/features/candidatesSlice/candidayesSlice";
import { AppDispatch } from "../../store/store";
import styles from "./candidateCardComp.module.css"
export const CandidateCard: React.FC<{ candidate: Candidate }> = ({ candidate }) => {
    const dispatch = useDispatch<AppDispatch>();

    const handleVote = () => {
        dispatch(addVote(candidate._id));
        
    };

    const handleRemoveVote = () => {
        dispatch(removeVote(candidate._id));
    };

    return (
        <div className={styles["candidate-card"]}>
            <img className={styles["candidate-card-image"]} src={candidate.image} alt={candidate.name} />
            <h3 className={styles["candidate-card-name"]}>{candidate.name}</h3>
            <p>Votes: {candidate.votes}</p>
            <button className={styles["candidate-card-button"]} onClick={handleVote}>Vote</button>
            <br />
            <br />
            <button className={styles["candidate-card-button"]} onClick={handleRemoveVote}>Remove Vote</button>
        </div>
    );
};

export default CandidateCard;
