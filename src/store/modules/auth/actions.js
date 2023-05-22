import * as types from '../types';

export function loginRequest(payload) {
  return {
    type: types.LOGIN_REQUEST,
    payload,
  };
}

export function loginSuccess(payload) {
  return {
    type: types.LOGIN_SUCCESS,
    payload,
  };
}

export function loginFailure(payload) {
  return {
    type: types.LOGIN_FAILURE,
    payload,
  };
}

export function registerRequest(payload) {
  return {
    type: types.REGISTER_REQUEST,
    payload,
  };
}

export function registerUpdatedSuccess(payload) {
  return {
    type: types.REGISTER_UPDATED_SUCCESS,
    payload,
  };
}

export function registerCreatedSuccess(payload) {
  return {
    type: types.REGISTER_CREATED_SUCCESS,
    payload,
  };
}

export function registerFailure(payload) {
  return {
    type: types.REGISTER_FAILURE,
    payload,
  };
}

export function qrcodeRequestSuccess(payload) {
  return {
    type: types.QRCODE_REQUEST_SUCCESS,
    payload,
  };
}

export function qrcodeRequestFailure(payload) {
  return {
    type: types.QRCODE_REQUEST_FAILURE,
    payload,
  };
}

export function qrcodeRequest(payload) {
  return {
    type: types.QRCODE_REQUEST,
    payload,
  };
}
