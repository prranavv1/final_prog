# Design System Implementation Guide

## Overview
This guide shows how to apply the consistent design system from `SharedDesign.css` across all pages in the application.

## Step 1: Import Shared Design

Add this to the top of every page's CSS file:
```css
@import './SharedDesign.css';
```

## Step 2: Replace Page Wrappers

### Old Pattern:
```jsx
<div className="some-wrapper">
```

### New Pattern:
```jsx
<div className="page-wrapper">
  <div className="main-card">
    <div className="card-header">
      <h2>Page Title</h2>
      <p>Page description</p>
    </div>
    <div className="card-content">
      {/* Content here */}
    </div>
  </div>
</div>
```

## Step 3: Replace Form Fields

### Old Pattern:
```jsx
<div className="field">
  <label>Field Name *</label>
  <input />
</div>
```

### New Pattern:
```jsx
<div className="form-field">
  <label className="form-label">
    Field Name <span className="required-mark">*</span>
  </label>
  <input className="form-input" />
</div>
```

## Step 4: Replace Buttons

### Old Patterns:
```jsx
<button className="save-btn">Save</button>
<button className="cancel-btn">Cancel</button>
```

### New Patterns:
```jsx
<button className="btn btn-primary">
  <span className="btn-icon">💾</span>
  <span>Save</span>
</button>

<button className="btn btn-secondary">Cancel</button>
<button className="btn btn-danger">Delete</button>
<button className="btn btn-success">Approve</button>
```

## Step 5: Replace Tables

### New Pattern:
```jsx
<table className="data-table">
  <thead>
    <tr>
      <th>Column 1</th>
      <th>Column 2</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Data 1</td>
      <td>Data 2</td>
      <td>
        <div className="table-actions">
          <button className="action-btn edit">✏️</button>
          <button className="action-btn delete">🗑️</button>
        </div>
      </td>
    </tr>
  </tbody>
</table>
```

## Step 6: Replace Alerts/Messages

### New Pattern:
```jsx
<div className="alert alert-success">Success message</div>
<div className="alert alert-error">Error message</div>
<div className="alert alert-warning">Warning message</div>
<div className="alert alert-info">Info message</div>
```

## Step 7: Replace Form Grids

### Old Pattern:
```css
.some-form {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}
```

### New Pattern:
```jsx
<div className="form-grid">  {/* 3 columns */}
<div className="form-grid form-grid-2">  {/* 2 columns */}
<div className="form-grid form-grid-4">  {/* 4 columns */}
```

## Step 8: Add Sticky Footer (for forms)

```jsx
<div className="sticky-footer">
  <div className="footer-content">
    <button className="btn btn-secondary">Cancel</button>
    <button className="btn btn-primary">
      <span className="btn-icon">💾</span>
      <span>Save</span>
    </button>
  </div>
</div>
```

## Step 9: Replace Search Bars

### New Pattern:
```jsx
<div className="search-container">
  <input 
    className="search-input" 
    placeholder="Search..." 
  />
  <span className="search-icon">🔍</span>
</div>
```

## Step 10: Replace Status Tags/Badges

### New Pattern:
```jsx
<span className="tag tag-primary">Primary</span>
<span className="tag tag-success">Completed</span>
<span className="tag tag-danger">Failed</span>
<span className="tag tag-warning">Pending</span>
```

## Color Variables Available

```css
var(--primary-blue)
var(--primary-purple)
var(--button-gradient-start)
var(--button-gradient-end)
var(--text-dark)
var(--text-muted)
var(--text-light)
var(--border-color)
var(--input-bg)
var(--success-green)
var(--success-bg)
var(--danger-red)
var(--warning-orange)
```

## Sizing Variables

```css
var(--navbar-height)
var(--page-padding)
var(--card-padding)
var(--field-gap)
var(--input-height)
var(--button-height)
var(--border-radius)
var(--card-radius)
```

## Example: Converting a Full Page

### Before (UpdateJob.css):
```css
.updatejob-wrapper {
  background: #c9def1;
  padding: 30px;
}

.form-card {
  background: white;
  border-radius: 14px;
}

.field input {
  padding: 10px;
  border: 1px solid #ccc;
}
```

### After:
```css
@import './SharedDesign.css';

/* Only add page-specific overrides if needed */
.updatejob-specific-class {
  /* custom styles */
}
```

### JSX Changes:
```jsx
// Before
<div className="updatejob-wrapper">
  <div className="form-card">

// After
<div className="page-wrapper">
  <div className="main-card">
    <div className="card-header">
      <h2>Update Job</h2>
      <p>Edit existing job details</p>
    </div>
    <div className="card-content">
      <div className="form-grid">
        <div className="form-field">
          <label className="form-label">Job No <span className="required-mark">*</span></label>
          <input className="form-input" />
        </div>
      </div>
    </div>
  </div>
  
  <div className="sticky-footer">
    <div className="footer-content">
      <button className="btn btn-secondary">Cancel</button>
      <button className="btn btn-primary">
        <span className="btn-icon">💾</span>
        <span>Update Job</span>
      </button>
    </div>
  </div>
</div>
```

## Pages to Update:

1. ✅ NewJob.jsx - Already done
2. ⏳ UpdateJob.jsx
3. ⏳ CurrentEngagements.jsx
4. ⏳ JobFinancials.jsx  
5. ⏳ JobExpenses.jsx
6. ⏳ AccountsReceivable.jsx
7. ⏳ PendingInvoice.jsx
8. ⏳ JobSummary.jsx
9. ⏳ PaymentSummary.jsx
10. ⏳ ManageUsers.jsx
11. ⏳ AddUser.jsx

## Quick Checklist for Each Page:

- [ ] Import SharedDesign.css
- [ ] Replace wrapper with page-wrapper
- [ ] Add main-card container
- [ ] Add card-header with h2 and p
- [ ] Wrap content in card-content
- [ ] Replace field → form-field
- [ ] Replace label styles with form-label
- [ ] Replace input → form-input
- [ ] Replace select → form-select
- [ ] Replace textarea → form-textarea
- [ ] Replace button classes with btn btn-*
- [ ] Replace tables with data-table
- [ ] Add sticky-footer if needed
- [ ] Test responsiveness
- [ ] Verify all functionality works

## Notes:
- Keep ALL existing logic, state, APIs, and functionality
- Only change CSS classes and structure
- Test after each page conversion
- Maintain consistency across all pages
