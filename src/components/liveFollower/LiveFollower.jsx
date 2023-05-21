/* eslint-disable no-extend-native */
import React from "react";
import MakeCards from "./MakeCards";
import {Page, Text, Image, Document, StyleSheet, PDFDownloadLink} from '@react-pdf/renderer';

import "react-calendar/dist/Calendar.css";
import PDFFile from "./PDFFile";
import PDFFileMaker from "./pdfFileMaker";



export default function LiveFollower() {
  return (
    <div>
      <MakeCards/>
      <PDFDownloadLink document={<PDFFileMaker/>} fileName="WorkForm Week">
        {({loading}) => (loading ? 'Loading document....' : <button>Download</button>)}
      </PDFDownloadLink>
    </div>
  );
}
