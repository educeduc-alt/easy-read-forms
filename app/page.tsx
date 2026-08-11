"use client";

import { useMemo, useState } from "react";

type Guide = {
  id: string;
  label: string;
  icon: string;
  color: string;
  keywords: string[];
  title: string;
  summary: string;
  steps: { icon: string; title: string; detail: string }[];
  done: string;
};

type FormGuide = {
  id: string;
  short: string;
  title: string;
  icon: string;
  color: string;
  forWho: string;
  prepare: string[];
  steps: { icon: string; title: string; detail: string }[];
  important?: string;
};

const guides: Guide[] = [
  {
    id: "assignment",
    label: "不知道作業怎麼做",
    icon: "📝",
    color: "#ffcf5a",
    keywords: ["作業", "報告", "功課", "題目", "怎麼做", "不會寫"],
    title: "先把作業變成 3 個小步驟",
    summary: "不用一次做完。先找到今天可以做的第一件事。",
    steps: [
      { icon: "👀", title: "看作業要求", detail: "圈出要交什麼、哪一天要交。" },
      { icon: "✏️", title: "先做 10 分鐘", detail: "打開檔案，先寫標題和第一句。" },
      { icon: "🙋", title: "卡住就問", detail: "告訴老師：我做到這裡，這一點不懂。" },
    ],
    done: "我已經開始做，而且知道下一個動作。",
  },
  {
    id: "understand",
    label: "聽不懂老師在說什麼",
    icon: "🤔",
    color: "#8ed7c6",
    keywords: ["聽不懂", "看不懂", "不明白", "老師說", "課程", "解釋"],
    title: "請老師一次說一件事",
    summary: "不懂不是你的錯。你可以請對方換一種方式說。",
    steps: [
      { icon: "✋", title: "先說停一下", detail: "說：老師，我現在沒有聽懂。" },
      { icon: "1️⃣", title: "指出一個問題", detail: "說：請先告訴我第一步要做什麼。" },
      { icon: "🔁", title: "說一次給老師聽", detail: "用自己的話重說，請老師確認。" },
    ],
    done: "我可以用自己的話說出第一步。",
  },
  {
    id: "deadline",
    label: "怕來不及交作業",
    icon: "⏰",
    color: "#f3a7a0",
    keywords: ["來不及", "截止", "時間", "遲交", "今天", "明天", "幾點"],
    title: "先確認時間，再決定今天做什麼",
    summary: "使用完整日期和時間，不只寫「等等」或「晚一點」。",
    steps: [
      { icon: "📅", title: "寫下交件時間", detail: "例如：8 月 14 日下午 5:00。" },
      { icon: "🧩", title: "分成小任務", detail: "資料、草稿、檢查，一次做一項。" },
      { icon: "📣", title: "需要就提早說", detail: "今天告訴老師困難，不要等到最後。" },
    ],
    done: "我知道哪一天、幾點要交，也知道今天先做什麼。",
  },
  {
    id: "tech",
    label: "電腦或網站不能用",
    icon: "💻",
    color: "#aebcf2",
    keywords: ["電腦", "網站", "登入", "密碼", "上傳", "檔案", "系統", "app"],
    title: "留下畫面，請別人一起看",
    summary: "不用一直重試。先保存出錯的線索。",
    steps: [
      { icon: "📸", title: "拍下錯誤畫面", detail: "讓畫面上的文字清楚可見。" },
      { icon: "🗣️", title: "說你做了什麼", detail: "例如：我按了登入，畫面沒有改變。" },
      { icon: "🧑‍🏫", title: "把照片給老師", detail: "請老師告訴你下一個按鈕。" },
    ],
    done: "老師看得到問題，也知道我在哪一步卡住。",
  },
  {
    id: "ask",
    label: "不知道怎麼向老師提問",
    icon: "🙋",
    color: "#f2b7d1",
    keywords: ["怎麼問", "提問", "問老師", "幫忙", "求助", "不知道怎麼說"],
    title: "用 3 句話說清楚",
    summary: "直接說人名和事情，不用「那個」或「這個」。",
    steps: [
      { icon: "📍", title: "說你在做什麼", detail: "老師，我正在寫第 3 題。" },
      { icon: "🚧", title: "說你卡在哪裡", detail: "我不懂「比較」是什麼意思。" },
      { icon: "❓", title: "說你需要什麼", detail: "請用一個例子告訴我。" },
    ],
    done: "我的問題有事情、困難和需要的幫助。",
  },
];

