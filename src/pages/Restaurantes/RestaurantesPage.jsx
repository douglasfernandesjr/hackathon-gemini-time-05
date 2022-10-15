import { Container, Typography, CircularProgress } from "@material-ui/core";
import StarIcon from '@material-ui/icons/Star';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getRestaurantes } from "../../services/restaurantes.service";
import "./styles.css";

function RestaurantesPage() {
  const navigate = useNavigate();
  const [nomeCategoria, setNomeCategoria] = useState([]);
  const [restaurantesBaratinho, setRestaurantesBaratinho] = useState([]);
  const [restaurantesNoPreco, setRestaurantesNoPreco] = useState([]);
  const [restaurantesCaro, setRestaurantesCaro] = useState([]);
  const [loading, setLoading] = useState(true);

  const id = useParams();
  
  useEffect(() => {
    getRestaurantes(id.id).then((response) => {
      const data = (response.data)
      setNomeCategoria(data.categoria);
      setRestaurantesBaratinho(data.baratinho);
      setRestaurantesNoPreco(data.no_preco);
      setRestaurantesCaro(data.caro);
      setLoading(false);
    })
  }, [id.id]);


  return (
    <Container class="restaurantes">
      <Typography variant="h5" align="center" color="primary" className="title">
        RESTAURANTES: {nomeCategoria}
      </Typography>
      {loading && (
        <div className="loading">
          <CircularProgress color="primary" />
        </div>
      )}

      {restaurantesBaratinho && (
      <div className="sub-header">
        <Typography variant='subtitle1' color="primary">
          Baratinho <span>(</span>$ <span>$ $ $ $)</span>
        </Typography>
      </div> 

      )}

      {restaurantesBaratinho?.map(restaurante => (
        <div className='restauranteContainer' key={restaurante.id}
        onClick={() => navigate(`/restaurante/${restaurante.id}`)}>
          <div className='imgCategory'>
            <img src={restaurante.imagem} alt={restaurante.nome}></img>
          </div>
          <div className='textCategory'>
            <Typography variant='subtitle1'>
              {restaurante.nome}
            </Typography>
            <Typography>
              {restaurante.distancia + ' Km'}
            </Typography>
            <Typography className='ratingCategory' color='primary'>
              <StarIcon />
              {restaurante.nota}
            </Typography>
            <Typography>
              {restaurante.tempo_medio} - {'Frete: R$ ' + restaurante.valor_entrega}
            </Typography>
          </div>
        </div>
      ))}

      {restaurantesNoPreco && (
      <div className="sub-header">
        <Typography variant="subtitle1" color="primary">
          No Preco <span>(</span>$ $ $ <span>$ $)</span>
        </Typography>
      </div>
      )}

      {restaurantesNoPreco?.map(restaurante => (
        <div className='restauranteContainer' key={restaurante.id}
        onClick={() => navigate(`/restaurante/${restaurante.id}`)}>
          <div className='imgCategory'>
            <img src={restaurante.imagem} alt={restaurante.nome}></img>
          </div>
          <div className='textCategory'>
            <Typography variant='subtitle1'>
              {restaurante.nome}
            </Typography>
            <Typography>
              {restaurante.distancia + ' Km'}
            </Typography>
            <Typography className='ratingCategory' color='primary'>
              <StarIcon />
              {restaurante.nota}
            </Typography>
            <Typography>
              {restaurante.tempo_medio} - {'Frete: R$ ' + restaurante.valor_entrega}
            </Typography>
          </div>
        </div>
      ))}

      {restaurantesCaro && (
      <div className="sub-header">
        <Typography variant="subtitle1" color="primary">
          Caro, mas vale a pena <span>(</span>$ $ $ $ $ <span>)</span>
        </Typography>
      </div>
      )}

      {restaurantesCaro?.map(restaurante => (
        <div className='restauranteContainer' key={restaurante.id}
        onClick={() => navigate(`/restaurante/${restaurante.id}`)}>
          <div className='imgCategory'>
            <img src={restaurante.imagem} alt={restaurante.nome}></img>
          </div>
          <div className='textCategory'>
            <Typography variant='subtitle1'>
              {restaurante.nome}
            </Typography>
            <Typography>
              {restaurante.distancia + ' Km'}
            </Typography>
            <Typography className='ratingCategory' color='primary'>
              <StarIcon />
              {restaurante.nota}
            </Typography>
            <Typography>
              {restaurante.tempo_medio} - {'Frete: R$ ' + restaurante.valor_entrega}
            </Typography>
          </div>
        </div>
      ))}
    </Container>
  )
}

export default RestaurantesPage;