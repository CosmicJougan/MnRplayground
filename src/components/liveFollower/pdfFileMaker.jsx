import PDFlayout from "./pdfLayout";
import {
  Foto,
  Page,
  Document,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
const { useState, useEffect } = require("react");
const React = require("react");
const { getUsers } = require("repositories/UserRepository");

export default function PDFFileMaker() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    getUsers()
      .then((data) => setUsers(data))
      .catch((error) => console.log(error));
  }, []);

  const styles = StyleSheet.create({
    page: { padding: 60 },
    section: { marginTop: 10 },
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <ul>
          {users.map((user) => (
            <li>
              <View style={styles.section}>
                <PDFlayout name={user.displayName} id={user.userId} />
              </View>
            </li>
          ))}
        </ul>
      </Page>
    </Document>
  );
}
