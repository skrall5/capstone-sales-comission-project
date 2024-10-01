import { FormLabel } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import './form.css';

const Form = () => {
  const [showAdminForm, setShowAdminForm] = useState(false);
  const [showSalesRepForm, setShowSalesRepForm] = useState(false);
  const showAdmin = () => {
    setShowAdminForm(true);
    setShowSalesRepForm(false);
  };

  const showSalesRep = () => {
    setShowSalesRepForm(true);
    setShowAdminForm(false);
  };

  const close = () => {
    setShowSalesRepForm(false);
    setShowAdminForm(false);
  };
  const [checkboxState, setCheckboxState] = useState({
    productType1: false,
    productType2: false,
    productType3: false,
  });

  // Checkbox change handler
  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setCheckboxState((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };
  const [adminFormData, setAdminFormData] = useState({
    company: '',
    industry: '',
    seasonalityChoice: '',
    fiscalYearStart: '',
    fiscalYearEnd: '',
    fiscalQuarters: '',
    productType1: '',
    productType2: '',
    productType3: '',
    rampTime: '',
    Q1: '',
    Q2: '',
    Q3: '',
    Q4: '',
    revenueSize: '',
    a1: '',
    a2: '',
    a3: '',
    a4: '',
  });

  const [salesRepFormData, setSalesRepFormData] = useState({
    employeeName: '',
    company: '',
    title: '',
    managersName: '',
    currentJobTitle: '',
    startDate: '',
    salesTarget: '',
    baseSalary: '',
    comRate: '',
    totalQuota: '',
    productType1: '',
    productType2: '',
    productType3: '',
    hardwareQuota: '',
    softwareQuota: '',
    servicesQuota: '',
  });

  const handleAdminChange = (event) => {
    const { name, value, type, checked } = event.target;
    if (type === 'checkbox') {
      if (checked) {
        setAdminFormData({
          ...adminFormData,
          productType: [...adminFormData.productType, value],
        });
      } else {
        setAdminFormData({
          ...adminFormData,
          productType: adminFormData.productType.filter((item) => item !== value),
        });
      }
    } else {
      setAdminFormData({ ...adminFormData, [name]: value });
    }
  };

  const handleSalesRepChange = (event) => {
    const { name, value } = event.target;
    setSalesRepFormData({ ...salesRepFormData, [name]: value });
  };

  const handleSubmitAdmin = async (event) => {
    event.preventDefault();
    try {
      const formData = {
        form_type: 'adminFormData',
        ...adminFormData,
        company: document.getElementById('company').value,
        industry: document.getElementById('industry').value,
        revenueSize: document.getElementById('revenueSize').value,
        seasonalityChoice: document.getElementById('seasonalityChoice').value,
        fiscalYearStart: document.getElementById('fiscalYearStart').value,
        fiscalYearEnd: document.getElementById('fiscalYearEnd').value,
        productType1: document.getElementById('productType1').value,
        productType2: document.getElementById('productType2').value,
        productType3: document.getElementById('productType3').value,
        rampTime: document.getElementById('rampTime').value,
        Q1: document.getElementById('Q1').value,
        Q2: document.getElementById('Q2').value,
        Q3: document.getElementById('Q3').value,
        Q4: document.getElementById('Q4').value,
        a1: document.getElementById('a1').value,
        a2: document.getElementById('a2').value,
        a3: document.getElementById('a3').value,
        a4: document.getElementById('a4').value,
      };
      const response = await axios.post('http://localhost:5000/predict', formData);
      console.log('Admin Form response:', response.data);
      alert('Admin form data submitted successfully.');
    } catch (error) {
      console.error('Error submitting admin form:', error);
    }
  };

  const handleSubmitSalesRep = async (event) => {
    event.preventDefault();
    try {
      const formData = {
        form_type: 'salesRepFormData',
        ...salesRepFormData,
        employeeName: document.getElementById('employeeName').value,
        company: document.getElementById('company').value,
        title: document.getElementById('title').value,
        managersName: document.getElementById('managersName').value,
        currentJobTitle: document.getElementById('currentJobTitle').value,
        startDate: document.getElementById('startDate').value,
        baseSalary: document.getElementById('baseSalary').value,
        comRate: document.getElementById('comRate').value,
        totalQuota: document.getElementById('totalQuota').value,
        productType1: document.getElementById('productType1').value,
        productType2: document.getElementById('productType2').value,
        productType3: document.getElementById('productType3').value,
        hardwareQuota: document.getElementById('hardwareQuota').value,
        softwareQuota: document.getElementById('softwareQuota').value,
        servicesQuota: document.getElementById('servicesQuota').value,
      };
      const response = await axios.post('http://localhost:5000/predict', formData);
      console.log('Sales Rep Form response:', response.data);
      alert('Sales rep form data submitted successfully.');
    } catch (error) {
      console.error('Error submitting sales rep form:', error);
      alert('Sales rep form data submitted successfully.');
    }
  };

  return (
    <div className="emllc__whatemllc section__margin" id="emllc">
      <div className="emllc__whatemllc-heading">
        <h1 className="gradient__text">Commission Plan Form Options</h1>
        <div className="buttons-container">
          <button type="button" onClick={showAdmin}>Open Admin Form</button>
          <button type="button" onClick={showSalesRep}>Open Sales Rep Form</button>
          <button type="button" onClick={close}>Close Form</button> {/* If you have a Close button */}
        </div>
      </div>

      <section>
        <div className="form">
          {showAdminForm && (
            <form onSubmit={handleSubmitAdmin}>
              <div>
                <FormLabel htmlFor="company">Organization name/division:</FormLabel>
                <input type="text" id="company" name="company" placeholder="Organization name" required onChange={handleAdminChange} />
              </div>
              <br />
              <div>
                <FormLabel htmlFor="industry">Industry:</FormLabel>
                <select id="industry" name="industry">
                  <option value="Agriculture">Agriculture</option>
                  <option value="Alcohol">Alcohol</option>
                  <option value="Appliances">Appliances</option>
                  <option value="Automotive">Automotive</option>
                  <option value="Banking">Banking</option>
                  <option value="Biomedical">Biomedical</option>
                  <option value="Biotechnology">Biotechnology</option>
                  <option value="Construction">Construction</option>
                  <option value="Education">Education</option>
                  <option value="Financial Services">Financial Services</option>
                  <option value="Fishing">Forestry and Fishing</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Insurance">Insurance</option>
                  <option value="Medical Equipment">Medical Equipment</option>
                  <option value="Mining">Mining</option>
                  <option value="Oil and Gas">Oil and Gas</option>
                  <option value="Pharmaceuticals">Pharmaceuticals</option>
                  <option value="Security Hardware">Security Hardware</option>
                  <option value="Security Software">Security Software</option>
                  <option value="Software">Software</option>
                  <option value="Technology Hardware">Technology Hardware</option>
                  <option value="Technology Services">Technology Services</option>
                  <option value="Travel">Travel</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <br />
              <div>
                <FormLabel htmlFor="seasonality">Is The Business Seasonal:</FormLabel><br /><br />
                <FormLabel htmlFor="seasonalityChoice">Yes</FormLabel>
                <input type="radio" id="seasonalityYes" name="seasonality" value="Yes" /><br /><br />
                <FormLabel htmlFor="seasonalityNo">No</FormLabel>
                <input type="radio" id="seasonalityChoice" name="seasonality" value="No" />
              </div>
              <br />
              <div>
                <FormLabel htmlFor="fiscalYearStart">Fiscal Year Start Date:</FormLabel>
                <input type="date" id="fiscalYearStart" name="fiscalYearStart" required />
              </div>
              <br />
              <div>
                <FormLabel htmlFor="fiscalYearEnd">Fiscal Year End Date:</FormLabel>
                <input type="date" id="fiscalYearEnd" name="fiscalYearEnd" required />
              </div>
              <br />
              <div>
                <FormLabel>Product type:</FormLabel><br />
                <input type="checkbox" id="productType1" name="productType1" checked={checkboxState.productType1} onChange={handleCheckboxChange} />
                <FormLabel htmlFor="productType1">Hardware</FormLabel><br />
                <input type="checkbox" id="productType2" name="productType2" checked={checkboxState.productType2} onChange={handleCheckboxChange} />
                <FormLabel htmlFor="productType2">Software</FormLabel><br />
                <input type="checkbox" id="productType3" name="productType3" checked={checkboxState.productType3} onChange={handleCheckboxChange} />
                <FormLabel htmlFor="productType3">Services</FormLabel><br />
              </div>
              <br />
              <div>
                <FormLabel htmlFor="rampTime">Sales Person Ramp up time:</FormLabel>
                <input type="number" id="rampTime" name="rampTime" placeholder="Ramp up time" required />
              </div>
              <br />
              <div>
                <FormLabel htmlFor="quarterlySplits">Enter Quarterly Splits (Overrides AI Values) For:</FormLabel>
                <br /> <br />
                <FormLabel htmlFor="Q1">Q1:</FormLabel>
                <input type="number" id="Q1" name="Q1" placeholder="25%" />
                <br /> <br />
                <FormLabel htmlFor="Q2">Q2:</FormLabel>
                <input type="number" id="Q2" name="Q2" placeholder="25%" />
                <br /> <br />
                <FormLabel htmlFor="Q3">Q3:</FormLabel>
                <input type="number" id="Q3" name="Q3" placeholder="25%" />
                <br /> <br />
                <FormLabel htmlFor="Q4">Q4:</FormLabel>
                <input type="number" id="Q4" name="Q4" placeholder="25%" />
              </div>
              <br />
              <div>
                <FormLabel htmlFor="revenueSize">Enter Revenue Size:</FormLabel>
                <input type="number" id="revenueSize" name="revenueSize" placeholder="Revenue Size" />
              </div>
              <br />
              <div>
                <FormLabel htmlFor="acceleratorSplits">Enter Accelerators For:</FormLabel>
                <br /> <br />
              </div>
              <div>
                <FormLabel htmlFor="a1">0-50%: </FormLabel>
                <input type="number" id="a1" name="a1" placeholder="num" step="0.01" />
                <br /> <br />
              </div>
              <div>
                <FormLabel htmlFor="a2">51-100%: </FormLabel>
                <input type="number" id="a2" name="a2" placeholder="num" step="0.01" />
                <br /> <br />
              </div>
              <div>
                <FormLabel htmlFor="a3">101-150%: </FormLabel>
                <input type="number" id="a3" name="a3" placeholder="num" step="0.01" />
                <br /> <br />
              </div>
              <div>
                <FormLabel htmlFor="a4">150%+ </FormLabel>
                <input type="number" id="a4" name="a4" placeholder="num" step="0.01" />
              </div>

              <br />
              <input type="reset" className="button" />
              <input type="submit" className="button" />
            </form>
          )}

          {showSalesRepForm && (
            <div className="form">
              <form onSubmit={handleSubmitSalesRep}>
                <div>
                  <FormLabel htmlFor="employeeName">Employee Name *</FormLabel>
                  <input type="text" id="employeeName" name="employeeName" required placeholder="John Doe" onChange={handleSalesRepChange} />
                </div>
                <br />
                <div>
                  <FormLabel htmlFor="company">Organization name/division:</FormLabel>
                  <input type="text" id="company" name="company" placeholder="Organization name" required />
                </div>
                <br />
                <div>
                  <FormLabel htmlFor="title">Employee Title *</FormLabel>
                  <input type="text" id="title" name="title" required placeholder="Sales Manager" />
                </div>
                <br />
                <div>
                  <FormLabel htmlFor="managersName">Manager Name </FormLabel>
                  <input type="text" id="managersName" name="managersName" placeholder="John Doe" />
                </div>
                <br />
                <div>
                  <FormLabel htmlFor="currentJobTitle">Current job title *</FormLabel>
                  <input type="text" id="currentJobTitle" name="currentJobTitle" required placeholder="Title" />
                </div>
                <br />
                <div>
                  <FormLabel htmlFor="startDate">Start date with the company *</FormLabel>
                  <input type="date" id="startDate" name="startDate" required />
                </div>
                <br />
                <div>
                  <FormLabel htmlFor="baseSalary">Base Compensation *</FormLabel>
                  <input type="number" id="baseSalary" name="baseSalary" required placeholder="100000" />
                </div>
                <br />
                <div>
                  <FormLabel htmlFor="comRate">Commission Rate *</FormLabel>
                  <input type="number" id="comRate" name="comRate" required placeholder="10%" />
                </div>
                <br />
                <div>
                  <FormLabel htmlFor="totalQuota">Total Quota *</FormLabel>
                  <input type="number" id="totalQuota" name="totalQuota" required placeholder="1000000" />
                </div>
                <br />
                <div>
                  <FormLabel>Product type:</FormLabel><br />
                  <input type="checkbox" id="productType1" name="productType1" checked={checkboxState.productType1} onChange={handleCheckboxChange} />
                  <FormLabel htmlFor="productType1">Hardware</FormLabel><br />
                  <input type="checkbox" id="productType2" name="productType2" checked={checkboxState.productType2} onChange={handleCheckboxChange} />
                  <FormLabel htmlFor="productType2">Software</FormLabel><br />
                  <input type="checkbox" id="productType3" name="productType3" checked={checkboxState.productType3} onChange={handleCheckboxChange} />
                  <FormLabel htmlFor="productType3">Services</FormLabel><br />
                </div>
                <br />
                <div>
                  <FormLabel htmlFor="hardwareQuota">Yearly Quota Split For Hardware </FormLabel>
                  <input type="number" id="hardwareQuota" name="hardwareQuota" placeholder="500000" />
                </div>
                <br />
                <div>
                  <FormLabel htmlFor="softwareQuota">Yearly Quota Split For Software </FormLabel>
                  <input type="number" id="softwareQuota" name="softwareQuota" placeholder="500000" />
                </div>
                <br />
                <div>
                  <FormLabel htmlFor="servicesQuota">Yearly Quota Split For Services </FormLabel>
                  <input type="number" id="servicesQuota" name="servicesQuota" placeholder="500000" />
                </div>
                <br />
                <input type="reset" className="button" />
                <input type="submit" className="button" />
              </form>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Form;
