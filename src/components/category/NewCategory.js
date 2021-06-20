import React, { useState, useEffect } from 'react'
import GET from '../../utilities/getApiCall'
import { useSelector } from 'react-redux'

export default function NewCategory(props) {
  const token = useSelector((state) =>
    state.login ? state.login.token.token : null,
  )

  let initailModel = {
    id: props.id,
    name: '',
    description: '',
  }
  const [editID] = useState(initailModel.id)
  const [categModel, setCategModel] = useState(initailModel)
  const getCatagoryDetailBYID = () => {
    GET('catagory/findCatagoryById/' + editID, token)
      .then((res) => {
        setCategModel(res.data.categCollection)
      })
      .catch((error) => {
        console.log(error)
      })
  }
  useEffect(() => {
    if (editID > 0) {
      getCatagoryDetailBYID()
    }
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    let model = { ...categModel }
    model[name] = value.toUpperCase()
    setCategModel(model)
  }

  const saveData = () => {
    console.log(categModel)
  }
  return (
    <>
      <div
        className={editID === -1 ? 'modal fade' : 'modal fade show'}
        style={{
          display: editID === -1 ? 'none' : 'block',
        }}
        id="edit"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="edit"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title custom_align" id="Heading">
                Edit Your Detail
              </h4>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <input
                  className="form-control "
                  type="text"
                  name="name"
                  id="name"
                  value={categModel.name}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <textarea
                  rows="2"
                  className="form-control"
                  name="description"
                  id="description"
                  value={categModel.description}
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>
            <div className="modal-footer ">
              <button
                type="button"
                className="btn btn-warning"
                onClick={saveData}
              >
                 {editID > 0 ? 'Update' : 'Save'}
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={props.onClose}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
