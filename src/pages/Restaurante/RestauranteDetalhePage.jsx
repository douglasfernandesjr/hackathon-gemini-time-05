import { Container, Typography, CircularProgress } from "@material-ui/core";
import { getDetalhes } from "../../services/detalhes.service";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import StarIcon from '@material-ui/icons/Star';
import SearchIcon from '@material-ui/icons/Search';
import "./styles.css";

function RestauranteDetalhePage() {
    const [imgRestaurante, setImgRestaurante] = useState([]);
    const [nomeRestaurante, setNomeRestaurante] = useState([]);
    const [distanciaRestaurante, setDistanciaRestaurante] = useState([]);
    const [notaRestaurante, setNotaRestaurante] = useState([]);
    const [tempoMedio, setTempoMedio] = useState([]);
    const [valorEntrega, setValorEntrega] = useState([]);
    const [descricao, setDescricao] = useState([]);
    const [endereco, setEndereco] = useState([]);
    const [cardapio, setCardapio] = useState([]);
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
          setValorEntrega(data.valor_entrega);
          setDescricao(data.descricao);
          setEndereco(data.endereco);
          setCardapio(data.cardapio);
          setLoading(false);
        })
      }, [id.id]);

    return (
        <Container class="detalhes">
            {loading && (
                <div className="loading">
                    <CircularProgress color="primary" />
                </div>
            )}
            <div className="detalhesContainer">
                <div className='imgCategory'>
                    <img src={imgRestaurante} alt={nomeRestaurante}></img>
                </div>
                <div className='textCategory'>
                    <Typography variant='subtitle1'>
                        {nomeRestaurante}
                    </Typography>
                    <Typography>
                        {distanciaRestaurante + ' Km'}
                    </Typography>
                    <Typography className='ratingCategory' color='primary'>
                        <StarIcon />
                        {notaRestaurante}
                    </Typography>
                    <Typography>
                        {tempoMedio}
                    </Typography>
                    <Typography>
                        {(valorEntrega > 0) ? 'R$ ' + valorEntrega : 'Frete grátis'}
                    </Typography>
                </div>
            </div>


            <div className="descricaoCategory">
                <Typography>
                    {descricao}
                </Typography>
                <Typography variant='subtitle1'>
                    {endereco}
                </Typography>
            </div>
            <div className="buscaCategory">
                <form>
                    <SearchIcon fontSize="large"/>
                    <input type="text" placeholder="Buscar no cardápio" />
                </form>
            </div>


            <div className="cardapioCategory">
                {cardapio.map(item => (
                    <div key={item.categoria} className="categoriaContainer">
                            <Typography variant='subtitle1'>
                                {item.categoria}
                            </Typography>
                            {item.itens.map(comida => (
                            <div key={comida.nome} className="foodContainer">
                                <div className="imgCategory">
                                    <img src={comida.imagem} alt={comida.imagem}></img>
                                </div>
                                <div className="textCategory">
                                    <Typography variant='subtitle1'>
                                        {comida.nome.slice(0, 21)}
                                    </Typography>
                                    <Typography class="descricaoComida">
                                        {comida.descricao.slice(0, 100)}
                                    </Typography>
                                    <div className="priceCategory">
                                        <Typography variant='subtitle1'>
                                            R$ {comida.valor}
                                        </Typography>
                                    </div>
                                </div>
                            </div>
                        ))}
                        
                    </div>
                ))}
            </div>
        </Container>
    )

}

export default RestauranteDetalhePage;