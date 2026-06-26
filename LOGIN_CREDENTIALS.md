# Login Credentials for All User Roles

## 🔑 Current Available Login Credentials

### **👑 ADMIN (Full Access to All Features)**
```
Username: admin
Password: admin123
```
**Access:** Work, Assets, Finance, Reports, Admin (User Management)

**Alternative ADMIN:**
```
Username: admin@prognosys.com
Password: [existing password in database]
```

---

### **👨‍💼 SENIOR ENGINEER (Work + Assets + Profile)**
```
Username: senior_eng  
Password: senior123
```
**Access:** Work, Assets, Admin (Profile only)

**Alternative SENIOR ENGINEER:**
```
Username: seneng@prognosys.com
Password: [existing password in database] 
```

---

### **👨‍🔧 JUNIOR ENGINEER (Work + Profile Only)**
```
Username: junior_eng
Password: junior123  
```
**Access:** Work, Admin (Profile only)

**Alternative JUNIOR ENGINEER:**
```
Username: juneng@prognosys.com
Password: [existing password in database]
```

---

## 🎯 Feature Access by Role

### **Work Section (Available to All)**
- New Job
- Update Job  
- Current Engagements

### **Assets Section (SENIOR_ENGINEER + ADMIN)**
- Asset Summary

### **Finance Section (ADMIN Only)**
- Job Financials
- Job Expenses
- Accounts Receivable
- Pending Invoices

### **Reports Section (ADMIN Only)**
- Job Summary
- Payment Summary

### **Admin Section (Role-Specific)**
- **ADMIN:** Manage Users, Add User
- **SENIOR_ENGINEER & JUNIOR_ENGINEER:** My Profile

---

## 🚀 Quick Testing Guide

1. **Test Full Admin Access:**
   - Login with `admin` / `admin123`
   - Should see all 5 menu sections (Work, Assets, Finance, Reports, Admin)

2. **Test Senior Engineer Access:**
   - Login with `senior_eng` / `senior123`  
   - Should see Work, Assets, and Admin (Profile) sections

3. **Test Junior Engineer Access:**
   - Login with `junior_eng` / `junior123`
   - Should see Work and Admin (Profile) sections only

4. **Test Navbar Dropdowns:**
   - Hover over each menu item to see dropdown options
   - Verify role-based content appears correctly

---

## 📝 Notes

- **Password Reset:** If you need to reset any password, use the `reset_password.py` script in the backend
- **New Users:** Create additional users via the "Add User" page (ADMIN access required)
- **Database:** All users are stored in the `prognosys_db` MySQL database
- **Security:** Passwords are hashed using bcrypt for security