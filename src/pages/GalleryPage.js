import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Gallery.css";

function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryName, setCategoryName] = useState(""); // Estado para o nome da categoria
  const [isAdmin, setIsAdmin] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [categories, setCategories] = useState([]);
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState(null); // Estado para controlar a imagem selecionada no modal


  useEffect(() => {
    const adminStatus = localStorage.getItem("isAdmin");
    setIsAdmin(adminStatus === "true");

    const loadPhotos = async () => {
      try {
        const response = await axios.get("https://carinho-suculento-2-0-back-and.onrender.com/photos");
        setPhotos(response.data);
        updateCategories(response.data);
      } catch (error) {
        console.error("Erro ao carregar fotos:", error);
        setMessage("Erro ao carregar fotos.");
      }
    };

    loadPhotos();
  }, []);

  const updateCategories = (photos) => {
    const uniqueCategories = [
      ...new Set(photos.map((photo) => photo.category || "Outros")),
    ];
    setCategories(uniqueCategories);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);

    if (file) {
      const fileType = file.type.split("/")[0];
      if (fileType !== "image") {
        alert("Por favor, envie um arquivo de imagem.");
        return;
      }

      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    const selectedCategory = newCategory || category;

    if (!file || !selectedCategory) {
      alert("Selecione uma imagem e defina a categoria.");
      return;
    }

    setLoading(true);
    setMessage("Enviando imagem...");

    const formData = new FormData();
    formData.append("image", file);
    formData.append("category", selectedCategory);

    try {
      const response = await axios.post("https://carinho-suculento-2-0-back-and.onrender.com/photos", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const updatedPhotos = [...photos, response.data];
      setPhotos(updatedPhotos);
      updateCategories(updatedPhotos);

      setFile(null);
      setCategory("");
      setNewCategory("");
      setPreview(null);
      setMessage("Imagem enviada com sucesso!");
    } catch (error) {
      setMessage("Erro ao enviar foto.");
      console.error("Erro ao enviar foto:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setLoading(true);
    setMessage("Deletando imagem...");

    try {
      await axios.delete(`https://carinho-suculento-2-0-back-and.onrender.com/photos/${id}`);
      const updatedPhotos = photos.filter((photo) => photo.id !== id);
      setPhotos(updatedPhotos);
      updateCategories(updatedPhotos);

      setMessage("Imagem deletada com sucesso!");
    } catch (error) {
      setMessage("Erro ao deletar foto.");
      console.error("Erro ao deletar foto:", error);
    } finally {
      setLoading(false);
    }
  };

  const groupPhotosByCategory = (photos) => {
    const grouped = {};
    photos.forEach((photo) => {
      const category = photo.category || "Outros";
      if (!grouped[category]) grouped[category] = [];
      grouped[category].push(photo);
    });
    return grouped;
  };

  const groupedPhotos = groupPhotosByCategory(photos);

  const openImageModal = (photo) => {
    setSelectedImage(photo);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  const handleNextImage = () => {
    const currentIndex = photos.findIndex((photo) => photo.id === selectedImage.id);
    const nextImage = photos[(currentIndex + 1) % photos.length];
    setSelectedImage(nextImage);
  };

  const handlePrevImage = () => {
    const currentIndex = photos.findIndex((photo) => photo.id === selectedImage.id);
    const prevImage = photos[(currentIndex - 1 + photos.length) % photos.length];
    setSelectedImage(prevImage);
  };

  return (
    <div style={{ color: "#173617", padding: "20px", textAlign: "center" }}>
      {isAdmin && (
        <>
          <h2 className="fonte">Modo Administrador</h2>
          <div style={{ marginBottom: "20px" }}>
            <input type="file" accept="image/*" onChange={handleFileChange} />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={{ marginLeft: "10px" }}
            >
              <option value="">Selecione uma categoria</option>
              {categories.map((cat, index) => (
                <option key={index} value={cat}>
                  {cat}
                </option>
              ))}
              <option value="new">Adicionar nova categoria...</option>
            </select>

            {category === "new" && (
              <input
                type="text"
                placeholder="Nova Categoria"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                style={{ marginLeft: "10px" }}
              />
            )}
            <button onClick={handleUpload} style={{ marginLeft: "10px" }} disabled={loading}>
              {loading ? "Carregando..." : "Adicionar Foto"}
            </button>
          </div>

          {preview && (
            <div style={{ marginBottom: "20px" }}>
              <h3>Pré-visualização:</h3>
              <img
                src={preview}
                alt="Pré-visualização"
                style={{ width: "300px", height: "auto", borderRadius: "10px" }}
              />
            </div>
          )}
        </>
      )}

      {loading && <div>Carregando...</div>}
      {message && <div>{message}</div>}

      {/* Barra rolável de categorias */}
      <div className="categories-menu">
        <h2>Escolha uma Categoria</h2>
        <div className="category-buttons">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setCategoryName(cat);  // Exibir o nome da categoria selecionada
              }}
              style={{ margin: "10px" }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Texto explicativo quando nenhuma categoria for selecionada */}
      {!selectedCategory && (
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <p>Selecione uma categoria para visualizar as imagens. <br /> Role para o lado para escolher uma categoria.</p>
        </div>
      )}

      {/* Exibir o nome da categoria selecionada */}
      {selectedCategory && (
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <h3> {categoryName}</h3>
        </div>
      )}

      {/* Exibir imagens filtradas pela categoria selecionada */}
      <div>

        <div className="gallery-grid">
          {selectedCategory ? (
            // Mostrar imagens filtradas pela categoria selecionada
            groupedPhotos[selectedCategory]?.map((photo) => (
              <div key={photo.id} style={{ marginBottom: "15px" }}>
                <img
                  src={photo.src}
                  alt={photo.category || "Foto"}
                  style={{ width: "100%", borderRadius: "10px", cursor: "pointer" }}
                  onClick={() => openImageModal(photo)}
                />
                {isAdmin && (
                  <div style={{ marginTop: "10px" }}>
                    <button onClick={() => handleDelete(photo.id)}>Deletar</button>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p></p>
          )}
        </div>
      </div>

      {/* Modal para exibir a imagem ampliada */}
      {selectedImage && (
        <div className="overlay" onClick={closeImageModal}>
          <div className="image-modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={closeImageModal}>&times;</span>
            <div className="image-container">
              <img
                src={selectedImage.src}
                alt={selectedImage.category || "Imagem"}
                className="image-fullscreen"
              />
            </div>
            <button onClick={handleNextImage} className="next-btn">&#10095;</button>
            <button onClick={handlePrevImage} className="prev-btn">&#10094;</button>
          </div>
        </div>
      )}
    </div>



  );
}

export default GalleryPage;
