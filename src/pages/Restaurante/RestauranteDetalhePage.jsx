import { Container, Typography, CircularProgress } from "@material-ui/core";
import { getDetalhes } from "../../services/detalhes.service";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import StarIcon from '@material-ui/icons/Star';

function RestauranteDetalhePage() {
    const [imgRestaurante, setImgRestaurante] = useState([]);
    const [nomeRestaurante, setNomeRestaurante] = useState([]);
    const [distanciaRestaurante, setDistanciaRestaurante] = useState([]);
    const [notaRestaurante, setNotaRestaurante] = useState([]);
    const [tempoMedio, setTempoMedio] = useState([]);
    const [loading, setLoading] = useState(true);

    const id = useParams();

    useEffect(() => {
        getDetalhes(id.id).then((response) => {
          const data = (response.data);
          console.log(data);
          setImgRestaurante(data.imagem);
          setNomeRestaurante(data.nome);
          setDistanciaRestaurante(data.distancia);
          setNotaRestaurante(data.nota);
          setTempoMedio(data.tempo_medio);
        })
      }, [id.id]);

    return (
        <Container class="detalhes">
            <div className="detalhesContainer">
                <div className='imgCategory'>
                    <img src={imgRestaurante} alt={nomeRestaurante}></img>
                </div>
                <div className='textCategory'>
                    <Typography>
                        {nomeRestaurante}
                    </Typography>
                    <Typography>
                        {distanciaRestaurante + ' Km'}
                    </Typography>
                    <Typography>
                        <StarIcon />
                        {notaRestaurante}
                    </Typography>
                    <Typography>
                        {tempoMedio}
                    </Typography>
                </div>
            </div>
        </Container>
    )

}

export default RestauranteDetalhePage;