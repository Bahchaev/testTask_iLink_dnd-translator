import React from "react";
import styles from './styles.module.css'


interface WordProps {
    text: string
}

function Word(
    {
        text
    }: WordProps
) {

    return (
        <div className={styles.wrapper}>
            <div className={styles.word}>{text}</div>
        </div>

    )
}

export default Word