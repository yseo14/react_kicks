import logo from './logo.svg';
import './App.css';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { createContext, useEffect, useState } from 'react';
import data from './data.js';
import detail from './routes/Detail.js';
import { Route, Routes, Link, useNavigate, Outlet } from "react-router-dom";
import Detail from './routes/Detail.js';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Cart from './routes/Cart.js';
import { useQuery } from 'react-query';

let Context1 = createContext();

function App() {

  useEffect(() => {
    if (localStorage.getItem('watched') != null) { return; }
    localStorage.setItem('watched', JSON.stringify([]))
  }, [])

  let [shoes, setShoes] = useState(data);
  let navigate = useNavigate();
  let [visible, setVisible] = useState(true);
  let [btnCount, setBtnCount] = useState(0);
  let [재고] = useState([10, 11, 12]);
  let result = useQuery('작명', () => {
    return axios.get('https://codingapple1.github.io/userdata.json').then((a) => {
      return a.data
    })
  })

  return (

    <div className="App">

      <Navbar className='nav-bar'>
        <Container style={{ margin: '5px' }}>
          <Navbar.Brand href="#home" className='menu'>🏀Kicks🏀</Navbar.Brand>
          <Nav className="me-auto subMenu">
            <Nav.Link onClick={() => { navigate('/'); }} className='menu'>Home</Nav.Link>
            <Nav.Link onClick={() => { navigate('/detail'); }} className='menu'>Detail</Nav.Link>
          </Nav>
          <Nav className='ms-auto'>반가워요 킴</Nav>
        </Container>
      </Navbar>

      {/* <Link to='/'>홈</Link>
      <Link to='/detail'>상세페이지</Link> */}

      <Routes>
        <Route path='/' element={
          <MainPage shoes={shoes} setShoes={setShoes} btnCount={btnCount} setBtnCount={setBtnCount} visible={visible} setVisible={setVisible} />
        } />
        <Route path='/detail/:id' element={<Detail shoes={shoes} />} />
        <Route path="/cart" element={<Cart />} />
        <Route path='/event' element={<Event />}>
          <Route path='one' element={<div>로그인시 적립금 5000원 지급!</div>} />
          <Route path='two' lement={<div>생일기념 쿠폰 받기</div>} />
        </Route>
      </Routes>

    </div>
  );
}

function Card(props) {
  const navigate = useNavigate();
  return (
    <div className="col-md-4" onClick={() => {
      navigate(`detail/${props.i}`)
    }}>
      <img src={props.shoes[props.i].img} width='80%' />
      <h4>{props.shoes[props.i].title}</h4>
      <p>{props.shoes[props.i].price}원</p>
    </div>
  );
}
function MainPage(props) {
  return (
    <>
      <div className='main-bg'>
        <div>

        </div>
      </div>
      <div className="container">
        <div className="row">
          {
            props.shoes.map(function (a, i) {
              return (
                <Card key={i} shoes={props.shoes} i={i} />
              );
            })
          }
        </div>
        {
          props.visible && <Button variant="outline-info" onClick={() => {
            if (props.btnCount == 0) {
              axios.get('https://codingapple1.github.io/shop/data2.json')
                .then((result) => {
                  let copy = [...props.shoes];
                  result.data.map(function (a) {
                    copy.push(a);
                  })
                  props.setShoes(copy);
                  props.setBtnCount(props.btnCount + 1);
                })
                .catch(() => {
                  alert('서버로부터 데이터를 받아오지 못했습니다.')
                })
            }
            else if (props.btnCount == 1) {
              axios.get('https://codingapple1.github.io/shop/data3.json')
                .then((result) => {
                  let copy = [...props.shoes];
                  result.data.map(function (a) {
                    copy.push(a);
                  })
                  props.setShoes(copy);
                  props.setBtnCount(props.btnCount + 1);
                })
                .catch(() => {
                  alert('서버로부터 데이터를 받아오지 못했습니다.')
                })
            }
            else {
              alert('상품이 더 존재하지 않습니다.')
              props.setVisible(false);
            }
          }}>더보기</Button>
        }{' '}

      </div>
    </>
  );
}
function Event() {
  return (
    <div>
      <h4>오늘의 이벤트</h4>
      <Outlet></Outlet>
    </div>
  );
}

export default App;     