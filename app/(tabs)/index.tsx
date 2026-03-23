import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const harcamalar = [
  { id: '1', baslik: 'Market Alışverişi', tutar: '350 ₺', tip: 'gider' },
  { id: '2', baslik: 'Kahve', tutar: '85 ₺', tip: 'gider' },
  { id: '3', baslik: 'Burs/Harçlık', tutar: '2000 ₺', tip: 'gelir' },
];

export default function HomeScreen() {

  const renderItem = ({ item }) => (
    <View style={styles.harcamaKarti}>
      <Text style={styles.harcamaBaslik}>{item.baslik}</Text>
      <Text style={[styles.harcamaTutar, { color: item.tip === 'gelir' ? '#27ae60' : '#e74c3c' }]}>
        {item.tip === 'gelir' ? '+' : '-'}{item.tutar}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>

      <View style={styles.bakiyeKarti}>
        <Text style={styles.bakiyeBaslik}>Kalan Bakiye</Text>
        <Text style={styles.bakiyeMiktar}>1565 ₺</Text>
      </View>

      <View style={styles.listeAlani}>
        <Text style={styles.listeBaslik}>Son İşlemler</Text>
        <FlatList
          data={harcamalar}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>

      <TouchableOpacity style={styles.eklemeButonu} activeOpacity={0.8}>
        <Text style={styles.eklemeButonuText}>+</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6fa',
    paddingTop: 50,
  },
  bakiyeKarti: {
    backgroundColor: '#2f3640',
    margin: 20,
    padding: 30,
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  bakiyeBaslik: {
    color: '#dcdde1',
    fontSize: 16,
    marginBottom: 10,
  },
  bakiyeMiktar: {
    color: '#4cd137',
    fontSize: 36,
    fontWeight: 'bold',
  },
  listeAlani: {
    flex: 1,
    paddingHorizontal: 20,
  },
  listeBaslik: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2f3640',
    marginBottom: 15,
  },
  harcamaKarti: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  harcamaBaslik: {
    fontSize: 16,
    fontWeight: '500',
  },
  harcamaTutar: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  eklemeButonu: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#4cd137',
    width: 65,
    height: 65,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  eklemeButonuText: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: -4,
  },
});