import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image, Font } from '@react-pdf/renderer';

// Register fonts (optional but enhances professionalism)
Font.register({
  family: 'Roboto',
  fonts: [
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf', fontWeight: 'normal' },
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf', fontWeight: 'bold' }
  ]
});

// Create styles for the PDF document
const styles = StyleSheet.create({
  page: {
    fontFamily: 'Roboto',
    padding: 30,
    backgroundColor: '#FFFFFF',
  },
  headerContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#112131',
    borderBottomStyle: 'solid',
    paddingBottom: 20,
  },
  logoContainer: {
    width: 120,
    height: 120,
    marginRight: 20,
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  headerTextContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  companyName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#112131',
  },
  companyDetails: {
    fontSize: 10,
    color: '#555555',
    marginTop: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
    color: '#112131',
  },
  invoiceInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  infoBlock: {
    flexDirection: 'column',
    maxWidth: '33%',
  },
  infoLabel: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#666666',
    marginBottom: 5,
  },
  infoValue: {
    fontSize: 10,
  },
  tableContainer: {
    flexDirection: 'column',
    marginTop: 20,
    marginBottom: 20,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#F0F0F0',
    paddingVertical: 8,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
    fontWeight: 'bold',
    fontSize: 10,
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    fontSize: 10,
  },
  column1: { width: '15%' },
  column2: { width: '25%' },
  column3: { width: '20%' },
  column4: { width: '20%' },
  column5: { width: '20%' },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 30,
  },
  summaryTable: {
    width: '40%',
  },
  summaryRow: {
    flexDirection: 'row',
    paddingVertical: 5,
  },
  summaryLabel: {
    width: '60%',
    textAlign: 'right',
    paddingRight: 10,
    fontSize: 10,
    fontWeight: 'bold',
  },
  summaryValue: {
    width: '40%',
    textAlign: 'right',
    fontSize: 10,
  },
  totalRow: {
    flexDirection: 'row',
    paddingVertical: 5,
    borderTopWidth: 1,
    borderTopColor: '#112131',
  },
  totalLabel: {
    width: '60%',
    textAlign: 'right',
    paddingRight: 10,
    fontSize: 12,
    fontWeight: 'bold',
  },
  totalValue: {
    width: '40%',
    textAlign: 'right',
    fontSize: 12,
    fontWeight: 'bold',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    fontSize: 10,
    color: '#666666',
    textAlign: 'center',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
  },
  note: {
    marginTop: 30,
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 10,
    color: '#666666',
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
  }
});

const InvoicePDF = ({ invoiceData }) => {
  // Calculate totals
  const totalAmount = invoiceData.donation.reduce(
    (sum, item) => sum + parseFloat(item.donation_amount),
    0
  );
  
  const discountAmount = (totalAmount * invoiceData.discount) / 100;
  const finalAmount = totalAmount - discountAmount;
  
  // Format date function
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <Document>
      <Page style={styles.page}>
        {/* Header with Logo and Company Info */}
        <View style={styles.headerContainer}>
          <View style={styles.logoContainer}>
            {/* Replace with actual logo or use a placeholder */}
            <Image
              style={styles.logo}
              src="/assets/images/logo.png" 
            />
          </View>
          <View style={styles.headerTextContainer}>
            <Text style={styles.companyName}>My Sadaqah Online</Text>
            <Text style={styles.companyDetails}>United Kingdom</Text>
            <Text style={styles.companyDetails}>Email: info@mysadaqahonline.com | Phone: +123-456-7890</Text>
          </View>
        </View>

        {/* Invoice Title */}
        <Text style={styles.title}>DONATION INVOICE</Text>

        {/* Invoice Information */}
        <View style={styles.invoiceInfoContainer}>
          <View style={styles.infoBlock}>
            <Text style={styles.infoLabel}>INVOICE NUMBER</Text>
            <Text style={styles.infoValue}>INV-{invoiceData.invoice_id.toString().padStart(5, '0')}</Text>
          </View>
          <View style={styles.infoBlock}>
            <Text style={styles.infoLabel}>INVOICE DATE</Text>
            <Text style={styles.infoValue}>{invoiceData.invoice_date ? formatDate(invoiceData.invoice_date) : 'Pending'}</Text>
          </View>
          <View style={styles.infoBlock}>
            <Text style={styles.infoLabel}>PERIOD</Text>
            <Text style={styles.infoValue}>{formatDate(invoiceData.from_date)} - {formatDate(invoiceData.to_date)}</Text>
          </View>
          <View style={styles.infoBlock}>
            <Text style={styles.infoLabel}>STATUS</Text>
            <Text style={styles.infoValue}>{invoiceData.status.toUpperCase()}</Text>
          </View>
        </View>

        {/* Donation Table */}
        <View style={styles.tableContainer}>
          <View style={styles.tableHeader}>
            <Text style={styles.column1}>Donation ID</Text>
            <Text style={styles.column2}>Donor</Text>
            <Text style={styles.column3}>Program</Text>
            <Text style={styles.column4}>Country</Text>
            <Text style={styles.column5}>Amount</Text>
          </View>
          
          {invoiceData.donation.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.column1}>{item.donation_id}</Text>
              <Text style={styles.column2}>{item.donor_name}</Text>
              <Text style={styles.column3}>{item.program_name}</Text>
              <Text style={styles.column4}>{item.country_name}</Text>
              <Text style={styles.column5}>£{parseFloat(item.donation_amount).toFixed(2)}</Text>
            </View>
          ))}
        </View>

        {/* Summary */}
        <View style={styles.summaryContainer}>
          <View style={styles.summaryTable}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal:</Text>
              <Text style={styles.summaryValue}>£{totalAmount.toFixed(2)}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Discount ({invoiceData.discount}%):</Text>
              <Text style={styles.summaryValue}>-£{discountAmount.toFixed(2)}</Text>
            </View>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total Amount:</Text>
              <Text style={styles.totalValue}>£{finalAmount.toFixed(2)}</Text>
            </View>
          </View>
        </View>

        {/* Note */}
        <View style={styles.note}>
          <Text>Note: This is an official receipt for your charitable donations. Thank you for your generosity and support!</Text>
        </View>

        {/* Footer */}
        <Text style={styles.footer}>
          My Sadaqah Online is a registered non-profit organization | Registration No: 123456789
        </Text>
      </Page>
    </Document>
  );
};

export default InvoicePDF;