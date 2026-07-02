import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Company.css";

function Company() {

  const [companies, setCompanies] = useState([]);
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    company_name: "",
    hr_name: "",
    email: "",
    phone: "",
    location: "",
    package: "",
  });

  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/companies"
      );

      if (res.data.success) {
        setCompanies(res.data.companies);
      }

    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const clearForm = () => {
    setForm({
      company_name: "",
      hr_name: "",
      email: "",
      phone: "",
      location: "",
      package: "",
    });

    setEditId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      if (editId) {

        await axios.put(
          `http://localhost:5000/api/companies/update/${editId}`,
          form
        );

        alert("Company Updated Successfully");

      } else {

        await axios.post(
          "http://localhost:5000/api/companies/add",
          form
        );

        alert("Company Added Successfully");
      }

      fetchCompanies();
      clearForm();

    } catch (err) {
      console.log(err);
      alert("Something went wrong");
    }
  };

  const handleEdit = (company) => {
    setForm({
      company_name: company.company_name,
      hr_name: company.hr_name,
      email: company.email,
      phone: company.phone,
      location: company.location,
      package: company.package,
    });

    setEditId(company.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this company?")) {

      try {

        await axios.delete(
          `http://localhost:5000/api/companies/delete/${id}`
        );

        fetchCompanies();

      } catch (err) {
        console.log(err);
      }

    }
  };

  const filteredCompanies = companies.filter(
    (company) =>
      company.company_name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      company.hr_name
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  return (

    <div className="company-page">

      <div className="company-header">
        <h2>🏢 Company Management</h2>
        <p>Manage company details for campus placements</p>
      </div>

      <div className="company-card">

        <form onSubmit={handleSubmit}>

          <div className="row">
            <div className="col-md-6 mb-4">

              <label>Company Name</label>

              <input
                type="text"
                className="form-control"
                name="company_name"
                value={form.company_name}
                onChange={handleChange}
                required
              />

            </div>

            <div className="col-md-6 mb-4">

              <label>HR Name</label>

              <input
                type="text"
                className="form-control"
                name="hr_name"
                value={form.hr_name}
                onChange={handleChange}
                required
              />

            </div>

            <div className="col-md-6 mb-4">

              <label>Email</label>

              <input
                type="email"
                className="form-control"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
              />

            </div>

            <div className="col-md-6 mb-4">

              <label>Phone</label>

              <input
                type="text"
                className="form-control"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                required
              />

            </div>

            <div className="col-md-6 mb-4">

              <label>Location</label>

              <input
                type="text"
                className="form-control"
                name="location"
                value={form.location}
                onChange={handleChange}
                required
              />

            </div>

            <div className="col-md-6 mb-4">

              <label>Package (LPA)</label>

              <input
                type="number"
                className="form-control"
                name="package"
                value={form.package}
                onChange={handleChange}
                required
              />

            </div>

          </div>

          <div className="btn-group-custom">

            <button
              type="submit"
              className="btn btn-primary custom-btn"
            >
              {editId ? "Update Company" : "Add Company"}
            </button>

            <button
              type="button"
              className="btn btn-secondary custom-btn"
              onClick={clearForm}
            >
              Clear
            </button>

          </div>

        </form>

      </div>

      <div className="company-card mt-4">

        <div className="mb-4">

          <input
            type="text"
            className="form-control"
            placeholder="🔍 Search by Company or HR Name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>

        <h4 className="mb-4">📋 Company List</h4>

        <div className="table-responsive">

          <table className="table table-hover align-middle">

            <thead>

              <tr>
                <th>Company</th>
                <th>HR Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Location</th>
                <th>Package</th>
                <th>Action</th>
              </tr>

            </thead>

            <tbody>

              {filteredCompanies.length > 0 ? (

                filteredCompanies.map((company) => (

                  <tr key={company.id}>

                    <td>{company.company_name}</td>
                    <td>{company.hr_name}</td>
                    <td>{company.email}</td>
                    <td>{company.phone}</td>
                    <td>{company.location}</td>
                    <td>{company.package} LPA</td>

                    <td>

                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() => handleEdit(company)}
                      >
                        Edit
                      </button>

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(company.id)}
                      >
                        Delete
                      </button>

                    </td>

                  </tr>

                ))

              ) : (

                <tr>

                  <td colSpan="7" className="text-center">
                    No Companies Found
                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>

  );
}

export default Company;