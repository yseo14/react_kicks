import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Nav from 'react-bootstrap/Nav';
import { addItem } from "../store";
import { useDispatch } from "react-redux";
// import data from "./data.js";

// let Btn = styled.button`
//     background:${props=>props.bg};
//     color:${props=>props.bg=='blue'? 'white':'black'};
//     padding:10px;
// `

function Detail(props) {

    let [visible, setVisible] = useState(true);
    let { id } = useParams();
    let found = props.shoes.find(function (a) { return a.id == id });
    let [num, setNum] = useState();
    let [tab, setTab] = useState(0);
    let [fade, setFade] = useState();
    let dispatch = useDispatch();

    // useEffect(() => {   //2초후 없어짐
    //     let a =setTimeout(() => { setVisible(false)}, 2000)
    //     return()=>{
    //         clearTimeout(a);
    //     }
    // }, [])
    // useEffect(()=>{
    //     if(isNaN(num)==true){
    //         alert('숫자를 입력하세요');
    //     }
    // },[num])
    useEffect(() => {
        setTimeout(() => { setFade('end'); }, 100)
        return () => {
            setFade('');
        }
    }, [])
    useEffect(() => {
        let get = localStorage.getItem('watched');
        get = JSON.parse(get);
        get.push(found.id);
        get=new Set(get);
        get=Array.from(get);
        localStorage.setItem('watched', JSON.stringify(get))
    }, [])

    return (
        <div className={`container start ${fade}`} >
            {
                visible == true
                    ? <div className="alert alert-warning">
                        2초이내 구매시 할인
                    </div>
                    : null
            }
            <div className="row">
                <div className="col-md-6">
                    <img src={found.img} width="100%" />
                </div>
                <div className="col-md-6">
                    <h4 className="pt-5">{found.title}</h4>
                    <p>{found.content}</p>
                    <p>{found.price}원</p>
                    <input onChange={(e) => setNum(e.target.value)} />
                    <button style={{ margin: '5px' }} className="btn btn-danger" onClick={() => {
                        dispatch(addItem({ id: found.id, name: found.title, count: 1 }));
                    }}>주문하기</button>
                </div>
            </div>

            <Nav fill variant="tabs" defaultActiveKey="link-0" >
                <Nav.Item>
                    <Nav.Link eventKey="link-0" onClick={() => setTab(0)}>탭0</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-1" onClick={() => setTab(1)}>탭1</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-2" onClick={() => setTab(2)}>탭2</Nav.Link>
                </Nav.Item>
            </Nav>

            <TabContent tab={tab} />

        </div>)
}

function TabContent({ tab }) {
    let [fade, setFade] = useState();
    useEffect(() => {
        setTimeout(() => { setFade('end'); }, 100)
        return () => {
            setFade('');
        }
    }, [tab])

    return <div className={`start ${fade}`}>
        {[<div>내용0</div>, <div>내용1</div>, <div>내용2</div>][tab]}
    </div>
}

export default Detail;