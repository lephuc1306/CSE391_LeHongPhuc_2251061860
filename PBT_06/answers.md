## Câu A1: Grid System

**1. Bảng phân tích Layout**

| Kích thước | < 768px (xs, sm) | 768px - 991px (md) | ≥ 992px (lg, xl, xxl) |
|------------|---------|---------------|---------|
| Số cột | 1 cột/hàng | 2 cột/hàng | 4 cột/hàng |
| Box layout | Xếp chồng lên nhau (mỗi box chiếm 100% width do `col-12`) | Nằm ngang, 2 box một hàng (mỗi box chiếm 50% width do `col-md-6`) | Nằm ngang, 4 box một hàng (mỗi box chiếm 25% width do `col-lg-3`) |

**2. Giải thích câu hỏi thêm**
- **`col-md-6` nghĩa là gì?** Nghĩa là từ điểm gãy (breakpoint) `md` (kích thước màn hình ≥ 768px) trở lên, phần tử này sẽ chiếm 6 phần trên tổng số 12 cột của Grid System (tương đương 50% chiều rộng của hàng).
- **Tại sao không cần viết `col-sm-12`?** Vì Bootstrap áp dụng tư duy thiết kế **Mobile-First** (ưu tiên thiết bị di động trước). Class `col-12` (không có prefix) là class gốc, nó sẽ áp dụng cho màn hình nhỏ nhất và tự động kế thừa lên các kích thước lớn hơn cho đến khi gặp một breakpoint khác (như `md`) chặn lại. Khoảng `< 768px` đã nằm trọn trong phạm vi chịu ảnh hưởng của `col-12`, nên việc viết thêm `col-sm-12` là dư thừa.

### Câu A2: Utilities & Components

**1. Giải thích class `d-none d-md-block`:**
- Element mang class này sẽ bị **ẩn (không hiển thị)** trên các màn hình có kích thước nhỏ (mobile, chiều rộng < 768px) do chịu tác dụng của class `d-none` (display: none).
- Tuy nhiên, khi màn hình đạt kích thước từ Tablet trở lên (≥ 768px, tức là breakpoint `md`), class `d-md-block` sẽ ghi đè lên, giúp element **hiển thị lại** dưới dạng khối (display: block).
- *Tóm lại:* Ẩn trên Mobile, Hiện trên Tablet và Desktop.

**2. Liệt kê và giải thích 5 spacing utilities:**
1. `mt-3`: **Margin Top** kích thước 3 (tương đương 1rem hoặc 16px). Tạo khoảng cách đẩy phần tử bên trên ra xa.
2. `px-4`: **Padding X** (Left & Right) kích thước 4 (tương đương 1.5rem hoặc 24px). Tạo khoảng đệm bên trong phần tử ở cả 2 cạnh trái và phải.
3. `mb-auto`: **Margin Bottom Auto**. Thường dùng kết hợp trong Flexbox để tự động chiếm hết khoảng trống còn lại ở phía dưới, đẩy các phần tử khác ra xa.
4. `mx-auto`: **Margin X Auto** (margin-left: auto; margin-right: auto). Dùng để căn giữa theo chiều ngang một phần tử dạng block (điều kiện là phần tử đó phải có chiều rộng - width xác định).
5. `py-2`: **Padding Y** (Top & Bottom) kích thước 2 (tương đương 0.5rem hoặc 8px). Tạo khoảng đệm bên trong phần tử ở 2 cạnh trên và dưới.

**3. Sự khác nhau giữa `.container`, `.container-fluid`, và `.container-md`:**
- **`.container`:** Là container có **chiều rộng tối đa (max-width) cố định** thay đổi nhảy bậc theo từng kích thước màn hình (sm, md, lg, xl, xxl). Nó luôn tự động căn giữa và tạo ra khoảng lề (margin) hai bên trên các màn hình lớn.
- **`.container-fluid`:** Là container luôn luôn mở rộng **chiếm 100% chiều rộng màn hình** (`width: 100%`) bất kể thiết bị đang xem là điện thoại hay màn hình siêu rộng.
- **`.container-md`:** Là sự kết hợp. Trên các màn hình nhỏ hơn Tablet (< 768px), nó hoạt động giống như `.container-fluid` (chiếm 100% chiều rộng). Nhưng từ màn hình Tablet (md, ≥ 768px) trở lên, nó bắt đầu có `max-width` cố định và hoạt động giống như `.container` bình thường.