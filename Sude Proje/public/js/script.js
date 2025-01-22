// Başlangıç JSON verisi
const veri = {
  "kullanıcılar": [
      { "id": 1, "isim": "Sude", "yas": 21 }
  ]
};

// Kullanıcıları listele
function listele() {
  const liste = document.getElementById('kullaniciListesi');
  liste.innerHTML = ''; // Önceki listeyi temizle

  veri.kullanıcılar.forEach(kullanici => {
      const li = document.createElement('li');
      li.textContent = `${kullanici.isim} - ${kullanici.yas} yaşında`;

      // Silme butonu ekle
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Sil';
      deleteButton.style.marginLeft = '10px';
      deleteButton.onclick = () => sil(kullanici.id);

      li.appendChild(deleteButton);
      liste.appendChild(li);
  });
}

// Kullanıcı ekle
document.getElementById('addButton').onclick = () => {
  const isim = document.getElementById('isim').value;
  const yas = document.getElementById('yas').value;

  if (isim && yas) {
      const yeniKullanici = {
          id: veri.kullanıcılar.length + 1,
          isim: isim,
          yas: parseInt(yas)
      };
      veri.kullanıcılar.push(yeniKullanici);
      listele(); // Listeyi yeniden güncelle
      document.getElementById('isim').value = ''; // Formu temizle
      document.getElementById('yas').value = ''; // Formu temizle
  } else {
      alert('Lütfen tüm alanları doldurun!');
  }
};

// Kullanıcı sil
function sil(id) {
  veri.kullanıcılar = veri.kullanıcılar.filter(kullanici => kullanici.id !== id);
  listele(); // Listeyi yeniden güncelle
}

// Sayfa yüklendiğinde listeyi göster
window.onload = () => {
  listele();
};


// Modal oluşturma fonksiyonu
function openModal(language, level) {
  // Modal'ı oluştur
  const modal = document.createElement("div");
  modal.classList.add("modal");

  // Modal içeriğini oluştur
  modal.innerHTML = `
      <div class="modal-content">
          <span class="close-btn">&times;</span>
          <h2>${language}</h2>
          <p>Yetenek Düzeyim: ${level}</p>
      </div>
  `;

  // Modal'ı popup-container'a ekle
  document.getElementById("popup-container").appendChild(modal);

  // Modal'ı göster
  modal.style.display = "flex";

  // Kapatma butonuna tıklama olayını ekle
  modal.querySelector(".close-btn").addEventListener("click", function() {
      modal.remove();
  });

  // Modal dışında bir yere tıklanırsa, modal'ı kapat
  window.addEventListener("click", function(event) {
      if (event.target === modal) {
          modal.remove();
      }
  });
}

// Bar'lara tıklanabilir olayları ekle
const bars = document.querySelectorAll(".bar");
bars.forEach(function(bar) {
  bar.addEventListener("click", function() {
      const language = bar.getAttribute("data-language");
      const level = bar.getAttribute("data-level");
      openModal(language, level);
  });
});

