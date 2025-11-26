import { useState } from "react";
import "./App.css";
import Card from "./components/Card";

function App() {


  const [volunteers, setVolunteers] = useState(
    {
      name: "",
      num: "",
      bno: "",
      dob: "",
      legislative: "",
      distric: "",
      state: "",
      photo: ""

    }

  )
  const [print, setPrint] = useState(
    {
      name: "",
      num: "",
      bno: "",
      dob: "",
      legislative: "",
      distric: "",
      state: "",
      photo: ""

    }

  )
  // console.log(volunteers)



  const [idcard, setIdcard] = useState([]);



  let submit = (e) => {
    e.preventDefault()
    setIdcard([...idcard, volunteers])

    setVolunteers({
      name: "",
      num: "",
      bno: "",
      dob: "",
      legislative: "",
      distric: "",
      state: "",
      photo: "",
      gender: ""
    })
    console.log(idcard)


    console.log(editIdx)

    if (editIdx === null) {

      setIdcard([...idcard, volunteers]);
    } else {

      let updateList = idcard.map((ele, index) =>
        index === editIdx ? volunteers : ele
      );
      setIdcard(updateList);
      setEditIdx(null);
    }
  }

  let iddelete = (inx) => {
    console.log(inx)
    let removeid = idcard.filter((ele, index) => index !== inx)
    setIdcard(removeid)

  }
  const [editIdx, setEditIdx] = useState(null);
  console.log(editIdx)

  let objupdate = (inx) => {
    console.log(inx)
    let [updates] = idcard.filter((ele, index) => index === inx)
    console.log(updates)
    setVolunteers({
      name: updates.name,
      num: updates.num,
      bno: updates.bno,
      dob: updates.dob,
      legislative: updates.legislative,
      distric: updates.distric,
      state: updates.state,
      photo: updates.photo,
      gender: updates.gender

    })
    setEditIdx(inx)
  }

  let printfun = (inx) => {
    console.log(inx)
    let [printobj] = idcard.filter((ele, index) => index == inx)
    console.log(printobj)
    setPrint(printobj)
  }



  return (
    <>
      <header>
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
      <div className="main-container">


        <div className="application">

          <form action="" onSubmit={submit}>
            <div className="con">
              <div className="form-box">
                <label>பெயர்*</label>
                <input type="text"
                  value={volunteers.name}
                  onChange={(e) => setVolunteers({ ...volunteers, name: e.target.value })}


                  required />
              </div>



              <div className="form-box">
                <label>பிறந்த தேதி*</label>
                <input type="date" required

                  value={volunteers.dob}
                  onChange={(e) => setVolunteers({ ...volunteers, dob: e.target.value })}

                />
              </div>


              <div className="form-box">
                <label>பாலினம்*</label>
                <div className="radio">
                  <div className="aan">
                    <input type="radio" className="op" name="gender"
                      value="Male"
                      onClick={(e) => setVolunteers({ ...volunteers, gender: e.target.value })}
                      required
                    /> <label>Male
                    </label>

                    <br />
                    <input type="radio" className="op" name="gender"
                      value="Female"
                      onClick={(e) => setVolunteers({ ...volunteers, gender: e.target.value })}
                      required
                    /> <label> female
                    </label>
                  </div>
                </div>

              </div>

              <div className="form-box">
                <label>அலைபேசி எண்*</label>
                <input type="number"
                  value={volunteers.num}
                  onChange={(e) => setVolunteers({ ...volunteers, num: e.target.value })}
                  required
                  maxLength="10"
                />
              </div>

              <div className="form-box">
                <label>வார்டு எண்*</label>
                <input type="text"

                  value={volunteers.bno}
                  onChange={(e) => setVolunteers({ ...volunteers, bno: e.target.value })}
                  required
                  maxLength="3"
                />
              </div>

              <div className="form-box">
                <label>சட்டமன்றம்*</label>
                <input type="text"
                  value={volunteers.legislative}
                  onChange={(e) => setVolunteers({ ...volunteers, legislative: e.target.value })}

                  required />
              </div>

              <div className="form-box">
                <label>மாவட்டம்*</label>
                <input type="text"

                  value={volunteers.distric}
                  onChange={(e) => setVolunteers({ ...volunteers, distric: e.target.value })}
                  required />

              </div>

              <div className="form-box">
                <label>"மாநிலம்"*</label>
                <input type="text"
                  // value={volunteers.state}
                  value="tamilnadu"
                  onChange={(e) => setVolunteers({ ...volunteers, state: e.target.value })}
                  required

                />
              </div>

              <div className="form-box">
                <label>புகைப்படம்</label>
                <input type="file"
                  onChange={(e) => setVolunteers({
                    ...volunteers, photo: URL.createObjectURL(e.target.files[0])
                  })}
                  required />


              </div>

            </div>

            <center>
              <button className="submit-btn">பதிவு</button>
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
                  <tr key={inx}>
                    <td>{inx + 1}</td>
                    <td>
                      {ele.photo ? (
                        <img src={ele.photo} alt="profile" width="50" height="50" />
                      ) : (
                        "No Image"
                      )}
                    </td>
                    <td>{ele.name}</td>
                    <td>{ele.dob}</td>
                    <td>{ele.gender}</td>
                    <td>{ele.bno}</td>
                    <td>{ele.legislative}</td>
                    <td>{ele.distric}</td>
                    {/* <td>{ele.}</td>
                    <td>{ele.}</td> */}

                    <td>
                      <button className="update" onClick={() => objupdate(inx)}>Update</button>
                      <button className="delete" onClick={() => iddelete(inx)}>Delete</button>
                    </td>

                    <td>
                      <button className="print" onClick={() => printfun(inx)}>Print</button>
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
        print && print.name !== "" ? (< Card member={print} />) : ("")
      }


    </>
  );

}

export default App;
