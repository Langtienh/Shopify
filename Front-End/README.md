# auth [https://github.com/langtienh](https://github.com/langtienh)

# start

- cài đặt package cần thiết

```base
npm i
```

nếu bị lỗi

```base
npm i --legacy-peer-deps
```

# review (Cho BE)

- BE sẽ chạy ở chế độ product

## Build

### Chạy server backend (bắt buộc)

- fake backend

```base
npm run api
```

- có thể mở [http://localhost:8081](http://localhost:8081) để xem các endpoin (fake backend)
- real backend: chạy backend của bạn và sửa đổi đường base_url trong file .env

### build

```base
npm run build
```

## run product

```base
npm run start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# development (chỉ dành cho FE)

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
