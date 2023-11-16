import { FaMapMarker, FaMoneyBillWave } from 'react-icons/fa';
import './OverviewCard.css';
import { useState, useEffect } from 'react';

const OverviewCard = () => {
  const [merchantData, setMerchantData] = useState(null);
  useEffect(() => {
    const fetchMerchantData = async () => {
      try {
        const merchantToken = localStorage.getItem('merchantToken')
        if (!merchantToken){
          console.log('Authorization failed, token not found')
          return 
        }
        const response = await fetch('https://node-backend.up.railway.app/merchant/profile', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': merchantToken,
          }
        })
        if (response.ok) {
          const data = await response.json()
          setMerchantData(data.merchant)
        } else {
          console.log('failed to find merchant details')
        }
      } catch (err) {
        console.log(err.message)
      }
    }
    fetchMerchantData()
  }, [])
  return (
    <div className='outer-div bg-white rounded-lg shadow-lg p-8 max-w-xl mx-auto my-16 '>
      {/* Existing code */}
      <div className='header'>
        <h3 className='text-3xl font-bold text-gray-700 mb-2'>Basic Details</h3>
        <button className='edit-btn px-4 py-2 bg-blue-500 text-white rounded-md'>Edit</button>
      </div>
      {merchantData && (
        <>
          {/* Render fetched merchant data */}
          <div className='main-div space-x-4 space-y-4 '>
            <div className='userdetails'>
              {/* Display merchant details dynamically */}
              <div className='image'>
                <img src={merchantData.merchantLogo} alt='Profile' className='profile-image' />
              </div>
              <div className='box'>
                <div className='credentials'>
                  <h3 className='name text-xl'>{merchantData.merchantName}</h3>
                  <h3 className='email'>{merchantData.merchantEmail}</h3>
                </div>
                <h3 className='designation'>{merchantData.merchantDesignation}</h3>
              </div>
            </div>
            {/* Use fetched merchant details for other fields */}
            <div className='single-row'>
              <FaMapMarker className='mr-3 text-xl' />
              <h3 className='key'>Location</h3>
              <h3 className='value'>{merchantData.merchantLocation}</h3>
            </div>
            <div className='single-row'>
              <FaMoneyBillWave className='mr-3 text-xl' />
              <h3 className='key'>Price Plan</h3>
              <h3 className='value'>{merchantData.merchantPricingPlan}</h3>
            </div>
            <div className='single-row'>
              <FaMoneyBillWave className='mr-3 text-xl' />
              <h3 className='key'>Pricing Start Date</h3>
              <h3 className='value'>{merchantData.merchantPricingStarted}</h3>
            </div>
            <div className='single-row'>
              <FaMoneyBillWave className='mr-3 text-xl' />
              <h3 className='key'>Pricing End Date</h3>
              <h3 className='value'>{merchantData.merchantPricingEnded}</h3>
            </div>
            <div className='single-row'>
              <FaMoneyBillWave className='mr-3 text-xl' />
              <h3 className='key'>Color Theme</h3>
              <input className='value' type='color' id='favcolor' name='favcolor' value='#ff0000' />
            </div>
            {/* Display other merchant details similarly */}
          </div>
        </>
      )}
    </div>
  );
};

export default OverviewCard;
