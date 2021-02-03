import React from "react";
import styles from './styles.module.css'
import WordCloud from "../WordCloud/WordCloud";
import WordPasteField from "../WordPasteField/WordPasteField";

function DragAndDropContainer() {
    return (
        <div className={styles.dragAndDropContainer}>
            <WordPasteField/>
            <WordCloud/>
        </div>
    )
}

export default DragAndDropContainer