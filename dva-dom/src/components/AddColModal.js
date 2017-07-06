import React from 'react';
import { Modal, Button } from 'antd';



class AddColModal extends React.Component {
    state = {
        ModalText: "新增列标题：",
        visible: false,
        visibleInput : false
    }
    showModal = () => {
        this.setState({
            visible: true,
            visibleInput : true
        });
    }
    handleOk = () => {
        this.props.AddCol(this.handleVal())
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
        this.setState({
            visible: false,
        });
    }
    render() {
        const { visible, confirmLoading, ModalText,visibleInput } = this.state;
        return (
            <div>  
                <Button type="primary" onClick={this.showModal}>添加列</Button>
                <Modal title="新增列"
                    visible={visible}
                    onOk={this.handleOk}
                    confirmLoading={confirmLoading}
                    onCancel={this.handleCancel}
                >
                    {ModalText}
                    {
                        visibleInput?<input type="text" ref="emailDom" onChange={this.handleVal} />:""
                    }
                </Modal>
            </div>
        );
    }
}


export default AddColModal;