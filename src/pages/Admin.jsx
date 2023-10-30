import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { addProducts, deleteProducts, editProducts, } from "../store/productSlice";
import axios from "axios";


function Admin() {
  useEffect(() => {
    alert("Welcome Admin to the Create Product page!");
  }, []);

  const navigate = useNavigate();

  const [isIndonesian, setIsIndonesian] = useState(false);
  const toggleLanguage = () => {
    setIsIndonesian(!isIndonesian);
  };

  const [formData, setFormData] = useState({
    Productname: "",
    Productcategory: "Choose...",
    formFile: null,
    ProductPrice: "",
  });



  const list = useSelector((state) => state.list.product);
  const dispatch = useDispatch();

  const [formErrors, setFormErrors] = useState({
    Productname: false,
    Productcategory: false,
    formFile: false,
    ProductPrice: false,
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

  const generateRandomPrice = () => {
    const randomPrice = (Math.random() * (100 - 10) + 10).toFixed(2);
    setFormData({ ...formData, ProductPrice: randomPrice });
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      updateProduct();
    } else {
      const {
        Productname,
        ProductPrice,
        Productcategory,
        formFile,
      } = formData;

      

      const nameRegex = /^(?!.*[@#{}])(.{1,25})$/; 
      const categoryRegex = /^(one|two|three)$/;
      const priceRegex = /^\d+(\.\d{1,2})?$/;

      const newFormErrors = {
        Productname: !nameRegex.test(Productname),
        Productcategory: !categoryRegex.test(Productcategory),
        formFile: !formFile,
        ProductPrice: !priceRegex.test(ProductPrice),
      };

      setFormErrors(newFormErrors);
      if (
        !newFormErrors.Productname &&
        !newFormErrors.Productcategory &&
        !newFormErrors.formFile &&
        !newFormErrors.ProductPrice
      ) try {
        const response = await axios.post( 
          "https://652ad1c94791d884f1fd6442.mockapi.io/product", 
          formData 
        ); 
        const newProduct = response.data; 
        dispatch(addProducts(newProduct)); 
        alert("Produk berhasil disimpan!"); 

        

        setFormData({ 
          Productname: "", 
          Productcategory: "Choose...", 
          formFile: null, 
          ProductPrice: "", 
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
            Productname,
            Productcategory,
            formFile: formFile.name,
            ProductPrice,
            imageSrc,
          };

         
          dispatch(addProducts([...list, newProduct]));

          setFormData({
            Productname: "",
            Productcategory: "Choose...",
            formFile: null,
            ProductPrice: "",
          });
        };

        reader.readAsDataURL(formFile);
      }
    }
  };

  const [isEditing, setIsEditing] = useState(false); 
  const [editingProduct, setEditingProduct] = useState(null); 

  const handleEditClick = (id) => { 
    const productToEdit = list.find((product) => product.id === id); 
    if (productToEdit) { 
      setEditingProduct(productToEdit); 
      setIsEditing(true); 
      setFormData({ 
        Productname: productToEdit.Productname, 
        Productcategory: productToEdit.Productcategory, 
        formFile: null,  
        ProductPrice: productToEdit.ProductPrice, 
      }); 
    } 
  }; 
 
  const updateProduct = async () => { 
    if (editingProduct) { 
      try { 
        const response = await axios.put( 
          `https://652ad1c94791d884f1fd6442.mockapi.io/product/${editingProduct.id}`, 
          formData  
        ); 
        const updatedProduct = response.data; 
        dispatch(editProducts(updatedProduct)); 
        alert("Produk berhasil diupdate!"); 
 
        setEditingProduct(null); 
        setIsEditing(false); 
        setFormData({ 
          Productname: "", 
          Productcategory: "Choose...", 
          formFile: null, 
          ProductPrice: "", 
        }); 
      } catch (error) { 
        console.error("Error updating product:", error); 
        alert("Terjadi masalah saat mengupdate produk."); 
      } 
    } 
  };

  const handleDeleteClick = async (id) => { 
    try { 
      await axios.delete(`https://652ad1c94791d884f1fd6442.mockapi.io/product/${id}`); 
      dispatch(deleteProducts(id)); 
      alert("Produk berhasil dihapus!"); 
    } catch (error) { 
      console.error("Error deleting product:", error); 
      alert("Terjadi masalah saat menghapus produk."); 
    } 
  };
  

  useEffect(() => { 
    const fetchData = async () => { 
      try { 
        const response = await axios.get( 
          "https://652ad1c94791d884f1fd6442.mockapi.io/product" 
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
    <div className="container mx-auto p-5">
      <button
        type="button"
        className="rounded-full bg-blue-500 px-4 py-2 text-center font-bold text-white hover:bg-blue-700"
        onClick={() => navigate("/")}
      >
        Home
      </button>
      <div className="mt-8">
        <h3 className="text-2xl font-bold">
          {isIndonesian ? "Buat Produk" : "Create Product"}
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="mt-4">
            <label htmlFor="Productname">
              {isIndonesian ? "Nama Produk" : "Product Name"}:
            </label>
            <input
              type="text"
              id="c"
              name="Productname"
              minLength="6"
              maxLength="50"
              className={`mt-1 w-full rounded border p-2 ${
                formErrors.Productname ? "border-red-500" : ""
              }`}
              value={formData.Productname}
              onChange={handleInputChange}
            />
            {formErrors.Productname && (
              <p className="text-red-500">
                {isIndonesian
                  ? "Harap isi nama produk dan mengandung huruf besar dan huruf kecil"
                  : "Please fill in the product name and contain uppercase and lowercase letters"}
              </p>
            )}
          </div>
          <div className="mt-4">
            <label htmlFor="Productcategory">
              {isIndonesian ? "Kategori Produk" : "Product Category"}:
            </label>
            <br />
            <select
              id="Productcategory"
              name="Productcategory"
              className={`mt-1 w-full rounded border p-2 ${
                formErrors.Productcategory ? "border-red-500" : ""
              }`}
              value={formData.Productcategory}
              onChange={handleInputChange}
            >
              <option value="Choose...">
                {isIndonesian ? "Pilih..." : "Choose..."}
              </option>
              <option value="one">Lab Room</option>
              <option value="two">Practical Tools</option>
            </select>{" "}
            <br />
            {formErrors.Productcategory && (
              <p className="text-red-500">
                {isIndonesian
                  ? "Harap pilih kategori produk"
                  : "Please select product category"}
              </p>
            )}
          </div>
          <div className="mt-4">
            <label htmlFor="formFile">
              {isIndonesian ? "Gambar Produk" : "Image Of Product"}:
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
                  ? "Harap pilih gambar produk"
                  : "Please select product image"}
              </p>
            )}
          </div>
          <div className="mt-4">
            <label htmlFor="ProductPrice">
              {isIndonesian ? "Harga Produk" : "Available"}:
            </label>
            <br />
            <input
              type="number"
              name="ProductPrice"
              id="ProductPrice"
              className={`mt-1 w-full rounded border p-2 ${
                formErrors.ProductPrice ? "border-red-500" : ""
              }`}
              value={formData.ProductPrice}
              onChange={handleInputChange}
            />
            {formErrors.ProductPrice && (
              <p className="text-red-500">
                {isIndonesian
                  ? "Harap isi harga produk"
                  : "Please enter product price"}
              </p>
            )}
            <br />
          </div>
          <div
            className={`space-x-3 ${
              formErrors.ProductPrice === false ? "mt-5" : "-mt-1"
            }`}
          >
            <button
              type="submit"
              className="rounded-full bg-blue-500 px-4 py-2 text-center font-bold text-white hover:bg-blue-700"
            >
              {isIndonesian ? "Kirim" : "Submit"}
            </button>
          </div>
        </form>
      </div>

      <div className="mt-8">
        <h3 className="text-2xl font-bold">
          {isIndonesian ? "Daftar Produk" : "List of Products"}
        </h3>
        <table className="mt-4 w-full">
          <thead>
            <tr>
              <th className="border p-2">{isIndonesian ? "No" : "No"}</th>
              <th className="border p-2">
                {isIndonesian ? "Nama Produk" : "Product Name"}
              </th>
              <th className="border p-2">
                {isIndonesian ? "Kategori Produk" : "Product Category"}
              </th>
              <th className="border p-2">
                {isIndonesian ? "Gambar Produk" : "Image Of Product"}
              </th>
              <th className="border p-2">
                {isIndonesian ? "Harga Produk" : "Available"}
              </th>
              <th className="border p-2">
                {isIndonesian ? "Tindakan" : "Actions"}
              </th>
            </tr>
          </thead>
          <tbody className="text-center">
        
            {Array.isArray(list) && list.map((product, index) => (
              <tr key={product.id}>
                <td className="border p-2">{index + 1}</td>
                <td className="border p-2">{product.Productname}</td>
                <td className="border p-2">{product.Productcategory}</td>
                <td className="border p-2">
                  {product.imageSrc && (
                    <img
                      src={product.imageSrc}
                      alt="Product"
                      style={{ maxWidth: "100px", height: "auto" }}
                      className="m-auto"
                    />
                  )}
                </td>
                <td className="border p-2">{product.ProductPrice}</td>
                <td className="space-x-2 border p-2">
                  <button
                    onClick={() => {
                      navigate(`/product/${product.id}`, {
                        state: { selectedProduct: product },
                      });
                    }}
                    className="m-auto rounded-full bg-blue-500 px-4 py-2 text-center font-bold text-white hover:bg-blue-700"
                  >
                    {isIndonesian ? "Detail" : "Detail"}
                  </button>

                  <button 
                onClick={() => handleEditClick(product.id)} // Panggil fungsi handleEditClick saat tombol "Edit" diklik 
                className="m-auto rounded-full bg-green-500 px-4 py-2 text-center font-bold text-white hover:bg-green-700" 
              > 
                {isIndonesian ? "Ubah" : "Edit"} 
              </button>

                  <button
                    onClick={() => handleDeleteClick  (product.id)}
                    className="m-auto rounded-full bg-red-500 px-4 py-2 text-center font-bold text-white hover:bg-red-700"
                  >
                    {isIndonesian ? "Hapus" : "Delete"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Admin;