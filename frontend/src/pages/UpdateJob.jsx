import React, { useState } from "react";
import axios from "axios";
import "../styles/UpdateJob.css";
import Select from "react-select";
import { useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";

const JOB_STATUS_MAP = {
  "To Be Executed": 1,
  "In Progress": 2,
  "Site Executed": 3,
  "Reporting": 2, // Map to In Progress as no specific backend status
  "Cancelled / On Hold": 1, // Map to To Be Executed/Pending
  "Job Completed": 3
};

const REPORT_STATUS_MAP = {
  "Job To Be Executed": 1,
  "Job Completed": 3,
  "Reporting Not Started": 1,
  "Reporting In Progress": 2,
  "Report In Review": 2,
  "Rob Cancelled / On Hold": 1
};

const DRIVER_MAP = {
  "Yes": 1,
  "No": 2
};

const TRANSPORT_MAP = {
  "By Air": 1,
  "Prognosys Vehicle": 2,
  "Public Transport - Bus": 3,
  "Public Transport - Train": 4,
  "Own Transportation": 5,
  "Other": 6
};

const POWER_PLANT_MAP = {
  "Thermal": 1,
  "Solar": 2,
  "Hydro": 3
};

function UpdateJob() {
  // Search and navigation
  const { jobNo: paramJobNo } = useParams(); 
  const [searchJobNo, setSearchJobNo] = useState(paramJobNo || ""); 

  // Job state
  const [jobNo, setJobNo] = useState("");
  const [customer, setCustomer] = useState("");
  const [customers, setCustomers] = useState([]);
  const [jobStartDate, setJobStartDate] = useState("");
  const [jobEndDate, setJobEndDate] = useState("");
  const [reportFinishDate, setReportFinishDate] = useState("");
  const [site, setSite] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [transportMode, setTransportMode] = useState("");
  const [leadEngineer, setLeadEngineer] = useState("");
  const [supportingEngineers, setSupportingEngineers] = useState([]);
  const [vehicleDetails, setVehicleDetails] = useState("");
  const [driverAccompanied, setDriverAccompanied] = useState("");
  const [assetsCarried, setAssetsCarried] = useState([]);
  const [plannedTests, setPlannedTests] = useState([]);
  const [powerPlantType, setPowerPlantType] = useState("");
  const [productService, setProductService] = useState("");
  const [jobStatus, setJobStatus] = useState("");
  const [jobReportStatus, setJobReportStatus] = useState("");
  const [reportPreparedBy, setReportPreparedBy] = useState("");
  const [reportReviewedBy, setReportReviewedBy] = useState("");
  const [jobActivity, setJobActivity] = useState("");
  const [quoteAmount, setQuoteAmount] = useState("");
  const [remarks, setRemarks] = useState("");
  const [stateSearch, setStateSearch] = useState("");
  const [showStateList, setShowStateList] = useState(false);
  const [countrySearch, setCountrySearch] = useState("");
  const [showCountryList, setShowCountryList] = useState(false);
  const [jobReportFile, setJobReportFile] = useState(null);
  const [supportingDocsFiles, setSupportingDocsFiles] = useState([]);

  // Dropdown options
  const engineerOptions = ["Engineer-1", "Engineer-2", "Engineer-3", "Engineer-4", "Engineer-5"];
  const transportOptions = [
    "By Air",
    "Prognosys Vehicle",
    "Public Transport - Bus",
    "Public Transport - Train",
    "Own Transportation",
    "Other"
  ];
  const vehicleOptions = ["Mahindra Xylo", "Innova", "Swift"];
  const yesNoOptions = ["Yes", "No"];
  const assetOptions = ["Camera", "Laptop", "Testing Kit", "Tool Box"];
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

  const jobStatusOptions = [
    "To Be Executed", "In Progress", "Site Executed", "Reporting", "Cancelled / On Hold", "Job Completed"
  ];
  const reportStatusOptions = [
    "Job To Be Executed",
    "Job Completed", 
    "Reporting Not Started",
    "Reporting In Progress",
    "Report In Review",
    "Report Completed",
    "Job Cancelled / On Hold"
  ];
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

  useEffect(() => {
    axios.get("http://localhost:8000/customers")
      .then(res => setCustomers(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleUpdate = async () => {
    try {
      const vehicleIndex = vehicleOptions.indexOf(vehicleDetails);
      const vehicleId = vehicleIndex >= 0 ? vehicleIndex + 1 : null;

      const payload = {
        customer: customer,
        product_service: productService,
        job_site: site,
        job_state: state,
        job_country: country,
        transport_mode_id: TRANSPORT_MAP[transportMode] || null,
        vehicle_detail_id: vehicleId,
        driver_accompanied_id: DRIVER_MAP[driverAccompanied] || null,
        power_plant_type_id: POWER_PLANT_MAP[powerPlantType] || null,
        lead_engineer: leadEngineer,
        supporting_engineers: supportingEngineers,
        assets_carried: assetsCarried,
        planned_tests: plannedTests,
        job_activity: jobActivity,
        job_work_status_id: JOB_STATUS_MAP[jobStatus] || null,
        job_report_status_id: REPORT_STATUS_MAP[jobReportStatus] || null,
        job_start_date: jobStartDate || null,
        job_end_date: jobEndDate || null,
        report_finish_date: reportFinishDate || null,
        report_prepared_by: reportPreparedBy,
        report_reviewed_by: reportReviewedBy,
        quote_amount: Number(quoteAmount),
        remarks: remarks
      };

      await axios.put(
        `http://localhost:8000/jobs/${jobNo}`,
        payload,
        {
          headers: { "Content-Type": "application/json" }
        }
      );

      alert("Job updated successfully");

    } catch (err) {
      console.error(err);
      alert("Failed to update job: " + (err.response?.data?.detail || err.message));
    }
  };

  const fetchJobDetails = useCallback(async (jobId) => {
    if (!jobId) return;
    try {
      const res = await axios.get(`http://localhost:8000/jobs/${jobId}`);
      const data = res.data;

      setJobNo(data.job_no);
      setCustomer(data.customer_name);
      setJobStartDate(data.job_start_date || "");
      setJobEndDate(data.job_end_date || "");
      setReportFinishDate(data.report_finish_date || "");
      setSite(data.job_site || "");
      setState(data.job_state || "");
      setStateSearch(data.job_state || "");
      setCountry(data.job_country || "");
      setCountrySearch(data.job_country || "");
      setTransportMode(Object.keys(TRANSPORT_MAP).find(key => TRANSPORT_MAP[key] === data.transport_mode_id) || "");
      setVehicleDetails(data.vehicle_detail_id ? vehicleOptions[data.vehicle_detail_id - 1] : "");
      setDriverAccompanied(Object.keys(DRIVER_MAP).find(key => DRIVER_MAP[key] === data.driver_accompanied_id) || "");
      setPowerPlantType(Object.keys(POWER_PLANT_MAP).find(key => POWER_PLANT_MAP[key] === data.power_plant_type_id) || "");
      setLeadEngineer(data.lead_engineer || "");
      setSupportingEngineers(data.supporting_engineers || []);
      setAssetsCarried(data.assets_carried || []);
      setPlannedTests(data.planned_tests || []);
      setProductService(data.product_service || "");
      setJobStatus(data.job_status || "");
      setJobReportStatus(data.job_report_status || "");
      setReportPreparedBy(data.report_prepared_by || "");
      setReportReviewedBy(data.report_reviewed_by || "");
      setJobActivity(data.job_activity || "");
      setQuoteAmount(data.quote_amount || "");
      setRemarks(data.remarks || "");

    } catch (err) {
      console.error(err);
      alert("Job not found");
    }
  }, []);

  const handleSearch = () => {
    if (!searchJobNo) {
      alert("Please enter Job Number");
      return;
    }
    fetchJobDetails(searchJobNo);
  };

  useEffect(() => {
    if (paramJobNo) {
      setSearchJobNo(paramJobNo);
      fetchJobDetails(paramJobNo);
    }
  }, [paramJobNo, fetchJobDetails]);

  const customerOptions = customers.map(c => ({
    value: c.customer_name,
    label: c.customer_name
  }));

  return (
    <div className="uj-page">
      {/* Page Header */}
      <div className="uj-header">
        <h2>UPDATE JOB</h2>
      </div>

      {/* Search Job Section */}
      <div className="uj-search-section">
        <h4>🔍 SEARCH JOB</h4>
        <div className="uj-search-grid">
          <div className="uj-field">
            <label>Job Number <span className="required">*</span></label>
            <input
              type="number"
              placeholder="Enter Job Number"
              value={searchJobNo}
              onChange={(e) => setSearchJobNo(e.target.value)}
            />
          </div>
          <button 
            className="search-btn"
            onClick={handleSearch}
            title="Search Job"
          >
            Search
          </button>
        </div>
      </div>

      {/* Main Form Container */}
      <div className="uj-main-form">
        <div className="uj-form-content">
          
          {/* Basic Information Section */}
          <div className="uj-grid">
            <div className="uj-section-divider">
              <span className="uj-section-label">Basic Information</span>
            </div>
            
            <div className="field">
              <label>Customer <span className="required">*</span></label>
              <Select
                options={customerOptions}
                value={customerOptions.find(c => c.value === customer)}
                onChange={(selected) => setCustomer(selected?.value)}
                placeholder="Search customer..."
                isClearable
                styles={{
                  control: (base) => ({
                    ...base,
                    minHeight: '36px',
                    height: '36px',
                    fontSize: '13px',
                    borderRadius: '6px',
                    borderColor: '#d1d5db',
                    padding: '0',
                    display: 'flex',
                    alignItems: 'center'
                  }),
                  valueContainer: (base) => ({
                    ...base,
                    padding: '0 12px',
                    height: '34px',
                    display: 'flex',
                    alignItems: 'center'
                  }),
                  input: (base) => ({
                    ...base,
                    margin: '0',
                    padding: '0',
                    color: '#1f2937'
                  }),
                  placeholder: (base) => ({
                    ...base,
                    color: '#9ca3af',
                    fontSize: '13px',
                    margin: '0'
                  }),
                  singleValue: (base) => ({
                    ...base,
                    color: '#1f2937',
                    fontSize: '13px',
                    margin: '0'
                  }),
                  indicatorsContainer: (base) => ({
                    ...base,
                    height: '34px',
                    padding: '0 4px'
                  }),
                  indicatorSeparator: (base) => ({
                    ...base,
                    margin: '6px 0'
                  }),
                  clearIndicator: (base) => ({
                    ...base,
                    padding: '4px',
                    ':hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.1)'
                    }
                  }),
                  dropdownIndicator: (base) => ({
                    ...base,
                    padding: '4px',
                    ':hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.1)'
                    }
                  }),
                  menu: (base) => ({
                    ...base,
                    borderRadius: '6px',
                    fontSize: '13px',
                    border: '1px solid #d1d5db',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                  }),
                  option: (base, state) => ({
                    ...base,
                    fontSize: '13px',
                    padding: '8px 12px',
                    backgroundColor: state.isFocused ? '#f8fafc' : 'white',
                    color: '#1f2937',
                    ':hover': {
                      backgroundColor: '#f8fafc'
                    }
                  })
                }}
              />
            </div>

            <div className="field">
              <label>Job Start Date <span className="required">*</span></label>
              <input type="date" value={jobStartDate} 
                onChange={(e) => setJobStartDate(e.target.value)} />
            </div>

            <div className="field">
              <label>Job Finish Date <span className="required">*</span></label>
              <input type="date" value={jobEndDate} 
                onChange={(e) => setJobEndDate(e.target.value)} />
            </div>

            <div className="field">
              <label>Report Finish Date</label>
              <input type="date" value={reportFinishDate} 
                onChange={(e) => setReportFinishDate(e.target.value)} />
            </div>
          </div>

          {/* Location & Service Section */}
          <div className="uj-grid">
            <div className="uj-section-divider">
              <span className="uj-section-label">Location & Service</span>
            </div>
            
            <div className="field">
              <label>Product / Service</label>
              <select value={productService} 
                onChange={(e) => setProductService(e.target.value)}>
                <option value="">Select type...</option>
                <option value="Product">Product</option>
                <option value="Service">Service</option>
              </select>
            </div>

            <div className="field">
              <label>Site <span className="required">*</span></label>
              <input value={site} 
                onChange={(e) => setSite(e.target.value)} 
                placeholder="Enter site location" />
            </div>

            <div className="field">
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
          </div>

          {/* Transportation Section */}
          <div className="uj-grid">
            <div className="uj-section-divider">
              <span className="uj-section-label">Transportation</span>
            </div>
            
            <div className="field">
              <label>Power Plant Type <span className="required">*</span></label>
              <select value={powerPlantType} 
                onChange={(e) => setPowerPlantType(e.target.value)}>
                <option value="">Select type...</option>
                <option value="1">Hydroelectric</option>
                <option value="2">Thermal</option>
                <option value="3">Nuclear</option>
                <option value="4">Wind</option>
                <option value="5">Solar</option>
                <option value="6">Others</option>
              </select>
            </div>

            <div className="field">
              <label>Mode of Transport <span className="required">*</span></label>
              <select value={transportMode} 
                onChange={(e) => setTransportMode(e.target.value)}>
                <option value="">Select mode...</option>
                {transportOptions.map(o => <option key={o}>{o}</option>)}
              </select>
            </div>

            <div className="field">
              <label>Vehicle Details <span className="required">*</span></label>
              <select value={vehicleDetails} 
                onChange={(e) => setVehicleDetails(e.target.value)}>
                <option value="">Select vehicle...</option>
                {vehicleOptions.map(v => <option key={v}>{v}</option>)}
              </select>
            </div>

            <div className="field">
              <label>Driver Accompanied <span className="required">*</span></label>
              <select value={driverAccompanied} 
                onChange={(e) => setDriverAccompanied(e.target.value)}>
                <option value="">Select option...</option>
                {yesNoOptions.map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
          </div>

          {/* Team & Resources Section */}
          <div className="uj-grid">
            <div className="uj-section-divider">
              <span className="uj-section-label">Team & Resources</span>
            </div>
            
            <div className="field">
              <label>Lead Engineer <span className="required">*</span></label>
              <select value={leadEngineer} 
                onChange={(e) => setLeadEngineer(e.target.value)}>
                <option value="">Select engineer...</option>
                {engineerOptions.map(e => <option key={e}>{e}</option>)}
              </select>
            </div>

            <div className="field">
              <label>Supporting Engineers <span className="required">*</span></label>
              <select
                value=""
                onChange={(e) => {
                  const value = e.target.value;
                  if (value && !supportingEngineers.includes(value)) {
                    setSupportingEngineers([...supportingEngineers, value]);
                  }
                }}
              >
                <option value="">Select engineers...</option>
                {engineerOptions.map(e => <option key={e} value={e}>{e}</option>)}
              </select>
              {supportingEngineers.length > 0 && (
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
              )}
            </div>

            <div className="field">
              <label>Assets Carried <span className="required">*</span></label>
              <select
                value=""
                onChange={(e) => {
                  const value = e.target.value;
                  if (value && !assetsCarried.includes(value)) {
                    setAssetsCarried([...assetsCarried, value]);
                  }
                }}
              >
                <option value="">Select assets...</option>
                {assetOptions.map(a => <option key={a} value={a}>{a}</option>)}
              </select>
              {assetsCarried.length > 0 && (
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
              )}
            </div>

            <div className="field">
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
                <div className="selected-list">
                  {plannedTests.map((id, i) => {
                    const test = PLANNED_TESTS.find(t => t.id === id);
                    return (
                      <span
                        key={i}
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
          </div>

          {/* Status & Additional Details Section */}
          <div className="uj-grid">
            <div className="uj-section-divider">
              <span className="uj-section-label">Status & Details</span>
            </div>
            
            <div className="field">
              <label>Current Job Status <span className="required">*</span></label>
              <select value={jobStatus} 
                onChange={(e) => setJobStatus(e.target.value)}>
                <option value="">Select status...</option>
                {jobStatusOptions.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>

            <div className="field">
              <label>Job Report Status <span className="required">*</span></label>
              <select value={jobReportStatus} 
                onChange={(e) => setJobReportStatus(e.target.value)}>
                <option value="">Select status...</option>
                {reportStatusOptions.map(r => <option key={r}>{r}</option>)}
              </select>
            </div>

            <div className="field">
              <label>Report Prepared By <span className="required">*</span></label>
              <select value={reportPreparedBy} 
                onChange={(e) => setReportPreparedBy(e.target.value)}>
                <option value="">Select engineer...</option>
                {engineerOptions.map(e => <option key={e}>{e}</option>)}
              </select>
            </div>

            <div className="field">
              <label>Report Reviewed By <span className="required">*</span></label>
              <select value={reportReviewedBy} 
                onChange={(e) => setReportReviewedBy(e.target.value)}>
                <option value="">Select engineer...</option>
                {engineerOptions.map(e => <option key={e}>{e}</option>)}
              </select>
            </div>

            <div className="field">
              <label>Machine & Activity</label>
              <input
                type="text"
                value={jobActivity}
                onChange={(e) => setJobActivity(e.target.value)}
                placeholder="Enter machine and activity"
              />
            </div>

            <div className="field">
              <label>Quote Amount (₹)</label>
              <input
                type="number"
                value={quoteAmount}
                onChange={(e) => setQuoteAmount(e.target.value)}
                placeholder="Enter quote amount"
              />
            </div>

            <div className="field span-2">
              <label>Remarks</label>
              <textarea
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                placeholder="Enter any remarks..."
              />
            </div>
          </div>

          {/* File Upload Section */}
          <div className="uj-grid">
            <div className="uj-section-divider">
              <span className="uj-section-label">File Uploads</span>
            </div>
            
            <div className="field span-2">
              <label>Upload Job Report</label>
              <input
                type="file"
                onChange={(e) => setJobReportFile(e.target.files[0])}
              />
            </div>

            <div className="field span-2">
              <label>Upload Supporting Docs / Images</label>
              <input
                type="file"
                multiple
                onChange={(e) => setSupportingDocsFiles([...e.target.files])}
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="uj-actions">
          <button className="uj-btn-cancel" onClick={() => window.history.back()}>
            Cancel
          </button>
          <button className="uj-btn-save" onClick={handleUpdate}>
            Update Job
          </button>
        </div>
      </div>
    </div>
  );
}

export default UpdateJob;