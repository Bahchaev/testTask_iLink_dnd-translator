import React from "react";
import styles from './styles.module.css'

interface buttonProps {
    text: string
}

function Button(
    {
        text
    }: buttonProps
) {
    return (
        <button className={styles.button}>{text}</button>
    )
}

export default Button