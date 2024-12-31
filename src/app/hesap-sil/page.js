"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import Image from "next/image";

export default function AccountDeleted() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [isDeleted, setIsDeleted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Burada hesap silme API'si çağrılabilir
    setIsDeleted(true);
  };

  useEffect(() => {
    if (isDeleted) {
      const timer = setTimeout(() => {
        router.push("/");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isDeleted, router]);

  if (isDeleted) {
    return (
      <div className={styles.container}>
        <Image
          src="/icon.png"
          alt="Skivy Logo"
          width={200}
          height={200}
          className="mx-auto mb-10"
        />
        <div className={styles.content}>
          <h1>Hesap Silme Talebiniz Alındı</h1>
          <p>
            Talebiniz sistemimize iletildi. En kısa sürede işleme alınacaktır.
          </p>
          <p>5 saniye içinde ana sayfaya yönlendirileceksiniz...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Image
        src="/icon.png"
        alt="Skivy Logo"
        width={200}
        height={200}
        className="mx-auto mb-10"
      />
      <div className={styles.content}>
        <h1>Hesap Silme Talebi</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="email">
              Uygulamaya Kayıt Olduğunuz Mail Adresi
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="fullName">Adınız Soyadınız</label>
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>
          <button type="submit" className={styles.deleteButton}>
            Hesap Silme İşlemini Başlat
          </button>
        </form>
      </div>
    </div>
  );
}
