// Register Service Worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("sw.js")
      .then((reg) => console.log("Service Worker terdaftar!", reg))
      .catch((err) => console.log("Service Worker gagal terdaftar", err));
  });
}
// Updated to Material Symbols Icon Names
const CATS = {
  Dapur: ["soup_kitchen", "itag-amber"],
  "Kamar Tidur": ["bed", "itag-purple"],
  "Ruang Tamu": ["weekend", "itag-blue"],
  "Kamar Mandi": ["bathtub", "itag-green"],
  Elektronik: ["devices", "itag-orange"],
  Lainnya: ["inventory_2", "itag-gray"],
};
const CAT_COLORS = {
  Dapur: "#F59E0B",
  "Kamar Tidur": "#8B5CF6",
  "Ruang Tamu": "#0EA5E9",
  "Kamar Mandi": "#10B981",
  Elektronik: "#F97316",
  Lainnya: "#94A3B8",
};

let items = [
  {
    id: 1,
    name: "Kasur Spring Bed",
    cat: "Kamar Tidur",
    price: 2500000,
    qty: 1,
    prio: "high",
    bought: false,
    note: "Ukuran 160x200",
  },
  {
    id: 2,
    name: "Kulkas 2 Pintu",
    cat: "Dapur",
    price: 3200000,
    qty: 1,
    prio: "high",
    bought: true,
    note: "",
  },
  {
    id: 3,
    name: "Kompor Gas 2 Tungku",
    cat: "Dapur",
    price: 450000,
    qty: 1,
    prio: "high",
    bought: true,
    note: "",
  },
  {
    id: 4,
    name: "Sofa 3 Dudukan",
    cat: "Ruang Tamu",
    price: 1800000,
    qty: 1,
    prio: "med",
    bought: false,
    note: "",
  },
  {
    id: 5,
    name: "Lemari Pakaian",
    cat: "Kamar Tidur",
    price: 1200000,
    qty: 1,
    prio: "high",
    bought: false,
    note: "",
  },
  {
    id: 6,
    name: 'TV LED 32"',
    cat: "Elektronik",
    price: 2100000,
    qty: 1,
    prio: "med",
    bought: false,
    note: "",
  },
  {
    id: 7,
    name: "Rice Cooker",
    cat: "Dapur",
    price: 350000,
    qty: 1,
    prio: "high",
    bought: true,
    note: "",
  },
  {
    id: 8,
    name: "Tirai/Gorden",
    cat: "Ruang Tamu",
    price: 300000,
    qty: 4,
    prio: "med",
    bought: false,
    note: "Per set",
  },
  {
    id: 9,
    name: "Meja Makan 4 Kursi",
    cat: "Dapur",
    price: 900000,
    qty: 1,
    prio: "med",
    bought: false,
    note: "",
  },
  {
    id: 10,
    name: "Mesin Cuci",
    cat: "Elektronik",
    price: 2800000,
    qty: 1,
    prio: "high",
    bought: false,
    note: "",
  },
  {
    id: 11,
    name: "Bak Mandi & Ember",
    cat: "Kamar Mandi",
    price: 150000,
    qty: 1,
    prio: "high",
    bought: true,
    note: "",
  },
  {
    id: 12,
    name: "Cermin Dinding",
    cat: "Kamar Mandi",
    price: 120000,
    qty: 2,
    prio: "low",
    bought: false,
    note: "",
  },
  {
    id: 13,
    name: "Meja Belajar",
    cat: "Kamar Tidur",
    price: 650000,
    qty: 1,
    prio: "low",
    bought: false,
    note: "",
  },
  {
    id: 14,
    name: "AC 1 PK",
    cat: "Elektronik",
    price: 3500000,
    qty: 1,
    prio: "med",
    bought: false,
    note: "Hemat energi",
  },
  {
    id: 15,
    name: "Rak Buku",
    cat: "Ruang Tamu",
    price: 280000,
    qty: 1,
    prio: "low",
    bought: false,
    note: "",
  },
];
let txs = [
  {
    id: 1,
    name: "Beli kulkas Sharp",
    amount: 3200000,
    cat: "Dapur",
    date: "2025-04-10",
  },
  {
    id: 2,
    name: "Kompor gas Rinnai",
    amount: 450000,
    cat: "Dapur",
    date: "2025-04-10",
  },
  {
    id: 3,
    name: "Rice cooker Miyako",
    amount: 350000,
    cat: "Dapur",
    date: "2025-04-12",
  },
  {
    id: 4,
    name: "Bak mandi & ember",
    amount: 150000,
    cat: "Kamar Mandi",
    date: "2025-04-15",
  },
  {
    id: 5,
    name: "Kabel & stop kontak",
    amount: 85000,
    cat: "Lainnya",
    date: "2025-04-15",
  },
];
let budget = 10000000,
  roomF = "all",
  statusF = "all",
  editId = null,
  editTxId = null;

