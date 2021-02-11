import axios from 'axios';

export async function getTransaction({ transactionToken, userId, orderId }) {
  
  let response;
  console.log(process.env.REACT_APP_BASE_API_URI)
  
  try {
    await fetch(`https://amal.express/api/getPoliTransaction?token=${transactionToken}&userId=${userId}&orderId=${orderId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic UzYxMDM4NzY6UFJGUVNKNVk='
      }
    })
  } catch (e) {
    
    console.log(e)
  }
}

export async function createPoliLink({ sendAmount, orderId }) {
  let response;
  try {
    
    response = await fetch(`https://amal.express/api/createPoliLink?amount=${sendAmount}&orderId=${orderId}`, {
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      }
    })

  } catch (e) {
    console.log(e)
    
  }

  const data = await response.json();
  
  return data
}

