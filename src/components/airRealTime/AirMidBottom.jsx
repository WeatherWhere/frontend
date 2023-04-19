//대기 주간예보 컴포넌트(Bottom)


export default function AirMidBottom({ location }) {


    // const [midSubData, setMidSubData] = useState([]);

    // const data = midSubData.map((value, index) => {
        
    //     if (index===0){
    //         baseTime = '현재';
    //     }
    //     return {
    //         fcstDateTime,
    //         pop: value.pop,
    //         pty: value.pty,
    //         sky: value.sky,
    //         tmp: value.tmp,
    //         wsd: value.wsd,
    //         reh: value.reh,
    //     };
    // });

    // const getMidData = useCallback(async (key, token) => {
    //     await getWeatherShortMain(key).then((res) => {
    //         if (res.data.statusCode === 200) {
    //             const data = res.data.data;
    //             setMidSubData([...data]);
    //         }
    //     }).catch((e) => {
    //         console.log(e);
    //     });

    // }, []);

    // useEffect(() => {
    //     if (location.latitude && location.longitude) {
    //         getMidData(`/weather/forecast/short/main?locationX=${location.latitude}&locationY=${location.longitude}`);
    //     }
    // }, [location.latitude, location.longitude, getMidData]);


    // return (
    //     <>
    //         <Background>
    //             <GlobalStyle />
    //             <TableWrap>
    //                 <Table>
    //                     <tbody>
    //                         <tr>
    //                             <TD borderLeft="0"></TD>

    //                             {data.map((item, index) => (
    //                                 <TD key={index}>{item.fcstDateTime}</TD>
    //                             ))}
    //                         </tr>
    //                         <tr>
    //                             <TD borderLeft="0"></TD>
    //                             {data.map((item, index) => (
    //                                 <TD key={index} >
    //                                     <StyledIcon name={getSkyStatus(item.sky, item.pty)[0]} color={getSkyStatus(item.sky, item.pty)[2]} size="2rem" />
    //                                 </TD>
    //                             ))}
    //                         </tr>
    //                         <tr>
    //                             <TD borderLeft="0">기온</TD>

    //                             {data.map((item, index) => (
    //                                 <TD key={index}>{item.tmp}°</TD>
    //                             ))}
    //                         </tr>
    //                         <tr>
    //                             <TD borderLeft="0" />
    //                             <TD colSpan="12" >
    //                                 <ChartContainer>
    //                                     <LineChart data={data} width={900} height={50}>
    //                                         <Line type="linear" dataKey="tmp" stroke="#A4DCF2" strokeWidth={2}
    //                                             curve="linear" legendType="none" dot={{ r: 5 }} />
    //                                     </LineChart>
    //                                 </ChartContainer>
    //                             </TD>
    //                         </tr>
    //                         <tr>
    //                             <TD borderLeft="0">강수</TD>

    //                             {data.map((item, index) => (
    //                                 <TD key={index}>{item.reh}%</TD>
    //                             ))}
    //                         </tr>
    //                     </tbody>
    //                 </Table>
    //             </TableWrap>

    //         </Background>
    //     </>
    // );


}


// export const Background = styled.div`
//     border-radius: 10px;
//     display: flex;
//     align-items: center;
//     overflow-y: auto;
//     overflow-y: hidden;.
//     overflow-x: auto;
//     justify-content: center; 

// `;


// const ChartContainer = styled.div`
//   display: flex;
//   margin:0 1.1rem 0 1.1rem;
  
// `;


// export const Table = styled.table`
//     display: flex;
//     align-items: center;
//     position: relative;
//     overflowY: scroll;
//     color:#969696;
//     font-size:0.7rem;
//     padding: 0.5rem 0;
//     border-collapse: collapse;
//     margin: auto;
//     flex: 1;
//     justify-content: center; 

// `;

// export const TD = styled.td`
//     text-align: center;
//     padding: 0 0.3rem 0rem 0.3rem;
//     height: 1rem;
//     white-space: nowrap;
//     border-left: ${(props) => props.borderLeft || '1px dashed #CDCDCD'};
//     `;

// //아이콘 컴포넌트
// export const StyledIcon = styled(Icon).attrs(props => ({
//     icon: props.name,
//     style: {
//         fontSize: props.size,
//         color: props.color
//     },
// }))`  
//   `;