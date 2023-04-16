import React, { useEffect, useState ,useContext} from "react";
import  UserContext from "./utils/userContext";


class About extends React.Component{
    constructor(props){
        super(props)
        this.state={
            clicked:false
        }
    }
    
    render(){
        let con = this.context
        let clicked = this.state.clicked
        
      console.log(this.data)
       
      return (
        <>
        <UserContext.Provider value={this.state.clicked==false?{ ...con,user:{firstName:"Singham",email:"singham@email.com"}}:{ ...con,frusser:{frome1:"Singham",chrome1  :"singham@email.com"}}}>
           <h1>
                This is our About us page
            </h1>
            
           
       
            <AboutUs props ="name"/>
            <About2 props={this.setState.bind(this)} clicked={clicked}/>
            </UserContext.Provider>
        </> 
        )
    }
}

class AboutUs extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            imagy : props.props,
            num:1
        }
        console.log("ABoutUs constructor")
    }
    async componentDidMount(){
        let x =0
         let img = await fetch("https://www.bing.com/ck/a?!&&p=e9b09f8620dda72aJmltdHM9MTY3NzAyNDAwMCZpZ3VpZD0wNTA2YjczMy1kOThhLTZhNjYtMWZiMy1hNzlhZDgzODZiMDImaW5zaWQ9NTUyMg&ptn=3&hsh=3&fclid=0506b733-d98a-6a66-1fb3-a79ad8386b02&u=a1L2ltYWdlcy9zZWFyY2g_cT1JbWFnZXMmRk9STT1JUUZSQkEmaWQ9RDA1QTU0MTFFQTY0QjRDNUNDOTc0MjU4QkE1MDUyQzU2ODkwODkyNQ&ntb=1")
         img = await img.json()
         this.setState({
                imagy : img.data.filters[0].type,
                
            })
        this.fn = setInterval(()=>{
               console.log(x++)
            },1000)  
            console.log("React.Component:",React.Component ,typeof React.Component)
        }

        componentWillUnmount(){
            
            clearInterval(this.fn)
        }

       render(){
            return(
                <>
                {console.log("AboutUs Rendered")}
                
                <h1>{this.state.imagy}</h1>
                </>
            )
        }
}

const About2 = (props)=>{
    console.log("props:",props)
    const [count,setCount] = useState(0)
    const {user,frusser} = useContext(UserContext)
    console.log("====",user)
    useEffect(()=>{
        console.log("calling useEffect")
          let x =0
        let newfn = ()=>{
            console.log(x++,"uf")
        }
       
    }
    )
    {console.log("rendering about2")}
    return (
        <>
        <h1>{user.email+user.firstName}</h1>
        <h1>{frusser.chrome1+frusser.frome1}</h1>
        <button className="block" onClick={()=>{
          props.clicked ==false? props.props({
                clicked:true
            }):
            props.props({
                clicked:false
            })
        }}>Click Me!</button>
       
        <button onClick={()=>{
            setCount(count++)
        }}>{count}</button>
       </>
    )
}

About.contextType = UserContext;
export default About



//  <UserContext.Provider value={{user:{firstName:"Singham",email:"Singham@email.com"}}}>