function fmtR(n) {
  if (n >= 1000000)
    return "Rp " + (n / 1000000).toFixed(1).replace(".0", "") + "jt";
  if (n >= 1000) return "Rp " + (n / 1000).toFixed(0) + "rb";
  return "Rp " + n;
}
function fmtRF(n) {
  return "Rp " + n.toLocaleString("id-ID");
}

const pages = {
  dashboard: {
    title: "Dashboard",
    sub: "Selamat datang di rumah baru kamu 🎉",
    btn: '<span class="material-symbols-rounded" style="font-size:18px">add</span> Tambah Item',
    btnAct: () => prepareAddItem(),
    btn2: null,
  },
  checklist: {
    title: "Daftar Belanja",
    sub: "Semua kebutuhan rumah baru kamu",
    btn: '<span class="material-symbols-rounded" style="font-size:18px">add</span> Tambah Item',
    btnAct: () => prepareAddItem(),
    btn2: null,
  },
  budget: {
    title: "Keuangan Keluarga",
    sub: "Pantau anggaran & pengeluaran rumah",
    btn: '<span class="material-symbols-rounded" style="font-size:18px">add</span> Catat Transaksi',
    btnAct: () => openTxModal(),
    btn2: null,
  },
  priority: {
    title: "Prioritas Pembelian",
    sub: "Item paling penting dibeli terlebih dahulu",
    btn: null,
  },
  tips: {
    title: "Tips Hemat",
    sub: "Cara cerdas memenuhi kebutuhan rumah baru",
    btn: null,
  },
};

function nav(id, el) {
  document
    .querySelectorAll(".page-wrap")
    .forEach((p) => p.classList.remove("on"));
  document
    .querySelectorAll(".sb-item")
    .forEach((s) => s.classList.remove("on"));
  document.getElementById("page-" + id).classList.add("on");
  el.classList.add("on");
  const p = pages[id];
  document.getElementById("page-title").textContent = p.title;
  document.getElementById("page-sub").textContent = p.sub;
  const btnP = document.getElementById("btn-primary-action");
  if (p.btn) {
    btnP.innerHTML = p.btn;
    btnP.onclick = p.btnAct;
    btnP.style.display = "";
  } else {
    btnP.style.display = "none";
  }
  if (id === "dashboard") renderDash();
  if (id === "checklist") renderChecklist();
  if (id === "budget") renderBudget();
  if (id === "priority") renderPriority();
}

function toggleDark() {
  const root = document.documentElement;
  const isDark = root.getAttribute("data-theme") === "dark";
  root.setAttribute("data-theme", isDark ? "" : "dark");
  document.getElementById("dm-dot").innerHTML = isDark
    ? '<span class="material-symbols-rounded" style="font-size:14px; color:#F59E0B">light_mode</span>'
    : '<span class="material-symbols-rounded" style="font-size:14px; color:#1C1917">dark_mode</span>';
}

function toggleSidebar() {
  const sb = document.getElementById("sidebar");
  sb.classList.toggle("collapsed");
  const icon = document.getElementById("sb-toggle-icon");
  icon.textContent = sb.classList.contains("collapsed") ? "menu" : "menu_open";
}

