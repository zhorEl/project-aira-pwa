# AIRA_NEXUS_WEB_APP_SCAFFOLD.md

# AIRA Nexus

## Web Application Scaffold

Version: 1.0

---

# Purpose

The AIRA Nexus Web Application serves as the operational and intelligence platform used by the Project Management Team (PMT), cooperatives, administrators, and decision-makers.

Unlike the mobile application, the web platform focuses on monitoring, analytics, administration, reporting, and decision support.

The primary dashboard is an interactive GIS map.

---

# Route Structure

```
app/

├── (public)
│   ├── login
│   ├── forgot-password
│   └── unauthorized
│
├── dashboard
│
├── map
│
├── farmers
│   ├── list
│   ├── profile
│   ├── create
│   └── verification
│
├── farms
│   ├── list
│   ├── details
│   ├── boundaries
│   ├── activities
│   └── production
│
├── cooperatives
│   ├── list
│   ├── profile
│   ├── members
│   └── reports
│
├── value-chain
│   ├── buyers
│   ├── traders
│   ├── processors
│   ├── roasters
│   ├── nurseries
│   └── service-providers
│
├── monitoring
│   ├── municipality
│   ├── barangay
│   ├── production
│   ├── interventions
│   └── field-status
│
├── analytics
│
├── reports
│
├── documents
│
├── users
│
├── organizations
│
├── tenants
│
├── settings
│
└── audit
```

---

# Dashboard

Default Landing Page

Components

* Interactive Map
* Search
* KPI Cards
* Coffee Heatmap
* Production Layer
* Farmer Layer
* Cooperative Layer
* Validation Layer
* Alerts
* Recent Activities
* Quick Reports

---

# Farmer Module

Features

* Farmer Registry
* Farmer Profile
* Farm Ownership
* Certifications
* Trainings
* Documents
* Production Summary
* Timeline

---

# Farm Module

Features

* Farm Profile
* GPS Coordinates
* Polygon Boundary
* Coffee Variety
* Elevation
* Area
* Trees
* Production
* Images
* Activity Timeline

---

# Cooperative Module

Features

* Cooperative Profile
* Members
* Production Summary
* Coverage Map
* Intervention History
* Reports

---

# Monitoring Module

PMT Dashboard

* Municipality Monitoring
* Barangay Monitoring
* Cooperative Monitoring
* Field Staff Monitoring
* Validation Queue

---

# Analytics Module

* Coffee Production
* Variety Distribution
* Heatmaps
* Productivity
* Farm Density
* Cooperative Rankings
* Data Quality

---

# Reports Module

Generate

* Farmer Reports
* Farm Reports
* Cooperative Reports
* Municipality Reports
* Provincial Reports

Export

* PDF
* Excel
* CSV

---

# Administration

* User Management
* Role Management
* ABAC
* Tenant Management
* Organization Management

---

# Settings

* Commodity
* Map Layers
* Notifications
* Validation Rules
* Backup
* Integrations

---

# Web Navigation

```
Dashboard

Map

Farmers

Farms

Cooperatives

Monitoring

Analytics

Reports

Administration

Settings
```
