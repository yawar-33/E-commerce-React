export default function Product(params) {
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
                  <tr>
                    <td>Name Test</td>
                    <td>Description Test</td>
                    <td>
                      <i className="fa fa-edit "></i>
                    </td>
                    <td>
                      <i className="fa fa-trash"></i>
                    </td>
                  </tr>
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
