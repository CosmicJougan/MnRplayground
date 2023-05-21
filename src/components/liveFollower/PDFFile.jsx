import React from "react";
import PDFFileMaker from "./pdfFileMaker";
import {
  Foto,
  Page,
  Document,
  Text,
  StyleSheet,
  View,
} from "@react-pdf/renderer";

export default function PDFFile() {
  const styles = StyleSheet.create({
    page: { backgroundColor: "tomato" },
    section: { textAlign: "center", margin: 30 },
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={{ color: "white", textAlign: "center", margin: 30 }}>
          <Text>
            <PDFFileMaker />
          </Text>
        </View>
      </Page>
    </Document>
  );
}
