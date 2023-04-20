import { Container, StyledIcon, Text } from "../weather/weatherShortMainNow/WeatherShortMainNow";


export default function AddressIconText({address}) {

    // const [query, setQuery] = useState('');

    // const apiKey = 'ddf617232a0fd602e925eb2a96c61c74';

    // const handleSearch = async () => {
    //   const url = `https://dapi.kakao.com/v2/local/search/address.json?query=${query}`;
    //   const headers = { Authorization: `KakaoAK ${apiKey}` };
  
    //   try {
    //     const response = await axios.get(url, { headers });
    //     const address = response.data.documents[0].address;
    //     console.log(address);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };
  
    // const handleChange = (event) => {
    //   setQuery(event.target.value);
    // };
  

    return (
        <>
        <Container marginTop="0.8rem" padding="1rem">
            <StyledIcon name="ri:map-pin-2-line" size="1.7rem" />
            <Text fontSize="1.2rem" padding="0.8rem">{address.region2 + ` ` +address.region3} </Text>
            <StyledIcon name="ic:baseline-search" size="1.7rem" />
        </Container>
        </>

    )


}