function prepareAddItem() {
  editId = null;
  document.getElementById("m-item-title").textContent = "Tambah Item Baru";
  ["fi-name", "fi-note"].forEach(
    (x) => (document.getElementById(x).value = ""),
  );
  document.getElementById("fi-price").value = "";
  document.getElementById("fi-qty").value = 1;
  document.getElementById("fi-cat").value = "Dapur";
  document.getElementById("fi-prio").value = "med";
  document.getElementById("fi-id").value = "";
  openModal("m-item");
}

function openTxModal(id = null) {
  if (id) {
    const t = txs.find((x) => x.id === id);
    editTxId = id;
    document.getElementById("m-tx-title").textContent = "Edit Transaksi";
    document.getElementById("tx-name").value = t.name;
    document.getElementById("tx-amount").value = Number(
      t.amount,
    ).toLocaleString("id-ID");
    document.getElementById("tx-cat").value = t.cat;
    document.getElementById("tx-date").value = t.date;
  } else {
    editTxId = null;
    document.getElementById("m-tx-title").textContent = "Catat Transaksi";
    document.getElementById("tx-name").value = "";
    document.getElementById("tx-amount").value = "";
    document.getElementById("tx-date").value = new Date()
      .toISOString()
      .split("T")[0];
  }
  openModal("m-tx");
}

function openModal(id) {
  document.getElementById(id).classList.add("open");
}
function closeModal(id) {
  document.getElementById(id).classList.remove("open");
}

function saveItem() {
  const name = document.getElementById("fi-name").value.trim();
  if (!name) {
    toast("Nama barang wajib diisi!");
    return;
  }
  const obj = {
    id: editId || Date.now(),
    name,
    cat: document.getElementById("fi-cat").value,
    price: getRawNumber("fi-price"),
    qty: parseInt(document.getElementById("fi-qty").value) || 1,
    prio: document.getElementById("fi-prio").value,
    note: document.getElementById("fi-note").value,
    bought: false,
  };
  if (editId) {
    const i = items.findIndex((x) => x.id === editId);
    obj.bought = items[i].bought;
    items[i] = obj;
    toast("Item diperbarui ✓");
  } else {
    items.unshift(obj);
    toast("Item ditambahkan ✓");
  }
  closeModal("m-item");
  renderAll();
}

function saveTx() {
  const name = document.getElementById("tx-name").value.trim();
  const amt = getRawNumber("tx-amount");
  if (!name || !amt) {
    toast("Isi semua field!");
    return;
  }

  if (editTxId) {
    const i = txs.findIndex((x) => x.id === editTxId);
    txs[i] = {
      id: editTxId,
      name,
      amount: amt,
      cat: document.getElementById("tx-cat").value,
      date: document.getElementById("tx-date").value,
    };
    toast("Transaksi diperbarui ✓");
  } else {
    txs.unshift({
      id: Date.now(),
      name,
      amount: amt,
      cat: document.getElementById("tx-cat").value,
      date: document.getElementById("tx-date").value,
    });
    toast("Transaksi dicatat ✓");
  }
  closeModal("m-tx");
  renderBudget();
  updateSb();
}

function toggleBought(id) {
  const item = items.find((x) => x.id === id);
  item.bought = !item.bought;
  if (item.bought && item.price > 0) {
    txs.unshift({
      id: Date.now(),
      name: "Beli: " + item.name,
      amount: item.price * item.qty,
      cat: item.cat,
      date: new Date().toISOString().split("T")[0],
    });
  }
  toast(item.bought ? item.name + " sudah dibeli ✓" : "Ditandai belum dibeli");
  renderAll();
}

function editItem(id) {
  const it = items.find((x) => x.id === id);
  editId = id;
  document.getElementById("m-item-title").textContent = "Edit Item";
  document.getElementById("fi-name").value = it.name;
  document.getElementById("fi-cat").value = it.cat;
  document.getElementById("fi-price").value = Number(it.price).toLocaleString(
    "id-ID",
  );
  document.getElementById("fi-qty").value = it.qty;
  document.getElementById("fi-prio").value = it.prio;
  document.getElementById("fi-note").value = it.note || "";
  document.getElementById("fi-id").value = id;
  openModal("m-item");
}

