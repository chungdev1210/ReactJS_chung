import React, { Component, createRef } from "react";

export class CheckAll extends Component {
    constructor() {
        super();

        this.state = {
            customers: ["Item 1", "Item 2", "Item 3", "Item 4"],
            deleteCount: 0
        };

        this.checkAllRef = createRef();
        this.checkItemRef = [];
    }

    handleCheckAll = (e) => {
        const checkAllStatus = e.target.checked;

        this.checkItemRef.forEach(checkItem => {
            checkItem.current.checked = checkAllStatus;
        })


        this.setState({
            deleteCount: checkAllStatus ? this.checkItemRef.length : 0
        })
    };

    handleCheckItem = (e) => {
        const checkItemStatus = e.target.checked;

        if (!checkItemStatus) {
            this.checkAllRef.current.checked = false;
            this.setState({
                deleteCount: this.state.deleteCount - 1
            })
            return; //Thoát hàm
        }

        let count = 0;
        const status = this.checkItemRef.every(checkItem => {
            if (checkItem.current.checked) {
                count++;
                return true;
            }

            return false;
        });

        this.checkAllRef.current.checked = status;

        this.setState({
            deleteCount: count
        })
    }

    render() {
        /*
        const a = b && 'Tech2'
        const a = b ?? 'Tech2'
        */
        const { customers, deleteCount } = this.state;
        this.checkItemRef = [];
        const disabled = { disabled: deleteCount > 0 ? false : true }
        return (
            <div style={{ margin: "3%" }}>
                <p>
                    <input type={"checkbox"} ref={this.checkAllRef} onChange={this.handleCheckAll} /> Check All
                </p>
                {customers.map((customer, index) => {
                    this.checkItemRef.push(createRef());
                    return (
                        <p key={index}>
                            <input ref={this.checkItemRef[index]} type={"checkbox"} onChange={this.handleCheckItem} /> {customer}
                        </p>
                    )
                })}

                <button type="button" {...disabled}>
                    Xoá đã chọn ({deleteCount})
                </button>
            </div>
        );
    }
}

export default CheckAll;