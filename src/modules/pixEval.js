import keyIsValid from './keyValidator';

// Verification data
export const verifyPixKey = function (key) {
  if (!key) {
    return [false, 'O valor da chave Pix deve ser preenchido'];
  }
  if (keyIsValid(key)) {
    return [true, keyIsValid(key)];
  }
  return [false, 'Chave Pix inválida'];
};

export const verifyCep = function (cep) {
  if (cep.length > 0 && (cep.length !== 8 || !Number(cep))) {
    return [false, 'O CEP deve conter apenas números e exatamente 8 caracteres, ou ficar vazio'];
  }
  return [true, 'Sucesso'];
};

export const verifyMoney = function (money) {
  if (money) {
    if (!Number(money)) {
      const listMoney = money.match(/\d+/g);
      if (listMoney) {
        if (listMoney.length === 1) {
          return [true, listMoney[0]];
        }
        if (listMoney.length === 2) {
          return [true, `${listMoney[0]}.${listMoney[1]}`];
        }
        return [false, 'Valor inválido'];
      }
      return [false, 'Valor inválido'];
    }
    return [true, money];
  }
  return [true, money];
};

export const verifyLink = function (link) {
  if (!link) {
    return [false, 'O campo deve ser preenchido'];
  }
  return [true, 'Sucesso'];
};
