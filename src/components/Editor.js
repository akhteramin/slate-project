import React, { Component } from 'react';
import TextareaAutosize from 'react-autosize-textarea';
import FlexView from 'react-flexview';
import Title from './Title';
import ContentEditable from "react-contenteditable";
import sanitizeHtml from "sanitize-html";
import Modal from 'react-modal';
Modal.setAppElement('#root');

class Editor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            textData: "",
            editable: true ,
            file:null,
            fileName: '',
            manualModalIsOpen: false,
            
        };
        this.handleSelect = this.handleSelect.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.keyPress = this.keyPress.bind(this);
        this.insertImage = this.insertImage.bind(this);
        this.onChange = this.onChange.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.openModal = this.openModal.bind(this);
        this.uploadImage = this.uploadImage.bind(this);
    }

    openModal() {
        // console.log("hey there")
        this.setState({manualModalIsOpen: true});
    }

    afterOpenModal() {
        // references are now sync'd and can be accessed.
        this.subtitle.style.color = '#00cdb8';
    }
    closeModal() {
        // console.log("hey there")
        this.setState({manualModalIsOpen: false});
    }
    handleChange (evt) {
        
        this.setState({ textData: evt.target.value });
    };

    onChange(e) {
        this.setState({
            file:e.target.files[0],
            fileName: e.target.files[0].name
        })
        console.log("height::",e.target.files[0])        
    }

    getBase64 = (file) => {
        return new Promise((resolve,reject) => {
           const reader = new FileReader();
           reader.onload = () => resolve(reader.result);
           reader.onerror = error => reject(error);
           reader.readAsDataURL(file);
        });
    }

    uploadImage(){
        console.log("files::",this.state.file, this.state.fileName)
        this.getBase64(this.state.file).then(base64 => {
            localStorage.setItem('fileBase64', base64);
            console.debug("file stored",base64);
        });
        this.setState(
            { 
                textData: this.state.textData+"<div><img height='100' width='100' src='"+localStorage.getItem('fileBase64')+"'></div>" 
            }
        );

        this.closeModal();
    }
  

    keyPress(e){
        console.log(e.keyCode)
        if(e.keyCode == 9 && e.shiftKey) {
            // document.execCommand ( 'styleWithCSS', true, null )
            e.preventDefault()
            document.execCommand ( 'outdent', true, null )
            
        }
        else if(e.keyCode == 9) {
            console.log("key", e.keyCode)
            // document.execCommand ( 'styleWithCSS', true, null )
            e.preventDefault()
            document.execCommand ( 'indent', true, null )
           
        }
        
     }

    sanitizeConf = {
        allowedTags: [ 'h3', 'h4', 'h5', 'h6', 'blockquote', 'p', 'a', 'ul', 'ol',
            'nl', 'li', 'b', 'i', 'strong', 'em', 'strike', 'code', 'hr', 'br', 'div',
            'table', 'thead', 'caption', 'tbody', 'tr', 'th', 'td', 'pre' ],
        allowedAttributes: {
        a: [ 'href', 'name', 'target' ],
        // We don't currently allow img itself by default, but this
        // would make sense if we did
        img: [ 'src' ]
        },
        // Lots of these won't come up by default because we don't allow them
        selfClosing: [ 'img', 'br', 'hr', 'area', 'base', 'basefont', 'input', 'link', 'meta' ],
        // URL schemes we permit
        allowedSchemes: [ 'http', 'https', 'ftp', 'mailto' ],
        allowedSchemesByTag: {}
    };

    sanitize = () => {
        this.setState({ textData: sanitizeHtml(this.state.textData, this.sanitizeConf) });
    };
    
    toggleEditable = () => {
    this.setState({ editable: !this.state.editable });
    };

    handleSelect(){
        var txtArea = document.getElementById("textArea");
             var selectedText;   
             if (txtArea.selectionStart != undefined)
               {    
                   var startPosition = txtArea.selectionStart;
                   var endPosition = txtArea.selectionEnd;
                   selectedText = txtArea.value.substring(startPosition, endPosition);
                }
             console.log("You selected :" + selectedText);
             this.setState({textData:this.state.textData})

    }
    handleSubmit(event,type) {
        event.preventDefault();
        if(type===1)
        {
            console.log(this.state.textData);
            localStorage.setItem('current', this.state.textData);
            if(localStorage.getItem('previous')==='')
            {
                localStorage.setItem('previous', localStorage.getItem('current'));
            }
            // let serviceList = JSON.parse(localStorage.getItem('permissionList'));
        }
        else{
            localStorage.setItem('current', localStorage.getItem('previous'));
            localStorage.setItem('previous', this.state.textData);
            this.setState({
                textData: localStorage.getItem('current')
            })
        }
    }
    insertImage(){
        var image = prompt("Please give image Url", "hello");

        if (image != null) {
            console.log(image)
            this.setState({ textData: this.state.textData+"<div><img height='100' width='100' src='"+image+"'></div>" });
        }
    }
    componentDidMount(){
        localStorage.setItem('current', "");
        localStorage.setItem('previous', "");

    }
    render() {
        const {textData} = this.state;
        const buttonPadding = {
            margin: '10px'
        };
        const customStyles = {
            content : {
                top                   : '50%',
                left                  : '50%',
                right                 : '20%',
                bottom                : '10%',
                marginRight           : '-50%',
                transform             : 'translate(-50%, -50%)'
            }
        };
        return (
            <div>
                <Title value="Slate Editor"/>
                <div className="col-md-8">
                    <FlexView
                    style={{ backgroundColor: '#FFFFFF',margin:'auto',marginBottom:'2px', padding:'20px' }}
                    >
                        
                        <div className="css-548ii2">
                            <span className="css-14pl7gn">
                                <EditSpan cmd="bold" name="format_bold"/>
                            </span>
                            <span className="css-14pl7gn">
                                <EditSpan cmd="italic" name="format_italic"/>
                            </span>
                            <span className="css-14pl7gn">
                                <EditSpan cmd="underline" name="format_underlined"/>
                            </span>

                            <span className="css-14pl7gn">
                                <EditSpan cmd="insertOrderedList" name="format_list_numbered"/>
                            </span>
                            
                            <span className="css-14pl7gn">
                                <EditSpan cmd="insertUnorderedList" name="format_list_bulleted"/>
                            </span>

                            <span className="css-14pl7gn">
                                <EditSpan cmd="decreaseFontSize" name="looks_one"/>
                            </span>
                            <span className="css-14pl7gn">
                                <EditSpan cmd="increaseFontSize" name="looks_two"/>
                            </span>
                            
                            <span className="css-14pl7gn">
                                <EditSpan cmd="formatBlock" name="code" arg="code"/>
                    
                            </span>
                            
                            <span className="css-14pl7gn">
                                <EditSpan cmd="formatBlock" name="format_quote" arg=""/>
                            </span>

                            <span className="css-14pl7gn" onClick={ (e) => this.insertImage()}>
                                <InsertImage  cmd="image" name="image"/>
                            </span>
                            <span className="css-14pl7gn" onClick={ (e) => this.openModal()}>
                            
                                <EditSpan cmd="image" name="image"/>
                            </span>

                            <Modal
                                    isOpen={this.state.manualModalIsOpen}
                                    onAfterOpen={this.afterOpenModal}
                                    onRequestClose={this.closeModal}
                                    style={customStyles}
                                    contentLabel="Send Manual Offer"
                                >
                                    <div className="text-center col-md-3">
                                        <h2 ref={subtitle => this.subtitle = subtitle}>Please select image</h2>

                                        <div className="input-group">
                                            <label className="input-group-btn">
                                                <span className="btn btn-primary">
                                                    Select Image File&hellip; <input type="file" onChange={this.onChange} style={ {display: 'None'}} />
                                                </span>
                                            </label>
                                            <input type="text" value={this.state.fileName} className="form-control" readOnly/>
                                        </div>

                                        
                                        <button id="offerManualTrue"  type="button" style={buttonPadding} onClick={this.uploadImage}
                                            className="btn btn-success">Upload
                                        </button>
                                        <button id="offerManualFalse" type="button" onClick={this.closeModal}
                                            className="btn btn-danger">Cancel
                                        </button>
                                    </div>
                                </Modal>
        
                        </div>
                    </FlexView>
                    
       
                    
                    <ContentEditable
                        className="editable"
                        tagName="pre"
                        html={this.state.textData} // innerHTML of the editable div
                        disabled={!this.state.editable} // use true to disable edition
                        onChange={this.handleChange} // handle innerHTML change
                        onBlur={this.sanitize}
                        onKeyDown={this.keyPress}
                    />
                    <div className="col-md-3 col-md-offset-3">
                        <button id="offer" type="button"
                            onClick={ (e) =>  this.handleSubmit(e,1) }
                            className="btn btn-primary"
                            style={{  margin:'2px' }}>Save
                            
                        </button>
                        <button id="offer" type="button"
                            onClick={ (e) =>  this.handleSubmit(e,2) }
                            className="btn btn-danger">Cancel
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

function EditSpan(props) {
    return (
      <span
        className="material-icons css-1846rz1"
        key={props.cmd}
        onMouseDown={evt => {
          evt.preventDefault(); // Avoids loosing focus from the editable area
          document.execCommand(props.cmd, false, props.arg); // Send the command to the browser
        }}
      >
        {props.name || props.cmd}
      </span>
    );
  }

  function InsertImage(props){
    return (
        <span
          className="material-icons css-1846rz1"
        >
          {props.name}
        </span>
      );
  }
  
export default Editor;
