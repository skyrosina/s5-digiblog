import { expect, test } from "@playwright/test";
import { menuElemanlari, newsData } from "./../resources";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import crypto from "crypto";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
function getNormalizedHtmlHash() {
  const html = path.resolve(__dirname, "../index.html");
  const htmlContent = fs.readFileSync(html, "utf-8");
  const normalized = htmlContent
    .replace(/\s+/g, " ")
    .replace(/>\s+</g, "><")
    .trim();
  return crypto.createHash("sha256").update(normalized).digest("hex");
}

let context;

test.beforeAll(async ({ browser }) => {
  context = await browser.newContext();
});

test.afterAll(async () => {
  await context.close();
});

test("article sayısı doğru mu?", async ({ page }) => {
  await page.goto("http://localhost:3003");

  const articles = await page.locator(".articleList > .article");
  await expect(articles).toHaveCount(newsData.length);
  await page.close();
});

test("her article içinde gerekli elementler bulunuyor mu?", async ({ page }) => {
  await page.goto("http://localhost:3003");

  const articles = await page.locator(".articleList > .article");
  const count = await articles.count();

  expect(count).toBe(newsData.length);

  for (let i = 0; i < count; i++) {
    const article = articles.nth(i);
    await expect(article.locator("h2")).toHaveCount(1);
    await expect(article.locator("p.date")).toHaveCount(1);
    await expect(article.locator("p")).toHaveCount(4); // tarih + 3 paragraf
    await expect(article.locator("button.expandButton")).toHaveCount(1);
  }
  await page.close();
});

test("article başlık ve tarihleri doğru render ediliyor mu?", async ({ page }) => {
  await page.goto("http://localhost:3003");

  const firstArticle = page.locator(".articleList > .article").first();
  await expect(firstArticle.locator("h2")).toHaveText(newsData[0].baslik);
  await expect(firstArticle.locator("p.date")).toHaveText(newsData[0].tarih);
  await page.close();
});

test("expandButton tıklanınca ilgili article'a isOpen classı ekleniyor mu?", async ({ page }) => {
  await page.goto("http://localhost:3003");

  const firstArticle = page.locator(".articleList > .article").first();
  const button = firstArticle.locator("button.expandButton");

  await button.click();
  await expect(firstArticle).toHaveClass(/isOpen/);
  await page.close();
});

test("bir article'da isOpen classı varken expandButton'a tıklanınca isOpen classı kaldırılıyor mu?", async ({ page }) => {
  await page.goto("http://localhost:3003");

  const firstArticle = page.locator(".articleList > .article").first();
  const button = firstArticle.locator("button.expandButton");

  await button.click();
  await expect(firstArticle).toHaveClass(/isOpen/);
  await button.click();
  await expect(firstArticle).not.toHaveClass(/isOpen/);
  await page.close();
});

test("expandButton textContent olarak '+' içeriyor mu?", async ({ page }) => {
  await page.goto("http://localhost:3003");

  const buttons = page.locator(".articleList .expandButton");
  const count = await buttons.count();
  expect(count).toBe(newsData.length);

  for (let i = 0; i < count; i++) {
    await expect(buttons.nth(i)).toHaveText("+");
  }
  await page.close();
});

test("menu oluşturulmuş ve header içinde bulunuyor mu?", async ({ page }) => {
  await page.goto("http://localhost:3003");

  const menu = page.locator(".header .menu");
  await expect(menu).toHaveCount(1);
  await page.close();
});

test("menu içinde ul ve doğru sayıda li var mı?", async ({ page }) => {
  await page.goto("http://localhost:3003");

  const ul = page.locator(".menu ul");
  await expect(ul).toHaveCount(1);

  const liItems = page.locator(".menu ul li");
  await expect(liItems).toHaveCount(menuElemanlari.length);
  await page.close();
});

test("li içerikleri menuElemanlari ile eşleşiyor mu?", async ({ page }) => {
  await page.goto("http://localhost:3003");

  const liItems = page.locator(".menu ul li");

  for (let i = 0; i < menuElemanlari.length; i++) {
    await expect(liItems.nth(i)).toHaveText(menuElemanlari[i]);
  }
  await page.close();
});

test("menu-button'a tıklanınca isOpen classı ekleniyor mu?", async ({ page }) => {
  await page.goto("http://localhost:3003");

  const menuButton = page.locator(".menu-button");
  const menu = page.locator(".menu");

  await menuButton.click();
  await expect(menu).toHaveClass(/isOpen/);
  await page.close();
});

test("menu-button'a tekrar tıklanınca isOpen classı kaldırılıyor mu?", async ({ page }) => {
  await page.goto("http://localhost:3003");

  const menuButton = page.locator(".menu-button");
  const menu = page.locator(".menu");

  await menuButton.click();
  await expect(menu).toHaveClass(/isOpen/);
  await menuButton.click();
  await expect(menu).not.toHaveClass(/isOpen/);
  await page.close();
});

test("ilk açılışta menu isOpen classı içermiyor olmalı", async ({ page }) => {
  await page.goto("http://localhost:3003");

  const menu = page.locator(".menu");
  await expect(menu).not.toHaveClass(/isOpen/);
  await page.close();
});

test("index.html içeriği değişmemiş olmalı", async () => {
  const actualHash = getNormalizedHtmlHash();
  const expectedHash =
    "b2d61076b30e1aa0482fe316d154a3040930903175e86e51c4c52a6f26a1bb42";

  expect(actualHash).toBe(expectedHash);
});

getNormalizedHtmlHash();
