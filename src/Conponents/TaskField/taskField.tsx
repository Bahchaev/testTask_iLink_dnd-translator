import React from "react";
import styles from './styles.module.css'
import personIcon from '../../Images/personIcon.png'

interface TaskFieldProps {
    text: string
}

function TaskField(
    {
        text
    }: TaskFieldProps
) {

    return (
        <div className={styles.container}>
            <img src={personIcon} alt="icon" className={styles.personIcon}/>
            <div className={styles.speechContainer}>
                <div className={styles.speechTriangle}/>
                <div className={styles.speech}>{text}</div>
            </div>
        </div>
    )
}

export default TaskField