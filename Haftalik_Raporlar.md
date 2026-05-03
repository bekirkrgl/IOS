# Haftalık İlerleme Raporları

## 1. ve 2. Hafta: Hazırlık ve Fikir Aşaması
Hocam selamlar, bu ilk iki hafta boyunca projenin genel mantığı üzerine çalıştım. Dersteki işleyişi takip ederek React Native ve Expo ekosistemini tanımaya çalıştım. Uygulamanın temel özelliklerini (gelir-gider takibi, bakiye gösterimi vb.) kağıt üzerinde planladım ve teslim etmemiz gereken ön raporu hazırladım.

## 3. Hafta: 
Hocam bu hafta ailevi bir cenaze durumumuz olduğu için maalesef derse katılım sağlayamadım ve proje üzerinde herhangi bir teknik çalışma yapamadım. Bu sebeple 3. haftayı mecburi bir arayla kapatmak durumunda kaldım.

## 4. Hafta: Proje Kurulumu ve Arayüzle İlk Tanışma
Cenaze sonrası bu hafta projeye hızlıca giriş yaptım.
* Önceki haftalarda planladığım taslağı koda dökmek için Expo kurulumunu yaptım. Terminalde aldığım birkaç "yol (path)" hatasını çözdükten sonra uygulamayı ayağa kaldırdım.
* Ana ekran tasarımını bitirdim; bakiye kartı ve harcama listesi (FlatList) şu an görsel olarak hazır. 
* Gelir ve giderlerin renklerini (yeşil/kırmızı) ayırarak kullanıcı dostu bir yapı kurdum.

**Not:** Hocam tasarım detaylarında ve hata çözümlerinde yapay zeka desteği aldım ancak her satır kodun mantığını kavrayarak ilerliyorum.

