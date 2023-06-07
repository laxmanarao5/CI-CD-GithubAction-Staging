import "./AdminPage.css";

import React from 'react'
const AdminPage = () => {
  return (
    <div className='container'>
        <div className='m-3'>
                <input className='form-control' type='text' placeholder='Search by name, email or role'/>
        </div>

        <div className="table-hover">
            <table className='table mytable'>
                <thead>
                    <tr className='table_rows'>
                        <th><input type="checkbox"/></th>
                        <th >Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className='table_rows'>
                        <td><input type="checkbox"/></td>
                        <td>laxman</td>
                        <td>lakshmana5296@gmail.com</td>
                        <td>Admin</td>
                        <td>delete</td>
                    </tr>
                    <tr className='table_rows'>
                        <td><input type="checkbox"/></td>
                        <td>laxman</td>
                        <td>lakshmana5296@gmail.com</td>
                        <td>Admin</td>
                        <td>delete</td>
                    </tr>
                    <tr className='table_rows'>
                        <td><input type="checkbox"/></td>
                        <td>laxman</td>
                        <td>lakshmana5296@gmail.com</td>
                        <td>Admin</td>
                        <td>delete</td>
                    </tr>
                    <tr className='table_rows'>
                        <td><input type="checkbox"/></td>
                        <td>laxman</td>
                        <td>lakshmana5296@gmail.com</td>
                        <td>Admin</td>
                        <td>delete</td>
                    </tr>
                    <tr className='table_rows'>
                        <td><input type="checkbox"/></td>
                        <td>laxman</td>
                        <td>lakshmana5296@gmail.com</td>
                        <td>Admin</td>
                        <td>delete</td>
                    </tr>
                </tbody>
                
            </table>
        </div>
    </div>
  )
}

export default AdminPage