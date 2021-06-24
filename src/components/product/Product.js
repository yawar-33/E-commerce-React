import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import GET from '../../utilities/getApiCall'

export default function Product(params) {
  const token = useSelector((state) =>
    state.login ? state.login.token.token : null,
  )

  const [data, setData] = useState([])
  const getAllProducts = () => {
    GET('product/findAll', token)
      .then((res) => {
        setData(res.data.productCollection)
      })
      .catch((error) => {
        console.log(error)
      })
  }
  useEffect(() => {
    getAllProducts()
  }, [])
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-10">
                {' '}
                <h4>List of All Products</h4>
              </div>
              <div className="col-md-2">
                <button type="button" className="btn btn-primary">
                  Add New
                </button>
              </div>
            </div>

            <div className="table-responsive">
              <table className="table table-striped">
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
                            <i className="fa fa-edit "></i>
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
    </>
  )
}
