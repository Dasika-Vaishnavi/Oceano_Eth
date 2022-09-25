import { useState } from 'react';
import './App.css';
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import {nABI} from "./abi";
import {nftToken,marketToken} from "./address";


function App() {
  const [showCForm,setC] = useState("");
  const [showMForm,setM] = useState("");
  const [formName,setName] = useState("");
  const [formLocation,setLocation] = useState("");
  const [formDevice,setDevice] = useState("");
  
  
  
  const change=(e) => {
    setC(e);
    setM("");
    //console.log(showCForm);
  }
  const changeName=(e) => {
    setName(e.target.value);
    //console.log(showCForm);
  }
  const changeLocation=(e) => {
    setLocation(e.target.value);
    //console.log(showCForm);
  }
  const changeDevice=(e) => {
    setDevice(e.target.value);
    //console.log(showCForm);
  }
  const change1=(e) => {
    setM(e);
    setC("");
    //console.log(showMForm);
  }
  return (
    <div className="App">
      <header className="App-header">
        <h1>Ocean</h1>
        <button className='btn' onClick={()=>{
          change("Contribute")
        }}>Contibute</button>
        <br></br><button className='btn' onClick={()=>{
          change1("Mint")
        }}>Pay and Mint</button>
        {showCForm != "" ? <div><form>
          <input type="text" className='in' placeholder="Enter Name:" onChange={(e)=> changeName(e)}></input><br></br>
          <input type="text" className='in' placeholder="Enter Location:" onChange={(e)=> changeLocation(e)}></input><br></br>
          <input type="text" className='in' placeholder="Enter Device_Number:" onChange={(e)=> changeDevice(e)}></input><br></br>
          
          <button className='btn' onClick={(e)=>{
            e.preventDefault();
          }}>Save</button>
        </form>{formDevice != " " ? <h1>Your Token ID:{parseInt(formDevice) + 18}</h1> : ""}</div> : ""}
        {showMForm != "" ? <form>
          <input type="text" className='in' placeholder="Enter Name:" onChange={(e)=> changeName(e)}></input><br></br>
          <button className='btn' onClick={async(e)=>{
            e.preventDefault();
            console.log(formName);

            const web3Modal = new Web3Modal();
           const connection = await web3Modal.connect();
           let provider = new ethers.providers.Web3Provider(connection);
           let s = provider.getSigner();
           console.log(s);
           const contract = new ethers.Contract(nftToken,nABI,s);
           console.log(contract);
           const tx = await contract.mintToken(formName,{value: "10000000000000"});
            tx.wait();
            const id = await contract.tokenId();
            const i =  id.toString();
            alert(`Please Save your ID: ${i}`);
            console.log(tx,id);
          }}>Save</button>
        </form> : ""}
      </header>
    </div>
  );
}

export default App;
