import React, {useCallback, useEffect, useState} from "react";
import styles from './styles.module.css'
import WordCloud from "../WordCloud/WordCloud";
import WordPasteField from "../WordPasteField/WordPasteField";
import sentenceSet from "../../sentenceSet";
import {useDrop} from "react-dnd";
import {ItemTypes} from "../../itemTypes";
import update from "immutability-helper";

function getArrayOfWords(indexOfSentenceSet: number) {
    const sentence = sentenceSet.get(Array.from(sentenceSet.keys())[indexOfSentenceSet]);
    return sentence.replace(',', '')
        .split(' ')
        .map((text: string, index: number) =>
            ({
                text: text,
                id: index
            })
        );
}

function DragAndDropContainer() {
    const initialWords = getArrayOfWords(0);
    const [wordsInCloud, setWordsInCloud] = useState(initialWords);
    // const [wordsInPasteField, setWordsInPasteField] = useState([]);

    return (
        <div className={styles.dragAndDropContainer}>
            <WordPasteField words={[]}/>
            <WordCloud words={wordsInCloud} setWordsInCloud={setWordsInCloud}/>
        </div>
    )
}

export default DragAndDropContainer