import React, {Component} from "react";
import './App.css';

import Header from "./components/header";
import Note from "./components/note";
import List from "./components/list";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showNote: false,
            editNote: {},
            categories: JSON.parse(localStorage.getItem('categories')) || [],
            labels: JSON.parse(localStorage.getItem('labels')) || [],
            notes: JSON.parse(localStorage.getItem('notes')) || [],
        };
    }

    toggleNote = () => {
        this.setState({
            showNote: ! this.state.showNote,
            editNote: {},
        })
    }

    toggleEditNote = () => {
        this.setState({
            showNote: ! this.state.showNote,
        })
    }

    createNewCategory = (category) => {
        const {categories} = this.state
        this.setState({categories: [...categories, category]})
        localStorage.setItem('categories', JSON.stringify([...categories, category]))
    }

    createNewLabel = (label) => {
        const {labels} = this.state
        this.setState({labels: [...labels, label]})
        localStorage.setItem('labels', JSON.stringify([...labels, label]))
    }

    saveNote = (note) => {
        const {notes} = this.state
        this.setState({notes: [...notes, note]})
        localStorage.setItem('notes', JSON.stringify([...notes, note]))
        this.toggleNote()
    }

    editNote = (note) => {
        this.setState({editNote: note})
        this.toggleEditNote()
    }

    deleteNote = (id) => {
        const  {notes} = this.state
        let delNote = notes.filter((note) => note.id !== id)
        this.setState(() => ({notes: delNote}))
        localStorage.setItem('notes', JSON.stringify([...delNote]))
    }

    changeNote = (note) => {
        const  {notes} = this.state
        let searchNote = notes.findIndex(elem => elem.id === note.id)
        notes[searchNote] = note
        localStorage.setItem('notes', JSON.stringify([...notes]))
        this.toggleNote()
    }

    render(){
        const { showNote, notes, categories, labels, editNote } = this.state;
        return (
        <div className="App">
            <div>
                <Header toggleNote={this.toggleNote} showNote={showNote}/>
            </div>
            <div>
                { showNote ?
                    <Note
                        createNewCategory={this.createNewCategory}
                        listCategory={categories}
                        editNote={editNote}
                        createNewLabel={this.createNewLabel}
                        listLabels={labels}
                        saveNote={this.saveNote}
                        changeNote={this.changeNote}
                    />
                    :
                    <List
                        notes={notes}
                        editNote={this.editNote}
                        deleteNote={this.deleteNote}
                    />  }
            </div>

       </div>
  );
}}

export default App;
