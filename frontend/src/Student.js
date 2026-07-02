import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./student.css";

function Student() {

  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    usn: "",
    name: "",
    email: "",
    phone: "",
    branch: "",
    semester: "",
    cgpa: "",
  });

  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/students"
      );

      setStudents(res.data.students);

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
      usn: "",
      name: "",
      email: "",
      phone: "",
      branch: "",
      semester: "",
      cgpa: "",
    });

    setEditId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      if (editId) {

        await axios.put(
          `http://localhost:5000/api/students/update/${editId}`,
          form
        );

        alert("Student Updated Successfully");

      } else {

        await axios.post(
          "http://localhost:5000/api/students/add",
          form
        );

        alert("Student Added Successfully");
      }

      fetchStudents();
      clearForm();

    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = (student) => {

    setForm({
      usn: student.usn,
      name: student.name,
      email: student.email,
      phone: student.phone,
      branch: student.branch,
      semester: student.semester,
      cgpa: student.cgpa,
    });

    setEditId(student.id);

  };

  const handleDelete = async (id) => {

    if (window.confirm("Delete this student?")) {

      try {

        await axios.delete(
          `http://localhost:5000/api/students/delete/${id}`
        );

        fetchStudents();

      } catch (err) {
        console.log(err);
      }

    }

  };

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(search.toLowerCase()) ||
      student.usn.toLowerCase().includes(search.toLowerCase())
  );

  return (

    <div className="student-page">

      <div className="student-card">

        <div className="student-header">

          <h2>🎓 Student Management</h2>

          <p>Manage student information efficiently</p>

        </div>

        <form onSubmit={handleSubmit}>

          <div className="row">

            <div className="col-md-6 mb-3">

              <label>USN</label>

              <input
                type="text"
                className="form-control"
                name="usn"
                value={form.usn}
                onChange={handleChange}
                required
              />

            </div>

            <div className="col-md-6 mb-3">

              <label>Name</label>

              <input
                type="text"
                className="form-control"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />

            </div>
            <div className="col-md-6 mb-3">

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

            <div className="col-md-6 mb-3">

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

            <div className="col-md-6 mb-3">

              <label>Branch</label>

              <input
                type="text"
                className="form-control"
                name="branch"
                value={form.branch}
                onChange={handleChange}
                required
              />

            </div>

            <div className="col-md-3 mb-3">

              <label>Semester</label>

              <input
                type="number"
                className="form-control"
                name="semester"
                value={form.semester}
                onChange={handleChange}
                required
              />

            </div>

            <div className="col-md-3 mb-3">

              <label>CGPA</label>

              <input
                type="number"
                step="0.01"
                className="form-control"
                name="cgpa"
                value={form.cgpa}
                onChange={handleChange}
                required
              />

            </div>

          </div>

          <button
            type="submit"
            className="btn btn-primary custom-btn me-2"
          >
            {editId ? "Update Student" : "Add Student"}
          </button>

          <button
            type="button"
            className="btn btn-secondary custom-btn"
            onClick={clearForm}
          >
            Clear
          </button>

        </form>

      </div>

      <div className="student-card mt-4">

        <div className="mb-4">

          <input
            type="text"
            className="form-control"
            placeholder="🔍 Search by USN or Name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>

        <h4 className="mb-4">📋 Student List</h4>

        <div className="table-responsive">

          <table className="table table-hover align-middle">

            <thead>

              <tr>
                <th>USN</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Branch</th>
                <th>Semester</th>
                <th>CGPA</th>
                <th>Actions</th>
              </tr>

            </thead>

            <tbody>

              {filteredStudents.length > 0 ? (

                filteredStudents.map((student) => (

                  <tr key={student.id}>

                    <td>{student.usn}</td>
                    <td>{student.name}</td>
                    <td>{student.email}</td>
                    <td>{student.phone}</td>
                    <td>{student.branch}</td>
                    <td>{student.semester}</td>
                    <td>{student.cgpa}</td>

                    <td>

                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() => handleEdit(student)}
                      >
                        Edit
                      </button>

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(student.id)}
                      >
                        Delete
                      </button>

                    </td>

                  </tr>

                ))

              ) : (

                <tr>

                  <td colSpan="8" className="text-center">
                    No Students Found
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

export default Student;