import React, { useState } from "react";
import axios from "axios";
import "../styles/NewJob.css";

function NewJob() {
  // Basic
  const [jobNo, setJobNo] = useState("");
  const [customers, setCustomers] = useState([]);
const [customerId, setCustomerId] = useState("");

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
  const [showSupport, setShowSupport] = useState(false);

  // Assets
  const assets = ["Camera", "Laptop", "Testing Kit", "Tool Box"];
  const [assetsCarried, setAssetsCarried] = useState([]);
  const [showAssets, setShowAssets] = useState(false);

  // Tests
  const tests = ["IR Test", "Tan Delta", "Thermography", "Vibration Analysis"];
  const [plannedTests, setPlannedTests] = useState([]);
  const [showTests, setShowTests] = useState(false);

  const [jobActivity, setJobActivity] = useState("");

  const toggleValue = (value, list, setter) => {
    if (list.includes(value)) {
      setter(list.filter(v => v !== value));
    } else {
      setter([...list, value]);
    }
  };

  const handleSave = async () => {
  try {
    const res = await axios.post("http://localhost:8000/jobs", {
  job_no: Number(jobNo),

  customer: customerId,   // ✅ STRING like "GE", "ONGC", "TATA POWER"

  product_service: productService,

  job_site: site,
  job_state: state,
  job_country: country,

  transport_mode_id: Number(transportMode),
  vehicle_detail_id: Number(vehicleDetail),
  driver_accompanied_id: Number(driverAccompanied),
  power_plant_type_id: Number(powerPlantType),

  lead_engineer: leadEngineer,
  supporting_engineers: supportingEngineers,
  assets_carried: assetsCarried,
  planned_tests: plannedTests,

  job_activity: jobActivity,
  job_work_status_id: 1,
  job_report_status_id: 1,
  job_start_date: jobStartDate
});

    // ✅ SUCCESS MESSAGE
    alert(res.data.message || "Job added successfully");

  } catch (err) {
    // ❌ ERROR MESSAGE FROM BACKEND
    if (err.response && err.response.data && err.response.data.detail) {
      alert(err.response.data.detail);
    } else {
      alert("Something went wrong while saving the job");
    }
  }
};


  return (
    <div className="newjob-container">
      <h2 className="newjob-title">New Job</h2>

      <div className="newjob-form">

        <div className="field"><label><span className="required">*</span> Job No</label>
          <input value={jobNo} onChange={e => setJobNo(e.target.value)} />
        </div>

        <div className="field"><label><span className="required">*</span> Customer</label>
          <input value={customerId} onChange={e => setCustomerId(e.target.value)} />
        </div>

        <div className="field"><label><span className="required">*</span> Job Start Date</label>
          <input type="date" value={jobStartDate} onChange={e => setJobStartDate(e.target.value)} />
        </div>

        <div className="field"><label><span className="required">*</span> Product / Service</label>
          <input value={productService} onChange={e => setProductService(e.target.value)} />
        </div>

        <div className="field"><label><span className="required">*</span> Site</label>
          <input value={site} onChange={e => setSite(e.target.value)} />
        </div>

        <div className="field"><label><span className="required">*</span> State</label>
          <input value={state} onChange={e => setState(e.target.value)} />
        </div>

        <div className="field"><label><span className="required">*</span> Country</label>
          <input value={country} onChange={e => setCountry(e.target.value)} />
        </div>

        <div className="field"><label><span className="required">*</span> Mode of Transportation</label>
          <select value={transportMode} onChange={e => setTransportMode(e.target.value)}>
            <option value="">Select</option>
            <option value="1">Air</option>
            <option value="2">Company Vehicle</option>
          </select>
        </div>

        <div className="field"><label>Vehicle Details</label>
          <select value={vehicleDetail} onChange={e => setVehicleDetail(e.target.value)}>
            <option value="">Select</option>
            <option value="1">Mahindra Xylo</option>
          </select>
        </div>

        <div className="field"><label>Driver Accompanied</label>
          <select value={driverAccompanied} onChange={e => setDriverAccompanied(e.target.value)}>
            <option value="">Select</option>
            <option value="1">Yes</option>
            <option value="2">No</option>
          </select>
        </div>

        <div className="field"><label><span className="required">*</span> Power Plant Type</label>
          <select value={powerPlantType} onChange={e => setPowerPlantType(e.target.value)}>
            <option value="">Select</option>
            <option value="1">Thermal</option>
            <option value="2">Solar</option>
          </select>
        </div>

        <div className="field"><label><span className="required">*</span> Lead Engineer</label>
          <select value={leadEngineer} onChange={e => setLeadEngineer(e.target.value)}>
            <option value="">Select</option>
            {engineers.map(e => <option key={e}>{e}</option>)}
          </select>
        </div>

        {/* Supporting Engineers */}
        <div className="field dropdown">
          <label><span className="required">*</span> Supporting Engineers</label>
          <div className="dropdown-box" onClick={() => setShowSupport(!showSupport)}>
            {supportingEngineers.length ? supportingEngineers.join(", ") : "Select"}
          </div>
          {showSupport &&
            <div className="dropdown-menu">
              {engineers.map(e => (
                <label key={e}>
                  <input type="checkbox"
                    checked={supportingEngineers.includes(e)}
                    onChange={() => toggleValue(e, supportingEngineers, setSupportingEngineers)} />
                  {e}
                </label>
              ))}
            </div>
          }
        </div>

        {/* Assets */}
        <div className="field dropdown">
          <label><span className="required">*</span> Assets Carried</label>
          <div className="dropdown-box" onClick={() => setShowAssets(!showAssets)}>
            {assetsCarried.length ? assetsCarried.join(", ") : "Select"}
          </div>
          {showAssets &&
            <div className="dropdown-menu">
              {assets.map(a => (
                <label key={a}>
                  <input type="checkbox"
                    checked={assetsCarried.includes(a)}
                    onChange={() => toggleValue(a, assetsCarried, setAssetsCarried)} />
                  {a}
                </label>
              ))}
            </div>
          }
        </div>

        {/* Tests */}
        <div className="field dropdown">
          <label><span className="required">*</span> Planned Tests</label>
          <div className="dropdown-box" onClick={() => setShowTests(!showTests)}>
            {plannedTests.length ? plannedTests.join(", ") : "Select"}
          </div>
          {showTests &&
            <div className="dropdown-menu">
              {tests.map(t => (
                <label key={t}>
                  <input type="checkbox"
                    checked={plannedTests.includes(t)}
                    onChange={() => toggleValue(t, plannedTests, setPlannedTests)} />
                  {t}
                </label>
              ))}
            </div>
          }
        </div>

        <div className="field full">
          <label><span className="required">*</span> Machine & Activity</label>
          <textarea value={jobActivity} onChange={e => setJobActivity(e.target.value)} />
        </div>
      </div>

      <div className="newjob-actions">
        <button className="cancel">Cancel</button>
        <button className="save" onClick={handleSave}>Save</button>
      </div>
    </div>
  );
}

export default NewJob;
