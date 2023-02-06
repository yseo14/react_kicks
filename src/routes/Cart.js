import { Table } from 'react-bootstrap'
import { DEFAULT_BREAKPOINTS } from 'react-bootstrap/esm/ThemeProvider'
import { useDispatch, useSelector } from 'react-redux';
import { changeName, increase } from './../store/userSlice.js';
import { increaseCart } from './../store.js';
function Cart() {
    let state = useSelector((state) => state)
    let dispatch = useDispatch()
    return (
        <div>
            {state.user.name} {state.user.age}의 장바구니
            <button onClick={() => {
                dispatch(increase(100));
            }}>age</button>
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>상품명</th>
                        <th>수량</th>
                        <th>변경하기</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        state.cart.map(function (a, i) {
                            return (
                                <tr key={i}>
                                    <td>{i}</td>
                                    <td>{state.cart[i].name}</td>
                                    <td>{state.cart[i].count}</td>
                                    <td>
                                        <button onClick={() => {
                                            dispatch(increaseCart(state.cart[i].id));
                                        }}>+</button>
                                    </td>
                                </tr>)
                        })
                    }
                </tbody>

            </Table>
        </div>
    )
}


export default Cart;