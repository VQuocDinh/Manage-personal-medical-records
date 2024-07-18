import React from "react";
import { Outlet } from "react-router-dom";

const Setting = () => {
  return (
    <div className="p-4">
      <h1 className="fw-900 mt-5">Setting</h1>
      <div className="d-flex h-100">
        <ul class="list-group list-group-flush  m-5">
          <li class="list-group-item">Thông tin cá nhân</li>
          <li class="list-group-item">Tùy chọn bảo mật</li>
          <li class="list-group-item">Cài đặt ứng dụng</li>
          <li class="list-group-item">Quyền riêng tư</li>
          <li class="list-group-item">Trợ giúp và hỗ trợ</li>
          <li class="list-group-item">Về ứng dụng</li>
        </ul>
        <Outlet/>
      </div>
    </div>
  );
};

export default Setting;
