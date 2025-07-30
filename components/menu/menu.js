import { menuElemanlari } from "./../../resources.js";

/*
Adım 1: MenuBuilder component fonksiyonu yazmak
Stringlerden oluşan bir arrayden, bir menü oluşturmak için MenuBuilder adında bir component (fonksiyon) yazın.

MenuBuilder aşağıdaki yapıya sahip bir içerik oluşturmalı ve return etmeli:

<div class="menu">
  <ul>
    {... Adım 2 ...}
  </ul>
</div>
*/

// Ornek Arr = [Anasayfa,Mağaza,İletişim] gibi

/*function menuBuilderComp(menuArray) {
  const divTag = document.createElement("div");
  divTag.classList.add("menu");
  const ulTag = document.createElement("ul");

  const yapi = divTag.appendChild(ulTag);
  return yapi;
}*/

/*
Adım 2: Menü ögelerini oluşturmak
MenuBuilder fonksiyonu, parametre olarak aldığı arrayin her bir elemanı için <li> oluşturmalı ve bunları yukarıdaki <ul> içine eklemeli.
*/

/*function menuBuilderComp(menuArray) {
  const divTag = document.createElement("div");
  divTag.classList.add("menu");
  const ulTag = document.createElement("ul");

  menuArray.forEach((e) => {
    const liTag = document.createElement("li");
    liTag.textContent = e;
    ulTag.appendChild(liTag);
  });

  const yapi = divTag.appendChild(ulTag);
  return yapi;
}*/

/*
Adım 3: Menüyü açıp kapatmak
index.html içindeki menu-button classına sahip elemana tıklandığında, MenuBuilder içinde oluşturduğunuz menu classına sahip elemanda 'isOpen' classı varsa çıkarmalı, yoksa eklemeli. (Yani isOpen classını toggle etmeli)
*/

/*function menuBuilderComp(menuArray) {
  const divTag = document.createElement("div");
  divTag.classList.add("menu");
  const ulTag = document.createElement("ul");
  const menu_button = document.querySelector(".menu-button");

  menu_button.addEventListener("click", () => {
    divTag.classList.toggle("isOpen");
  });

  menuArray.forEach((e) => {
    const liTag = document.createElement("li");
    liTag.textContent = e;
    ulTag.appendChild(liTag);
  });

  const yapi = divTag.appendChild(ulTag);
  return yapi;
}*/

/*
Adım 4: MenuBuilder'ı kullanmak
MenuBuilder fonksiyonu ve resouces.js dosyasından gelen menuElemanlari arrayini kullanarak oluşturduğunuz menüyü, header classına sahip elemana ekleyin.
*/

function menuBuilderComp(menuArray) {
  const divTag = document.createElement("div");
  divTag.classList.add("menu");
  const ulTag = document.createElement("ul");
  const menu_button = document.querySelector(".menu-button");

  menu_button.addEventListener("click", () => {
    divTag.classList.toggle("isOpen");
  });

  menuArray.forEach((e) => {
    const liTag = document.createElement("li");
    liTag.textContent = e;
    ulTag.appendChild(liTag);
  });

  const yapi = divTag.appendChild(ulTag);
  return divTag;
}

//menuBuilderComp(menuElemanlari);
const headEkle = document
  .querySelector(".header")
  .appendChild(menuBuilderComp(menuElemanlari));

/*
Not 1: İlk 3 adım MenuBuilder içinde yapılmalı.
Not 2: MenuBuilder fonksiyonunda oluşturduklarınızı return etmeyi unutmayın.
*/
