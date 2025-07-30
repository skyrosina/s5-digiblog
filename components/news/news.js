// Haberleri üretmek için aşağıdaki newsData objesini kullanacağız. Önce inceleyin.
import { newsData } from "./../../resources.js";

const sampleNewsItem = {
  baslik: "örnek başlık",
  tarih: "11 Kasım 2026",
  ilkParagraf: "Örnek paragraf 1",
  ikinciParagraf: "Örnek paragraf 2",
  ucuncuParagraf: "Örnek paragraf 3",
};

/*
Adım 1: NewsBuilder component fonksiyonu yazmak
Yazacağınız NewsBuilder fonksiyonu, yukarıdaki sampleNewsItem yapısındaki bir objeyi parametre olarak almalı ve alttaki yapıya sahip bir içerik oluşturup return etmeli:

<div class="article">
  <h2>{haber başlığı}</h2>
  <p class="date">{haber tarihi}</p>

  {üç ayrı paragraf elementi}

  <button class="expandButton">+</button>
</div>

*/

/*
Adım 2:
Oluşturulan expandButton classına sahip elemana tıklandığında, içinde bulunduğu article classına sahip elemanda isOpen classı yoksa eklemeli, varsa çıkarmalı.
*/

/*
Adım 3:
newsData, sampleNewsItem yapısına benzeyen objelerden oluşan bir array ve sayfada göstermek istediğimiz haberleri içeriyor.
newsData'nın her bir elemanını NewsBuilder ile kullanmak için bir döngü yazın. Döngü her çalıştığında:
- o anki eleman ve NewsBuilder kullanılarak içerik hazırlanmalı,
- hazırlanan içerik, index.html'de bulunan articleList classına sahip elemanın içine yerleştirilmeli.
*/

/*
Not 1: İlk 2 adım NewsBuilder içinde yapılmalı.
Not 2: NewsBuilder fonksiyonunda oluşturduklarınızı return etmeyi unutmayın.
*/

function NewsBuilder(newsObj) {
  const divTag = document.createElement("div");
  divTag.classList.add("article");

  const h2Tag = document.createElement("h2");
  h2Tag.textContent = newsObj.baslik;

  const dateTag = document.createElement("p"); // ✅ Doğru tarih elementi
  dateTag.classList.add("date");
  dateTag.textContent = newsObj.tarih;

  const p1tag = document.createElement("p");
  p1tag.textContent = newsObj.ilkParagraf;

  const p2tag = document.createElement("p");
  p2tag.textContent = newsObj.ikinciParagraf;

  const p3tag = document.createElement("p");
  p3tag.textContent = newsObj.ucuncuParagraf;

  const btn = document.createElement("button");
  btn.classList.add("expandButton");
  btn.textContent = "+";

  btn.addEventListener("click", () => {
    divTag.classList.toggle("isOpen");
  });

  divTag.appendChild(h2Tag);
  divTag.appendChild(dateTag);
  divTag.appendChild(p1tag);
  divTag.appendChild(p2tag);
  divTag.appendChild(p3tag);
  divTag.appendChild(btn);

  return divTag;
}

const articleListElement = document.querySelector(".articleList");

newsData.forEach((newsItem) => {
  const article = NewsBuilder(newsItem);
  articleListElement.appendChild(article);
});
