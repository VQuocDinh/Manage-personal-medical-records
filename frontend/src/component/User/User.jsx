import React, { useContext } from 'react'
import { MdEdit } from "react-icons/md";
import { FaTrashCan } from "react-icons/fa6";
import './User.scss'
import { StoreContext } from '../../context/StoreContext'
const User = () => {
  const { user_list } = useContext(StoreContext)
  return (
    <div className='user p-3 d-flex justify-content-center flex-column'>
      <h1 className='tittle mt-5'>Users</h1>
      <ul class="nav nav-tabs mt-3">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">All</a>
        </li>
        <li class="nav-item">
          <a class="nav-link " href="#">Records Managers</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Records Users</a>
        </li>
      </ul>
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Email</th>
            <th scope="col">Role</th>
            <th scope="col">Date</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {user_list.map((item, index) => {
            return (
              <tr>
                <th scope="row">{item.userId}</th>
                <td>{item.email}</td>
                <td>{item.role}</td>
                <td>{item.createdAt}</td>
                <td>
                  <div className="hstack gap-2 fs-6">
                    <button className='btn btn-sm btn-primary'><MdEdit /></button>
                    <button className='btn btn-sm btn-danger'><FaTrashCan /></button>
                  </div>
                </td>
              </tr>
            )

          })}
        </tbody>
      </table>
    </div>
  )
}

export default User
