import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Drive.css";

function Drive() {

  const [drives, setDrives] = useState([]);
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    company_name: "",
    drive_title: "",
    job_role: "",
    package: "",
    eligibility_cgpa: "",
    drive_date: "",
    last_date: "",
    location: "",
  });

  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchDrives();
  }, []);

  const fetchDrives = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/drives");

      if (res.data.success) {
        setDrives(res.data.drives);
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
      drive_title: "",
      job_role: "",
      package: "",
      eligibility_cgpa: "",
      drive_date: "",
      last_date: "",
      location: "",
    });

    setEditId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      if (editId) {

        await axios.put(
          `http://localhost:5000/api/drives/update/${editId}`,
          form
        );

        alert("Drive Updated Successfully");

      } else {

        await axios.post(
          "http://localhost:5000/api/drives/add",
          form
        );

        alert("Drive Added Successfully");
      }

      fetchDrives();
      clearForm();

    } catch (err) {
      console.log(err);
      alert("Something went wrong");
    }
  };

  const handleEdit = (drive) => {
    setForm({
      company_name: drive.company_name,
      drive_title: drive.drive_title,
      job_role: drive.job_role,
      package: drive.package,
      eligibility_cgpa: drive.eligibility_cgpa,
      drive_date: drive.drive_date,
      last_date: drive.last_date,
      location: drive.location,
    });

    setEditId(drive.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this drive?")) {

      try {

        await axios.delete(
          `http://localhost:5000/api/drives/delete/${id}`
        );

        fetchDrives();

      } catch (err) {
        console.log(err);
      }

    }
  };

  const filteredDrives = drives.filter(
    (drive) =>
      drive.company_name.toLowerCase().includes(search.toLowerCase()) ||
      drive.drive_title.toLowerCase().includes(search.toLowerCase())
  );

  return (

    <div className="drive-page">

      <div className="drive-header">

        <h2>📅 Placement Drive Management</h2>

        <p>Manage placement drives and opportunities</p>

      </div>

      <div className="drive-card">

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

              <label>Drive Title</label>

              <input
                type="text"
                className="form-control"
                name="drive_title"
                value={form.drive_title}
                onChange={handleChange}
                required
              />

            </div>

            <div className="col-md-6 mb-4">

              <label>Job Role</label>

              <input
                type="text"
                className="form-control"
                name="job_role"
                value={form.job_role}
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

            <div className="col-md-6 mb-4">

              <label>Eligibility CGPA</label>

              <input
                type="number"
                step="0.01"
                className="form-control"
                name="eligibility_cgpa"
                value={form.eligibility_cgpa}
                onChange={handleChange}
                required
              />

            </div>

            <div className="col-md-6 mb-4">

              <label>Drive Date</label>

              <input
                type="date"
                className="form-control"
                name="drive_date"
                value={form.drive_date}
                onChange={handleChange}
                required
              />

            </div>

            <div className="col-md-6 mb-4">

              <label>Last Date</label>

              <input
                type="date"
                className="form-control"
                name="last_date"
                value={form.last_date}
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

          </div>

          <div className="btn-group-custom">

            <button
              type="submit"
              className="btn btn-primary custom-btn"
            >
              {editId ? "Update Drive" : "Add Drive"}
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

      <div className="drive-card mt-4">

        <div className="mb-4">

          <input
            type="text"
            className="form-control"
            placeholder="🔍 Search by Company or Drive Title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>

        <h4 className="mb-4">📋 Placement Drive List</h4>

        <div className="table-responsive">

          <table className="table table-hover align-middle">

            <thead>
              <tr>
                <th>Company</th>
                <th>Drive</th>
                <th>Role</th>
                <th>Package</th>
                <th>CGPA</th>
                <th>Drive Date</th>
                <th>Last Date</th>
                <th>Location</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {filteredDrives.length > 0 ? (

                filteredDrives.map((drive) => (

                  <tr key={drive.id}>

                    <td>{drive.company_name}</td>
                    <td>{drive.drive_title}</td>
                    <td>{drive.job_role}</td>
                    <td>{drive.package} LPA</td>
                    <td>{drive.eligibility_cgpa}</td>
                    <td>{drive.drive_date}</td>
                    <td>{drive.last_date}</td>
                    <td>{drive.location}</td>

                    <td>

                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() => handleEdit(drive)}
                      >
                        Edit
                      </button>

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(drive.id)}
                      >
                        Delete
                      </button>

                    </td>

                  </tr>

                ))

              ) : (

                <tr>

                  <td colSpan="9" className="text-center">
                    No Drives Found
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

export default Drive; 