const formGuides: FormGuide[] = [
  { id:"tutoring", short:"申請課業輔導", title:"資源教室課業輔導申請表", icon:"📘", color:"#ffcf5a", forWho:"這學期的必修或選修課讓你很難學習。", prepare:["想申請的科目","可以接受輔導的日期和時間","你的課表"], steps:[{icon:"🗣️",title:"先和個管老師討論",detail:"告訴老師：哪一科、哪裡最困難。"},{icon:"✍️",title:"填學生的欄位",detail:"填基本資料、科目、原因和可以上課的時間。"},{icon:"📨",title:"交給資源教室",detail:"資源教室和任課老師會評估並安排。"}], important:"第一次申請通常在開學第 1 至第 4 週；第二次在第 10 至第 13 週。" },
  { id:"assistant", short:"申請助理人員", title:"特教生助理人員申請表", icon:"🧑‍🤝‍🧑", color:"#8ed7c6", forWho:"你需要課堂、生活、手語翻譯或定向行動協助。", prepare:["當學期課表","需要協助的事情和時段","生活規劃表（依申請需要）"], steps:[{icon:"☝️",title:"選一種服務",detail:"勾選課堂、生活、手語翻譯或定向行動。"},{icon:"🕒",title:"寫清楚時間和地點",detail:"例如：星期二第 3 節，教室 N101。"},{icon:"🤝",title:"接受需求評估",detail:"資源教室會和你確認實際需要，再通知結果。"}], important:"課外課業協助每月原則上限 10 小時；生活協助每週原則上限 30 小時。" },
  { id:"assessment", short:"調整考試方式", title:"特殊教育學生學習評量調整申請表", icon:"🧾", color:"#aebcf2", forWho:"因障礙影響，你需要不同的考試或作答方式。", prepare:["要申請的科目","目前遇到的困難","希望的調整方式"], steps:[{icon:"📚",title:"寫科目和困難",detail:"一次說清楚一個科目的需要。"},{icon:"✅",title:"勾選調整方式",detail:"例如放大文字、延長時間、口語回答或替代作業。"},{icon:"🧑‍🏫",title:"交給資源教室討論",detail:"資源教室會和任課老師確認適合的方式。"}], important:"申請時程通常是開學第 1 至第 4 週，或第 10 至第 13 週。" },
  { id:"transport", short:"申請交通費", title:"身心障礙學生交通費補助申請表", icon:"🚌", color:"#f3a7a0", forWho:"重度或極重度、行動不便、確實無法自行上下學，而且沒有住校。", prepare:["有效學生證正反面影本","有效身心障礙證明正反面影本","戶籍與現居地址、交通方式"], steps:[{icon:"🔎",title:"先確認資格",detail:"請個管老師協助確認障礙程度、通學困難和住宿情形。"},{icon:"📎",title:"準備 2 份證件影本",detail:"學生證和身心障礙證明都要在有效期限內。"},{icon:"📝",title:"填表並交件",detail:"寫清楚無法自行上下學的原因，交給資源教室。"}], important:"這項補助要經過審核會議，不是交表後一定通過。" },
  { id:"isp", short:"一起做支持計畫", title:"學生個別化支持計畫（ISP）", icon:"🧩", color:"#f2b7d1", forWho:"資源教室要和你一起了解學習、生活與未來需要的支持。", prepare:["你的優點和擅長的事","上課或生活遇到的困難","你希望得到的幫助"], steps:[{icon:"💬",title:"說你的現在狀況",detail:"可以請老師用問答方式，不必自己一次填完整本。"},{icon:"🎯",title:"一起選支持目標",detail:"確認課業、生活、輔具、心理或生涯需要。"},{icon:"👀",title:"看過內容再簽名",detail:"請老師用簡單句逐項說明，有不同意就提出。"}], important:"ISP 是一起討論的計畫，不是要學生獨自完成的考卷。" },
  { id:"feedback", short:"填課輔回饋", title:"課業輔導回饋表（學生）", icon:"💬", color:"#ffd98a", forWho:"你剛完成一次課業輔導。", prepare:["課輔日期、時間和地點","課輔科目與內容","你真實的感受"], steps:[{icon:"🗓️",title:"填這次上課資料",detail:"寫日期、科目、時間、地點和學了什麼。"},{icon:"🙂",title:"勾選你的感受",detail:"講解清不清楚、有沒有幫助，都可以誠實回答。"},{icon:"✏️",title:"寫一句心得後交回",detail:"例如：我現在會做第一題。交回資源教室。"}] },
  { id:"volunteer", short:"申請資源教室志工", title:"資源教室志工申請表", icon:"🙌", color:"#b7df9b", forWho:"你想在資源教室協助同學、整理環境或支援活動。", prepare:["聯絡方式","可以值班的節次","願意協助的工作"], steps:[{icon:"👂",title:"先了解工作規則",detail:"服務時要保密，並接受老師的指導。"},{icon:"📅",title:"勾選可值班時間",detail:"只選你真的能到的節次。"},{icon:"📩",title:"簽名並交表",detail:"交給資源教室，等候排班通知。"}], important:"期中、期末考週通常暫停志工活動；不能到班要依規定請假或補時數。" },
  { id:"privacy", short:"看懂個資聲明", title:"特教生個人資料告知聲明", icon:"🔐", color:"#b9d8ea", forWho:"資源教室要蒐集和使用你的個人資料。", prepare:["留時間把內容聽完","不懂的地方直接問","未滿 18 歲時請法定代理人或照顧者一起看"], steps:[{icon:"👁️",title:"先知道收什麼",detail:"可能包含聯絡、學習、家庭、健康和支持服務資料。"},{icon:"🎯",title:"知道為什麼使用",detail:"主要用於在學支持、鑑定、轉銜和依法辦理業務。"},{icon:"✍️",title:"了解後再簽名",detail:"你可詢問、閱覽、更正，也可依法請求停止或刪除。"}], important:"簽名前可以要求逐段說明。未滿 18 歲者另需法定代理人或實際照顧者簽名。" },
  { id:"award", short:"申請獎補助金", title:"特殊教育學生獎補助學金申請表", icon:"🏅", color:"#f2ca76", forWho:"你持有效鑑定證明，並符合成績、操行或競賽條件。", prepare:["前一學年成績單（含操行）","上下學期獎懲紀錄","有效鑑定證明","其他依類別需要的排名、身障或競賽證明"], steps:[{icon:"🧮",title:"先請老師確認資格",detail:"確認入學年度、平均成績、排名、操行和申請類別。"},{icon:"📚",title:"把證明放在一起",detail:"用檢查清單逐份打勾，不要只交申請表。"},{icon:"📮",title:"期限前交給資源教室",detail:"要點寫每年 10 月 31 日前；仍以當年度公告為準。"}], important:"同一教育階段不得重複申領同性質獎補助；請先向資源教室確認最新資格。" },
  { id:"waive", short:"放棄特教學生身分", title:"放棄特殊教育學生身分聲明書", icon:"⚠️", color:"#f1a19b", forWho:"你正在考慮放棄特教學生身分和相關服務。", prepare:["先和資源教室老師面談","逐項確認會失去的服務與權益","需要時請信任的人陪同"], steps:[{icon:"🛑",title:"先不要急著簽",detail:"這會影響獎補助、交通、支持服務等權益。"},{icon:"🗣️",title:"請老師逐項說明",detail:"問清楚放棄後會發生什麼，也討論其他做法。"},{icon:"✍️",title:"確定理解才簽名",detail:"填個人資料與日期；依規定可能需要法定代理人簽名。"}], important:"這是重大決定。易讀說明不能代替個別諮詢，簽名前請務必與資源教室確認。" },
  { id:"replace", short:"更正或換發鑑定證明", title:"鑑定證明更正暨換發申請書", icon:"🪪", color:"#a9d8c8", forWho:"鑑定證明的姓名、身分證字號或生日要更正，或原證遺失、毀損。", prepare:["身分證正反面影本","原鑑定證明正本","遺失或毀損時另填切結書"], steps:[{icon:"✏️",title:"寫原資料和新資料",detail:"只填需要更正的個人資料。"},{icon:"📎",title:"附上證件",detail:"原證要交回；遺失或毀損就附切結書。"},{icon:"📨",title:"簽名並送件",detail:"請資源教室協助確認資料完整。"}], important:"證明已超過適用期限不辦理換發；新證核發後，舊證失效。" },
  { id:"cancel", short:"繳銷鑑定證明", title:"鑑定證明繳銷申請書", icon:"🚫", color:"#d8b0b0", forWho:"你要讓鑑定證明失效，並移除特教通報網資料。", prepare:["先和資源教室確認後果","鑑定證明編號","學生身分證正反面影本"], steps:[{icon:"🛑",title:"先確認權益變化",detail:"繳銷後，需鑑定證明才能申請的權益會受影響。"},{icon:"📝",title:"填資料和簽名",detail:"填證明編號、申請人和身分證字號。"},{icon:"📎",title:"貼證件並交件",detail:"法定代理人或監護人簽名時，也要附身分證明。"}], important:"以後若仍有特殊教育需求，要重新提報鑑定並通過，才會核發新證。" },
  { id:"library", short:"借資源教室的書", title:"諮商輔導中心圖書分館借閱", icon:"📚", color:"#d6c6a5", forWho:"你想借 L105 或 L106 的書、期刊或視聽資料。", prepare:["學生證或借書證","想借的書","確認歸還日期"], steps:[{icon:"📍",title:"到正確地點",detail:"中心館藏在 L105；資源教室館藏在 L106。"},{icon:"🪪",title:"帶證件辦借閱",detail:"一般學生借 L106 館藏一次 2 冊，限空間內閱讀、當天歸還。"},{icon:"↩️",title:"期限前歸還",detail:"資源教室學生一般圖書最多 15 冊，借期 15 日。"}], important:"逾期每本書及附件每日各 5 元；需要續借要在到期前辦理。" },
];

