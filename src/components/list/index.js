import React, { Component } from 'react';

import NoteCard from '../noteCard';

import "./styles.css";

class List extends Component {
    render() {
        const { notes, editNote, deleteNote } = this.props;
        const cards = notes.map((note, index) => {
            return (
                <NoteCard
                    key={index}
                    index={index}
                    note={note}
                    editNote={editNote}
                    deleteNote={deleteNote}
                />
            );
        });
        const sortCard = cards.sort((item1, item2) =>
            item1.props.note.selectCategory > item2.props.note.selectCategory ? 1 : -1)
        return (
            <div className="card_container">
                {sortCard}
            </div>
        );
    }
}

export default List;