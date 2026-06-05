import React, { useState, useEffect, useRef } from "react";

// ═══════════════════════════════════════════════════════════════
// CHARRIS WELLNESS — Эрүүл мэнд · Гоо сайхан · Боломж
// Design: Deep plum/oxblood + antique gold + pearl light
// Phoenix parallax + gold frame poster hero
// Fonts: Cormorant Garamond + PT Sans (Mogul when available)
// ═══════════════════════════════════════════════════════════════

// ───────────────────────────────────────────
// DESIGN TOKENS
// ───────────────────────────────────────────
const V = {
  night:      "#090006",
  plum950:    "#16000d",
  plum900:    "#240016",
  plum800:    "#39001f",
  plum700:    "#4c0829",
  oxblood:    "#5b0b25",
  antique:    "#b8791d",
  champagne:  "#e6bd67",
  pearl:      "#fff4df",
  muted:      "rgba(255,244,223,0.72)",
  dim:        "rgba(255,244,223,0.45)",
  line:       "rgba(230,189,103,0.38)",
  lineSoft:   "rgba(230,189,103,0.18)",
  display:    "'Mogul','Cormorant Garamond',Georgia,serif",
  body:       "'PT Sans','Lato','Helvetica Neue',sans-serif",
};

// ───────────────────────────────────────────
// DATA — PRODUCTS
// ───────────────────────────────────────────
const PRODUCTS = [
  {
    id:"elixir", name:"Элексир", sub:"Хорхой өвс + Линчжи",
    emoji:"🌿", accent:"#7ECBA8",
    gradient:`linear-gradient(160deg,#0a2a1a 0%,#061a10 60%,#020e08 100%)`,
    tagline:"Феникс шиг дахин төрөх эрч хүч",
    desc:"Дархлааны тогтолцоог бэхжүүлж, элэг, бөөр, уушгийг нэгэн зэрэг тэтгэдэг байгалийн хамгийн хүчирхэг бүтээгдэхүүн.",
    philosophy:"Төвдийн уулархаг нутгийн хатуу ширүүн орчинд өссөн хорхой өвс нь байгалийн хамгийн ховор эрдэнэсийн нэг. 5000 жилийн дорнын анагаах ухаан энэ ургамлыг 'мөнхийн эрч хүчний эх' гэж нэрлэдэг.",
    howItWorks:"Хорхой өвс нь биеийн ATP энергийн үйлдвэрлэлийг нэмэгдүүлж, эсийн хүчилтөрөгчийн хэрэглээг оновчтой болгоно. Линчжи нь бета-глюканы тусламжтайгаар дархлааны системийг тохируулна.",
    ingredients:[
      {name:"Хорхой өвс (Cordyceps)",benefit:"Дархлаа, эрч хүч, уушги, бөөрний үйл ажиллагааг дэмжинэ"},
      {name:"Линчжи (Ganoderma)",benefit:"Зүрх судас, элэг хамгаалах, хавдрын эсрэг, нойр сайжруулна"},
      {name:"Биологийн идэвхит бодис",benefit:"Эсийн түвшинд ажиллаж нөхөн сэргэлтийг хурдасгана"},
    ],
    usage:[
      {step:"Өглөө",detail:"Өглөөний цай идэхийн өмнө 1 хайрцаг (10мл) ууна."},
      {step:"Орой",detail:"Оройн хоолны дараа 30 минут болоод 1 хайрцаг ууна."},
      {step:"Цикл",detail:"25 хоног ууж 5 хоног завсарлана. 3 сар давтана."},
    ],
    whoFor:["Дархлаа сул хүмүүс","Байнга ядардаг","Элэг бөөрний асуудалтай","0-100 насны бүх хүн"],
    pairWith:["Саньцин — эхлээд цэвэрлэнэ","Линчжи — хослуулан хүч нэмнэ"],
    timeline:[
      {period:"1-р долоо хоног",result:"Нойр сайжирна, ядаргаа бага мэдрэгдэнэ"},
      {period:"1-р сар",result:"Эрч хүч нэмэгдэнэ, арьс гэрэлтэнэ"},
      {period:"3-р сар",result:"Дархлаа бэхжиж шинжилгээ сайжирна"},
    ],
  },
  {
    id:"lingzhi", name:"Линчжи", sub:"Мөнхийн өвс",
    emoji:"🍄", accent:"#E8A090",
    gradient:`linear-gradient(160deg,#2a0a08 0%,#1a0605 60%,#0e0302 100%)`,
    tagline:"4000 жилийн мөнхийн нууц",
    desc:"100 гаруй өвчинд үйлчилдэг, зүрх судасны системийг хамгаалж, хөгшрөлтийг удаашруулдаг эртний эрдэнэ.",
    philosophy:"Хятадын эртний эзэд Линчжийг 'мөнхийн амьдралын өвс' гэж нэрлэж ордон харшиндаа тариалдаг байжээ. Инь-ян тэнцвэрийн хамгийн гүн нөлөөтэй ургамал.",
    howItWorks:"Линчжийн биологийн идэвхит бодисууд дархлааны T-эсийг идэвхжүүлж байгалийн NK эсүүдийн үйл ажиллагааг нэмэгдүүлнэ.",
    ingredients:[
      {name:"Линчжийн полисахарид",benefit:"Дархлааны системийг идэвхжүүлнэ"},
      {name:"Тритерпен",benefit:"Цусны даралт холестерол зохицуулна"},
      {name:"Аденозин",benefit:"Цусны эргэлтийг сайжруулна"},
    ],
    usage:[
      {step:"Өглөө",detail:"Өглөөний хоолны өмнө 2 хавтгай халбага нунтаг."},
      {step:"Хэрэглэх арга",detail:"Халуун усанд уусгаж цай болгон ууна."},
      {step:"Цикл",detail:"Тасралтгүй 3 сар. Дараа нь 1 сар завсарлана."},
    ],
    whoFor:["Зүрх судасны асуудалтай","Хавдрын эрсдэлтэй","Стресс их мэдрэгддэг","Нойргүйдэлд нэрвэгддэг"],
    pairWith:["Элексир — хамгийн хүчтэй хослол","Алтан цус — зүрх судасны хамгаалалт"],
    timeline:[
      {period:"2 долоо хоног",result:"Нойр тайвшрал сайжирна"},
      {period:"1-р сар",result:"Цусны даралт тогтворжино"},
      {period:"3-р сар",result:"Дархлааны шинжилгээ сайжирна"},
    ],
  },
  {
    id:"sanqing", name:"Саньцин", sub:"Гүн цэвэрлэгч",
    emoji:"💧", accent:"#7EC8E0",
    gradient:`linear-gradient(160deg,#020e18 0%,#010810 60%,#000508 100%)`,
    tagline:"Феникс шатахаасаа өмнө цэвэрлэгддэг",
    desc:"Гэдэс, цус, эд эсийг гүн цэвэрлэж хорт бодис гадагшлуулна. Бүх эдгэрлийн эхлэл.",
    philosophy:"Феникс дахин төрөхийн өмнө хуучин бүрхүүлээ бүрэн шатааж гадагшлуулдаг. Саньцин бол таны биеийн тэр шатах үйл явц.",
    howItWorks:"Гэдэс бол биеийн хоёр дахь тархи. Саньцин гэдэсний хана дахь хуримтлагдсан хаягдлыг зөөлнөөр зайлуулна.",
    ingredients:[
      {name:"Санай (Senna)",benefit:"Гэдэсний хөдөлгөөнийг зохицуулна"},
      {name:"Хийморь ургамал",benefit:"Цусыг цэвэрлэнэ"},
      {name:"Пробиотик",benefit:"Гэдэсний эрүүл бичил биетэнг сэргээнэ"},
    ],
    usage:[
      {step:"Орой",detail:"Орой унтахаасаа өмнө 1 хайрцаг ууна."},
      {step:"Ус их уух",detail:"Өдөрт 8-10 аяга ус заавал уух."},
      {step:"Цикл",detail:"7 хоног ууж 7 хоног завсарлана. 3 удаа давтана."},
    ],
    whoFor:["Гэдэсний асуудалтай","Арьс муутай","Жин хасахыг хүсдэг"],
    pairWith:["Элексир — цэвэрлэсний дараа нөхөн сэргээнэ"],
    timeline:[
      {period:"1-3 хоног",result:"Гэдэсний хөдөлгөөн сайжирна"},
      {period:"1 долоо хоног",result:"Хөнгөн мэдрэгдэж арьс гэрэлтэнэ"},
      {period:"1 сар",result:"Жин буурч эрч хүч нэмэгдэнэ"},
    ],
  },
  {
    id:"peptide", name:"Пептид", sub:"Залуужуулах систем",
    emoji:"✨", accent:"#E8A8D0",
    gradient:`linear-gradient(160deg,#1a0618 0%,#100410 60%,#080208 100%)`,
    tagline:"10 насаар залуужих нобелийн шинжлэх ухаан",
    desc:"2012 оны Нобелийн шагналтай технологи. Эсийн автофагийг идэвхжүүлж 10 насаар залуужуулах мэдрэмж өгнө.",
    philosophy:"2012 онд Нобелийн шагнал авсан Ёшинори Охсумигийн нээлт — эс өөрийгөө цэвэрлэж шинэчлэх чадвартай.",
    howItWorks:"Пептид молекулууд эсийн мембраныг нэвтэрч митохондрийн үйл ажиллагааг сайжруулна.",
    ingredients:[
      {name:"Биологийн идэвхит пептид",benefit:"Эсийн автофагийг идэвхжүүлнэ"},
      {name:"Коллаген пептид",benefit:"Арьсны уян хатан чанарыг сэргээнэ"},
      {name:"Антиоксидант",benefit:"Хөгшрөлтийг удаашруулна"},
    ],
    usage:[
      {step:"Өглөө",detail:"Өглөөний хоолны өмнө 1 хайрцаг (15мл)."},
      {step:"Орой",detail:"Унтахаасаа 1 цагийн өмнө 1 хайрцаг."},
      {step:"Цикл",detail:"Тасралтгүй 3 сар. Жилд 2 удаа."},
    ],
    whoFor:["40 наснаас дээш","Арьс хөгшрөлтөөс сэргийлэхийг хүсдэг","Эрч хүч буурсан"],
    pairWith:["Линчжи — гүн нөхөн сэргэлт","Кальци — бүрэн залуужилт"],
    timeline:[
      {period:"2 долоо хоног",result:"Нойр сайжирч арьс гэрэлтэнэ"},
      {period:"1 сар",result:"Эрч хүч нэмэгдэнэ"},
      {period:"3 сар",result:"10 насаар залуу харагдах мэдрэмж"},
    ],
  },
  {
    id:"golden-blood", name:"Алтан цус", sub:"Судас цэвэрлэгч",
    emoji:"🩸", accent:"#F0C060",
    gradient:`linear-gradient(160deg,#1a0e00 0%,#100900 60%,#080500 100%)`,
    tagline:"Алтан цус — залуу судас",
    desc:"Цус судасны хана дахь хуримтлалыг задлаж цусны эргэлтийг сайжруулна.",
    philosophy:"Дорнын анагаах ухаанд 'Цус бол амьдрал' гэдэг. Цэвэр хүчирхэг цустай бол бие бүхэлдээ хүч чадалтай байна.",
    howItWorks:"Натто киназ цусны сийвэн дэх фибриныг задалж бүлэгнэлт үүсэхээс сэргийлнэ.",
    ingredients:[
      {name:"Натто киназ",benefit:"Тромбыг задлана"},
      {name:"Коензим Q10",benefit:"Зүрхийг хамгаална"},
      {name:"Омега-3",benefit:"Судасны хана зөөлрүүлнэ"},
    ],
    usage:[
      {step:"Өглөө",detail:"Өглөөний хоолны дараа 2 капсул."},
      {step:"Орой",detail:"Оройн хоолны дараа 2 капсул."},
      {step:"Цикл",detail:"3 сар тасралтгүй."},
    ],
    whoFor:["Цусны даралт өндөр","Холестерол ихтэй","50 наснаас дээш"],
    pairWith:["Линчжи — зүрх судасны хамгаалалт","Саньцин — хамт цэвэрлэнэ"],
    timeline:[
      {period:"2 долоо хоног",result:"Даралт тогтворжино"},
      {period:"1 сар",result:"Толгой өвдөх буурна"},
      {period:"3 сар",result:"Шинжилгээ сайжирна"},
    ],
  },
  {
    id:"calcium", name:"Зөөлөн кальци", sub:"Далайн гаралтай",
    emoji:"🦴", accent:"#90C8F0",
    gradient:`linear-gradient(160deg,#00060e 0%,#000408 60%,#000204 100%)`,
    tagline:"Далайн эрдэнэ — биеийн суурь",
    desc:"Далайн гаралтай кальци — 90%+ шингэдэг. 200 гаруй өвчнөөс сэргийлнэ.",
    philosophy:"Монгол хүний яс хүчтэй байдаг — нүүдлийн амьдрал, мал сүргийн хоол. Гэвч орчин үеийн амьдрал кальцийн дутагдал үүсгэж байна.",
    howItWorks:"Далайн кальци нь хэт нарийн молекулын хэмжээтэй тул гэдэсний хана хялбар нэвтрүүлдэг.",
    ingredients:[
      {name:"Далайн кальци карбонат",benefit:"90%+ шингэлттэй"},
      {name:"D3 витамин",benefit:"Кальцийн шингэлтийг нэмэгдүүлнэ"},
      {name:"Магни",benefit:"Яс булчингийн ажиллагааг дэмжинэ"},
    ],
    usage:[
      {step:"Хоолны дараа",detail:"Гурван удаагийн хоолны дараа 2 халбага."},
      {step:"Ус",detail:"Дулаан устай хольж ууна."},
      {step:"Цикл",detail:"Тасралтгүй хэрэглэх боломжтой."},
    ],
    whoFor:["Яс сийрэгжилт","Үс их унадаг","Жирэмсэн эмэгтэйчүүд"],
    pairWith:["Элексир — дархлаа яс хамт бэхжинэ","Пептид — бүрэн нөхөн сэргэлт"],
    timeline:[
      {period:"1 сар",result:"Үс унах буурна"},
      {period:"3 сар",result:"Яс өвдөх буурна"},
      {period:"6 сар",result:"Нягтрал шинжилгээнд сайжрал"},
    ],
  },
];

