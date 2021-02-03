import React from "react";
import Word from "../Word/Word";
import styles from './styles.module.css'
import sentenceSet from '../../sentenceSet'

function WordCloud() {

    const sentence = sentenceSet.get(Array.from(sentenceSet.keys())[0]);
    const wordsArr = sentence.split(' ');
    const words = wordsArr.map((word:string) =>
        <Word text={word}/>
    );

    return (
        <div className={styles.wordCloud}>
            {words}
        </div>
    )
}

export default WordCloud