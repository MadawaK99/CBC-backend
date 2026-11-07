import Order from "../models/order.js";
import Product from "../models/product.js";

export async function createOrder(req,res){
    // get user Information
    // get product information 
    // order id generate 
    if (req.user == null){
        res.status(403).json({
            message : "Please login and try again"
        })
        return
    }

    const orderInfo = req.body


    if(orderInfo.name == null){
        orderInfo.name = req.user.firstName+" "+req.user.lastName;
    }

    let orderId = "CBC00001";

    const lastOrder = await Order.find().sort({Date: -1}).limit(1);

    if (lastOrder.length > 0){
        const lastOrderId = lastOrder[0].orderId;
        const lastOrderNumberString = lastOrderId.replace("CBC","");
        const lastOrderNumber = parseInt(lastOrderNumberString);
        const newOrderNumber =lastOrderNumber +1 ;
        const newOrderNumberString = String(newOrderNumber).padStart(5, '0');
        orderId = "CBC" + newOrderNumberString;
    }

    const order = new Order({
        orderId: orderId,
        adress: orderInfo.adress,
        total: 0,
        userId: req.user._id,
        email: req.user.email,
        name: orderInfo.name,
        phone: orderInfo.phone, 
        products:[]
    })

      try{
        let total = o;
        let lablledTotal =0;
        const products = []
       
        
        for(let i =0; i<orderInfo.products.length; i++){
            const item = await Product.findOne({produtId : orderInfo.products[i].productId});
            if(item == null){
                res.status(404).json({
                    message:"Product not find",
                    
                })
                return
            }
            if(item.isAvailable == false){
                res.status(404).json({
                    message: "Product not available"
                })
            }

            products[i]={
                productInfo :{
                    productId : item.productId,
                    name : item.name,
                    altNames : item.altNames,
                    description : item.description,
                    images  : item.images,
                    labelledPrice : item.labelledPrice,
                    price : item.price,
                    total: total
  
                },
                quantity:orderInfo.products[i].qty
            }
            total += item.price * orderInfo.products[i].qty
            lablledTotal +=(item.labelledPrice * orderInfo.products[i].qty);
        }  

        const createdOrder = await order.save()
        res.json({
            message: "Order created successfully",
            order : createdOrder 
        })

      }catch(err){
        res.status(500).json({
            message:"Faild to create order",
            error: err
        })
      }
    await order.save()


     



}