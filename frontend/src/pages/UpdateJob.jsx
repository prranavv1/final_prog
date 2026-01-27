  import React, { useState } from "react";
  import axios from "axios";
  import "../styles/UpdateJob.css";
  import Select from "react-select";
  import { useEffect } from "react";
  const JOB_STATUS_MAP = {
  "To Be Executed": 1,
  "In Progress": 2,
  "Site Executed": 3,
  "Reporting": 4,
  "Cancelled / On Hold": 5,
  "Job Completed": 6
};

const REPORT_STATUS_MAP = {
  "Job To Be Executed": 1,
  "Job Completed": 2,
  "Reporting Not Started": 3,
  "Reporting In Progress": 4,
  "Report In Review": 5,
  "Report Completed": 6,
  "Job Cancelled / On Hold": 7
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
    // 🔍 Search
    const [searchJobNo, setSearchJobNo] = useState("");

    const [jobNo, setJobNo] = useState("");
    const [customer, setCustomer] = useState("");
    const [customers, setCustomers] = useState([]);
    const [jobStartDate, setJobStartDate] = useState("");
    const [jobEndDate, setJobEndDate] = useState("");
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
    const [stateSearch, setStateSearch] = useState("");
  const [showStateList, setShowStateList] = useState(false);
  const [countrySearch, setCountrySearch] = useState("");
  const [showCountryList, setShowCountryList] = useState(false);
  const [jobReportFile, setJobReportFile] = useState(null);
const [supportingDocsFiles, setSupportingDocsFiles] = useState([]);



    // 🔽 Dropdown options
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
  "To Be Executed","In Progress","Site Executed","Reporting","Cancelled / On Hold","Job Completed"
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
    const formData = new FormData();

    // normal fields
    formData.append("customer", customer);
    formData.append("product_service", productService);
    formData.append("job_site", site);
    formData.append("job_state", state);
    formData.append("job_country", country);
    formData.append("transport_mode_id", TRANSPORT_MAP[transportMode] || "");
    formData.append("vehicle_detail_id", vehicleDetails || "");
    formData.append("driver_accompanied_id", DRIVER_MAP[driverAccompanied] || "");
    formData.append("power_plant_type_id", POWER_PLANT_MAP[powerPlantType] || "");
    formData.append("lead_engineer", leadEngineer);
    formData.append("supporting_engineers", JSON.stringify(supportingEngineers));
    formData.append("assets_carried", JSON.stringify(assetsCarried));
    formData.append("planned_tests", JSON.stringify(plannedTests));
    formData.append("job_activity", jobActivity);
    formData.append("job_work_status_id", JOB_STATUS_MAP[jobStatus] || "");
    formData.append("job_report_status_id", REPORT_STATUS_MAP[jobReportStatus] || "");
    formData.append("job_start_date", jobStartDate);
    formData.append("job_end_date", jobEndDate);

    // files
    if (jobReportFile) {
      formData.append("job_report", jobReportFile);
    }

    supportingDocsFiles.forEach((file) => {
      formData.append("supporting_docs", file);
    });

    await axios.put(
      `http://localhost:8000/jobs/${jobNo}`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" }
      }
    );

    alert("Job updated successfully");

  } catch (err) {
    console.error(err);
    alert("Failed to update job");
  }
};

    // 🔎 SEARCH JOB
    const handleSearch = async () => {
      if (!searchJobNo) {
        alert("Please enter Job Number");
        return;
      }
      

      try {
        const res = await axios.get(`http://localhost:8000/jobs/${searchJobNo}`);
        const data = res.data;

        // ✅ AUTOFILL ALL FIELDS
        setJobNo(data.job_no);
        setCustomer(data.customer_name);
        setJobStartDate(data.job_start_date || "");
        setJobEndDate(data.job_end_date || "");
        setSite(data.job_site || "");
        setState(data.job_state || "");
setStateSearch(data.job_state || "");

setCountry(data.job_country || "");
setCountrySearch(data.job_country || "");

        setTransportMode(data.transport_mode || "");
        setVehicleDetails(data.vehicle_detail || "");
        setDriverAccompanied(data.driver_accompanied || "");
        setPowerPlantType(data.power_plant_type || "");
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

      } catch (err) {
        alert("Job not found");
      }
    };
    const customerOptions = customers.map(c => ({
    value: c.customer_name,
    label: c.customer_name
  }));


    return (
      <div className="updatejob-wrapper">
  <div className="form-card">
  <div className="form-header">
    <div>
      <h2>UPDATE JOB ENTRY</h2>
      <p>Please update job details carefully.</p>
    </div>

    <div className="form-actions-top">
      <button className="cancel-btn">Cancel</button>
      <button className="save-btn" onClick={handleUpdate}>
        Save Record
      </button>
    </div>
  </div>


        {/* 🔍 SEARCH BAR */}
  
        <div className="updatejob-form">

          <div className="field" style={{ position: "relative" }}>
  <label>Job No <span className="required">*</span></label>
  <input
    type="number"
    placeholder="Enter Job Number"
    value={searchJobNo}
    onChange={(e) => setSearchJobNo(e.target.value)}
    style={{ paddingRight: "40px" }}   // space for icon
  />

  <span
    onClick={handleSearch}
    style={{
      position: "absolute",
      right: "12px",
      top: "32px",
      cursor: "pointer",
      fontSize: "18px",
      color: "#001f3f"
    }}
    title="Search Job"
  >
    🔍
  </span>
</div>


          <div className="field">
    <label>Customer <span className="required">*</span></label>
    <Select
      options={customerOptions}
      value={customerOptions.find(c => c.value === customer)}
      onChange={(selected) => setCustomer(selected.value)}
      placeholder="Search customer..."
      isClearable
    />
  </div>
  <div className="field">
            <label>Job Start Date <span className="required">*</span></label>
            <input type="date" value={jobStartDate} onChange={(e) => setJobStartDate(e.target.value)} />
          </div>
          <div className="field">
            <label>Job Finish Date <span className="required">*</span></label>
            <input type="date" value={jobEndDate} onChange={(e) => setJobEndDate(e.target.value)} />
          </div>
    {/* Site */}
  <div className="field">
    <label>Site <span className="required">*</span></label>
    <input value={site} onChange={(e) => setSite(e.target.value)} />
  </div>

  <div className="field">
  <label>STATE <span className="required">*</span></label>
  <input
    placeholder="Type to search state..."
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
    placeholder="Type to search country..."
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
            <label>Mode of Transportation <span className="required">*</span></label>
            <select value={transportMode} onChange={(e) => setTransportMode(e.target.value)}>
              <option value="">Select</option>
              {transportOptions.map(o => <option key={o}>{o}</option>)}
            </select>
          </div>

          <div className="field">
            <label>Lead Engineer <span className="required">*</span></label>
            <select value={leadEngineer} onChange={(e) => setLeadEngineer(e.target.value)}>
              <option value="">Select</option>
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
    <option value="">Select engineer</option>
    {engineerOptions.map(e => (
      <option key={e} value={e}>{e}</option>
    ))}
  </select>

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

           {/* Vehicle Details */}
  <div className="field">
    <label>Vehicle Details <span className="required">*</span></label>
    <select value={vehicleDetails} onChange={(e) => setVehicleDetails(e.target.value)}>
      <option value="">Select</option>
      {vehicleOptions.map(v => <option key={v}>{v}</option>)}
    </select>
  </div>

          <div className="field">
            <label>Driver Accompanied <span className="required">*</span></label>
            <select value={driverAccompanied} onChange={(e) => setDriverAccompanied(e.target.value)}>
              <option value="">Select</option>
              {yesNoOptions.map(o => <option key={o}>{o}</option>)}
            </select>
          </div>
          {/* Assets Carried */}
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
    <option value="">Select asset</option>
    {assetOptions.map(a => (
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
  <label>Planned Tests <span className="required">*</span></label>
  <select
  value=""
  onChange={(e) => {
    const value = Number(e.target.value);   // store ID
    if (value && !plannedTests.includes(value)) {
      setPlannedTests([...plannedTests, value]);
    }
  }}
>
  <option value="">Select test</option>
  {PLANNED_TESTS.map(t => (
    <option key={t.id} value={t.id}>{t.name}</option>
  ))}
</select>


  <div className="selected-list">
  {plannedTests.map((id, i) => {
    const test = PLANNED_TESTS.find(t => t.id === id);
    return (
      <span
        key={i}
        onClick={() =>
          setPlannedTests(plannedTests.filter(x => x !== id))
        }
      >
        {test?.name} ✕
      </span>
    );
  })}
</div>

</div>

          {/* Power Plant Type */}
  <div className="field">
    <label>Power Plant Type <span className="required">*</span></label>
    <select
  value={powerPlantType}
  onChange={(e) => setPowerPlantType(e.target.value)}
>
  <option value="">Select</option>
  <option value="1">Hydroelectric</option>
  <option value="2">Thermal</option>
  <option value="3">Nuclear</option>
  <option value="4">Wind</option>
  <option value="5">Solar</option>
  <option value="6">Others</option>
</select>

  </div>
         {/* Product / Service */}
  <div className="field">
    <label>Product / Service</label>
    <input
      value={productService}
      onChange={(e) => setProductService(e.target.value)}
    />
  </div>
  
  {/* Job Status */}
  <div className="field">
    <label>Current Job Status <span className="required">*</span></label>
    <select value={jobStatus} onChange={(e) => setJobStatus(e.target.value)}>
      <option value="">Select</option>
      {jobStatusOptions.map(s => <option key={s}>{s}</option>)}
    </select>
  </div>
   {/* Job Report Status */}
  <div className="field">
    <label>Job Report Status <span className="required">*</span></label>
    <select value={jobReportStatus} onChange={(e) => setJobReportStatus(e.target.value)}>
      <option value="">Select</option>
      {reportStatusOptions.map(r => <option key={r}>{r}</option>)}
    </select>
  </div>
  <div className="field">
            <label>Job Report Prepared By <span className="required">*</span></label>
            <select value={reportPreparedBy} onChange={(e) => setReportPreparedBy(e.target.value)}>
              <option value="">Select Engineer</option>
              {engineerOptions.map(e => <option key={e}>{e}</option>)}
            </select>
          </div>
           <div className="field">
            <label>Job Report Reviewed By <span className="required">*</span></label>
            <select value={reportReviewedBy} onChange={(e) => setReportReviewedBy(e.target.value)}>
              <option value="">Select Engineer</option>
              {engineerOptions.map(e => <option key={e}>{e}</option>)}
            </select>
          </div>
    {/* Job Report Status */}
  <div className="field">
    <label>Current Report Status <span className="required">*</span></label>
    <select value={jobReportStatus} onChange={(e) => setJobReportStatus(e.target.value)}>
      <option value="">Select</option>
      {reportStatusOptions.map(r => <option key={r}>{r}</option>)}
    </select>
  </div>
<div className="field">
    <label>Machine & Activity *</label>
    <input
      type="text"
      value={jobActivity}
      onChange={(e) => setJobActivity(e.target.value)}
      placeholder="Enter machine and activity"
    />
  </div>

  {/* Upload Job Report */}

  <div className="field">
  <label>Upload Job Report</label>
  <input
    type="file"
    onChange={(e) => setJobReportFile(e.target.files[0])}
  />
</div>

<div className="field">
  <label>Upload Supporting Docs / Images</label>
  <input
    type="file"
    multiple
    onChange={(e) => setSupportingDocsFiles([...e.target.files])}
  />
</div>



        </div>
 
  </div>
</div>

    );
  }


  export default UpdateJob;
