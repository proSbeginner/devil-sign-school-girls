นี่คือโปรเจกต์เริ่มต้นสำหรับสร้างเกมบนเว็บด้วย PixiJS และ TypeScript

### โครงสร้างโปรเจกต์ ###
```
├── dist/          # โค้ดที่ build แล้ว (JavaScript)
├── src/           # โค้ด source (TypeScript)
│   └── index.ts   # ไฟล์เริ่มต้นของโปรเจกต์
├── assets/        # ไฟล์ assets ของเกม (รูปภาพ, เสียง, ฯลฯ)
├── node_modules/  # dependencies ของโปรเจกต์
├── package.json   # ข้อมูลโปรเจกต์และการตั้งค่า dependencies
├── tsconfig.json  # การตั้งค่า TypeScript
└── webpack.config.js # การตั้งค่า Webpack
```

### ติดตั้ง ###
```
npm install
```

### รัน ###
```
npx webpack
```
