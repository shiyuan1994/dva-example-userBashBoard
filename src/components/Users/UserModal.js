import React from 'react';
import {Modal,Form,Input} from 'antd';

const FormItem=Form.Item;

class UserModal extends React.Component{
    constructor(props){
        super(props);
        this.state={
            visible:false
        }
    }
    showVisiable(){
        this.setState({
            visible:true
        })
    }

    cancelModal(){
        this.setState({
            visible:false
        })
    }

    onHandler(){
        const { createUser } =this.props;
        this.props.form.validateFields( (err,values) =>{
            if(!err){
                createUser(values);
                this.cancelModal();
            }
        })
    }

    render(){
        const {children} =this.props;
        const { getFieldDecorator } =this.props.form;
        const  {name,email,website} =this.props.record; 
        //设置label和输入控件的布局样式
        const formLabelItem={
            labelCol:{ span:6 },
            wrapperCol: { span:14 }
        };
        return(
            <span>
                <span onClick={this.showVisiable }>
                    { children }
                </span>
                <Modal
                    title='Create User'
                    visible={this.state.visible}
                    onOk={this.onHandler}
                    onCancel={this.cancelModal}
                >
                    <Form horizontal >
                        <FormItem
                            label='Name'
                            {...formLabelItem}
                        >
                            {
                                getFieldDecorator('name',{
                                    initialValue:name
                                })(<Input />)
                            }
                        </FormItem>
                        <FormItem
                            label='Email'
                            {...formLabelItem}
                        >
                            {
                                getFieldDecorator('email',{
                                    initialValue:email
                                })(<Input />)
                            }
                        </FormItem>
                        <FormItem
                            label='website'
                            {...formLabelItem}
                        >
                            {
                                getFieldDecorator('website',{
                                    initialValue:website
                                })(<Input />)
                            }
                        </FormItem>
                    </Form>
                </Modal>
            </span>
        );
    }
   
}

export default Form.create()(UserModal);