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
import Footer from "./footer";
import { useEffect } from "react";
"checking"
const CDN_IMG_LINK = restaurantImg_CDN_Link

async function handleData(cartItems,totals,Dispatch,setSuccessfulPayment,setOrderId,isUsing20PercentOff){
  let obj ={}
  let restaurantId = Object.keys(cartItems)[0]
  // console.log(restaurantId)
  Object.keys(cartItems[restaurantId]).map((menuIds)=>{
    // console.log(menuIds)
    obj[menuIds] = [cartItems[restaurantId][menuIds].itemsQuantityInCart,cartItems[restaurantId][menuIds].category]
    
  })
  // console.log("this is whats being sent",obj)

  try{
    const newOrder =await  fetch(createOrderLink,{
      method:"POST",
      mode:"cors",
      body:JSON.stringify({
        token:localStorage.getItem("token"),
        refreshToken:localStorage.getItem("refreshToken"),
        isItCartItem:false,
        restaurantId,
        totalAmount:isUsing20PercentOff? Math.round(totals-(totals/5)):totals,
        orderDetails:obj
}),
 headers: { "content-type": "application/json" }
    })
    const orderData = await newOrder.json()
    // console.log("orderData-----",orderData.message._id)
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
      // console.log("_id====",orderData.message._id)
      Dispatch(clearCart())
    }
    if(newOrder.newAccessToken!=undefined) localStorage.setItem("token",newOrder.newAccessToken)
  }
  catch(err){
    // console.log(err)
  }



}

   

