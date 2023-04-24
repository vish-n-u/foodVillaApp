import { useEffect,useState } from "react";
import allMenu from "../swiggyMenusApi";

async function getData(){
    
}


const PreviousOrders = () => {
  //createShimmer
  const [allPrevOrders,setAllPrevOrders] = useState([])
  useEffect(()=>{
    getData(setAllPrevOrders)
  })
  
};
