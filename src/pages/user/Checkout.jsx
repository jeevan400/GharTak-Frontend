import React, { useState, useEffect } from "react";
import { createOrder } from "../../services/order.service";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  Check,
  CreditCard,
  Gauge,
  MapPinPlusInsideIcon,
  QrCode,
  Truck,
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
    country: "India",
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [deliveryMethod, setDeliveryMethod] = useState({
    type: "Standard Delivery",
    price: 40,
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
        deliveryMethod: deliveryMethod.type,
        isPaymentMethod,
      });
      toast.success(data.message);
      navigate("/home");
    } catch (e) {
      console.log(e);
      toast.error(e.response?.data?.message || "Failed to place order");
    }
  };

  const handleEditAddress = (address) => {
    setSelectedAddress(address);
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
      toast.error(e.response?.data?.message || "Failed to add address");
    }
  };

  const fetchUserAddress = async () => {
    try {
      const data = await getUserAddress();
      setAddresses(data);
    } catch (e) {
      console.log(e);
      toast.error(e.response?.data?.message || "Failed to fetch addresses");
    }
  };

  const fetchCartItems = async () => {
    try {
      const res = await getCartItems();
      setCartData(res.cart);
      setCartItems(res.cart?.items || []);
    } catch (e) {
      console.log(e);
      toast.error(e.response?.data?.message || "Failed to fetch cart");
    }
  };

  useEffect(() => {
    fetchUserAddress();
    fetchCartItems();
  }, []);

  const handleModalOpen = () => {
    setModalOpen(true);
    setSelectedAddress(null);
    setFormData({
      fullname: "",
      phone: "",
      city: "",
      state: "",
      pincode: "",
      country: "",
      address: "",
    });
  };

  const handleDeleteAddress = async (id) => {
    try {
      const res = await deleteAddress(id);
      toast.success(res.message);
      await fetchUserAddress();
    } catch (e) {
      console.log(e);
      toast.error(e.response?.data?.message || "Failed to delete address");
    }
  };

  const paymentMethods = [
    {
      id: 1,
      icon: <QrCode />,
      title: "UPI/QR",
      method: "UPI/QR",
    },
    {
      id: 2,
      icon: <CreditCard />,
      title: "Card",
      method: "Card",
    },
    {
      id: 3,
      icon: <Landmark />,
      title: "Net Banking",
      method: "Net Banking",
    },
  ];

  const gstTax = cartData?.totalPrice ? (cartData.totalPrice * 18) / 100 : 0;
  const orderTotal = (cartData?.totalPrice || 0) + deliveryMethod.price + gstTax;

  return (
    <div className="bg-[var(--bg-main)] min-h-screen pb-12 w-full font-sans text-[var(--text-primary)] overflow-y-auto">
      {/* <Navbar /> */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Progress Steps */}
        <div className="flex justify-center items-center py-8 mb-4 max-w-2xl mx-auto">
          <div className="flex flex-col justify-center items-center gap-2">
            <div className="h-10 w-10 rounded-full flex justify-center items-center bg-[var(--primary)] text-white shadow-md">
              <Check size={20} />
            </div>
            <p className="text-xs font-bold text-[var(--primary)] tracking-wide">SHIPPING</p>
          </div>
          <div className="h-1 w-20 bg-[var(--primary)] rounded-full mx-2"></div>
          <div className="flex flex-col justify-center items-center gap-2">
            <div className="h-10 w-10 rounded-full flex justify-center items-center bg-[var(--primary)] text-white shadow-md">
              <span className="font-bold text-lg">2</span>
            </div>
            <p className="text-xs font-bold text-[var(--primary)] tracking-wide">DELIVERY</p>
          </div>
          <div className="h-1 w-20 bg-[var(--primary)] rounded-full mx-2"></div>
          <div className="flex flex-col justify-center items-center gap-2">
            <div className="h-10 w-10 border-2 rounded-full border-[var(--primary)] flex justify-center items-center text-[var(--primary)] bg-white font-bold text-lg shadow-sm">
              3
            </div>
            <p className="text-xs font-bold text-[var(--primary)] tracking-wide">PAYMENT</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-6">
            
            {/* Shipping Address */}
            <Card className="bg-white shadow-sm border border-gray-100 rounded-2xl overflow-hidden">
              <Card.Header icon={<Truck className="text-[var(--primary)]"/>} title="Shipping Address" className="bg-gray-50/50 p-6 border-b border-gray-100">
                <button onClick={handleModalOpen} className="text-[var(--primary)] hover:opacity-80 font-semibold text-sm">Add New</button>
              </Card.Header>
              <Card.Body className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                {addresses.length > 0 ? (
                  addresses.map((address) => (
                    <div
                      key={address._id}
                      className="border border-gray-200 hover:border-[var(--primary)] rounded-xl p-5 flex flex-col gap-1.5 relative transition-colors shadow-sm bg-white"
                    >
                      <h1 className="text-lg font-bold text-[var(--text-primary)]">
                        {address.fullname}
                      </h1>
                      <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{address.address}, {address.city}, {address.state} {address.pincode}</p>
                      <span className="text-sm font-semibold text-[var(--text-primary)] mt-1">
                        {address.phone}
                      </span>
                      <div className="absolute top-4 right-4 flex gap-2">
                        <button
                          onClick={() => handleEditAddress(address)}
                          className="text-xs font-bold text-blue-600 hover:bg-blue-50 px-3 py-1 rounded-md transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteAddress(address._id)}
                          className="text-xs font-bold text-red-500 hover:bg-red-50 px-3 py-1 rounded-md transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full border-2 border-dashed border-gray-200 rounded-xl p-8 flex flex-col items-center justify-center text-center">
                    <MapPinPlusInsideIcon className="text-gray-400 mb-3" size={32} />
                    <h1 className="text-lg font-semibold text-[var(--text-primary)]">No saved address yet</h1>
                    <p className="text-sm text-[var(--text-secondary)] mt-1">Add a delivery address now to continue with checkout.</p>
                  </div>
                )}
                
                {addresses.length > 0 && (
                  <div
                    onClick={handleModalOpen}
                    className="border-2 border-dashed border-gray-200 hover:border-[var(--primary)] rounded-xl p-5 flex flex-col justify-center items-center text-gray-500 hover:text-[var(--primary)] cursor-pointer transition-colors bg-gray-50/50 hover:bg-[var(--primary-light)]/10"
                  >
                    <MapPinPlusInsideIcon size={28} className="mb-2" />
                    <p className="text-sm font-semibold">Add New Address</p>
                  </div>
                )}

                {modalOpen && (
                  <Modal onClose={setModalOpen}>
                    <Modal.Header className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                      <h1 className="text-xl font-bold text-[var(--text-primary)]">
                        {selectedAddress ? "Update Address" : "Add New Address"}
                      </h1>
                      <button
                        onClick={() => setModalOpen(false)}
                        className="p-2 hover:bg-gray-100 rounded-full text-gray-500 transition-colors"
                      >
                        <X size={20} />
                      </button>
                    </Modal.Header>
                    <Modal.Body className="px-6 py-6 overflow-y-auto">
                      <button className="w-full flex justify-center items-center gap-2 border border-gray-200 hover:border-[var(--primary)] rounded-xl p-3 bg-gray-50 hover:bg-blue-50 text-[var(--primary)] font-semibold transition-colors mb-6">
                        <LocateFixed size={18} />
                        Use Current Location
                      </button>
                      
                      <form onSubmit={handleAddUserAddress} className="flex flex-col gap-5">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="col-span-2 sm:col-span-1">
                            <label htmlFor="fullname" className="block text-sm font-semibold text-[var(--text-primary)] mb-1.5">Full Name</label>
                            <input
                              className="w-full border border-gray-200 focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] outline-none px-4 py-2.5 rounded-xl transition-all"
                              id="fullname"
                              type="text"
                              name="fullname"
                              value={formData.fullname}
                              onChange={handleChange}
                              placeholder="John Doe"
                              required
                            />
                          </div>
                          <div className="col-span-2 sm:col-span-1">
                            <label htmlFor="phone" className="block text-sm font-semibold text-[var(--text-primary)] mb-1.5">Phone Number</label>
                            <input
                              className="w-full border border-gray-200 focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] outline-none px-4 py-2.5 rounded-xl transition-all"
                              id="phone"
                              type="text"
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              placeholder="+91 9876543210"
                              required
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="col-span-2 sm:col-span-1">
                            <label htmlFor="city" className="block text-sm font-semibold text-[var(--text-primary)] mb-1.5">City</label>
                            <input
                              className="w-full border border-gray-200 focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] outline-none px-4 py-2.5 rounded-xl transition-all"
                              id="city"
                              type="text"
                              name="city"
                              value={formData.city}
                              onChange={handleChange}
                              placeholder="Mumbai"
                              required
                            />
                          </div>
                          <div className="col-span-2 sm:col-span-1">
                            <label htmlFor="state" className="block text-sm font-semibold text-[var(--text-primary)] mb-1.5">State</label>
                            <input
                              className="w-full border border-gray-200 focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] outline-none px-4 py-2.5 rounded-xl transition-all"
                              id="state"
                              type="text"
                              name="state"
                              value={formData.state}
                              onChange={handleChange}
                              placeholder="Maharashtra"
                              required
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="col-span-2 sm:col-span-1">
                            <label htmlFor="pincode" className="block text-sm font-semibold text-[var(--text-primary)] mb-1.5">Pincode</label>
                            <input
                              className="w-full border border-gray-200 focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] outline-none px-4 py-2.5 rounded-xl transition-all"
                              id="pincode"
                              type="text"
                              name="pincode"
                              value={formData.pincode}
                              onChange={handleChange}
                              placeholder="400001"
                              required
                            />
                          </div>
                          <div className="col-span-2 sm:col-span-1">
                            <label htmlFor="country" className="block text-sm font-semibold text-[var(--text-primary)] mb-1.5">Country</label>
                            <input
                              className="w-full border border-gray-200 focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] outline-none px-4 py-2.5 rounded-xl transition-all bg-gray-50"
                              id="country"
                              type="text"
                              name="country"
                              value={formData.country}
                              onChange={handleChange}
                              placeholder="India"
                              readOnly
                            />
                          </div>
                        </div>

                        <div>
                          <label htmlFor="address" className="block text-sm font-semibold text-[var(--text-primary)] mb-1.5">House No, Building, Road, Area</label>
                          <textarea
                            className="w-full border border-gray-200 focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] outline-none px-4 py-3 rounded-xl transition-all resize-none"
                            rows={3}
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            placeholder="123, Example Street, Near Landmark..."
                            required
                          />
                        </div>

                        <div className="pt-2 mt-2 border-t border-gray-100">
                          <button
                            className="w-full bg-[var(--primary)] hover:opacity-90 text-white font-bold py-3.5 rounded-xl transition-opacity shadow-md"
                            type="submit"
                          >
                            {selectedAddress ? "Update Address" : "Save Address"}
                          </button>
                        </div>
                      </form>
                    </Modal.Body>
                  </Modal>
                )}
              </Card.Body>
            </Card>

            {/* Delivery Method */}
            <Card className="bg-white shadow-sm border border-gray-100 rounded-2xl overflow-hidden">
              <Card.Header icon={<Gauge className="text-[var(--primary)]"/>} title="Delivery Method" className="bg-gray-50/50 p-6 border-b border-gray-100" />
              <Card.Body className="p-6 flex flex-col sm:flex-row gap-4">
                <div
                  onClick={() => setDeliveryMethod({ type: "Standard Delivery", price: 40 })}
                  className={`flex-1 flex justify-between items-center transition-all duration-200 ease-in cursor-pointer p-5 rounded-xl border-2 ${deliveryMethod.type === "Standard Delivery" ? "border-[var(--primary)] bg-[var(--primary)]/5" : "border-gray-200 hover:border-gray-300"}`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`h-5 w-5 rounded-full border-2 flex justify-center items-center ${deliveryMethod.type === "Standard Delivery" ? "border-[var(--primary)]" : "border-gray-300"}`}>
                      {deliveryMethod.type === "Standard Delivery" && <div className="h-2.5 w-2.5 rounded-full bg-[var(--primary)]"></div>}
                    </div>
                    <div>
                      <h1 className="text-base font-bold text-[var(--text-primary)]">Standard Delivery</h1>
                      <p className="text-xs text-[var(--text-secondary)] mt-0.5">4-6 business days</p>
                    </div>
                  </div>
                  <div className="text-lg font-bold text-[var(--text-primary)]">&#8377;40</div>
                </div>
                
                <div
                  onClick={() => setDeliveryMethod({ type: "Express Delivery", price: 150 })}
                  className={`flex-1 flex justify-between items-center transition-all duration-200 ease-in cursor-pointer p-5 rounded-xl border-2 ${deliveryMethod.type === "Express Delivery" ? "border-[var(--primary)] bg-[var(--primary)]/5" : "border-gray-200 hover:border-gray-300"}`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`h-5 w-5 rounded-full border-2 flex justify-center items-center ${deliveryMethod.type === "Express Delivery" ? "border-[var(--primary)]" : "border-gray-300"}`}>
                      {deliveryMethod.type === "Express Delivery" && <div className="h-2.5 w-2.5 rounded-full bg-[var(--primary)]"></div>}
                    </div>
                    <div>
                      <h1 className="text-base font-bold text-[var(--text-primary)]">Express Delivery</h1>
                      <p className="text-xs text-[var(--text-secondary)] mt-0.5">1-2 business days</p>
                    </div>
                  </div>
                  <div className="text-lg font-bold text-[var(--text-primary)]">&#8377;150</div>
                </div>
              </Card.Body>
            </Card>

            {/* Payment Method */}
            <Card className="bg-white shadow-sm border border-gray-100 rounded-2xl overflow-hidden mb-6">
              <Card.Header icon={<Wallet className="text-[var(--primary)]"/>} title="Payment Method" className="bg-gray-50/50 p-6 border-b border-gray-100" />
              <Card.Body className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                  {paymentMethods.map((paymentMethod) => (
                    <div
                      key={paymentMethod.id}
                      onClick={() => setIsPaymentMethod(paymentMethod.method)}
                      className={`flex flex-col justify-center items-center gap-3 p-5 rounded-xl border-2 transition-all duration-200 ease-in cursor-pointer ${isPaymentMethod === paymentMethod.method ? "border-[var(--primary)] bg-[var(--primary)]/5 text-[var(--primary)]" : "border-gray-200 hover:border-gray-300 text-gray-500 hover:text-gray-700"}`}
                    >
                      {React.cloneElement(paymentMethod.icon, { size: 28 })}
                      <h1 className="text-sm font-bold">{paymentMethod.title}</h1>
                    </div>
                  ))}
                  
                  <div
                    onClick={() => setIsPaymentMethod("COD")}
                    className={`flex flex-col justify-center items-center gap-3 p-5 rounded-xl border-2 transition-all duration-200 ease-in cursor-pointer ${isPaymentMethod === "COD" ? "border-[var(--primary)] bg-[var(--primary)]/5 text-[var(--primary)]" : "border-gray-200 hover:border-gray-300 text-gray-500 hover:text-gray-700"}`}
                  >
                    <Truck size={28} />
                    <h1 className="text-sm font-bold">Cash on Delivery</h1>
                  </div>
                </div>

                {isPaymentMethod === "UPI/QR" && (
                  <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                    <h1 className="text-sm font-bold text-[var(--text-primary)] mb-3">Enter your UPI ID</h1>
                    <div className="flex flex-col sm:flex-row gap-3 mb-3">
                      <input
                        className="flex-1 px-4 py-2.5 text-sm rounded-lg border border-gray-200 focus:border-[var(--primary)] outline-none transition-colors bg-white"
                        type="text"
                        placeholder="example@okhdfcbank"
                      />
                      <button className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-2.5 rounded-lg font-semibold transition-colors">
                        Verify
                      </button>
                    </div>
                    <p className="flex gap-2 text-xs items-center text-gray-500">
                      <Info size={14} className="text-blue-500 shrink-0" /> A payment request will be sent to your UPI app.
                    </p>
                  </div>
                )}
                
                {isPaymentMethod === "Card" && (
                  <div className="bg-gray-50 rounded-xl p-5 border border-gray-100 text-center text-sm text-[var(--text-secondary)]">
                    Card payment gateway integration will appear here.
                  </div>
                )}
                
                {isPaymentMethod === "Net Banking" && (
                  <div className="bg-gray-50 rounded-xl p-5 border border-gray-100 text-center text-sm text-[var(--text-secondary)]">
                    Net banking selection will appear here.
                  </div>
                )}
                
                {isPaymentMethod === "COD" && (
                  <div className="bg-gray-50 rounded-xl p-5 border border-gray-100 flex items-center gap-3 text-sm text-green-700 font-medium">
                    <Check size={18} className="text-green-600" /> Pay in cash when your order arrives.
                  </div>
                )}
              </Card.Body>
            </Card>
          </div>

          <div className="lg:col-span-4">
            <Card className="bg-white shadow-sm border border-gray-100 rounded-2xl overflow-hidden sticky top-8">
              <Card.Header
                title="ORDER SUMMARY"
                className="bg-gray-50/50 p-6 border-b border-gray-100 font-extrabold text-[var(--text-primary)]"
              />
              <Card.Body className="p-6">
                <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2 scrollbar-thin">
                  {cartItems?.map((cartItem) => (
                    <div key={cartItem?.product?._id} className="flex gap-4">
                      <div className="h-16 w-16 shrink-0 rounded-lg border border-gray-100 overflow-hidden bg-gray-50">
                        <img
                          className="h-full w-full object-cover"
                          src={cartItem?.product?.image || boy}
                          alt={cartItem?.product?.name}
                        />
                      </div>
                      <div className="flex-1 flex flex-col justify-center">
                        <h1 className="text-sm font-bold text-[var(--text-primary)] line-clamp-1 mb-0.5">
                          {cartItem?.product?.name}
                        </h1>
                        <p className="text-xs text-[var(--text-secondary)] mb-1">
                          Qty: {cartItem?.quantity}
                        </p>
                        <span className="text-sm font-bold text-[var(--primary)]">
                          &#8377;{cartItem?.price}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-100 pt-5 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-[var(--text-secondary)]">Subtotal</span>
                    <span className="font-semibold text-[var(--text-primary)]">&#8377;{cartData?.totalPrice || 0}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[var(--text-secondary)]">Shipping Fee ({deliveryMethod.type})</span>
                    <span className="font-semibold text-[var(--text-primary)]">&#8377;{deliveryMethod.price}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[var(--text-secondary)]">Tax (GST 18%)</span>
                    <span className="font-semibold text-[var(--text-primary)]">&#8377;{gstTax.toFixed(2)}</span>
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-5 mt-5">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-base font-extrabold text-[var(--text-primary)]">Total</span>
                    <span className="text-2xl font-black text-[var(--primary)]">
                      &#8377;{orderTotal.toFixed(2)}
                    </span>
                  </div>
                  <button
                    onClick={handleCreateOrder}
                    disabled={addresses.length === 0}
                    className={`w-full py-4 rounded-xl text-lg font-bold flex items-center justify-center gap-2 transition-all ${addresses.length === 0 ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-[var(--primary)] text-white shadow-md hover:opacity-90 hover:shadow-lg transform hover:-translate-y-0.5"}`}
                  >
                    Place Order <ArrowRight size={20} />
                  </button>
                  {addresses.length === 0 && (
                    <p className="text-xs text-red-500 text-center mt-2 font-medium">Please add a shipping address to continue</p>
                  )}
                </div>
              </Card.Body>
              <Card.Footer className="bg-gray-50/80 p-4 border-t border-gray-100">
                <p className="flex justify-center items-center gap-1.5 text-xs font-semibold text-gray-500 tracking-wide">
                  <ShieldCheck size={16} className="text-green-500" /> SECURE ENCRYPTED PAYMENT
                </p>
              </Card.Footer>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