function delItem(id) {
  if (!confirm("Hapus item ini?")) return;
  items = items.filter((x) => x.id !== id);
  renderAll();
  toast("Item dihapus");
}

function delTx(id) {
  if (!confirm("Hapus transaksi ini?")) return;
  txs = txs.filter((x) => x.id !== id);
  renderBudget();
  updateSb();
  toast("Transaksi dihapus");
}

function filterRoom(r, el) {
  roomF = r;
  document
    .querySelectorAll("#room-chips .chip")
    .forEach((c) => c.classList.remove("on"));
  el.classList.add("on");
  renderChecklist();
}
function filterStatus(s, el) {
  statusF = s;
  document
    .querySelectorAll("#status-chips .chip")
    .forEach((c) => c.classList.remove("on"));
  el.classList.add("on");
  renderChecklist();
}

function makeCard(it) {
  const [emo, tc] = CATS[it.cat] || ["inventory_2", "itag-gray"];
  const pc = { high: "prio-high", med: "prio-med", low: "prio-low" };
  return `<div class="icard${it.bought ? " done" : ""}">
    <div class="icheckbox${it.bought ? " checked" : ""}" onclick="toggleBought(${it.id})"><span class="material-symbols-rounded" style="font-size:16px">check</span></div>
    <div class="icard-emoji"><span class="material-symbols-rounded" style="font-size:22px">${emo}</span></div>
    <div class="icard-body">
      <div class="icard-name">${it.name}</div>
      <div class="icard-meta">${it.qty > 1 ? it.qty + " pcs · " : ""}${it.note || it.cat}</div>
      <div class="icard-tags">
        <span class="itag ${tc}"><span class="material-symbols-rounded" style="font-size:12px;margin-right:4px">${emo}</span>${it.cat}</span>
        ${it.prio === "high" ? '<span class="itag itag-red">Penting</span>' : ""}
      </div>
    </div>
    <div style="display:flex;align-items:center;gap:8px">
      <div class="prio-dot ${pc[it.prio]}"></div>
      ${it.price > 0 ? `<div class="icard-price">${fmtRF(it.price * it.qty)}</div>` : ""}
    </div>
    <div class="icard-actions">
      <button class="icon-btn" onclick="editItem(${it.id})" title="Edit"><span class="material-symbols-rounded" style="font-size:16px">edit</span></button>
      <button class="icon-btn del" onclick="delItem(${it.id})" title="Hapus"><span class="material-symbols-rounded" style="font-size:16px">delete</span></button>
    </div>
  </div>`;
}

function renderDash() {
  const total = items.length,
    bought = items.filter((i) => i.bought).length,
    spent = txs.reduce((s, t) => s + t.amount, 0);
  document.getElementById("st-total").textContent = total;
  document.getElementById("st-bought").textContent = bought;
  document.getElementById("st-left").textContent = total - bought;
  document.getElementById("st-spent").textContent = fmtRF(spent);
  document.getElementById("st-pct-sub").textContent = total
    ? Math.round((bought / total) * 100) + "% selesai"
    : "0% selesai";
  document.getElementById("st-budget-sub").textContent = "dari " + fmtRF(budget);

  const cats = Object.keys(CATS);
  document.getElementById("dash-cats").innerHTML = cats
    .map((c) => {
      const all = items.filter((i) => i.cat === c),
        done = all.filter((i) => i.bought).length,
        pct = all.length ? Math.round((done / all.length) * 100) : 0;
      const [emo] = CATS[c];
      return `<div class="ccat" onclick="nav('checklist',document.querySelector('[onclick*=checklist]'));setTimeout(()=>filterRoom('${c}',document.querySelector('[onclick*=${JSON.stringify(c)}]')),50)">
      <div class="ccat-emoji"><span class="material-symbols-rounded">${emo}</span></div>
      <div class="ccat-name">${c}</div>
      <div class="ccat-count">${done}/${all.length} item · ${pct}%</div>
      <div class="ccat-bar"><div class="ccat-fill" style="width:${pct}%;background:${CAT_COLORS[c]}"></div></div>
    </div>`;
    })
    .join("");

  document.getElementById("dash-recent").innerHTML =
    items.slice(0, 5).map(makeCard).join("") ||
    '<div class="empty-state"><div class="empty-emoji"><span class="material-symbols-rounded" style="font-size:48px">inventory_2</span></div><div class="empty-msg">Belum ada item. Tambah sekarang!</div></div>';
  updateSb();
}