const CartCard = ({carts,restaurantId,eachItemPrice,setEachItemPrice,fromHeader}) =>{
 const Dispatch = useDispatch()
 const pageColour = useContext(UserContext)
  const {itemsQuantityInCart,name,defaultPrice,price,id} = carts
  const isVeg = carts.itemAttribute.vegClassifier
if(!eachItemPrice[id]){
  setEachItemPrice({...eachItemPrice,[id]:(defaultPrice/100*itemsQuantityInCart||price/100*itemsQuantityInCart)})
} 
// console.log("checking id",eachItemPrice,id)

  
    return(
    <div  key={id} className={`box-border text-[13.5px] font-semibold  ${!fromHeader?pageColour=="white"?"text-slate-700":"text-slate-300":pageColour=="white"?"text-black":"text-black"}   flex items-center align-middle  justify-between px-2 mt-2 hover:shadow-xl w-full`} > 
      
     <>
     <img src={isVeg!=="NONVEG"?"data:image/jpeg;base64,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":"https://th.bing.com/th/id/OIP.Ve98fZy09lyEDcJbX9qToQHaHa?w=180&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"} alt="isVeg" className="h-6 w-6"></img>
      
      <h2  key={'Rbody3'} className="mt-2 w-1/3  overflow-hidden overflow-y-clip overflow-x-clip" >{name}</h2>
      </>
      <div className=" w-1/4 md:justify-around text-orange-500 h-6 content-center justify-around align-middle items-center flex  bg-white border">
        <button onClick={()=>{
          let iQuantity = itemsQuantityInCart
          Dispatch(removeItem({id:restaurantId,rs:carts}))
          
          
        if(iQuantity-1>0)
        setEachItemPrice({...eachItemPrice,[id]:(defaultPrice/100*(eachItemPrice[id].itemsQuantityInCart-1||price/100*itemsQuantityInCart-1))})
        else{
          let obj = JSON.stringify(eachItemPrice)
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
   const [isUsing20PercentOff,setIsUsing20PercentOff] = useState(false)
   const pageColour = useContext(UserContext)
   
   if(!cartItems&&localStorage.getItem("cartItems")){
  addData()
   }
   

  
  let total = Object.values(eachItemPrice).length>0?getPrice(cartItems):0
  // console.log(total)
 let totals=total+(total/10)+50
  // console.log(total)
 let id = Object.keys(cartItems)[0]
  console.log("eachItemPrice",eachItemPrice)
  return(
    <>{
    successfulPayment?<BikeDude showLoadingScreen={true} id={orderId}/>:
    <div key={"cartbody1"} className={`flex w-screen  p-2 lg:align-top lg:items-start lg:h-screen items-center flex-col-reverse  z-50 text-black ${fromHeader? (pageColour!="white"?"h-full bg-transparent  w-full  text-black":"h-full bg-transparent w-full "):pageColour=="white"?" w-screen lg:flex-row bg-gray-200":"bg-gray-800  w-screen lg:flex-row  text-white"  } `}>
 {!fromHeader? <PreviousOrders setIsUsing20PercentOff={setIsUsing20PercentOff}/>:null} 
      <div id="cart" className="h-screen  w-full p-2 lg:justify-end  my-4  flex lg:mt-2">
      <div key={"cartbody2"} className={`  lg:px-4 lg:w-1/2 w-11/12  border-2  rounded-md  flex  flex-col   container h-3/4 lg:p-4 ${fromHeader?"rounded-2xl absolute top-2 h-full w-full p-2":"lg:w-[55%]  w-screen  lg:m-10"} ${pageColour=="white"?` ${fromHeader?"bg-white border-2  border-orange-500":"bg-white border-white"} `:`border-2 ${fromHeader?"bg-white":"bg-black border-black"} `}`}>
        { Object.keys(cartItems).length>0?
        <>
        <div key={"cartbody3"} className="flex justify-start"><img className="ml-4 h-16 w-24 mb-8 items-center align-middle m-2" src ={restaurantImg_CDN_Link+restaurantDetail[id].cloudinaryImageId} alt="restroImg"></img> <Link to={`/menucard/${id}`} className={`text-base align-middle font-serif font-semibold cursor-pointer mt-2 ${fromHeader? (pageColour=="white"?"text-black":"text-black"):pageColour=="white"?"text-black ":" text-gray-300"  }` }>{restaurantDetail[id].name}</Link></div>
      <div key={"cartbody4"} className={`h-1/2  w-full self-center  border-2 rounded-md  align-middle  flex max-w-lg flex-col  text-black overflow-y-scroll container`}>{ Object.keys(cartItems[id]).map(item=>{
        console.log("checking id main",item)
       return <CartCard carts={cartItems[id][item] } key={item} restaurantId={id} eachItemPrice={eachItemPrice} setEachItemPrice={setEachItemPrice}  fromHeader={fromHeader}/>
      })
      }
      <div className={`flex flex-col mt-7 px-2 ${fromHeader?"text-black":pageColour=="white"?"text-black":"text-gray-300"}`}>
        <h1 className="mb-5 font-semibold">Bill Detail</h1>
        <div className="flex justify-between m-1 ">
    <span className="font-semibold">Items total</span> 
     </div>
     <div className="flex   justify-between m-1">
      <span>Delivery Fee</span> <h1>{"₹"+  50
      }</h1>
     </div>
     <div className="flex justify-between  m-1">
      <span>Govt Taxes&other</span> { Object.values(eachItemPrice).length>0?<h1>{"₹"+ Math.round(getPrice(cartItems,"govtTaxes")/10)}</h1>:0

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
<div className={`flex flex-col  text-black ${fromHeader? pageColour!="white"?"text-black":"text-black":pageColour=="white"?"text-black":" text-white"  }`}>
{isUsing20PercentOff&&<div className="flex w-full justify-around text-gray-500"><h1 className="text-lg  p-2 m-2 ">Offer: rapidosh20%</h1> <h1 className="text-lg  p-2 m-2 ">{"- ₹"+ Math.round(totals/5)}</h1></div>}  
  <div className="flex w-full justify-around"><h1 className="text-lg  p-2 m-2 font-semibold">Total</h1><h1 className="text-lg  p-2 m-2 font-semibold">{!isUsing20PercentOff?"₹"+ Math.round(totals):"₹"+ Math.round(totals-(totals/5))}</h1></div>
  </div>
{  fromHeader?
<button
onClick={()=>{
  setIsCartClicked(false)
  if(!localStorage.getItem("token")) Navigate("/signUp")
  else Navigate("/cart")
}}

className={`text-lg font-semibold flex justify-center rounded-md  p-2 py-4  m-2 mx-4 ${pageColour!="white"?"bg-black text-white":"bg-orange-500  text-white"}`}>checkout</button>
:<button onClick={()=>handleData(cartItems,totals,Dispatch,setSuccessfulPayment,setOrderId,isUsing20PercentOff)} className="text-lg font-semibold max-w-lg p-2 py-4 bg-orange-500 rounded-md active:bg-orange-800 hover:shadow-lg shadow-black  text-white m-2 mx-4">Pay  ₹ {!isUsing20PercentOff?"₹"+ Math.round(totals):"₹"+ Math.round(totals-(totals/5))}</button>}
</>:null}

      </div>
      </div>
    </div>}
   
    </>
  )
}

function getPrice(cartItems,str){
  let total = 0
   Object.keys(cartItems).map(parent=>{
    Object.keys(cartItems[parent]).map(child=>{
      total +=cartItems[parent][child].itemsQuantityInCart * ((Math.round(cartItems[parent][child].price/100))||Math.round(cartItems[parent][child].defaultPrice/100))
    })
    
  })
  console.log("total",total,str)
  return total

}

export default Cart