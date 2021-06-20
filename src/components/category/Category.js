import { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import GET from '../../utilities/getApiCall'
import { useSelector } from 'react-redux'
import NewCategory from './NewCategory'

function Category(props) {
  const token = useSelector((state) =>
    state.login ? state.login.token.token : null,
  )

  const [data, setData] = useState([])
  const [showPopup, setshowPopup] = useState(false)
  const [id, setid] = useState(0)
  const getAllCategories = () => {
    GET('catagory/findAll', token)
      .then((res) => {
        setData(res.data.categCollection)
      })
      .catch((error) => {
        console.log(error)
      })
  }
  useEffect(() => {
    getAllCategories()
  }, [])

  const openPopup = (id) => {
    setshowPopup(true)
    setid(id)
  }

  const handleClose = () => {
    setshowPopup(false)
    setid(0)
  }
  let popup = ''
  if (showPopup) {
    popup = <NewCategory id={id} onClose={handleClose} />
  }
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-10">
                {' '}
                <h4>List of All Categories</h4>
              </div>
              <div className="col-md-2">
                <button
                  type="button"
                  class="btn btn-primary"
                  onClick={() => openPopup(0)}
                >
                  Add New
                </button>
              </div>
            </div>

            <div className="table-responsive">
              <table class="table table-striped">
                <thead>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </thead>
                <tbody>
                  {data &&
                    data.map((row) => {
                      return (
                        <tr>
                          <td>{row.name}</td>
                          <td>{row.description}</td>
                          <td>
                            <i
                              className="fa fa-edit "
                              onClick={() => openPopup(row.id)}
                            ></i>
                          </td>
                          <td>
                            <i className="fa fa-trash"></i>
                          </td>
                        </tr>
                      )
                    })}
                </tbody>
              </table>

              <div className="clearfix"></div>
            </div>
          </div>
        </div>
      </div>
      {popup}
    </>
  )
}

export default withRouter(Category)
