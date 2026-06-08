import React, { useState } from "react";
import { createOrder } from "../../services/order.service";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  ArrowBigLeft,
  ArrowLeft,
  Car,
  Check,
  CreditCard,
  Gauge,
  MapPinPlusInsideIcon,
  QrCode,
  Settings,
  Truck,
  User,
  Wallet,
  Landmark,
  Info,
  ArrowRight,
  ShieldCheck,
  X,
  LocateFixed,
} from "lucide-react";
import Card from "../../components/common/Card";
import boy from "../../assets/boy.jpg";
import Modal from "../../components/common/Modal";
import {
  addUserAddress,
  deleteAddress,
  getUserAddress,
  updateAddress,
} from "../../services/address.service";
import { useEffect } from "react";
import { getCartItems } from "../../services/cart.service";
import Navbar from "../../components/layout/Navbar";

function Checkout() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullname: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    country: "India"
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [deliveryMethod, setDeliveryMethod] = useState({
    type:"Standard Delivery",
    price:40,
  });
  const [isPaymentMethod, setIsPaymentMethod] = useState("COD");
  const [cartItems, setCartItems] = useState([]);
  const [cartData, setCartData] = useState();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

    const handleCreateOrder = async (e) => {
      try {
        e.preventDefault();
        const data = await createOrder({
            ...formData,
            deliveryMethod:deliveryMethod.type,
            isPaymentMethod
        });
        // alert("Order Placed Successfully!");
        toast.success(data.message);
        navigate("/home");

      } catch (e) {
        console.log(e);
        toast.error(e.response.data.message);
      }
    };

  const handleEditAddress = (address) => {
    // store selected Address
    setSelectedAddress(address);

    // set old value
    setFormData({
      fullname: address.fullname,
      phone: address.phone,
      address: address.address,
      city: address.city,
      state: address.state,
      pincode: address.pincode,
      country: address.country,
    });

    setModalOpen(true);
  };

  const handleAddUserAddress = async (e) => {
    try {
      e.preventDefault();

      if (selectedAddress) {
        const res = await updateAddress(selectedAddress._id, formData);

        toast.success(res.message);
      } else {
        const res = await addUserAddress(formData);

        toast.success(res.message);
      }

      setModalOpen(false);
      setSelectedAddress(null);
      setFormData({
        fullname: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
        country: "India",
      });
      await fetchUserAddress();
    } catch (e) {
      console.log(e);
      toast.error(e.response.data.message);
    }
  };

  const fetchUserAddress = async () => {
    try {
      const data = await getUserAddress();
      setAddresses(data);
    } catch (e) {
      console.log(e);
      toast.error(e.response.data.message);
    }
  };

  const fetchCartItems = async () => {
    try{
        const res = await getCartItems();
         setCartData(res.cart);
         setCartItems(res.cart?.items);
    } catch(e){
        console.log(e);
        toast.error(e.response.data.message);
    }
  }

  useEffect(() => {
    fetchUserAddress();
    fetchCartItems();
  }, []);

  const handleModalOpen = () => {
    setModalOpen(true);

    setSelectedAddress(null);

    setFormData({
        fullname:"",
        phone:"",
        city:"",
        state:"",
        pincode:"",
        country:"",
        address:""
    });
  };

  // delete address
  const handleDeleteAddress = async (id) => {
    try {
      const res = await deleteAddress(id);
      toast.success(res.message);
      await fetchUserAddress();
    } catch (e) {
      console.log(e);
      toast.error(e.response.data.message);
    }
  };

  const paymentMethods = [
    {
        id: 1,
      icon: <QrCode />,
      title: "UPI/QR",
      method: "UPI/QR"
    },
    {
        id: 2,
      icon: <CreditCard />,
      title: "Card",
      method:'Card'
    },
    {
        id: 3,
      icon: <Landmark />,
      title: "Net Banking",
      method:'Net Banking'
    },
    
  ];

  return (
    // <div>
    //   <form onSubmit={handleCreateOrder}>
    //     <div>
    //         <label htmlFor="">Full Name</label> <br /><br />
    //         <input type="text" name='fullname' onChange={handleChange} placeholder='FullName' /> <br />
    //     </div>
    //     <div>
    //         <label htmlFor="">Phone</label> <br /><br />
    //         <input type="text" name='phone' onChange={handleChange} placeholder='Phone' /> <br />
    //     </div>
    //     <div>
    //         <label htmlFor="">Address</label> <br /><br />
    //         <input type="text" name='address' onChange={handleChange} placeholder='Address' /> <br />
    //     </div>
    //     <div>
    //         <label htmlFor="">City</label> <br /><br />
    //         <input type="text" name='city' onChange={handleChange} placeholder='City' /> <br />
    //     </div>
    //     <div>
    //         <label htmlFor="">State</label> <br /><br />
    //         <input type="text" name='state' onChange={handleChange} placeholder='State' /> <br />
    //     </div>
    //     <div>
    //         <label htmlFor="">Pincode</label> <br /><br />
    //         <input type="text" name='pincode' onChange={handleChange} placeholder='Pincode' /> <br />
    //     </div>
    //     <div>
    //         <label htmlFor="">Country</label> <br /><br />
    //         <input type="text" name='country' onChange={handleChange} placeholder='Country' /> <br />
    //     </div>
    //     <br />
    //     <button type='submit'>Place Order</button>
    //   </form>
    // </div>

    <div className="h-screen w-[100%] overflow-y-auto">
      {/* <Navbar/> */}
      <main className="grid grid-cols-12 bg-red-50 py-6">
        <div className=" h-full  col-span-8">
          <div className="flex justify-between items-center py-8 px-14">
            <div className="flex flex-col justify-center items-center gap-1">
              <div className="h-[35px] w-[35px] border-2 rounded-full border-red-900 flex justify-center items-center text-xl font-medium text-red-900 bg-red-900">
                <Check size={20} color="white" />
              </div>
              <p className="text-[10px] font-semibold text-red-900">SHIPPING</p>
            </div>
            <div className="h-[1.5px] w-[150px] bg-red-900"></div>
            <div className="flex flex-col justify-center items-center gap-1">
              <div className="h-[35px] w-[35px] border-2 rounded-full border-red-900 flex justify-center items-center text-xl font-medium text-red-900">
                2
              </div>
              <p className="text-[10px] font-semibold text-red-900">DELIVERY</p>
            </div>
            <div className="h-[1.5px] w-[150px] bg-red-900"></div>
            <div className="flex flex-col justify-center items-center gap-1">
              <div className="h-[35px] w-[35px] border-2 rounded-full border-red-900 flex justify-center items-center text-xl font-medium text-red-900">
                3
              </div>
              <p className="text-[10px] font-semibold text-red-900">PAYMENT</p>
            </div>
          </div>
          <Card>
            <Card.Header icon={<Truck />} title="Shipping Address">
              <button className="text-red-900 font-medium">Change</button>
            </Card.Header>
            <Card.Body className="grid grid-cols-12 gap-4">
              {addresses.length > 0 ? (
                addresses.map((address) => (
                  <div
                    key={address._id}
                    className="col-span-6 border-2 border-red-900 rounded-lg p-4 min-h-[40px] flex flex-col gap-1 relative"
                  >
                    <h1 className="text-lg font-light text">
                      {address.fullname}
                    </h1>
                    <p className="text-sm">{address.address}</p>
                    <span className="text-md font-semibold">
                      {address.phone}
                    </span>
                    <span
                      onClick={() => handleEditAddress(address)}
                      className="text-xs font-semibold absolute top-1 right-20 border border-green-600  text-green-600 rounded-tr-md rounded-bl-md px-4 py-1 bg-green-600/10 cursor-pointer"
                    >
                      Edit
                    </span>
                    <span
                      onClick={() => handleDeleteAddress(address._id)}
                      className="text-xs font-semibold absolute top-1 right-1 text-red-900 border border-red-900 rounded-tr-md rounded-bl-md px-4 py-1 bg-red-900/10 cursor-pointer"
                    >
                      Delete
                    </span>
                  </div>
                ))
              ) : (
                <div className="col-span-6 border-2 border-red-900 rounded-lg p-4 min-h-[40px] flex flex-col gap-1 relative">
                  <h1 className="text-lg font-light text">
                    No saved address yet
                  </h1>
                  <p className="text-sm">
                    Add a delivery address now to continue with checkout.
                  </p>
                  <span className="text-xs font-semibold absolute top-0 right-0 bg-red-900 rounded-tr-md rounded-bl-md px-4 py-1 text-white ">
                    Default
                  </span>
                </div>
              )}

              <div
                onClick={handleModalOpen}
                className="col-span-6 border border-red-900/50 rounded-lg border-dashed flex flex-col justify-center items-center text-gray-500 cursor-pointer"
              >
                <MapPinPlusInsideIcon />
                <p className="text-sm font-normal">Add New Address</p>
              </div>
              {modalOpen ? (
                <Modal onClose={setModalOpen}>
                  <Modal.Header className={``}>
                    <h1 className="text-xl font-semibold">
                        {
                            selectedAddress? "Update Address" : "Add New Address"
                        }
                    </h1>
                    <div
                      onClick={() => setModalOpen(false)}
                      className="flex justify-center items-center hover:bg-gray-300 p-2 rounded-lg cursor-pointer transition-all duration-300 ease-in"
                    >
                      <X />
                    </div>
                  </Modal.Header>
                  <Modal.Body className={`px-6 py-4`}>
                    <div className="flex border border-red-900 rounded-lg justify-center items-center p-2 bg-red-900/10 text-red-900 gap-2">
                      <LocateFixed />
                      <p className="text-lg">Use Current Location</p>
                    </div>
                    <form
                      onSubmit={handleAddUserAddress}
                      className="py-4 flex flex-col  justify-between gap-4"
                    >
                      <div className="flex flex-col gap-2">
                        <div className="flex gap-4">
                          <div className="flex-1">
                            <label
                              htmlFor="fullname"
                              className="text-sm font-semibold"
                            >
                              Full Name
                            </label>
                            <input
                              className=" w-full border p-2 rounded-md border-red-900/25"
                              id="fullname"
                              type="text"
                              name="fullname"
                              value={formData.fullname}
                              onChange={handleChange}
                              placeholder="FullName"
                            />
                            <br />
                          </div>
                          <div className="flex-1">
                            <label
                              htmlFor="phone"
                              className="text-sm font-semibold"
                            >
                              Phone
                            </label>
                            <input
                              className=" w-full border p-2 rounded-md border-red-900/25"
                              id="phone"
                              type="text"
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              placeholder="Phone"
                            />
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <div className="flex-1">
                            <label
                              htmlFor="city"
                              className="text-sm font-semibold"
                            >
                              City
                            </label>
                            <input
                              className=" w-full border p-2 rounded-md border-red-900/25"
                              id="city"
                              type="text"
                              name="city"
                              value={formData.city}
                              onChange={handleChange}
                              placeholder="City"
                            />
                          </div>
                          <div className="flex-1">
                            <label
                              htmlFor="state"
                              className="text-sm font-semibold"
                            >
                              State
                            </label>
                            <input
                              className=" w-full border p-2 rounded-md border-red-900/25"
                              id="state"
                              type="text"
                              name="state"
                              value={formData.state}
                              onChange={handleChange}
                              placeholder="State"
                            />
                            <br />
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <div className="flex-1">
                            <label
                              htmlFor="pincode"
                              className="text-sm font-semibold"
                            >
                              Pincode
                            </label>
                            <input
                              className=" w-full border p-2 rounded-md border-red-900/25"
                              id="pincode"
                              type="text"
                              name="pincode"
                              value={formData.pincode}
                              onChange={handleChange}
                              placeholder="Pincode"
                            />
                          </div>
                          <div className="flex-1">
                            <label
                              htmlFor="country"
                              className="text-sm font-semibold"
                            >
                              Country
                            </label>
                            <input
                              className=" w-full border p-2 rounded-md border-red-900/25"
                              id="country"
                              type="text"
                              name="country"
                              value={formData.country}
                              onChange={handleChange}
                              placeholder="Country"
                            />
                          </div>
                        </div>
                        <div className="flex flex-col">
                          <label
                            htmlFor="address"
                            className="text-sm font-semibold"
                          >
                            House No/Building/Road
                          </label>
                          <textarea
                            className=" w-full border p-2 rounded-md border-red-900/25"
                            rows={4}
                            id="address"
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            placeholder="Address"
                          />
                        </div>
                      </div>

                      <div className="border-t border-red-900/20 -mx-6 flex justify-center items-center ">
                      <button
                          className="text-lg bg-red-900 w-full mx-6 rounded-lg p-2 text-white font-semibold mt-6"
                          type="submit"
                        >
                          {
                            selectedAddress? "Update Address" : "Save Address "
                          }
                        </button>
                      </div>
                    </form>
                  </Modal.Body>
                </Modal>
              ) : (
                ""
              )}
            </Card.Body>
          </Card>

          <Card className="mt-4">
            <Card.Header icon={<Gauge />} title="Delivery Method"></Card.Header>
            <Card.Body className="flex flex-col gap-4">
              <div onClick={()=> setDeliveryMethod({
                type:"Standard Delivery",
                price:40
              })} className={`flex justify-between items-center transition-all duration-200 ease-in cursor-pointer bg-white mx-4 p-4 rounded-lg border border-red-900/25 ${deliveryMethod.type === "Standard Delivery" ? `!border-red-900  !bg-red-900/5`:`hover:border-red-900 hover:bg-red-900/5`}`}>
                <div className="flex items-center gap-4">
                  <div className="flex justify-center items-center">
                    <input
                      className="h-[20px] w-[20px] bg-red-900"
                      type="radio"
                      name="delivery"
                      checked={deliveryMethod.type === "Standard Delivery"}
                      readOnly
                    />
                  </div>
                  <div>
                    <h1 className="text-lg font-light">Standard Delivery</h1>
                    <p className="text-sm">
                      Estimated arrival: 4-6 business days
                    </p>
                  </div>
                </div>
                <div className="text-lg font-semibold">&#8377;40</div>
              </div>
              <div onClick={()=> setDeliveryMethod({
                type:"Express Delivery",
                price:150
              })} className={`flex justify-between items-center  transition-all duration-200 ease-in cursor-pointer bg-white mx-4 p-4 rounded-lg border border-red-900/25 ${deliveryMethod.type === "Express Delivery" ? `!border-red-900  !bg-red-900/5`:`hover:border-red-900 hover:bg-red-900/5`}`}>
                <div className="flex items-center gap-4">
                  <div className="flex justify-center items-center">
                    <input
                      className="h-[20px] w-[20px] bg-red-900"
                      type="radio"
                      name="delivery"
                      checked={deliveryMethod.type === "Express Delivery"}
                      readOnly
                    />
                  </div>
                  <div>
                    <h1 className="text-lg font-light">Express Delivery</h1>
                    <p className="text-sm">
                      Estimated arrival: 1-2 business days
                    </p>
                  </div>
                </div>
                <div className="text-lg font-semibold">&#8377;150</div>
              </div>
            </Card.Body>
          </Card>
          <Card className={`mt-4`}>
            <Card.Header
              icon={<Wallet />}
              title={`Payment Method`}
            ></Card.Header>
            <Card.Body>
              <div className="grid grid-cols-3" aria-disabled>
                {paymentMethods.map((paymentMethod) => (
                  <div
                    key={paymentMethod.id}
                  onClick={()=> setIsPaymentMethod(paymentMethod.method)}
                    className={`flex flex-col justify-center items-center gap-2 mx-4 p-4 rounded-lg border border-red-900/25 transition-all duration-200 ease-in cursor-pointer ${isPaymentMethod === paymentMethod.method ? "text-red-900 !border-red-900 bg-red-900/5" :"hover:text-red-900 bg-white hover:border-red-900"}`}
                  >
                    {paymentMethod.icon}
                    <h1 className="text-md font-medium ">
                      {paymentMethod.title}
                    </h1>
                  </div>
                ))}
              </div>
              <Card className={`mt-4 bg-red-900/5 flex flex-col gap-2`}>
                <h1 className="text-sm font-semibold text-red-900">UPI ID</h1>
                <div className="flex gap-4">
                  <input
                    className="flex-1 px-4 py-2 text-sm font-light rounded-lg border border-red-900/25"
                    type="text"
                    placeholder="example@okhdfcbank"
                  />
                  <button className="bg-gray-600 text-white px-4 rounded-lg font-medium">
                    Verify
                  </button>
                </div>
                <p className="flex gap-2 text-sm font-light items-center italic text-gray-500">
                  <Info size={16} /> A payment request will be sent to your UPI
                  app.
                </p>
              </Card>
            </Card.Body>
          </Card>
          {/* <div className='bg-white mx-4 p-4 rounded-lg border border-red-900/25'>
                    
                </div> */}
          <div></div>
        </div>
        <div className="flex-1 h-full col-span-4">
          <Card className={`h-fit !p-0`}>
            <Card.Header
              title={`ORDER SUMMARY`}
              className="bg-red-900/10 p-4 border-b border-red-900/25"
            />
            <Card.Body className={`bg-white p-4`}>
                {
                    cartItems?.map((cartItem)=>(
                        <div key={cartItem?.product?._id} className="flex gap-2 mb-2">
                <img
                  className="h-[70px] w-[70px] rounded-lg"
                  src={cartItem?.product?.image}
                  alt=""
                />
                <div>
                  <h1 className="text-md font-medium line-clamp-1">{cartItem?.product?.name}</h1>
                  <p className="text-sm font-light line-clamp-1">Qty:{cartItem?.quantity} {cartItem?.product?.description}</p>
                  <span className="text-sm font-medium text-red-900">
                    &#8377;{cartItem?.price}
                  </span>
                </div>
              </div>
                    ))
                }
              {/* <div className="flex gap-2 mb-2">
                <img
                  className="h-[70px] w-[70px] rounded-lg"
                  src={boy}
                  alt=""
                />
                <div>
                  <h1 className="text-md font-medium">Hand-Woven Clay Pot</h1>
                  <p className="text-sm font-light">Qty:1 Brown Terracotta</p>
                  <span className="text-sm font-medium text-red-900">
                    &#8377;1,250.00
                  </span>
                </div>
              </div>
              <div className="flex gap-2 mb-2">
                <img
                  className="h-[70px] w-[70px] rounded-lg"
                  src={boy}
                  alt=""
                />
                <div>
                  <h1 className="text-md font-medium">Hand-Woven Clay Pot</h1>
                  <p className="text-sm font-light">Qty:1 Brown Terracotta</p>
                  <span className="text-sm font-medium text-red-900">
                    &#8377;1,250.00
                  </span>
                </div>
              </div> */}
              <div className=" border-t-2 py-4 border-red-900/25">
                <div className="flex justify-between">
                  <span className="text-sm font-normal text-gray-600">
                    Subtotal
                  </span>
                  <span className="text-sm font-normal text-gray-600">
                    &#8377;{cartData?.totalPrice }
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-normal text-gray-600">
                    Shipping Fee &#40;{deliveryMethod.type}&#41;
                  </span>
                  <span className="text-sm font-normal text-gray-600">
                    &#8377;{deliveryMethod.price}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-normal text-gray-600">
                    Tax &#40;GST 18%&#41;
                  </span>
                  <span className="text-sm font-normal text-gray-600">
                    &#8377;{(cartData?.totalPrice * 18)/100}
                  </span>
                </div>
              </div>
              <div className="border-t-2 py-4 border-red-900/25 border-dashed">
                <div>
                  <h1 className="flex justify-between text-lg font-bold">
                    Total{" "}
                    <span className="text-xl text-red-900">
                      &#8377;{cartData?.totalPrice + deliveryMethod.price + Number(`${(cartData?.totalPrice * 18)/100}`)}
                    </span>
                  </h1>
                </div>
                <button onClick={handleCreateOrder} className="flex justify-center items-center w-full mt-4 bg-orange-500 rounded-lg py-2 text-lg">
                  Place Order <ArrowRight />
                </button>
              </div>
            </Card.Body>
            <Card.Footer className="bg-red-900/10 p-4 border-t border-red-900/25">
              <p className="flex gap-1 justify-center items-center text-xs font-normal text-gray-500">
                <ShieldCheck size={14} /> SECURE ENCRYPTED PAYMENT
              </p>
            </Card.Footer>
          </Card>
        </div>
      </main>
    </div>
  );
}

export default Checkout;
