import React from "react";
import "../css/contacts.css";

const departmentsData = [
  {
    name: "Department A",
    email: "A@example.com",
    phone: "62777563248",
    address: "123 Sales St, Business City, BC 10001",
    hours: "Monday - Friday: 9 AM - 5 PM",
  },
  {
    name: "Department B",
    email: "B@example.com",
    phone: "62777556248",
    address: "456 Support Ave, Tech Town, TT 20002",
    hours: "Monday - Sunday: 24/7",
  },
  {
    name: "Department C",
    email: "C@example.com",
    phone: "629777563248",
    address: "789 Marketing Blvd, Creative Hub, CH 30003",
    hours: "Monday - Friday: 10 AM - 6 PM",
  },
  {
    name: "Department D",
    email: "D@example.com",
    phone: "62758563248",
    address: "101 HR Lane, Talentville, TV 40004",
    hours: "Monday - Friday: 9 AM - 5 PM (Appointments Only)",
  },
  {
    name: "Department E",
    email: "E@example.com",
    phone: "62758563248",
    address: "202 Finance Rd, Capital City, CC 50005",
    hours: "Monday - Friday: 9 AM - 5 PM",
  },
  {
    name: "Department F",
    email: "F@example.com",
    phone: "62758563248",
    address: "303 R&D Park, Innovation Hub, IH 60006",
    hours: "Monday - Friday: 9 AM - 5 PM",
  },
];

const DepartmentsPage = () => {
  return (
    <div className="departments-container">
      <h1>Contact Departments</h1>
      <div className="department-grid">
        {departmentsData.map((department, index) => (
          <div className="department-card" key={index}>
            <h3>{department.name}</h3>
            <p>
              <strong>Email:</strong> {department.email}
            </p>
            <p>
              <strong>Phone</strong> {department.phone}
            </p>
            <p>
              <strong>Address:</strong>
              {department.address}
            </p>
            <p>
              <strong>Hours:</strong> {department.hours}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DepartmentsPage;
