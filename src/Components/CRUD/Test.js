// export class Customer extends Component {

//     constructor(props) {
//         super(props)

//         this.state = {
//             customers: [],
//             filters: {
//                 status: 'all',
//                 keyword: ''
//             },
//             paginate: {
//                 currentPage: 1,
//                 totalPage: 0
//             }
//         }

//         this.customerApi = config.SERVER_API + '/customers';
//         this.perPage = 5;
//         this.client = new HttpClient();
//     }

//     updateState = async (paginate) => {
//         return this.setState({
//             paginate: paginate
//         });
//     }

//     handleChangePage = async (page) => {
//         const paginate = { ...this.state.paginate };
//         paginate.currentPage = page;
//         await this.updateState(paginate);
//         let filters = this.getFilterObj()
//         this.getCustomers(filters);
//     }

//     getCustomers = async (filters = {}) => {
//         let searchApi = this.customerApi;
//         let clonePaginate = {
//             _limit: this.perPage,
//             _page: this.state.paginate.currentPage
//         }
//         filters = {
//             ...filters,
//             ...clonePaginate
//         }
//         if (Object.keys(filters).length) {
//             const params = new URLSearchParams(filters).toString();
//             searchApi = this.customerApi + '?' + params;
//         } else {
//             Object.keys(this.state.paginate).forEach((key) => {
//                 searchApi.searchParams.append(key, this.state.paginate[key])
//             })
//         }
//         const searchCustomer = await fetch(searchApi)
//         const customers = await searchCustomer.json()
//         const total = searchCustomer.headers.get('x-total-count')
//         const totalPage = Math.ceil(total / clonePaginate._limit);
//         this.setState({
//             paginate: {
//                 ... this.state.paginate,
//                 totalPage: totalPage
//             }
//         })
//         this.setState({
//             customers: customers,

//         })
//     }

//     componentDidMount = () => {
//         // this.totalPage();
//         this.getCustomers();
//     }

//     paginateRender = () => {
//         let paginateItem = [];
//         let active;
//         const currentPage = this.state.paginate.currentPage;
//         for (let page = 1; page <= this.state.paginate.totalPage; page++) {
//             active = parseInt(page) === parseInt(currentPage) ? "active" : "";
//             paginateItem.push(
//                 <li
//                     key={page}
//                     className={`page-item ${active}`}
//                     onClick={e => {
//                         e.preventDefault();
//                         this.handleChangePage(page);
//                     }}
//                 >
//                     <a href='#' className="page-link">{page}</a>
//                 </li>
//             );
//         }
//         return (
//             <nav
//                 aria-label="Page navigation example"
//                 className="d-flex justify-content-center"
//             >
//                 <ul className="pagination">
//                     {paginateItem}
//                 </ul>
//             </nav>
//         );
//     };

//     getFilterObj = () => {
//         const { filters } = this.state;
//         const filtersObj = {}
//         let { status, keyword } = filters;
//         if (status === 'active' || status === 'inactive') {
//             status = status === 'active' ? 1 : 0;

//             filtersObj.status = status;
//         }

//         if (keyword !== '') {
//             filtersObj.q = keyword;
//         }
//         return filtersObj
//     }

//     handleFilter = (e) => {
//         e.preventDefault();
//         let filtersObj = this.getFilterObj()
//         this.getCustomers(filtersObj)

//     }

//     hadnleChange = (e) => {
//         const filters = { ...this.state.filters }
//         filters[e.target.name] = e.target.value;
//         this.setState({
//             filters: filters
//         })
//     }

//     render() {

//         const { customers } = this.state;

//         const jsx = customers.map(({ id, name, email, phone, status }, index) => {

//             const statusBtn =
//                 status
//                     ?
//                     <button type='button' className='btn btn-success'>Kích hoạt</button>
//                     : <button type='button' className='btn btn-danger'>Chưa kích hoạt</button>

//             const editBtn = <a href='#' className='btn btn-warning'>Sửa</a>
//             const deleteBtn = <a href='#' className='btn btn-danger'>Xoá</a>

//             return (
//                 <tr key={id}>
//                     <td>{index + 1}</td>
//                     <td>{name}</td>
//                     <td>{email}</td>
//                     <td>{phone}</td>
//                     <td>{statusBtn}</td>
//                     <td>{editBtn}</td>
//                     <td>{deleteBtn}</td>
//                 </tr>
//             )
//         })

