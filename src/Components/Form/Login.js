import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            form: {
                email: "",
                password: "",
            },

            errors: {
                email: {},
                password: {}
            },

            showPassword: false
        };
    }

    isEmail = (email) => {
        const pattern = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;
        return pattern.test(email);
    }

    isPasswordStrength = (password) => {
        const pattern = /^(?=(.*[a-z]){3,})(?=(.*[A-Z]){2,})(?=(.*[0-9]){2,})(?=(.*[!@#$%^&*()\-__+.]){1,}).{8,}$/;
        return pattern.test(password);
    }

    handleLogin = (e) => {
        e.preventDefault();

        const { email, password } = this.state.form;

        const errors = {
            email: {},
            password: {}
        };

        //errors.fieldName.rule

        //Ví dụ: 
        //-errors.email.required
        //-errors.email.email
        //-errors.password.required
        //-errors.password.min

        if (email === "") {
            errors.email.required = "Vui lòng nhập email";
        } else if (!this.isEmail(email)) {
            errors.email.email = "Vui lòng nhập email hợp lệ";

        }

        if (password === "") {
            errors.password.required = "Vui lòng nhập password";
        } else if (!this.isPasswordStrength(password)) {
            errors.password.strength = "Mật khẩu không đủ mạnh";
        }
        this.setState({
            errors: errors,
        });


        if (!this.isErrors(errors)) {
            //Validate thành công
            alert('Thành công');
            this.resetForm();
        }

        /*
        Bài tập: Thực hiện thêm các rule dưới đây:
        - Email đúng định dạng
        - Password từ 8 ký tự trở lên
        */
    };

    handleChangeValue = (e) => {
        const data = { ...this.state.form }; //clone object

        data[e.target.name] = e.target.value;

        this.setState({
            form: data,
        });
    };

    getError = (fieldName) => {
        const { errors } = this.state;
        /*
        {
            email: {
                required: '',
                email: ''
            }
        }
        */

        const error = errors[fieldName];

        const keys = Object.keys(error);

        return error[keys[0]];
    }

    isErrors = (errors) => {

        const keys = Object.keys(errors);

        if (keys.length) {
            const check = keys.some(key => {
                return Object.keys(errors[key]).length > 0;
            })

            return check;
        }

        return false;
    }

    resetForm = () => {
        this.setState({
            form: {
                email: '',
                password: ''
            }
        })
    }

    handleShowPassword = () => {

        const status = this.state.showPassword ? false : true

        this.setState({
            showPassword: status
        });
    }

    render() {
        const { errors, showPassword } = this.state;

        const { email, password } = this.state.form;
        return (
            <div className="container">
                <div className="row justify-content-center py-5">
                    <div className="col-7">
                        {
                            this.isErrors(errors)
                                ?
                                <div className="alert alert-danger text-center">
                                    Vui lòng kiểm tra dữ liệu bên dưới
                                </div>
                                :
                                null
                        }
                        <form onSubmit={this.handleLogin}>
                            <div className="mb-3">
                                <label>Email</label>
                                <input
                                    type="text"
                                    name="email"
                                    className={`form-control ${this.getError('email') ? "is-invalid" : null
                                        }`}
                                    placeholder="Email..."
                                    onChange={this.handleChangeValue}
                                    value={email}
                                />
                                {this.getError('email') ? (
                                    <div className="invalid-feedback">{this.getError('email')}</div>
                                ) : null}

                            </div>

                            <div className="mb-3">
                                <label>Password</label>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    className={`form-control ${this.getError('password') ? "is-invalid" : null
                                        }`}
                                    placeholder="Password..."
                                    onChange={this.handleChangeValue}
                                    value={password}
                                />
                                <span className="show-password" onClick={this.handleShowPassword}>{showPassword ? 'Hide Password' : 'Show Password'}</span>
                                {this.getError('password') ? (
                                    <div className="invalid-feedback">{this.getError('password')}</div>
                                ) : null}
                            </div>
                            <button type="submit" className="btn btn-primary">
                                Login
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;