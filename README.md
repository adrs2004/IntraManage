<div align="center">

# 🚀 IntraManage

### Industry Project Platform System

![Banner](https://img.shields.io/badge/Version-1.0.0-red)
[![GitHub stars](https://img.shields.io/github/stars/adrs2004/IntraManage?style=social)](https://github.com/adrs2004/IntraManage/stargazers)
[![GitHub language count](https://img.shields.io/github/languages/count/adrs2004/IntraManage)](https://github.com/adrs2004/IntraManage)
[![GitHub top language](https://img.shields.io/github/languages/top/adrs2004/IntraManage)](https://github.com/adrs2004/IntraManage)
[![GitHub repo size](https://img.shields.io/github/repo-size/adrs2004/IntraManage)](https://github.com/adrs2004/IntraManage)
[![GitHub last commit](https://img.shields.io/github/last-commit/adrs2004/IntraManage)](https://github.com/adrs2004/IntraManage/commits/main)
![Status](https://img.shields.io/badge/Status-Active-brightgreen)

</div>

## 📌 Overview

The **Industry Project Management System** is a comprehensive platform designed to streamline project coordination in academic and small-scale industry environments. It provides a structured ecosystem for managing projects, assigning roles, tracking progress, and maintaining secure access control.

### ✨ Key Features

- 🔐 **Role-Based Authentication** (Admin, Manager, Intern)
- 📊 **Project Lifecycle Management**
- 👥 **Team Assignment & Tracking**
- 📁 **Secure File Upload System**
- 📈 **Progress Monitoring Dashboard**
- 🔄 **Real-time Status Updates**

---

## 👥 Team

| Name                   | Roll No       |
|------------------------|---------------|
| Adarsh Kumar Pathak    | 2210991178    |
| Aditi                  | 2210991180    |
| Aargya Sharma          | 2210991116    |
| Kapil                  | 2210991744    |

---

## 🎯 Problem Statement

In many academic and small-scale industry setups, project management suffers from:

| Issue | Impact |
|-------|--------|
| ❌ Undefined roles & responsibilities | Confusion & inefficiency |
| ❌ Lack of progress tracking | Missed deadlines |
| ❌ Poor communication channels | Coordination breakdowns |
| ❌ No centralized file management | Data loss & version issues |

**Our solution** introduces a hierarchical, role-based project management platform that eliminates these bottlenecks.

---

## 🏗️ Tech Stack

<table>
  <tr>
    <th width="50%">🎨 Frontend</th>
    <th width="50%">⚙️ Backend</th>
  </tr>
  <tr>
    <td valign="top">
      <table>
        <tr><td><b>React (Vite)</b></td><td>UI Framework</td></tr>
        <tr><td><b>Tailwind CSS</b></td><td>Styling</td></tr>
        <tr><td><b>React Router DOM</b></td><td>Navigation</td></tr>
        <tr><td><b>Axios</b></td><td>API Calls</td></tr>
      </table>
    </td>
    <td valign="top">
      <table>
        <tr><td><b>Node.js</b></td><td>Runtime</td></tr>
        <tr><td><b>Express.js</b></td><td>Server Framework</td></tr>
        <tr><td><b>MongoDB + Mongoose</b></td><td>Database</td></tr>
        <tr><td><b>JWT</b></td><td>Authentication</td></tr>
        <tr><td><b>Bcrypt</b></td><td>Password Security</td></tr>
        <tr><td><b>Multer</b></td><td>File Uploads</td></tr>
      </table>
    </td>
  </tr>
</table>

### Installation & Setup

```bash
# Clone the repository
git clone https://github.com/adrs2004/IntraManage.git
cd IntraManage

# Start backend server
cd ../backend && npm install
npm run start

# Install Admin panel dependencies
cd ../admin && npm install
npm run dev

# Install Manager panel dependencies
cd ../manager && npm install
npm run dev

# Install Intern panel dependencies
cd ../intern && npm install
npm run dev

```

### Environment Variables
Create `.env` file in backend folder:
```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

<div align="center">

### © Copyright 2026 | IntraManage

![Copyright](https://img.shields.io/badge/License-All%20Rights%20Reserved-darkred)
![Status](https://img.shields.io/badge/Status-Pending-yellow)

</div>
