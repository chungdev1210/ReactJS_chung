import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import Footer from "./Components/Footer";
import Content from "./Components/Content";
import MemberInfo from "./Components/MemberInfo";
import Counter from "./Components/Counter";
import Login from "./Components/Form/Login";
import Toggle from "./Components/Toggle/Toggle";
import ConvertCurrency from "./Components/ConvertCurrency";
import Lifecycle01 from "./Components/Lifecycle/Lifecycle01";
import Customer from "./Components/CRUD/Customer";
function App() {

    // const member = {
    //     info: {
    //         name: 'Hoàng An',
    //         email: 'hoangan.web@gmail.com',
    //         phone: '0388875179'
    //     },

    //     images: [
    //         {
    //             link: 'https://picsum.photos/500/300',
    //             height: 200,
    //             alt: 'Ảnh 1'
    //         },

    //         {
    //             link: 'https://picsum.photos/500/300',
    //             width: 350,
    //             height: 250
    //         },

    //         {
    //             link: 'https://picsum.photos/500/300',
    //             width: 400,
    //             height: 350
    //         }
    //     ],

    //     posts: [
    //         {
    //             title: 'Bài viết 1',
    //             content: 'Nội dung 1'
    //         },

    //         {
    //             title: 'Bài viết 2',
    //             content: 'Nội dung 2'
    //         },

    //         {
    //             title: 'Bài viết 3',
    //             content: 'Nội dung 3'
    //         },

    //         {
    //             title: 'Bài viết 4',
    //             content: 'Nội dung 4'
    //         }
    //     ]
    // }
    
    return (
        <>
            <Customer />
        </>
    );
}

export default App;