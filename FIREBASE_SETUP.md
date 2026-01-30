# Firebase Kurulumu ve Entegrasyonu

Projeyi kendi Firebase hesabına bağlamak için adım adım yapman gerekenler aşağıda.

## 1. Firebase Projesi Oluşturma
1.  [Firebase Console](https://console.firebase.google.com/) adresine git.
2.  "**Add project**" (Proje ekle) butonuna tıkla.
3.  Projeye bir isim ver (örn: `KibeleWorkspace`).
4.  Google Analytics'i kapatabilirsin (isteğe bağlı) ve **Create Project** de.

## 2. Web Uygulaması Ekleme
1.  Proje paneline gelince, ana sayfadaki yuvarlak ikonlardan **Web** ikonuna (`</>`) tıkla.
2.  App nickname olarak `Kibele App` yaz.
3.  "**Also set up Firebase Hosting**" seçeneğini **İŞARETLEME** (GitHub Pages kullanıyoruz).
4.  **Register app** butonuna bas.

## 3. Config Bilgilerini Alma
Sana bir kod bloğu verecek (`const firebaseConfig = { ... }`). O bloktaki değerleri kopyala. Değerler şuna benzer olacak:
- `apiKey`: "AIzaTy..."
- `authDomain`: "kibele-xyz.firebaseapp.com"
- `projectId`: "kibele-xyz"
- `storageBucket`: "kibele-xyz.appspot.com"
- `messagingSenderId`: "12345..."
- `appId`: "1:1234..."

## 4. Servisleri Aktif Etme
Firebase panelinden sol menüyü kullan:

### A. Authentication (Giriş Sistemi)
1.  **Build** -> **Authentication** menüsüne git.
2.  **Get Started** de.
3.  **Sign-in method** sekmesinde **Email/Password** seçeneğine tıkla.
4.  **Enable** yap ve **Save** de. (Passwordless link'i açmana gerek yok).

### B. Cloud Firestore (Veritabanı)
1.  **Build** -> **Firestore Database** menüsüne git.
2.  **Create Database** butonuna bas.
3.  Location olarak sana yakın bir yer seç (örn: `eur3` - Europe West).
4.  Güvenlik kuralları sorulursa **Start in test mode** seç (Geliştirme için).
    *   *Uyarı: Test modu herkese okuma/yazma izni verir. İleride kuralları güncellemek gerekir.*

### C. Storage (Dosya Saklama - İsteğe Bağlı)
1.  **Build** -> **Storage** menüsüne git.
2.  **Get Started** -> **Start in test mode** -> **Done**.

## 5. Projeye Bağlama (.env Dosyası)
Bu bilgileri bilgisayarında çalıştırmak için projenin ana klasöründe `.env` adında bir dosya oluştur ve şunları yapıştır (kendi değerlerinle değiştir):

```env
VITE_FIREBASE_API_KEY=senin_api_key_değerin
VITE_FIREBASE_AUTH_DOMAIN=senin_auth_domain_değerin
VITE_FIREBASE_PROJECT_ID=senin_project_id_değerin
VITE_FIREBASE_STORAGE_BUCKET=senin_storage_bucket_değerin
VITE_FIREBASE_MESSAGING_SENDER_ID=senin_messaging_sender_id_değerin
VITE_FIREBASE_APP_ID=senin_app_id_değerin
```

## 6. GitHub'a Ekleme (Deploy İçin)
GitHub Actions ile deploy ederken bu bilgilerin gizli kalması lazım.

1.  GitHub repona git: `https://github.com/dgdfurkan/Kibele`
2.  **Settings** -> **Secrets and variables** -> **Actions** menüsüne tıkla.
3.  "**New repository secret**" butonuna basarak yukarıdaki her bir değeri tek tek ekle:
    *   Name: `VITE_FIREBASE_API_KEY` / Secret: `AIza...`
    *   Name: `VITE_FIREBASE_AUTH_DOMAIN` / Secret: `...`
    *   (Diğer 4 tanesi için de aynısını yap)

Bu kadar! Artık site deploy olduğunda senin Firebase'ini kullanacak.
