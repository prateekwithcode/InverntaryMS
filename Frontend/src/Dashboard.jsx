import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    name: "",
    itemId: "",
    quantity: "",
    price: ""
  });
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("isLoggedIn")) {
      navigate("/");
    }
  }, [navigate]);

  const fetchItems = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/items?search=${search}`
      );
      setItems(res.data);
    } catch {
      alert("Failed to fetch items");
    }
  };

  useEffect(() => {
    fetchItems();
  }, [search]);

  const handleAdd = async () => {
    if (!form.name || !form.itemId || !form.quantity || !form.price) {
      alert("All fields are required");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/items", {
        ...form,
        quantity: Number(form.quantity),
        price: Number(form.price)
      });

      setForm({ name: "", itemId: "", quantity: "", price: "" });
      fetchItems();
    } catch (error) {
      alert(error.response?.data?.message || "Error adding item");
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/items/${editId}`,
        {
          ...form,
          quantity: Number(form.quantity),
          price: Number(form.price)
        }
      );

      setEditId(null);
      setForm({ name: "", itemId: "", quantity: "", price: "" });
      fetchItems();
    } catch {
      alert("Update failed");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this item?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/items/${id}`);
      fetchItems();
    } catch {
      alert("Delete failed");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  return (
    <div style={{ background: "#f4f6f9", minHeight: "100vh" }}>
      
      {/* Top Navbar */}
      <div
        className="d-flex justify-content-between align-items-center px-4 py-3 shadow-sm"
        style={{ background: "#ffffff" }}
      >
        <h4 className="fw-bold m-0">Inventory Management</h4>
        <button className="btn btn-outline-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="container py-4">

        {/* Form Card */}
        <div className="card border-0 shadow-sm p-4 mb-4">
          <h5 className="fw-semibold mb-3">
            {editId ? "Update Item" : "Add New Item"}
          </h5>

          <div className="row g-3">
            <div className="col-md-3">
              <input
                className="form-control"
                placeholder="Item Name"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
              />
            </div>

            <div className="col-md-2">
              <input
                className="form-control"
                placeholder="Item ID"
                value={form.itemId}
                onChange={(e) =>
                  setForm({ ...form, itemId: e.target.value })
                }
              />
            </div>

            <div className="col-md-2">
              <input
                type="number"
                className="form-control"
                placeholder="Quantity"
                value={form.quantity}
                onChange={(e) =>
                  setForm({ ...form, quantity: e.target.value })
                }
              />
            </div>

            <div className="col-md-2">
              <input
                type="number"
                className="form-control"
                placeholder="Price"
                value={form.price}
                onChange={(e) =>
                  setForm({ ...form, price: e.target.value })
                }
              />
            </div>

            <div className="col-md-3">
              {editId ? (
                <button
                  className="btn btn-warning w-100"
                  onClick={handleUpdate}
                >
                  Update Item
                </button>
              ) : (
                <button
                  className="btn btn-primary w-100"
                  onClick={handleAdd}
                >
                  Add Item
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="mb-3">
          <input
            className="form-control shadow-sm"
            placeholder="Search items..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Table Card */}
        <div className="card border-0 shadow-sm">
          <div className="table-responsive">
            <table className="table align-middle mb-0">
              <thead style={{ background: "#343a40", color: "#fff" }}>
                <tr>
                  <th>Name</th>
                  <th>ID</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {items.map((item) => (
                  <tr key={item._id}>
                    <td>{item.name}</td>
                    <td>{item.itemId}</td>

                    <td>
                      <span
                        className={`fw-semibold ${
                          item.quantity < 10
                            ? "text-danger"
                            : "text-success"
                        }`}
                      >
                        {item.quantity}
                        {item.quantity < 10 && " (Low)"}
                      </span>
                    </td>

                    <td>₹{item.price}</td>

                    <td className="text-center">
                      <button
                        className="btn btn-sm btn-outline-warning me-2"
                        onClick={() => {
                          setForm({
                            name: item.name,
                            itemId: item.itemId,
                            quantity: item.quantity,
                            price: item.price
                          });
                          setEditId(item._id);
                        }}
                      >
                        Edit
                      </button>

                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDelete(item._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}

                {items.length === 0 && (
                  <tr>
                    <td colSpan="5" className="text-center py-4 text-muted">
                      No items found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;