export default function Home() {
  const [checked, setChecked] = useState<boolean[]>([false, false, false]);
  const [formQuery, setFormQuery] = useState("");
  const [selectedForm, setSelectedForm] = useState("tutoring");
  const [view, setView] = useState<"forms" | "steps">("forms");

  const formGuide = useMemo(() => formGuides.find((item) => item.id === selectedForm) ?? formGuides[0], [selectedForm]);
  const filteredForms = formGuides.filter((item) => `${item.short}${item.title}`.includes(formQuery.trim()));
  const completed = checked.every(Boolean);
  const categorySummary = [
    { label: "學習支持", value: 5, color: "#264b78", note: "課輔、助理、評量、ISP、回饋" },
    { label: "補助申請", value: 2, color: "#d49a27", note: "交通費、獎補助金" },
    { label: "權益與證明", value: 4, color: "#d7544d", note: "個資、放棄、更正、繳銷" },
    { label: "校園參與", value: 2, color: "#4a8c64", note: "志工、圖書借閱" },
  ];

  function openSteps(id: string) {
    setSelectedForm(id);
    setChecked([false, false, false]);
    setView("steps");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function backToForms() {
    setView("forms");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <main className="forms-only">
      <header className="topbar">
        <button className="brand brand-button" onClick={backToForms} aria-label="回到看懂表格"><span>表格</span><small>學生易讀小幫手</small></button>
        <div className="flow-nav" aria-label="使用步驟">
          <button className={view === "forms" ? "current" : ""} onClick={backToForms}><span>1</span>看懂表格</button>
          <i aria-hidden>→</i>
          <button className={view === "steps" ? "current" : ""} onClick={() => setView("steps")}><span>2</span>看懂三步驟</button>
        </div>
      </header>

      {view === "forms" ? (
        <>
          <section className="forms-intro">
            <p className="eyebrow">第 1 步・看懂表格</p>
            <h1>找到你手上的表格</h1>
            <p>點一下表格，就會連到最簡單的「看懂三步驟」。</p>
            <label className="form-search">搜尋表格<input value={formQuery} onChange={(event)=>setFormQuery(event.target.value)} placeholder="例如：交通、考試、獎學金" /></label>
          </section>
          <section className="form-catalog" aria-label="表格清單">
            {filteredForms.map((item)=><button key={item.id} onClick={()=>openSteps(item.id)} style={{"--form-color":item.color} as React.CSSProperties}><span className="catalog-icon" aria-hidden>{item.icon}</span><span><b>{item.short}</b><small>{item.title}</small></span><i>看三步驟 →</i></button>)}
            {filteredForms.length===0 && <p className="no-result">找不到這張表。請把表格名稱拿給資源教室老師看。</p>}
          </section>
          <section className="summary" aria-labelledby="summary-title">
            <div className="summary-head"><div><p className="eyebrow">表格彙整</p><h2 id="summary-title">13 張表，分成 4 種用途</h2></div><div className="summary-total"><strong>13</strong><span>份易讀說明</span></div></div>
            <div className="summary-chart" role="img" aria-label="學習支持5份、補助申請2份、權益與證明4份、校園參與2份">
              {categorySummary.map(item=><div className="chart-row" key={item.label}><div><b>{item.label}</b><small>{item.note}</small></div><div className="chart-track"><span style={{width:`${item.value/5*100}%`,background:item.color}}></span></div><strong>{item.value} 份</strong></div>)}
            </div>
            <div className="summary-notes"><article><span>⚠️</span><div><b>10 份有重要提醒</b><p>涉及期限、資格、附件或權益，填寫前要先確認。</p></div></article><article><span>🛑</span><div><b>2 份是重大決定</b><p>放棄身分與繳銷證明，不要急著簽名。</p></div></article><article><span>3</span><div><b>每份都整理成 3 步</b><p>準備資料、完成表格、交給正確的人。</p></div></article></div>
          </section>
        </>
      ) : (
        <section className="three-step-view" style={{"--form-color":formGuide.color} as React.CSSProperties}>
          <button className="back-button" onClick={backToForms}>← 回到看懂表格</button>
          <div className="step-title"><span aria-hidden>{formGuide.icon}</span><div><p className="eyebrow">第 2 步・看懂三步驟</p><h1>{formGuide.short}</h1><small>{formGuide.title}</small></div></div>
          <div className="who"><b>🙋 這張表給誰？</b><p>{formGuide.forWho}</p></div>
          <div className="prepare"><b>📂 先準備</b><ul>{formGuide.prepare.map(item=><li key={item}>{item}</li>)}</ul></div>
          <div className="big-form-steps">{formGuide.steps.map((step,index)=><article className={checked[index]?"done":""} key={step.title}><div className="step-badge">第 {index+1} 步</div><span aria-hidden>{step.icon}</span><h2>{step.title}</h2><p>{step.detail}</p><button onClick={()=>setChecked(old=>old.map((value,i)=>i===index?!value:value))} aria-pressed={checked[index]}>{checked[index]?"✓ 做完了":"○ 完成這一步"}</button></article>)}</div>
          {formGuide.important && <div className="important"><b>⚠️ 要注意</b><p>{formGuide.important}</p></div>}
          <div className={completed?"form-complete show":"form-complete"} aria-live="polite"><span aria-hidden>{completed?"🎉":"☐"}</span><div><b>{completed?"三步都完成了！":"完成確認"}</b><p>{completed?"把正式表格和附件交給資源教室。":"每做完一步，就按一次完成。"}</p></div></div>
          <div className="official-note">這是易讀說明，不是正式申請表。日期、資格和附件，請以資源教室最新公告與正式表格為準。</div>
        </section>
      )}

      <footer>
        <strong>看懂表格・看懂三步驟</strong>
        <p>學生易讀表格小幫手</p>
      </footer>
    </main>
  );
}
