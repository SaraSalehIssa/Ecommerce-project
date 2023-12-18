import axios from 'axios';
import React from 'react'
import { useQuery } from 'react-query';

function Order() {
  const getOrder = async () => {
    try {
      const token = localStorage.getItem("userToken");
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/order`,
        { headers: { Authorization: `Tariq__${token}` } });
      return data.orders;
    } catch (error) {
      console.log(error);
    }
  }

  const { data } = useQuery('order', getOrder);
  console.log(data);

  return (
    <div className='container products'>
      <div className="row">
        {data.length !== 0 && data.map((order, index) => (
          <div key={index}>
            <h2 className='text-capitalize'>order {index}</h2>
            <table className="table">
              <thead>
                <tr className='text-center text-capitalize'>
                  <th scope="col">order ID</th>
                  <th scope="col">address</th>
                  <th scope="col">coupon name</th>
                  <th scope="col">phone</th>
                  <th scope="col">created at</th>
                  <th scope="col">final price</th>
                  <th scope="col">payment type</th>
                  <th scope="col">status</th>
                </tr>
              </thead>
              <tbody>
                <tr className='text-center text-capitalize'>
                  <td>{order._id}</td>
                  <td>{order.address}</td>
                  <td>{order.couponName}</td>
                  <td>{order.phoneNumber}</td>
                  <td>{order.createdAt}</td>
                  <td>{order.finalPrice} $</td>
                  <td>{order.paymentType}</td>
                  <td>{order.status}</td>
                </tr>
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Order