const SPA_ITEMS = [
  {
    id:"massage",name:"Массажны аппарат",sub:"Биоэнергийн массаж",
    emoji:"⚡",accent:"#D4A060",
    gradient:`linear-gradient(160deg,#1a0e04 0%,#100900 60%,#080500 100%)`,
    tagline:"Эрч хүчний оргил цэгүүдийг сэрээх",
    desc:"FOHOW-ийн биоэнергийн массажны аппарат биеийн 365 меридиан цэгт нөлөөлнө.",
    philosophy:"Дорнын анагаах ухаанд бие дэх ци нь меридианаар урсдаг. Эдгээр замын саад тотгорыг арилгавал бие эдгэнэ.",
    howItWorks:"Биоэнергийн долгион арьсны доогуур нэвтэрч булчингийн тогтолцоог зөөлрүүлнэ.",
    usage:[
      {step:"Бэлтгэл",detail:"Массаж хийхийн өмнө 1 аяга дулаан ус уу."},
      {step:"Хугацаа",detail:"Нэг газарт 10-15 минут. Нийт 30-45 минут."},
      {step:"Дараа нь",detail:"30 минут амарч ус их уу."},
    ],
    benefits:["Нуруу мөрний өвдөлт буурна","Цусны эргэлт сайжирна","Стресс тайлагдана","Нойр сайжирна"],
    duration:"30-45 минут",frequency:"Өдөр бүр",
    pairWith:["Инь-Ян наалт — массажны дараа","Элексир — гүн нөхөн сэргэлтэд"],
  },
  {
    id:"moxibustion",name:"Мишок",sub:"Моксо — дулаан эмчилгээ",
    emoji:"🔥",accent:"#E8A040",
    gradient:`linear-gradient(160deg,#1a0800 0%,#100500 60%,#080300 100%)`,
    tagline:"Гурван мянган жилийн галын эдгэлт",
    desc:"Артемиз ургамлын дулааныг ашиглан биеийн хүйтэн эрч хүчийг арилгадаг эртний эмчилгээ.",
    philosophy:"Инь-ян онолд хэт их инь биед хуримтлагдвал өвчин үүснэ. Мишок ян-г нэмж тэнцвэрийг сэргээнэ.",
    howItWorks:"Артемиз шатах үед үүсэх дулаан арьсаар нэвтэрч меридианаар дамжна.",
    usage:[
      {step:"Зай",detail:"Мишокыг арьснаас 2-3 см зайд барина."},
      {step:"Хөдөлгөөн",detail:"Тойрог хөдөлгөөнөөр 15-20 минут."},
      {step:"Цэгүүд",detail:"Гэдэс, нуруу, өвдөг — хүйтэн газрууд."},
    ],
    benefits:["Яс мөчний өвдөлт буурна","Хүйтэн хэвлий засагдана","Дархлаа бэхжинэ"],
    duration:"20-30 минут",frequency:"7 хоногт 3-5 удаа",
    pairWith:["Инь-Ян наалт — хамт хэрэглэнэ"],
  },
  {
    id:"patches",name:"Инь-Ян наалт",sub:"Цэгийн эмчилгээ",
    emoji:"☯",accent:"#80E0A8",
    gradient:`linear-gradient(160deg,#02100a 0%,#010a06 60%,#000504 100%)`,
    tagline:"Унтаж байхдаа эдгэх",
    desc:"Биеийн тодорхой цэгүүдэд наах наалт 8-12 цагийн турш байгалийн бодисуудыг нэвтрүүлнэ.",
    philosophy:"Зүүний эмчилгээний орчин үеийн хувилбар. Зүү хатгахгүйгээр яг тэр цэгүүдэд нөлөөлнө.",
    howItWorks:"Наалтны байгалийн орц арьсны гадаргуур нэвтэрч меридианы цэгүүдэд нөлөөлнө.",
    usage:[
      {step:"Цэг сонгох",detail:"Charris таны асуудлын дагуу аль цэгт наахыг заана."},
      {step:"Наах",detail:"Сонгосон цэгт дарж наана."},
      {step:"Хугацаа",detail:"8-12 цаг. Унтаж байхдаа наавал хамгийн сайн."},
    ],
    benefits:["Толгой өвдөх буурна","Нойргүйдэл засагдана","Өвдөлт намдана"],
    duration:"8-12 цаг",frequency:"Өдөр бүр",
    pairWith:["Массажны аппарат — хослуулан хэрэглэнэ"],
  },
  {
    id:"warming",name:"Дулаацуулагч",sub:"Эмэгтэйчүүдийн эрүүл мэнд",
    emoji:"🌸",accent:"#E890B8",
    gradient:`linear-gradient(160deg,#1a0210 0%,#100108 60%,#080006 100%)`,
    tagline:"Эмэгтэй хүний хамгийн нандин эрдэнэ",
    desc:"Дорнын анагаах ухааны 'умай хүйтэн' онолд суурилсан. Эмэгтэйчүүдийн репродуктив эрүүл мэндийг байгалийн аргаар шийдэнэ.",
    philosophy:"Дорнын анагаах ухаанд умай дулаан байвал эмэгтэй хүн эрүүл цэцэглэнэ.",
    howItWorks:"Нано дулааны технологи ашиглан умайн хэсэгт 38-42°C тогтвортой дулаан өгнө.",
    usage:[
      {step:"Байрлал",detail:"Аппаратыг хэвлийн доор байрлуул."},
      {step:"Хугацаа",detail:"30-60 минут."},
      {step:"Сарын тэмдэгний үе",detail:"Сарын тэмдэгний үеэр тусгайлан зөвлөдөг."},
    ],
    benefits:["Сарын тэмдэгний өвдөлт буурна","Умайн хүйтэн засагдана","Арьс гэрэлтэнэ"],
    duration:"30-60 минут",frequency:"Өдөр бүр",
    pairWith:["Элексир — гүн дотоод тэнцвэр"],
  },
];

