import React from 'react'

const Modal = (props) => {

  const questionHandler = props.questionHandler
  const postQuestion = props.postQuestion
  
  
  const postHandlder = () => {
    alert('Your question has been submitted. You can expect reply within 24 hours')
  }
  
  return (
    <div>
      <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
        POSt A QUESTION!
    </button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">ASK QUESTION HERE</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div >
              <textarea onChange={ (e) => {
                questionHandler(e)
              } } className="text-area text-box multi-line w-100 h-100" data-val="true" data-val-length="Maximum = 3000 characters" data-val-length-max="3000" id="info" name="info" cols="40" rows="3"></textarea>

              {/* <input onChange={ (e) => {
                questionHandler(e)
              }} className="modal-body w-100" type="text" placeholder="type question here"/> */}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              <button onClick={ postQuestion} type="button" className="btn btn-primary" data-dismiss="modal">POST</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal