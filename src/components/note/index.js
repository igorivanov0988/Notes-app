import React, { Component } from "react";
import {Colors} from "../../config/colors";
import { v4 as uuidv4 } from 'uuid';
import {defaultLabel} from "../../config/defaultLabel";

import Select from "react-select";

import "./styles.css";

class Note extends Component {
    state = {
        id: this.props.editNote.id,
        headerEdit: this.props.editNote.nameNote,
        nameNote: this.props.editNote.nameNote,
        textNote: this.props.editNote.textNote,
        selectColor: null,
        categoryName: this.props.editNote.categoryName,
        selectCategory: null,
        selectLabel: null,
        labelName: this.props.editNote.labelName,
        isShowCategory: false,
        isShowLabel: false,
    }

    onChangeInput = (key, event) => {
        this.setState({[key]: event.target.value});
    }

    onChangeSelect = (key, value) => {
        this.setState({[key]: value})
    }

    onChangeSelectLabel = (item) => {
        this.setState({selectLabel: item})
    }

    saveNewCategory = () => {
        const {categoryName} = this.state
        const {createNewCategory} =this.props
        if (!categoryName) {
            this.setState({isShowCategory: true})
        } else {
            createNewCategory(categoryName)
            this.setState({categoryName: ''})
        }
    }

    saveNewLabel = () => {
        const {labelName} = this.state
        const {createNewLabel} =this.props
        if (!labelName) {
            this.setState({isShowLabel: true})
        } else {
            createNewLabel(labelName)
            this.setState({labelName: ''})
        }
    }

    validNewNote = () => {
        const {
            nameNote,
            textNote,
            selectColor,
            selectCategory,
            selectLabel
        } = this.state
        if (!(nameNote, textNote, selectColor, selectCategory, selectLabel)) {
            alert('Please fill in all fields')
        } else {
            this.saveNewNote()
        }
    }

    saveNewNote = () => {
        const {
            nameNote,
            textNote,
            selectColor,
            selectCategory,
            selectLabel
        } = this.state
        const {saveNote} = this.props
        saveNote({
            id: uuidv4(),
            nameNote,
            textNote,
            selectColor: selectColor.value,
            selectCategory: selectCategory.value,
            selectLabel: selectLabel})
        this.setState({
            nameNote: '',
            textNote: '',
            selectColor: null,
            selectCategory: null,
            selectLabel: null})
    }

    validEditNote = () => {
        const {
            nameNote,
            textNote,
            selectColor,
            selectCategory,
            selectLabel
        } = this.state
        if (!(nameNote, textNote, selectColor, selectCategory, selectLabel)) {
            alert('Please fill in all fields')
        } else {
            this.saveEditNote()
        }
    }

    saveEditNote = () => {
        const {
            id,
            nameNote,
            textNote,
            selectColor,
            selectCategory,
            selectLabel
        } = this.state
        const {changeNote} = this.props
        changeNote({
            id,
            nameNote,
            textNote,
            selectColor: selectColor.value,
            selectCategory: selectCategory.value,
            selectLabel: selectLabel})
        this.setState({
            headerEdit: '',
            nameNote: '',
            textNote: '',
            selectColor: null,
            selectCategory: null,
            selectLabel: null})
    }


    render() {
        const {listCategory=[], listLabels=[]} = this.props
        const label = [...defaultLabel, ...listLabels]
        const {
            headerEdit,
            nameNote,
            textNote,
            selectCategory,
            selectLabel,
            selectColor,
            isShowCategory,
            isShowLabel} = this.state
        return(
            <div className='noteContainer'>
                <div>
                    <h2>{headerEdit || 'Create a New Note'}</h2>
                </div>
                <div>
                    <div>
                        <input className='inputNameNote'
                               placeholder='Name note'
                               value={nameNote}
                               onChange={(event) =>
                                   this.onChangeInput('nameNote', event)}/>
                    </div>
                    <div className="textareaContainer">
                        <textarea className="textarea"
                                  placeholder='Text note'
                                  value={textNote}
                                  name={textNote}
                                  onChange={(event) =>
                                      this.onChangeInput('textNote', event)}/>
                    </div>
                    <div>
                        <Select placeholder='Select note color'
                                value={selectColor}
                                options={Colors}
                                onChange={(item) => this.onChangeSelect('selectColor', item)}/>
                    </div>
                </div>
                <div className='mainCategoryContainer'>
                    <div className='categoryContainer'>
                        <div>
                            <input className='inputCategory'
                                   placeholder='Enter new category name'
                                   value={this.state.categoryName}
                                   onChange={(event) =>
                                this.onChangeInput('categoryName', event)}/>
                            {isShowCategory ? (
                                <div>Enter category note</div>
                                ) : (null)
                            }
                        </div>
                        <div className='buttonContainer'>
                            <button className='buttonCreate'
                                    onClick={this.saveNewCategory}>Create new category</button>
                        </div>
                    </div>
                    <div className='categorySelectContainer'>
                        <Select placeholder='Chose category'
                                value={selectCategory}
                                options={listCategory.map(item=> ({ value: item, label: item }))}
                                onChange={(item) => this.onChangeSelect('selectCategory', item)}/>
                    </div>
                </div>
                <div className='mainLabelContainer'>
                    <div className='labelContainer'>
                        <div>
                            <input className='inputLabel'
                                   placeholder='Enter new label name'
                                   value={this.state.labelName}
                                   onChange={(event) =>
                                this.onChangeInput('labelName', event)}/>
                            {isShowLabel ? (
                                <div>Enter label note</div>
                            ) : (null)
                            }
                        </div>
                        <div className='buttonContainer'>
                            <button className='buttonCreate'
                                    onClick={this.saveNewLabel}>Create new label</button>
                        </div>
                    </div>
                    <div className='labelSelectContainer'>
                        <Select placeholder='Chose label'
                                value={selectLabel}
                                isMulti
                                options={label.map(item=> ({ value: item, label: item }))}
                                onChange={(item) => this.onChangeSelectLabel(item)}/>
                    </div>
                </div>
                <div className="buttonNoteContainer">
                    <div>
                        <button className="buttonSave"
                                onClick={this.validNewNote}>
                            <text className="buttonTextNote">Save New Note</text>
                        </button>
                    </div>
                    <div>
                        <button className="buttonSave"
                                onClick={this.validEditNote}>
                            <text className="buttonTextNote">Save Edit Note</text>
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Note;