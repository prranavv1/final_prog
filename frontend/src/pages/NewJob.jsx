import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/NewJob.css";


function NewJob() {

  const [customers, setCustomers] = useState([]);
  const [customer, setCustomer] = useState("");

  const [jobStartDate, setJobStartDate] = useState("");
  const [productService, setProductService] = useState("");

  const [site, setSite] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");

  // Transport
  const [transportMode, setTransportMode] = useState("");
  const [vehicleDetail, setVehicleDetail] = useState("");
  const [driverAccompanied, setDriverAccompanied] = useState("");
  const [powerPlantType, setPowerPlantType] = useState("");

  // Engineers
  const engineers = ["Engineer-1", "Engineer-2", "Engineer-3", "Engineer-4", "Engineer-5"];
  const [leadEngineer, setLeadEngineer] = useState("");
  const [supportingEngineers, setSupportingEngineers] = useState([]);

  // Tests
  const tests = ["IR Test", "Tan Delta", "Thermography", "Vibration Analysis"];
  const [plannedTests, setPlannedTests] = useState([]);

  // Assets
const assets = ["Camera", "Laptop", "Testing Kit", "Tool Box"];
const [assetsCarried, setAssetsCarried] = useState([]);


  const [jobActivity, setJobActivity] = useState("");
  const [customerSearch, setCustomerSearch] = useState("");
const [showCustomerList, setShowCustomerList] = useState(false);
const [generatedJobNo, setGeneratedJobNo] = useState("");
const [stateSearch, setStateSearch] = useState("");
const [showStateList, setShowStateList] = useState(false);

const [countrySearch, setCountrySearch] = useState("");
const [showCountryList, setShowCountryList] = useState(false);

const STATES = [
  "Telangana",
  "Andhra Pradesh",
  "Karnataka",
  "Tamil Nadu",
  "Maharashtra",
  "Gujarat",
  "Rajasthan"
];

const COUNTRIES = [
  "India",
  "United Arab Emirates",
  "Singapore",
  "Qatar",
  "Saudi Arabia"
];

  // Fetch customers
  useEffect(() => {
    axios.get("http://localhost:8000/api/customers")
      .then(res => {
        setCustomers(res.data); // [{ customer_name: "ABB Ltd." }, ...]

      })
      .catch(err => console.error("Customer fetch error:", err));
  }, []);

  // Save Job
 const handleSave = async () => {

  // 🔴 ADD THIS CHECK AT THE TOP
  if (!customer) {
    alert("Please select customer from dropdown");
    return;
  }

  try {
  const res = await axios.post("http://localhost:8000/jobs", {
    customer: customer,

    product_service: productService || null,
    job_site: site || null,
    job_state: state || null,
    job_country: country || null,

    transport_mode_id: transportMode ? Number(transportMode) : null,
    vehicle_detail_id: vehicleDetail ? Number(vehicleDetail) : null,
    driver_accompanied_id: driverAccompanied ? Number(driverAccompanied) : null,
    power_plant_type_id: powerPlantType ? Number(powerPlantType) : null,

    lead_engineer: leadEngineer || null,
    supporting_engineers: supportingEngineers || [],
    assets_carried: assetsCarried || [],
    planned_tests: plannedTests || [],

    job_activity: jobActivity || null,
    job_work_status_id: 1,
    job_report_status_id: 1,
    job_start_date: jobStartDate
  });

  // ✅ THIS is where you set the generated job number
  setGeneratedJobNo(res.data.job_no);

  alert("Job added successfully. Job No: " + res.data.job_no);

} catch (err) {
  console.error(err.response?.data);
  alert("Failed to save job");
}
 };




  return (
  <div className="newjob-wrapper">
    <div className="page-header">
      <h1>NEW JOB</h1>
      
    </div>

    <div className="form-card">
      <div className="form-header">
        <div>
          <h2>NEW JOB ENTRY</h2>
          <p>Please ensure all mandatory technical details are accurate.</p>
        </div>
        <div className="form-actions-top">
          <button className="cancel-btn">Cancel</button>
<button className="save-btn" onClick={handleSave}>Save Record</button>

        </div>
      </div>

      {generatedJobNo && (
        <div className="job-no-box">
          Generated Job Number: {generatedJobNo}
        </div>
      )}

      <div className="newjob-grid">


        {/* CUSTOMER */}
        <div className="field">
          <label>CUSTOMER *</label>
          <input
            placeholder="Search Client DB..."
            value={customerSearch}
            onChange={(e) => {
              setCustomerSearch(e.target.value);
              setShowCustomerList(true);
            }}
          />

          {showCustomerList && (
            <div className="customer-dropdown">
              {customers
                .filter(c =>
                  c.customer_name
                    .toLowerCase()
                    .includes(customerSearch.toLowerCase())
                )
                .map(c => (
                  <div
                    key={c.customer_name}
                    onMouseDown={() => {
                      setCustomerSearch(c.customer_name);
                      setCustomer(c.customer_name);
                      setShowCustomerList(false);
                    }}
                  >
                    {c.customer_name}
                  </div>
                ))}
            </div>
          )}
        </div>

        <div className="field">
          <label>JOB START DATE *</label>
          <input type="date" value={jobStartDate}
            onChange={e => setJobStartDate(e.target.value)} />
        </div>

        <div className="field">
          <label>PRODUCT / SERVICE *</label>
          <input value={productService}
            onChange={e => setProductService(e.target.value)} />
        </div>

        <div className="field">
          <label>SITE LOCATION *</label>
          <input value={site}
            onChange={e => setSite(e.target.value)} />
        </div>

        <div className="field">
  <label>STATE <span className="required">*</span></label>
  <input
    placeholder=" "
    value={stateSearch}
    onChange={(e) => {
      setStateSearch(e.target.value);
      setShowStateList(true);
    }}
    onFocus={() => setShowStateList(true)}
  />

  {showStateList && (
    <div className="dropdown">
      {STATES
        .filter(s =>
          s.toLowerCase().includes(stateSearch.toLowerCase())
        )
        .map(s => (
          <div
            key={s}
            onMouseDown={() => {
              setState(s);
              setStateSearch(s);
              setShowStateList(false);
            }}
          >
            {s}
          </div>
        ))}
    </div>
  )}
</div>


        <div className="field">
  <label>COUNTRY <span className="required">*</span></label>
  <input
    placeholder=" "
    value={countrySearch}
    onChange={(e) => {
      setCountrySearch(e.target.value);
      setShowCountryList(true);
    }}
    onFocus={() => setShowCountryList(true)}
  />

  {showCountryList && (
    <div className="dropdown">
      {COUNTRIES
        .filter(c =>
          c.toLowerCase().includes(countrySearch.toLowerCase())
        )
        .map(c => (
          <div
            key={c}
            onMouseDown={() => {
              setCountry(c);
              setCountrySearch(c);
              setShowCountryList(false);
            }}
          >
            {c}
          </div>
        ))}
    </div>
  )}
</div>

        <div className="field">
  <label>MODE OF TRANSPORT <span className="required">*</span></label>
  <select value={transportMode} onChange={e => setTransportMode(e.target.value)}>
    <option value="">Select</option>
    <option value="1">Air</option>
    <option value="2">Company Vehicle</option>
  </select>
</div>

<div className="field">
  <label>VEHICLE DETAIL <span className="required">*</span></label>
  <select value={vehicleDetail} onChange={e => setVehicleDetail(e.target.value)}>
    <option value="">Select</option>
    <option value="1">Mahindra Xylo</option>
    <option value="2">Innova</option>
  </select>
</div>

<div className="field">
  <label>DRIVER ACCOMPANIED <span className="required">*</span></label>
  <select value={driverAccompanied} onChange={e => setDriverAccompanied(e.target.value)}>
    <option value="">Select</option>
    <option value="1">Yes</option>
    <option value="2">No</option>
  </select>
</div>

<div className="field">
  <label>POWER PLANT TYPE <span className="required">*</span></label>
  <select value={powerPlantType} onChange={e => setPowerPlantType(e.target.value)}>
    <option value="">Select</option>
    <option value="1">Thermal</option>
    <option value="2">Solar</option>
    <option value="3">Hydro</option>
  </select>
</div>

<div className="field">
  <label>LEAD ENGINEER *</label>
  <select value={leadEngineer} onChange={e => setLeadEngineer(e.target.value)}>
    <option value="">Select</option>
    {engineers.map(e => (
      <option key={e}>{e}</option>
    ))}
  </select>
</div>

<div className="field">
  <label>SUPPORTING ENGINEERS <span className="required">*</span></label>
  <select
    value=""
    onChange={(e) => {
      const value = e.target.value;
      if (!supportingEngineers.includes(value)) {
        setSupportingEngineers([...supportingEngineers, value]);
      }
    }}
  >
    <option value="">Select engineer</option>
    {engineers.map(e => (
      <option key={e} value={e}>{e}</option>
    ))}
  </select>

  {/* Selected values display */}
  <div className="selected-list">
    {supportingEngineers.map((e, i) => (
      <span
        key={i}
        onClick={() =>
          setSupportingEngineers(
            supportingEngineers.filter(x => x !== e)
          )
        }
      >
        {e} ✕
      </span>
    ))}
  </div>
</div>


<div className="field">
  <label>ASSETS CARRIED <span className="required">*</span></label>
  <select
    value=""
    onChange={(e) => {
      const value = e.target.value;
      if (!assetsCarried.includes(value)) {
        setAssetsCarried([...assetsCarried, value]);
      }
    }}
  >
    <option value="">Select asset</option>
    {assets.map(a => (
      <option key={a} value={a}>{a}</option>
    ))}
  </select>

  <div className="selected-list">
    {assetsCarried.map((a, i) => (
      <span
        key={i}
        onClick={() =>
          setAssetsCarried(
            assetsCarried.filter(x => x !== a)
          )
        }
      >
        {a} ✕
      </span>
    ))}
  </div>
</div>


<div className="field">
  <label>PLANNED TESTS <span className="required">*</span></label>
  <select
    value=""
    onChange={(e) => {
      const value = e.target.value;
      if (!plannedTests.includes(value)) {
        setPlannedTests([...plannedTests, value]);
      }
    }}
  >
    <option value="">Select test</option>
    {tests.map(t => (
      <option key={t} value={t}>{t}</option>
    ))}
  </select>

  <div className="selected-list">
    {plannedTests.map((t, i) => (
      <span
        key={i}
        onClick={() =>
          setPlannedTests(
            plannedTests.filter(x => x !== t)
          )
        }
      >
        {t} ✕
      </span>
    ))}
  </div>
</div>



        <div className="field">
          <label>MACHINE & ACTIVITY DETAILS *</label>
          <textarea
  value={jobActivity}
  onChange={e => setJobActivity(e.target.value)}
/>

        </div>

      </div>
    </div>
  </div>
);

}

export default NewJob;
