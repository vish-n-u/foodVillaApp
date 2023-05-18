import { useSelector } from "react-redux";
import { menuItemsImg_CDN_Link,restaurantImg_CDN_Link } from "./constants";
import { addItem,removeItem ,clearCart} from "../redux/cartSlice";
import { useDispatch } from "react-redux";
import { Navigate ,useNavigate,Link } from "react-router-dom";
import { useContext, useState } from "react";
import { createOrderLink } from "../path.config";
import PreviousOrders from "./previousOrder";
import { UserContext } from "../app"
import BikeDude from "./bikerdude";
"checking"
const CDN_IMG_LINK = restaurantImg_CDN_Link

async function handleData(cartItems,totals,Dispatch,setSuccessfulPayment,setOrderId){
  let obj ={}
  let restaurantId = Object.keys(cartItems)[0]
  console.log(restaurantId)
  Object.keys(cartItems[restaurantId]).map((menuIds)=>{
    console.log(menuIds)
    obj[menuIds] = [cartItems[restaurantId][menuIds].itemsQuantityInCart,cartItems[restaurantId][menuIds].category]
    
  })
  console.log("this is whats being sent",obj)

  try{
    const newOrder =await  fetch(createOrderLink,{
      method:"POST",
      mode:"cors",
      body:JSON.stringify({
        token:localStorage.getItem("token"),
        refreshToken:localStorage.getItem("refreshToken"),
        isItCartItem:false,
        restaurantId,
        totalAmount:totals,
        orderDetails:obj
}),
 headers: { "content-type": "application/json" }
    })
    const orderData = await newOrder.json()
    console.log("orderData-----",orderData.message._id)
    if(newOrder.status==404){
      localStorage.removeItem("token")
      localStorage.removeItem("refreshToken")
      window.location.href="/"
      window.location.reload()

    }
    if(newOrder.status==500){
      alert("Internal server err.... , please refresh and retry...")
    }
    if(newOrder.status==201){
      setSuccessfulPayment(true)
      setOrderId(orderData.message._id)
      console.log("_id====",orderData.message._id)
      Dispatch(clearCart())
    }
    if(newOrder.newAccessToken!=undefined) localStorage.setItem("token",newOrder.newAccessToken)
  }
  catch(err){
    console.log(err)
  }



}

   

const CartCard = ({carts,restaurantId,eachItemPrice,setEachItemPrice}) =>{
 const Dispatch = useDispatch()
  const {itemsQuantityInCart,name,defaultPrice,price,id} = carts
if(!eachItemPrice[id]){
  setEachItemPrice({...eachItemPrice,[id]:(defaultPrice/100*itemsQuantityInCart||price/100*itemsQuantityInCart)})
} 
console.log("checking id",eachItemPrice,id)

  
    return(
    <div  key={id} className="box-border  text-black  flex px-2  justify-between mt-2 
      hover:shadow-xl w-full" > 
      
     
      <h2  key={'Rbody3'} className="mt-2 h-7 lg:w-1/3 md:-1/3 w-1/4 overflow-hidden overflow-y-clip overflow-x-clip" >{name}</h2>
      <div className="lg:justify-around md:justify-around justify-around align-middle items-center flex lg:w-1/4 md:w-1/4 w-1/2 bg-white border">
        <button onClick={()=>{
          let iQuantity = itemsQuantityInCart
          Dispatch(removeItem({id:restaurantId,rs:carts}))
          
          
        if(iQuantity-1>0)
        setEachItemPrice({...eachItemPrice,[id]:(defaultPrice/100*(eachItemPrice[id].itemsQuantityInCart-1||price/100*itemsQuantityInCart-1))})
        else{
          let obj = eachItemPrice
          delete obj[id]
          setEachItemPrice(obj)
        }
      }
    }
      >-</button>
        <h1 className="">{itemsQuantityInCart}</h1>
        <button onClick={()=>{Dispatch(addItem({id:restaurantId,rs:carts}))
      setEachItemPrice({...eachItemPrice,[id]:(defaultPrice/100*(eachItemPrice[id].itemsQuantityInCart+1||price/100*itemsQuantityInCart+1))})
  }
      }>+</button>
      </div>
      <h2 className="mt-2">{"₹"+ (defaultPrice
/100*itemsQuantityInCart || price/100*itemsQuantityInCart)
}</h2>

    </div>
  );
               
}