**İlerleme Videom (YouTube):**
👉 [https://www.youtube.com/watch?v=_fmV8uxt_Ec]

## 5. Hafta: Yeşil butonu calıstırmak
Hocam merhabalar, bu hafta uygulamayı sadece statik bir tasarım olmaktan çıkarıp, kullanıcıyla etkileşime giren canlı bir yapıya bürüdüm.

* Sağ alttaki yeşil artı butonuna işlev kazandırarak, basıldığında aşağıdan kayarak açılan şık bir Modal (pencere) yapısı kurdum.
* Kullanıcının harcama başlığı ve tutarı girebilmesi için `TextInput` bileşenlerini entegre ettim. Tutar kısmında klavyenin sadece rakamlarla açılmasını ayarladım.
* İşlemin "Gelir" mi yoksa "Gider" mi olduğunu seçebileceğimiz butonlar ekledim. Seçime göre kırmızı/yeşil renk alıyorlar.
* En önemli kısım olarak, `useState` hook'unu kullanarak "Kaydet" dediğimiz anda girdiğimiz verinin ana ekrandaki listeye anında eklenmesini sağladım.
* Klavye açıldığında giriş alanlarının altta kalmaması için  `KeyboardAvoidingView` yapısını öğrenip kullandım.

**İlerleme Videom (YouTube):**
👉 [https://youtu.be/5jzyjYi_ZeM]


## 6. Hafta: Veri Kalıcılığı (AsyncStorage) ve Dinamik Bakiye
Hocam selamlar, bu hafta projenin en kritik aşamalarından birini tamamladım ve uygulamaya "hafıza" yeteneği kazandırdım. Artık verilerimiz kaybolup gitmiyor , kaydediliyor.

* Projeye `@react-native-async-storage/async-storage` kütüphanesini kurdum.
* **Veri Kaydetme:** Kullanıcı yeni işlem eklediğinde, harcama listesini `JSON.stringify` ile string formatına çevirip telefonun yerel hafızasına yazdıran bir yapı kurdum.
* **Veri Okuma:** Uygulama ilk açıldığında `useEffect` hook'u sayesinde hafızadaki veriler kontrol ediliyor, varsa `JSON.parse` ile tekrar diziye çevrilip ekrana basılıyor. (Uygulama kapatılıp açılsa bile veriler korunuyor).
* **Bonus (Dinamik Bakiye):** Üst kısımdaki bakiye kartını sabit olmaktan çıkardım. Listeye gelir/gider eklendikçe `useEffect` yardımıyla toplam bakiyeyi otomatik hesaplayan bir fonksiyon (`bakiyeHesapla`) ekledim.


**İlerleme Videom (YouTube):**
👉 [https://youtu.be/_V9J_HBMnQQ]

## 7. Hafta: Akademik Ara (Vize Haftası)
Hocam selamlar, bu hafta üniversitemizdeki vize sınavları nedeniyle projeye teknik bir ekleme yapamadım. Ağırlıklı olarak sınavlara odaklandığım için 7. haftayı pas geçmek durumunda kaldım.

---

## 8. Hafta: Veri Silme ve Gelişmiş Özet İstatistikleri (Fark Kapatma)
Vizelerin ardından projeye hızlı bir dönüş yaptım. Geçen hafta kaybettiğim zamanı telafi etmek amacıyla bu hafta uygulamaya **iki önemli özellik** birden ekledim.

**1. Veri Silme (Delete) Özelliği:**
* Listelerdeki elemanlara "basılı tutma" (Long Press) yeteneği kazandırdım. Kullanıcı harcamanın üzerine basılı tuttuğunda `Alert` bileşeni ile güvenli bir onay penceresi çıkıyor.
* Silinen veri `filter` metodu ile diziden çıkarılıyor ve anında `AsyncStorage` ile telefon hafızasından da kalıcı olarak siliniyor.

**2. Gelişmiş Özet İstatistikleri:**
* Sadece ana bakiyeyi göstermenin yetersiz olduğunu fark ettim. Ana bakiyenin altına **"Toplam Gelir"** ve **"Toplam Gider"** detaylarını ayrı ayrı gösteren iki yeni istatistik kartı tasarladım.
* `bakiyeHesapla` fonksiyonunu güncelleyerek, listedeki verileri tipine göre ayrıştırıp bu iki karta dinamik olarak yansıtmasını sağladım. Hem ekleme hem silme anında tüm istatistikler eşzamanlı olarak güncelleniyor.

**İlerleme Videom (YouTube):**
👉 [https://youtu.be/XyHRfoj5A-8]

## 9. Hafta: Form Validasyonları, Hata Kontrolleri ve Veri Güncelleme (Update) Entegrasyonu
Bu hafta, proje planında belirtildiği üzere uygulamanın kullanıcı deneyimini (UI/UX) artıracak güvenlik düzenlemelerine odaklanılmıştır. Buna ek olarak, pazartesi günü yapılan proje gösteriminde Abidin Hocamın tavsiyesi üzerine sisteme plan dışı ekstra bir modül daha entegre edilmiştir.

* **Form Validasyonları (Hata Yönetimi):** Uygulamaya boş veri girişini ve mantıksız tutarların (örn. 0 veya eksi değerler) girilmesini engelleyen doğrulama algoritmaları yazıldı. Hatalı girişlerde kullanıcıyı uyaran `Alert` mekanizmaları kuruldu.
* **Veri Düzenleme (Update) Özelliği:** Abidin Hoca'nın geri bildirimi doğrultusunda uygulamaya "Düzenleme" yeteneği kazandırıldı. Kullanıcılar artık hatalı girdikleri kayıtları silmek zorunda kalmadan, mevcut form üzerinden güncelleyebilmekte ve JavaScript'in `map` metodu ile bu güncellemeler anında `AsyncStorage` üzerinde kalıcı hale gelerek bakiye istatistiklerine yansımaktadır.

**İlerleme Videom (YouTube):**
👉 [https://youtu.be/9VfXmdV6FVE]