//         return (
//             <div className='container'>
//                 <h1 className='text-center'>Danh sách khách hàng</h1>
//                 <form onSubmit={this.handleFilter}>
//                     <div className='row'>
//                         <div className='col-3'>
//                             <select name='status' onChange={this.hadnleChange} className='form-select'>
//                                 <option value={'all'}>Tất cả trạng thái</option>
//                                 <option value={'active'}>Kích hoạt</option>
//                                 <option value={'inactive'}>Chưa kích hoạt</option>
//                             </select>
//                         </div>
//                         <div className='col-7'>
//                             <input type={'search'} name='keyword' className='form-control' placeholder='Tìm kiếm...' onChange={this.hadnleChange}></input>
//                         </div>
//                         <div className='col-2 d-grid'>
//                             <button className='btn btn-primary' type='submit'>Tìm kiếm</button>
//                         </div>
//                     </div>
//                 </form>
//                 <table className='table table-bordered mt-2'>
//                     <thead>
//                         <tr>
//                             <th width="5%">STT</th>
//                             <th>Họ và tên</th>
//                             <th>Email</th>
//                             <th>Phone</th>
//                             <th>Trạng thái</th>
//                             <th width="5%">Sửa</th>
//                             <th width="5%">Xoá</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {jsx}
//                     </tbody>
//                 </table>
//                 {this.paginateRender()}
//             </div>
//         )
//     }
// }

// export default Customer


// import React, { Component, useState } from 'react'
// import "bootstrap/dist/css/bootstrap.min.css"
// import "./Customer.scss"
// import config from "../../config.json"
// import HttpClient from './HttpClient'
// import Button from 'react-bootstrap/Button'
// import Modal from 'react-bootstrap/Modal'


// export class Customer extends Component {
//     constructor(props) {
//         super(props);

//         this.state = {
//             customers: [],
//             form: {
//                 name: '',
//                 email: '',
//                 phone: '',
//                 status: 0
//             },
//             filters: {
//                 status: "all",
//                 keyword: "",
//             },
//             errors: {
//                 name: {},
//                 email: {},
//                 phone: {},
//                 status: {}
//             },
//             paginate: {
//                 currentPage: 1,
//                 totalPage: 0,
//             },
//             modal: {
//                 showModal: true
//             }
//         };

//         this.customerApi = config.SERVER_API + "/customers";
//         this.perPage = config.PER_PAGE;
//         this.client = new HttpClient();
//     }

//     getCustomers = async (filters = {}) => {
//         const { currentPage } = this.state.paginate;

//         let searchApi = `${this.customerApi}?_page=${currentPage}&_limit=${this.perPage}&_sort=id&_order=desc`;

//         if (Object.keys(filters).length) {
//             const params = new URLSearchParams(filters).toString();

//             searchApi = `${this.customerApi}?_page=${currentPage}&_limit=${this.perPage}&${params}&_sort=id&_order=desc`;
//         }

//         const clientResult = await this.client.get(searchApi);
//         const totalCount = clientResult.headers.get("x-total-count");
//         const totalPage = Math.ceil(totalCount / this.perPage);

//         const paginate = { ...this.state.paginate };
//         paginate.totalPage = totalPage;

//         clientResult.json().then((customers) => {
//             this.setState({
//                 customers: customers,
//                 paginate: paginate,
//             });
//         });
//     };

//     renderPaginate = () => {
//         const { totalPage, currentPage } = this.state.paginate;

//         let pageItemJsx = [];

//         for (let i = 1; i <= totalPage; i++) {
//             pageItemJsx.push(
//                 <li
//                     key={i}
//                     className={`page-item${currentPage == i ? " active" : null}`}
//                 >
//                     <a className="page-link" href="#" onClick={(e) => {
//                         e.preventDefault();
//                         this.goPaginate(i);
//                     }}>
//                         {i}
//                     </a>
//                 </li>
//             );
//         }

//         const jsx = (
//             <nav className="d-flex justify-content-end">
//                 <ul className="pagination">
//                     <li className="page-item">
//                         <a className="page-link" href="#">
//                             Trước
//                         </a>
//                     </li>
//                     {pageItemJsx}
//                     <li className="page-item">
//                         <a className="page-link" href="#">
//                             Sau
//                         </a>
//                     </li>
//                 </ul>
//             </nav>
//         );

//         return jsx;
//     };

