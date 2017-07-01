import React from 'react';
import { Modal, Button } from 'antd';



class ColTitleModal extends React.Component {
    state = {
        ModalText: "新增列标题：",
        visible: false,
        visibleInput : false,
        ColState: this.props.ColState
    }
    componentWillReceiveProps(nextProps){
        //console.log(nextProps)
        this.setState({
            ColState:nextProps.ColState
        })
    }
    showModal = () => {
        this.setState({
            visible: true,
            visibleInput : true
        });
    }
    

    handleOk = () => {
        this.props.tbaleThChange(this.state.ColState)
        this.setState({
            ModalText: 'The modal will be closed after two seconds',
            confirmLoading: true,
            visibleInput : false
        });
        setTimeout(() => {
            this.setState({
                ModalText: "新增列标题：",
                visible: false,
                confirmLoading: false
            });
        }, 500);
    }
    handleVal = () =>{
        let val = this.refs.emailDom.value;
        return val;
    }
    handleCancel = () => {
        //console.log('Clicked cancel button');
        this.setState({
            visible: false,
        });
    }
    handleChange = (e,index,i) =>{ 
        this.setState({
            ColState: [
                ...this.state.ColState.slice(0, index),
                { ...this.state.ColState[index], name: e.target.value },
                ...this.state.ColState.slice(index + 1)
            ]
        });
    }
    render() {
        const { visible, confirmLoading, ModalText,visibleInput,ColState } = this.state;
        //console.log(ColState)
        return (
            <div>  
                <Button type="primary" onClick={this.showModal}>修改列标题</Button>
                <Modal title="修改列标题"
                    visible={visible}
                    onOk={this.handleOk}
                    confirmLoading={confirmLoading}
                    onCancel={this.handleCancel}
                >
                <p>{ModalText}</p>
                <ul>
                    {
                        ColState.map((i,index)=>{
                            return <li>
                                <i>第{index}列:    </i>
                                <input type="text" key={index} value={i.name}  onChange={(e)=>this.handleChange(e,index,i)}/>
                            </li>
                        })
                    }
                </ul>
                </Modal>
            </div>
        );
    }
}


export default ColTitleModal;