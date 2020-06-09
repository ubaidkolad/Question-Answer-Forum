import React, { useState, useEffect } from 'react'
import Nav from '../Nav'
import firebase from 'firebase'
import Home from '../Home/Home'
import AddCategory from './AddCategory'

const Admin = () => {
  const [names, setNames] = useState([])
  const [answer, setAnswer] = useState()
  const [loading, setLoading] = useState(true)
  const [reload, setReload] = useState()
  const [ categories, setCategories ] = useState(["Haj", "Ramadan","Aqaid"])
  const [ categoryName, setCategoryName ] = useState('')
  const [ selectOption, setSelectOption ] = useState()

  //console.log(categories)

  const handleText = (e) => {
    setCategoryName(e.target.value)
  }

  const set = () => {
    //console.log(categoryName)
    Array.prototype.push.apply(categories, [categoryName])
    console.log(categories)
    localStorage.setItem("Categories", JSON.stringify(categories))
  }


  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      const db = firebase.firestore()
      const data = await db.collection('unanswered').get()
      setNames(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      setLoading(false)
    }
    fetchData()
    //.log(names)
  }, [reload])

  const urlChange = (e) => {
    let url = e.target.value
    let res = url.substring(17)
    console.log(res)
    setURL(res)
  }

  const setURL = async (res) => {
    res = res+""
    await setAnswer(`https://www.youtube.com/embed/${res}`)
    console.log(answer)
  }

  const answerChange = (e) => {
    setAnswer(e.target.value)
    console.log(answer)
  }

  const submitAnswer = (e, q, id) => {
    e.preventDefault()

    console.log(answer)
    if (answer === undefined) {
      return alert('Please type an answer')
    } else {
      //alert("This question is marked ANSWERED!")
      setReload(true)
      //console.log('to be deleted', q)
      const db = firebase.firestore()
      db.collection('answered').add({
        Question: q,
        Answer: answer,
        category: selectOption ,
      })
      db.collection('unanswered').doc(id).delete()
    }
  }

  return (
    <>
      <Nav />
      <AddCategory set={set} handleText={handleText} />
      <div className="container mt-4">
        {loading ? (
          <center>Loading...</center>
        ) : names.length === 0 ? (
          <center>
            <h3>You have no questions</h3>
          </center>
        ) : (
          names.map((name, index) => (
            <div className="card mt-3" key={index}>
              <div className="card-title bg-secondary text-light font-italic">
                <h5 className="py-2 px-3">Question : {name.name}</h5>
              </div>
              <div className="card-body">
                <p style={{ fontSize: '20px', height: '10rem' }}>
                  <strong>Answer:</strong> <br />
                  <textarea
                    onChange={answerChange}
                    className="text-area text-box multi-line w-100 h-100"
                    data-val="true"
                    data-val-length="Maximum = 3000 characters"
                    data-val-length-max="3000"
                    id="info"
                    name="info"
                    cols="40"
                    rows="3"
                  ></textarea>
                </p>
                <br />
                <h4>OR</h4>
                <input onChange={ urlChange}type="text" placeholder="Paste VIDEO URL" />
                <br/>
                <div className="form-group">
                  <label for="exampleFormControlSelect1">Example select</label>
                  <select onChange={ (e) => {
                    setSelectOption(e.target.value)
                  } } className="form-control" id="exampleFormControlSelect1">
                    <option disabled selected>Select Category</option>
                    { categories.map((category, index) => (
                      <option  value={ category }>{ category }</option>
                    ))}
                  </select>
                </div>
                <button
                  onClick={ (e) => {
                    submitAnswer(e, name.name, name.id)
                  } }
                  className="btn-success btn mt-4"
                >
                  Submit
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  )
}

export default Admin