const Cart = ({fromHeader,setIsCartClicked})=>{
  const cartItems = useSelector(store=>store.cart.items)
  const restaurantDetail =useSelector(store=>store.restaurantDetails)
   const [eachItemPrice,setEachItemPrice] = useState({})
   const [successfulPayment,setSuccessfulPayment] = useState(false)
   const [orderId,setOrderId] = useState("")
   const Dispatch = useDispatch()
   const Navigate = useNavigate()
   const pageColour = useContext(UserContext)
   
   if(!cartItems&&localStorage.getItem("cartItems")){
  addData()
   }
   
   let total = Object.values(eachItemPrice).length>0?Object.values(eachItemPrice).reduce((a,b)=>a+b):0
   console.log(total)
  let totals=total+(total/10)+50
   console.log(total)
  let id = Object.keys(cartItems)[0]
  return(
    successfulPayment?<BikeDude showLoadingScreen={true} id={orderId}/>:
    <div key={"cartbody1"} className={`flex w-screen lg:align-top lg:items-start lg:h-screen items-center flex-col-reverse  z-50 text-black ${fromHeader? (pageColour!="white"?"h-full   w-full  text-black":"h-full  w-full "):pageColour=="white"?" w-screen lg:flex-row ":"  w-screen lg:flex-row bg-black text-white"  } `}>
 {!fromHeader? <PreviousOrders/>:null} 
      <div id="cart" className="h-screen w-full lg:justify-end my-4  flex lg:mt-8">
      <div key={"cartbody2"} className={`  lg:px-4  border-2 border-black  flex  flex-col  overflow-y-scroll container h-2/3 lg:p-4 ${fromHeader?"rounded-2xl absolute top-2 h-full  p-2":"lg:w-[75%]  w-screen  lg:m-10"} ${pageColour=="white"?` ${fromHeader?"bg-black border-2  border-black":"bg-white "} `:`border-2 ${fromHeader?"bg-white":"bg-black"} border-white`}`}>
        { Object.keys(cartItems).length>0?
        <>
        <div key={"cartbody3"} className="flex justify-start"><img className="ml-4 h-16 w-24 mb-8 items-center align-middle m-2" src ={restaurantImg_CDN_Link+restaurantDetail[id].cloudinaryImageId} alt="restroImg"></img> <Link to={`/menucard/${id}`} className={`text-lg align-middle font-serif font-semibold cursor-pointer mt-2 ${fromHeader? (pageColour=="white"?"text-white":"text-black"):pageColour=="white"?"text-black ":" text-white"  }` }>{restaurantDetail[id].name}</Link></div>
      <div key={"cartbody4"} className={`h-1/2   lg:px-8 border-2  border-pink-500 flex max-w-lg flex-col bg-blue-100 text-black overflow-y-scroll container`}>{ Object.keys(cartItems[id]).map(item=>{
        // console.log("checking id main",item)
       return <CartCard carts={cartItems[id][item] } key={item} restaurantId={id} eachItemPrice={eachItemPrice} setEachItemPrice={setEachItemPrice}  />
      })
      }
      <div className="flex flex-col mt-7 px-2">
        <h1 className="mb-5 font-semibold">Bill Detail</h1>
        <div className="flex justify-between m-1 ">
    <span>Items total</span> {"₹"+  Object.values(eachItemPrice).length>0?<h1>{Object.values(eachItemPrice).reduce((a,b)=>a+b)}</h1>:null}
     </div>
     <div className="flex justify-between m-1">
      <span>Delivery Fee</span> <h1>{"₹"+  50
      }</h1>
     </div>
     <div className="flex justify-between  m-1">
      <span>Govt Taxes&other</span> { Object.values(eachItemPrice).length>0?<h1>{"₹"+ Math.round(total/10)}</h1>:null

  }
     </div>
     <div className={`flex justify-between  m-1 `}>
      <span>Total</span> { Object.keys(cartItems).length>0?<h1>{"₹"+ Math.round(totals)}</h1>:null}
     </div>
     </div>
      </div>
      </>:
      <><h1>Empty Cart</h1></>
}
{Object.keys(cartItems).length>0?<>
<div className={`flex justify-around  ${fromHeader? pageColour!="white"?"text-black":"text-white":pageColour=="white"?"text-black":" text-white"  }`}><h1 className="text-lg p-2 m-2 font-semibold">Total</h1><h1 className="text-lg p-2 m-2 font-semibold">{"₹"+ Math.round(totals)}</h1></div>
{  fromHeader?
<button
onClick={()=>{
  setIsCartClicked(false)
  if(!localStorage.getItem("token")) Navigate("/signUp")
  else Navigate("/cart")
}}

className={`text-lg font-semibold flex justify-center  p-2 py-4  m-2 mx-4 ${pageColour!="white"?"bg-black text-white":"bg-white text-black"}`}>checkout</button>
:<button onClick={()=>handleData(cartItems,totals,Dispatch,setSuccessfulPayment,setOrderId)} className="text-lg font-semibold max-w-lg p-2 py-4 bg-blue-400 m-2 mx-4">Pay  ₹ {Math.round(totals)}</button>}
</>:null}

      </div>
      </div>
    </div>
  )
}



export default Cart