const PORTALS = [
  {id:"products", num:"01", tag:"Дотоод тэнцвэр", title:"Бүтээгдэхүүн",
   desc:"Дархлаа, эрч хүч, нөхөн сэргэлтийг дэмжих сонгомол бүтээгдэхүүнүүд.",
   symbol:"🌿", glow:"rgba(141,189,157,0.18)", page:"products"},
  {id:"wellness", num:"02", tag:"Нөхөн сэргэлт", title:"Wellness Spa",
   desc:"Дулаан, массаж, тайвшрал — биеийн гүн амралтыг нэг дор мэдрүүлэх.",
   symbol:"✦", glow:"rgba(230,189,103,0.20)", page:"wellness"},
  {id:"beauty", num:"03", tag:"Гэрэлтэлт", title:"Арьс Гоошрол",
   desc:"Арьсаа хайрлах, гэрэлтэх, өөртөө итгэх мэдрэмжийг сэргээх.",
   symbol:"🌸", glow:"rgba(184,121,29,0.16)", page:"beauty"},
  {id:"nutrition", num:"04", tag:"Хэмнэл", title:"Хоол Тэжээл",
   desc:"Өдөр тутмын амьдралд ойр, биеийн онцлогт нийцсэн тэжээл.",
   symbol:"☯", glow:"rgba(139,107,146,0.18)", page:"nutrition"},
  {id:"business", num:"05", tag:"Өсөлт", title:"Бизнес Боломж",
   desc:"Эрүүл амьдралын үнэ цэнийг бусадтай хуваалцаж шинэ боломж нээх.",
   symbol:"◆", glow:"rgba(91,11,37,0.22)", page:"business"},
];

type Page =
  | "home"
  | "products"|"wellness"|"beauty"|"nutrition"|"business"
  | "product-detail"|"spa-detail";

