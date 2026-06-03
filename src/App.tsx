import React, { useState, useEffect, useRef } from "react";

// ═══════════════════════════════════════════════════════════════
// PEARL WHITE — СУВД-ЭРДЭНЭ
// FOHOW 7 Carat Diamond | Wellness Landing Page
// Single file — Vite React TSX
// Fonts: Cormorant Garamond (display) + PT Sans (body/Cyrillic)
// Design: One continuous gradient canvas, tarot card reveals
// ═══════════════════════════════════════════════════════════════

// ───────────────────────────────────────────
// DESIGN TOKENS
// ───────────────────────────────────────────
const C = {
  gold:      "#C8922A",
  goldLight: "#E8C96B",
  amber:     "#C8793A",
  cream:     "#FAF7F2",
  text:      "#1A0F08",
  textMid:   "#6B4A2A",
  textMuted: "#A08060",
  textLight: "#FAF7F2",
  jade:      "#A8C4B8",
};
const DISPLAY = "'Cormorant Garamond', Georgia, serif";
const BODY    = "'PT Sans', 'Helvetica Neue', sans-serif";

// ───────────────────────────────────────────
// DATA — PRODUCTS
// ───────────────────────────────────────────
const PRODUCTS = [
  {
    id: "elixir", name: "Элексир", sub: "Хорхой өвс + Линчжи",
    emoji: "🌿", accent: "#7ECBA8",
    gradient: "linear-gradient(160deg,#2C5444 0%,#1E3D32 55%,#0F2018 100%)",
    tagline: "Феникс шиг дахин төрөх эрч хүч",
    desc: "Дархлааны тогтолцоог бэхжүүлж, элэг, бөөр, уушгийг нэгэн зэрэг тэтгэдэг байгалийн хамгийн хүчирхэг бүтээгдэхүүн.",
    philosophy: "Төвдийн уулархаг нутгийн хатуу ширүүн орчинд өссөн хорхой өвс нь байгалийн хамгийн ховор эрдэнэсийн нэг. 5000 жилийн дорнын анагаах ухаан энэ ургамлыг 'мөнхийн эрч хүчний эх' гэж нэрлэдэг. Феникс шиг — бие тань шатаж, үнснээсээ дахин мэндэлнэ.",
    howItWorks: "Хорхой өвс нь биеийн ATP энергийн үйлдвэрлэлийг нэмэгдүүлж, эсийн хүчилтөрөгчийн хэрэглээг оновчтой болгоно. Линчжи нь бета-глюканы тусламжтайгаар дархлааны системийг тохируулж, хавдарын эсрэг байгалийн хамгаалалт бий болгоно.",
    ingredients: [
      { name: "Хорхой өвс (Cordyceps)", benefit: "Дархлаа, эрч хүч, уушги, бөөрний үйл ажиллагааг дэмжинэ" },
      { name: "Линчжи (Ganoderma)", benefit: "Зүрх судас, элэг хамгаалах, хавдрын эсрэг, нойр сайжруулна" },
      { name: "Биологийн идэвхит бодис", benefit: "Эсийн түвшинд ажиллаж нөхөн сэргэлтийг хурдасгана" },
    ],
    usage: [
      { step: "Өглөө", detail: "Өглөөний цай идэхийн өмнө 1 хайрцаг (10мл) ууна. Хоосон ходоод дээр хамгийн сайн үйлчилнэ." },
      { step: "Орой", detail: "Оройн хоолны дараа 30 минут болоод 1 хайрцаг ууж болно." },
      { step: "Цикл", detail: "25 хоног ууж 5 хоног завсарлана. 3 сар давтана." },
      { step: "Анхааруулга", detail: "Эхний 1-2 долоо хоногт цэвэрлэх урвал гарч болно — хэвийн үзэгдэл." },
    ],
    whoFor: ["Дархлаа сул хүмүүс", "Байнга ядардаг хүмүүс", "Элэг, бөөрний асуудалтай", "Хавдарын дараа сэргэж буй", "0-100 насны бүх хүн"],
    pairWith: ["Саньцин — эхлээд цэвэрлэнэ", "Линчжи — хослуулан хүч нэмнэ", "Кальци — дархлааг бүр бэхжүүлнэ"],
    timeline: [
      { period: "1-р долоо хоног", result: "Нойр сайжирна, ядаргаа бага мэдрэгдэнэ" },
      { period: "1-р сар", result: "Эрч хүч мэдэгдэхүйц нэмэгдэнэ, арьс гэрэлтэнэ" },
      { period: "3-р сар", result: "Дархлаа бэхжиж шинжилгээний үр дүн сайжирна" },
    ],
  },
  {
    id: "lingzhi", name: "Линчжи", sub: "Мөнхийн өвс",
    emoji: "🍄", accent: "#E8A090",
    gradient: "linear-gradient(160deg,#5C2E28 0%,#3A1A18 55%,#1A0A08 100%)",
    tagline: "4000 жилийн мөнхийн нууц",
    desc: "100 гаруй өвчинд үйлчилдэг, зүрх судасны системийг хамгаалж, хөгшрөлтийг удаашруулдаг эртний эрдэнэ.",
    philosophy: "Хятадын эртний эзэд, лам хуврагууд Линчжийг 'мөнхийн амьдралын өвс' гэж нэрлэж, ордон харшиндаа тариалдаг байжээ. Инь-ян тэнцвэрийн хамгийн гүн нөлөөтэй ургамал.",
    howItWorks: "Линчжийн биологийн идэвхит бодисууд дархлааны T-эсийг идэвхжүүлж, байгалийн NK эсүүдийн үйл ажиллагааг нэмэгдүүлнэ. Зүрхний булчинг хамгаалж, цусны судасны уян хатан чанарыг сэргээнэ.",
    ingredients: [
      { name: "Линчжийн полисахарид", benefit: "Дархлааны системийг идэвхжүүлж хавдрын эсрэг хамгаалалт бий болгоно" },
      { name: "Тритерпен", benefit: "Цусны даралт, холестерол зохицуулж зүрхийг хамгаална" },
      { name: "Аденозин", benefit: "Цусны эргэлтийг сайжруулж тромбоз үүсэхээс сэргийлнэ" },
    ],
    usage: [
      { step: "Өглөө", detail: "Өглөөний хоолны өмнө 2 хавтгай халбага нунтаг хэрэглэнэ." },
      { step: "Хэрэглэх арга", detail: "Халуун усанд уусгаж цай болгон ууна. Сүү нэмж болно." },
      { step: "Цикл", detail: "Тасралтгүй 3 сар. Дараа нь 1 сар завсарлана." },
    ],
    whoFor: ["Зүрх судасны асуудалтай", "Хавдрын эрсдэлтэй", "Стресс их мэдрэгддэг", "Нойргүйдэлд нэрвэгддэг"],
    pairWith: ["Элексир — хамгийн хүчтэй хослол", "Алтан цус — зүрх судасны бүрэн хамгаалалт"],
    timeline: [
      { period: "2 долоо хоног", result: "Нойр, тайвшрал мэдэгдэхүйц сайжирна" },
      { period: "1-р сар", result: "Цусны даралт тогтворжино" },
      { period: "3-р сар", result: "Дархлааны шинжилгээ сайжирна" },
    ],
  },
  {
    id: "sanqing", name: "Саньцин", sub: "Гүн цэвэрлэгч",
    emoji: "💧", accent: "#7EC8E0",
    gradient: "linear-gradient(160deg,#1A3A4A 0%,#0F2030 55%,#050F18 100%)",
    tagline: "Феникс шатахаасаа өмнө цэвэрлэгддэг",
    desc: "Гэдэс, цус, эд эсийг гүн цэвэрлэж хорт бодис гадагшлуулна. Бүх эдгэрлийн эхлэл.",
    philosophy: "Феникс дахин төрөхийн өмнө хуучин бүрхүүлээ бүрэн шатааж гадагшлуулдаг. Саньцин бол таны биеийн тэр шатах үйл явц — хуучин, хорт, хуримтлагдсан бүхнийг цэвэрлэж шинэ амьдралд зам нээнэ.",
    howItWorks: "Гэдэс бол биеийн хоёр дахь тархи. Саньцин гэдэсний хана дахь хуримтлагдсан хаягдлыг зөөлнөөр зайлуулж, цусны эргэлтийг сайжруулж, эд эсүүдэд шим тэжээл хүрэхийг хялбарчилна.",
    ingredients: [
      { name: "Санай (Senna)", benefit: "Гэдэсний хөдөлгөөнийг зохицуулж хорт бодис гадагшлуулна" },
      { name: "Хийморь ургамал", benefit: "Цусыг цэвэрлэж судасны хана дахь хуримтлалыг задлана" },
      { name: "Пробиотик", benefit: "Гэдэсний эрүүл бичил биетэнг сэргээнэ" },
    ],
    usage: [
      { step: "Орой", detail: "Орой унтахаасаа өмнө 1 хайрцаг ууна." },
      { step: "Ус их уух", detail: "Өдөрт 8-10 аяга ус заавал уух хэрэгтэй." },
      { step: "Цикл", detail: "7 хоног ууж 7 хоног завсарлана. 3 удаа давтана." },
      { step: "Хоол", detail: "Хэрэглэх хугацаанд тосложсон халуун хоол цөөлнө." },
    ],
    whoFor: ["Гэдэсний асуудалтай", "Арьс муутай хуурай", "Жин хасахыг хүсдэг", "Ерөнхий цэвэрлэгч хийхийг хүсдэг"],
    pairWith: ["Элексир — цэвэрлэсний дараа нөхөн сэргээнэ", "Алтан цус — цус судас хамт цэвэрлэнэ"],
    timeline: [
      { period: "1-3 хоног", result: "Гэдэсний хөдөлгөөн сайжирна" },
      { period: "1 долоо хоног", result: "Хөнгөн мэдрэгдэж арьс гэрэлтэж эхэлнэ" },
      { period: "1 сар", result: "Жин буурч эрч хүч нэмэгдэнэ" },
    ],
  },
  {
    id: "peptide", name: "Пептид", sub: "Залуужуулах систем",
    emoji: "✨", accent: "#E8A8D0",
    gradient: "linear-gradient(160deg,#6B3A5A 0%,#3D1A35 55%,#1A0818 100%)",
    tagline: "10 насаар залуужих нобелийн шинжлэх ухаан",
    desc: "2012 оны Нобелийн шагналтай технологи дээр суурилсан. Эсийн автофагийг идэвхжүүлж 10 насаар залуужуулах мэдрэмж өгнө.",
    philosophy: "2012 онд Нобелийн шагнал авсан Ёшинори Охсумигийн нээлт — эс өөрийгөө цэвэрлэж шинэчлэх чадвартай. Пептид энэ байгалийн механизмыг идэвхжүүлж таны эсийг залуу, хүчирхэг байлгана.",
    howItWorks: "Пептид молекулууд эсийн мембраныг нэвтэрч митохондрийн үйл ажиллагааг сайжруулна. Автофаги процессыг идэвхжүүлж хуурамч, гэмтсэн эсийн хэсгүүдийг устгаж шинэ эсийн материал болгоно.",
    ingredients: [
      { name: "Биологийн идэвхит пептид", benefit: "Эсийн автофагийг идэвхжүүлж хуучин эсийг шинэчилнэ" },
      { name: "Коллаген пептид", benefit: "Арьсны уян хатан чанар, чийглэг байдлыг сэргээнэ" },
      { name: "Антиоксидант", benefit: "Чөлөөт радикалыг устгаж хөгшрөлтийг удаашруулна" },
    ],
    usage: [
      { step: "Өглөө", detail: "Өглөөний хоолны өмнө 1 хайрцаг (15мл) ууна." },
      { step: "Орой", detail: "Унтахаасаа 1 цагийн өмнө 1 хайрцаг ууна." },
      { step: "Цикл", detail: "Тасралтгүй 3 сар. Жилд 2 удаа хийнэ." },
    ],
    whoFor: ["40 наснаас дээш", "Арьс хөгшрөлтөөс сэргийлэхийг хүсдэг", "Эрч хүч буурсан мэдрэгддэг"],
    pairWith: ["Линчжи — гүн нөхөн сэргэлт", "Кальци — бүрэн залуужилт"],
    timeline: [
      { period: "2 долоо хоног", result: "Нойр сайжирч арьс гэрэлтэнэ" },
      { period: "1 сар", result: "Эрч хүч нэмэгдэж залуу мэдрэгдэнэ" },
      { period: "3 сар", result: "10 насаар залуу харагдах мэдрэмж" },
    ],
  },
  {
    id: "golden-blood", name: "Алтан цус", sub: "Судас цэвэрлэгч",
    emoji: "🩸", accent: "#F0C060",
    gradient: "linear-gradient(160deg,#7A4A1A 0%,#4A2A08 55%,#1A0F00 100%)",
    tagline: "Алтан цус — залуу судас",
    desc: "Цус судасны хана дахь хуримтлалыг задлаж цусны эргэлтийг сайжруулна. Залуужилтын хамгийн чухал алхам.",
    philosophy: "Дорнын анагаах ухаанд 'Цус бол амьдрал' гэдэг. Цэвэр, хүчирхэг цустай бол бие бүхэлдээ хүч чадалтай байна. Алтан цус Францын болон Германы судалгаан дээр суурилсан формулаар таны цусны замыг цэвэрлэж залуу байлгана.",
    howItWorks: "Натто киназ цусны сийвэн дэх фибриныг задалж бүлэгнэлт үүсэхээс сэргийлнэ. Коензим Q10 митохондрид шууд ажиллаж зүрхний үйл ажиллагааг дэмжинэ.",
    ingredients: [
      { name: "Натто киназ", benefit: "Тромбыг задлаж цусны бүлэгнэлтийг зохицуулна" },
      { name: "Коензим Q10", benefit: "Зүрхний булчинг хамгаалж эрч хүч нэмнэ" },
      { name: "Омега-3", benefit: "Судасны хана зөөлрүүлж уян хатан болгоно" },
    ],
    usage: [
      { step: "Өглөө", detail: "Өглөөний хоолны дараа 2 капсул ууна." },
      { step: "Орой", detail: "Оройн хоолны дараа 2 капсул ууна." },
      { step: "Цикл", detail: "3 сар тасралтгүй хэрэглэнэ." },
    ],
    whoFor: ["Цусны даралт өндөр", "Холестерол ихтэй", "Зүрх судасны эрсдэлтэй", "50 наснаас дээш"],
    pairWith: ["Линчжи — зүрх судасны бүрэн хамгаалалт", "Саньцин — хамт цэвэрлэнэ"],
    timeline: [
      { period: "2 долоо хоног", result: "Даралт тогтворжиж эхэлнэ" },
      { period: "1 сар", result: "Толгой өвдөх ядрах буурна" },
      { period: "3 сар", result: "Шинжилгээний үр дүн мэдэгдэхүйц сайжирна" },
    ],
  },
  {
    id: "calcium", name: "Зөөлөн кальци", sub: "Далайн гаралтай",
    emoji: "🦴", accent: "#90C8F0",
    gradient: "linear-gradient(160deg,#1A3A5A 0%,#0F2040 55%,#050F20 100%)",
    tagline: "Далайн эрдэнэ — биеийн суурь",
    desc: "Далайн гаралтай кальци — 90%+ шингэдэг. 200 гаруй өвчнөөс сэргийлж яс, үс, хумс, шүдийг бэхжүүлнэ.",
    philosophy: "Монгол хүний яс хүчтэй байдаг — нүүдлийн амьдрал, мал сүргийн хоол. Гэвч орчин үеийн амьдралын хэв маяг кальцийн дутагдал үүсгэж байна. Далайн эх элементүүдийг агуулсан энэ кальци таны биеийн суурийг бэхжүүлнэ.",
    howItWorks: "Далайн кальци нь хэт нарийн молекулын хэмжээтэй тул гэдэсний хана хялбар нэвтрүүлдэг. D3 витамин кальцийн шингэлтийг 70-90% хүртэл нэмэгдүүлдэг.",
    ingredients: [
      { name: "Далайн кальци карбонат", benefit: "90%+ шингэлттэй яс шүдийг бэхжүүлнэ" },
      { name: "D3 витамин", benefit: "Кальцийн шингэлтийг хэд дахин нэмэгдүүлнэ" },
      { name: "Магни", benefit: "Яс булчингийн хамт ажиллагааг дэмжинэ" },
    ],
    usage: [
      { step: "Хоолны дараа", detail: "Гурван удаагийн хоолны аль нэгний дараа 2 хавтгай халбага ууна." },
      { step: "Ус", detail: "Дулаан устай хольж ууна — хүйтэн усанд шингэлт буурна." },
      { step: "Цикл", detail: "Тасралтгүй хэрэглэх боломжтой." },
    ],
    whoFor: ["Яс сийрэгжилт", "Үс их унадаг", "Шүд сул", "Хүүхэд өсвөр насныхан", "Жирэмсэн эмэгтэйчүүд"],
    pairWith: ["Элексир — дархлаа яс хамт бэхжинэ", "Пептид — бүрэн нөхөн сэргэлт"],
    timeline: [
      { period: "1 сар", result: "Үс унах буурна хумс бэхжинэ" },
      { period: "3 сар", result: "Яс өвдөх буурна" },
      { period: "6 сар", result: "Нягтрал шинжилгээнд мэдэгдэхүйц сайжрал" },
    ],
  },
];

