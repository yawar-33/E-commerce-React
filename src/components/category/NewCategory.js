import React, { useState, useEffect } from 'react'
import GET from '../../utilities/getApiCall'
import POST from '../../utilities/postApiCall'
import PUT from '../../utilities/putAPICall'
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

  const saveCategory = () => {
    POST('catagory/create', categModel, token)
      .then((res) => {
        console.log('Save Category', res)
        props.onClose()
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const updateCategory = () => {
    PUT('catagory/updateCatagory', categModel, token)
      .then((res) => {
        console.log('Update Category', res)
        props.onClose()
      })
      .catch((error) => {
        console.log(error)
      })
  }
  const saveData = () => {
    if (editID > 0) {
      updateCategory()
    } else {
      saveCategory()
    }
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
                {editID > 0 ? 'Edit Your Detail' : 'Enter New Category'}
              </h4>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="name">Name</label>
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
                <label htmlFor="description">Description</label>
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
