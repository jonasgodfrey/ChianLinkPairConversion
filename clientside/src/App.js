import React, { useState } from 'react';
import { ethers } from 'ethers';
import { Card, Button, Form, Image } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
 
function App() {
  const [storedPrice, setStoredPrice] = useState('');
  const [item, setItem] = useState({pairs: ''});
 
  const { pairs } = item;
 
  const contractAddress ='0x5aF5e016576A9186964c3F396b6632b8e67436a0';
  const ABI = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [],
      "name": "getChainlinkDataFeedLatestAnswer",
      "outputs": [
        {
          "internalType": "int256",
          "name": "",
          "type": "int256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ];
 
  const provider = new ethers.BrowserProvider(window.ethereum);
  const smartContract = new ethers.Contract(contractAddress, ABI, provider);
 
  // const getPair = async () => {
  //   const contractPrice = await smartContract.getChainlinkDataFeedLatestAnswer();
  //   console.log(contractPrice,"value-",parseInt(contractPrice) / 100000000);
  //   setStoredPrice('$' + parseInt(contractPrice) / 100000000);
  // };

  const getPair = async () => {
    if(pairs==="BTC/USD"){
      const contractPrice = await smartContract.getChainlinkDataFeedLatestAnswer(1);
      setStoredPrice('$' + (parseInt(contractPrice) / 100000000));
      } else if(pairs==="ETH/USD"){
        const contractPrice = await smartContract.getChainlinkDataFeedLatestAnswer(2);
        setStoredPrice('$' + (parseInt(contractPrice) / 100000000));
      } else if(pairs==="LINK/USD"){
        const contractPrice = await smartContract.getChainlinkDataFeedLatestAnswer(3);
        setStoredPrice('$' + (parseInt(contractPrice) / 100000000));        
      } else if(pairs==="BTC/ETH"){
        const contractPrice = await smartContract.getChainlinkDataFeedLatestAnswer(4);
        setStoredPrice('$' + (parseInt(contractPrice) / 100000000));
      }
  };
 
  const handleChange = (e) => {
    console.log(e.target.value);
    setStoredPrice('');
    setItem((prevState) => ({
      ...prevState,
      pairs: e.target.value,
    }));
  };
 
  const handleSubmit = (e) => {
    e.preventDefault();
  };
 
  return (
    <div className='container'>
    <Image width='200px' height='200px' fluid className='mt-5' src='https://seeklogo.com/images/C/chainlink-logo-B072B6B9FE-seeklogo.com.png'/>
    <br/>
   <div className='row'></div> 
    <div className='col-md-6'>
    <Card style={{ width: '32rem' }} className='mt-5 shadow bg-body rounded'>
      <Card.Header a5='h5'>Conversion Pair</Card.Header>
      <Card.Body>
      <div className='col'>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId='pairs'>
            <Form.Check value='BTC/USD' type='radio' onChange={handleChange} aria-label='radio-1' label='BTC/USD' checked={pairs === 'BTC/USD'}/>
            <Form.Check value='ETH/USD' type='radio' onChange={handleChange} aria-label='radio-2' label='ETH/USD' checked={pairs === 'ETH/USD'}/>
            <Form.Check value='LINK/USD' type='radio' onChange={handleChange} aria-label='radio-3' label='LINK/USD' checked={pairs === 'LINK/USD'}/>
            <Form.Check value='BTC/ETH' type='radio' onChange={handleChange} aria-label='radio-4' label='BTC/ETH' checked={pairs === 'BTC/ETH'}/>
          </Form.Group>
        </Form>
        <div className='mt-5'>
          <Button type='submit' onClick={getPair} size='sm' variant='outline-primary'>
            Get Answer from Chainlink Oracle
          </Button>
        </div>
        </div>
      </Card.Body>
    </Card>
        <div className='col-md-6'>
          <Card style={{ width: '32rem' }} className='mt-5 shadow bg-body rounded'>
            <Card.Header a5='h5'>Result</Card.Header>
            <Card.Body>
              <div className='col'>
                <h5> {pairs} ={'>'} {storedPrice} </h5>
              </div>
            </Card.Body>
          </Card>
        </div>
    </div>

   
    </div>
  );
}
 
export default App;