function renderChecklist() {
  let f = items.filter((i) => {
    const r = roomF === "all" || i.cat === roomF;
    const s =
      statusF === "all" ||
      (statusF === "bought" && i.bought) ||
      (statusF === "pending" && !i.bought);
    return r && s;
  });
  document.getElementById("cl-items").innerHTML =
    f.map(makeCard).join("") ||
    '<div class="empty-state"><div class="empty-emoji"><span class="material-symbols-rounded" style="font-size:48px">check_circle</span></div><div class="empty-msg">Tidak ada item di sini</div></div>';
  const total = items.length,
    bought = items.filter((i) => i.bought).length,
    pct = total ? Math.round((bought / total) * 100) : 0;
  const leftCost = items
    .filter((i) => !i.bought)
    .reduce((s, i) => s + i.price * i.qty, 0);
  document.getElementById("prog-bar").style.width = pct + "%";
  document.getElementById("prog-pct").textContent = pct + "%";
  document.getElementById("ps-total").textContent = total;
  document.getElementById("ps-done").textContent = bought;
  document.getElementById("ps-left").textContent = total - bought;
  document.getElementById("ps-est").textContent = fmtRF(leftCost);
  document.getElementById("sb-pending-badge").textContent = items.filter(
    (i) => !i.bought,
  ).length;
}

function renderBudget() {
  const spent = txs.reduce((s, t) => s + t.amount, 0),
    rem = budget - spent,
    pct = Math.min(Math.round((spent / budget) * 100), 100);
  document.getElementById("b-budget").textContent = fmtRF(budget);
  document.getElementById("b-used").textContent = fmtRF(spent);
  document.getElementById("b-bar").style.width = pct + "%";
  document.getElementById("b-pct").textContent = pct + "% terpakai";
  document.getElementById("b-rem").textContent =
    fmtR(Math.max(0, rem)) + " sisa";

  const cats = Object.keys(CATS);
  let rows = "";
  cats.forEach((c) => {
    const catAmt = txs
      .filter((t) => t.cat === c)
      .reduce((s, t) => s + t.amount, 0);
    if (!catAmt) return;
    const p = Math.round((catAmt / spent) * 100);
    const [emo] = CATS[c];
    rows += `<div class="cspend-row">
      <div class="cspend-icon"><span class="material-symbols-rounded" style="font-size:20px">${emo}</span></div>
      <div class="cspend-info">
        <div class="cspend-name"><span>${c}</span><span style="font-size:14px;font-weight:600;color:var(--text)">${fmtRF(catAmt)} <span style="color:var(--text3);font-weight:500;font-size:12px">${p}%</span></span></div>
        <div class="cspend-track"><div class="cspend-fill" style="width:${p}%;background:${CAT_COLORS[c]}"></div></div>
      </div>
    </div>`;
  });
  document.getElementById("cat-spend-rows").innerHTML =
    rows ||
    '<div style="color:var(--text3);font-size:14px;padding:16px 0;text-align:center">Belum ada pengeluaran</div>';

  document.getElementById("tx-count").textContent = txs.length + " transaksi";
  document.getElementById("tx-list").innerHTML =
    txs
      .slice(0, 25)
      .map((t) => {
        const [emo] = CATS[t.cat] || ["inventory_2"];
        const d = new Date(t.date);
        const ds = d.toLocaleDateString("id-ID", {
          day: "numeric",
          month: "short",
          year: "numeric",
        });
        return `<div class="txrow">
      <div class="tx-dot" style="background:${CAT_COLORS[t.cat] || "#94A3B8"}22;color:${CAT_COLORS[t.cat] || "#94A3B8"}"><span class="material-symbols-rounded" style="font-size:20px">${emo}</span></div>
      <div class="tx-info"><div class="tx-name">${t.name}</div><div class="tx-date">${ds} · ${t.cat}</div></div>
      <div class="tx-amt">− ${fmtRF(t.amount)}</div>
      <div style="display:flex;gap:6px;margin-left:12px;">
        <button class="icon-btn" onclick="openTxModal(${t.id})"><span class="material-symbols-rounded" style="font-size:16px">edit</span></button>
        <button class="icon-btn del" onclick="delTx(${t.id})"><span class="material-symbols-rounded" style="font-size:16px">delete</span></button>
      </div>
    </div>`;
      })
      .join("") ||
    '<div class="empty-state"><div class="empty-emoji"><span class="material-symbols-rounded" style="font-size:48px">receipt_long</span></div><div class="empty-msg">Belum ada transaksi</div></div>';
  updateSb();
}

