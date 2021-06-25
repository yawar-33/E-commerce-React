import { useState, useEffect } from 'react'
import GET from '../../utilities/getApiCall'
import POST from '../../utilities/postApiCall'
import PUT from '../../utilities/putAPICall'
import { useSelector } from 'react-redux'
import isNull from '../../utilities/nullChecking'
export default function NewProduct(props) {
  const token = useSelector((state) =>
    state.login ? state.login.token.token : null,
  )
  let initailModel = {
    id: props.id,
    name: '',
    description: '',
    price: '',
    image: '',
    units: '',
    categoryId: null,
  }
  let initValidateModel = {
    valName: '',
    valDescription: '',
    valPrice: '',
    valUnits: '',
    valCategory: '',
    isvalid: false,
  }
  const [editID] = useState(initailModel.id)
  const [proModel, setProModel] = useState(initailModel)
  const [dropDown, setdropDown] = useState([])
  const [validationModel, setValidationModel] = useState(initValidateModel)

  useEffect(() => {
    if (editID > 0) {
      getProductDetailByID()
    }
    getAllCategories()
  }, [])
  const getAllCategories = () => {
    GET('catagory/findAll', token)
      .then((res) => {
        setdropDown(res.data.categCollection)
      })
      .catch((error) => {
        console.log(error)
      })
  }
  const getProductDetailByID = () => {
    GET('product/findProductById/' + editID, token)
      .then((res) => {
        setProModel(res.data.proCollection)
      })
      .catch((error) => {
        console.log(error)
      })
  }
  const handleChange = (e) => {
    const { name, value } = e.target
    let model = { ...proModel }

    model[name] = name === 'categoryId' ? Number(value) : value.toUpperCase()
    setProModel(model)
  }

  const validateModel = () => {
    let model = { ...proModel }
    let valModel = { ...validationModel }

    if (isNull(model.name)) {
      valModel.valName = (
        <div className="invalid-feedback" style={{ display: 'block' }}>
          Enter Name
        </div>
      )
      valModel.isvalid = true
      setValidationModel(valModel)
      return true
    } else if (isNull(model.categoryId)) {
      valModel.valCategory = (
        <div className="invalid-feedback" style={{ display: 'block' }}>
          Select Category
        </div>
      )
      valModel.isvalid = true
      setValidationModel(valModel)
      return true
    } else if (isNull(model.price)) {
      valModel.valPrice = (
        <div className="invalid-feedback" style={{ display: 'block' }}>
          Enter Price
        </div>
      )
      valModel.isvalid = true
      setValidationModel(valModel)
      return true
    } else if (isNull(model.units)) {
      valModel.valUnits = (
        <div className="invalid-feedback" style={{ display: 'block' }}>
          Enter Units
        </div>
      )
      valModel.isvalid = true
      setValidationModel(valModel)
      return true
    } else if (isNull(model.description)) {
      valModel.valDescription = (
        <div className="invalid-feedback" style={{ display: 'block' }}>
          Enter Description
        </div>
      )
      valModel.isvalid = true
      setValidationModel(valModel)
      return true
    } else {
      valModel.isvalid = false
      setValidationModel(valModel)
      return false
    }
  }
  const saveData = () => {
    let validationResponse = validateModel()
    if (validationResponse) {
      return
    } else {
      if (editID > 0) {
        updateProduct()
      } else {
        saveProduct()
      }
    }
  }

  const updateProduct = () => {
    PUT('product/updateProduct/', proModel, token)
      .then((res) => {
        console.log('Updated Product', res)
        props.onClose()
      })
      .catch((error) => {
        console.log(error)
      })
  }
  const saveProduct = () => {
    POST('product/create', proModel, token)
      .then((res) => {
        console.log('Save Product', res)
        props.onClose()
      })
      .catch((error) => {
        console.log(error)
      })
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
                {editID > 0 ? 'Edit Your Detail' : 'Enter New Product'}
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
                  value={proModel.name}
                  onChange={handleChange}
                />
                {validationModel.valName}
              </div>
              <div className="form-group">
                <label htmlFor="categoryId">Category</label>
                <select
                  className="form-control "
                  name="categoryId"
                  id="categoryId"
                  value={proModel.categoryId}
                  onChange={handleChange}
                >
                  {dropDown &&
                    dropDown.map((row) => (
                      <option key={row.id} value={row.id}>
                        {row.name}
                      </option>
                    ))}
                </select>
                {validationModel.valCategory}
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  rows="2"
                  className="form-control"
                  name="description"
                  id="description"
                  value={proModel.description}
                  onChange={handleChange}
                ></textarea>
                {validationModel.valDescription}
              </div>

              <div className="form-group">
                <div className="row">
                  <div className="col-6">
                    {' '}
                    <label htmlFor="price">Price</label>
                    <input
                      className="form-control "
                      type="text"
                      name="price"
                      id="price"
                      value={proModel.price}
                      onChange={handleChange}
                    />
                    {validationModel.valPrice}
                  </div>

                  <div className="col-6">
                    <label htmlFor="name">Units</label>
                    <input
                      className="form-control "
                      type="text"
                      name="units"
                      id="units"
                      value={proModel.units}
                      onChange={handleChange}
                    />
                    {validationModel.valUnits}
                  </div>
                </div>
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