//     goPaginate = async (page) => {
//         const paginate = { ...this.state.paginate };
//         paginate.currentPage = page;
//         this.setState({
//             paginate: paginate
//         })

//     }

//     componentDidMount = () => {
//         const filtersObj = this.getFilterObj();
//         this.getCustomers(filtersObj);
//     };

//     componentDidUpdate = (prevProps, prevState) => {
//         const { currentPage: prevCurrentPage } = prevState.paginate;
//         const { currentPage } = this.state.paginate;

//         if (currentPage != prevCurrentPage) {
//             const filtersObj = this.getFilterObj();
//             this.getCustomers(filtersObj);
//         }
//     }

//     closeModal = () => {
//         this.setState({ showModal: false });
//     }

//     openModal = () => {
//         this.setState({ showModal: true });
//     }

//     handleCreacte = (e) => {
//         e.preventDefault();
//         let {name, email, phone, status} = this.state.form
//         status = parseInt(status)
//         const errors = {
//             name: {},
//             email: {},
//             phone: {},
//             status: {}
//         }

//         if(name === '') {
//             errors.name.required = 'Vui lòng nhập tên'
//         } else if (name.length < 5) {
//             errors.name.required = 'Vui lòng nhập tên dài hơn 5 kí tự'
//         }

//         if (email === "") {
//             errors.email.required = "Vui lòng nhập email";
//         } else if (!this.isEmail(email)) {
//             errors.email.email = "Vui lòng nhập email hợp lệ";

//         }

//         if (phone === "") {
//             errors.phone.required = "Vui lòng nhập số điện thoại";
//         } else if (!this.isEmail(phone)) {
//             errors.phone.phone = "Vui lòng nhập số điện thoại hợp lệ";

//         }

//         if(status !== 0 || status !== 1 ) {
//             errors.status.required = "Trạng thái không hợp lệ";
//         }
//         const { form } = this.state;
//         const customerStr = new URLSearchParams(form).toString();

//         fetch(this.customerApi, {
//             method: 'POST',
//             headers: {
//                 //'Content-Type': 'application/json'
//                 'Content-Type': 'application/x-www-form-urlencoded'
//             },
//             body: customerStr
//         })
//             .then(response => response.json())

//         this.getCustomers();

//         this.closeModal();

//     }

//     handleChangeFormAdd = (e) => {
//         const data = { ...this.state.form }
//         data[e.target.name] = e.target.value;

//         this.setState({
//             form: data,
//         });
//     }

//     handleUpdateForm = () => {
//         console.log('Success');
//     }

//     handleDeleteCtm = (id) => {
//         if (window.confirm("Bạn có chắc chắn muốn xoá không?")) {
//             fetch(this.customerApi + '/' + id, {
//                 method: 'DELETE'
//             })
//                 .then(response => response.json())
//             this.getCustomers();
//         }
//     }

//     getFilterObj = () => {
//         const { filters } = this.state;

//         let { status, keyword } = filters;

//         const filtersObj = {};

//         if (status === "active" || status === "inactive") {
//             status = status === "active" ? 1 : 0;

//             filtersObj.status = status;
//         }

//         if (keyword !== "") {
//             filtersObj.q = keyword;
//         }

//         return filtersObj;
//     };

//     handleFilter = (e) => {
//         e.preventDefault();
//         const filtersObj = this.getFilterObj();
//         this.getCustomers(filtersObj);
//     };

//     handleChange = (e) => {
//         const filters = { ...this.state.filters };
//         filters[e.target.name] = e.target.value;

//         this.setState({
//             filters: filters,
//         });
//     };

//     render() {
//         const { customers } = this.state;

//         const jsx = customers.map(({ id, name, email, phone, status }, index) => {
//             const statusBtn = parseFloat(status) ? (
//                 <button type="button" className="btn btn-success">
//                     Kích hoạt
//                 </button>
//             ) : (
//                 <button type="button" className="btn btn-danger">
//                     Chưa kích hoạt
//                 </button>
//             );

//             const editBtn = (
//                 <a href="#"
//                     onClick={
//                         this.openModal
//                     }
//                     className="btn btn-warning">
//                     Sửa
//                 </a>
//             );

//             const deleteBtn = (
//                 <a onClick={e => {
//                     e.preventDefault()
//                     this.handleDeleteCtm(id)
//                 }} href="#" className="btn btn-danger">
//                     Xoá
//                 </a>

//             );

