import React, { Fragment } from 'react'

export default function Pagination({customers}) {

    const itemPerPage = 5;
    const currentPage = 1;
    const start = 0;
    const end = itemPerPage;

    var totalPage = Math.ceil(customers.length / itemPerPage);

    const getCurrentPage = (currentPage) => {
        start = (currentPage - 1) * itemPerPage;
        end = currentPage * itemPerPage;
    }

    return (
        <>
            <div class="pagination d-flex justify-content-center">
                <nav aria-label="...">
                    <ul class="pagination">
                    
                    </ul>
                </nav>
            </div>
        </>
    )
}
