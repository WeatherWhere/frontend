import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";


export default function TourCommon(){

    const [commonData, setCommonData] = useState(null);
    const [tourPositions, setTourPositions] = useState(null);

  //관광 공통정보 받아오는 api
  const getWeatherMidForecast = async (key, token) => {
    try {
      const response = await axios.get(key);
      setCommonData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

    useEffect(() => {
        fetch("/mock/tour_data.json")
        .then((res) => res.json())
        .then((data) => {
          //console.log(data.position[0]);
          setTourPositions(data.position[0]);
        });
        if(tourPositions){
        getWeatherMidForecast(`/tour/api4?contentId=${tourPositions.contentId}&contentTypeId=${tourPositions.contenttypeId}`);
        }
    }, []);
    




    return(
        <Background>

        </Background>
    )

}









const Background = styled.div`
  background-color: black;
  flex-direction: column;
  height: 66%;
  flex-wrap: wrap;
  display: flex;
  align-items: center;
  border-radius: 10px;
`;
