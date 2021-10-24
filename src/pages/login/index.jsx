import React, { Component } from 'react'
import './login.css'
import logo from './images/LOGO.png'
import { Form, Icon, Input, Button,message} from 'antd';  //引入antd

class Login extends Component {
    //登陆的时候执行的回调函数
    handleSubmit = (event) =>{
        event.preventDefault()//阻止事件默认行为(阻止表单自动提交然后跳转到其他页面)
        //对所有的表单验证（如果有一项验证没有通过，就阻止表单提交）
        this.props.form.validateFields((err, values) => {
                //所有表单校验都成功
                if (!err) {
                console.log('提交登陆的ajax请求', values);
                message.success('登陆成功,即将跳转');
                }else{
                    message.error('请输入用户名及密码');
                }
            });

        const form = this.props.form //得到form对象用来获取用户输入数据
        const values = form.getFieldsValue() //获取表单项的输入数据  调用form中的getFieldsValue方法
        console.log('handleSubmit()',values)
    }

    render() {
        const form = this.props.form //从高阶组件中传递给子组件Login的props的form属性解构
        const { getFieldDecorator } = form;   //得到antd中form的表单验证的 高阶函数 getFieldDecorator()()
        return (
            <div className="login">
                <header className="login-header">
                    <img src={logo} alt="" />
                    <h1>矢易后台管理系统</h1>
                </header>
                <section className="login-content">
                    <h2>用户登陆</h2>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item>
                            {
                                getFieldDecorator('username',{
                                    //申明式验证↓：直接使用别人的规则方法验证
                                    rules: [  //表单验证:  所有属性均为antd文档规定，请查看文档
                                        { required: true,whitespace:true, message: '用户名不能为空' },//表单验证，必须输入 whitespace:空格验证
                                        { min: 4, message: '用户名长度不能小于4位' },//表单验证
                                        { max: 12, message: '用户名长度不能大于12位' },//表单验证
                                        { pattern:/^[a-zA-Z0-9_]+$/, message: '用户名必须是英文、数字或下划线组成' },//正则表单验证 小写a-z  大写A-Z  数字0-9
                                    ]
                                    })(
                                    <Input
                                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder="请输入用户名"
                                    />
                                    )
                                // getFieldDecorator('username', { //第一个值是标识名称，第二个值是配置对象(表单验证的规则),第三个值是 标签
                                //     rules: [{ required: true, message: 'Please input your username!' }],})
                                //     (
                                //         <Input
                                //         prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                //         placeholder="请输入用户名"
                                //         />,
                                //     )
                            }
                        </Form.Item>
                        <Form.Item>
                                {
                                    getFieldDecorator('password',{
                                        //申明式验证↓：直接使用别人的规则方法验证
                                        rules: [  //表单验证:  所有属性均为antd文档规定，请查看文档
                                            { required: true,whitespace:true, message: '密码不能为空' },//表单验证，必须输入 whitespace:空格验证
                                            { min: 4, message: '密码长度不能小于4位' },//表单验证
                                            { max: 12, message: '密码长度不能大于12位' },//表单验证
                                            { pattern:/^[a-zA-Z0-9_]+$/, message: '密码必须是英文、数字或下划线组成' },//正则表单验证 小写a-z  大写A-Z  数字0-9
                                        ]
                                        })(
                                        <Input
                                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                            type="password"
                                            placeholder="请输入密码"
                                        /> 
                                    )
                                }
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                登陆
                            </Button>
                        </Form.Item>
                    </Form>
                </section>
            </div>
        )
    }
}
//高阶函数
    //接收的参数是个函数 或者 返回值是个函数  常见：定时器、promise、数组遍历的方法forEach map() find()
    //Form.create()() 、 getFieldDecorator()()

//高阶组件
   //本质是一个函数
   //接收一个组件(被包装组件)，返回一个新的组件(包装组件)，包装组件会向被包装组件传入 特定属性
    //作用：扩展组件功能

//包装Form组件组成一个新的组件:Form(Login)
const WrapLogin = Form.create()(Login)   //antd 3.X官网文档form属性使用规则
export default WrapLogin
