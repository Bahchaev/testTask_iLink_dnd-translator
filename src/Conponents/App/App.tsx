import React from 'react';
import Header from "../Header/header";
// @ts-ignore
import TaskField from "../TaskField/taskField";
import DragAndDropContainer from "../DragAndDropContainer/DragAndDropContainer";
import styles from './styles.module.css'
import sentenceSet from '../../sentenceSet'
// @ts-ignore
import Button from "../Button/Button";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";

function App() {

    const taskText = Array.from(sentenceSet.keys())[0];

    return (
        <div className={styles.appContainer}>
            <Header text={'Translate this sentence'}/>
            <TaskField text={taskText}/>
            <DndProvider backend={HTML5Backend}>
                <DragAndDropContainer/>
            </DndProvider>
            <Button text={'Check'}/>
        </div>
    );
}

export default App;
