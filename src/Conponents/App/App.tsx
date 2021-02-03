import React from 'react';
import Header from "../Header/header";
// @ts-ignore
import TaskField from "../TaskField/taskField";
import DragAndDropContainer from "../DragAndDropContainer/DragAndDropContainer";
import styles from './styles.module.css'
import sentenceSet from '../../sentenceSet'

function App() {

    const taskText = Array.from(sentenceSet.keys())[0];

    return (
        <div className={styles.appContainer}>
            <Header text={'Translate this sentence'}/>
            <TaskField text={taskText}/>
            <DragAndDropContainer/>
        </div>
    );
}

export default App;