function renderPriority() {
  ["high", "med", "low"].forEach((p) => {
    const list = items.filter((i) => i.prio === p && !i.bought);
    document.getElementById("prio-" + p).innerHTML =
      list.map(makeCard).join("") ||
      '<div class="empty-state" style="padding:32px 20px"><div class="empty-msg">Tidak ada item di sini</div></div>';
    document.getElementById("p" + p[0] + "-count").textContent = list.length;
  });
}

function updateSb() {
  const spent = txs.reduce((s, t) => s + t.amount, 0),
    pct = Math.min(Math.round((spent / budget) * 100), 100);
  document.getElementById("sb-fill").style.width = pct + "%";
  document.getElementById("sb-spent").textContent = fmtR(spent);
  document.getElementById("sb-total").textContent = fmtR(budget);
  document.getElementById("sb-pct").textContent = pct + "%";
  document.getElementById("sb-pending-badge").textContent = items.filter(
    (i) => !i.bought,
  ).length;
}

function editBudget() {
  const v = prompt("Masukkan anggaran baru (Rp):", budget);
  if (v && !isNaN(parseInt(v))) {
    budget = parseInt(v);
    renderBudget();
    toast("Anggaran diperbarui ✓");
  }
}

function renderAll() {
  renderDash();
  renderChecklist();
  renderPriority();
  updateSb();
}

let toastTimer;
function toast(msg) {
  clearTimeout(toastTimer);
  const t = document.getElementById("toast");
  document.getElementById("toast-msg").textContent = msg;
  t.classList.add("show");
  toastTimer = setTimeout(() => t.classList.remove("show"), 2400);
}

document.getElementById("m-item").addEventListener("click", function (e) {
  if (e.target === this) closeModal("m-item");
});
document.getElementById("m-tx").addEventListener("click", function (e) {
  if (e.target === this) closeModal("m-tx");
});

/* =========================
   MONEY FORMAT / PRICE FIX
   Replace old functions with these
   ========================= */

// FULL RUPIAH FORMAT
function fmtRF(n) {
  n = Number(n || 0);
  return "Rp " + n.toLocaleString("id-ID");
}

// SHORT FORMAT
function fmtR(n) {
  n = Number(n || 0);

  if (n >= 1000000000) {
    return "Rp " + (n / 1000000000).toFixed(1).replace(".0", "") + " M";
  }

  if (n >= 1000000) {
    return "Rp " + (n / 1000000).toFixed(1).replace(".0", "") + " jt";
  }

  if (n >= 1000) {
    return "Rp " + (n / 1000).toFixed(0) + " rb";
  }

  return "Rp " + n;
}
// FORMAT INPUT WHILE TYPING
function formatInputRupiah(el) {
  let angka = el.value.replace(/\D/g, "");

  if (!angka) {
    el.value = "";
    return;
  }

  el.value = BigInt(angka).toLocaleString("id-ID");
}

// GET RAW NUMBER FROM INPUT
function getRawNumber(id) {
  const val = document.getElementById(id).value.replace(/\D/g, "");
  return Number(val || 0);
}

// AUTO FORMAT INPUT
["fi-price", "tx-amount"].forEach((id) => {
  const el = document.getElementById(id);

  el.addEventListener("input", function () {
    formatInputRupiah(this);
  });
});
renderAll();
