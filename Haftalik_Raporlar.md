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

---