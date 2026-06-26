import { useState } from "react";
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
      job_no: jobNo,
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

  // Search job function
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
      fetchExpenses();
    } catch (err) {
      console.error(err);
      alert("Failed to delete expense");
    }
  };

  // Save expense function
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
      fetchExpenses();

      // Clear form
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

  // Helper function for status styling
  function getStatusClass(statusId) {
    switch(statusId) {
      case 3: return 'status-success'; // Payment Done
      case 2: return 'status-warning'; // In Process  
      case 1:
      default: return 'status-pending'; // Not Paid
    }
  }

  return (
    <div className="je-page">
      {/* Page Header */}
      <div className="je-header">
        <h2>Job Expenses</h2>
      </div>

      {/* Main Form */}
      <div className="je-form-container">
        
        {/* Row 1: Job No, Customer, Job Start Date, Job Finish Date */}
        <div className="je-form-row">
          <div className="je-field">
            <label>Job No</label>
            <div className="je-search-container">
              <input
                type="text"
                placeholder="With Button"
                value={searchJobNo}
                onChange={(e) => setSearchJobNo(e.target.value)}
              />
              <button className="je-search-btn" onClick={handleSearch}>🔍</button>
            </div>
          </div>

          <div className="je-field">
            <label>Customer</label>
            <div className="je-search-container">
              <input
                type="text"
                placeholder="With Button"
                value={customer}
                readOnly
              />
              <button className="je-search-btn">🔍</button>
            </div>
          </div>

          <div className="je-field">
            <label>Job Start Date</label>
            <select value={jobStartDate || ""} disabled>
              <option value="">{jobStartDate || "Select"}</option>
            </select>
          </div>

          <div className="je-field">
            <label>Job Finish Date</label>
            <select value={jobEndDate || ""} disabled>
              <option value="">{jobEndDate || "Select"}</option>
            </select>
          </div>
        </div>

        {/* Row 2: Site, State, Country, Product/Service */}
        <div className="je-form-row">
          <div className="je-field">
            <label>Site</label>
            <input type="text" placeholder="Default input" value={site} readOnly />
          </div>

          <div className="je-field">
            <label>State</label>
            <select value={state || ""} disabled>
              <option value="">Select option</option>
              <option value={state}>{state}</option>
            </select>
          </div>

          <div className="je-field">
            <label>Country</label>
            <select value={country || ""} disabled>
              <option value="">Select option</option>
              <option value={country}>{country}</option>
            </select>
          </div>

          <div className="je-field">
            <label>Product/Service</label>
            <select value={productService || ""} disabled>
              <option value="">Select option</option>
              <option value={productService}>{productService}</option>
            </select>
          </div>
        </div>

        {/* Row 3: Current Job Status, Job Report Status, Expense Type, Expense Amount */}
        <div className="je-form-row">
          <div className="je-field">
            <label>Current Job Status</label>
            <select value={jobStatus || ""} disabled>
              <option value="">Select option</option>
              <option value={jobStatus}>{jobStatus}</option>
            </select>
          </div>

          <div className="je-field">
            <label>Job Report Status</label>
            <select value={jobReportStatus || ""} disabled>
              <option value="">Select option</option>
              <option value={jobReportStatus}>{jobReportStatus}</option>
            </select>
          </div>

          <div className="je-field">
            <label>Expense Type</label>
            <select 
              value={expenseType} 
              onChange={(e) => setExpenseType(Number(e.target.value))}
            >
              <option value="">Select option</option>
              {expenseTypes.map(e => (
                <option key={e.id} value={e.id}>{e.name}</option>
              ))}
            </select>
          </div>

          <div className="je-field">
            <label>Expense Amount</label>
            <input
              type="number"
              placeholder="Default input"
              value={expenseAmount}
              onChange={(e) => setExpenseAmount(e.target.value)}
            />
          </div>
        </div>

        {/* Row 4: Expense Date, Payment Status, Submitted By, Upload Receipt */}
        <div className="je-form-row">
          <div className="je-field">
            <label>Expense Date</label>
            <input
              type="date"
              value={expenseDate}
              onChange={(e) => setExpenseDate(e.target.value)}
            />
          </div>

          <div className="je-field">
            <label>Payment Status</label>
            <select
              value={expensePaymentStatus}
              onChange={(e) => setExpensePaymentStatus(Number(e.target.value))}
            >
              <option value="">Select option</option>
              {paymentStatusOptions.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>

          <div className="je-field">
            <label>Submitted By</label>
            <select
              value={expenseSubmittedBy}
              onChange={(e) => setExpenseSubmittedBy(Number(e.target.value))}
            >
              <option value="">Select option</option>
              {engineers.map(e => (
                <option key={e.id} value={e.id}>{e.name}</option>
              ))}
            </select>
          </div>

          <div className="je-field">
            <label>Upload Receipt</label>
            <div className="je-file-upload">
              <input type="file" id="expenseFile" hidden />
              <label htmlFor="expenseFile" className="je-file-btn">📁</label>
            </div>
          </div>
        </div>

        {/* Add Expense Button */}
        <div className="je-add-expense-section">
          <button className="je-btn je-btn-add" onClick={handleSaveExpense}>
            Add Expense
          </button>
        </div>

        {/* Expenses Table */}
        {expenses.length > 0 && (
          <div className="je-expenses-table">
            <h3>Expense Records</h3>
            <div className="je-table-wrapper">
              <table className="je-table">
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>Amount</th>
                    <th>Date</th>
                    <th>Payment Status</th>
                    <th>Submitted By</th>
                    <th>Document</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {expenses.map((e) => (
                    <tr key={e.expense_id}>
                      {editingId === e.expense_id ? (
                        // Edit Mode
                        <>
                          <td>
                            <select
                              value={editData.expense_type_id}
                              onChange={(event) =>
                                setEditData({ ...editData, expense_type_id: Number(event.target.value) })
                              }
                              className="je-table-select"
                            >
                              {expenseTypes.map((t) => (
                                <option key={t.id} value={t.id}>{t.name}</option>
                              ))}
                            </select>
                          </td>
                          <td>
                            <input
                              type="number"
                              value={editData.expense_amount}
                              onChange={(event) =>
                                setEditData({ ...editData, expense_amount: event.target.value })
                              }
                              className="je-table-input"
                            />
                          </td>
                          <td>
                            <input
                              type="date"
                              value={editData.expense_date}
                              onChange={(event) =>
                                setEditData({ ...editData, expense_date: event.target.value })
                              }
                              className="je-table-input"
                            />
                          </td>
                          <td>
                            <select
                              value={editData.expense_payment_status_id}
                              onChange={(event) =>
                                setEditData({ ...editData, expense_payment_status_id: Number(event.target.value) })
                              }
                              className="je-table-select"
                            >
                              {paymentStatusOptions.map((p) => (
                                <option key={p.id} value={p.id}>{p.name}</option>
                              ))}
                            </select>
                          </td>
                          <td>
                            <select
                              value={editData.expense_submitted_by_engineer_id}
                              onChange={(event) =>
                                setEditData({ ...editData, expense_submitted_by_engineer_id: Number(event.target.value) })
                              }
                              className="je-table-select"
                            >
                              {engineers.map((en) => (
                                <option key={en.id} value={en.id}>{en.name}</option>
                              ))}
                            </select>
                          </td>
                          <td>
                            <span className="je-document-icon">📄</span>
                          </td>
                          <td>
                            <div className="je-table-actions">
                              <button
                                className="je-action-btn je-save"
                                onClick={handleUpdateExpense}
                                title="Save Changes"
                              >
                                💾
                              </button>
                              <button
                                className="je-action-btn je-cancel"
                                onClick={() => setEditingId(null)}
                                title="Cancel Edit"
                              >
                                ❌
                              </button>
                            </div>
                          </td>
                        </>
                      ) : (
                        // View Mode
                        <>
                          <td>{getExpenseTypeName(e.expense_type_id)}</td>
                          <td>₹ {Number(e.expense_amount).toLocaleString()}</td>
                          <td>{e.expense_date}</td>
                          <td>
                            <span className={`je-status-badge ${getStatusClass(e.expense_payment_status_id)}`}>
                              {getPaymentStatusName(e.expense_payment_status_id)}
                            </span>
                          </td>
                          <td>{getEngineerName(e.expense_submitted_by_engineer_id)}</td>
                          <td>
                            <button
                              className="je-document-upload-btn"
                              onClick={() => handleUploadClick(e.expense_id)}
                              title="Upload Document"
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
                            </button>
                          </td>
                          <td>
                            <div className="je-table-actions">
                              <button
                                className="je-action-btn je-edit"
                                onClick={() => handleEditExpense(e)}
                                title="Edit Expense"
                              >
                                ✏️
                              </button>
                              <button
                                className="je-action-btn je-delete"
                                onClick={() => handleDeleteExpense(e.expense_id)}
                                title="Delete Expense"
                              >
                                🗑️
                              </button>
                            </div>
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="je-actions">
          <button className="je-btn je-btn-cancel" onClick={() => window.history.back()}>
            Cancel
          </button>
          <button className="je-btn je-btn-save" onClick={handleSaveExpense}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default JobExpenses;