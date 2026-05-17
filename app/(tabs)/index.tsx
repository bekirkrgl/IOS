import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, KeyboardAvoidingView, Modal, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface Harcama {
  id: string;
  baslik: string;
  tutar: string;
  tip: string;
}

export default function HomeScreen() {
  const [harcamalar, setHarcamalar] = useState<Harcama[]>([]);
  const [modalGorunur, setModalGorunur] = useState(false);

  const [yeniBaslik, setYeniBaslik] = useState('');
  const [yeniTutar, setYeniTutar] = useState('');
  const [yeniTip, setYeniTip] = useState('gider');
  const [duzenlenenId, setDuzenlenenId] = useState<string | null>(null);

  const [aktifFiltre, setAktifFiltre] = useState('hepsi');

  const [guncelBakiye, setGuncelBakiye] = useState(0);
  const [toplamGelir, setToplamGelir] = useState(0);
  const [toplamGider, setToplamGider] = useState(0);

  useEffect(() => {
    verileriYukle();
  }, []);

  useEffect(() => {
    bakiyeHesapla();
  }, [harcamalar]);

  const verileriYukle = async () => {
    try {
      const kayitliVeriler = await AsyncStorage.getItem('@harcamalar_listesi');
      if (kayitliVeriler !== null) {
        setHarcamalar(JSON.parse(kayitliVeriler));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const verileriKaydet = async (yeniListe: Harcama[]) => {
    try {
      const jsonVeri = JSON.stringify(yeniListe);
      await AsyncStorage.setItem('@harcamalar_listesi', jsonVeri);
    } catch (error) {
      console.log(error);
    }
  };

  const bakiyeHesapla = () => {
    let bakiye = 0; let gelir = 0; let gider = 0;
    harcamalar.forEach(islem => {
      const miktar = parseFloat(islem.tutar);
      if (islem.tip === 'gelir') { bakiye += miktar; gelir += miktar; }
      else { bakiye -= miktar; gider += miktar; }
    });
    setGuncelBakiye(bakiye);
    setToplamGelir(gelir);
    setToplamGider(gider);
  };

  const duzenleBaslat = (item: Harcama) => {
    setDuzenlenenId(item.id);
    setYeniBaslik(item.baslik);
    setYeniTutar(item.tutar);
    setYeniTip(item.tip);
    setModalGorunur(true);
  };

  const islemKaydet = () => {
    if (yeniBaslik.trim() === '' || yeniTutar.trim() === '') {
      Alert.alert("Eksik Bilgi", "Lütfen tüm alanları doldurun.");
      return;
    }
    const sayisalTutar = parseFloat(yeniTutar.replace(',', '.'));
    if (isNaN(sayisalTutar) || sayisalTutar <= 0) {
      Alert.alert("Hatalı Tutar", "Geçerli bir rakam girin.");
      return;
    }

    if (duzenlenenId) {
      const guncellenmisListe = harcamalar.map(item =>
        item.id === duzenlenenId ? { ...item, baslik: yeniBaslik, tutar: sayisalTutar.toString(), tip: yeniTip } : item
      );
      setHarcamalar(guncellenmisListe);
      verileriKaydet(guncellenmisListe);
    } else {
      const yeniIslem: Harcama = { id: Math.random().toString(), baslik: yeniBaslik, tutar: sayisalTutar.toString(), tip: yeniTip };
      const yeniListe = [yeniIslem, ...harcamalar];
      setHarcamalar(yeniListe);
      verileriKaydet(yeniListe);
    }
    formuTemizle();
  };

  const formuTemizle = () => {
    setYeniBaslik(''); setYeniTutar(''); setYeniTip('gider'); setDuzenlenenId(null); setModalGorunur(false);
  };

  const islemSecenekleri = (item: Harcama) => {
    Alert.alert("İşlem Seçin", `"${item.baslik}" kaydı için ne yapmak istersiniz?`, [
      { text: "Düzenle", onPress: () => duzenleBaslat(item) },
      { text: "Sil", style: "destructive", onPress: () => silmeOnayi(item.id) },
      { text: "Vazgeç", style: "cancel" }
    ]);
  };

  const silmeOnayi = (id: string) => {
    Alert.alert("Emin misiniz?", "Bu işlem kalıcı olarak silinecektir.", [
      { text: "İptal", style: "cancel" },
      {
        text: "Evet, Sil", style: "destructive", onPress: () => {
          const yeniListe = harcamalar.filter(item => item.id !== id);
          setHarcamalar(yeniListe);
          verileriKaydet(yeniListe);
        }
      }
    ]);
  };

  const gosterilecekHarcamalar = harcamalar.filter(islem => {
    if (aktifFiltre === 'hepsi') return true;
    return islem.tip === aktifFiltre;
  });

  const renderItem = ({ item }: { item: Harcama }) => (
    <TouchableOpacity style={styles.harcamaKarti} onLongPress={() => islemSecenekleri(item)} activeOpacity={0.7}>
      <Text style={styles.harcamaBaslik}>{item.baslik}</Text>
      <Text style={[styles.harcamaTutar, { color: item.tip === 'gelir' ? '#27ae60' : '#e74c3c' }]}>
        {item.tip === 'gelir' ? '+' : '-'}{item.tutar} ₺
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.bakiyeKarti}>
        <Text style={styles.bakiyeBaslik}>Güncel Bakiye</Text>
        <Text style={[styles.bakiyeMiktar, { color: guncelBakiye >= 0 ? '#4cd137' : '#e74c3c' }]}>{guncelBakiye} ₺</Text>
      </View>

      <View style={styles.ozetAlani}>
        <View style={[styles.ozetKarti, { borderBottomColor: '#27ae60', borderBottomWidth: 3 }]}>
          <Text style={styles.ozetBaslik}>Toplam Gelir</Text>
          <Text style={[styles.ozetMiktar, { color: '#27ae60' }]}>+ {toplamGelir} ₺</Text>
        </View>
        <View style={[styles.ozetKarti, { borderBottomColor: '#e74c3c', borderBottomWidth: 3 }]}>
          <Text style={styles.ozetBaslik}>Toplam Gider</Text>
          <Text style={[styles.ozetMiktar, { color: '#e74c3c' }]}>- {toplamGider} ₺</Text>
        </View>
      </View>

      <View style={styles.filtreAlani}>
        <TouchableOpacity style={[styles.filtreButonu, aktifFiltre === 'hepsi' && styles.filtreAktif]} onPress={() => setAktifFiltre('hepsi')}>
          <Text style={[styles.filtreMetni, aktifFiltre === 'hepsi' && styles.filtreMetniAktif]}>Tümü</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.filtreButonu, aktifFiltre === 'gelir' && styles.filtreAktif]} onPress={() => setAktifFiltre('gelir')}>
          <Text style={[styles.filtreMetni, aktifFiltre === 'gelir' && styles.filtreMetniAktif]}>Gelirler</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.filtreButonu, aktifFiltre === 'gider' && styles.filtreAktif]} onPress={() => setAktifFiltre('gider')}>
          <Text style={[styles.filtreMetni, aktifFiltre === 'gider' && styles.filtreMetniAktif]}>Giderler</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.listeAlani}>
        <FlatList
          data={gosterilecekHarcamalar}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          ListEmptyComponent={<Text style={styles.bosListeYazisi}>Bu kategoride işlem bulunmuyor.</Text>}
          showsVerticalScrollIndicator={false}
        />
      </View>

      <TouchableOpacity style={styles.eklemeButonu} onPress={() => setModalGorunur(true)}>
        <Text style={styles.eklemeButonuText}>+</Text>
      </TouchableOpacity>

      <Modal animationType="slide" transparent={true} visible={modalGorunur}>
        <View style={styles.modalArkaplan}>
          <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.modalKutu}>
            <Text style={styles.modalBaslik}>{duzenlenenId ? "İşlemi Düzenle" : "Yeni İşlem Ekle"}</Text>
            <TextInput style={styles.input} placeholder="Başlık" value={yeniBaslik} onChangeText={setYeniBaslik} />
            <TextInput style={styles.input} placeholder="Tutar" keyboardType="numeric" value={yeniTutar} onChangeText={setYeniTutar} />
            <View style={styles.tipSecimAlani}>
              <TouchableOpacity style={[styles.tipButonu, yeniTip === 'gider' && styles.tipButonuAktifGider]} onPress={() => setYeniTip('gider')}>
                <Text style={[styles.tipButonuText, yeniTip === 'gider' && styles.tipButonuTextAktif]}>Gider</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.tipButonu, yeniTip === 'gelir' && styles.tipButonuAktifGelir]} onPress={() => setYeniTip('gelir')}>
                <Text style={[styles.tipButonuText, yeniTip === 'gelir' && styles.tipButonuTextAktif]}>Gelir</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.modalAksiyonAlani}>
              <TouchableOpacity style={[styles.aksiyonButonu, styles.iptalButonu]} onPress={formuTemizle}>
                <Text style={styles.aksiyonButonuText}>Vazgeç</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.aksiyonButonu, styles.kaydetButonu]} onPress={islemKaydet}>
                <Text style={styles.aksiyonButonuText}>{duzenlenenId ? "Güncelle" : "Kaydet"}</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f6fa', paddingTop: 50 },
  bakiyeKarti: { backgroundColor: '#2f3640', marginHorizontal: 20, marginTop: 10, marginBottom: 15, padding: 25, borderRadius: 15, alignItems: 'center', elevation: 5 },
  bakiyeBaslik: { color: '#dcdde1', fontSize: 14, marginBottom: 5 },
  bakiyeMiktar: { fontSize: 32, fontWeight: 'bold' },
  ozetAlani: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, marginBottom: 15 },
  ozetKarti: { backgroundColor: '#fff', flex: 1, padding: 15, borderRadius: 10, marginHorizontal: 5, alignItems: 'center', elevation: 2 },
  ozetBaslik: { fontSize: 12, color: '#7f8c8d', marginBottom: 5, fontWeight: 'bold' },
  ozetMiktar: { fontSize: 16, fontWeight: 'bold' },
  filtreAlani: { flexDirection: 'row', justifyContent: 'center', paddingHorizontal: 20, marginBottom: 15 },
  filtreButonu: { paddingVertical: 8, paddingHorizontal: 15, borderRadius: 20, backgroundColor: '#dcdde1', marginHorizontal: 5 },
  filtreAktif: { backgroundColor: '#2f3640' },
  filtreMetni: { fontSize: 13, fontWeight: 'bold', color: '#7f8c8d' },
  filtreMetniAktif: { color: '#fff' },
  listeAlani: { flex: 1, paddingHorizontal: 20 },
  harcamaKarti: { backgroundColor: '#fff', padding: 20, borderRadius: 10, flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10, elevation: 3 },
  harcamaBaslik: { fontSize: 16, color: '#2f3640' },
  harcamaTutar: { fontSize: 16, fontWeight: 'bold' },
  bosListeYazisi: { textAlign: 'center', color: '#7f8c8d', marginTop: 20 },
  eklemeButonu: { position: 'absolute', bottom: 30, right: 30, backgroundColor: '#4cd137', width: 60, height: 60, borderRadius: 30, justifyContent: 'center', alignItems: 'center', elevation: 10 },
  eklemeButonuText: { color: '#fff', fontSize: 35, fontWeight: 'bold' },
  modalArkaplan: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalKutu: { backgroundColor: '#fff', borderTopLeftRadius: 25, borderTopRightRadius: 25, padding: 30, paddingBottom: 50 },
  modalBaslik: { fontSize: 20, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#dcdde1', borderRadius: 10, padding: 15, marginBottom: 15, fontSize: 16 },
  tipSecimAlani: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  tipButonu: { flex: 1, padding: 12, borderWidth: 1, borderColor: '#dcdde1', borderRadius: 10, alignItems: 'center', marginHorizontal: 5 },
  tipButonuAktifGider: { backgroundColor: '#e74c3c', borderColor: '#e74c3c' },
  tipButonuAktifGelir: { backgroundColor: '#27ae60', borderColor: '#27ae60' },
  tipButonuText: { fontSize: 14, fontWeight: 'bold', color: '#7f8c8d' },
  tipButonuTextAktif: { color: '#fff' },
  modalAksiyonAlani: { flexDirection: 'row', justifyContent: 'space-between' },
  aksiyonButonu: { flex: 1, padding: 15, borderRadius: 10, alignItems: 'center', marginHorizontal: 5 },
  iptalButonu: { backgroundColor: '#f1f2f6' },
  kaydetButonu: { backgroundColor: '#2f3640' },
  aksiyonButonuText: { fontWeight: 'bold', color: '#fff' }
});