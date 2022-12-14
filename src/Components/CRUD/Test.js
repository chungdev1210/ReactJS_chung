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
//                     <button type='button' className='btn btn-success'>K??ch ho???t</button>
//                     : <button type='button' className='btn btn-danger'>Ch??a k??ch ho???t</button>

//             const editBtn = <a href='#' className='btn btn-warning'>S???a</a>
//             const deleteBtn = <a href='#' className='btn btn-danger'>Xo??</a>

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
//                 <h1 className='text-center'>Danh s??ch kh??ch h??ng</h1>
//                 <form onSubmit={this.handleFilter}>
//                     <div className='row'>
//                         <div className='col-3'>
//                             <select name='status' onChange={this.hadnleChange} className='form-select'>
//                                 <option value={'all'}>T???t c??? tr???ng th??i</option>
//                                 <option value={'active'}>K??ch ho???t</option>
//                                 <option value={'inactive'}>Ch??a k??ch ho???t</option>
//                             </select>
//                         </div>
//                         <div className='col-7'>
//                             <input type={'search'} name='keyword' className='form-control' placeholder='T??m ki???m...' onChange={this.hadnleChange}></input>
//                         </div>
//                         <div className='col-2 d-grid'>
//                             <button className='btn btn-primary' type='submit'>T??m ki???m</button>
//                         </div>
//                     </div>
//                 </form>
//                 <table className='table table-bordered mt-2'>
//                     <thead>
//                         <tr>
//                             <th width="5%">STT</th>
//                             <th>H??? v?? t??n</th>
//                             <th>Email</th>
//                             <th>Phone</th>
//                             <th>Tr???ng th??i</th>
//                             <th width="5%">S???a</th>
//                             <th width="5%">Xo??</th>
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
//                             Tr?????c
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
//             errors.name.required = 'Vui l??ng nh???p t??n'
//         } else if (name.length < 5) {
//             errors.name.required = 'Vui l??ng nh???p t??n d??i h??n 5 k?? t???'
//         }

//         if (email === "") {
//             errors.email.required = "Vui l??ng nh???p email";
//         } else if (!this.isEmail(email)) {
//             errors.email.email = "Vui l??ng nh???p email h???p l???";

//         }

//         if (phone === "") {
//             errors.phone.required = "Vui l??ng nh???p s??? ??i???n tho???i";
//         } else if (!this.isEmail(phone)) {
//             errors.phone.phone = "Vui l??ng nh???p s??? ??i???n tho???i h???p l???";

//         }

//         if(status !== 0 || status !== 1 ) {
//             errors.status.required = "Tr???ng th??i kh??ng h???p l???";
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
//         if (window.confirm("B???n c?? ch???c ch???n mu???n xo?? kh??ng?")) {
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
//                     K??ch ho???t
//                 </button>
//             ) : (
//                 <button type="button" className="btn btn-danger">
//                     Ch??a k??ch ho???t
//                 </button>
//             );

//             const editBtn = (
//                 <a href="#"
//                     onClick={
//                         this.openModal
//                     }
//                     className="btn btn-warning">
//                     S???a
//                 </a>
//             );

//             const deleteBtn = (
//                 <a onClick={e => {
//                     e.preventDefault()
//                     this.handleDeleteCtm(id)
//                 }} href="#" className="btn btn-danger">
//                     Xo??
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
//                 <h1 className='text-center'>Danh s??ch kh??ch h??ng</h1>
//                 <a href="#" onClick={this.openModal} className="btn btn-primary mb-3">Th??m m???i</a>
//                 <Modal show={this.state.showModal} onHide={this.closeModal}>
//                     <Modal.Header closeButton>
//                         <Modal.Title>Th??m kh??ch h??ng</Modal.Title>
//                     </Modal.Header>
//                     <Modal.Body>
//                         <div className="modal-body">
//                             <form action="" className="form-add" onSubmit={this.handleCreacte}>
//                                 <div className="mb-3">
//                                     <label htmlFor="">T??n</label>
//                                     <input name="name" type="text" className="form-control" placeholder="T??n..."
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
//                                     <label htmlFor="">Tr???ng th??i</label>
//                                     <select name="status" className="form-select" onChange={this.handleChangeFormAdd}>
//                                         <option value="0">Ch??a k??ch ho???t</option>
//                                         <option value="1">K??ch ho???t</option>
//                                     </select>
//                                 </div>
//                                 <Button variant="secondary" className='me-3' onClick={this.closeModal}>
//                                     Close
//                                 </Button>
//                                 <Button variant="primary" type='submit'>
//                                     Th??m m???i
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
//                                 <option value={"all"}>T???t c??? tr???ng th??i</option>
//                                 <option value={"active"}>K??ch ho???t</option>
//                                 <option value={"inactive"}>Ch??a k??ch ho???t</option>
//                             </select>
//                         </div>

//                         <div className="col-7">
//                             <input
//                                 type={"search"}
//                                 name="keyword"
//                                 className="form-control"
//                                 placeholder="T??? kho?? t??m ki???m..."
//                                 onChange={this.handleChange}
//                             />
//                         </div>

//                         <div className="col-2 d-grid">
//                             <button type="submit" className="btn btn-primary">
//                                 T??m ki???m
//                             </button>
//                         </div>
//                     </div>
//                 </form>
//                 <hr />
//                 <table className="table table-bordered">
//                     <thead>
//                         <tr>
//                             <th width="5%">STT</th>
//                             <th>T??n</th>
//                             <th>Email</th>
//                             <th>??i???n tho???i</th>
//                             <th>Tr???ng th??i</th>
//                             <th width="5%">S???a</th>
//                             <th width="5%">Xo??</th>
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
// C??c b?????c x??y d???ng t??nh n??ng ph??n trang
// => Ph???n 1: Render danh s??ch
// 1. X??c ?????nh ???????c s??? b???n ghi tr??n 1 trang (config)
// 2. G???i tham s??? _limit v?? _page v??o API => Gi???i h???n s??? l?????ng b???n ghi tr??n 1 trang (Render customer)
// => Ph???n 2: Render ph??n trang
// 3. L???y t???ng s??? b???n ghi => L???y t??? API
// 4. T??nh t???ng s??? trang: Math.ceil(t???ng s??? b???n ghi / s??? b???n ghi tr??n 1 trang)
// 5. Render danh s??ch trang
// 6. Chuy???n trang khi click v??o v??o s??? trang
// */