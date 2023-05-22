import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { get } from 'lodash';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { Container, Form } from '../../styles/GlobalStyles';
import { SectionPix, PixTittle, QrDiv, QrMov, QrArea, QrAction, DownOptions, SavOptions } from './styled';
import { verifyPixKey, verifyCep, verifyMoney } from '../../modules/pixEval';
import axios from '../../services/axios';
import { colorHexToDec } from '../../modules/baseconversor';
import { dataURLtoFile } from '../../modules/imageConversor';

import Loading from '../../components/Loading';
import save from '../../assets/images/save-file.png';
import download from '../../assets/images/download.png';

export default function Pix({ match }) {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const id = get(match, 'params.id', '');

  const [isLoading, setIsLoading] = useState(false);
  const [key, setKey] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [cep, setCep] = useState('');
  const [city, setCity] = useState('');
  const [money, setMoney] = useState('');
  const [size, setSize] = useState('');
  const [margin, setMargin] = useState('');
  const [clight, setClight] = useState('#ffffff');
  const [cdark, setCdark] = useState('#000000');
  const [bImage, setBImage] = useState('');
  const [lImage, setLImage] = useState('');
  const [lScale, setLScale] = useState(20);
  const [lMargin, setLMargin] = useState('');
  const [lRadius, setLRadius] = useState(0);
  const [dotCol, setDotCol] = useState('');
  const [bacCol, setBacCol] = useState('');
  const [qrSrc, setQrSrc] = useState('');
  const [inpBackCol, setInpBackCol] = useState('#e2e2e2');
  const [inpBackCol1, setInpBackCol1] = useState('#e2e2e2');
  const [bImgPre, setBImgPre] = useState(null);
  const [lImgPre, setLImgPre] = useState(null);
  const [isGif, setIsGif] = useState(false);
  const [toLarge, setToLarge] = useState(false);
  const [toLarge1, setToLarge1] = useState(false);
  const [imgRaw, setImgRaw] = useState('');
  const [dwldOpt, setDwldOpt] = useState(false);
  const [svOpt, setSvOpt] = useState(false);

  async function updateForm() {
    setBacCol(colorHexToDec(clight));
    if (bImgPre) {
      setDotCol('#000000');
    } else {
      setDotCol(cdark);
    }
    setQrSrc('');
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formErrors = false;

    const keyRes = verifyPixKey(key);
    if (!keyRes[0]) {
      formErrors = true;
      toast.error(keyRes[1]);
    } else {
      setKey(keyRes[1]);
    }

    const cepRes = verifyCep(cep);
    if (!cepRes[0]) {
      formErrors = true;
      toast.error(cepRes[1]);
    }

    const moneyRes = verifyMoney(money);
    if (!moneyRes[0]) {
      formErrors = true;
      toast.error(moneyRes[1]);
    } else {
      setMoney(moneyRes[1]);
    }

    if (size && !Number(size)) {
      formErrors = true;
      toast.error('Número apenas');
    }
    if (toLarge || toLarge1) {
      formErrors = true;
      toast.error('Imagem deve ter no máximo 150 Kb');
    }

    if (formErrors) return;

    const dataBody = {
      key,
      name: name || null,
      city: city || null,
      message: message || null,
      cep: cep || null,
      money: money || null,
    };

    try {
      setIsLoading(true);
      const pixCodeResp = await axios.post('/pixgen', dataBody);
      toast.success('Código BR Gerado');
      const styleBody = {
        text: pixCodeResp.data,
        size,
        margin,
        cdark,
        clight,
        bImage: bImgPre,
        lImage: lImgPre,
        lScale: lImgPre ? lScale / 100 : null,
        lRadius: lImgPre ? parseInt(lRadius * ((size * (lScale / 100)) / 100), 10) : null,
        lMargin: lImgPre ? lMargin : null,
        isGif,
      };
      const imageResp = await axios.post('/qrgen', styleBody);
      toast.success('Código QR Gerado');
      setImgRaw(imageResp.data);
      setQrSrc(`data:image/png;base64,${imageResp.data}`);
      setIsLoading(false);
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
  };

  return (
    <Container>
      <Loading isLoading={isLoading} />

      <SectionPix>
        <div>
          <Form onSubmit={handleSubmit} onClick={updateForm}>
            <fieldset>
              <legend>Dados</legend>
              <label htmlFor="key">
                Chave Pix:
                <input type="text" value={key} onChange={(e) => setKey(e.target.value)} placeholder="Obrigatório" />
              </label>
              <label htmlFor="name">
                Nome:
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Opcional" />
              </label>
              <label htmlFor="message">
                Mensagem:
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Opcional"
                />
              </label>
              <label htmlFor="cep">
                CEP:
                <input type="text" value={cep} onChange={(e) => setCep(e.target.value)} placeholder="Opcional" />
              </label>
              <label htmlFor="city">
                Cidade:
                <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Opcional" />
              </label>
              <label htmlFor="money">
                Valor:
                <input type="number" value={money} onChange={(e) => setMoney(e.target.value)} placeholder="Opcional" />
              </label>
            </fieldset>
            <fieldset>
              <legend>Estilo</legend>
              <label htmlFor="clight">
                Cor do fundo:
                <input
                  type="color"
                  value={clight}
                  onChange={(e) => {
                    setClight(e.target.value);
                    setBacCol(colorHexToDec(clight));
                  }}
                  placeholder="Opcional"
                />
              </label>
              <label htmlFor="cdark">
                Cor dos pontos:
                <input
                  type="color"
                  value={cdark}
                  onChange={(e) => {
                    setCdark(e.target.value);
                    if (bImgPre) {
                      setDotCol('#000000');
                    } else {
                      setDotCol(cdark);
                    }
                  }}
                  placeholder="Opcional"
                />
              </label>
              <label htmlFor="size">
                Tamanho em px:
                <input type="number" value={size} onChange={(e) => setSize(e.target.value)} placeholder="Opcional" />
              </label>
              <label htmlFor="margin">
                Margem em px:
                <input
                  type="number"
                  value={margin}
                  onChange={(e) => setMargin(e.target.value)}
                  placeholder="Opcional"
                />
              </label>
              <label htmlFor="bImage">
                Imagem de fundo:
                <input
                  type="file"
                  value={bImage}
                  style={{ backgroundColor: inpBackCol }}
                  onChange={(e) => {
                    setBImage(e.target.value);
                    if (e.target.value) {
                      setInpBackCol('#00f190');
                    } else {
                      setInpBackCol('#e2e2e2');
                    }
                    let backgroundInput = document.getElementById('backgroundFile');
                    let fReader = new FileReader();
                    if (backgroundInput.files[0]) {
                      if (backgroundInput.files[0].size > 150000) {
                        setToLarge(true);
                      } else {
                        setToLarge(false);
                      }
                      fReader.readAsDataURL(backgroundInput.files[0]);
                      fReader.onloadend = (event) => {
                        setBImgPre(event.target.result);
                        setDotCol('#000000');
                        if (event.target.result[11] === 'g') {
                          setIsGif(true);
                        } else {
                          setIsGif(false);
                        }
                      };
                    } else {
                      setBImgPre(null);
                      setDotCol(cdark);
                      setToLarge(false);
                    }
                  }}
                  id="backgroundFile"
                  accept="image/png, image/jpeg, image/svg, image/gif"
                />
              </label>
              <label htmlFor="lImage">
                Logo:
                <input
                  type="file"
                  value={lImage}
                  style={{ backgroundColor: inpBackCol1 }}
                  onChange={(e) => {
                    setLImage(e.target.value);
                    if (e.target.value) {
                      setInpBackCol1('#00f190');
                    } else {
                      setInpBackCol1('#e2e2e2');
                    }
                    let logoInput = document.getElementById('logoFile');
                    let fReader = new FileReader();
                    if (logoInput.files[0]) {
                      if (logoInput.files[0].size > 150000) {
                        setToLarge1(true);
                      } else {
                        setToLarge1(false);
                      }
                      fReader.readAsDataURL(logoInput.files[0]);
                      fReader.onloadend = (event) => {
                        setLImgPre(event.target.result);
                      };
                    } else {
                      setLImgPre(null);
                      setToLarge1(false);
                    }
                  }}
                  id="logoFile"
                  accept="image/png, image/jpeg, image/svg"
                />
              </label>
              <label htmlFor="lScale">
                Escala do logo:
                <input type="range" value={lScale} onChange={(e) => setLScale(e.target.value)} placeholder="Opcional" />
              </label>
              <label htmlFor="lRadius">
                Curva do logo:
                <input
                  type="range"
                  value={lRadius}
                  onChange={(e) => setLRadius(e.target.value)}
                  placeholder="Opcional"
                />
              </label>
              <label htmlFor="lMargin">
                Margem do logo:
                <input
                  type="number"
                  value={lMargin}
                  onChange={(e) => setLMargin(e.target.value)}
                  placeholder="Opcional"
                />
              </label>
            </fieldset>
            <button type="submit">Gerar QR Code</button>
          </Form>
        </div>
        <QrDiv>
          <QrMov>
            <PixTittle>Pré Visualização</PixTittle>
            <QrArea>
              {qrSrc ? (
                <div>
                  <img src={qrSrc} width="200px" height="200px" alt="Código QR" />
                </div>
              ) : (
                <div
                  style={
                    bImgPre
                      ? { backgroundImage: `url(${bImgPre})`, backgroundSize: 'cover' }
                      : { backgroundImage: 'none' }
                  }
                >
                  <div style={bImgPre ? { backgroundColor: 'rgba(255, 255, 255, 0.5)' } : { backgroundColor: bacCol }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      version="1.0"
                      width="200px"
                      height="200px"
                      viewBox="0 0 480.000000 480.000000"
                      preserveAspectRatio="xMidYMid meet"
                      id="qrDemoImg"
                      style={{ zIndex: -1 }}
                    >
                      <g
                        transform="translate(0.000000,480.000000) scale(0.100000,-0.100000)"
                        fill={dotCol}
                        stroke="none"
                      >
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
                  </div>
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <div
                      style={{
                        width: (200 * lScale) / 100 + (200 * lMargin) / (size || 200),
                        height: (200 * lScale) / 100 + (200 * lMargin) / (size || 200),
                        backgroundColor: lImgPre && !bImgPre ? clight : 'rgba(0, 0, 0, 0)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <img
                        style={
                          lImgPre
                            ? {
                                width: (200 * lScale) / 100,
                                height: (200 * lScale) / 100,
                                borderRadius: `${lRadius / 2}%`,
                              }
                            : { display: 'none' }
                        }
                        alt="Logo"
                        src={lImgPre}
                      />
                    </div>
                  </div>
                </div>
              )}
            </QrArea>
            {qrSrc ? (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-evenly',
                  maxWidth: '22rem',
                  margin: 'auto',
                }}
              >
                <QrAction
                  src={download}
                  alt="Baixar QR Code"
                  onClick={async () => {
                    setDwldOpt(true);
                    setSvOpt(false);
                  }}
                />
                {isLoggedIn ? (
                  <QrAction
                    src={save}
                    alt="Salvar QR Code"
                    onClick={async () => {
                      setSvOpt(true);
                      setDwldOpt(false);
                    }}
                  />
                ) : (
                  <input type="hidden" />
                )}
              </div>
            ) : (
              <input type="hidden" />
            )}
            <div
              style={
                dwldOpt
                  ? {
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-evenly',
                      maxWidth: '22rem',
                      margin: 'auto',
                    }
                  : { display: 'none' }
              }
            >
              <DownOptions
                href={`data:image/jpg;base64,${imgRaw}`}
                download="qrCode.jpg"
                onClick={async () => setDwldOpt(false)}
              >
                Jpg
              </DownOptions>
              <DownOptions
                href={`data:image/png;base64,${imgRaw}`}
                download="qrCode.png"
                onClick={async () => setDwldOpt(false)}
              >
                Png
              </DownOptions>
            </div>
            <div
              style={
                svOpt
                  ? {
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-evenly',
                      maxWidth: '22rem',
                      margin: 'auto',
                    }
                  : { display: 'none' }
              }
            >
              <SavOptions
                onClick={async () => {
                  setSvOpt(false);
                  const imgUrl = `data:image/jpg;base64,${imgRaw}`;
                  const fileImage = dataURLtoFile(imgUrl, 'qrcode.jpg', 'image/jpeg');
                  const formData = new FormData();
                  formData.append('userId', id);
                  formData.append('photo', fileImage);
                  try {
                    setIsLoading(true);
                    await axios.post('/fotos', formData, {
                      headers: {
                        'Content-Type': 'multipart/form-data',
                      },
                    });
                    toast.success('Imagem armazenada');
                    setIsLoading(false);
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
                }}
              >
                Jpg
              </SavOptions>
            </div>
          </QrMov>
        </QrDiv>
      </SectionPix>
    </Container>
  );
}

Pix.propTypes = {
  match: PropTypes.shape({}).isRequired,
};
