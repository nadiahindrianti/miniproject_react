import React from 'react'
import { Navbar, Footer } from '../components'
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { addProducts, deleteProducts, editProducts, } from "../store/productSlice";
import axios from "axios";

function Pengajuan() {
  const navigate = useNavigate();

  const [isIndonesian, setIsIndonesian] = useState(false);
  const toggleLanguage = () => {
    setIsIndonesian(!isIndonesian);
  };

  const [formData, setFormData] = useState({
    Name: "",
    NIM: "",
    JamAkses: "Choose...",
    formFile: null,
    ReasonAkses: '',
  });



  const list = useSelector((state) => state.list.product);
  const dispatch = useDispatch();

  const [formErrors, setFormErrors] = useState({
    Name: false,
    NIM: false,
    JamAkses: false,
    formFile: false,
    ReasonAkses: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      formFile: file,
    });
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      updateProduct();
    } else {
      const {
        Name,
        NIM,
        JamAkses,
        ReasonAkses,
        formFile,
      } = formData;

      

      const nameRegex = /^(?!.*[@#{}])(.{1,25})$/;
      const nimRegex = /^\d+(\.\d{1,2})?$/; 
      const jamaksesRegex = /^(one|two|three)$/;

      const newFormErrors = {
        Name: !nameRegex.test(Name),
        NIM: !nimRegex.test(NIM),
        JamAkses: !jamaksesRegex.test(JamAkses),
        formFile: !formFile,
        ReasonAkses: ReasonAkses === "",
      };

      setFormErrors(newFormErrors);
      if (
        !newFormErrors.Name &&
        !newFormErrors.NIM &&
        !newFormErrors.JamAkses &&
        !newFormErrors.formFile &&
        !newFormErrors.ReasonAkses 
      ) try {
        const response = await axios.post( 
          "https://652ad1c94791d884f1fd6442.mockapi.io/products", 
          formData 
        ); 
        const newProduct = response.data; 
        dispatch(addProducts(newProduct)); 
        alert("Produk berhasil disimpan!"); 

        

        setFormData({ 
          Name: "", 
          NIM: "",
          JamAkses: "Choose...", 
          formFile: null, 
          ReasonAkses: "",
        }); 
      }
      

      catch (error) { 
        console.error("Error saving product:", error); 
        // Menampilkan pesan error jika terjadi masalah 
        alert("Terjadi masalah saat menyimpan produk."); 
        
   
        const reader = new FileReader();
        reader.onload = (event) => {
          const imageSrc = event.target.result;
          const newProduct = {
            id: Date.now(), // Generate a unique ID
            Name,
            NIM,
            JamAkses,
            formFile: formFile.name,
            ReasonAkses,
            imageSrc,
          };

         
          dispatch(addProducts([...list, newProduct]));

          setFormData({
            Name: "",
            NIM: "",
            JamAkses: "Choose...",
            formFile: null,
            ReasonAkses: "",
          });
        };

        reader.readAsDataURL(formFile);
      }
    }
  };

  useEffect(() => { 
    const fetchData = async () => { 
      try { 
        const response = await axios.get( 
          "https://652ad1c94791d884f1fd6442.mockapi.io/products" 
        ); 
        const data = response.data; 
        dispatch(addProducts(data)); 
      } catch (error) { 
        console.error("Error fetching product data:", error); 
      } 
    }; 
 
    fetchData(); 
  }, [dispatch])

    return (
      <div className='bg-[#FAFAFF]'>
        <Navbar/>
        <div className="flex border-l-indigo-500">
        <div className="container mx-auto p-5">
      <div className="mt-8">
        <h3 className="text-2xl font-bold">
          {isIndonesian ? "Pengajuan" : "Pengajuan"}
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="mt-4">
            <label htmlFor="Name">
              {isIndonesian ? "Nama Lengkap" : "Name Lengkap"}:
            </label>
            <input
              type="text"
              id="c"
              name="Name"
              minLength="6"
              maxLength="50"
              className={`mt-1 w-full rounded border p-2 ${
                formErrors.Name ? "border-red-500" : ""
              }`}
              value={formData.Name}
              onChange={handleInputChange}
            />
            {formErrors.Name && (
              <p className="text-red-500">
                {isIndonesian
                  ? "Harap isi nama produk dan mengandung huruf besar dan huruf kecil"
                  : "Please fill in the product name and contain uppercase and lowercase letters"}
              </p>
            )}
          </div>
          <div className="mt-4">
            <label htmlFor="NIM">
              {isIndonesian ? "NIM" : "NIM"}:
            </label>
            <input
              type="text"
              id="c"
              name="NIM"
              minLength="6"
              maxLength="50"
              className={`mt-1 w-full rounded border p-2 ${
                formErrors.NIM ? "border-red-500" : ""
              }`}
              value={formData.NIM}
              onChange={handleInputChange}
            />
            {formErrors.NIM && (
              <p className="text-red-500">
                {isIndonesian
                  ? "Harap isi NIM dengan benar"
                  : "Please fill in NIM"}
              </p>
            )}
          </div>
          <div className="mt-4">
            <label htmlFor="JamAkses">
              {isIndonesian ? "Jam Akses" : "Jam Akses"}:
            </label>
            <br />
            <select
              id="JamAkses"
              name="JamAkses"
              className={`mt-1 w-full rounded border p-2 ${
                formErrors.JamAkses ? "border-red-500" : ""
              }`}
              value={formData.JamAkses}
              onChange={handleInputChange}
            >
              <option value="Choose...">
                {isIndonesian ? "Pilih..." : "Choose..."}
              </option>
              <option value="one">09.00 - 11.00</option>
              <option value="two">11.00 - 13.00</option>
              <option value="three">13.00 - 15.00</option>
            </select>{" "}
            <br />
            {formErrors.JamAkses && (
              <p className="text-red-500">
                {isIndonesian
                  ? "Harap pilih jam akses"
                  : "Please select jam akses"}
              </p>
            )}
          </div>
          <div className="mt-4">
            <label htmlFor="formFile">
              {isIndonesian ? "Upload Kartu NIM" : "Upload Kartu NIM"}:
            </label>
            <input
              type="file"
              id="formFile"
              name="formFile"
              className={`mt-1 w-full rounded border p-2 ${
                formErrors.formFile ? "border-red-500" : ""
              }`}
              accept="image/*"
              onChange={handleFileChange}
            />
            {formErrors.formFile && (
              <p className="text-red-500">
                {isIndonesian
                  ? "Harap pilih upload foto/scan kartu NIM"
                  : "Please select upload foto/scan kartu NIM"}
              </p>
            )}
          </div>
          <div className="mt-4">
            <label htmlFor="ReasonAkses">
              {isIndonesian ? "Alasan pengajuan akses" : "Reason Pengajuan Akses "}:
            </label>
            <textarea
              id="ReasonAkses"
              name="ReasonAkses"
              rows="3"
              className={`mt-1 w-full rounded border p-2 ${
                formErrors.ReasonAkses ? "border-red-500" : ""
              }`}
              value={formData.ReasonAkses}
              onChange={handleInputChange}
            ></textarea>
            {formErrors.ReasonAkses && (
              <p className="text-red-500">
                {isIndonesian
                  ? "Harap isi alasan pengajuan akses"
                  : "Please enter reason akses"}
              </p>
            )}
          </div>
          <div
            className={`space-x-3 ${
              formErrors.ReasonAkses === false ? "mt-5" : "-mt-1"
            }`}
          >
            <button
              type="submit"
              className="rounded-full bg-blue-500 px-4 py-2 text-center font-bold text-white hover:bg-blue-700"
              onClick={handleSubmit}
            >
              {isIndonesian ? "Kirim" : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
          </div>
        <Footer/>
      </div>
    )
  }
  
  export default Pengajuan