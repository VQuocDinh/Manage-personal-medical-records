import React from 'react'
import { assets } from '../../assets/assets'
import 'bootstrap/dist/css/bootstrap.min.css';
import './Service.scss'
const Service = () => {
  return (
    <div className='service'>
      <div class="row">
        <div class="col-sm-6 mb-3 mb-sm-0">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Diagnostic</h5>
              <p class="card-text">With modern equipment, we will provide the most accurate diagnosis of your condition</p>
              <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
          </div>
        </div>
        <div class="col-sm-6">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Special title treatment</h5>
              <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
              <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Service