// ───────────────────────────────────────────
// DATA — SPA ITEMS
// ───────────────────────────────────────────
const SPA_ITEMS = [
  {
    id: "massage", name: "Массажны аппарат", sub: "Биоэнергийн массаж",
    emoji: "⚡", accent: "#D4A060",
    gradient: "linear-gradient(160deg,#3A2A1A 0%,#251808 55%,#0F0800 100%)",
    tagline: "Эрч хүчний оргил цэгүүдийг сэрээх",
    desc: "FOHOW-ийн биоэнергийн массажны аппарат нь дорнын цэгийн эмчилгээний онолд суурилж биеийн 365 меридиан цэгт нөлөөлнө.",
    philosophy: "Дорнын анагаах ухаанд бие дэх ци (эрч хүч) нь меридианаар урсдаг. Эдгээр замын саад тотгорыг арилгавал бие өвөрмөц аргаар эдгэнэ.",
    howItWorks: "Биоэнергийн долгион нь арьсны доогуур нэвтэрч булчингийн тогтолцоог зөөлрүүлж цусны эргэлтийг сайжруулна. Цэгийн эмчилгээний зарчмаар тодорхой эрхтэнтэй холбогдсон цэгүүдэд нөлөөлнө.",
    usage: [
      { step: "Бэлтгэл", detail: "Массаж хийхийн өмнө 1 аяга дулаан ус уу. Биеийг тайвшруул." },
      { step: "Хэрэглэх талбай", detail: "Нуруу, мөр, хөл, хэвлий — өдөр бүр ялгаатай газар." },
      { step: "Хугацаа", detail: "Нэг газарт 10-15 минут. Нийт 30-45 минут." },
      { step: "Дараа нь", detail: "Массажны дараа 30 минут амарч ус их уу." },
    ],
    benefits: ["Нуруу мөрний өвдөлт буурна","Цусны эргэлт сайжирна","Стресс тайлагдана","Нойр сайжирна"],
    duration: "30-45 минут",
    frequency: "Өдөр бүр эсвэл 2 хоног тутам",
    pairWith: ["Инь-Ян наалт — массажны дараа наана","Элексир — гүн нөхөн сэргэлтэд"],
  },
  {
    id: "moxibustion", name: "Мишок", sub: "Моксо — дулаан эмчилгээ",
    emoji: "🔥", accent: "#E8A040",
    gradient: "linear-gradient(160deg,#4A2A0A 0%,#2A1500 55%,#0F0800 100%)",
    tagline: "Гурван мянган жилийн галын эдгэлт",
    desc: "Артемиз ургамлын дулааныг ашиглан биеийн хүйтэн, чийглэг эрч хүчийг арилгаж ян-г сэргээдэг эртний эмчилгээ.",
    philosophy: "Инь-ян онолд хэт их инь (хүйтэн, чийглэг) биед хуримтлагдвал өвчин үүснэ. Мишок ян-г (дулаан, хөдөлгөөн) нэмж тэнцвэрийг сэргээнэ.",
    howItWorks: "Артемиз шатах үед үүсэх дулаан болон биологийн идэвхит бодис арьсаар нэвтэрч меридианаар дамжиж хүйтэн, өвчтэй хэсэгт хүрнэ.",
    usage: [
      { step: "Байрлал", detail: "Тухтай хэвтэж эсвэл суу. Хэрэглэх хэсгийг нүцгэлнэ." },
      { step: "Зай", detail: "Мишокыг арьснаас 2-3 см зайд барина. Дулуухан мэдрэгдэх ёстой." },
      { step: "Хөдөлгөөн", detail: "Тойрог эсвэл шулуун хөдөлгөөнөөр 15-20 минут." },
      { step: "Цэгүүд", detail: "Гэдэс, нуруу, өвдөг, хөл — хүйтэн мэдрэгддэг газрууд." },
    ],
    benefits: ["Яс мөч үе мөчний өвдөлт буурна","Хүйтэн хэвлий умайн асуудал засагдана","Дулааны тэнцвэр сэрдэг","Дархлаа бэхжинэ"],
    duration: "20-30 минут",
    frequency: "7 хоногт 3-5 удаа",
    pairWith: ["Инь-Ян наалт — хамт хэрэглэж болно","Гурван эрдэнэ — яс мөчний бүрэн эдгэлт"],
  },
  {
    id: "patches", name: "Инь-Ян наалт", sub: "Цэгийн эмчилгээний наалт",
    emoji: "☯", accent: "#80E0A8",
    gradient: "linear-gradient(160deg,#1A3A2A 0%,#0F2018 55%,#050F08 100%)",
    tagline: "Унтаж байхдаа эдгэх",
    desc: "Биеийн тодорхой цэгүүдэд наах энэхүү наалт нь 8-12 цагийн турш байгалийн гаралтай бодисуудыг арьсаар нэвтрүүлнэ.",
    philosophy: "Зүүний эмчилгээний орчин үеийн хувилбар. Зүү хатгахгүйгээр яг л тэр цэгүүдэд нөлөөлдөг — гэртээ, ажилдаа, унтаж байхдаа ч хэрэглэж болно.",
    howItWorks: "Наалтны байгалийн орц арьсны гадаргуур нэвтэрч меридианы цэгүүдэд шууд нөлөөлнө. Трансдермаль дамжуулалтын технологи ашигладаг.",
    usage: [
      { step: "Цэг сонгох", detail: "Pearl White таны асуудлын дагуу аль цэгт наахыг заана." },
      { step: "Арьс бэлтгэх", detail: "Наахаасаа өмнө арьсыг цэвэрлэж хуурайлна." },
      { step: "Наах", detail: "Сонгосон цэгт дарж наана." },
      { step: "Хугацаа", detail: "8-12 цаг байлгана. Унтаж байхдаа наавал хамгийн сайн." },
    ],
    benefits: ["Толгой өвдөх буурна","Нойргүйдэл засагдана","Гэдэсний асуудал шийдэгдэнэ","Өвдөлт намдана"],
    duration: "8-12 цаг",
    frequency: "Өдөр бүр эсвэл хэрэгцээгээр",
    pairWith: ["Массажны аппарат — хослуулан хэрэглэнэ","Элексир — гүн нөхөн сэргэлт"],
  },
  {
    id: "warming", name: "Дулаацуулагч", sub: "Эмэгтэйчүүдийн эрүүл мэнд",
    emoji: "🌸", accent: "#E890B8",
    gradient: "linear-gradient(160deg,#5A1A3A 0%,#350F22 55%,#180508 100%)",
    tagline: "Эмэгтэй хүний хамгийн нандин эрдэнэ",
    desc: "Дорнын анагаах ухааны 'умай хүйтэн' онолд суурилсан. Эмэгтэйчүүдийн репродуктив эрүүл мэнд, сарын тэмдэгний асуудлыг байгалийн аргаар шийдэнэ.",
    philosophy: "Дорнын анагаах ухаанд умай дулаан байвал эмэгтэй хүн эрүүл, жинхэнэ цэцэглэнэ. Хүйтэн умай нь олон эмэгтэйчүүдийн асуудлын үндэс.",
    howItWorks: "Нано дулааны технологи ашиглан умайн хэсэгт 38-42°C тогтвортой дулаан өгнө. Цусны эргэлт сайжирч хавдар буурч хорт бодис гадагшилна.",
    usage: [
      { step: "Бэлтгэл", detail: "Цэвэрхэн дотуур хувцас өмсөж аппаратыг хэвлийн доор байрлуул." },
      { step: "Температур", detail: "Эхлээд бага дулааны горимоос эхэлж аажим нэмнэ." },
      { step: "Хугацаа", detail: "30-60 минут. Унтаж байхдаа ч хэрэглэж болно." },
      { step: "Сарын тэмдэгний үе", detail: "Сарын тэмдэгний үеэр хэрэглэхийг тусгайлан зөвлөдөг." },
    ],
    benefits: ["Сарын тэмдэгний өвдөлт буурна","Умайн хүйтэн засагдана","Үргүйдлийн эмчилгээнд дэмжлэг","Арьс гэрэлтэнэ"],
    duration: "30-60 минут",
    frequency: "Өдөр бүр эсвэл сарын тэмдэгний өмнөх 7 хоногт",
    pairWith: ["Элексир — гүн дотоод тэнцвэр"],
  },
];

