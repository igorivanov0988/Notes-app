import React, { Component } from 'react';

import "./styles.css";

class NoteCard extends Component {
    render() {
        const {note, editNote, deleteNote} = this.props
        const labels = note.selectLabel
        return(
            <div style={{backgroundColor: note.selectColor}} className="noteCardContainer">
                <div className="noteCardTitle">
                    <div className="titleText">
                        {note.nameNote}
                    </div>
                </div>
                <div className="propertiesContainer">
                    <div>
                        {note.selectCategory}
                    </div>
                    <div>
                        {labels.map(item => item.label)}
                    </div>
                </div>
                <div className="noteCardContent">
                    <div className="textNote">
                        {note.textNote}
                    </div>
                </div>
                <div className="buttonCardContainer">
                    <div>
                        <button className="buttonCard"
                                onClick={() => editNote(note)}>
                            <text className="buttonTextCard">Edit Note</text>
                        </button>
                    </div>
                    <div>
                        <button className="buttonCard"
                                onClick={() => deleteNote(note.id)}>
                            <text className="buttonTextCard">Delete Note</text>
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default NoteCard;