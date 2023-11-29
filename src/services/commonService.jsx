import React from 'react'
import { useState } from "react";
import { setBackDropOn, getBackDropOFF, setClassCombo } from "state";



const CommonService = {
    
    loaderON : (dispatch) => {
        // const dispatch = useDispatch();
        dispatch(
            setBackDropOn({
                back_drop : true
            })
        );
    },
    loaderOFF : (dispatch) => {
        // const dispatch = useDispatch();
        dispatch(
            getBackDropOFF({
                back_drop : false
            })
        );
    },
    setClassCombo : (dispatch, data) => {
        dispatch(
            setClassCombo(data)
        );
    },
    downloadPdf : (base64Data = null, fileName = 'file') => {
        // const byteCharacters = atob(base64Data);
        // const byteNumbers = new Array(byteCharacters.length);
        // for (let i = 0; i < byteCharacters.length; i++) {
        // byteNumbers[i] = byteCharacters.charCodeAt(i);
        // }
        // const byteArray = new Uint8Array(byteNumbers);
        // const blob = new Blob([byteArray], { type: 'application/octet-stream' });

        // // Create a data URL for the Blob.
        // const url = URL.createObjectURL(blob);

        // // Create an anchor element for downloading.
        // const a = document.createElement('a');
        // a.href = url;
        // a.download = fileName;

        // // Trigger a click event to start the download.
        // a.click();

        // // Clean up the URL object.
        // URL.revokeObjectURL(url);
        const linkSource = base64Data;
        const downloadLink = document.createElement("a");

        downloadLink.href = linkSource;
        downloadLink.download = fileName;
        downloadLink.click();
    },
}


export default CommonService