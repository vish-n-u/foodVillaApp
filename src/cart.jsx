import { useSelector } from "react-redux";
import { menuItemsImg_CDN_Link,restaurantImg_CDN_Link } from "./constants";
import { addItem,removeItem } from "../redux/cartSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";

const CDN_IMG_LINK = restaurantImg_CDN_Link


   

const CartCard = ({carts,restaurantId,eachItemPrice,setEachItemPrice}) =>{
 const Dispatch = useDispatch()
  const {itemsQuantityInCart,name,defaultPrice,price,id} = carts
if(!eachItemPrice[id]){
  setEachItemPrice({...eachItemPrice,[id]:(defaultPrice/100*itemsQuantityInCart||price/100*itemsQuantityInCart)})
} 
console.log(eachItemPrice)

  
    return(
    <div  key={'Rbody1'} className="box-border flex px-4  justify-between mt-2 items-center content-center align-middle
      hover:shadow-xl w-full" > 
      
     
      <h2  key={'Rbody3'} className="mt-2 h-7 w-1/3 overflow-hidden overflow-y-clip overflow-x-clip" >{name}</h2>
      <div className="justify-around align-middle items-center flex w-1/4 bg-white border">
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
      <h2 className="mt-2">{defaultPrice
/100*itemsQuantityInCart || price/100*itemsQuantityInCart
}</h2>

    </div>
  );
               
}

const Card = ()=>{
  const cartItems = useSelector(store=>store.cart.items)
  const restaurantDetail =useSelector(store=>store.restaurantDetails)
   const [eachItemPrice,setEachItemPrice] = useState({})
   let total = Object.values(eachItemPrice).length>0?Object.values(eachItemPrice).reduce((a,b)=>a+b):0
  
  let id = Object.keys(cartItems)[0]
  return(
    <div className="w-screen lg:h-screen flex justify-end ">
      <div className="lg:w-1/3 px-4 lg:h-2/3 w-screen flex m-10 flex-col  overflow-y-scroll container bg-blue-50 p-4">
        { Object.keys(cartItems).length>0?
        <><img className="ml-4 h-16 w-24 mb-8" src ={restaurantImg_CDN_Link+restaurantDetail[id].cloudinaryImageId} alt="restroImg"></img>
      <div className="lg:h-2/3 will-change-scroll px-8 border-2 border-black flex  flex-col bg-blue-100 overflow-y-scroll container">{ Object.keys(cartItems[id]).map(item=>{
       return <CartCard carts={cartItems[id][item] } restaurantId={id} eachItemPrice={eachItemPrice} setEachItemPrice={setEachItemPrice}  />
      })
      }
      <div className="flex flex-col mt-7 px-2">
        <h1 className="mb-5 font-semibold">Bill Detail</h1>
        <div className="flex justify-between m-1 ">
    <span>Items total</span> { Object.values(eachItemPrice).length>0?<h1>{Object.values(eachItemPrice).reduce((a,b)=>a+b)}</h1>:null}
     </div>
     <div className="flex justify-between m-1">
      <span>Delivery Fee</span> <h1>50</h1>
     </div>
     <div className="flex justify-between  m-1">
      <span>Govt Taxes&other</span> { Object.values(eachItemPrice).length>0?<h1>{total/10}</h1>:null}
     </div>
     <div className="flex justify-between  m-1">
      <span>Total</span> { Object.values(eachItemPrice).length>0?<h1>{Math.round(total+total/10+50)}</h1>:null}
     </div>
     </div>
      </div>
      </>:
      <><h1>Empty Cart</h1></>
}
{Object.values(eachItemPrice).length>0?<h1>{Object.values(eachItemPrice).reduce((a,b)=>a+b)}</h1>:null}

      </div>
     
    </div>
  )
}



export default Card