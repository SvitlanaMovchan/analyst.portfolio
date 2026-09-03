# Data Analyst Portfolio

Live: **https://svitlanamovchan.github.io/analyst.portfolio/**

Статичний сайт-візитка. Ніякої збірки: GitHub Pages віддає файли як є.

---

## Як оновити контент

### Кейси

Редагуй **тільки** `assets/js/cases.js`. Це масив об'єктів — скопіюй один блок `{ ... }`,
встав нижче й заміни текст. Поля описані коментарем угорі файлу.

Головне: у Google Doc з рішенням постав доступ
**«Anyone with the link → Viewer»**, інакше рекрутер побачить екран запиту доступу.

### Текст на сторінці (About, Skills, Education, контакти)

У `index.html`, шукай коментарі `<!-- EDIT: ... -->`.

### Email

У `assets/js/main.js`, рядок `EMAIL_PARTS`. Пошта збирається з двох частин у браузері,
щоб спам-боти не витягли її з HTML.

### Посилання на профілі

`index.html` — заміни всі `YOUR-LINKEDIN` і `YOUR_TELEGRAM` на справжні.

---

## Що треба покласти у файли

| Файл | Що це |
|---|---|
| `assets/cv/CV.pdf` | резюме для кнопки Download CV |
| `assets/img/photo.jpg` | фото в шапці (квадратне, від 400×400) — потім заміни `src` у `index.html` з `photo-placeholder.svg` на `photo.jpg` |
| `assets/img/cases/01.png` | скріншоти дашбордів, шлях прописується в `cases.js` у полі `image` |
| `assets/img/certs/genesis.pdf` | сертифікат Genesis |
| `assets/img/certs/danit.pdf` | сертифікат DAN.IT |

Обкладинка `assets/img/og-cover.png` (прев'ю для LinkedIn) уже згенерована.
Перегенерувати після зміни імені: `python3 assets/img/make-og-cover.py` (потрібен Pillow).

---

## Локальний перегляд

```bash
python3 -m http.server 8000
```

Далі відкрити http://localhost:8000

---

## Публікація

```bash
git add -A && git commit -m "Update content" && git push
```

GitHub Pages оновить сайт за 30–60 секунд.

**Одноразове налаштування:** Settings → Pages → Source: `Deploy from a branch`,
гілка `main`, папка `/ (root)` → Save.
