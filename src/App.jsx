import { useState } from "react";
import { Button, TextField, styled } from "@mui/material";
import axios from "axios";

const Container = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "lightgrey",
  height: "200px",
}));

const App = () => {
  const [inputValue, setInputValue] = useState("");
  const [locationData, setLocationData] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .get(
        `https://ipgeolocation.abstractapi.com/v1/?api_key=ab632ac2e83343e99ab926fd28196260&ip_address=${inputValue}`
      )
      .then((res) => {
        setLocationData(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <Container>
      <h1>IP Geolocation</h1>
      <form onSubmit={handleSubmit}>
        <TextField
          id="standard-basic"
          label="IP Address"
          value={inputValue}
          onChange={handleInputChange}
        />
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </form>
      {locationData && (
        <div>
          <h2>Location Data</h2>
          <ul>
            <li>Country: {locationData.country}</li>
            <li>Region: {locationData.region}</li>
            <li>City: {locationData.city}</li>
            <li>Latitude: {locationData.latitude}</li>
            <li>Longitude: {locationData.longitude}</li>
            <li>Currency: {locationData.currency.currency_name}</li>
            <li>Currency code: {locationData.currency.currency_code}</li>
            <li>Postal code: {locationData.postal_code}</li>
            <li>VPN Used: {locationData.security.is_vpn}</li>
            <li>Current time: {locationData.timezone.current_time}</li>
            <li>
              Flag: <img src={locationData.flag.svg} alt="" />
            </li>
          </ul>
        </div>
      )}
    </Container>
  );
};

export default App;
