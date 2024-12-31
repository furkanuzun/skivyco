import React from "react";

export default function page() {
  return (
    <div className="container mx-auto px-4 md:px-0 py-10">
      <section>
        <h1>Skivy Uygulaması Gizlilik Politikası</h1>
        <h2>1. Giriş</h2>
        <p>
          Skivy uygulamasına hoş geldiniz! Cilt sağlığınız ve güzelliğiniz bizim
          için önemlidir. Bu Gizlilik Politikası, Skivy uygulaması ("Uygulama")
          tarafından toplanan bilgilerin nasıl kullanıldığını, paylaşıldığını ve
          korunduğunu açıklar.
        </p>
        <h2>2. Toplanan Bilgiler</h2>
        <p>
          Uygulamamızı kullanımınız sırasında aşağıdaki bilgileri toplamaktayız:
        </p>
        <ul>
          <li>Ad ve soyad</li>
          <li>Cinsiyet</li>
          <li>Doğum tarihi</li>
          <li>Cilt tipi</li>
          <li>Telefon numarası</li>
          <li>Uygulama içinden çekilen anlık fotoğraflar</li>
        </ul>
        <h2>3. Bilgilerin Kullanımı</h2>
        <p>Toplanan bilgiler, aşağıdaki amaçlarla kullanılabilir:</p>
        <ul>
          <li>Uygulama içi profil oluşturma</li>
          <li>Kişiselleştirilmiş cilt bakım önerileri sunma</li>
          <li>Kullanıcı destek hizmetleri sağlama</li>
          <li>Uygulama güncellemeleri ve bilgilendirmeler gönderme</li>
          <li>Pazarlama ve promosyon teklifleri sunma (kullanıcı onayı ile)</li>
        </ul>
        <h2>4. Bilgilerin Paylaşımı</h2>
        <p>
          Kullanıcı bilgileri, yalnızca kullanıcı onayı ile ve aşağıdaki
          durumlar dışında üçüncü taraflarla paylaşılmaz:
        </p>
        <ul>
          <li>Yasal zorunluluklar gereği</li>
          <li>Kullanıcının açık rızası ile</li>
          <li>
            Kullanıcının haklarını veya güvenliğini korumak için gerekli
            olduğunda
          </li>
        </ul>
        <h2>5. Veri Güvenliği</h2>
        <p>
          Kullanıcı bilgilerinin güvenliğini sağlamak için uygun güvenlik
          önlemleri alınmıştır. Ancak, internet üzerinden veri iletiminin
          tamamen güvenli olmadığını hatırlatırız.
        </p>
        <h2>6. Çocukların Gizliliği</h2>
        <p>
          Uygulama, 13 yaşın altındaki çocuklardan bilgi toplamayı amaçlamaz
          veya izin vermez.
        </p>
        <h2>7. Gizlilik Politikası Değişiklikleri</h2>
        <p>
          Bu gizlilik politikası, hizmetlerimizi ve yasal düzenlemeleri
          yansıtacak şekilde zaman zaman güncellenebilir.
        </p>
        <h2>8. İletişim</h2>
        <p>
          Gizlilik uygulamalarımız hakkında sorularınız varsa, lütfen{" "}
          <a href="mailto:[email protected]">[email protected]</a> adresinden
          bize ulaşın.
        </p>
      </section>
      <div className="text-center">skivy.co © 2024. Tüm hakları saklıdır.</div>
    </div>
  );
}
