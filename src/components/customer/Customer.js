import { useState, useEffect } from 'react'
import GET from '../../utilities/getApiCall'
import { useSelector } from 'react-redux'
export default function Customer(props) {
  const token = useSelector((state) =>
    state.login ? state.login.token.token : null,
  )
  const [data, setdata] = useState([])

  useEffect(() => {
    getAllCustomers()
  }, [])

  const getAllCustomers = () => {
    GET('customer/findAll', token)
      .then((res) => {
        setdata(res.data.customerCollection)
      })
      .catch((error) => {
        console.log(error)
      })
  }
  let columns = [
    { header: 'Name' },
    { header: 'Email' },
    { header: 'Address' },
    { header: 'City' },
    { header: 'Postal Code' },
    { header: 'Country' },
    { header: 'Edit' },
    { header: 'Delete' },
  ]
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-10">
                {' '}
                <h4>List of All Customers</h4>
              </div>
              <div className="col-md-2">
                <button
                  type="button"
                  className="btn btn-primary"
                  //   onClick={() => openPopup(0)}
                >
                  Add New
                </button>
              </div>
            </div>

            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Address</th>
                  <th>City</th>
                  <th>Postal Code</th>
                  <th>Country</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </thead>
                <tbody>
                  {data &&
                    data.map((row) => {
                      return (
                        <tr>
                          <td >{row.firstName + ' ' + row.lastName}</td>
                          <td>{row.email}</td>
                          <td>{row.address}</td>
                          <td>{row.city}</td>
                          <td>{row.postalCode}</td>
                          <td>{row.country}</td>
                          <td>
                            <i
                              className="fa fa-edit "
                              //   onClick={() => openPopup(row.id)}
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
    </>
  )
}
