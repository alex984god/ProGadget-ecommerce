import asyncHandler from '../middleware/asyncHandler.js';
import Order from '../models/orderModel.js'

//@desc Create New Order
//@route POST/api/products
//@acess Public

const addOrderItems = asyncHandler(async(req,res)=>{
   const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice
   } = req.body
   if(orderItems && orderItems.length===0){
      res.status(400);
      throw new Error('No order items');
   }else{
      const order = new Order({
         orderItems:orderItems.map((x)=>({
            ...x,
            product:x._id,
            _id:undefined
         })),
         user:req.user._id,
         shippingAddress,
         paymentMethod,
         itemsPrice,
         taxPrice,
         shippingPrice,
         totalPrice
      })
      const createdOrder = await order.save();
      res.status(201).json(createdOrder)
   }
});

//@desc Get looged in users orders
//@route GET /api/orders/myorders
//@acess Private

const getMyOrders = asyncHandler(async(req,res)=>{
    const orders = await Order.find({user:req.user._id})
    res.status(200).json(orders);
 });


 //@desc Get Orders By ID
//@route GET /api/orders/:id
//@acess Private

const getOrderById = asyncHandler(async(req,res)=>{
   const order = await Order.findById(req.params.id).populate('user', 'name email');
   if(order){
     res.status(200).json(order)
   }else{
     res.status(404);
     throw new Error("Order not found");
   }
});

 //@desc Update order to paid
//@route PUT /api/orders/:id/pay
//@acess Private/Admin

const updateOrderToPaid = asyncHandler(async(req,res)=>{
   console.log('Request Body:', req.body);
   const order = await Order.findById(req.params.id);

   if(order){
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
      id:req.body.id,
      status:req.body.status,
      update_time:req.body.update_time,
      email_address:req.body.payer.email_address,
   }

   const updatedOrder = await order.save();

   res.status(200).json(updatedOrder);
   }else{
   res.status(404);
   throw new Error('Order not found');
   }

 });


 //@desc Update order to delivered
//@route GET /api/orders/:id/delivered
//@acess Private

const updateOrderToDelivered = asyncHandler(async(req,res)=>{
    const order = await Order.findById(req.params.id);

    if(order){
      order.isDelivered = true;
      order.deliveredAt = Date.now();

      const updateOrder  = await order.save();
      res.status(200).json(updateOrder);
    } else {
      res.status(404)
      throw new Error("Error not found");
    }
 });

 //@desc Get All orders
//@route GET /api/orders
//@acess Private/Admin

const getOrders = asyncHandler(async(req,res)=>{
    const orders = await Order.find({}).populate('user', 'id name');
    res.status(200).json(orders)
 });

 

 export  {addOrderItems, getMyOrders, updateOrderToPaid, updateOrderToDelivered, getOrders, getOrderById }