// ───────────────────────────────────────────
// DATA — 5 WORLD CARDS
// ───────────────────────────────────────────
const CARDS = [
  { id:"supplements", title:"Бүтээгдэхүүн", sub:"Дотоод эдгэлт", desc:"Биеийн гүн тэнцвэрийг сэргээх байгалийн гаралтай бүтээгдэхүүнүүд.", page:"products", gradient:"linear-gradient(145deg,#2C5444,#1E3D32)", accent:"#7ECBA8", symbol:"🌿" },
  { id:"wellness",    title:"Wellness Spa",  sub:"Гадна эдгэлт",  desc:"Массаж, дулаан эмчилгээ, цэгийн эмчилгээ — биеийн гадна тэнцвэр.",   page:"wellness",  gradient:"linear-gradient(145deg,#4A2A0A,#2A1500)", accent:"#E8A040", symbol:"⚡" },
  { id:"beauty",      title:"Арьс Гоошрол", sub:"Гоо сайхан",    desc:"Байгалийн гаралтай арьс арчилгааны бүтээгдэхүүн. Гэрэлтсэн арьс.",   page:"beauty",    gradient:"linear-gradient(145deg,#5A1A3A,#350F22)", accent:"#E890B8", symbol:"🌸" },
  { id:"nutrition",   title:"Хоол Тэжээл",  sub:"Жин бодисын солилцоо", desc:"Boss Tea болон бодисын солилцоог идэвхжүүлдэг бүтээгдэхүүнүүд.",  page:"nutrition", gradient:"linear-gradient(145deg,#1A3A5A,#0F2040)", accent:"#90C8F0", symbol:"☯" },
  { id:"business",    title:"Бизнес Боломж",sub:"Хамтдаа өсөх",  desc:"Pearl White-тай хамт ажиллаж өөрийн амжилтын замыг эхлүүл.",        page:"business",  gradient:"linear-gradient(145deg,#7A4A1A,#4A2A08)", accent:"#F0C060", symbol:"◆" },
];

// ───────────────────────────────────────────
// TYPES
// ───────────────────────────────────────────
type Page =
  | "home"
  | "products" | "wellness" | "beauty" | "nutrition" | "business"
  | "product-detail" | "spa-detail";

