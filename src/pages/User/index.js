import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { get } from 'lodash';

import * as actions from '../../store/modules/auth/actions';
import { Container } from '../../styles/GlobalStyles';
import * as styles from './styled';
import axios from '../../services/axios';
import downLoad from '../../assets/images/download.png';
import trash from '../../assets/images/trash.png';
import alertSignal from '../../assets/images/warning.png';

import Loading from '../../components/Loading';

export default function User() {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(actions.loginFailure());
    history.push('/');
  };

  const id = useSelector((state) => state.auth.user.id);
  const nomeStored = useSelector((state) => state.auth.user.nome);
  const emailStored = useSelector((state) => state.auth.user.email);

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [qrCodes, setQrCodes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  React.useEffect(() => {
    if (!id) return;

    setNome(nomeStored);
    setEmail(emailStored);

    async function getData() {
      setIsLoading(true);
      const response = await axios.get('/fotos');
      setQrCodes(response.data);
      setIsLoading(false);
    }

    getData();
  }, [emailStored, id, nomeStored]);

  async function handleDelete(fotoId) {
    try {
      setIsLoading(true);
      await axios.delete(`/fotos/${fotoId}`);
      toast.success('Imagem removida com sucesso');
      setIsLoading(false);
      const imageElement = document.getElementById(fotoId);
      imageElement.src = trash;
      window.location.reload();
    } catch (err) {
      setIsLoading(false);
      const data = get(err, 'response.data', {});
      const errors = get(data, 'errors', []);
      if (errors.length > 0) {
        errors.map((error) => toast.error(error));
      } else {
        toast.error('Erro desconhecido');
      }
    }
  }

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <styles.SectionUser>
        <styles.UserData>
          <styles.DataInfo>
            <styles.H1User>Dados</styles.H1User>
            <p>{nome}</p>
            <br />
            <p>{email}</p>
            <div>
              <Link to="/register" id="edt">
                Editar
              </Link>
              <br />
              <br />
              <Link to="/exclusion" id="exc">
                Excluir Conta
              </Link>
              <br />
              <br />
              <Link onClick={handleLogout} to="/logout">
                Sair
              </Link>
              <br />
              <br />
            </div>
          </styles.DataInfo>
        </styles.UserData>
        <styles.QrCodes>
          <styles.H1Qrs>QR Codes</styles.H1Qrs>
          <styles.QrGalery>
            {qrCodes.map((qrCode) => (
              <div
                key={qrCode.id}
                style={{
                  position: 'relative',
                  display: 'flex',
                  width: 180,
                  padding: 0,
                  textAlign: 'center',
                  margin: 'auto',
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  version="1.0"
                  width="150px"
                  height="150px"
                  viewBox="0 0 480.000000 480.000000"
                  preserveAspectRatio="xMidYMid meet"
                  id="qrDemoImg"
                  style={{ margin: '2rem' }}
                >
                  <g transform="translate(0.000000,480.000000) scale(0.100000,-0.100000)" fill="000000" stroke="none">
                    <path d="M0 4125 l0 -675 675 0 675 0 0 675 0 675 -675 0 -675 0 0 -675z m1140 5 l0 -470 -470 0 -470 0 0 470 0 470 470 0 470 0 0 -470z" />
                    <path d="M370 4125 l0 -295 300 0 300 0 0 295 0 295 -300 0 -300 0 0 -295z" />
                    <path d="M1530 4700 l0 -100 95 0 95 0 0 -95 0 -95 95 0 95 0 0 -95 0 -95 105 0 105 0 0 190 0 190 185 0 185 0 0 -90 0 -90 -95 0 -95 0 0 -190 0 -189 -97 -3 -98 -3 -3 -92 -3 -93 -84 0 -85 0 0 95 0 95 -105 0 -105 0 0 -105 0 -105 95 0 95 0 0 -280 0 -280 -87 0 -88 0 0 192 0 193 -102 3 -103 3 0 -201 0 -200 95 0 95 0 0 -195 0 -195 95 0 95 0 0 -85 0 -85 -185 0 -185 0 0 190 0 190 -95 0 -95 0 0 95 0 95 -105 0 -105 0 0 -95 0 -95 -85 0 -85 0 0 95 0 95 -200 0 -200 0 0 -95 0 -95 -90 0 -90 0 0 95 0 95 -195 0 -195 0 0 -105 0 -105 90 0 90 0 0 -180 0 -180 -90 0 -90 0 0 -205 0 -205 185 0 184 0 3 -92 3 -93 200 0 200 0 3 193 2 192 85 0 85 0 0 -195 0 -195 95 0 95 0 0 -85 0 -85 -95 0 -95 0 0 -95 0 -95 -85 0 -85 0 0 95 0 95 -105 0 -105 0 0 -95 0 -95 -90 0 -90 0 0 95 0 95 -105 0 -105 0 0 -200 0 -200 675 0 675 0 0 -95 0 -95 95 0 95 0 0 -185 0 -185 -95 0 -95 0 0 -200 0 -200 105 0 105 0 0 190 0 190 95 0 95 0 0 95 0 95 85 0 85 0 0 -180 0 -180 -95 0 -95 0 0 -290 0 -290 -87 0 -88 0 3 95 3 95 -105 0 -106 0 0 -195 0 -195 200 0 200 0 0 95 0 95 88 0 87 0 -3 -95 -3 -95 200 0 201 0 0 190 0 189 98 3 97 3 0 93 0 92 88 0 87 0 0 -95 0 -95 105 0 105 0 0 95 0 95 90 0 90 0 0 -185 0 -185 -100 0 -100 0 0 -100 0 -100 300 0 300 0 0 95 0 95 180 0 180 0 0 -95 0 -95 105 0 105 0 0 95 0 95 185 0 185 0 0 -95 0 -95 100 0 100 0 0 390 0 390 -195 0 -195 0 0 -100 0 -100 -90 0 -90 0 0 195 0 195 -95 0 -95 0 0 85 0 85 95 0 95 0 0 105 0 105 -95 0 -95 0 0 280 0 280 88 0 87 0 0 -187 0 -188 98 -3 97 -3 0 -94 0 -95 95 0 95 0 0 -90 0 -90 -95 0 -95 0 0 -105 0 -105 105 0 105 0 0 95 0 95 90 0 90 0 0 105 0 105 -90 0 -90 0 0 185 0 185 90 0 90 0 0 200 0 200 -90 0 -90 0 0 85 0 85 90 0 90 0 0 300 0 300 -90 0 -90 0 0 85 0 85 90 0 90 0 0 105 0 105 -100 0 -100 0 0 -95 0 -95 -470 0 -470 0 0 95 0 95 -105 0 -105 0 0 -95 0 -95 -90 0 -90 0 0 290 0 291 -102 -3 -103 -3 -3 -97 -3 -98 -84 0 -85 0 0 290 0 290 -97 0 -98 0 0 185 0 185 98 0 97 0 0 195 0 195 -105 0 -105 0 0 -95 0 -95 -90 0 -90 0 0 95 0 95 -201 0 -200 0 3 -95 3 -95 -182 0 -183 0 0 95 0 95 -105 0 -105 0 0 -100z m960 -765 l0 -85 -90 0 -90 0 0 85 0 85 90 0 90 0 0 -85z m-190 -290 l0 -185 -90 0 -90 0 0 185 0 185 90 0 90 0 0 -185z m380 -95 l0 -90 -90 0 -90 0 0 90 0 90 90 0 90 0 0 -90z m-190 -190 l0 -90 -90 0 -90 0 0 90 0 90 90 0 90 0 0 -90z m380 0 l0 -90 -87 0 -88 0 0 90 0 90 88 0 87 0 0 -90z m-190 -200 l0 -100 95 0 95 0 0 -180 0 -180 -95 0 -95 0 0 -105 0 -105 95 0 95 0 0 -575 0 -575 94 0 95 0 3 -90 3 -90 -97 0 -98 0 0 -190 0 -190 -185 0 -185 0 0 85 0 84 98 3 97 3 0 195 0 195 -102 3 -103 3 0 -191 0 -190 -90 0 -90 0 0 190 0 190 -287 0 -288 0 3 95 3 95 -100 0 -101 0 0 90 0 90 185 0 185 0 0 -95 0 -95 105 0 105 0 0 105 0 105 -95 0 -95 0 0 85 0 85 95 0 95 0 0 95 0 95 288 2 287 3 0 100 0 100 -97 3 -98 3 0 99 0 100 -100 0 -100 0 0 -100 0 -99 -97 -3 -98 -3 0 -93 0 -92 -97 0 -98 0 0 -95 0 -95 -185 0 -185 0 0 190 0 190 -95 0 -95 0 0 90 0 90 185 0 185 0 0 -100 0 -101 103 3 102 3 3 98 3 97 94 0 95 0 0 95 0 95 95 0 95 0 0 95 0 95 95 0 95 0 0 195 0 195 90 0 90 0 0 -100z m382 10 l-3 -90 -85 0 -84 0 0 90 0 90 88 0 87 0 -3 -90z m-2112 -195 l0 -85 -95 0 -95 0 0 -190 0 -190 -85 0 -84 0 -3 93 -3 92 -97 3 -98 3 0 84 0 84 98 3 97 3 0 93 0 92 183 0 182 0 0 -85z m390 0 l0 -85 -90 0 -90 0 0 85 0 85 90 0 90 0 0 -85z m960 0 l0 -85 -185 0 -185 0 0 85 0 85 185 0 185 0 0 -85z m960 -10 l0 -95 95 0 95 0 0 -95 0 -95 95 0 95 0 0 -85 0 -85 -185 0 -185 0 0 95 0 95 -95 0 -95 0 0 180 0 180 90 0 90 0 0 -95z m380 10 l0 -85 -90 0 -90 0 0 85 0 85 90 0 90 0 0 -85z m-2500 -200 l0 -95 100 0 100 0 0 -85 0 -85 -185 0 -185 0 0 180 0 180 85 0 85 0 0 -95z m2880 -95 l0 -190 290 0 290 0 0 -90 0 -90 -95 0 -95 0 0 -95 0 -95 -185 0 -185 0 0 95 0 95 -105 0 -105 0 0 -190 0 -190 -95 0 -95 0 0 -95 0 -95 -185 0 -185 0 0 85 0 85 95 0 95 0 0 105 0 105 -95 0 -95 0 0 85 0 85 193 2 192 3 3 98 3 97 94 0 95 0 0 190 0 190 85 0 85 0 0 -190z m580 105 l0 -85 -185 0 -185 0 0 85 0 85 185 0 185 0 0 -85z m-4030 -385 l0 -90 -90 0 -90 0 0 90 0 90 90 0 90 0 0 -90z m2690 0 l0 -90 -90 0 -90 0 0 90 0 90 90 0 90 0 0 -90z m-1920 -195 l0 -85 -90 0 -90 0 0 85 0 85 90 0 90 0 0 -85z m0 -380 l0 -85 -90 0 -90 0 0 85 0 85 90 0 90 0 0 -85z m3260 0 l0 -85 -85 0 -85 0 0 85 0 85 85 0 85 0 0 -85z m-770 -575 l0 -280 -280 0 -280 0 0 280 0 280 280 0 280 0 0 -280z m-1340 -675 l0 -185 -90 0 -90 0 0 185 0 185 90 0 90 0 0 -185z m1530 95 l0 -90 -85 0 -85 0 0 90 0 90 85 0 85 0 0 -90z m-380 -285 l0 -185 -90 0 -90 0 0 185 0 185 90 0 90 0 0 -185z m575 0 l0 -185 -87 0 -88 0 0 185 0 185 88 0 87 0 0 -185z m-1915 -95 l0 -90 -90 0 -90 0 0 90 0 90 90 0 90 0 0 -90z" />
                    <path d="M2300 1635 l0 -105 198 2 197 3 0 100 0 100 -197 3 -198 2 0 -105z" />
                    <path d="M3450 1245 l0 -106 103 3 102 3 3 103 3 102 -106 0 -105 0 0 -105z" />
                    <path d="M3450 4125 l0 -675 675 0 675 0 0 675 0 675 -675 0 -675 0 0 -675z m1150 5 l0 -470 -470 0 -470 0 0 470 0 470 470 0 470 0 0 -470z" />
                    <path d="M3830 4125 l0 -295 300 0 300 0 0 295 0 295 -300 0 -300 0 0 -295z" />
                    <path d="M3060 4510 l0 -100 105 0 105 0 0 100 0 100 -105 0 -105 0 0 -100z" />
                    <path d="M3060 3935 l0 -105 105 0 105 0 0 105 0 105 -105 0 -105 0 0 -105z" />
                    <path d="M0 675 l0 -675 675 0 675 0 0 675 0 675 -675 0 -675 0 0 -675z m1140 -5 l0 -470 -470 0 -470 0 0 470 0 470 470 0 470 0 0 -470z" />
                    <path d="M370 675 l0 -295 300 0 300 0 0 295 0 295 -300 0 -300 0 0 -295z" />
                  </g>
                </svg>
                <div
                  style={{
                    position: 'absolute',
                    right: '1.6rem',
                    top: 140,
                    background: '#e2e2e2',
                    borderRadius: '1rem 1rem 1rem 1rem',
                  }}
                >
                  <styles.Download href={qrCode.url} target="_blank">
                    <img src={downLoad} alt="Download" />
                  </styles.Download>
                  <styles.Trash
                    type="button"
                    onClick={() => {
                      const imageElement = document.getElementById(qrCode.id);
                      if (imageElement.src === trash) {
                        imageElement.src = alertSignal;
                        toast.error('Está certo da exclusão?');
                      } else {
                        handleDelete(qrCode.id);
                      }
                    }}
                  >
                    <img src={trash} alt="Excluir" id={qrCode.id} />
                  </styles.Trash>
                </div>
              </div>
            ))}
          </styles.QrGalery>
        </styles.QrCodes>
      </styles.SectionUser>
    </Container>
  );
}
