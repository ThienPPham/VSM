import SellectAddress from "components/SellectAddress";
import NavBarProfile from "components/NavBarProfile";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  apiGetPublicDistrict,
  apiGetPublicProvinces,
  apiGetPublicWard,
} from "services/app";
// import {
//   apiGetPublicDistrict,
//   apiGetPublicProvinces,
//   apiGetPublicWard,
// } from "services/app";

const Profile = () => {
  const [specificAddress, setSpecificAddress] = useState("");
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [ward, setWard] = useState("");
  const [reset, setReset] = useState(false);
  const [address, setAddress] = useState("");

  // Call Api provinces
  const handleSpecificAddressChange = (event) => {
    setSpecificAddress(event.target.value);
  };

  const updateAddressValue = () => {
    const newAddress = `${specificAddress} ${
      ward ? `${wards?.find((item) => item.ward_id === ward)?.ward_name},` : ""
    } ${
      district
        ? `${
            districts?.find((item) => item.district_id === district)
              ?.district_name
          },`
        : ""
    } ${
      province
        ? provinces?.find((item) => item.province_id === province)
            ?.province_name
        : ""
    }`;
    setAddress(newAddress);
  };

  useEffect(() => {
    updateAddressValue();
  }, [specificAddress, ward, district, province]);

  useEffect(() => {
    const fetchPublicProvince = async () => {
      const response = await apiGetPublicProvinces();
      if (response.status === 200) {
        setProvinces(response?.data.results);
      }
    };
    fetchPublicProvince();
  }, []);
  useEffect(() => {
    setDistrict(null);
    const fetchPublicDistrict = async () => {
      const response = await apiGetPublicDistrict(province);
      if (response.status === 200) {
        setDistricts(response.data?.results);
      }
    };
    province && fetchPublicDistrict();
    !province ? setReset(true) : setReset(false);
    !province && setDistricts([]);
  }, [province]);
  useEffect(() => {
    setWard(null);
    const fetchPublicWard = async () => {
      const response = await apiGetPublicWard(district);
      if (response.status === 200) {
        setWards(response.data?.results);
      }
    };
    district && fetchPublicWard();
    !district ? setReset(true) : setReset(false);
    !district && setWards([]);
  }, [district]);

  // End api

  return (
    <div className="no-bottom no-top zebra" id="content">
      <div id="top" />
      <section id="subheader" className="jarallax text-light">
        <img src="images/background/14.jpg" className="jarallax-img" alt="" />
        <div className="center-y relative text-center">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1>My Profile</h1>
              </div>
              <div className="clearfix" />
            </div>
          </div>
        </div>
      </section>
      {/* section close */}
      <section id="section-settings" className="bg-gray-100">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 mb30">
              <NavBarProfile />
            </div>
            <div className="col-lg-9">
              <div className="card padding40  rounded-5">
                <div className="row">
                  <div className="col-lg-12">
                    <form
                      id="form-create-item"
                      className="form-border"
                      method="post"
                      action="https://www.madebydesignesia.com/themes/rentaly/email.php"
                    >
                      <div className="de_tab tab_simple">
                        <ul className="de_nav">
                          <li className="active">
                            <span>Profile</span>
                          </li>
                        </ul>
                        <div className="de_tab_content">
                          <div className="tab-1">
                            <div className="row">
                              <div className="col-lg-6 mb20">
                                <h5>Full Name</h5>
                                <input
                                  type="text"
                                  name="fullname"
                                  id="fullname"
                                  className="form-control"
                                  placeholder="Enter Full Name"
                                />
                              </div>
                              <div className="col-lg-6 mb20">
                                <h5>Email Address</h5>
                                <input
                                  type="text"
                                  name="email_address"
                                  id="email_address"
                                  className="form-control"
                                  placeholder="Enter email"
                                />
                              </div>
                              <div className="col-lg-6 mb20">
                                <h5>Gender</h5>
                                {/* <select id="cars">
                                  <option value="volvo" className="form-control">Volvo</option>
                                  <option value="saab">Saab</option>
                                  <option value="opel">Opel</option>
                                  <option value="audi">Audi</option>
                                </select> */}
                                <div
                                  id="select_lang"
                                  class="dropdown fullwidth"
                                >
                                  <a href="" class="btn-selector">
                                  Female
                                  </a>
                                  <ul>
                                    <li class="active">
                                      <span>Female</span>
                                    </li>
                                    <li>
                                      <span>Male</span>
                                    </li>
                                    <li>
                                      <span>Other</span>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                              <div className="col-lg-6 mb20">
                                <h5>Day Of Birth</h5>
                                <input
                                  type="date"
                                  className="form-control"
                                  placeholder="Enter email"
                                />
                              </div>
                              <div className="col-lg-6 mb20">
                                <h5>Phone Number</h5>
                                <input
                                  type="number"
                                  className="form-control"
                                />
                              </div>
                              <div className="col-lg-6 mb20">
                                <h5>The number booking ticket</h5>
                                <input
                                  type="text"
                                  className="form-control"
                                />
                              </div>
                              {/*  */}
                              <div className="col-md-12 mb20">
                                <h5 className="font-weight-semi-bold mb-4">
                                  Address
                                </h5>

                                <div className="row">
                                  <div className="col-md-4 form-group ">
                                    <SellectAddress
                                      type="province"
                                      value={province}
                                      setValue={setProvince}
                                      options={provinces}
                                      label="Province/City(Tỉnh)"
                                    />
                                  </div>
                                  <div className="col-md-4 form-group">
                                    <SellectAddress
                                      reset={reset}
                                      type="district"
                                      value={district}
                                      setValue={setDistrict}
                                      options={districts}
                                      label="District(Quận)"
                                    />
                                  </div>
                                  <div className="col-md-4 form-group">
                                    <SellectAddress
                                      reset={reset}
                                      type="ward"
                                      value={ward}
                                      setValue={setWard}
                                      options={wards}
                                      label="Wards(phường)"
                                    />
                                  </div>
                                  <div className="col-md-12 form-group">
                                    <label style={{ marginRight: "20px" }}>
                                      Address :{" "}
                                    </label>
                                    <input
                                      type="text"
                                      value={specificAddress}
                                      onChange={handleSpecificAddressChange}
                                      placeholder="Nhập địa chỉ cụ thể"
                                    />
                                    <input
                                      type="text"
                                      readOnly
                                      className="form-control"
                                      value={address}
                                    />
                                  </div>
                                </div>
                              </div>
                              {/*  */}
                            </div>
                          </div>
                        </div>
                      </div>
                      <input
                        type="button"
                        id="submit"
                        className="btn-main"
                        defaultValue="Update profile"
                      />
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Profile;