// ───────────────────────────────────────────
// GLOBAL STYLES
// ───────────────────────────────────────────
function GlobalStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&family=PT+Sans:ital,wght@0,400;0,700;1,400&display=swap');
      *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
      html{scroll-behavior:smooth;cursor:none;}
      body{
        background:linear-gradient(to bottom,
          #FAF7F2 0%,#F5EDD8 10%,#EDD8A8 22%,
          #D8B878 34%,#B87840 44%,#8A5828 52%,
          #6A3818 60%,#4A2810 68%,
          #3A1A08 78%,#C8601A 90%,#E8922A 100%
        );
        background-attachment: scroll;
        min-height:100vh;
        -webkit-font-smoothing:antialiased;
        overflow-x:hidden;
      }
      *{cursor:none!important;}
      a{text-decoration:none;color:inherit;}
      ::selection{background:rgba(200,146,42,0.25);color:#1A0F08;}
      ::-webkit-scrollbar{width:2px;}
      ::-webkit-scrollbar-thumb{background:rgba(200,146,42,0.35);}

      .pw-reveal{
        opacity:0;transform:translateY(44px);
        transition:opacity 0.85s cubic-bezier(0.16,1,0.3,1),
                   transform 0.85s cubic-bezier(0.16,1,0.3,1);
      }
      .pw-reveal.vis{opacity:1;transform:translateY(0);}
      .d1{transition-delay:0.1s}.d2{transition-delay:0.22s}
      .d3{transition-delay:0.34s}.d4{transition-delay:0.46s}
      .d5{transition-delay:0.58s}

      .card-wrap{perspective:1100px;}
      .card-inner{
        transform:rotateY(86deg) translateY(24px);
        opacity:0;
        transition:transform 0.85s cubic-bezier(0.16,1,0.3,1),
                   opacity 0.55s ease;
      }
      .card-inner.flipped{transform:rotateY(0deg) translateY(0);opacity:1;}

      @keyframes breathe{
        0%,100%{opacity:0.55;transform:scale(1) translateY(0);}
        50%{opacity:0.85;transform:scale(1.04) translateY(-5px);}
      }
      @keyframes marquee{from{transform:translateX(0);}to{transform:translateX(-50%);}}
      @keyframes fadeup{from{opacity:0;transform:translateY(28px);}to{opacity:1;transform:translateY(0);}}
      @keyframes linedrop{from{height:0;opacity:0;}to{height:56px;opacity:0.6;}}
      @keyframes spin{from{transform:rotate(0deg);}to{transform:rotate(360deg);}}

      @media(max-width:768px){
        nav>div:last-child{display:none!important;}
        .grid3{grid-template-columns:1fr!important;}
        .grid2{grid-template-columns:1fr!important;}
        .cards-row1{grid-template-columns:1fr!important;}
        .cards-row2{grid-template-columns:1fr!important;max-width:100%!important;}
        .prodrow{grid-template-columns:40px 1fr!important;gap:16px!important;}
        .prodrow .prodesc,.prodrow .prodtag{display:none!important;}
      }
    `}</style>
  );
}

// ───────────────────────────────────────────
// CURSOR
// ───────────────────────────────────────────
function Cursor() {
  const dot  = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const m    = useRef({x:-200,y:-200});
  const s    = useRef({x:-200,y:-200});

  useEffect(()=>{
    const mv=(e:MouseEvent)=>{m.current={x:e.clientX,y:e.clientY};};
    window.addEventListener("mousemove",mv);
    let raf:number;
    const tick=()=>{
      s.current.x+=(m.current.x-s.current.x)*0.1;
      s.current.y+=(m.current.y-s.current.y)*0.1;
      if(dot.current){dot.current.style.left=m.current.x+"px";dot.current.style.top=m.current.y+"px";}
      if(ring.current){ring.current.style.left=s.current.x+"px";ring.current.style.top=s.current.y+"px";}
      raf=requestAnimationFrame(tick);
    };
    tick();
    return()=>{window.removeEventListener("mousemove",mv);cancelAnimationFrame(raf);};
  },[]);

  const base:React.CSSProperties={position:"fixed",zIndex:9999,borderRadius:"50%",pointerEvents:"none",transform:"translate(-50%,-50%)"};
  return(<>
    <div ref={dot}  style={{...base,width:6,height:6,background:C.gold}}/>
    <div ref={ring} style={{...base,width:26,height:26,border:`1px solid rgba(200,146,42,0.55)`}}/>
  </>);
}

// ───────────────────────────────────────────
// SCROLL REVEAL HOOK
// ───────────────────────────────────────────
function useReveal(){
  useEffect(()=>{
    const obs=new IntersectionObserver(entries=>{
      entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("vis");obs.unobserve(e.target);}});
    },{threshold:0.1});
    document.querySelectorAll(".pw-reveal").forEach(el=>obs.observe(el));

    const cobs=new IntersectionObserver(entries=>{
      entries.forEach(e=>{
        if(e.isIntersecting){
          const wraps=e.target.querySelectorAll(".card-wrap");
          wraps.forEach((w,i)=>{
            const inner=w.querySelector(".card-inner");
            if(inner)setTimeout(()=>inner.classList.add("flipped"),i*190);
          });
          cobs.unobserve(e.target);
        }
      });
    },{threshold:0.12});
    const cardSec=document.getElementById("cards-section");
    if(cardSec)cobs.observe(cardSec);

    return()=>{obs.disconnect();cobs.disconnect();};
  });
}

// ───────────────────────────────────────────
// NAV — hides scroll down, shows scroll up
// ───────────────────────────────────────────
function Nav({go}:{go:(p:Page,id?:string)=>void}){
  const [hidden,setHidden]=useState(false);
  const [atTop,setAtTop]=useState(true);
  const lastY=useRef(0);

  useEffect(()=>{
    const fn=()=>{
      const y=window.scrollY;
      setAtTop(y<60);
      setHidden(y>lastY.current&&y>100);
      lastY.current=y;
    };
    window.addEventListener("scroll",fn,{passive:true});
    return()=>window.removeEventListener("scroll",fn);
  },[]);

  const scrollTo=(id:string)=>{document.getElementById(id)?.scrollIntoView({behavior:"smooth"});};

  return(
    <nav style={{
      position:"fixed",top:0,left:0,right:0,zIndex:200,
      padding:"20px 48px",
      display:"flex",alignItems:"center",justifyContent:"space-between",
      background:atTop?"transparent":"rgba(250,247,242,0.88)",
      backdropFilter:atTop?"none":"blur(18px)",
      borderBottom:atTop?"none":"1px solid rgba(200,146,42,0.1)",
      transform:hidden?"translateY(-100%)":"translateY(0)",
      transition:"transform 0.5s cubic-bezier(0.16,1,0.3,1),background 0.4s ease",
    }}>
      <button onClick={()=>go("home")} style={{fontFamily:DISPLAY,fontSize:20,fontStyle:"italic",color:C.text,fontWeight:400,letterSpacing:1,background:"none",border:"none"}}>
        Pearl White
      </button>
      <div style={{display:"flex",gap:36,alignItems:"center"}}>
        {([["Философи","philosophy"],["Бүтээгдэхүүн","cards-section"],["Холбоо барих","contact"]] as [string,string][]).map(([l,id])=>(
          <button key={id} onClick={()=>scrollTo(id)} style={{fontFamily:BODY,fontSize:12,letterSpacing:1.5,color:C.textMid,fontWeight:400,background:"none",border:"none",transition:"color 0.2s"}}
            onMouseEnter={e=>(e.currentTarget.style.color=C.gold)}
            onMouseLeave={e=>(e.currentTarget.style.color=C.textMid)}
          >{l}</button>
        ))}
        <button onClick={()=>scrollTo("contact")} style={{fontFamily:BODY,fontSize:11,letterSpacing:2,color:C.textLight,background:C.text,border:"none",padding:"10px 22px",fontWeight:700,transition:"background 0.3s"}}
          onMouseEnter={e=>(e.currentTarget.style.background=C.gold)}
          onMouseLeave={e=>(e.currentTarget.style.background=C.text)}
        >ЗӨВЛӨГӨӨ АВАХ</button>
      </div>
    </nav>
  );
}

// ───────────────────────────────────────────
// PHOENIX SVG
// ───────────────────────────────────────────
function Phoenix({size=240,color=C.gold,op=1}:{size?:number;color?:string;op?:number}){
  return(
    <svg viewBox="0 0 280 360" width={size} height={size*360/280} fill="none" style={{display:"block",opacity:op}}>
      <path d="M140 330 C128 285 98 248 112 195 C122 158 136 142 140 108 C144 142 158 158 168 195 C182 248 152 285 140 330Z" stroke={color} strokeWidth="1.2" fill="none" opacity="0.75"/>
      <path d="M118 190 C94 174 58 182 28 152 C18 142 14 128 24 118 C48 132 76 148 104 164 C78 142 54 116 42 82 C58 88 80 108 102 136 C84 106 76 72 86 42 C100 62 104 98 112 128 C108 96 114 62 128 38" stroke={color} strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.7"/>
      <path d="M162 190 C186 174 222 182 252 152 C262 142 266 128 256 118 C232 132 204 148 176 164 C202 142 226 116 238 82 C222 88 200 108 178 136 C196 106 204 72 194 42 C180 62 176 98 168 128 C172 96 166 62 152 38" stroke={color} strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.7"/>
      <path d="M133 326 C120 352 108 368 96 378" stroke={color} strokeWidth="0.8" strokeLinecap="round" opacity="0.4"/>
      <path d="M140 332 C140 358 140 372 140 382" stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.45"/>
      <path d="M147 326 C160 352 172 368 184 378" stroke={color} strokeWidth="0.8" strokeLinecap="round" opacity="0.4"/>
      <path d="M134 108 C130 86 124 68 120 48" stroke={color} strokeWidth="0.8" strokeLinecap="round" opacity="0.5"/>
      <path d="M140 106 C140 82 140 64 142 44" stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.6"/>
      <path d="M146 108 C150 86 156 68 160 48" stroke={color} strokeWidth="0.8" strokeLinecap="round" opacity="0.5"/>
      <circle cx="140" cy="116" r="2.5" stroke={color} strokeWidth="0.8" opacity="0.7"/>
      <circle cx="140" cy="116" r="0.8" fill={color} opacity="0.7"/>
      <circle cx="140" cy="210" r="24" stroke={color} strokeWidth="0.6" opacity="0.12"/>
      {[[70,105],[50,78],[88,54],[32,140],[210,105],[230,78],[192,54],[248,140],[115,42],[165,42]].map(([cx,cy],i)=>(
        <circle key={i} cx={cx} cy={cy} r={1.2} fill={color} opacity={0.2+(i%3)*0.07}/>
      ))}
    </svg>
  );
}

// ───────────────────────────────────────────
// LOTUS LINE
// ───────────────────────────────────────────
function Lotus({color=C.gold}:{color?:string}){
  return(
    <div style={{display:"flex",alignItems:"center",gap:16,justifyContent:"center"}}>
      <div style={{flex:1,maxWidth:72,height:1,background:color,opacity:0.3}}/>
      <svg viewBox="0 0 48 32" width={44} height={29} fill="none">
        <path d="M24 28 C24 18 16 10 8 8 C16 10 22 18 24 28Z" stroke={color} strokeWidth="0.8" opacity="0.55"/>
        <path d="M24 28 C24 18 32 10 40 8 C32 10 26 18 24 28Z" stroke={color} strokeWidth="0.8" opacity="0.55"/>
        <path d="M24 28 C24 16 24 8 24 2" stroke={color} strokeWidth="0.8" opacity="0.45" strokeLinecap="round"/>
        <circle cx="24" cy="28" r="1.4" fill={color} opacity="0.45"/>
      </svg>
      <div style={{flex:1,maxWidth:72,height:1,background:color,opacity:0.3}}/>
    </div>
  );
}

// ───────────────────────────────────────────
// MARQUEE
// ───────────────────────────────────────────
function Marquee({light=false}:{light?:boolean}){
  const items=["СУВД-ЭРДЭНЭ","✦","PEARL WHITE","✦","ЦЭВЭРЛЭХ","✦","ТЭНЦВЭРЖҮҮЛЭХ","✦","НӨХӨН СЭРГЭЭХ","✦","ФЕНИКС","✦","FOHOW","✦","7 CARAT DIAMOND","✦","ИНЬ-ЯН","✦"];
  const txt=[...items,...items].join("  ");
  return(
    <div style={{overflow:"hidden",padding:"12px 0",background:light?"rgba(250,247,242,0.1)":"rgba(26,15,8,0.16)",borderTop:"1px solid rgba(200,146,42,0.12)",borderBottom:"1px solid rgba(200,146,42,0.12)"}}>
      <div style={{display:"inline-block",whiteSpace:"nowrap",animation:"marquee 65s linear infinite",fontFamily:BODY,fontSize:10,letterSpacing:4,fontWeight:700,color:light?C.textMid:"rgba(200,146,42,0.65)"}}>
        {txt}&nbsp;&nbsp;&nbsp;&nbsp;{txt}
      </div>
    </div>
  );
}

// ───────────────────────────────────────────
// LABEL ROW
// ───────────────────────────────────────────
function Label({text,light=false}:{text:string;light?:boolean}){
  const col=light?"rgba(250,247,242,0.35)":C.textMuted;
  return(
    <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:40}}>
      <div style={{width:26,height:1,background:col,opacity:0.6}}/>
      <span style={{fontFamily:BODY,fontSize:10,letterSpacing:5,color:col}}>{text}</span>
    </div>
  );
}

// ═══════════════════════════════════════════
// HOME PAGE
// ═══════════════════════════════════════════

// ── HERO ────────────────────────────────────
function Hero({go}:{go:(p:Page)=>void}){
  const [alive,setAlive]=useState(false);
  useEffect(()=>{setTimeout(()=>setAlive(true),150);},[]);
  const fi=(d:number):React.CSSProperties=>({
    opacity:alive?1:0,
    transform:alive?"translateY(0)":"translateY(26px)",
    transition:`opacity 1.1s ease ${d}s,transform 1.1s cubic-bezier(0.16,1,0.3,1) ${d}s`,
  });
  return(
    <section style={{minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"130px 32px 80px",position:"relative",overflow:"hidden",textAlign:"center"}}>
      <div style={{position:"relative",zIndex:1}}>
        <div style={{...fi(0),marginBottom:28,animation:alive?"breathe 7s ease-in-out infinite":"none",display:"flex",justifyContent:"center"}}>
          <Phoenix size={190} color={C.gold}/>
        </div>
        <div style={{...fi(0.35),fontFamily:BODY,fontSize:10,letterSpacing:5,color:C.textMuted,marginBottom:26}}>
          FOHOW · 7 CARAT DIAMOND · МОНГОЛ
        </div>
        <h1 style={{...fi(0.55),fontFamily:DISPLAY,fontSize:"clamp(62px,11vw,138px)",fontWeight:300,lineHeight:0.9,color:C.text,letterSpacing:-2,marginBottom:14}}>
          Pearl<br/><em style={{color:C.gold,fontStyle:"italic"}}>White</em>
        </h1>
        <div style={{...fi(0.75),fontFamily:DISPLAY,fontSize:18,fontStyle:"italic",color:C.textMuted,letterSpacing:3,marginBottom:44}}>
          Сувд-Эрдэнэ
        </div>
        <div style={{...fi(0.85),marginBottom:36}}><Lotus color={C.gold}/></div>
        <p style={{...fi(0.95),fontFamily:BODY,fontSize:"clamp(13px,1.5vw,16px)",color:C.textMid,lineHeight:1.9,maxWidth:420,margin:"0 auto 18px"}}>
          Европын анагаах ухаан өвчнийг эмчилдэг.
        </p>
        <p style={{...fi(1.05),fontFamily:DISPLAY,fontSize:"clamp(17px,2.2vw,26px)",color:C.text,lineHeight:1.5,maxWidth:480,margin:"0 auto 56px",fontStyle:"italic"}}>
          "Дорнын уламжлал таныг эмчилдэг."
        </p>
        <div style={{...fi(1.15),display:"flex",gap:14,justifyContent:"center",flexWrap:"wrap"}}>
          <button onClick={()=>document.getElementById("contact")?.scrollIntoView({behavior:"smooth"})}
            style={{fontFamily:BODY,fontSize:11,letterSpacing:2.5,color:C.textLight,background:C.text,border:"none",padding:"14px 36px",fontWeight:700,transition:"background 0.3s,transform 0.2s"}}
            onMouseEnter={e=>{e.currentTarget.style.background=C.gold;e.currentTarget.style.transform="translateY(-2px)";}}
            onMouseLeave={e=>{e.currentTarget.style.background=C.text;e.currentTarget.style.transform="translateY(0)";}}>
            ЗӨВЛӨГӨӨ АВАХ
          </button>
          <button onClick={()=>document.getElementById("cards-section")?.scrollIntoView({behavior:"smooth"})}
            style={{fontFamily:BODY,fontSize:11,letterSpacing:2.5,color:C.textMid,background:"transparent",border:`1px solid rgba(26,15,8,0.2)`,padding:"14px 36px",transition:"all 0.3s"}}
            onMouseEnter={e=>{e.currentTarget.style.borderColor=C.gold;e.currentTarget.style.color=C.gold;}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(26,15,8,0.2)";e.currentTarget.style.color=C.textMid;}}>
            ДЭЛГЭРЭНГҮЙ
          </button>
        </div>
        <div style={{...fi(1.5),marginTop:72,display:"flex",flexDirection:"column",alignItems:"center"}}>
          <div style={{width:1,animation:"linedrop 1.8s ease forwards 2s",height:0,opacity:0,background:`linear-gradient(to bottom,${C.gold},transparent)`}}/>
        </div>
      </div>
    </section>
  );
}

// ── PHILOSOPHY ──────────────────────────────
function Philosophy(){
  return(
    <section id="philosophy" style={{padding:"150px 0 110px",position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",left:"-1%",top:"6%",fontFamily:DISPLAY,fontSize:"clamp(70px,13vw,190px)",color:C.text,opacity:0.04,fontWeight:600,letterSpacing:-4,userSelect:"none",pointerEvents:"none",lineHeight:1}}>ФЕНИКС</div>
      <div style={{maxWidth:1040,margin:"0 auto",padding:"0 48px"}}>
        <div className="pw-reveal"><Label text="ФИЛОСОФИ"/></div>
        <h2 className="pw-reveal d1" style={{fontFamily:DISPLAY,fontSize:"clamp(36px,6.5vw,88px)",fontWeight:400,lineHeight:1.08,color:C.text,letterSpacing:-1,marginBottom:80,maxWidth:740}}>
          Таны бие<br/><em style={{color:C.amber,fontStyle:"italic"}}>өөрийгөө эдгээх</em><br/>чадвартай.
        </h2>
        <div className="grid3" style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"0 52px",paddingTop:52,borderTop:`1px solid rgba(26,15,8,0.1)`}}>
          {[
            {n:"01",t:"Инь-Ян тэнцвэр",b:"Бүх өвчин тэнцвэр алдагдахаас үүснэ. Фохоу таны биеийн гүн тэнцвэрийг сэргээнэ. Хоёр туйлын зохицол — энэ бол эрүүл мэндийн суурь.",d:"d1"},
            {n:"02",t:"Феникс — дахин төрөлт",b:"Феникс шатаж үнснээсээ хүч чадалтай дахин мэндэлдэг. Таны бие мөн адил. Цэвэрлэх. Тэнцвэржүүлэх. Шинэ амьдрал.",d:"d2"},
            {n:"03",t:"Хүнийг бүтнээр эмчилдэг",b:"Орчин үеийн анагаах ухаан шинж тэмдгийг эмчилдэг. Дорнын уламжлал шалтгааныг устгадаг — таны бие, сэтгэл, эрч хүчийг нэгэн зэрэг.",d:"d3"},
          ].map((p,i)=>(
            <div key={i} className={`pw-reveal ${p.d}`}>
              <div style={{fontFamily:DISPLAY,fontSize:54,color:C.gold,opacity:0.18,lineHeight:1,marginBottom:18,fontWeight:400}}>{p.n}</div>
              <h3 style={{fontFamily:DISPLAY,fontSize:21,color:C.text,marginBottom:16,fontWeight:500,lineHeight:1.3}}>{p.t}</h3>
              <p style={{fontFamily:BODY,fontSize:14,color:C.textMid,lineHeight:1.9}}>{p.b}</p>
            </div>
          ))}
        </div>
        <div className="pw-reveal" style={{marginTop:100,textAlign:"center",padding:"0 12%"}}>
          <Lotus color={C.amber}/>
          <blockquote style={{fontFamily:DISPLAY,fontSize:"clamp(22px,3.5vw,42px)",fontWeight:400,fontStyle:"italic",color:C.text,lineHeight:1.5,marginTop:36}}>
            "Өвдвөл цус гүйхгүй.<br/>Цус гүйвэл өвдөхгүй."
          </blockquote>
          <div style={{fontFamily:BODY,fontSize:10,letterSpacing:4,color:C.textMuted,marginTop:20}}>— ДОРНЫН УЛАМЖЛАЛТ АНАГААХ УХААН</div>
        </div>
      </div>
    </section>
  );
}

// ── FOHOW BAND ──────────────────────────────
function FohowBand(){
  return(
    <section style={{padding:"90px 0"}}>
      <div style={{maxWidth:1040,margin:"0 auto",padding:"0 48px"}}>
        <div className="grid2" style={{display:"grid",gridTemplateColumns:"1.3fr 1fr",gap:80,alignItems:"center"}}>
          <div>
            <div className="pw-reveal"><Label text="FOHOW ГЭЖ ЮУ ВЭ" light/></div>
            <h2 className="pw-reveal d1" style={{fontFamily:DISPLAY,fontSize:"clamp(28px,4.5vw,56px)",fontWeight:400,lineHeight:1.15,color:C.textLight,letterSpacing:-0.5,marginBottom:28}}>
              Орчин үеийн шинжлэх ухаан,<br/><em style={{opacity:0.6}}>эртний мэргэн ухаан.</em>
            </h2>
            <p className="pw-reveal d2" style={{fontFamily:BODY,fontSize:15,color:C.textLight,opacity:0.65,lineHeight:1.9,maxWidth:430}}>
              1995 онд Хятадад үүсгэн байгуулагдсан. 86 гаруй улс оронд үйл ажиллагаа явуулдаг. Дорнын уламжлалт анагаах ухааныг орчин үеийн биотехнологитой хослуулсан цорын ганц брэнд.
            </p>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:2}}>
            {[{n:"1995",l:"Үүсгэн байгуулагдсан"},{n:"86+",l:"Улс оронд"},{n:"30+",l:"Жилийн туршлага"},{n:"3",l:"Цэвэр · Тэнцвэр · Нөхөн"}].map((s,i)=>(
              <div key={i} className={`pw-reveal d${i+1}`} style={{padding:"34px 26px",background:"rgba(250,247,242,0.07)",backdropFilter:"blur(4px)",borderTop:"1px solid rgba(250,247,242,0.14)"}}>
                <div style={{fontFamily:DISPLAY,fontSize:"clamp(30px,3.5vw,46px)",color:C.textLight,fontWeight:300,lineHeight:1,marginBottom:8}}>{s.n}</div>
                <div style={{fontFamily:BODY,fontSize:11,color:C.textLight,opacity:0.45,letterSpacing:0.5}}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── WORLD CARD ITEM — defined outside to prevent recreation on hover ──
function WorldCard({card,i,hov,setHov,go}:{
  card:typeof CARDS[0];i:number;
  hov:number|null;
  setHov:(v:number|null)=>void;
  go:(p:Page)=>void;
}){
  const isHov=hov===i;
  return(
    <div className="card-wrap">
      <div className="card-inner" style={{transitionDelay:`${i*190}ms`}}>
        <button
          onClick={()=>go(card.page as Page)}
          onMouseEnter={()=>setHov(i)}
          onMouseLeave={()=>setHov(null)}
            style={{
              width:"100%", aspectRatio:"3/4.4",
              background:"rgba(250,244,234,0.13)",
              backdropFilter:"blur(24px)",
              WebkitBackdropFilter:"blur(24px)",
              border:`1px solid rgba(250,244,234,${isHov?0.35:0.18})`,
              borderRadius:24,
              display:"flex", flexDirection:"column",
              justifyContent:"space-between",
              padding:"0 0 28px",
              position:"relative", overflow:"hidden",
              transition:"transform 0.5s cubic-bezier(0.16,1,0.3,1), border-color 0.4s, box-shadow 0.5s",
              transform:isHov?"translateY(-10px) scale(1.02)":"translateY(0) scale(1)",
              boxShadow:isHov
                ?`0 24px 60px rgba(0,0,0,0.25), inset 0 1px 0 rgba(250,244,234,0.3)`
                :`0 8px 32px rgba(0,0,0,0.12), inset 0 1px 0 rgba(250,244,234,0.15)`,
            }}
          >
            {/* Accent glow blob — unique per card */}
            <div style={{
              position:"absolute", top:"15%", left:"50%",
              transform:"translateX(-50%)",
              width:"70%", height:"45%",
              borderRadius:"50%",
              background:`radial-gradient(circle, ${card.accent}${isHov?"55":"30"} 0%, transparent 70%)`,
              transition:"opacity 0.5s",
              pointerEvents:"none",
              filter:"blur(18px)",
            }}/>

            {/* Top art zone */}
            <div style={{
              flex:1, display:"flex",
              alignItems:"center", justifyContent:"center",
              position:"relative", padding:"32px 20px 20px",
            }}>
              {/* Symbol with soft halo */}
              <div style={{
                position:"relative",
                display:"flex", alignItems:"center", justifyContent:"center",
              }}>
                <div style={{
                  position:"absolute",
                  width:80, height:80,
                  borderRadius:"50%",
                  background:`radial-gradient(circle, ${card.accent}${isHov?"40":"22"} 0%, transparent 70%)`,
                  filter:"blur(10px)",
                  transition:"opacity 0.4s",
                }}/>
                <div style={{
                  fontSize:52,
                  transition:"transform 0.5s cubic-bezier(0.16,1,0.3,1)",
                  transform:isHov?"scale(1.18)":"scale(1)",
                  position:"relative", zIndex:1,
                }}>{card.symbol}</div>
              </div>
            </div>

            {/* Divider */}
            <div style={{
              height:1,
              background:`linear-gradient(to right, transparent, ${card.accent}50, transparent)`,
              margin:"0 24px 24px",
            }}/>

            {/* Text zone */}
            <div style={{padding:"0 26px"}}>
              <div style={{
                fontFamily:BODY, fontSize:9,
                letterSpacing:3, color:card.accent,
                marginBottom:8, opacity:0.85,
              }}>{card.sub.toUpperCase()}</div>

              <div style={{
                fontFamily:DISPLAY, fontSize:24,
                color:"rgba(250,244,234,0.95)",
                fontWeight:400, marginBottom:10, lineHeight:1.15,
              }}>{card.title}</div>

              <p style={{
                fontFamily:BODY, fontSize:12,
                color:"rgba(250,244,234,0.55)",
                lineHeight:1.7, marginBottom:18,
              }}>{card.desc}</p>

              <div style={{
                display:"flex", alignItems:"center", gap:6,
                fontFamily:BODY, fontSize:10, letterSpacing:2,
                color:card.accent,
                opacity:isHov?1:0.5,
                transition:"all 0.35s",
                transform:isHov?"translateX(6px)":"translateX(0)",
              }}>ОРОХ →</div>
            </div>
          </button>
        </div>
      </div>
    );
}

// ── 5 WORLD CARDS ───────────────────────────
function WorldCards({go}:{go:(p:Page)=>void}){
  const [hov,setHov]=useState<number|null>(null);

  return(
    <section id="cards-section" style={{padding:"110px 0 90px"}}>
      <div style={{maxWidth:1040,margin:"0 auto",padding:"0 48px"}}>
        <div className="pw-reveal"><Label text="PEARL WHITE-ИЙН ЕРТӨНЦ" light/></div>
        <h2 className="pw-reveal d1" style={{fontFamily:DISPLAY,fontSize:"clamp(32px,5.5vw,70px)",fontWeight:400,lineHeight:1.08,color:C.textLight,letterSpacing:-0.5,marginBottom:64}}>
          Таны эдгэрлийн замыг<br/><em style={{opacity:0.5}}>хамтдаа олно.</em>
        </h2>
        <div style={{display:"flex",flexDirection:"column",gap:16}}>
          {/* Row 1 — 3 cards */}
          <div className="cards-row1" style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:16}}>
            {CARDS.slice(0,3).map((card,i)=>(
              <WorldCard key={card.id} card={card} i={i} hov={hov} setHov={setHov} go={go}/>
            ))}
          </div>
          {/* Row 2 — 2 cards centered */}
          <div className="cards-row2" style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:16,maxWidth:"66.5%",margin:"0 auto",width:"100%"}}>
            {CARDS.slice(3,5).map((card,i)=>(
              <WorldCard key={card.id} card={card} i={i+3} hov={hov} setHov={setHov} go={go}/>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── TESTIMONIALS + PEARL WHITE ───────────────
function Testimonials(){
  const items=[
    {q:"Цусны даралт хэвийн болсон. 3 сарын дараа эмийг бүрэн орхисон. Үнэхээр итгэмжгүй байсан.",n:"Д. Оюунцэцэг",d:"58 нас · Алтан цус + Элексир"},
    {q:"20 жил яс мөчний өвдөлт зовоосон. Фохоу хэрэглэж хагас жилд явж чадсан.",n:"Б. Батзориг",d:"65 нас · Инь-Ян наалт"},
    {q:"Арьс маань 10 насаар залуу болсон шиг. Найз нөхдөд итгүүлэхэд хэцүү — гэвч үр дүн бодитой.",n:"Г. Наранцэцэг",d:"44 нас · Залуужуулах пептид"},
  ];
  return(
    <section style={{padding:"110px 0"}}>
      <div style={{maxWidth:1040,margin:"0 auto",padding:"0 48px"}}>
        <div className="pw-reveal"><Label text="ҮР ДҮН" light/></div>
        <h2 className="pw-reveal d1" style={{fontFamily:DISPLAY,fontSize:"clamp(32px,5.5vw,70px)",fontWeight:400,color:C.textLight,lineHeight:1.08,letterSpacing:-0.5,marginBottom:72}}>
          Жинхэнэ хүмүүс.<br/><em style={{opacity:0.45}}>Жинхэнэ өөрчлөлт.</em>
        </h2>
        <div className="grid3" style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"0 60px"}}>
          {items.map((t,i)=>(
            <div key={i} className={`pw-reveal d${i+1}`} style={{paddingTop:i===1?44:0}}>
              <div style={{fontFamily:DISPLAY,fontSize:48,color:C.gold,opacity:0.22,lineHeight:0.8,marginBottom:18}}>"</div>
              <p style={{fontFamily:DISPLAY,fontSize:"clamp(14px,1.5vw,19px)",fontStyle:"italic",color:C.textLight,lineHeight:1.7,marginBottom:26}}>{t.q}</p>
              <div style={{fontFamily:BODY,fontSize:13,color:C.textLight,opacity:0.55,marginBottom:4}}>{t.n}</div>
              <div style={{fontFamily:BODY,fontSize:11,color:C.textLight,opacity:0.28}}>{t.d}</div>
            </div>
          ))}
        </div>
        {/* Pearl White story */}
        <div className="pw-reveal grid2" style={{marginTop:110,display:"grid",gridTemplateColumns:"1fr 1fr",gap:68,alignItems:"end",paddingTop:68,borderTop:"1px solid rgba(250,247,242,0.08)"}}>
          <div>
            <div style={{fontFamily:DISPLAY,fontSize:"clamp(68px,10vw,118px)",color:C.gold,opacity:0.12,fontWeight:700,lineHeight:0.85,marginBottom:-10}}>7</div>
            <div style={{fontFamily:BODY,fontSize:10,letterSpacing:4,color:C.gold,marginBottom:26}}>CARAT DIAMOND · FOHOW</div>
            <h3 style={{fontFamily:DISPLAY,fontSize:"clamp(24px,3.5vw,46px)",fontWeight:400,color:C.textLight,lineHeight:1.2}}>
              Сувд-Эрдэнэ —<br/><em style={{color:C.jade}}>таны итгэлт зөвлөх.</em>
            </h3>
          </div>
          <div>
            <p style={{fontFamily:BODY,fontSize:15,color:C.textLight,opacity:0.62,lineHeight:1.9,marginBottom:18}}>
              Олон жилийн туршлагатай, FOHOW-ийн хамгийн өндөр зэрэглэл болох 7 Carat Diamond мэргэжилтэн. Тоо баримт биш — жинхэнэ үр дүн, жинхэнэ хүмүүс.
            </p>
            <p style={{fontFamily:BODY,fontSize:15,color:C.textLight,opacity:0.42,lineHeight:1.9}}>
              Эрүүл мэнд, гоо сайхан, эрч хүчний асуудлаараа надтай холбоо бариарай.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── CONTACT ─────────────────────────────────
function Contact(){
  return(
    <section id="contact" style={{padding:"110px 0 130px"}}>
      <div style={{maxWidth:1040,margin:"0 auto",padding:"0 48px"}}>
        <div style={{maxWidth:560}}>
          <div className="pw-reveal"><Label text="ХОЛБОО БАРИХ" light/></div>
          <h2 className="pw-reveal d1" style={{fontFamily:DISPLAY,fontSize:"clamp(36px,6vw,80px)",fontWeight:400,color:C.textLight,lineHeight:1.05,letterSpacing:-0.5,marginBottom:26}}>
            Таны дахин<br/>төрөлт <em style={{color:C.jade}}>өнөөдөр</em><br/>эхэлнэ.
          </h2>
          <p className="pw-reveal d2" style={{fontFamily:BODY,fontSize:15,color:C.textLight,opacity:0.52,lineHeight:1.9,marginBottom:56}}>
            Асуулт байна уу? Ямар бүтээгдэхүүн таньд тохирох талаар үнэгүй зөвлөгөө авахыг хүсч байна уу? Надтай шууд холбогдоорой.
          </p>
          <div className="pw-reveal d3">
            {[
              {label:"WhatsApp",value:"Шууд бичих",href:"https://wa.me/",color:"#4AE06A"},
              {label:"Facebook",value:"Pearl White",href:"https://facebook.com/",color:"#6B9FE8"},
              {label:"Утасны дугаар",value:"Дуудлага хийх",href:"tel:",color:C.goldLight},
            ].map((c,i)=>(
              <a key={i} href={c.href} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"24px 0",borderBottom:"1px solid rgba(250,247,242,0.09)",transition:"padding-left 0.32s cubic-bezier(0.16,1,0.3,1)"}}
                onMouseEnter={e=>{e.currentTarget.style.paddingLeft="14px";}}
                onMouseLeave={e=>{e.currentTarget.style.paddingLeft="0";}}>
                <div>
                  <div style={{fontFamily:BODY,fontSize:10,letterSpacing:3,color:C.textLight,opacity:0.3,marginBottom:5}}>{c.label}</div>
                  <div style={{fontFamily:DISPLAY,fontSize:22,color:C.textLight,fontWeight:400}}>{c.value}</div>
                </div>
                <div style={{width:36,height:36,borderRadius:"50%",border:"1px solid rgba(250,247,242,0.18)",display:"flex",alignItems:"center",justifyContent:"center",color:c.color,fontSize:14}}>→</div>
              </a>
            ))}
          </div>
        </div>
        <div className="pw-reveal" style={{marginTop:90,textAlign:"right"}}>
          <Lotus color="rgba(250,247,242,0.18)"/>
          <blockquote style={{fontFamily:DISPLAY,fontSize:"clamp(14px,1.7vw,20px)",fontStyle:"italic",color:C.textLight,opacity:0.28,lineHeight:1.7,marginTop:24}}>
            "Феникс шатахаасаа айдаггүй —<br/>учир нь үнснээсээ дахин мэндлэхийг мэддэг."
          </blockquote>
          <div style={{fontFamily:BODY,fontSize:10,letterSpacing:4,color:C.gold,opacity:0.45,marginTop:16}}>✦ PEARL WHITE ✦</div>
        </div>
      </div>
    </section>
  );
}

// ── FOOTER ──────────────────────────────────
function Footer({go}:{go:(p:Page)=>void}){
  return(
    <footer style={{borderTop:"1px solid rgba(250,247,242,0.07)",padding:"32px 48px",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:14}}>
      <button onClick={()=>go("home")} style={{fontFamily:DISPLAY,fontSize:16,fontStyle:"italic",color:C.textLight,opacity:0.38,background:"none",border:"none"}}>Pearl White</button>
      <div style={{fontFamily:BODY,fontSize:10,letterSpacing:1.5,color:C.textLight,opacity:0.18}}>© 2025 Сувд-Эрдэнэ · FOHOW Mongolia</div>
      <div style={{fontFamily:BODY,fontSize:10,letterSpacing:2.5,color:C.gold,opacity:0.38}}>ЦЭВЭР · ТЭНЦВЭР · НӨХӨН</div>
    </footer>
  );
}

// ═══════════════════════════════════════════
// CATEGORY PAGES
// ═══════════════════════════════════════════
function CategoryHero({title,sub,tagline,gradient,accent,onBack}:{title:string;sub:string;tagline:string;gradient:string;accent:string;onBack:()=>void}){
  useEffect(()=>{window.scrollTo(0,0);},[]);
  return(
    <section style={{minHeight:"60vh",background:gradient,display:"flex",flexDirection:"column",justifyContent:"flex-end",padding:"130px 48px 68px",position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",right:"3%",top:"50%",transform:"translateY(-50%)",opacity:0.06,pointerEvents:"none"}}>
        <Phoenix size={380} color="#FAF7F2"/>
      </div>
      <button onClick={onBack} style={{position:"absolute",top:96,left:48,fontFamily:BODY,fontSize:11,letterSpacing:2,color:C.textLight,opacity:0.42,background:"none",border:"none",transition:"opacity 0.2s"}}
        onMouseEnter={e=>(e.currentTarget.style.opacity="1")} onMouseLeave={e=>(e.currentTarget.style.opacity="0.42")}>← БУЦАХ</button>
      <div style={{maxWidth:680,position:"relative",zIndex:1}}>
        <div style={{fontFamily:BODY,fontSize:10,letterSpacing:4,color:accent,marginBottom:18,opacity:0.85}}>{sub.toUpperCase()}</div>
        <h1 style={{fontFamily:DISPLAY,fontSize:"clamp(44px,8vw,96px)",fontWeight:300,lineHeight:0.92,color:C.textLight,letterSpacing:-2,marginBottom:22,animation:"fadeup 0.85s cubic-bezier(0.16,1,0.3,1) forwards"}}>{title}</h1>
        <p style={{fontFamily:DISPLAY,fontSize:"clamp(15px,1.7vw,20px)",fontStyle:"italic",color:C.textLight,opacity:0.55,lineHeight:1.6}}>{tagline}</p>
      </div>
    </section>
  );
}

function ProductsPage({go,onBack}:{go:(p:Page,id?:string)=>void;onBack:()=>void}){
  useReveal();
  const [hov,setHov]=useState<number|null>(null);
  return(
    <div>
      <CategoryHero title="Бүтээгдэхүүн" sub="Дотоод эдгэлт" tagline="Биеийн гүн тэнцвэрийг сэргээх байгалийн гаралтай бүтээгдэхүүнүүд." gradient="linear-gradient(160deg,#2C5444,#1E3D32,#0F2018)" accent="#7ECBA8" onBack={onBack}/>
      <section style={{padding:"90px 48px 130px",maxWidth:1040,margin:"0 auto"}}>
        {PRODUCTS.map((p,i)=>(
          <div key={p.id} className={`pw-reveal d${(i%4)+1}`}>
            <button onClick={()=>go("product-detail",p.id)} onMouseEnter={()=>setHov(i)} onMouseLeave={()=>setHov(null)}
              style={{width:"100%",background:"none",border:"none",display:"grid",gridTemplateColumns:"52px 1fr 1fr 110px",alignItems:"center",gap:36,padding:"28px 0",borderBottom:"1px solid rgba(250,247,242,0.08)",transition:"padding-left 0.32s cubic-bezier(0.16,1,0.3,1)",paddingLeft:hov===i?16:0}}
              className="prodrow">
              <div style={{fontSize:28}}>{p.emoji}</div>
              <div style={{textAlign:"left"}}>
                <div style={{fontFamily:DISPLAY,fontSize:"clamp(20px,2.6vw,32px)",color:hov===i?p.accent:C.textLight,fontWeight:400,marginBottom:4,transition:"color 0.3s"}}>{p.name}</div>
                <div style={{fontFamily:BODY,fontSize:11,color:C.textLight,opacity:0.3,letterSpacing:1}}>{p.sub}</div>
              </div>
              <div className="prodesc" style={{fontFamily:BODY,fontSize:13,color:C.textLight,opacity:hov===i?0.62:0.32,lineHeight:1.7,textAlign:"left",transition:"opacity 0.3s"}}>{p.tagline}</div>
              <div className="prodtag" style={{fontFamily:BODY,fontSize:10,color:p.accent,letterSpacing:2,opacity:hov===i?1:0.38,transition:"all 0.3s",transform:hov===i?"translateX(5px)":"none",textAlign:"right"}}>ДЭЛГЭРЭНГҮЙ →</div>
            </button>
          </div>
        ))}
      </section>
    </div>
  );
}

function WellnessPage({go,onBack}:{go:(p:Page,id?:string)=>void;onBack:()=>void}){
  useReveal();
  const [hov,setHov]=useState<number|null>(null);
  return(
    <div>
      <CategoryHero title="Wellness Spa" sub="Гадна эдгэлт" tagline="Массаж, дулаан эмчилгээ, цэгийн эмчилгээ — биеийн гадна тэнцвэр." gradient="linear-gradient(160deg,#4A2A0A,#2A1500,#0F0800)" accent="#E8A040" onBack={onBack}/>
      <section style={{padding:"90px 48px 130px",maxWidth:1040,margin:"0 auto"}}>
        {SPA_ITEMS.map((s,i)=>(
          <div key={s.id} className={`pw-reveal d${(i%4)+1}`}>
            <button onClick={()=>go("spa-detail",s.id)} onMouseEnter={()=>setHov(i)} onMouseLeave={()=>setHov(null)}
              style={{width:"100%",background:"none",border:"none",display:"grid",gridTemplateColumns:"52px 1fr 1fr 110px",alignItems:"center",gap:36,padding:"28px 0",borderBottom:"1px solid rgba(250,247,242,0.08)",transition:"padding-left 0.32s cubic-bezier(0.16,1,0.3,1)",paddingLeft:hov===i?16:0}}
              className="prodrow">
              <div style={{fontSize:28}}>{s.emoji}</div>
              <div style={{textAlign:"left"}}>
                <div style={{fontFamily:DISPLAY,fontSize:"clamp(20px,2.6vw,32px)",color:hov===i?s.accent:C.textLight,fontWeight:400,marginBottom:4,transition:"color 0.3s"}}>{s.name}</div>
                <div style={{fontFamily:BODY,fontSize:11,color:C.textLight,opacity:0.3,letterSpacing:1}}>{s.sub}</div>
              </div>
              <div className="prodesc" style={{fontFamily:BODY,fontSize:13,color:C.textLight,opacity:hov===i?0.62:0.32,lineHeight:1.7,textAlign:"left",transition:"opacity 0.3s"}}>{s.tagline}</div>
              <div className="prodtag" style={{fontFamily:BODY,fontSize:10,color:s.accent,letterSpacing:2,opacity:hov===i?1:0.38,transition:"all 0.3s",transform:hov===i?"translateX(5px)":"none",textAlign:"right"}}>ДЭЛГЭРЭНГҮЙ →</div>
            </button>
          </div>
        ))}
      </section>
    </div>
  );
}

function ComingSoonPage({title,gradient,accent,onBack}:{title:string;gradient:string;accent:string;onBack:()=>void}){
  useEffect(()=>{window.scrollTo(0,0);},[]);
  return(
    <section style={{minHeight:"100vh",background:gradient,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"130px 48px",position:"relative",overflow:"hidden",textAlign:"center"}}>
      <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",opacity:0.05,pointerEvents:"none"}}><Phoenix size={480} color="#FAF7F2"/></div>
      <button onClick={onBack} style={{position:"absolute",top:96,left:48,fontFamily:BODY,fontSize:11,letterSpacing:2,color:C.textLight,opacity:0.42,background:"none",border:"none"}}>← БУЦАХ</button>
      <div style={{position:"relative",zIndex:1}}>
        <div style={{fontFamily:BODY,fontSize:10,letterSpacing:5,color:accent,marginBottom:28,opacity:0.8}}>ТЭРЛҮҮН ИРНЭ</div>
        <h1 style={{fontFamily:DISPLAY,fontSize:"clamp(44px,9vw,108px)",fontWeight:300,color:C.textLight,lineHeight:0.92,letterSpacing:-2,marginBottom:28}}>{title}</h1>
        <p style={{fontFamily:DISPLAY,fontSize:20,fontStyle:"italic",color:C.textLight,opacity:0.42,marginBottom:52}}>Энэ хэсэг удахгүй нэмэгдэнэ.</p>
        <Lotus color={`${accent}50`}/>
        <div style={{marginTop:52}}>
          <button onClick={onBack} style={{fontFamily:BODY,fontSize:11,letterSpacing:2.5,color:C.textLight,background:`${accent}22`,border:`1px solid ${accent}50`,padding:"13px 34px",transition:"background 0.3s"}}
            onMouseEnter={e=>(e.currentTarget.style.background=`${accent}38`)} onMouseLeave={e=>(e.currentTarget.style.background=`${accent}22`)}>
            PEARL WHITE-ТАЙ ХОЛБОГДОХ →
          </button>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════
// DETAIL PAGE — products & spa
// ═══════════════════════════════════════════
function DetailPage({id,type,onBack}:{id:string;type:"product"|"spa";onBack:()=>void}){
  useEffect(()=>{window.scrollTo(0,0);},[id]);
  useReveal();

  const item = type==="product"
    ? PRODUCTS.find(p=>p.id===id)
    : SPA_ITEMS.find(s=>s.id===id);

  if(!item) return(
    <div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center"}}>
      <button onClick={onBack} style={{fontFamily:BODY,color:C.textLight,background:"none",border:"none",fontSize:16}}>← БУЦАХ</button>
    </div>
  );

  const prod = item as typeof PRODUCTS[0];
  const spa  = item as typeof SPA_ITEMS[0];
  const isSpa = type==="spa";

  return(
    <div>
      {/* HERO */}
      <section style={{minHeight:"100vh",background:item.gradient,display:"flex",flexDirection:"column",justifyContent:"flex-end",padding:"130px 48px 72px",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",right:"4%",top:"50%",transform:"translateY(-50%)",opacity:0.07,pointerEvents:"none"}}><Phoenix size={460} color="#FAF7F2"/></div>
        <button onClick={onBack} style={{position:"absolute",top:96,left:48,fontFamily:BODY,fontSize:11,letterSpacing:2,color:C.textLight,opacity:0.42,background:"none",border:"none",transition:"opacity 0.2s"}}
          onMouseEnter={e=>(e.currentTarget.style.opacity="1")} onMouseLeave={e=>(e.currentTarget.style.opacity="0.42")}>← БУЦАХ</button>
        <div style={{maxWidth:700,position:"relative",zIndex:1}}>
          <div style={{fontFamily:BODY,fontSize:10,letterSpacing:4,color:item.accent,marginBottom:20,opacity:0.85}}>{isSpa?"WELLNESS SPA":"БҮТЭЭГДЭХҮҮН"}</div>
          <h1 style={{fontFamily:DISPLAY,fontSize:"clamp(48px,9vw,116px)",fontWeight:300,lineHeight:0.9,color:C.textLight,letterSpacing:-2,marginBottom:14,animation:"fadeup 0.9s cubic-bezier(0.16,1,0.3,1) forwards"}}>{item.name}</h1>
          <div style={{fontFamily:DISPLAY,fontSize:19,fontStyle:"italic",color:C.textLight,opacity:0.5,marginBottom:36}}>{item.sub}</div>
          <p style={{fontFamily:DISPLAY,fontSize:"clamp(16px,1.9vw,22px)",fontStyle:"italic",color:C.textLight,opacity:0.78,lineHeight:1.55,maxWidth:540}}>{item.tagline}</p>
        </div>
      </section>

      <div style={{maxWidth:880,margin:"0 auto",padding:"0 48px"}}>
        {/* Description */}
        <div className="pw-reveal" style={{padding:"90px 0 0",fontFamily:BODY,fontSize:"clamp(15px,1.7vw,19px)",color:C.textLight,opacity:0.72,lineHeight:1.9,marginBottom:72}}>
          {isSpa ? spa.desc : prod.desc}
        </div>

        {/* Philosophy */}
        <div className="pw-reveal" style={{marginBottom:72}}>
          <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:28}}>
            <div style={{width:22,height:1,background:item.accent,opacity:0.4}}/>
            <span style={{fontFamily:BODY,fontSize:10,letterSpacing:4,color:item.accent,opacity:0.75}}>ФИЛОСОФИ</span>
          </div>
          <p style={{fontFamily:DISPLAY,fontSize:"clamp(17px,2.1vw,24px)",fontStyle:"italic",color:C.textLight,lineHeight:1.75,opacity:0.82}}>{item.philosophy}</p>
        </div>

        <Lotus color={`${item.accent}55`}/>

        {/* How it works */}
        <div className="pw-reveal" style={{margin:"64px 0"}}>
          <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:24}}>
            <div style={{width:22,height:1,background:item.accent,opacity:0.4}}/>
            <span style={{fontFamily:BODY,fontSize:10,letterSpacing:4,color:item.accent,opacity:0.75}}>ХЭРХЭН ҮЙЛЧИЛДЭГ ВЭ</span>
          </div>
          <p style={{fontFamily:BODY,fontSize:15,color:C.textLight,opacity:0.66,lineHeight:1.9}}>{item.howItWorks}</p>
        </div>

        {/* Ingredients — products only */}
        {!isSpa && prod.ingredients && (
          <div className="pw-reveal" style={{marginBottom:64}}>
            <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:28}}>
              <div style={{width:22,height:1,background:item.accent,opacity:0.4}}/>
              <span style={{fontFamily:BODY,fontSize:10,letterSpacing:4,color:item.accent,opacity:0.75}}>НАЙРЛАГА</span>
            </div>
            {prod.ingredients.map((ing,i)=>(
              <div key={i} className={`pw-reveal d${i+1}`} style={{display:"grid",gridTemplateColumns:"1fr 1.6fr",gap:28,padding:"22px 0",borderBottom:"1px solid rgba(250,247,242,0.07)"}}>
                <div style={{fontFamily:DISPLAY,fontSize:17,color:C.textLight,fontWeight:400}}>{ing.name}</div>
                <div style={{fontFamily:BODY,fontSize:13,color:C.textLight,opacity:0.52,lineHeight:1.75}}>{ing.benefit}</div>
              </div>
            ))}
          </div>
        )}

        {/* Usage */}
        <div className="pw-reveal" style={{marginBottom:64}}>
          <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:28}}>
            <div style={{width:22,height:1,background:item.accent,opacity:0.4}}/>
            <span style={{fontFamily:BODY,fontSize:10,letterSpacing:4,color:item.accent,opacity:0.75}}>ХЭРЭГЛЭХ ЗААВАР</span>
          </div>
          {(isSpa?spa.usage:prod.usage).map((u,i)=>(
            <div key={i} className={`pw-reveal d${i+1}`} style={{display:"grid",gridTemplateColumns:"130px 1fr",gap:28,padding:"22px 0",borderBottom:"1px solid rgba(250,247,242,0.07)"}}>
              <div style={{fontFamily:DISPLAY,fontSize:17,color:item.accent,fontWeight:400}}>{u.step}</div>
              <div style={{fontFamily:BODY,fontSize:14,color:C.textLight,opacity:0.62,lineHeight:1.8}}>{u.detail}</div>
            </div>
          ))}
        </div>

        {/* Who for + Timeline / Benefits */}
        <div className="grid2" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:56,marginBottom:64}}>
          <div className="pw-reveal">
            <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:24}}>
              <div style={{width:22,height:1,background:item.accent,opacity:0.4}}/>
              <span style={{fontFamily:BODY,fontSize:10,letterSpacing:4,color:item.accent,opacity:0.75}}>{isSpa?"ҮР ДҮН":"ХЭНД ТОХИРОМЖТОЙ"}</span>
            </div>
            {(isSpa?spa.benefits:prod.whoFor).map((w,i)=>(
              <div key={i} style={{fontFamily:BODY,fontSize:14,color:C.textLight,opacity:0.6,padding:"11px 0",borderBottom:"1px solid rgba(250,247,242,0.06)",display:"flex",alignItems:"center",gap:10}}>
                <span style={{color:item.accent,fontSize:9}}>✦</span>{w}
              </div>
            ))}
          </div>
          <div className="pw-reveal d1">
            <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:24}}>
              <div style={{width:22,height:1,background:item.accent,opacity:0.4}}/>
              <span style={{fontFamily:BODY,fontSize:10,letterSpacing:4,color:item.accent,opacity:0.75}}>ХОСЛУУЛАХ</span>
            </div>
            {item.pairWith.map((p,i)=>(
              <div key={i} style={{fontFamily:BODY,fontSize:13,color:C.textLight,opacity:0.52,padding:"11px 0",borderBottom:"1px solid rgba(250,247,242,0.06)",display:"flex",gap:10,lineHeight:1.6}}>
                <span style={{color:item.accent,flexShrink:0}}>+</span>{p}
              </div>
            ))}
          </div>
        </div>

        {/* Timeline — products only */}
        {!isSpa && prod.timeline && (
          <div className="pw-reveal" style={{marginBottom:80}}>
            <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:28}}>
              <div style={{width:22,height:1,background:item.accent,opacity:0.4}}/>
              <span style={{fontFamily:BODY,fontSize:10,letterSpacing:4,color:item.accent,opacity:0.75}}>ҮР ДҮН — ХУГАЦАА</span>
            </div>
            {prod.timeline.map((t,i)=>(
              <div key={i} className={`pw-reveal d${i+1}`} style={{padding:"18px 0",borderBottom:"1px solid rgba(250,247,242,0.06)"}}>
                <div style={{fontFamily:DISPLAY,fontSize:15,color:item.accent,marginBottom:5}}>{t.period}</div>
                <div style={{fontFamily:BODY,fontSize:13,color:C.textLight,opacity:0.5,lineHeight:1.6}}>{t.result}</div>
              </div>
            ))}
          </div>
        )}

        {/* CTA */}
        <div style={{textAlign:"center",padding:"60px 0 110px",borderTop:"1px solid rgba(250,247,242,0.07)"}}>
          <Lotus color={`${item.accent}45`}/>
          <h3 style={{fontFamily:DISPLAY,fontSize:"clamp(26px,3.8vw,48px)",fontWeight:400,color:C.textLight,lineHeight:1.2,margin:"44px 0 20px"}}>
            Pearl White-тай холбоо барьж<br/><em style={{color:item.accent}}>зөвлөгөө аваарай.</em>
          </h3>
          <p style={{fontFamily:BODY,fontSize:14,color:C.textLight,opacity:0.4,marginBottom:36}}>Танд тохирох бүтээгдэхүүнийг хамтдаа тодорхойлно.</p>
          <a href="https://wa.me/" style={{display:"inline-block",fontFamily:BODY,fontSize:11,letterSpacing:2.5,color:C.textLight,background:`${item.accent}28`,border:`1px solid ${item.accent}55`,padding:"13px 34px",transition:"background 0.3s"}}
            onMouseEnter={e=>(e.currentTarget.style.background=`${item.accent}42`)} onMouseLeave={e=>(e.currentTarget.style.background=`${item.accent}28`)}>
            WHATSAPP-ААР ХОЛБОГДОХ →
          </a>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════
// APP ROOT — ROUTER
// ═══════════════════════════════════════════
export default function App(){
  const [page,setPage]=useState<Page>("home");
  const [detailId,setDetailId]=useState<string>("");

  const go=(p:Page,id?:string)=>{
    setPage(p);
    if(id)setDetailId(id);
    window.scrollTo({top:0,behavior:"smooth"});
  };

  useReveal();

  const renderPage=()=>{
    switch(page){
      case "home":       return <><Hero go={go}/><Marquee light/><Philosophy/><FohowBand/><Marquee/><WorldCards go={go}/><Testimonials/><Contact/><Footer go={go}/></>;
      case "products":   return <ProductsPage go={go} onBack={()=>go("home")}/>;
      case "wellness":   return <WellnessPage go={go} onBack={()=>go("home")}/>;
      case "beauty":     return <ComingSoonPage title="Арьс Гоошрол" gradient="linear-gradient(160deg,#5A1A3A,#350F22,#180508)" accent="#E890B8" onBack={()=>go("home")}/>;
      case "nutrition":  return <ComingSoonPage title="Хоол Тэжээл"  gradient="linear-gradient(160deg,#1A3A5A,#0F2040,#050F20)" accent="#90C8F0" onBack={()=>go("home")}/>;
      case "business":   return <ComingSoonPage title="Бизнес Боломж" gradient="linear-gradient(160deg,#7A4A1A,#4A2A08,#1A0F00)" accent="#F0C060" onBack={()=>go("home")}/>;
      case "product-detail": return <DetailPage id={detailId} type="product" onBack={()=>go("products")}/>;
      case "spa-detail":     return <DetailPage id={detailId} type="spa"     onBack={()=>go("wellness")}/>;
      default:           return <><Hero go={go}/></>;
    }
  };

  return(
    <>
      <GlobalStyles/>
      <Cursor/>
      <Nav go={go}/>
      <main>{renderPage()}</main>
    </>
  );
}
