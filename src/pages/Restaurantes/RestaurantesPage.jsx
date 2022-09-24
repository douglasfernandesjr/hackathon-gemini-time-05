import { Container, Typography, CircularProgress } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getRestaurantes } from "../../services/restaurantes.service";
import "./style.css";

function RestaurantesPage() {
  const [nomeCategoria, setNomeCategoria] = useState([]);
  const [restaurantesBaratinho, setRestaurantesBaratinho] = useState();
  const [restaurantesNoPreco, setRestaurantesNoPreco] = useState([]);
  const [restaurantesCaro, setRestaurantesCaro] = useState([]);
  const [loading, setLoading] = useState(true);
  const { state } = useLocation();

  useEffect(() => {
    console.log(state)
    getRestaurantes(state.ID).then((response) => {
      console.log(response);
      setNomeCategoria(state.name)
      setRestaurantesBaratinho(response.baratinho);
      setRestaurantesNoPreco(response.no_preco);
      setRestaurantesCaro(response.caro);
      setLoading(false);
    })

  }, [state]);

  return (
    <Container className="restaurantes">
      <Typography variant="h5" align="center" color="primary" className="title">
        RESTAURANTES: {nomeCategoria}
      </Typography>
      {loading && (
        <div className="loading">
          <CircularProgress color="primary" />
        </div>
      )}
      <div className="sub-header">
        <Typography variant="body1" color="primary">
          Baratinho <span>(</span>$ <span>$ $ $ $)</span>
        </Typography>
      </div>

      {restaurantesBaratinho?.map(restaurante => (
        <div >
          <div className="restaurantesContainer" key={restaurante.id}>
            <img src={restaurante.imagem} alt={restaurante.nome} />
            <div className="descricaoContainer">
              <h3 className="titulo">{restaurante.nome}</h3>
              <div className="tempo">{restaurante.distancia}
                {restaurante.nota}
                {restaurante.tempo_medio}
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className="sub-header">
        <Typography variant="body1" color="primary">
          No Preço <span>(</span>$ $ $ <span> $ $)</span>
        </Typography>
      </div>

      {restaurantesNoPreco?.map(restaurante => (
        <div className="restaurantesContainer" key={restaurante.id}>
          <img src={restaurante.imagem} alt={restaurante.nome} />
          <div className="descricaoContainer">
            <h3 className="titulo">{restaurante.nome}</h3>
            {restaurante.distancia}
            {restaurante.nota}
            {restaurante.tempo_medio}
          </div>
        </div>
      ))}

      <div className="sub-header">
        <Typography variant="body1" color="primary">
          Caro mas vale a pena <span>(</span>$ $ $ $ $<span>)</span>
        </Typography>
      </div>

      {restaurantesCaro?.map(restaurante => (
        <div className="restaurantesContainer" key={restaurante.id}>
          <img src={restaurante.imagem} alt={restaurante.nome} />
          <div className="descricaoContainer">
            <h3 className="titulo">{restaurante.nome}</h3>
            {restaurante.distancia}
            {restaurante.nota}
            {restaurante.tempo_medio}
          </div>
        </div>
      ))}


    </Container>
  )
}

export default RestaurantesPage;