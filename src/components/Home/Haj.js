import React, { useState , useEffect} from 'react'
import firebase from 'firebase'
import Nav from '../Nav'


const Haj = () => {

  const [ solutions, setSolutions ] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const db = firebase.firestore()
      await db.collection("answered").where("category", "==", "Haj")
        .get()
        .then(function (querySnapshot) {
          let s=[]
          querySnapshot.forEach(doc => s.push(({ ...doc.data(), id: doc.id })));
          setSolutions(s)
        })
        .catch(function (error) {
          console.log("Error getting documents: ", error);
        });
    }
    fetchData()
  }, [solutions])
  
 // console.log(name)
  
  return (
    <div>
      <Nav />
      { solutions === undefined ? (<h3>ok</h3>): (
        solutions.map((name, index) => (
          <div className="container mt-4">
        <div className="card" >
          <div className="card-title bg-secondary text-light font-italic"><h5 className="py-2 px-3">Question : { name.Question } </h5></div >
          <div className="card-body">
            <p style={ { fontSize: "20px" } } > <strong>Answer:</strong> <br />
              { name.Answer } </p>
          </div>
        </div >
      </div>
        ))
      )}
      </div>
 ) 
}

export default Haj