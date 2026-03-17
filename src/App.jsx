import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import Card from "./components/Card";
import { FaSun, FaMoon } from "react-icons/fa";





function App() {


  const [dark, setDark] = useState(false);

  let themechanger = () => {
    setDark((prevDark) => {
      const newDark = !prevDark;
      document.body.style.backgroundColor = newDark ? "black" : "white";
      document.body.style.color = newDark ? "white" : "black";
      document.body.style.transition = "all 0.5s ease";
      return newDark;
    });
  };



  const [lang, setLang] = useState("tamil");

  const labels = {
    tamil: {
      name: "பெயர்*",
      dob: "பிறந்த தேதி*",
      gender: "பாலினம்*",
      male: "Male",
      female: "female",
      phone: "அலைபேசி எண்*",
      booth: "வார்டு எண்*",
      legislative: "சட்டமன்றம்*",
      district: "மாவட்டம்*",
      state: "மாநிலம்*",
      photo: "புகைப்படம்",
      submit: "பதிவு",
      statename: "தமிழ்நாடு"
    },
    english: {
      name: "Name*",
      dob: "Date of Birth*",
      gender: "Gender*",
      male: "Male",
      female: "Female",
      phone: "Phone Number*",
      booth: "Booth Number*",
      legislative: "Legislative*",
      district: "District*",
      state: "State*",
      photo: "Photo",
      submit: "Submit",
      statename: "Tamilnadu"
    },
  };



  const API = "http://localhost:5000";

  const [volunteers, setVolunteers] = useState({
    name: "",
    num: "",
    bno: "",
    dob: "",
    legislative: "",
    distric: "",
    state: labels[lang].statename,
    photo: "",
    gender: "",
  });

  const [print, setPrint] = useState({
    name: "",
    num: "",
    bno: "",
    dob: "",
    legislative: "",
    distric: "",
    state: "",
    photo: "",
    gender: "",
  });

  const [idcard, setIdcard] = useState([]);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getPayload = (vol) => ({
    name: vol.name,
    dob: vol.dob,
    gender: vol.gender,
    phone: vol.num,
    boothNumber: Number(vol.bno || 0),
    legislative: vol.legislative,
    district: vol.distric,
    state: vol.state,
    photo: vol.photo,
  });

  const fetchMembers = async () => {
    try {
      const res = await axios.get(`${API}/members`);
      setIdcard(res.data.response || []);
    } catch (err) {
      setError("Unable to load members");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMembers();
    setLang("english");
  }, []);

  const validateForm = () => {
    if (!volunteers.name.trim()) return "Name is required.";
    if (!volunteers.dob) return "Date of birth is required.";
    if (!volunteers.gender) return "Select gender.";
    if (!volunteers.num.trim()) return "Phone number is required.";
    if (!volunteers.bno.trim()) return "Booth number is required.";
    if (!volunteers.legislative.trim()) return "Legislative field is required.";
    if (!volunteers.distric.trim()) return "District is required.";
    if (!volunteers.state.trim()) return "State is required.";
    if (!volunteers.photo.trim()) return "Photo is required.";
    return "";
  };

  const submit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError("");
    try {
      const payload = getPayload(volunteers);
      if (editId) {
        await axios.put(`${API}/member/${editId}`, payload);
      } else {
        await axios.post(`${API}/member`, payload);
      }
      await fetchMembers();
      setVolunteers({
        name: "",
        num: "",
        bno: "",
        dob: "",
        legislative: "",
        distric: "",
        state: labels[lang].statename,
        photo: "",
        gender: "",
      });
      setEditId(null);
    } catch (err) {
      setError(err?.response?.data?.message || err.message || "Save failed");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const iddelete = async (id) => {
    try {
      await axios.delete(`${API}/member/${id}`);
      await fetchMembers();
    } catch (err) {
      setError("Delete failed");
      console.error(err);
    }
  };

  const objupdate = (member) => {
    setVolunteers({
      name: member.name || "",
      num: member.phone || "",
      bno: member.boothNumber ? String(member.boothNumber) : "",
      dob: member.dob ? member.dob.substring(0, 10) : "",
      legislative: member.legislative || "",
      distric: member.district || "",
      state: member.state || labels[lang].statename,
      photo: member.photo || "",
      gender: member.gender || "",
    });
    setEditId(member._id);
  };

  const printfun = (member) => {
    setPrint({
      ...member,
      num: member.phone || "",
      bno: member.boothNumber ? String(member.boothNumber) : "",
      distric: member.district || "",
    });
  };

  const handlelang = (e) => {
    const newLang = e.target.value;
    setLang(newLang);
    setVolunteers((prev) => ({
      ...prev,
      state: newLang === "tamil" ? "தமிழ்நாடு" : "Tamilnadu",
    }));
  };

  console.log(volunteers, labels[lang].statename);

  return (
    <>
      <div  >

        <header >
          <div className="title-box">
            <h1>தமிழக வெற்றிக் கழகம்</h1>
            <h3>பிறப்பொன்றும் எவ்வளவுயிர்க்கும்!</h3>
            <p>
              ❉ 9/801, எலஞ்சி 27S, 2வது மெயின் ரோடு, வள்ளலார் நகர், மண்ணதுரை, ஈரோடு
              கடைபிடிக்கும் சவகா, சென்னை - 60013.
            </p>
          </div>

          <div className="header-img">
            <img src="https://www.tvk.family/chat/web/assets/images/applogo.jpg" alt="" />
          </div>
        </header>
        <div className="language">
          <select className="languagebtn" value={lang} onChange={handlelang}>
            <option value="english">English</option>
            <option value="tamil">தமிழ்</option>
          </select>

          <button className="dark" onClick={themechanger} >
            {dark ? <FaSun /> : <FaMoon />}
          </button>

        </div>
        {loading && <p className="status">Saving...</p>}
        {error && <p className="status error">{error}</p>}
        <div className="main-container">

          <div className="application">

            <form action="" onSubmit={submit}>
              <div className="con">
                <div className="form-box">
                  <label>{labels[lang].name}</label>
                  <input type="text"
                    value={volunteers.name}
                    onChange={(e) => setVolunteers({ ...volunteers, name: e.target.value })}


                    required />
                </div>



                <div className="form-box">
                  <label>{labels[lang].dob}</label>
                  <input type="date" required

                    value={volunteers.dob}
                    onChange={(e) => setVolunteers({ ...volunteers, dob: e.target.value })}

                  />
                </div>


                <div className="form-box">
                  <label>{labels[lang].gender}</label>
                  <div className="radio">
                    <div className="aan">
                      <label htmlFor="gender1"><input type="radio" id="gender1" className="op" name="gender"
                        value="Male"
                        checked={volunteers.gender === "Male"}
                        onChange={(e) => setVolunteers({ ...volunteers, gender: e.target.value })}
                        required
                      /> Male
                      </label>

                      <br />
                      <label htmlFor="gender2">
                        <input type="radio" id="gender2" className="op" name="gender"
                          value="Female"
                          checked={volunteers.gender === "Female"}
                          onChange={(e) => setVolunteers({ ...volunteers, gender: e.target.value })}
                          required
                        />  female
                      </label>

                    </div>
                  </div>

                </div>

                <div className="form-box">
                  <label>{labels[lang].phone}</label>
                  <input type="number"
                    value={volunteers.num}
                    onChange={(e) => setVolunteers({ ...volunteers, num: e.target.value })}
                    required
                    maxLength="10"
                  />
                </div>

                <div className="form-box">
                  <label>{labels[lang].booth}</label>
                  <input type="text"

                    value={volunteers.bno}
                    onChange={(e) => setVolunteers({ ...volunteers, bno: e.target.value })}
                    required
                    maxLength="3"
                  />
                </div>

                <div className="form-box">
                  <label>{labels[lang].legislative}</label>
                  <input type="text"
                    value={volunteers.legislative}
                    onChange={(e) => setVolunteers({ ...volunteers, legislative: e.target.value })}

                    required />
                </div>

                <div className="form-box">
                  <label>{labels[lang].district}</label>
                  <input type="text"

                    value={volunteers.distric}
                    onChange={(e) => setVolunteers({ ...volunteers, distric: e.target.value })}
                    required />

                </div>

                <div className="form-box">
                  <label>{labels[lang].state}</label>
                  <input type="text"
                    
                    value={volunteers.state}
                    onChange={(e) => setVolunteers({ ...volunteers, state: e.target.value })}
                    required

                  />
                </div>

                <div className="form-box">
                  <label>{labels[lang].photo}</label>
                  <input type="file"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setVolunteers({ ...volunteers, photo: URL.createObjectURL(file) });
                      }
                    }}
                    required />


                </div>

              </div>

              <center>
                <button type="submit" className="submit-btn" disabled={loading}>
                  {loading ? "Saving..." : labels[lang].submit}
                </button>
              </center>
            </form>
          </div>
          <div className="table">
            <table>
              <thead>
                <tr>
                  <th>S.no</th>
                  <th>Photo</th>
                  <th className="name">Name</th>
                  <th>D.O.B</th>
                  <th>Gender</th>
                  <th>Booth no</th>
                  <th>Legislative</th>
                  <th>Distric</th>
                  <th className="action">Action</th>
                </tr>
              </thead>
              <tbody>
                {idcard.length > 0 ? (
                  idcard.map((ele, inx) => (
                    <tr key={ele._id || inx}>
                      <td>{inx + 1}</td>
                      <td>
                        {ele.photo ? (
                          <img src={ele.photo} alt="profile" width="50" height="50" />
                        ) : (
                          "No Image"
                        )}
                      </td>
                      <td>{ele.name}</td>
                      <td>{ele.dob ? ele.dob.substring(0, 10) : ""}</td>
                      <td>{ele.gender}</td>
                      <td>{ele.boothNumber}</td>
                      <td>{ele.legislative}</td>
                      <td>{ele.district}</td>

                      <td>
                        <button className="update" onClick={() => objupdate(ele)}>Update</button>
                        <button className="delete" onClick={() => iddelete(ele._id)}>Delete</button>
                      </td>

                      <td>
                        <button className="print" onClick={() => printfun(ele)}>Print</button>
                      </td>
                    </tr>
                  ))) :
                  (
                    <tr>
                      <td colSpan={8}>No record found</td>
                    </tr>
                  )}
              </tbody>

            </table>
          </div>
        </div >


        {/* ============================================================================================== */}
        {
          print && print.name !== "" ? (<Card member={print} onClose={() => setPrint({})} />) : ("")
        }

      </div >
    </>
  );

}

export default App;
