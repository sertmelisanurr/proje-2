// Quiz sorularını tutan veri yapısı
const quizSorulari = [
  {
    soru: "Premium paket hangi avantajı sunar?",
    secenekler: [
      "Ücretsiz kargo",
      "Daha az ürün",
      "Kargo yok",
      "Sadece indirim"
    ],
    dogruCevap: 0,
    puan: 50
  },
  {
    soru: "Trend pakette kaç parça kombin vardır?",
    secenekler: [
      "3",
      "5",
      "1",
      "10"
    ],
    dogruCevap: 1,
    puan: 50
  }
];
// HTML elemanlarını seçiyoruz
const baslatEkrani = document.getElementById("start-screen");
const quizEkrani = document.getElementById("quiz-screen");
const baslatButonu = document.getElementById("start-btn");
const feedbackText = document.getElementById("feedback");

// Başlat butonuna tıklama olayı
// Eğer start butonu bu sayfada varsa çalıştır
if (baslatButonu) {

  baslatButonu.addEventListener("click", function () {

    // başlangıç ekranını gizle
    baslatEkrani.style.display = "none";

    // quiz ekranını göster
    quizEkrani.style.display = "block";

    // ilk soruyu göster
    soruGoster();

  });

}

let mevcutSoruIndex = 0;
let toplamPuan = 0;
let quizIndirimiAktif = false;



// HTML alanlarını seçiyoruz
const soruMetni = document.getElementById("question-text");
const cevapAlani = document.getElementById("answers");
const progressText = document.getElementById("progress");

// Soruyu ekrana yazdıran fonksiyon
function soruGoster() {
  const soru = quizSorulari[mevcutSoruIndex];

progressText.textContent =
  "Soru " + (mevcutSoruIndex + 1) + " / " + quizSorulari.length;

  soruMetni.textContent = soru.soru;
  cevapAlani.innerHTML = "";

  soru.secenekler.forEach((secenek, index) => {
    const btn = document.createElement("button");
    btn.textContent = secenek;

    btn.addEventListener("click", () => cevapKontrol(index));

    cevapAlani.appendChild(btn);
  });
}
// Kullanıcı cevabını kontrol eden fonksiyon
function cevapKontrol(secimIndex) {
  const soru = quizSorulari[mevcutSoruIndex];

  const buttons = document.querySelectorAll("#answers button");

  buttons.forEach((btn, index) => {
    if (index === soru.dogruCevap) {
      btn.style.background = "green";
      btn.style.color = "white";
    }

    if (index === secimIndex && secimIndex !== soru.dogruCevap) {
      btn.style.background = "red";
      btn.style.color = "white";
    }

    btn.disabled = true;
  });

  if (secimIndex === soru.dogruCevap) {
  toplamPuan += soru.puan;
  feedbackText.textContent = "✅ Doğru cevap!";
} else {
  feedbackText.textContent = "❌ Yanlış cevap!";
}

  setTimeout(() => {
  feedbackText.textContent = "";

  mevcutSoruIndex++;

  if (mevcutSoruIndex < quizSorulari.length) {
    soruGoster();
  } else {
    quizBitir();
  }

}, 1000);
}

// Quiz bitince sonucu göster
function quizBitir() {
  quizEkrani.style.display = "none";
  const sonucEkrani = document.getElementById("result-screen");
  const skorYazisi = document.getElementById("score-text");

  sonucEkrani.style.display = "block";
  skorYazisi.textContent = "Toplam Puan: " + toplamPuan;

const maxPuan = quizSorulari.reduce((t, s) => t + s.puan, 0);

if (toplamPuan === maxPuan) {
  quizIndirimiAktif = true;
  skorYazisi.textContent += " 🎉 %10 indirim kazandınız!";
}

}
// Quiz reset fonksiyonu
const restartBtn = document.getElementById("restart-btn");

// Eğer restart butonu varsa çalıştır
if (restartBtn) {

  restartBtn.addEventListener("click", function () {

    // quiz değerlerini sıfırla
    mevcutSoruIndex = 0;
    toplamPuan = 0;
    quizIndirimiAktif = false;

    // ekranları ayarla
    document.getElementById("result-screen").style.display = "none";
    baslatEkrani.style.display = "block";

  });

}

// Hesaplama fonksiyonu
function hesapla() {

  const adet = Number(document.getElementById("adet").value);
  const premium = document.getElementById("premium").checked;

  let toplam = adet * 150;

  // toplu alım indirimi
  if (adet >= 5) {
    toplam *= 0.9;
  }

  // premium ekleme
  if (premium) {
    toplam += 200;
  }

  // quiz indirimi
  if (quizIndirimiAktif) {
    toplam *= 0.9;
  }

  document.getElementById("toplam").textContent = toplam;
}

// Butona basınca hesapla
const hesaplaBtn = document.getElementById("hesaplaBtn");

if (hesaplaBtn) {
  hesaplaBtn.addEventListener("click", hesapla);
}

// Otomatik hesaplama
document.getElementById("adet")
  ?.addEventListener("input", hesapla);

document.getElementById("premium")
  ?.addEventListener("change", hesapla);
