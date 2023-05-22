import ValidaCPF from './validaCPF';
import validarCNPJ from './validaCnpj';

function keyIsCpf(key) {
  // Just Numbers
  const supCpf = key.match(/\d+/g);
  let nSupCpf;
  if (supCpf && supCpf.length > 0) {
    nSupCpf = supCpf.join('');
  } else {
    return 0;
  }

  // verify
  if (nSupCpf.length === 11) {
    const validator = new ValidaCPF(nSupCpf);
    const resp = validator.valida();
    if (resp) {
      return nSupCpf;
    }
  }

  return 0;
}

function keyIsCnpj(key) {
  // Just Numbers
  const supCnpj = key.match(/\d+/g);
  let nSupCnpj;
  if (supCnpj && supCnpj.length > 0) {
    nSupCnpj = supCnpj.join('');
  } else {
    return 0;
  }

  // verify
  if (nSupCnpj.length === 14) {
    const validator = validarCNPJ(nSupCnpj);
    if (validator) {
      return nSupCnpj;
    }
  }

  return 0;
}

function keyIsPhone(key) {
  // Just Numbers
  const supPhone = key.match(/\d+/g);
  let nSupPhone;
  if (supPhone && supPhone.length > 0) {
    nSupPhone = supPhone.join('');
  } else {
    return 0;
  }

  // verify
  // Checky phone format
  if (nSupPhone.length >= 10 && nSupPhone.length <= 14) {
    // Fix Phone without DDI
    if (nSupPhone.length === 10) {
      const ddd = Number(nSupPhone[nSupPhone.length - 10]) * 10 + Number(nSupPhone[nSupPhone.length - 9]);
      if (ddd < 11 || ddd > 99) {
        return 0;
      }

      return `+55${nSupPhone}`;
    }
    // Cell Phone without DDI
    if (nSupPhone.length === 11) {
      const ddd = Number(nSupPhone[nSupPhone.length - 11]) * 10 + Number(nSupPhone[nSupPhone.length - 10]);
      if (ddd < 11 || ddd > 99) {
        return 0;
      }

      return `+55${nSupPhone}`;
    }
    return `+${nSupPhone}`;
  }
  return 0;
}

function keyIsMail(key) {
  // check
  const supMail = key.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  if (supMail) {
    return supMail[0];
  }
  return 0;
}

function keyIsRand(key) {
  if (key.length !== 36) {
    return 0;
  }
  // 12345-78-0123sd678901e34-67890a23-54
  // 1@345-78-0123sd678901e34-67890a23-54
  const supRand = key.replace(/[^A-Za-z0-9-]+/);
  if (supRand.length !== 36) {
    return 0;
  }
  return supRand;
}

export default function keyIsValid(key) {
  if (keyIsCpf(key)) {
    return keyIsCpf(key);
  }
  if (keyIsCnpj(key)) {
    return keyIsCnpj(key);
  }
  if (keyIsPhone(key)) {
    return keyIsPhone(key);
  }
  if (keyIsMail(key)) {
    return keyIsMail(key);
  }
  if (keyIsRand(key)) {
    return keyIsRand(key);
  }
  return 0;
}