// ───────────────────────────────────────────
// GLOBAL STYLES
// ───────────────────────────────────────────
function GlobalStyles(){
  return(
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=PT+Sans:ital,wght@0,400;0,700;1,400&display=swap');
      *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
      html{background:${V.night};color:${V.pearl};font-family:${V.body};scroll-behavior:smooth;cursor:none;}
      body{
        margin:0;overflow-x:hidden;
        background:
          radial-gradient(circle at 50% 7%, rgba(255,244,223,.1), transparent 26%),
          linear-gradient(180deg, ${V.night}, ${V.plum900} 42%, #2f001b 72%, ${V.night});
      }
      *{cursor:none!important;}
      a{text-decoration:none;color:inherit;}
      button{font:inherit;}
      ::selection{background:rgba(230,189,103,0.3);color:${V.night};}
      ::-webkit-scrollbar{width:2px;}
      ::-webkit-scrollbar-thumb{background:rgba(230,189,103,0.35);}

      .pw-reveal{opacity:0;transform:translateY(40px);transition:opacity 0.9s cubic-bezier(0.16,1,0.3,1),transform 0.9s cubic-bezier(0.16,1,0.3,1);}
      .pw-reveal.vis{opacity:1;transform:translateY(0);}
      .d1{transition-delay:0.1s}.d2{transition-delay:0.22s}.d3{transition-delay:0.34s}.d4{transition-delay:0.46s}

      .card-wrap{perspective:1100px;}
      .card-inner{transform:rotateY(86deg) translateY(20px);opacity:0;transition:transform 0.85s cubic-bezier(0.16,1,0.3,1),opacity 0.55s ease;}
      .card-inner.flipped{transform:rotateY(0deg) translateY(0);opacity:1;}

      @keyframes breathe{0%,100%{opacity:.14;transform:scale(1) translate3d(0,0,0);}50%{opacity:.2;transform:scale(1.03) translate3d(0,-5px,0);}}
      @keyframes sunmove{0%,100%{opacity:.9;}50%{opacity:1;}}
      @keyframes fadeup{from{opacity:0;transform:translateY(24px);}to{opacity:1;transform:translateY(0);}}
      @keyframes marquee{from{transform:translateX(0);}to{transform:translateX(-50%);}}

      @media(max-width:860px){
        .topbar-nav{display:none!important;}
        .split-grid{grid-template-columns:1fr!important;}
        .portal-grid{grid-template-columns:1fr!important;}
        .founder-grid{grid-template-columns:1fr!important;}
        .detail-grid{grid-template-columns:1fr!important;}
      }
    `}</style>
  );
}

// ───────────────────────────────────────────
// CURSOR
// ───────────────────────────────────────────
function Cursor(){
  const dot=useRef<HTMLDivElement>(null);
  const ring=useRef<HTMLDivElement>(null);
  const m=useRef({x:-200,y:-200});
  const s=useRef({x:-200,y:-200});
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
    <div ref={dot} style={{...base,width:5,height:5,background:V.champagne}}/>
    <div ref={ring} style={{...base,width:24,height:24,border:`1px solid rgba(230,189,103,0.5)`}}/>
  </>);
}

// ───────────────────────────────────────────
// SCROLL REVEAL
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
          e.target.querySelectorAll(".card-wrap").forEach((w,i)=>{
            const inn=w.querySelector(".card-inner");
            if(inn)setTimeout(()=>inn.classList.add("flipped"),i*160);
          });
          cobs.unobserve(e.target);
        }
      });
    },{threshold:0.1});
    const sec=document.getElementById("portal-section");
    if(sec)cobs.observe(sec);
    return()=>{obs.disconnect();cobs.disconnect();};
  });
}

// ───────────────────────────────────────────
// SCROLL VARIABLE — powers phoenix parallax
// ───────────────────────────────────────────
function useScrollVar(){
  useEffect(()=>{
    const update=()=>{
      const max=Math.max(1,document.body.scrollHeight-window.innerHeight);
      const val=Math.min(1,Math.max(0,window.scrollY/max));
      document.documentElement.style.setProperty("--scroll",val.toFixed(4));
    };
    update();
    window.addEventListener("scroll",update,{passive:true});
    window.addEventListener("resize",update,{passive:true});
    return()=>{window.removeEventListener("scroll",update);window.removeEventListener("resize",update);};
  },[]);
}

// ───────────────────────────────────────────
// NAV
// ───────────────────────────────────────────
function Nav({go}:{go:(p:Page)=>void}){
  const [hidden,setHidden]=useState(false);
  const lastY=useRef(0);
  useEffect(()=>{
    const fn=()=>{
      const y=window.scrollY;
      setHidden(y>lastY.current&&y>120);
      lastY.current=y;
    };
    window.addEventListener("scroll",fn,{passive:true});
    return()=>window.removeEventListener("scroll",fn);
  },[]);
  return(
    <header style={{
      position:"fixed",zIndex:100,left:28,right:28,top:22,
      minHeight:74,display:"grid",
      gridTemplateColumns:"auto 1fr auto",
      alignItems:"center",gap:28,
      borderTop:`1px solid rgba(230,189,103,0.36)`,
      borderBottom:`1px solid rgba(230,189,103,0.2)`,
      background:"linear-gradient(180deg,rgba(9,0,6,0.58),rgba(9,0,6,0.18))",
      backdropFilter:"blur(14px)",
      transform:hidden?"translateY(-120%)":"translateY(0)",
      transition:"transform 0.5s cubic-bezier(0.16,1,0.3,1)",
    }}>
      {/* Mark */}
      <button onClick={()=>go("home")} style={{display:"flex",alignItems:"center",gap:12,background:"none",border:"none",minWidth:220}}>
        <div style={{width:42,height:42,display:"grid",placeItems:"center",border:`1px solid rgba(230,189,103,0.52)`,borderRadius:"50%",color:V.champagne,fontFamily:V.display,fontSize:22,fontStyle:"italic",background:"rgba(255,244,223,0.045)"}}>C</div>
        <div>
          <strong style={{display:"block",fontFamily:V.display,fontSize:20,fontWeight:500,lineHeight:0.9,letterSpacing:"0.15em",textTransform:"uppercase" as const,color:V.pearl}}>Charris</strong>
          <span style={{display:"block",marginTop:5,color:"rgba(255,244,223,0.58)",fontSize:10,letterSpacing:"0.22em",textTransform:"uppercase" as const,fontFamily:V.body}}>Wellness</span>
        </div>
      </button>
      {/* Nav links */}
      <nav className="topbar-nav" style={{justifySelf:"center",display:"flex",gap:22,color:"rgba(255,244,223,0.58)",fontSize:10,letterSpacing:"0.22em",textTransform:"uppercase" as const,fontFamily:V.body}}>
        {[["Эрүүл мэнд","portal-section"],["Гоо сайхан","portal-section"],["Боломж","portal-section"]].map(([l,id])=>(
          <button key={l} onClick={()=>document.getElementById(id)?.scrollIntoView({behavior:"smooth"})}
            style={{background:"none",border:"none",color:"rgba(255,244,223,0.58)",fontSize:10,letterSpacing:"0.22em",textTransform:"uppercase" as const,fontFamily:V.body,transition:"color 0.2s"}}
            onMouseEnter={e=>(e.currentTarget.style.color=V.champagne)}
            onMouseLeave={e=>(e.currentTarget.style.color="rgba(255,244,223,0.58)")}
          >{l}</button>
        ))}
      </nav>
      {/* CTA */}
      <button onClick={()=>document.getElementById("contact")?.scrollIntoView({behavior:"smooth"})}
        style={{minHeight:42,padding:"0 18px",border:`1px solid rgba(230,189,103,0.48)`,borderRadius:999,background:"rgba(255,244,223,0.04)",color:V.champagne,fontSize:10,fontWeight:700,letterSpacing:"0.2em",textTransform:"uppercase" as const,fontFamily:V.body,transition:"background 0.3s"}}
        onMouseEnter={e=>(e.currentTarget.style.background="rgba(230,189,103,0.14)")}
        onMouseLeave={e=>(e.currentTarget.style.background="rgba(255,244,223,0.04)")}
      >Холбогдох</button>
    </header>
  );
}

// ───────────────────────────────────────────
// HERO
// ───────────────────────────────────────────
function Hero({go}:{go:(p:Page)=>void}){
  const [alive,setAlive]=useState(false);
  useEffect(()=>{setTimeout(()=>setAlive(true),150);},[]);
  return(
    <section style={{minHeight:"100svh",display:"grid",placeItems:"center",padding:"124px 22px 44px",position:"relative"}}>
      {/* Phoenix parallax bg */}
      <div style={{
        position:"fixed",inset:"-9% -6%",zIndex:-5,
        backgroundImage:"url('/phoenix-abstract-inkflame-v1.png')",
        backgroundSize:"cover",
        backgroundPosition:"50% calc(44% - var(--scroll, 0) * 9%)",
        opacity:0.17,
        filter:"sepia(0.2) saturate(0.8) hue-rotate(318deg) contrast(1.1) brightness(0.72)",
        transform:"scale(calc(1.04 + var(--scroll, 0) * 0.035)) translate3d(0, calc(var(--scroll, 0) * -5vh), 0)",
        pointerEvents:"none",
      }}/>
      {/* Sun glow */}
      <div style={{
        position:"fixed",inset:0,zIndex:-4,pointerEvents:"none",
        background:`
          radial-gradient(circle at 50% calc(18% + var(--scroll, 0) * 35%), rgba(255,244,223,0.44), transparent 18%),
          radial-gradient(circle at 50% calc(44% + var(--scroll, 0) * 12%), rgba(230,189,103,0.16), transparent 28%),
          linear-gradient(180deg, rgba(255,244,223,0.07), transparent 30%, rgba(184,121,29,0.07) 52%, rgba(91,11,37,0.4))
        `,
        mixBlendMode:"screen",
      }}/>
      {/* Lace texture */}
      <div style={{
        position:"fixed",inset:0,zIndex:-3,pointerEvents:"none",opacity:0.12,
        backgroundImage:`linear-gradient(45deg, transparent 48%, rgba(230,189,103,0.2) 49%, rgba(230,189,103,0.2) 51%, transparent 52%), linear-gradient(-45deg, transparent 48%, rgba(230,189,103,0.16) 49%, rgba(230,189,103,0.16) 51%, transparent 52%)`,
        backgroundSize:"64px 64px",
        WebkitMaskImage:"linear-gradient(180deg, #000 0, transparent 32%, transparent 66%, #000 100%)",
        maskImage:"linear-gradient(180deg, #000 0, transparent 32%, transparent 66%, #000 100%)",
      }}/>

      {/* Poster */}
      <div style={{
        width:"min(1160px,100%)",
        minHeight:"calc(100svh - 178px)",
        position:"relative",display:"grid",placeItems:"center",
        padding:"clamp(54px,8vw,112px)",
        background:`
          radial-gradient(circle at 50% 42%, rgba(255,244,223,0.1), transparent 27%),
          radial-gradient(circle at 50% 62%, rgba(184,121,29,0.13), transparent 36%),
          linear-gradient(180deg, rgba(255,244,223,0.02), rgba(9,0,6,0.18))
        `,
        boxShadow:"0 44px 130px rgba(0,0,0,0.28)",
        overflow:"hidden",
        opacity:alive?1:0,
        transition:"opacity 1.4s ease 0.2s",
      }}>
        {/* Gold frame PNG */}
        <div style={{
          position:"absolute",inset:0,
          backgroundImage:"url('/charris-gold-frame.png')",
          backgroundSize:"100% 100%",
          backgroundRepeat:"no-repeat",
          backgroundPosition:"center",
          opacity:0.68,
          filter:"sepia(0.28) saturate(0.82) hue-rotate(350deg) brightness(0.72) contrast(1.08)",
          pointerEvents:"none",
        }}/>
        {/* Inner border */}
        <div style={{position:"absolute",inset:"10.5%",border:`1px solid rgba(230,189,103,0.16)`,pointerEvents:"none"}}/>

        {/* Content */}
        <div style={{position:"relative",zIndex:2,maxWidth:870,textAlign:"center"}}>
          {/* Seal */}
          <div style={{
            width:88,height:88,margin:"0 auto 26px",
            display:"grid",placeItems:"center",
            border:`1px solid rgba(230,189,103,0.5)`,borderRadius:"50%",
            color:V.champagne,fontFamily:V.display,fontSize:40,fontStyle:"italic",
            background:"radial-gradient(circle, rgba(255,244,223,0.1), rgba(255,244,223,0.02) 60%)",
          }}>C</div>

          <div style={{color:"rgba(255,244,223,0.62)",fontSize:10,letterSpacing:"0.34em",textTransform:"uppercase" as const,fontFamily:V.body}}>
            FOHOW · 7 CARAT DIAMOND · МОНГОЛ
          </div>

          <h1 style={{
            margin:"18px 0 0",fontFamily:V.display,
            fontSize:"clamp(58px,10vw,140px)",
            fontWeight:500,lineHeight:0.83,letterSpacing:"0.065em",
            textTransform:"uppercase" as const,color:V.pearl,
          }}>
            Charris<br/>Wellness
          </h1>

          <div style={{marginTop:22,color:V.champagne,fontSize:"clamp(15px,1.85vw,23px)",letterSpacing:"0.18em",fontFamily:V.body}}>
            Эрүүл мэнд · Гоо сайхан · Боломж
          </div>

          <p style={{maxWidth:640,margin:"34px auto 0",color:V.muted,fontSize:"clamp(15px,1.35vw,18px)",lineHeight:1.86,fontFamily:V.body}}>
            Өөрчлөлт хүссэн хүн бүрт эрүүл мэнд, гоо сайхан, амьдралын тэнцвэр болон шинэ боломжийг нэг дор ойлгуулж зөөлөн чиглүүлэх премиум зөвлөх орон зай.
          </p>

          <div style={{display:"flex",justifyContent:"center",flexWrap:"wrap" as const,gap:12,marginTop:34}}>
            <button onClick={()=>document.getElementById("contact")?.scrollIntoView({behavior:"smooth"})}
              style={{minHeight:52,display:"inline-flex",alignItems:"center",gap:11,padding:"0 28px",borderRadius:999,border:`1px solid rgba(230,189,103,0.42)`,fontSize:10,fontWeight:700,letterSpacing:"0.22em",textTransform:"uppercase" as const,backdropFilter:"blur(10px)",color:"#1a020a",background:"linear-gradient(180deg,#f3cc78,#b8791d)",boxShadow:"0 20px 60px rgba(184,121,29,0.18)",fontFamily:V.body,transition:"transform 0.2s"}}
              onMouseEnter={e=>(e.currentTarget.style.transform="translateY(-3px)")}
              onMouseLeave={e=>(e.currentTarget.style.transform="translateY(0)")}
            >Зөвлөгөө авах →</button>
            <button onClick={()=>document.getElementById("portal-section")?.scrollIntoView({behavior:"smooth"})}
              style={{minHeight:52,display:"inline-flex",alignItems:"center",gap:11,padding:"0 28px",borderRadius:999,border:`1px solid rgba(230,189,103,0.42)`,fontSize:10,fontWeight:700,letterSpacing:"0.22em",textTransform:"uppercase" as const,backdropFilter:"blur(10px)",color:V.pearl,background:"rgba(255,244,223,0.045)",fontFamily:V.body,transition:"background 0.3s"}}
              onMouseEnter={e=>(e.currentTarget.style.background="rgba(255,244,223,0.1)")}
              onMouseLeave={e=>(e.currentTarget.style.background="rgba(255,244,223,0.045)")}
            >Чиглэлүүд харах →</button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ───────────────────────────────────────────
// PHILOSOPHY SECTION
// ───────────────────────────────────────────
function Philosophy(){
  return(
    <section style={{padding:"104px 22px",position:"relative"}}>
      <div style={{width:"min(1160px,100%)",margin:"0 auto"}}>
        <div className="split-grid" style={{display:"grid",gridTemplateColumns:"0.88fr 1.12fr",gap:"clamp(24px,6vw,84px)",alignItems:"end"}}>
          <h2 className="pw-reveal" style={{margin:0,fontFamily:V.display,fontSize:"clamp(46px,7.8vw,110px)",fontWeight:500,lineHeight:0.9,color:V.pearl}}>
            Танд тохирох чиглэл.
          </h2>
          <p className="pw-reveal d1" style={{maxWidth:620,margin:0,color:V.muted,fontSize:"clamp(15px,1.35vw,18px)",lineHeight:1.86,fontFamily:V.body}}>
            Charris Wellness нь энгийн бүтээгдэхүүний танилцуулга биш. Энэ бол хүний хэрэгцээг сонсоод, эрүүл мэнд, гоо сайхан, тэжээл, үйлчилгээ, боломжийн аль зам тохирохыг хамтдаа тодруулдаг хөтөч систем.
          </p>
        </div>
      </div>
    </section>
  );
}

// ───────────────────────────────────────────
// PORTAL CARD — outside component to prevent re-mount
// ───────────────────────────────────────────
function PortalCard({portal,hov,setHov,go}:{
  portal:typeof PORTALS[0];hov:string|null;
  setHov:(v:string|null)=>void;go:(p:Page)=>void;
}){
  const isH=hov===portal.id;
  return(
    <div className="card-wrap">
      <div className="card-inner">
        <button
          onClick={()=>go(portal.page as Page)}
          onMouseEnter={()=>setHov(portal.id)}
          onMouseLeave={()=>setHov(null)}
          style={{
            width:"100%",minHeight:390,
            position:"relative",display:"flex",flexDirection:"column",
            justifyContent:"space-between",padding:"34px 24px",
            background:`radial-gradient(circle at 50% 0%, ${portal.glow}, transparent 52%), linear-gradient(180deg,rgba(255,244,223,0.055),rgba(9,0,6,0.28))`,
            border:"none",overflow:"hidden",
            borderRadius:4,
            transition:"transform 0.42s cubic-bezier(0.16,1,0.3,1), filter 0.32s",
            transform:isH?"translateY(-14px)":"translateY(0)",
            filter:isH?"brightness(1.08)":"brightness(1)",
          }}
        >
          {/* Gold frame */}
          <div style={{
            position:"absolute",inset:0,
            backgroundImage:"url('/charris-gold-frame.png')",
            backgroundSize:"100% 100%",backgroundRepeat:"no-repeat",
            opacity:0.38,
            filter:"sepia(0.3) saturate(0.74) hue-rotate(350deg) brightness(0.72)",
            pointerEvents:"none",
          }}/>
          {/* Symbol watermark */}
          <div style={{
            position:"absolute",top:44,right:22,
            color:`rgba(230,189,103,0.14)`,
            fontSize:70,transform:"rotate(8deg)",
            pointerEvents:"none",lineHeight:1,
          }}>{portal.symbol}</div>

          <small style={{position:"relative",zIndex:2,color:"rgba(255,244,223,0.52)",fontSize:10,letterSpacing:"0.24em",textTransform:"uppercase" as const,fontFamily:V.body}}>
            {portal.num} / {portal.tag}
          </small>

          <div style={{position:"relative",zIndex:2}}>
            <h3 style={{margin:0,fontFamily:V.display,fontSize:"clamp(28px,2.9vw,42px)",fontWeight:500,lineHeight:1.02,color:V.pearl}}>
              {portal.symbol} {portal.title}
            </h3>
            <p style={{margin:"16px 0 32px",color:"rgba(255,244,223,0.64)",fontSize:13,lineHeight:1.64,fontFamily:V.body}}>
              {portal.desc}
            </p>
            <div style={{
              display:"inline-flex",alignItems:"center",gap:8,
              fontSize:10,letterSpacing:"0.2em",fontWeight:700,
              color:V.champagne,fontFamily:V.body,
              opacity:isH?1:0.55,
              transition:"all 0.3s",
              transform:isH?"translateX(6px)":"translateX(0)",
            }}>ОРОХ →</div>
          </div>
        </button>
      </div>
    </div>
  );
}

// ───────────────────────────────────────────
// PORTALS SECTION
// ───────────────────────────────────────────
function Portals({go}:{go:(p:Page)=>void}){
  const [hov,setHov]=useState<string|null>(null);
  return(
    <section id="portal-section" style={{padding:"0 22px 104px"}}>
      <div style={{width:"min(1160px,100%)",margin:"0 auto"}}>
        <div className="portal-grid" style={{display:"grid",gridTemplateColumns:"repeat(5,minmax(0,1fr))",gap:14}}>
          {PORTALS.map(p=>(
            <PortalCard key={p.id} portal={p} hov={hov} setHov={setHov} go={go}/>
          ))}
        </div>
      </div>
    </section>
  );
}

// ───────────────────────────────────────────
// FOUNDER SECTION
// ───────────────────────────────────────────
function Founder(){
  return(
    <section style={{padding:"104px 22px"}}>
      <div style={{width:"min(1160px,100%)",margin:"0 auto"}}>
        <div className="founder-grid" style={{display:"grid",gridTemplateColumns:"1.1fr 0.9fr",gap:16}}>
          {/* Panel */}
          <div style={{
            position:"relative",minHeight:430,
            padding:"clamp(30px,4vw,52px)",
            background:`radial-gradient(circle at 20% 0%, rgba(230,189,103,0.09), transparent 38%), rgba(9,0,6,0.34)`,
            border:`1px solid rgba(230,189,103,0.22)`,
            borderRadius:4,
          }}>
            <h2 className="pw-reveal" style={{margin:0,fontFamily:V.display,fontSize:"clamp(42px,7vw,98px)",fontWeight:500,lineHeight:0.92,color:V.pearl}}>
              Үүсгэн байгуулагчийн дулаан чиглэл.
            </h2>
            <p className="pw-reveal d1" style={{maxWidth:620,color:V.muted,lineHeight:1.86,fontFamily:V.body,fontSize:16,marginTop:24}}>
              Энэ брэндийн гол хүч нь сүртэй зураг биш, харин итгэл төрүүлэх зөвлөгөө. Хүний асуудлыг сонсож, тохирох бүтээгдэхүүн, үйлчилгээ, амьдралын хэмнэлийг ойлгомжтой тайлбарладаг туршлагатай хөтөчийн мэдрэмж.
            </p>
          </div>
          {/* List */}
          <div style={{display:"grid",gap:12}}>
            {[
              "Эрүүл мэндээ сэргээхийг хүссэн хүнд тайван зөвлөгөө өгнө.",
              "Гоо сайхан, арьс арчилгаа, өөртөө итгэх мэдрэмжийг зөөлөн дэмжинэ.",
              "Өөрчлөлтөө бусадтай хуваалцахыг хүсвэл бизнесийн боломжийг ойлгомжтой танилцуулна.",
              "Phoenix бол арын бэлгэдэл. Charris бол цэвэр, премиум, итгэлтэй хөтөч.",
            ].map((txt,i)=>(
              <div key={i} className={`pw-reveal d${i+1}`} style={{
                minHeight:98,display:"grid",alignItems:"center",padding:18,
                color:"rgba(255,244,223,0.68)",lineHeight:1.6,
                background:`radial-gradient(circle at 20% 0%, rgba(230,189,103,0.09), transparent 38%), rgba(9,0,6,0.34)`,
                border:`1px solid rgba(230,189,103,0.22)`,
                borderRadius:4,fontFamily:V.body,fontSize:14,
              }}>{txt}</div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ───────────────────────────────────────────
// MARQUEE
// ───────────────────────────────────────────
function Marquee(){
  const items=["CHARRIS WELLNESS","✦","ЭРҮҮЛ МЭНД","✦","ГОО САЙХАН","✦","БОЛОМЖ","✦","FOHOW","✦","7 CARAT DIAMOND","✦","ФЕНИКС","✦","ЦЭВЭРЛЭХ","✦","НӨХӨН СЭРГЭЭХ","✦"];
  const txt=[...items,...items].join("   ");
  return(
    <div style={{overflow:"hidden",padding:"14px 0",borderTop:`1px solid rgba(230,189,103,0.15)`,borderBottom:`1px solid rgba(230,189,103,0.15)`,background:"rgba(9,0,6,0.3)"}}>
      <div style={{display:"inline-block",whiteSpace:"nowrap",animation:"marquee 85s linear infinite",fontFamily:V.body,fontSize:10,letterSpacing:"0.38em",color:"rgba(230,189,103,0.55)",fontWeight:700}}>
        {txt}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{txt}
      </div>
    </div>
  );
}

// ───────────────────────────────────────────
// CONTACT / FINAL
// ───────────────────────────────────────────
function Contact(){
  return(
    <section id="contact" style={{
      minHeight:"82svh",display:"grid",placeItems:"center",
      padding:"110px 22px",textAlign:"center",
      background:`radial-gradient(circle at 50% 0%, rgba(230,189,103,0.14), transparent 38%), linear-gradient(180deg, transparent, rgba(9,0,6,0.82) 68%, #050003)`,
    }}>
      <div>
        <div style={{color:"rgba(255,244,223,0.6)",fontSize:10,letterSpacing:"0.34em",textTransform:"uppercase" as const,fontFamily:V.body}}>
          Charris Wellness
        </div>
        <h2 style={{maxWidth:860,margin:"18px auto 0",fontFamily:V.display,fontSize:"clamp(54px,9vw,130px)",fontWeight:500,lineHeight:0.88,color:V.pearl}}>
          Өөрчлөлт тансаг эхэлж болно.
        </h2>
        <p style={{maxWidth:600,margin:"28px auto 0",color:V.muted,lineHeight:1.86,fontFamily:V.body,fontSize:16}}>
          Эрүүл мэнд, гоо сайхан, эрч хүчний асуудлаараа надтай холбоо бариарай. Танд тохирох шийдлийг хамтдаа олно.
        </p>
        <div style={{display:"flex",justifyContent:"center",flexWrap:"wrap" as const,gap:12,marginTop:40}}>
          {[
            {label:"WhatsApp — Шууд бичих",href:"https://wa.me/"},
            {label:"Facebook — Charris Wellness",href:"https://facebook.com/"},
            {label:"Утас — Дуудлага хийх",href:"tel:"},
          ].map((c,i)=>(
            <a key={i} href={c.href} style={{
              minHeight:52,display:"inline-flex",alignItems:"center",gap:10,
              padding:"0 24px",borderRadius:999,
              border:`1px solid rgba(230,189,103,${i===0?0.6:0.3})`,
              fontSize:11,letterSpacing:"0.15em",
              color:i===0?"#1a020a":V.pearl,
              background:i===0?"linear-gradient(180deg,#f3cc78,#b8791d)":"rgba(255,244,223,0.04)",
              fontFamily:V.body,fontWeight:i===0?700:400,
              transition:"transform 0.2s, background 0.3s",
            }}
              onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-3px)";}}
              onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";}}
            >
              {c.label} →
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ───────────────────────────────────────────
// FOOTER
// ───────────────────────────────────────────
function Footer({go}:{go:(p:Page)=>void}){
  return(
    <footer style={{borderTop:`1px solid rgba(230,189,103,0.15)`,padding:"32px 48px",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap" as const,gap:14,background:"rgba(9,0,6,0.6)"}}>
      <button onClick={()=>go("home")} style={{fontFamily:V.display,fontSize:16,fontStyle:"italic",color:"rgba(255,244,223,0.4)",background:"none",border:"none",letterSpacing:"0.1em"}}>Charris Wellness</button>
      <div style={{fontFamily:V.body,fontSize:10,letterSpacing:1.5,color:"rgba(255,244,223,0.2)"}}>© 2025 Charris Wellness · FOHOW Mongolia</div>
      <div style={{fontFamily:V.body,fontSize:10,letterSpacing:"0.25em",color:"rgba(230,189,103,0.4)"}}>ЭРҮҮЛ МЭНД · ГОО САЙХАН · БОЛОМЖ</div>
    </footer>
  );
}

// ───────────────────────────────────────────
// CATEGORY PAGES
// ───────────────────────────────────────────
function CategoryHero({title,sub,tagline,gradient,accent,onBack}:{title:string;sub:string;tagline:string;gradient:string;accent:string;onBack:()=>void}){
  useEffect(()=>{window.scrollTo(0,0);},[]);
  return(
    <section style={{minHeight:"60vh",background:gradient,display:"flex",flexDirection:"column",justifyContent:"flex-end",padding:"130px 48px 68px",position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",right:"3%",top:"50%",transform:"translateY(-50%)",opacity:0.06,pointerEvents:"none",backgroundImage:"url('/phoenix-abstract-inkflame-v1.png')",backgroundSize:"cover",width:400,height:500,backgroundPosition:"center"}}/>
      <button onClick={onBack} style={{position:"absolute",top:96,left:48,fontFamily:V.body,fontSize:11,letterSpacing:2,color:V.pearl,opacity:0.45,background:"none",border:"none",transition:"opacity 0.2s"}}
        onMouseEnter={e=>(e.currentTarget.style.opacity="1")} onMouseLeave={e=>(e.currentTarget.style.opacity="0.45")}>← БУЦАХ</button>
      <div style={{maxWidth:680,position:"relative",zIndex:1}}>
        <div style={{fontFamily:V.body,fontSize:10,letterSpacing:4,color:accent,marginBottom:18,opacity:0.85}}>{sub.toUpperCase()}</div>
        <h1 style={{fontFamily:V.display,fontSize:"clamp(44px,8vw,96px)",fontWeight:500,lineHeight:0.92,color:V.pearl,letterSpacing:"0.04em",marginBottom:22,animation:"fadeup 0.85s cubic-bezier(0.16,1,0.3,1) forwards"}}>{title}</h1>
        <p style={{fontFamily:V.display,fontSize:"clamp(15px,1.7vw,20px)",fontStyle:"italic",color:V.pearl,opacity:0.55,lineHeight:1.6}}>{tagline}</p>
      </div>
    </section>
  );
}

function ProductsPage({go,onBack}:{go:(p:Page,id?:string)=>void;onBack:()=>void}){
  useReveal();
  const [hov,setHov]=useState<number|null>(null);
  return(
    <div>
      <CategoryHero title="Бүтээгдэхүүн" sub="Дотоод эдгэлт" tagline="Биеийн гүн тэнцвэрийг сэргээх байгалийн гаралтай бүтээгдэхүүнүүд." gradient="linear-gradient(160deg,#0a2a1a,#061a10,#020e08)" accent="#7ECBA8" onBack={onBack}/>
      <section style={{padding:"90px 48px 130px",maxWidth:1040,margin:"0 auto"}}>
        {PRODUCTS.map((p,i)=>(
          <div key={p.id} className={`pw-reveal d${(i%4)+1}`}>
            <button onClick={()=>go("product-detail",p.id)} onMouseEnter={()=>setHov(i)} onMouseLeave={()=>setHov(null)}
              style={{width:"100%",background:"none",border:"none",display:"grid",gridTemplateColumns:"52px 1fr 1fr 110px",alignItems:"center",gap:36,padding:"28px 0",borderBottom:`1px solid rgba(230,189,103,0.1)`,transition:"padding-left 0.32s cubic-bezier(0.16,1,0.3,1)",paddingLeft:hov===i?16:0}}>
              <div style={{fontSize:28}}>{p.emoji}</div>
              <div style={{textAlign:"left"}}>
                <div style={{fontFamily:V.display,fontSize:"clamp(20px,2.6vw,32px)",color:hov===i?p.accent:V.pearl,fontWeight:400,marginBottom:4,transition:"color 0.3s"}}>{p.name}</div>
                <div style={{fontFamily:V.body,fontSize:11,color:V.pearl,opacity:0.35,letterSpacing:1}}>{p.sub}</div>
              </div>
              <div style={{fontFamily:V.body,fontSize:13,color:V.pearl,opacity:hov===i?0.75:0.4,lineHeight:1.7,textAlign:"left",transition:"opacity 0.3s"}}>{p.tagline}</div>
              <div style={{fontFamily:V.body,fontSize:10,color:p.accent,letterSpacing:2,opacity:hov===i?1:0.4,transition:"all 0.3s",transform:hov===i?"translateX(5px)":"none",textAlign:"right"}}>ДЭЛГЭРЭНГҮЙ →</div>
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
      <CategoryHero title="Wellness Spa" sub="Гадна эдгэлт" tagline="Массаж, дулаан эмчилгээ, цэгийн эмчилгээ — биеийн гадна тэнцвэр." gradient="linear-gradient(160deg,#1a0800,#100500,#080300)" accent="#E8A040" onBack={onBack}/>
      <section style={{padding:"90px 48px 130px",maxWidth:1040,margin:"0 auto"}}>
        {SPA_ITEMS.map((s,i)=>(
          <div key={s.id} className={`pw-reveal d${(i%4)+1}`}>
            <button onClick={()=>go("spa-detail",s.id)} onMouseEnter={()=>setHov(i)} onMouseLeave={()=>setHov(null)}
              style={{width:"100%",background:"none",border:"none",display:"grid",gridTemplateColumns:"52px 1fr 1fr 110px",alignItems:"center",gap:36,padding:"28px 0",borderBottom:`1px solid rgba(230,189,103,0.1)`,transition:"padding-left 0.32s",paddingLeft:hov===i?16:0}}>
              <div style={{fontSize:28}}>{s.emoji}</div>
              <div style={{textAlign:"left"}}>
                <div style={{fontFamily:V.display,fontSize:"clamp(20px,2.6vw,32px)",color:hov===i?s.accent:V.pearl,fontWeight:400,marginBottom:4,transition:"color 0.3s"}}>{s.name}</div>
                <div style={{fontFamily:V.body,fontSize:11,color:V.pearl,opacity:0.35,letterSpacing:1}}>{s.sub}</div>
              </div>
              <div style={{fontFamily:V.body,fontSize:13,color:V.pearl,opacity:hov===i?0.75:0.4,lineHeight:1.7,textAlign:"left",transition:"opacity 0.3s"}}>{s.tagline}</div>
              <div style={{fontFamily:V.body,fontSize:10,color:s.accent,letterSpacing:2,opacity:hov===i?1:0.4,transition:"all 0.3s",transform:hov===i?"translateX(5px)":"none",textAlign:"right"}}>ДЭЛГЭРЭНГҮЙ →</div>
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
      <button onClick={onBack} style={{position:"absolute",top:96,left:48,fontFamily:V.body,fontSize:11,letterSpacing:2,color:V.pearl,opacity:0.42,background:"none",border:"none"}}>← БУЦАХ</button>
      <div style={{position:"relative",zIndex:1}}>
        <div style={{fontFamily:V.body,fontSize:10,letterSpacing:5,color:accent,marginBottom:28,opacity:0.8}}>ТЭРЛҮҮН ИРНЭ</div>
        <h1 style={{fontFamily:V.display,fontSize:"clamp(44px,9vw,108px)",fontWeight:500,color:V.pearl,lineHeight:0.92,letterSpacing:"0.04em",marginBottom:28}}>{title}</h1>
        <p style={{fontFamily:V.display,fontSize:20,fontStyle:"italic",color:V.pearl,opacity:0.42,marginBottom:52}}>Энэ хэсэг удахгүй нэмэгдэнэ.</p>
        <button onClick={onBack} style={{minHeight:48,padding:"0 28px",borderRadius:999,border:`1px solid rgba(230,189,103,0.45)`,color:V.champagne,fontFamily:V.body,fontSize:10,fontWeight:700,letterSpacing:"0.2em",background:"rgba(255,244,223,0.04)",transition:"background 0.3s"}}
          onMouseEnter={e=>(e.currentTarget.style.background="rgba(255,244,223,0.1)")} onMouseLeave={e=>(e.currentTarget.style.background="rgba(255,244,223,0.04)")}>
          CHARRIS-ТАЙ ХОЛБОГДОХ →
        </button>
      </div>
    </section>
  );
}

// ───────────────────────────────────────────
// DETAIL PAGE
// ───────────────────────────────────────────
function DetailPage({id,type,onBack}:{id:string;type:"product"|"spa";onBack:()=>void}){
  useEffect(()=>{window.scrollTo(0,0);},[id]);
  useReveal();
  const item=type==="product"?PRODUCTS.find(p=>p.id===id):SPA_ITEMS.find(s=>s.id===id);
  if(!item)return(<div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center"}}><button onClick={onBack} style={{fontFamily:V.body,color:V.pearl,background:"none",border:"none",fontSize:16}}>← БУЦАХ</button></div>);
  const prod=item as typeof PRODUCTS[0];
  const spa=item as typeof SPA_ITEMS[0];
  const isSpa=type==="spa";
  return(
    <div>
      <section style={{minHeight:"100vh",background:item.gradient,display:"flex",flexDirection:"column",justifyContent:"flex-end",padding:"130px 48px 72px",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",right:"4%",top:"50%",transform:"translateY(-50%)",opacity:0.06,pointerEvents:"none",backgroundImage:"url('/phoenix-abstract-inkflame-v1.png')",backgroundSize:"cover",width:460,height:580,backgroundPosition:"center"}}/>
        <button onClick={onBack} style={{position:"absolute",top:96,left:48,fontFamily:V.body,fontSize:11,letterSpacing:2,color:V.pearl,opacity:0.45,background:"none",border:"none",transition:"opacity 0.2s"}}
          onMouseEnter={e=>(e.currentTarget.style.opacity="1")} onMouseLeave={e=>(e.currentTarget.style.opacity="0.45")}>← БУЦАХ</button>
        <div style={{maxWidth:700,position:"relative",zIndex:1}}>
          <div style={{fontFamily:V.body,fontSize:10,letterSpacing:4,color:item.accent,marginBottom:20,opacity:0.85}}>{isSpa?"WELLNESS SPA":"БҮТЭЭГДЭХҮҮН"}</div>
          <h1 style={{fontFamily:V.display,fontSize:"clamp(48px,9vw,116px)",fontWeight:500,lineHeight:0.9,color:V.pearl,letterSpacing:"0.04em",marginBottom:14,animation:"fadeup 0.9s cubic-bezier(0.16,1,0.3,1) forwards"}}>{item.name}</h1>
          <div style={{fontFamily:V.display,fontSize:19,fontStyle:"italic",color:V.pearl,opacity:0.55,marginBottom:32}}>{item.sub}</div>
          <p style={{fontFamily:V.display,fontSize:"clamp(16px,1.9vw,22px)",fontStyle:"italic",color:V.pearl,opacity:0.8,lineHeight:1.55,maxWidth:540}}>{item.tagline}</p>
        </div>
      </section>

      <div style={{maxWidth:880,margin:"0 auto",padding:"0 48px"}}>
        <div className="pw-reveal" style={{padding:"90px 0 0",fontFamily:V.body,fontSize:"clamp(15px,1.7vw,19px)",color:V.pearl,opacity:0.75,lineHeight:1.9,marginBottom:64}}>
          {isSpa?spa.desc:prod.desc}
        </div>

        <div className="pw-reveal" style={{marginBottom:64}}>
          <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:24}}>
            <div style={{width:22,height:1,background:item.accent,opacity:0.4}}/>
            <span style={{fontFamily:V.body,fontSize:10,letterSpacing:4,color:item.accent,opacity:0.8}}>ФИЛОСОФИ</span>
          </div>
          <p style={{fontFamily:V.display,fontSize:"clamp(17px,2.1vw,24px)",fontStyle:"italic",color:V.pearl,lineHeight:1.75,opacity:0.85}}>{item.philosophy}</p>
        </div>

        <div className="pw-reveal" style={{marginBottom:64}}>
          <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:24}}>
            <div style={{width:22,height:1,background:item.accent,opacity:0.4}}/>
            <span style={{fontFamily:V.body,fontSize:10,letterSpacing:4,color:item.accent,opacity:0.8}}>ХЭРХЭН ҮЙЛЧИЛДЭГ ВЭ</span>
          </div>
          <p style={{fontFamily:V.body,fontSize:15,color:V.pearl,opacity:0.72,lineHeight:1.9}}>{item.howItWorks}</p>
        </div>

        {!isSpa&&prod.ingredients&&(
          <div className="pw-reveal" style={{marginBottom:64}}>
            <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:24}}>
              <div style={{width:22,height:1,background:item.accent,opacity:0.4}}/>
              <span style={{fontFamily:V.body,fontSize:10,letterSpacing:4,color:item.accent,opacity:0.8}}>НАЙРЛАГА</span>
            </div>
            {prod.ingredients.map((ing,i)=>(
              <div key={i} style={{display:"grid",gridTemplateColumns:"1fr 1.6fr",gap:28,padding:"20px 0",borderBottom:`1px solid rgba(230,189,103,0.1)`}}>
                <div style={{fontFamily:V.display,fontSize:17,color:V.pearl,fontWeight:400}}>{ing.name}</div>
                <div style={{fontFamily:V.body,fontSize:13,color:V.pearl,opacity:0.58,lineHeight:1.75}}>{ing.benefit}</div>
              </div>
            ))}
          </div>
        )}

        <div className="pw-reveal" style={{marginBottom:64}}>
          <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:24}}>
            <div style={{width:22,height:1,background:item.accent,opacity:0.4}}/>
            <span style={{fontFamily:V.body,fontSize:10,letterSpacing:4,color:item.accent,opacity:0.8}}>ХЭРЭГЛЭХ ЗААВАР</span>
          </div>
          {(isSpa?spa.usage:prod.usage).map((u,i)=>(
            <div key={i} style={{display:"grid",gridTemplateColumns:"130px 1fr",gap:28,padding:"20px 0",borderBottom:`1px solid rgba(230,189,103,0.1)`}}>
              <div style={{fontFamily:V.display,fontSize:17,color:item.accent,fontWeight:400}}>{u.step}</div>
              <div style={{fontFamily:V.body,fontSize:14,color:V.pearl,opacity:0.68,lineHeight:1.8}}>{u.detail}</div>
            </div>
          ))}
        </div>

        <div className="detail-grid" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:48,marginBottom:64}}>
          <div className="pw-reveal">
            <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:20}}>
              <div style={{width:22,height:1,background:item.accent,opacity:0.4}}/>
              <span style={{fontFamily:V.body,fontSize:10,letterSpacing:4,color:item.accent,opacity:0.8}}>{isSpa?"ҮР ДҮН":"ХЭНД ТОХИРОМЖТОЙ"}</span>
            </div>
            {(isSpa?spa.benefits:prod.whoFor).map((w,i)=>(
              <div key={i} style={{fontFamily:V.body,fontSize:14,color:V.pearl,opacity:0.65,padding:"10px 0",borderBottom:`1px solid rgba(230,189,103,0.08)`,display:"flex",alignItems:"center",gap:10}}>
                <span style={{color:item.accent,fontSize:9}}>✦</span>{w}
              </div>
            ))}
          </div>
          <div className="pw-reveal">
            <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:20}}>
              <div style={{width:22,height:1,background:item.accent,opacity:0.4}}/>
              <span style={{fontFamily:V.body,fontSize:10,letterSpacing:4,color:item.accent,opacity:0.8}}>ХОСЛУУЛАХ</span>
            </div>
            {item.pairWith.map((p,i)=>(
              <div key={i} style={{fontFamily:V.body,fontSize:13,color:V.pearl,opacity:0.58,padding:"10px 0",borderBottom:`1px solid rgba(230,189,103,0.08)`,display:"flex",gap:10,lineHeight:1.6}}>
                <span style={{color:item.accent,flexShrink:0}}>+</span>{p}
              </div>
            ))}
          </div>
        </div>

        {!isSpa&&prod.timeline&&(
          <div className="pw-reveal" style={{marginBottom:80}}>
            <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:24}}>
              <div style={{width:22,height:1,background:item.accent,opacity:0.4}}/>
              <span style={{fontFamily:V.body,fontSize:10,letterSpacing:4,color:item.accent,opacity:0.8}}>ҮР ДҮН — ХУГАЦАА</span>
            </div>
            {prod.timeline.map((t,i)=>(
              <div key={i} style={{padding:"16px 0",borderBottom:`1px solid rgba(230,189,103,0.08)`}}>
                <div style={{fontFamily:V.display,fontSize:15,color:item.accent,marginBottom:5}}>{t.period}</div>
                <div style={{fontFamily:V.body,fontSize:13,color:V.pearl,opacity:0.55,lineHeight:1.6}}>{t.result}</div>
              </div>
            ))}
          </div>
        )}

        <div style={{textAlign:"center",padding:"60px 0 110px",borderTop:`1px solid rgba(230,189,103,0.1)`}}>
          <h3 style={{fontFamily:V.display,fontSize:"clamp(26px,3.8vw,48px)",fontWeight:500,color:V.pearl,lineHeight:1.2,margin:"0 0 20px"}}>
            Charris-тай холбоо барьж<br/><em style={{color:item.accent}}>зөвлөгөө аваарай.</em>
          </h3>
          <a href="https://wa.me/" style={{display:"inline-flex",alignItems:"center",gap:10,minHeight:48,padding:"0 28px",borderRadius:999,border:`1px solid rgba(230,189,103,0.45)`,color:V.champagne,fontFamily:V.body,fontSize:10,fontWeight:700,letterSpacing:"0.2em",background:"rgba(255,244,223,0.04)",transition:"background 0.3s"}}
            onMouseEnter={e=>(e.currentTarget.style.background="rgba(255,244,223,0.1)")} onMouseLeave={e=>(e.currentTarget.style.background="rgba(255,244,223,0.04)")}>
            WHATSAPP-ААР ХОЛБОГДОХ →
          </a>
        </div>
      </div>
    </div>
  );
}

// ───────────────────────────────────────────
// APP ROOT
// ───────────────────────────────────────────
export default function App(){
  const [page,setPage]=useState<Page>("home");
  const [detailId,setDetailId]=useState("");
  useScrollVar();
  useReveal();

  const go=(p:Page,id?:string)=>{
    setPage(p);
    if(id)setDetailId(id);
    window.scrollTo({top:0,behavior:"smooth"});
  };

  const renderPage=()=>{
    switch(page){
      case "home": return(
        <>
          <Hero go={go}/>
          <Marquee/>
          <Philosophy/>
          <Portals go={go}/>
          <Founder/>
          <Contact/>
          <Footer go={go}/>
        </>
      );
      case "products":  return <ProductsPage go={go} onBack={()=>go("home")}/>;
      case "wellness":  return <WellnessPage go={go} onBack={()=>go("home")}/>;
      case "beauty":    return <ComingSoonPage title="Арьс Гоошрол" gradient="linear-gradient(160deg,#1a0210,#100108,#080006)" accent="#E890B8" onBack={()=>go("home")}/>;
      case "nutrition": return <ComingSoonPage title="Хоол Тэжээл" gradient="linear-gradient(160deg,#00060e,#000408,#000204)" accent="#90C8F0" onBack={()=>go("home")}/>;
      case "business":  return <ComingSoonPage title="Бизнес Боломж" gradient="linear-gradient(160deg,#1a0e00,#100900,#080500)" accent="#F0C060" onBack={()=>go("home")}/>;
      case "product-detail": return <DetailPage id={detailId} type="product" onBack={()=>go("products")}/>;
      case "spa-detail":     return <DetailPage id={detailId} type="spa" onBack={()=>go("wellness")}/>;
      default: return <Hero go={go}/>;
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
