const http = require('http');
const request = require('request');

const hostname: string = '127.0.0.1';
const port: number = 3333;
const 테스트케이스_파라미터s: {}[] = [];

/*
        params: {
            size: 20,
            page: 1,
            query: "역삼역+아파트+매매",
            dealtypecode: "S",
            service_type: "A1",
            target_bcode: 1168010100,
            region1: "서울",
            region2: "강남구",
            region3: "역삼동",
            lcode: "I1022",
            channel_type: "maemul"
        }
*/



const testStrUrl: string[] = [
    "https://realty.daum.net/search/analysis?size=20&page=1&query=역삼역+아파트+매매&ext_query=역삼+역+아파트+매매&dealtypecode=S&service_type=A1&target_bcode=1168010100&region1=서울&region2=강남구&region3=역삼동&lcode=I1022&channel_type=maemul",
    "https://realty.daum.net/search/analysis?size=20&page=1&query=양천구+신정동+아파트+전세&ext_query=양천구+신정동+아파트+전세&dealtypecode=L&service_type=A1&target_bcode=1147010100&region1=서울&region2=양천구&region3=신정동&lcode=I10230700&channel_type=maemul"
]

interface TestCaseUrl {
    url: string
    params: any
}

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

const callDaumTotalSearch = () => {
    const options = {
        uri: "http://127.0.0.1:3000/search/analysis",
        qs: 테스트케이스_파라미터s[0]
    };

    console.log("options - ", options);

    request.get(options,function(err,response,body){
    //callback
    // console.log("반응값 - ", response);
    })
}

const translateURLToJSON = (통검더보기Urls: string[]) => {

    통검더보기Urls.map((url) => {
        let arr = match파라미터문자열(url)
        테스트케이스_파라미터s.push(createJSON(arr))
    })

    console.log(테스트케이스_파라미터s)
}

const match파라미터문자열 = (url: string): string[] => {
    return url.match(/&\w*=(\w+|[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|\s]*)/gi)
}

const createJSON = (params: string[]) => {
    let JSON_문자열 = "{";

    params.map((param: string, idx: number) => {
        let 키_벨류 = `"${param.match(/&\w*=/gi)[0].replace("&", "").replace("=","")}" : "${param.match(/=(\w+|[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|\s]*)/gi)[0].replace("=","").replace("+"," ")}"`
        JSON_문자열 += (idx === params.length - 1) ? 키_벨류 : 키_벨류 + ","
    })

    return JSON.parse(JSON_문자열 + "}")
}

// const pickup파라미터값 = (param: string): string => {
//     return param.replace(/&\w*=/gi, "")
// }

server.listen(port, hostname, () => {
    translateURLToJSON(testStrUrl);
    callDaumTotalSearch();
    console.log(`Server running at http://${hostname}:${port}/`);
});