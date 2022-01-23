import React from 'react'
import axios from 'axios'
import {useLocation} from "react-router-dom";
import '../../Components/assets/main.css'
export default function Application() {
  const clientId = 'ABrOwTX3hXgkfMSGc90PAahKuDw890Vpq5XN2Bg3DBdzldY6wL';
  const clientSecret = 'mYerpvoNJSTUWmfmEtkqa14qXH0pIN4dcxSrBaaF';
  const authorization_code = (clientId + ":" + clientSecret)
  const Authorization = "Basic " + Buffer.from(authorization_code).toString('base64');
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': Authorization
  }

  function qbointegration (event) {
    axios.get('https://wepull-back.herokuapp.com/authUri')
    .then(res=>{
      window.location.href = res.data;
    })
  }
  const search = useLocation().search;
  const authcode = new URLSearchParams(search).get('code')
  const realmId = new URLSearchParams(search).get('realmId')
  console.log(authcode, realmId)
  React.useEffect(() => {
    if (!authcode) return;
    const data = {
      'grant_type': 'authorization_code',
      'code': authcode,
      'redirect_uri': 'https://d1f3-188-43-136-33.ngrok.io/app',
      url: search
    }
    axios.get('https://wepull-back.herokuapp.com/callback' + search)
      .then((response) => {
        console.log(response.data)
      })
    // eslint-disable-next-line
  }, []);

 return (
    <div className="flex flex-col column justify-arround p-10">
      <div className="text-5xl font-bold text-center textstylecolor ">Accounting provider setup</div>
      <div className="text-3xl font-Medium text-center mt-10 mb-10 font-mono text-gray-400">Please select your data source</div>
      <div className="flex justify-around items-center">
        <button className="block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 hover:shadow-2xl ">
          <img className="object-between pl-5 pr-5 mb-5" src="../xero.png" alt="XERO" />
          <p className="text-center font-medium text-2xl text-gray-400 textstylecolor uppercase">XERO</p>
        </button>
        <button className="block p-6 max-w-xs bg-white rounded-lg border-2 border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 hover:shadow-2xl" onClick={qbointegration}>
          <img className="object-between " src="../Qb.png" alt="quickbook" />
          <p className="text-center font-medium text-lg mt-5 textstylecolor ">QuickBooks Online</p>
        </button>
        <button className="block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 hover:shadow-2xl">
          <img className="object-between pl-5 pr-5 mb-5" src="../Excel.png" alt="excel" />
          <p className="text-center font-medium text-2xl text-gray-400 textstylecolor uppercase">Trial Balance import</p>
        </button>
      </div>
    </div>   
  )
}
