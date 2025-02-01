import React from 'react';
import { Page, Text, View, Document, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';

// Create styles for the PDF document
const styles = StyleSheet.create({
  page: {
    backgroundColor: '#fff',
    padding: 30,
  },
  section: {
    margin: 10,
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    fontSize: 12,
    marginTop: 10,
  },
});

const InvoicePDF = ({ invoiceData }) => (
  <Document>
    <Page style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>Invoice Data</Text>
        <Text style={styles.content}>
          {JSON.stringify(invoiceData, null, 2)} {/* Convert data to JSON format */}
        </Text>
      </View>
    </Page>
  </Document>
);

export default InvoicePDF;
