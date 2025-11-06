![Vacation Screenshot](https://github.com/vanshnagpal1902/vacationallcalender/raw/main/photos/WhatsApp%20Image%202025-09-25%20at%2018.34.39.jpeg)
![Vacation Screenshot 1](https://github.com/vanshnagpal1902/vacationallcalender/raw/main/photos/WhatsApp%20Image%202025-09-25%20at%2018.38.40.jpeg)

![Vacation Screenshot 2](https://github.com/vanshnagpal1902/vacationallcalender/raw/main/photos/WhatsApp%20Image%202025-09-25%20at%2018.38.50.jpeg)

![Vacation Screenshot 3](https://github.com/vanshnagpal1902/vacationallcalender/raw/main/photos/WhatsApp%20Image%202025-09-25%20at%2018.40.07.jpeg)

![Vacation Screenshot 4](https://github.com/vanshnagpal1902/vacationallcalender/raw/main/photos/WhatsApp%20Image%202025-09-25%20at%2018.40.49.jpeg)


# 🌴 Vacation Calendar (Node.js + Express + EJS)

A full-stack **Vacation / Holiday Calendar** with **Monthly** and **Quarterly** views.
Holidays are fetched dynamically from the public [Nager.Date API](https://date.nager.at) and support multiple countries.

---

## ✨ Features

* **Monthly and Quarterly views**
* **Country selector** (multi-country support)
* **Dynamic holidays per year** via API (no hardcoding)
* **Week highlighting rules**:

  * Exactly **1 holiday** in a week → light green
  * More than or equal  **2 holidays** in a week → dark green
  
* Optional **focus** on a specific holiday date (`YYYY-MM-DD`)

---

## 🛠 Tech Stack

* **Backend:** Node.js, Express
* **Frontend:** EJS, express-ejs-layouts
* **HTTP Requests:** Axios
* **Date Handling:** Day.js

---

## ⚙️ Setup

1. **Install Node.js** 18+
2. **Install dependencies**:

   ```bash
   npm install
   ```
3. **Run in development** (auto-restart):

   ```bash
   npm run dev
   ```

   Or **start normally**:

   ```bash
   npm start
   ```
4. Open in browser:

   ```
   http://localhost:3000
   ```

---

## 📅 Usage

### Monthly View

```http
GET /?country=US&year=2025&month=9&focusDate=2025-09-01
```

### Quarterly View

```http
GET /quarterly?country=US&year=2025&q=3&focusDate=2025-07-04
```

---

## 🔧 Parameters

| Parameter   | Type   | Description                                                  |
| ----------- | ------ | ------------------------------------------------------------ |
| `country`   | string | ISO 3166-1 alpha-2 code (e.g., US, GB, IN); defaults to `US` |
| `year`      | number | Year; defaults to current year                               |
| `month`     | number | 1-12 (Monthly view only); defaults to current month          |
| `q`         | number | 1-4 (Quarterly view only); defaults to current quarter       |
| `focusDate` | string | `YYYY-MM-DD` of a specific holiday to emphasize              |

---

## 📝 Notes

* **Caching:** Holidays are cached in-memory for **12 hours** per `(year, country)`. Country list is cached 12 hours.
* **Week Start:** Weeks start on **Monday** in the calendar grid.
* **Highlighting:** Holiday cells are visually emphasized with **blue**, while the rest of the week may appear **light green** or **dark green** depending on the number of holidays.

---

## 🔗 Credits

* Holidays API: [Nager.Date](https://date.nager.at)
* Node.js / Express / EJS ecosystem

---

## 🎨 Screenshot Preview (Optional)

```
┌─────────┬─────────┬─────────┐
│ Mon     │ Tue     │ Wed     │
├─────────┼─────────┼─────────┤
│ 1       │ 2       │ 3       │
│ Light   │ Light   │ Blue    │ <- holiday cell highlighted in blue
└─────────┴─────────┴─────────┘
```

---



