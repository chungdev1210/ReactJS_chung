import React, { Component } from 'react'
import config from './config.json';
import "bootstrap/dist/css/bootstrap.min.css";
import Pagination from './Pagination';

export class Lifecycle01 extends Component {

    constructor() {
        super();
        this.state = {
            products: [],
            customers: [],
            isLoading: true
        }
    }
    componentDidMount = () => {
        const { SERVER_API } = config;
        fetch(`${SERVER_API}/customers`)
            .then(response => response.json())
            .then((customers) => {
                // console.log(customers);
                this.setState({
                    customers: customers,
                    isLoading: false
                })
            })
    }

    render() {
        const itemPerPage = 5;
        const currentPage = 1;
        const start = 0;
        const end = itemPerPage;
        const { customers, isLoading } = this.state;
        return (
            <>
                {
                    isLoading
                    ?
                    <p className='alert alert-primary text-center'>Đang tải dữ liệu</p>
                    :
                    <>
                    <div className='container mt-5'>
                        <div className='row'>
                            <table className='table table-bordered'>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        customers.map((customer, index) => {
                                            if (index >= start && index < end) {
                                                return (
                                                    <tr>
                                                        <td>{customer.id}</td>
                                                        <td>{customer.name}</td>
                                                        <td>{customer.email}</td>
                                                        <td>{customer.phone}</td>
                                                    </tr>
                                                )
                                            }
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <Pagination customers={customers}/>
                    </> 
                }
            </>
        )
    }
}

/* Thứ tự chạy
1. Contructor
2. render
3. componentDidMount()
4. componentDidUpdate() => chạy từ lần thứ 2 trở đi
5. componentWillUnmount() 
 */

export default Lifecycle01