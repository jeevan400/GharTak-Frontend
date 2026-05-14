import React, { useState } from 'react'
import { createOrder } from '../../services/order.service';
import { useNavigate } from 'react-router-dom';

function Checkout() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullname:"",
        phone:"",
        address:"",
        city:"",
        state:"",
        pincode:"",
        country:"India"
    });

    const handleChange = (e)=>{
        setFormData({
            ...formData, 
            [e.target.name]:e.target.value
        });
    }

    const handleCreateOrder = async (e) => {
        try{
            e.preventDefault();
            const data = await createOrder(formData);
        alert("Order Placed Successfully!");
            navigate("/home");
        } catch(e){
            console.log(e);
        }
    }
  return (
    <div>
      <form onSubmit={handleCreateOrder}>
        <div>
            <label htmlFor="">Full Name</label> <br /><br />
            <input type="text" name='fullname' onChange={handleChange} placeholder='FullName' /> <br />
        </div>
        <div>
            <label htmlFor="">Phone</label> <br /><br />
            <input type="text" name='phone' onChange={handleChange} placeholder='Phone' /> <br />
        </div>
        <div>
            <label htmlFor="">Address</label> <br /><br />
            <input type="text" name='address' onChange={handleChange} placeholder='Address' /> <br />
        </div>
        <div>
            <label htmlFor="">City</label> <br /><br />
            <input type="text" name='city' onChange={handleChange} placeholder='City' /> <br />
        </div>
        <div>
            <label htmlFor="">State</label> <br /><br />
            <input type="text" name='state' onChange={handleChange} placeholder='State' /> <br />
        </div>
        <div>
            <label htmlFor="">Pincode</label> <br /><br />
            <input type="text" name='pincode' onChange={handleChange} placeholder='Pincode' /> <br />
        </div>
        <div>
            <label htmlFor="">Country</label> <br /><br />
            <input type="text" name='country' onChange={handleChange} placeholder='Country' /> <br />
        </div>
        <br />
        <button type='submit'>Place Order</button>
      </form>
    </div>
  )
}

export default Checkout
