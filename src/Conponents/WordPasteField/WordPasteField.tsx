import React from "react";
import styles from './styles.module.css'

function WordPasteField() {
    return (
        <div>
            <div className={styles.line}>Line 1</div>
            <div className={styles.line}>Line 2</div>
            <div className={styles.line}>Line 3</div>
        </div>
    )
}

export default WordPasteField