var te=Object.defineProperty,re=Object.defineProperties;var oe=Object.getOwnPropertyDescriptors;var Y=Object.getOwnPropertySymbols;var se=Object.prototype.hasOwnProperty,ne=Object.prototype.propertyIsEnumerable;var q=(i,p,x)=>p in i?te(i,p,{enumerable:!0,configurable:!0,writable:!0,value:x}):i[p]=x,P=(i,p)=>{for(var x in p||(p={}))se.call(p,x)&&q(i,x,p[x]);if(Y)for(var x of Y(p))ne.call(p,x)&&q(i,x,p[x]);return i},B=(i,p)=>re(i,oe(p));var G=(i,p,x)=>new Promise((v,t)=>{var A=a=>{try{_(x.next(a))}catch(z){t(z)}},k=a=>{try{_(x.throw(a))}catch(z){t(z)}},_=a=>a.done?v(a.value):Promise.resolve(a.value).then(A,k);_((x=x.apply(i,p)).next())});import{j as e,a5 as l,ae as ie,a3 as ae,O as E,T as u,aE as M,aI as D,aG as c,aH as o,aD as le,aF as de}from"./mui-core-CMjV7rZv.js";import{j as ce,u as pe,r as w}from"./react-vendor-DE6Mffui.js";import{e as xe,u as K,k as fe,f as Q,b as Z}from"./index-Ds8jOzh8.js";import{u as he}from"./useProjectDetail-D6I7FRQT.js";import{H as me,S as ge,Y as ue}from"./YearlyFTESummaryTable-CIZymSPg.js";import{u as be}from"./i18n-vendor-B-LDdkFY.js";import{ag as J,al as je,aP as ye}from"./mui-icons-DwkeYy0F.js";import{p as we}from"./parseISO-LJgP0sLA.js";import"./mui-x-COYVW0hM.js";import"./echarts-vendor-DQz_CFBm.js";const ve=[{gate:"G0",label:"G0 — Project Initiation",phases:["org","organizational management"]},{gate:"G10",label:"G10 — Feasibility & Concept",phases:["project planning","project","concept","risk","tara"]},{gate:"G20",label:"G20 — Design & Implementation",phases:["design","development","product development","dev","implementation"]},{gate:"G30",label:"G30 — Verification & Validation",phases:["v&v","verification","validation"]},{gate:"G40",label:"G40 — Assurance",phases:["assurance","post-development"]},{gate:"G50",label:"G50 — Production & Operations",phases:["production","ops"]}],n={headerBg:"#1a2332",sectionBorder:"#2c3e50",labelBg:"#f8f9fa",gateBg:"#0f1f33",subtle:"#495057",border:"#dee2e6",totalRow:"#edf2f7"},R={fontSize:"14px",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.08em",color:"#1a2332",borderBottom:`2px solid ${n.sectionBorder}`,pb:.5,mb:2,mt:0},h={fontWeight:600,fontSize:"12px",color:n.subtle,textTransform:"uppercase",letterSpacing:"0.04em",bgcolor:n.labelBg,borderBottom:`1px solid ${n.border}`,py:.6,px:1.5,width:"140px",whiteSpace:"nowrap"},m={fontSize:"13px",color:"#212529",borderBottom:`1px solid ${n.border}`,py:.6,px:1.5},_e={fontSize:"11px",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.04em",color:n.subtle,py:.5,bgcolor:n.labelBg},ke={fontSize:"12px",color:"#212529",py:.5,borderBottom:`1px solid ${n.border}`},Ie=()=>{const{id:i}=ce(),p=pe(),{t:x}=be(),{settings:v}=xe(),{data:t,isLoading:A,error:k}=he(i),{data:_}=K({queryKey:["project-regulations",i],queryFn:()=>G(null,null,function*(){return i?((yield Z.get(`/projects/${i}/available-regulations`)).data.regulations||[]).filter(s=>s.is_selected):[]}),enabled:!!i}),{data:a}=K({queryKey:["project-work-products",i],queryFn:()=>G(null,null,function*(){if(!i)return[];const s=(yield Z.get(`/projects/${i}/work-products`)).data;return Array.isArray(s)?s:s!=null&&s.work_products?s.work_products:s!=null&&s.data?s.data:[]}),enabled:!!i}),z=w.useMemo(()=>{var s,d,g;if(!t||!v.complexitySettings)return 1;const r=(s=v.complexitySettings)==null?void 0:s[t.complexity||"normal"];return r?(1+((d=r.fteModifier)!=null?d:0)/100)*(1+((g=r.workProductModifier)!=null?g:0)/100):1},[t,v.complexitySettings]),T=(t==null?void 0:t.buffer_time_percentage)||20,O=w.useMemo(()=>{const r=(t==null?void 0:t.duration)||4;return r<=10?r*12:r},[t==null?void 0:t.duration]),X=w.useMemo(()=>t!=null&&t.start_date?new Date(t.start_date).getFullYear():new Date().getFullYear(),[t==null?void 0:t.start_date]),L=w.useMemo(()=>{var b,y;const r=Array.isArray(a)?a:[];if(r.length===0)return[];const s=(b=v.complexitySettings)==null?void 0:b[(t==null?void 0:t.complexity)||"normal"],d=fe((y=s==null?void 0:s.fteModifier)!=null?y:0),g=new Map;return r.forEach(f=>{const j=f.owner_role||"Unassigned",F=f.effort_with_buffer||f.effort_days||0,C=g.get(j)||{md:0,wp_count:0,wps:[]};C.md+=F,C.wp_count+=1,C.wps.push(f),g.set(j,C)}),Array.from(g.entries()).map(([f,j])=>({role:f,md:j.md*d,baseMD:j.md,wp_count:j.wp_count,wps:j.wps})).sort((f,j)=>j.md-f.md)},[a,t==null?void 0:t.complexity,v.complexitySettings]),N=w.useMemo(()=>(Array.isArray(a)?a:[]).reduce((r,s)=>r+(s.effort_with_buffer||s.effort_days||0),0),[a]),U=w.useMemo(()=>{const r=Array.isArray(a)?a:[],s=[];ve.forEach(b=>{const y=r.filter(f=>{const j=(f.phase||"").toLowerCase();return b.phases.some(F=>j.includes(F))});y.length>0&&s.push({gate:b.gate,label:b.label,wps:y})});const d=new Set(s.flatMap(b=>b.wps.map(y=>y.id))),g=r.filter(b=>!d.has(b.id));return g.length>0&&s.push({gate:"Other",label:"Other Work Products",wps:g}),s},[a]),H=r=>r?Q(typeof r=="string"?we(r):r,"dd MMM yyyy"):"—",I=r=>new Intl.NumberFormat("de-DE",{style:"currency",currency:"EUR",maximumFractionDigits:0}).format(r),S=(r,s=1)=>r.toFixed(s),$=r=>r?r.charAt(0).toUpperCase()+r.slice(1).replace(/_/g," "):"—",V=Array.isArray(a)?a.length:0,W=w.useRef(null),ee=w.useCallback(()=>{if(!W.current||!t)return;const r=W.current.innerHTML,s=(t.name||"Project").replace(/[^a-zA-Z0-9_-]/g,"_"),d=new Date().toLocaleDateString("en-GB",{day:"2-digit",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit"}),g=`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${t.name} - Interactive Report | BEACON Enterprise</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Inter', 'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif;
      font-size: 13px; line-height: 1.5; color: #212529;
      background: #f5f7fa; padding: 0;
    }
    .report-wrapper {
      max-width: 1400px; margin: 0 auto; padding: 32px;
      background: #fff;
    }
    .report-header-banner {
      background: linear-gradient(135deg, #1a2332 0%, #0f2744 100%);
      color: #fff; padding: 24px 32px; margin: -32px -32px 24px -32px;
      display: flex; justify-content: space-between; align-items: center;
    }
    .report-header-banner h1 { font-size: 22px; font-weight: 700; letter-spacing: -0.01em; }
    .report-header-banner .subtitle { font-size: 12px; opacity: 0.75; margin-top: 4px; }
    .report-header-banner .meta { font-size: 11px; opacity: 0.65; text-align: right; }
    table { width: 100%; border-collapse: collapse; }
    th { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em;
         color: #495057; padding: 6px 12px; background: #f8f9fa; text-align: left; }
    td { font-size: 12px; color: #212529; padding: 6px 12px; border-bottom: 1px solid #dee2e6; }
    .section-title {
      font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em;
      color: #1a2332; border-bottom: 2px solid #2c3e50; padding-bottom: 4px; margin: 24px 0 16px 0;
    }
    .gate-header {
      background: #0f1f33; color: #fff; padding: 8px 16px; font-size: 13px; font-weight: 600;
      display: flex; justify-content: space-between; align-items: center;
    }
    .gate-header .meta { opacity: 0.7; font-size: 11px; }
    .info-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; border: 1px solid #dee2e6; }
    .info-grid > div { border-right: 1px solid #dee2e6; }
    .info-grid > div:last-child { border-right: none; }
    .label-cell { font-weight: 600; font-size: 12px; color: #495057; text-transform: uppercase;
                  letter-spacing: 0.04em; background: #f8f9fa; padding: 6px 12px; width: 140px; white-space: nowrap; }
    .value-cell { font-size: 13px; color: #212529; padding: 6px 12px; }
    .reg-badge { display: inline-flex; gap: 4px; border: 1px solid #dee2e6; border-radius: 3px;
                 padding: 2px 8px; font-size: 11px; background: #f8f9fa; margin: 2px; }
    .reg-badge .code { font-weight: 700; font-size: 10px; }
    .reg-badge .name { color: #495057; }
    .total-row { background: #edf2f7; font-weight: 700; }
    .total-row td { border-bottom: none; }
    .footer { margin-top: 40px; padding-top: 12px; border-top: 1px solid #dee2e6;
              display: flex; justify-content: space-between; font-size: 10px; color: #495057; }
    .collapsible-header { cursor: pointer; user-select: none; padding: 8px 12px;
                          background: #f0f4f8; border: 1px solid #dee2e6; border-radius: 4px;
                          margin-bottom: 4px; font-weight: 600; font-size: 13px; color: #1a2332; }
    .collapsible-header:hover { background: #e2e8f0; }
    .collapsible-header::before { content: '\\25B6'; display: inline-block; margin-right: 8px;
                                   transition: transform 0.2s; font-size: 10px; }
    .collapsible-header.open::before { transform: rotate(90deg); }
    .collapsible-content { display: none; padding: 8px 0; }
    .collapsible-content.open { display: block; }
    .kpi-cards { display: flex; gap: 16px; margin-bottom: 24px; flex-wrap: wrap; }
    .kpi-card { flex: 1; min-width: 150px; border: 1px solid #dee2e6; border-radius: 8px;
                padding: 16px; text-align: center; }
    .kpi-card .label { font-size: 11px; color: #495057; text-transform: uppercase; margin-bottom: 4px; }
    .kpi-card .value { font-size: 22px; font-weight: 700; color: #1a2332; }
    .kpi-card .sub { font-size: 11px; color: #6c757d; }
    .status-badge { display: inline-block; font-size: 11px; font-weight: 600; text-transform: uppercase;
                    letter-spacing: 0.06em; padding: 3px 12px; border-radius: 3px; }
    .status-active { background: #dcfce7; color: #166534; }
    .status-completed { background: #dbeafe; color: #1e40af; }
    .status-draft { background: #fef9c3; color: #854d0e; }
    @media print {
      body { background: #fff; }
      .report-wrapper { padding: 10mm 12mm; max-width: 100%; }
      .report-header-banner { background: #f5f5f5 !important; color: #000 !important; border-bottom: 2px solid #333; }
      .gate-header { background: #e9ecef !important; color: #000 !important; }
      .no-print { display: none !important; }
      .collapsible-content { display: block !important; }
    }
  </style>
  <script>
    document.addEventListener('DOMContentLoaded', function() {
      document.querySelectorAll('.collapsible-header').forEach(function(header) {
        header.addEventListener('click', function() {
          this.classList.toggle('open');
          var content = this.nextElementSibling;
          if (content) content.classList.toggle('open');
        });
      });
    });
  <\/script>
</head>
<body>
  <div class="report-wrapper">
    <div class="report-header-banner">
      <div>
        <h1>${t.name}</h1>
        <div class="subtitle">${t.code||""}</div>
      </div>
      <div class="meta">
        <div>BEACON Enterprise</div>
        <div>Interactive Report</div>
        <div>${d}</div>
      </div>
    </div>
    ${r}
    <div class="footer">
      <span>${t.name} &middot; ${t.code||"No code"}</span>
      <span>Generated ${d} &middot; BEACON Enterprise &mdash; Interactive Report</span>
    </div>
  </div>
</body>
</html>`,b=new Blob([g],{type:"text/html;charset=utf-8"}),y=URL.createObjectURL(b),f=document.createElement("a");f.href=y,f.download=`${s}_Interactive_Report_${new Date().toISOString().slice(0,10)}.html`,document.body.appendChild(f),f.click(),document.body.removeChild(f),URL.revokeObjectURL(y)},[t]);return A?e.jsx(l,{sx:{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh"},children:e.jsx(ie,{})}):k||!t?e.jsxs(l,{sx:{p:4},children:[e.jsx(ae,{severity:"error",children:(k==null?void 0:k.message)||"Project not found"}),e.jsx(E,{startIcon:e.jsx(J,{}),onClick:()=>p(-1),sx:{mt:2},children:"Back"})]}):e.jsxs(l,{sx:{maxWidth:1400,mx:"auto",p:4,bgcolor:"#fff",color:"#212529",fontFamily:"'Inter', 'Segoe UI', -apple-system, sans-serif",fontSize:"13px",lineHeight:1.5},children:[e.jsxs(l,{sx:{display:"flex",gap:1,mb:3,justifyContent:"space-between"},children:[e.jsx(E,{startIcon:e.jsx(J,{}),variant:"outlined",size:"small",onClick:()=>p(`/projects/${i}`),children:"Back to Project"}),e.jsxs(l,{sx:{display:"flex",gap:1},children:[e.jsx(E,{startIcon:e.jsx(je,{}),variant:"contained",size:"small",color:"primary",onClick:ee,children:"Download Interactive Report"}),e.jsx(E,{startIcon:e.jsx(ye,{}),variant:"outlined",size:"small",onClick:()=>window.open(`/projects/${i}/print`,"_blank"),children:"Paper Print Version"})]})]}),e.jsxs("div",{ref:W,children:[e.jsxs(l,{sx:{mb:4},children:[e.jsxs(l,{sx:{bgcolor:n.headerBg,color:"#fff",px:3,py:1.8,display:"flex",justifyContent:"space-between",alignItems:"baseline"},children:[e.jsxs(l,{children:[e.jsx(u,{sx:{fontSize:"22px",fontWeight:700,letterSpacing:"-0.01em",lineHeight:1.2},children:t.name}),t.code&&e.jsx(u,{sx:{fontSize:"12px",opacity:.7,mt:.3},children:t.code})]}),e.jsx(u,{sx:{fontSize:"11px",fontWeight:600,textTransform:"uppercase",letterSpacing:"0.06em",bgcolor:t.status==="active"?"#22c55e":t.status==="completed"?"#3b82f6":"#f59e0b",px:1.5,py:.3,borderRadius:"3px",display:"inline-block"},children:$(t.status)})]}),e.jsxs(l,{sx:{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",border:`1px solid ${n.border}`,borderTop:"none"},children:[e.jsx(l,{sx:{borderRight:`1px solid ${n.border}`},children:e.jsx(M,{size:"small",sx:{"& td":{border:"none"}},children:e.jsxs(D,{children:[e.jsxs(c,{children:[e.jsx(o,{sx:h,children:"Customer"}),e.jsx(o,{sx:m,children:t.customer_name||"—"})]}),e.jsxs(c,{children:[e.jsx(o,{sx:h,children:"Complexity"}),e.jsx(o,{sx:m,children:$(t.complexity)})]}),e.jsxs(c,{children:[e.jsx(o,{sx:h,children:"Method"}),e.jsx(o,{sx:m,children:$(t.calculation_method||"enhanced")})]}),e.jsxs(c,{children:[e.jsx(o,{sx:h,children:"PM"}),e.jsx(o,{sx:m,children:t.project_manager_name||"—"})]}),e.jsxs(c,{children:[e.jsx(o,{sx:h,children:"Client"}),e.jsx(o,{sx:m,children:t.client_contact_name||"—"})]})]})})}),e.jsx(l,{sx:{borderRight:`1px solid ${n.border}`},children:e.jsx(M,{size:"small",sx:{"& td":{border:"none"}},children:e.jsxs(D,{children:[e.jsxs(c,{children:[e.jsx(o,{sx:h,children:"Start"}),e.jsx(o,{sx:m,children:H(t.start_date)})]}),e.jsxs(c,{children:[e.jsx(o,{sx:h,children:"End"}),e.jsx(o,{sx:m,children:H(t.end_date)})]}),e.jsxs(c,{children:[e.jsx(o,{sx:h,children:"Duration"}),e.jsxs(o,{sx:m,children:[O," months"]})]}),e.jsxs(c,{children:[e.jsx(o,{sx:h,children:"Buffer"}),e.jsxs(o,{sx:m,children:[T,"%"]})]}),e.jsxs(c,{children:[e.jsx(o,{sx:h,children:"Work Products"}),e.jsx(o,{sx:m,children:V})]})]})})}),e.jsx(l,{children:e.jsx(M,{size:"small",sx:{"& td":{border:"none"}},children:e.jsxs(D,{children:[e.jsxs(c,{children:[e.jsx(o,{sx:h,children:"Total Cost"}),e.jsx(o,{sx:B(P({},m),{fontWeight:600}),children:t.total_cost?I(t.total_cost):"—"})]}),e.jsxs(c,{children:[e.jsx(o,{sx:h,children:"Revenue"}),e.jsx(o,{sx:m,children:t.revenue?I(t.revenue):"—"})]}),e.jsxs(c,{children:[e.jsx(o,{sx:h,children:"Accepted"}),e.jsx(o,{sx:m,children:t.accepted_offer?I(t.accepted_offer):"—"})]}),e.jsxs(c,{children:[e.jsx(o,{sx:h,children:"Margin"}),e.jsx(o,{sx:m,children:t.margin!=null?`${S(t.margin)}%`:"—"})]}),e.jsxs(c,{children:[e.jsx(o,{sx:h,children:"Total Effort"}),e.jsxs(o,{sx:B(P({},m),{fontWeight:600}),children:[S(N,0)," MD"]})]})]})})})]}),_&&_.length>0&&e.jsxs(l,{sx:{border:`1px solid ${n.border}`,borderTop:"none",px:2,py:1,display:"flex",alignItems:"center",gap:1,flexWrap:"wrap"},children:[e.jsx(u,{sx:{fontWeight:600,fontSize:"11px",color:n.subtle,textTransform:"uppercase",mr:1},children:"Regulations"}),_.map(r=>e.jsxs(l,{sx:{display:"inline-flex",gap:.5,border:`1px solid ${n.border}`,borderRadius:"3px",px:1,py:.2,fontSize:"11px",bgcolor:n.labelBg},children:[e.jsx("span",{style:{fontWeight:700,fontSize:"10px"},children:r.code}),e.jsx("span",{style:{color:n.subtle},children:r.name})]},r.id))]})]}),e.jsxs(l,{sx:{mb:4},children:[e.jsx(u,{sx:R,children:"High-Level Project Timeline"}),e.jsx(me,{projectId:i||"",projectName:t.name||"Project",startDate:t.start_date?new Date(t.start_date):null,bufferTimePercentage:T,complexityMultiplier:z,workProducts:(Array.isArray(a)?a:[]).map(r=>{var s;return B(P({},r),{phase:r.phase||"",skill_level:(s=r.skill_level)!=null?s:1})})})]}),e.jsxs(l,{sx:{mb:4},children:[e.jsx(u,{sx:R,children:"Cybersecurity Scorecard — Planning Tool"}),e.jsx(ge,{projectId:i||"",projectName:t.name||"Project",startDate:t.start_date?new Date(t.start_date):new Date,bufferTimePercentage:T,readOnly:!0})]}),e.jsxs(l,{sx:{mb:4},children:[e.jsxs(u,{sx:R,children:["Gate Cards — Work Products",e.jsxs(u,{component:"span",sx:{fontSize:"11px",fontWeight:400,ml:2,color:n.subtle,textTransform:"none",letterSpacing:0},children:[V," items · ",S(N,0)," MD total"]})]}),U.length===0?e.jsx(u,{sx:{color:n.subtle,fontStyle:"italic",py:2},children:"No work products assigned to this project."}):U.map(r=>{const s=r.wps.reduce((d,g)=>d+(g.effort_with_buffer||g.effort_days||0),0);return e.jsxs(l,{sx:{mb:2},children:[e.jsxs(l,{sx:{bgcolor:n.gateBg,color:"#fff",px:2,py:.7,display:"flex",justifyContent:"space-between",alignItems:"center",fontSize:"12px",fontWeight:600},children:[e.jsx("span",{children:r.label}),e.jsxs("span",{style:{opacity:.7,fontSize:"11px"},children:[r.wps.length," WP · ",S(s,0)," MD"]})]}),e.jsx(le,{sx:{border:`1px solid ${n.border}`,borderTop:"none"},children:e.jsxs(M,{size:"small",sx:{"& th":_e,"& td":ke},children:[e.jsx(de,{children:e.jsxs(c,{children:[e.jsx(o,{sx:{width:"38%"},children:"Work Product"}),e.jsx(o,{sx:{width:"14%"},children:"Code"}),e.jsx(o,{sx:{width:"18%"},children:"Owner Role"}),e.jsx(o,{sx:{width:"12%",textAlign:"right"},children:"Effort (MD)"}),e.jsx(o,{sx:{width:"18%"},children:"Regulation"})]})}),e.jsxs(D,{children:[r.wps.map(d=>e.jsxs(c,{sx:{"&:last-child td":{borderBottom:"none"}},children:[e.jsx(o,{children:d.name}),e.jsx(o,{sx:{fontFamily:"monospace",fontSize:"10px",color:n.subtle},children:d.code}),e.jsx(o,{children:d.owner_role||"—"}),e.jsx(o,{sx:{textAlign:"right",fontVariantNumeric:"tabular-nums"},children:S(d.effort_with_buffer||d.effort_days||0)}),e.jsx(o,{sx:{fontSize:"10px",color:n.subtle},children:d.regulation_code||"—"})]},d.id)),e.jsxs(c,{children:[e.jsx(o,{colSpan:3,sx:{fontWeight:700,bgcolor:n.totalRow,borderBottom:"none"},children:"Subtotal"}),e.jsx(o,{sx:{fontWeight:700,textAlign:"right",bgcolor:n.totalRow,borderBottom:"none",fontVariantNumeric:"tabular-nums"},children:S(s)}),e.jsx(o,{sx:{bgcolor:n.totalRow,borderBottom:"none"}})]})]})]})})]},r.gate)})]}),e.jsxs(l,{sx:{mb:4},children:[e.jsx(u,{sx:R,children:"Yearly FTE Requirements Summary"}),L.length>0?e.jsx(ue,{roles:L,durationMonths:O,startYear:X,bufferPercentage:T,roleFTEAllocations:t.role_fte_allocations||{},roleDistributions:t.role_distributions||{},externalTeams:t.external_teams||[]}):e.jsx(u,{sx:{color:n.subtle,fontStyle:"italic",py:2},children:"No role / FTE data available."})]})]}),e.jsxs(l,{sx:{mt:5,pt:1.5,borderTop:`1px solid ${n.border}`,display:"flex",justifyContent:"space-between",alignItems:"center"},children:[e.jsxs(u,{sx:{fontSize:"11px",color:"#495057"},children:[t.name," · ",t.code||"No code"]}),e.jsxs(u,{sx:{fontSize:"11px",color:"#495057"},children:["Generated ",Q(new Date,"dd MMM yyyy, HH:mm")," · BEACON Enterprise — Interactive View"]})]})]})};export{Ie as default};
