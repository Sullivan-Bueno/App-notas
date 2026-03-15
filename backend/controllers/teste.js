import axios from "axios";

async function teste() {
  const result = axios.get("http://localhost:5000/auth/verify-token", {
    headers: {
      authorization: `bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OWE3N2QyOWZkZDhhZDc3YzlhZDI2MjMiLCJpYXQiOjE3NzM2MTQ0ODEsImV4cCI6MTc3MzYxODA4MX0.td5Gm0ZWTlzf1DY-utLAevwur4ODhDpDmkr9dKfqFnQ`,
    },
  });

  return result;
}

teste().then((data) => {
  console.log(data.data.token.userId);
});
