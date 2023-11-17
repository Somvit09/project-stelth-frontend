import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

const CustomerDataTable = () => {
  const [open, setOpen] = useState(false);
  const [editedData, setEditedData] = useState({
    customerName: '',
    customerPhoneNumber: '',
    customerImages: '',
    customerEmail: '',
  });
  const [customers, setCustomers] = useState([]);
  const [selectedCustomers, setSelectedCustomers] = useState(null);
  const fetchCustomers = async () => {
    try {
      const merchantToken = localStorage.getItem('merchantToken')
      if (!merchantToken){
        console.log('Authorization failed, token not found')
        return 
      }
      const response = await fetch('https://node-backend.up.railway.app/merchant/all-customers', {
        method: 'GET',
        headers: {
          'Authorization': merchantToken,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        // Map each customer to include a unique `id` property
        const customersWithId = data.allCustomers.map((customer) => ({
            ...customer,
            id: customer.customerID,
          }));
  
        setCustomers(customersWithId)
      } else {
        console.error('Failed to fetch apparel data');
      }
    } catch (error) {
      console.error('Error fetching apparel data:', error);
    }
  };
  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleEditClick = (row) => {
    setSelectedCustomers(row);
    setEditedData(row);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData({ ...editedData, [name]: value });
  };

  const handleSaveChanges = async () => {
    try {
      const merchantToken = localStorage.getItem('merchantToken')
      if (!merchantToken){
        console.log('Authorization failed, token not found')
        return 
      }
      if (!selectedCustomers) {
        console.log("No apparels to edit.")
        return
      }
      const customerID = selectedCustomers.customerID
      const response = await fetch(`https://node-backend.up.railway.app/merchant/apparel/update/${customerID}`, {
        method: 'POST',
        headers: {
          'Authorization': merchantToken,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedData),
      });

      if (response.ok) {
        setOpen(false);
        fetchCustomers();
      } else {
        console.error('Failed to save changes');
      }
    } catch (error) {
      console.error('Error saving changes:', error);
    }
  };

  return (
    <div>
      <DataGrid
        rows={customers}
        columns={[
          { field: 'customerID', headerName: 'Customer ID', width: 150 },
          { field: 'customerName', headerName: 'Customer Name', width: 200 },
          { field: 'customerPhoneNumber', headerName: 'Phone Number', width: 150 },
          { field: 'customerImages', headerName: 'Customer Image', width: 200 },
          { field: 'customerEmail', headerName: 'Customer Email', width: 150 },
        ]}
        pageSize={5}
        checkboxSelection
      />

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={{
            width: 600, // Increased width
            bgcolor: 'background.paper',
            p: 4,
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            outline: 'none',
            borderRadius: '8px',
            '& > div': {
              marginBottom: '1rem', // Added spacing between inputs
            },
          }}
        >
          <Typography variant='h6' component='h2' mb={2}>
            Edit Row
          </Typography>
          {selectedCustomers && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <TextField
                label='Apparel Name'
                name='apparelName'
                fullWidth
                value={editedData.apparelName}
                onChange={handleInputChange}
                variant='outlined'
              />
              <TextField
                label='Apparel Type'
                name='apparelType'
                fullWidth
                value={editedData.apparelType}
                onChange={handleInputChange}
                variant='outlined'
              />
              <TextField
                label='Image'
                name='imageUrl'
                fullWidth
                value={editedData.imageUrl}
                onChange={handleInputChange}
                variant='outlined'
              />
              <TextField
                label='Status'
                name='status'
                fullWidth
                value={editedData.status}
                onChange={handleInputChange}
                variant='outlined'
              />
              <Button variant='contained' color='primary' onClick={handleSaveChanges}>
                Save Changes
              </Button>
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default CustomerDataTable;