//             return (
//                 <tr key={id}>
//                     <td>{index + 1}</td>
//                     <td>{name}</td>
//                     <td>{email}</td>
//                     <td>{phone}</td>
//                     <td>{statusBtn}</td>
//                     <td>{editBtn}</td>
//                     <td>{deleteBtn}</td>

//                 </tr>
//             );
//         });

//         return (
//             <div className="container">
//                 <h1 className='text-center'>Danh sách khách hàng</h1>
//                 <a href="#" onClick={this.openModal} className="btn btn-primary mb-3">Thêm mới</a>
//                 <Modal show={this.state.showModal} onHide={this.closeModal}>
//                     <Modal.Header closeButton>
//                         <Modal.Title>Thêm khách hàng</Modal.Title>
//                     </Modal.Header>
//                     <Modal.Body>
//                         <div className="modal-body">
//                             <form action="" className="form-add" onSubmit={this.handleCreacte}>
//                                 <div className="mb-3">
//                                     <label htmlFor="">Tên</label>
//                                     <input name="name" type="text" className="form-control" placeholder="Tên..."
//                                         onChange={this.handleChangeFormAdd} />
//                                 </div>

//                                 <div className="mb-3">
//                                     <label htmlFor="">Email</label>
//                                     <input name="email" type="email" className="form-control" placeholder="Email..." 
//                                         onChange={this.handleChangeFormAdd} />
//                                 </div>

//                                 <div className="mb-3">
//                                     <label htmlFor="">Phone</label>
//                                     <input name="phone" type="text" className="form-control" placeholder="SDT..." 
//                                         onChange={this.handleChangeFormAdd} />
//                                 </div>

//                                 <div className="mb-3">
//                                     <label htmlFor="">Trạng thái</label>
//                                     <select name="status" className="form-select" onChange={this.handleChangeFormAdd}>
//                                         <option value="0">Chưa kích hoạt</option>
//                                         <option value="1">Kích hoạt</option>
//                                     </select>
//                                 </div>
//                                 <Button variant="secondary" className='me-3' onClick={this.closeModal}>
//                                     Close
//                                 </Button>
//                                 <Button variant="primary" type='submit'>
//                                     Thêm mới
//                                 </Button>
//                             </form>
//                         </div>
//                     </Modal.Body>
//                 </Modal>
//                 <form onSubmit={this.handleFilter}>
//                     <div className="row">
//                         <div className="col-3">
//                             <select
//                                 name="status"
//                                 onChange={this.handleChange}
//                                 className="form-select"
//                             >
//                                 <option value={"all"}>Tất cả trạng thái</option>
//                                 <option value={"active"}>Kích hoạt</option>
//                                 <option value={"inactive"}>Chưa kích hoạt</option>
//                             </select>
//                         </div>

//                         <div className="col-7">
//                             <input
//                                 type={"search"}
//                                 name="keyword"
//                                 className="form-control"
//                                 placeholder="Từ khoá tìm kiếm..."
//                                 onChange={this.handleChange}
//                             />
//                         </div>

//                         <div className="col-2 d-grid">
//                             <button type="submit" className="btn btn-primary">
//                                 Tìm kiếm
//                             </button>
//                         </div>
//                     </div>
//                 </form>
//                 <hr />
//                 <table className="table table-bordered">
//                     <thead>
//                         <tr>
//                             <th width="5%">STT</th>
//                             <th>Tên</th>
//                             <th>Email</th>
//                             <th>Điện thoại</th>
//                             <th>Trạng thái</th>
//                             <th width="5%">Sửa</th>
//                             <th width="5%">Xoá</th>
//                         </tr>
//                     </thead>
//                     <tbody>{jsx}</tbody>
//                 </table>
//                 {this.renderPaginate()}
//             </div>
//         );
//     }
// }

// export default Customer;

// /*
// Các bước xây dựng tính năng phân trang
// => Phần 1: Render danh sách
// 1. Xác định được số bản ghi trên 1 trang (config)
// 2. Gọi tham số _limit và _page vào API => Giới hạn số lượng bản ghi trên 1 trang (Render customer)
// => Phần 2: Render phân trang
// 3. Lấy tổng số bản ghi => Lấy từ API
// 4. Tính tổng số trang: Math.ceil(tổng số bản ghi / số bản ghi trên 1 trang)
// 5. Render danh sách trang
// 6. Chuyển trang khi click vào vào số trang
// */