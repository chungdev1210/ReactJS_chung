import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Customer.scss";
import config from "../../config.json";
import HttpClient from "./HttpClient";
import Modal from "react-bootstrap/Modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from 'sweetalert2'

export class Customer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            customers: [],
            filters: {
                status: "all",
                keyword: "",
            },
            paginate: {
                currentPage: 1,
                totalPage: 0,
            },

            modal: {
                showModal: false,
            },

            form: {
                name: "",
                email: "",
                phone: "",
                status: 0,
            },

            errors: {
                name: {},
                email: {},
                phone: {},
                status: {},
            },

            currentId: 0
        };

        this.customerApi = config.SERVER_API + "/customers";
        this.perPage = config.PER_PAGE;
        this.client = new HttpClient();
    }

    getCustomers = async (filters = {}) => {
        const { currentPage } = this.state.paginate;

        let searchApi = `${this.customerApi}?_page=${currentPage}&_limit=${this.perPage}&_sort=id&_order=desc`;

        if (Object.keys(filters).length) {
            const params = new URLSearchParams(filters).toString();

            //searchApi = this.customerApi + "&" + params;

            searchApi = `${this.customerApi}?_page=${currentPage}&_limit=${this.perPage}&${params}&_sort=id&_order=desc`;
        }

        const clientResult = await this.client.get(searchApi);
        const totalCount = clientResult.headers.get("x-total-count");
        const totalPage = Math.ceil(totalCount / this.perPage);

        const paginate = { ...this.state.paginate };
        paginate.totalPage = totalPage;

        clientResult.json().then((customers) => {
            this.setState({
                customers: customers,
                paginate: paginate,
            });
        });
    };

    renderPaginate = () => {
        // console.log("paginate");
        const { totalPage, currentPage } = this.state.paginate;

        let pageItemJsx = [];

        for (let i = 1; i <= totalPage; i++) {
            pageItemJsx.push(
                <li
                    key={i}
                    className={`page-item${currentPage == i ? " active" : null}`}
                >
                    <a
                        className="page-link"
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            this.goPaginate(i);
                        }}
                    >
                        {i}
                    </a>
                </li>
            );
        }

        const jsx = (
            <nav className="d-flex justify-content-end">
                <ul className="pagination">
                    <li className="page-item">
                        <a className="page-link" href="#">
                            Trước
                        </a>
                    </li>
                    {pageItemJsx}
                    <li className="page-item">
                        <a className="page-link" href="#">
                            Sau
                        </a>
                    </li>
                </ul>
            </nav>
        );

        return jsx;
    };

    //IIFE

    updateCurrentPage = (paginate) => {
        this.setState({
            paginate: paginate,
        });
    };

    goPaginate = (page) => {
        const paginate = { ...this.state.paginate };
        paginate.currentPage = page;

        this.setState({
            paginate: paginate,
        });
    };

    componentDidMount = () => {
        const filtersObj = this.getFilterObj();
        this.getCustomers(filtersObj);
    };

    componentDidUpdate = (prevProps, prevState) => {
        const { currentPage: prevCurrentPage } = prevState.paginate;

        const { currentPage } = this.state.paginate;

        if (currentPage != prevCurrentPage) {
            const filtersObj = this.getFilterObj();

            this.getCustomers(filtersObj);
        }
    };

    getFilterObj = () => {
        const { filters } = this.state;

        let { status, keyword } = filters;

        const filtersObj = {};

        if (status === "active" || status === "inactive") {
            status = status === "active" ? 1 : 0;

            filtersObj.status = status;
        }

        if (keyword !== "") {
            filtersObj.q = keyword;
        }

        return filtersObj;
    };

    handleFilter = (e) => {
        e.preventDefault();
        const filtersObj = this.getFilterObj();

        this.getCustomers(filtersObj);
    };

    handleChange = (e) => {
        const filters = { ...this.state.filters };
        filters[e.target.name] = e.target.value;

        this.setState({
            filters: filters,
        });
    };

    //Hàm kiểm trea email hợp lệ
    isEmail = (email) => {
        const pattern = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;
        return pattern.test(email);
    };

    //Hàm kiểm tra số điện thoại hợp lệ
    isPhone = (phone) => {
        const pattern = /^(0|\+84)\d{9}$/;
        return pattern.test(phone);
    };

    closeModalAdd = () => {
        this.setState({ showModal: false });
    }

    openModalAdd = () => {
        this.setState({ showModal: true, currentId: 0 });
        this.resetForm();
    }


    handleSubmitAdd = (isAdd = false) => {
        let { name, email, phone, status } = this.state.form;

        status = parseInt(status);

        const errors = {
            name: {},
            email: {},
            phone: {},
            status: {},
        };

        if (name === "") {
            errors.name.required = "Vui lòng nhập tên !!!";
        } else if (name.length < 5) {
            errors.name.min = "Tên phải từ 5 ký tự trở lên";
        }

        if (email === "") {
            errors.email.required = "Vui lòng nhập email";
        } else if (!this.isEmail(email)) {
            errors.email.email = "Vui lòng nhập email hợp lệ";
        }

        if (phone === "") {
            errors.phone.required = "Vui lòng nhập số điện thoại";
        } else if (!this.isPhone(phone)) {
            errors.phone.phone = "Vui lòng nhập số điện thoại hợp lệ";
        }

        if (status !== 0 && status !== 1) {
            errors.status.required = "Trạng thái không hợp lệ";
        }

        this.setState({
            errors: errors,
        });

        if (!this.isErrors(errors)) {
            if (this.state.currentId == 0) {
                //Thêm dữ liệu
                this.client
                    .post(this.customerApi, {
                        name: name,
                        email: email,
                        phone: phone,
                        status: status,
                    })
                    .then((response) => response.json())
                    .then((response) => {
                        if (response !== "") {
                            toast.success("Thêm khách hàng thành công");
                            this.resetForm();
                            this.getCustomers();

                            if (!isAdd) {
                                this.closeModalAdd();
                            }
                        }
                    });
            } else {
                const  {currentId } = this.state;
                this.client
                .put(this.customerApi, {
                    name: name,
                    email: email,
                    phone: phone,
                    status: status,
                }, currentId)
                .then((response) => response.json())
                .then((response) => {
                    if (response !== "") {
                        toast.success("Sửa khách hàng thành công");
                        this.resetForm();
                        this.getCustomers();
                        this.closeModalAdd();
                    }
                });
            }
        }
    };

    getError = (fieldName) => {
        const { errors } = this.state;

        const error = errors[fieldName];

        const keys = Object.keys(error);

        return error[keys[0]];
    };

    isErrors = (errors) => {
        const keys = Object.keys(errors);

        if (keys.length) {
            const check = keys.some((key) => {
                return Object.keys(errors[key]).length > 0;
            });

            return check;
        }

        return false;
    };

    resetForm = () => {
        this.setState({
            form: {
                name: "",
                email: "",
                phone: "",
                status: 0,
            },
        });
    };

    handleChangeFormAdd = (e) => {
        const data = { ...this.state.form }; //clone object

        data[e.target.name] = e.target.value;

        this.setState({
            form: data,
        });
    };


    handleKeyboardSave = (e) => {
        const keyCode = e.keyCode;

        switch (keyCode) {
            case 114:
                this.handleSubmitAdd();
                break;

            case 115:
                this.handleSubmitAdd(true);
                break;

            default:
                break;
        }
    };

    handleGetCustomer = (customerId) => {
        const customerDetailApi = this.customerApi + "/" + customerId;
        this.client
            .get(customerDetailApi)
            .then((response) => response.json())
            .then((customer) => {
                this.openModalAdd();
                this.setState({
                    form: customer,
                    currentId: customerId
                });
            });
    };


    handleDeleteCtm = (id) => {
    // if (window.confirm("Bạn có chắc chắn muốn xoá không?")) {
    //     fetch(this.customerApi + '/' + id, {
    //         method: 'DELETE'
    //     })
    //     .then(response => response.json())
    //     .then(this.getCustomers())
    // }

    Swal.fire({
        title: 'Bạn có chắc chắn  muốn xoá không?',
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: 'Xoá'
    })

    .then((result) => {
        if (result.isConfirmed) {
            Swal.fire('Xoá thành công!!!!')
        }

        fetch(this.customerApi + '/' + id, {
            method: 'DELETE'
        })
        .then(response => response.json())
    
        .then(this.getCustomers())
    })
 
}

    render() {
        // console.log("re-render 2");
        const { customers, modal, form, errors, currentId } = this.state;

        const { name, email, phone, status } = form;

        const jsx = customers.map(({ id, name, email, phone, status }, index) => {
            const statusBtn = status ? (
                <button type="button" className="btn btn-success">
                    Kích hoạt
                </button>
            ) : (
                <button type="button" className="btn btn-danger">
                    Chưa kích hoạt
                </button>
            );

            const editBtn = (
                <a
                    href="#"
                    onClick={(e) => {
                        e.preventDefault();
                        this.handleGetCustomer(id);
                    }}
                    className="btn btn-warning"
                >
                    Sửa
                </a>
            );

            const deleteBtn = (
                <a 
                onClick={e => {
                e.preventDefault()
                this.handleDeleteCtm(id)}}
                href="#" className="btn btn-danger">
                    Xoá
                </a>
            );

            return (
                <tr key={id}>
                    <td>{index + 1}</td>
                    <td>{name}</td>
                    <td>{email}</td>
                    <td>{phone}</td>
                    <td>{statusBtn}</td>
                    <td>{editBtn}</td>
                    <td>{deleteBtn}</td>
                </tr>
            );
        });

        return (
            <div className="container">
                <h1 className="page-title text-center">Danh sách khách hàng</h1>

                <a href="#" className="btn btn-primary" onClick={this.openModalAdd}>
                    Thêm mới
                </a>
                <hr />
                <form onSubmit={this.handleFilter}>
                    <div className="row">
                        <div className="col-3">
                            <select
                                name="status"
                                onChange={this.handleChange}
                                className="form-select"
                            >
                                <option value={"all"}>Tất cả trạng thái</option>
                                <option value={"active"}>Kích hoạt</option>
                                <option value={"inactive"}>Chưa kích hoạt</option>
                            </select>
                        </div>

                        <div className="col-7">
                            <input
                                type={"search"}
                                name="keyword"
                                className="form-control"
                                placeholder="Từ khoá tìm kiếm..."
                                onChange={this.handleChange}
                            />
                        </div>

                        <div className="col-2 d-grid">
                            <button type="submit" className="btn btn-primary">
                                Tìm kiếm
                            </button>
                        </div>
                    </div>
                </form>
                <hr />
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th width="5%">STT</th>
                            <th>Tên</th>
                            <th>Email</th>
                            <th>Điện thoại</th>
                            <th>Trạng thái</th>
                            <th width="5%">Sửa</th>
                            <th width="5%">Xoá</th>
                        </tr>
                    </thead>
                    <tbody>{jsx}</tbody>
                </table>
                {this.renderPaginate()}
                <div onKeyUp={this.handleKeyboardSave}>
                    <Modal
                        show={this.state.showModal}
                        onHide={this.closeModalAdd}
                        animation={true}
                        onEscapeKeyDown={this.closeModalAdd}
                    >
                        <Modal.Header>
                            <Modal.Title>Thêm khách hàng</Modal.Title>
                            <button
                                type="button"
                                className="btn-close"
                                onClick={this.closeModalAdd}
                            ></button>
                        </Modal.Header>
                        <Modal.Body>
                            {this.isErrors(errors) ? (
                                <div className="alert alert-danger text-center">
                                    Vui lòng kiểm tra dữ liệu bên dưới
                                </div>
                            ) : null}
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    this.handleSubmitAdd();
                                }}
                            >
                                <div className="mb-3">
                                    <label>Tên</label>
                                    <input
                                        type="text"
                                        className={`form-control ${this.getError("name") ? "is-invalid" : ""
                                            }`}
                                        name="name"
                                        placeholder="Tên... "
                                        onChange={this.handleChangeFormAdd}
                                        value={name}
                                    />
                                    {this.getError("name") ? (
                                        <div className="invalid-feedback">
                                            {this.getError("name")}
                                        </div>
                                    ) : null}
                                </div>

                                <div className="mb-3">
                                    <label>Email</label>
                                    <input
                                        type="text"
                                        className={`form-control ${this.getError("email") ? "is-invalid" : ""
                                            }`}
                                        name="email"
                                        placeholder="Email... "
                                        onChange={this.handleChangeFormAdd}
                                        value={email}
                                    />
                                    {this.getError("email") ? (
                                        <div className="invalid-feedback">
                                            {this.getError("email")}
                                        </div>
                                    ) : null}
                                </div>

                                <div className="mb-3">
                                    <label>Điện thoại</label>
                                    <input
                                        type="text"
                                        className={`form-control ${this.getError("phone") ? "is-invalid" : ""
                                            }`}
                                        name="phone"
                                        placeholder="Điện thoại... "
                                        onChange={this.handleChangeFormAdd}
                                        value={phone}
                                    />
                                    {this.getError("phone") ? (
                                        <div className="invalid-feedback">
                                            {this.getError("phone")}
                                        </div>
                                    ) : null}
                                </div>

                                <div className="mb-3">
                                    <label>Trạng thái</label>
                                    <select
                                        name="status"
                                        className={`form-select ${this.getError("status") ? "is-invalid" : ""
                                            }`}
                                        onChange={this.handleChangeFormAdd}
                                        value={status}
                                    >
                                        <option value="0">Chưa kích hoạt</option>
                                        <option value="1">Kích hoạt</option>
                                    </select>
                                    {this.getError("status") ? (
                                        <div className="invalid-feedback">
                                            {this.getError("status")}
                                        </div>
                                    ) : null}
                                </div>
                                <button 
                                    type="submit" 
                                    className="btn btn-primary me-3"
                                    // onClick={this.handleUpdateCustomer(id)}
                                >
                                    Lưu
                                </button>
                                {currentId == 0 ? (
                                    <button
                                        type="submit"
                                        className="btn btn-primary me-3"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            this.handleSubmitAdd(true);
                                        }}
                                    >
                                        Lưu & Thêm
                                    </button>
                                ) : null}

                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={this.closeModalAdd}
                                >
                                    Đóng
                                </button>
                            </form>
                        </Modal.Body>
                    </Modal>
                </div>
                <ToastContainer />
            </div>
        );
    }
}

export default Customer;

/*
Các bước xây dựng tính năng phân trang
=> Phần 1: Render danh sách
1. Xác định được số bản ghi trên 1 trang (config)
2. Gọi tham số _limit và _page vào API => Giới hạn số lượng bản ghi trên 1 trang (Render customer)
=> Phần 2: Render phân trang
3. Lấy tổng số bản ghi => Lấy từ API
4. Tính tổng số trang: Math.ceil(tổng số bản ghi / số bản ghi trên 1 trang)
5. Render danh sách trang
6. Chuyển trang khi click vào vào số trang
*/