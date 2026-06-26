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
  const PLANNED_TESTS = [
    { id: 1, name: "Insulation Resistance Test" },
    { id: 2, name: "Polarization Index Test" },
    { id: 3, name: "Tan Delta / Dissipation Factor" },
    { id: 4, name: "Partial Discharge Measurement" },
    { id: 5, name: "Infrared Thermography" },
    { id: 6, name: "Vibration Analysis" },
    { id: 7, name: "Functional / Operational Test" },
    { id: 8, name: "Others" }
  ];
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
    <div className="nj-page">
      {/* Page Header */}
      <div className="nj-header">
        <h2>NEW JOB ENTRY</h2>
      </div>

      {/* Success Message */}
      {generatedJobNo && (
        <div className="nj-success-message">
          Job Created Successfully - <strong>Job Number: {generatedJobNo}</strong>
        </div>
      )}

      {/* Main Form Container */}
      <div className="nj-form-container">
        <div className="nj-main-form">
          <div className="nj-form-content">
            
            {/* Basic Information Section */}
            <div className="nj-form-grid">
              <div className="nj-section-divider">
                <span className="nj-section-label">Basic Information</span>
              </div>
              
              <div className="nj-form-field">
                <label>Customer <span className="required">*</span></label>
                <input
                  placeholder="Search client database..."
                  value={customerSearch}
                  onChange={(e) => {
                    setCustomerSearch(e.target.value);
                    setShowCustomerList(true);
                  }}
                  onFocus={() => setShowCustomerList(true)}
                  onBlur={() => setTimeout(() => setShowCustomerList(false), 200)}
                />
                {showCustomerList && customerSearch && (
                  <div className="nj-dropdown">
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

              <div className="nj-form-field">
                <label>Job Start Date <span className="required">*</span></label>
                <input type="date" value={jobStartDate}
                  onChange={e => setJobStartDate(e.target.value)} />
              </div>

              <div className="nj-form-field">
                <label>Product / Service <span className="required">*</span></label>
                <select value={productService} onChange={e => setProductService(e.target.value)}>
                  <option value="">Select type...</option>
                  <option value="Product">Product</option>
                  <option value="Service">Service</option>
                </select>
              </div>

              <div className="nj-form-field">
                <label>Site Location <span className="required">*</span></label>
                <input 
                  placeholder="Enter site location"
                  value={site}
                  onChange={e => setSite(e.target.value)} 
                />
              </div>
            </div>

            {/* Location Details Section */}
            <div className="nj-form-grid">
              <div className="nj-section-divider">
                <span className="nj-section-label">Location Details</span>
              </div>
              
              <div className="nj-form-field">
                <label>State <span className="required">*</span></label>
                <input
                  placeholder="Type to search state..."
                  value={stateSearch}
                  onChange={(e) => {
                    setStateSearch(e.target.value);
                    setShowStateList(true);
                  }}
                  onFocus={() => setShowStateList(true)}
                  onBlur={() => setTimeout(() => setShowStateList(false), 200)}
                />
                {showStateList && (
                  <div className="nj-dropdown">
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

              <div className="nj-form-field">
                <label>Country <span className="required">*</span></label>
                <input
                  placeholder="Type to search country..."
                  value={countrySearch}
                  onChange={(e) => {
                    setCountrySearch(e.target.value);
                    setShowCountryList(true);
                  }}
                  onFocus={() => setShowCountryList(true)}
                  onBlur={() => setTimeout(() => setShowCountryList(false), 200)}
                />
                {showCountryList && (
                  <div className="nj-dropdown">
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

              <div className="nj-form-field">
                <label>Power Plant Type <span className="required">*</span></label>
                <select value={powerPlantType} onChange={e => setPowerPlantType(e.target.value)}>
                  <option value="">Select type...</option>
                  <option value="1">Hydroelectric</option>
                  <option value="2">Thermal</option>
                  <option value="3">Nuclear</option>
                  <option value="4">Wind</option>
                  <option value="5">Solar</option>
                  <option value="6">Others</option>
                </select>
              </div>

              <div className="nj-form-field">
                <label>Mode of Transport <span className="required">*</span></label>
                <select value={transportMode} onChange={e => setTransportMode(e.target.value)}>
                  <option value="">Select mode...</option>
                  <option value="1">By Air</option>
                  <option value="2">Prognosys Vehicle</option>
                  <option value="3">Public Transport - Bus</option>
                  <option value="4">Public Transport - Train</option>
                  <option value="5">Own Transportation</option>
                  <option value="6">Other</option>
                </select>
              </div>
            </div>

            {/* Transportation & Team Section */}
            <div className="nj-form-grid">
              <div className="nj-section-divider">
                <span className="nj-section-label">Transportation & Team</span>
              </div>
              
              <div className="nj-form-field">
                <label>Vehicle Detail <span className="required">*</span></label>
                <select value={vehicleDetail} onChange={e => setVehicleDetail(e.target.value)}>
                  <option value="">Select vehicle...</option>
                  <option value="1">Mahindra Xylo</option>
                  <option value="2">Innova</option>
                </select>
              </div>

              <div className="nj-form-field">
                <label>Driver Accompanied <span className="required">*</span></label>
                <select value={driverAccompanied} onChange={e => setDriverAccompanied(e.target.value)}>
                  <option value="">Select option...</option>
                  <option value="1">Yes</option>
                  <option value="2">No</option>
                </select>
              </div>

              <div className="nj-form-field">
                <label>Lead Engineer <span className="required">*</span></label>
                <select value={leadEngineer} onChange={e => setLeadEngineer(e.target.value)}>
                  <option value="">Select engineer...</option>
                  {engineers.map(e => (
                    <option key={e}>{e}</option>
                  ))}
                </select>
              </div>

              <div className="nj-form-field">
                <label>Supporting Engineers <span className="required">*</span></label>
                <select
                  value=""
                  onChange={(e) => {
                    const value = e.target.value;
                    if (!supportingEngineers.includes(value)) {
                      setSupportingEngineers([...supportingEngineers, value]);
                    }
                  }}
                >
                  <option value="">Select engineers...</option>
                  {engineers.map(e => (
                    <option key={e} value={e}>{e}</option>
                  ))}
                </select>
                {supportingEngineers.length > 0 && (
                  <div className="nj-selected-tags">
                    {supportingEngineers.map((e, i) => (
                      <span
                        key={i}
                        className="nj-tag"
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
                )}
              </div>
            </div>

            {/* Resources & Activity Section */}
            <div className="nj-form-grid">
              <div className="nj-section-divider">
                <span className="nj-section-label">Resources & Activity</span>
              </div>
              
              <div className="nj-form-field">
                <label>Assets Carried <span className="required">*</span></label>
                <select
                  value=""
                  onChange={(e) => {
                    const value = e.target.value;
                    if (!assetsCarried.includes(value)) {
                      setAssetsCarried([...assetsCarried, value]);
                    }
                  }}
                >
                  <option value="">Select assets...</option>
                  {assets.map(a => (
                    <option key={a} value={a}>{a}</option>
                  ))}
                </select>
                {assetsCarried.length > 0 && (
                  <div className="nj-selected-tags">
                    {assetsCarried.map((a, i) => (
                      <span
                        key={i}
                        className="nj-tag"
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
                )}
              </div>

              <div className="nj-form-field">
                <label>Planned Tests <span className="required">*</span></label>
                <select
                  value=""
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    if (value && !plannedTests.includes(value)) {
                      setPlannedTests([...plannedTests, value]);
                    }
                  }}
                >
                  <option value="">Select tests...</option>
                  {PLANNED_TESTS.map(t => (
                    <option key={t.id} value={t.id}>{t.name}</option>
                  ))}
                </select>
                {plannedTests.length > 0 && (
                  <div className="nj-selected-tags">
                    {plannedTests.map((id, i) => {
                      const test = PLANNED_TESTS.find(t => t.id === id);
                      return (
                        <span
                          key={i}
                          className="nj-tag"
                          onClick={() =>
                            setPlannedTests(
                              plannedTests.filter(x => x !== id)
                            )
                          }
                        >
                          {test?.name} ✕
                        </span>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className="nj-form-field span-2">
                <label>Machine & Activity Details <span className="required">*</span></label>
                <textarea
                  placeholder="Describe the machine and activity details..."
                  value={jobActivity}
                  onChange={e => setJobActivity(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Action Buttons - Fixed at bottom */}
          <div className="nj-form-actions">
            <button className="nj-btn-cancel" onClick={() => window.history.back()}>
              Cancel
            </button>
            <button className="nj-btn-save" onClick={handleSave}>
              Save Job Entry
            </button>
          </div>
        </div>
      </div>
    </div>
  );

}

export default NewJob;