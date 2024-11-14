import { createContext } from "react";

const productContext = createContext({
    name:null,
    translator:null,
    publisher:null,
    description:null,
    cover:null,
    shortName:null,
    discount:'',
    subcategoryID:null,
    authorID:null,
    fileDigital: null,
    fileAudio: null,
        shabook: null,
        yearsPublish: '',
        cut: null,
        coverType: null,
        numberPagePrinted: '',
        printNumber: '',
        pricePrinted: '',
        format: null,
        numberPageDigital: '',
        volume: '',
        priceDigital: '',
        speaker: null,
        priceAudio: '',
        publishAudio: null

})

export default productContext;