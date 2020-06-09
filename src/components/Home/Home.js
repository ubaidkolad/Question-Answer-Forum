import React, { useState, useEffect } from 'react'
import firebase from '../../firebase'
import Modal from '../Modal'
import Nav from '../Nav'
import Search from 'react-search'

const Home = (props) => {
  const [names, setNames] = useState([])
  const [ newQuestion, setNewQuestion ] = useState()
  const [ searchTerm, setSearchTerm ] = React.useState("");
  const [ searchResults, setSearchResults ] = React.useState([]);

  console.log(props)
  useEffect(() => {
    const fetchData = async () => {
      const db = firebase.firestore()
      const data = await db.collection('answered').get()
      setNames(data.docs.map((doc) => doc.data()))
    }
    fetchData()
  }, [])

  const questionHandler = (e) => {
    setNewQuestion(e.target.value)
    console.log(newQuestion)
  }

  const handleChange = event => {
    setSearchTerm(event.target.value);
  };

  

  useEffect(() => {
    const results = names.filter(person =>
      person.Question.toString().toLowerCase().includes(searchTerm)
    );
    setSearchResults(results);
  }, [names, searchTerm])

  const postQuestion = () => {
    const db = firebase.firestore()
    db.collection('unanswered').add({ name: newQuestion })
    alert(
      'Your question has been submitted. You can expect reply within 24 hours',
    )
  }

  return (
    <div>
      <Nav />
      <div className="container mt-4">
        <input
          type="text"
          placeholder="Search"
          value={ searchTerm }
          onChange={ handleChange }
        />
        { searchResults.map((search, index) => (
          < div className="card" >
            <div className="card-title bg-secondary text-light font-italic">
              <h5 className="py-2 px-3">Question : { search.Question } </h5>
            </div>
            <div className="card-body">
              { search.Answer.substring(0, 5) === 'https' ? (
                <iframe title="answer" width="100%" height="345" src={search.Answer}>
                </iframe>
              ): (
                <p style = { { fontSize: '20px' } } key={ index }>

                <strong>Answer:</strong> <br />
              { search.Answer }{ ' ' }
              </p>
              )}
            </div>
          </div >
        ))}
        <Modal questionHandler={questionHandler} postQuestion={postQuestion} />
        <br />
        <br />
      </div>
    </div>
  )
}

export default Home



  