    import React, { useState } from "react";
    import axios from "axios";
    import "../styles/JobExpenses.css";

    function JobExpenses() {
      const [searchJobNo, setSearchJobNo] = useState("");

      // Job info (autofilled)
      const [jobNo, setJobNo] = useState("");
      const [customer, setCustomer] = useState("");
      const [jobStartDate, setJobStartDate] = useState("");
      const [jobEndDate, setJobEndDate] = useState("");
      const [site, setSite] = useState("");
      const [state, setState] = useState("");
      const [country, setCountry] = useState("");
      const [productService, setProductService] = useState("");
      const [jobStatus, setJobStatus] = useState("");
      const [jobReportStatus, setJobReportStatus] = useState("");

      // Expense fields
      const [expenseType, setExpenseType] = useState("");
      const [expenseAmount, setExpenseAmount] = useState("");
      const [expenseDate, setExpenseDate] = useState("");
      const [expensePaymentStatus, setExpensePaymentStatus] = useState("");
      const [expenseSubmittedBy, setExpenseSubmittedBy] = useState("");
      const [expenses, setExpenses] = useState([]);
      const [editingId, setEditingId] = useState(null);
    const [editData, setEditData] = useState({});
    const [uploadFile, setUploadFile] = useState(null);
    const handleUploadClick = (expenseId) => {
      document.getElementById(`file-${expenseId}`).click();
    };
    const handleFileUpload = async (expenseId, file) => {
      const formData = new FormData();
      formData.append("file", file);

      try {
        await axios.post(
          `http://localhost:8000/job-expenses/${expenseId}/upload`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        alert("Document uploaded successfully");
        fetchExpenses();
      } catch (err) {
        console.error(err);
        alert("Upload failed");
      }
    };

    const handleEditExpense = (expense) => {
      setEditingId(expense.expense_id);
      setEditData({
        job_no: jobNo,   // 🔥 ADD THIS
        expense_type_id: expense.expense_type_id,
        expense_amount: expense.expense_amount,
        expense_date: expense.expense_date,
        expense_payment_status_id: expense.expense_payment_status_id,
        expense_submitted_by_engineer_id: expense.expense_submitted_by_engineer_id
      });
    };

    const handleUpdateExpense = async () => {
      try {
        await axios.put(
          `http://localhost:8000/job-expenses/${editingId}`,
          editData
        );
        alert("Expense updated successfully");
        setEditingId(null);
        fetchExpensesForJob(searchJobNo);

      } catch (err) {
        console.error(err.response?.data || err);
        alert("Failed to update expense");
      }
    };
    const fetchExpensesForJob = async (jobNumber) => {
      try {
        const res = await axios.get(`http://localhost:8000/job-expenses/${jobNumber}`);
        setExpenses(res.data);
      } catch (err) {
        console.error("Failed to fetch expenses");
      }
    };


      const getExpenseTypeName = (id) => {
      return expenseTypes.find(e => e.id === id)?.name || id;
    };
    const getPaymentStatusName = (id) => {
      return paymentStatusOptions.find(p => p.id === id)?.name || id;
    };
    const getEngineerName = (id) => {
      return engineers.find(e => e.id === id)?.name || id;
    };



      const expenseTypes = [
      { id: 1, name: "Travel" },
      { id: 2, name: "Accommodation" },
      { id: 3, name: "Food" },
      { id: 4, name: "Misc" }
    ];

    const paymentStatusOptions = [
      { id: 1, name: "Not Paid" },
      { id: 2, name: "In Process" },
      { id: 3, name: "Payment Done" }
    ];

    const engineers = [
      { id: 1, name: "Engineer-1" },
      { id: 2, name: "Engineer-2" },
      { id: 3, name: "Engineer-3" },
      { id: 4, name: "Engineer-4" }
    ];
    const fetchExpenses = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/job-expenses/${jobNo}`);
        setExpenses(res.data);
      } catch (err) {
        console.error("Failed to fetch expenses");
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

        setJobNo(data.job_no);
        setCustomer(data.customer_name);
        setJobStartDate(data.job_start_date || "");
        setJobEndDate(data.job_end_date || "");
        setSite(data.job_site || "");
        setState(data.job_state || "");
        setCountry(data.job_country || "");
        setProductService(data.product_service || "");
        setJobStatus(data.job_work_status || "");
        setJobReportStatus(data.job_report_status || "");

        // 🔥 Load expenses using the searched job number directly
        fetchExpensesForJob(searchJobNo);

      } catch (err) {
        alert("Job not found");
      }
    };

      const handleDeleteExpense = async (expenseId) => {
      if (!window.confirm("Are you sure you want to delete this expense?")) return;

      try {
        await axios.delete(`http://localhost:8000/job-expenses/${expenseId}`);
        alert("Expense deleted successfully");
        fetchExpenses();   // refresh list
      } catch (err) {
        console.error(err);
        alert("Failed to delete expense");
      }
    };


      // 💾 SAVE EXPENSE
      const handleSaveExpense = async () => {
        if (!jobNo) {
          alert("Search job first");
          return;
        }

        try {
          await axios.post("http://localhost:8000/job-expenses", {
            job_no: jobNo,
            expense_type_id: expenseType,
            expense_payment_status_id: expensePaymentStatus,
            expense_amount: expenseAmount,
            expense_date: expenseDate,
            expense_submitted_by_engineer_id: expenseSubmittedBy,
          });

          alert("Expense added successfully");
          fetchExpenses();   // 🔥 reload expenses after saving


          // clear form
          setExpenseType("");
          setExpenseAmount("");
          setExpenseDate("");
          setExpensePaymentStatus("");
          setExpenseSubmittedBy("");
        } catch (err) {
          console.error(err.response?.data || err);
          alert("Failed to save expense");
        }
      };

      return (
  <div className="jobexp-container">
    <div className="form-card">

      {/* Header */}
      <div className="form-header">
        <div>
          <h2>JOB EXPENSES</h2>
          <p>Log & Track Operational Costs</p>
        </div>
        <div>
          <button className="cancel-btn">Cancel</button>
          <button className="save-btn">Save Log</button>
        </div>
      </div>

      

      {/* Job Filters (like screenshot) */}
<div className="jobexp-form">

  <div className="job-info-field" style={{ position: "relative" }}>
  <label>Job No.</label>
  <input
    type="number"
    value={searchJobNo}
    onChange={(e) => setSearchJobNo(e.target.value)}
    placeholder="Enter Job Number"
    style={{ paddingRight: "40px" }}   // space for icon inside input
  />

  <span
    onClick={handleSearch}
    style={{
      position: "absolute",
      right: "12px",
      top: "34%",          // move inside the input vertically
      transform: "translateY(-50%)",
      cursor: "pointer",
      fontSize: "16px",
      color: "#001f3f"
    }}
    title="Search"
  >
    🔍
  </span>
</div>



  <div className="field">
    <label>Customer</label>
    <input value={customer} disabled />
  </div>

  <div className="field">
    <label>Job Start Date</label>
    <input value={jobStartDate} disabled />
  </div>

  <div className="field">
    <label>Job Finish Date</label>
    <input value={jobEndDate} disabled />
  </div>

  <div className="field">
    <label>Site</label>
    <input value={site} disabled />
  </div>

  <div className="field">
    <label>State</label>
    <input value={state} disabled />
  </div>

  <div className="field">
    <label>Country</label>
    <input value={country} disabled />
  </div>

  <div className="field">
    <label>Product / Service</label>
    <input value={productService} disabled />
  </div>

  <div className="field">
    <label>Invoice Number</label>
    <input placeholder="Auto / Manual" />
  </div>

  <div className="field">
    <label>Current Job Status</label>
    <input value={jobStatus} disabled />
  </div>

  <div className="field">
    <label>Job Report Status</label>
    <input value={jobReportStatus} disabled />
  </div>

  <div className="field">
    <label>Invoice Payment Status</label>
    <select>
      <option value="">Select option</option>
      <option>Not Paid</option>
      <option>In Process</option>
      <option>Payment Done</option>
    </select>
  </div>

</div>


      {/* New Expense Entry */}
      <h3 className="new-expense-title">+ NEW EXPENSE ENTRY</h3>

      <div className="expense-entry-bar">
        <select value={expenseType} onChange={(e) => setExpenseType(Number(e.target.value))}>
          <option value="">Select</option>
          {expenseTypes.map(e => (
            <option key={e.id} value={e.id}>{e.name}</option>
          ))}
        </select>

        <input
          placeholder="Amount"
          value={expenseAmount}
          onChange={(e) => setExpenseAmount(e.target.value)}
        />

        <input
          type="date"
          value={expenseDate}
          onChange={(e) => setExpenseDate(e.target.value)}
        />

        <select
          value={expensePaymentStatus}
          onChange={(e) => setExpensePaymentStatus(Number(e.target.value))}
        >
          <option value="">Select</option>
          {paymentStatusOptions.map(p => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>

        <select
          value={expenseSubmittedBy}
          onChange={(e) => setExpenseSubmittedBy(Number(e.target.value))}
        >
          <option value="">Select</option>
          {engineers.map(e => (
            <option key={e.id} value={e.id}>{e.name}</option>
          ))}
        </select>

        <button className="add-entry-btn" onClick={handleSaveExpense}>
          Add Entry
        </button>
      </div>
{editingId && (
  <div className="expense-entry-bar">
    <select
      value={editData.expense_type_id}
      onChange={(e) =>
        setEditData({ ...editData, expense_type_id: Number(e.target.value) })
      }
    >
      {expenseTypes.map(t => (
        <option key={t.id} value={t.id}>{t.name}</option>
      ))}
    </select>

    <input
      value={editData.expense_amount}
      onChange={(e) =>
        setEditData({ ...editData, expense_amount: e.target.value })
      }
    />

    <input
      type="date"
      value={editData.expense_date}
      onChange={(e) =>
        setEditData({ ...editData, expense_date: e.target.value })
      }
    />

    <select
      value={editData.expense_payment_status_id}
      onChange={(e) =>
        setEditData({ ...editData, expense_payment_status_id: Number(e.target.value) })
      }
    >
      {paymentStatusOptions.map(p => (
        <option key={p.id} value={p.id}>{p.name}</option>
      ))}
    </select>

    <select
      value={editData.expense_submitted_by_engineer_id}
      onChange={(e) =>
        setEditData({ ...editData, expense_submitted_by_engineer_id: Number(e.target.value) })
      }
    >
      {engineers.map(en => (
        <option key={en.id} value={en.id}>{en.name}</option>
      ))}
    </select>

    <button onClick={handleUpdateExpense}>Update</button>
    <button onClick={() => setEditingId(null)}>Cancel</button>
  </div>
)}

      {/* Expense Table */}
      <div className="expense-box">
        <div className="expense-header">
  <span>TYPE</span>
  <span>AMOUNT</span>
  <span>DATE</span>
  <span>PAYMENT STATUS</span>
  <span>SUBMITTED BY</span>
  <span>DOC</span>
  <span>ACTION</span>
</div>


        {expenses.map(e => (
  <div className="expense-row" key={e.expense_id}>
    <span>{getExpenseTypeName(e.expense_type_id)}</span>
    <span>{e.expense_amount}</span>
    <span>{e.expense_date}</span>
    <span>{getPaymentStatusName(e.expense_payment_status_id)}</span>
    <span>{getEngineerName(e.expense_submitted_by_engineer_id)}</span>

    {/* Upload Document */}
    <span
      style={{ cursor: "pointer" }}
      title="Upload document"
      onClick={() => handleUploadClick(e.expense_id)}
    >
      📄
      <input
        type="file"
        id={`file-${e.expense_id}`}
        hidden
        onChange={(event) =>
          handleFileUpload(e.expense_id, event.target.files[0])
        }
      />
    </span>

    {/* Edit & Delete */}
    <span>
      <span
        style={{ cursor: "pointer", marginRight: "8px" }}
        title="Edit"
        onClick={() => handleEditExpense(e)}
      >
        ✏️
      </span>

      <span
        style={{ cursor: "pointer" }}
        title="Delete"
        onClick={() => handleDeleteExpense(e.expense_id)}
      >
        🗑️
      </span>
    </span>
  </div>
))}


      </div>

    </div>
  </div>
);
}

export default JobExpenses;
