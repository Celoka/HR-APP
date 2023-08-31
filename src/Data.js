import { createContext } from 'react';
import { QueryClient } from 'react-query'

export const baseUrlLink = 'https://sheltered-wildwood-06244-2353b78d164a.herokuapp.com/api/v1';

export const postData = async (data, url) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };
  const response = await fetch(`${baseUrlLink}/${url}`, options);
  return response.json();
};

export const toastProperty = {
  duration: 8000,
  newWindow: true,
  close: true,
  gravity: "top",
  position: "right",
  stopOnFocus: true,
  offset: {
    y: 150
  },
}

export const success =  {
  background: "linear-gradient(to right, #00b09b, #96c93d)",
};

export const error =  {
  background: "rgb(255, 95, 109)",
};

export const UserDetails = createContext();
export const queryClient = new QueryClient();